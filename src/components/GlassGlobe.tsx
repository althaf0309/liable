import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { useRef, useEffect } from "react";

// Soft radial glow sprite
function makeGlowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, "rgba(255,238,200,1)");
  g.addColorStop(0.3, "rgba(255,216,138,0.8)");
  g.addColorStop(0.6, "rgba(197,160,89,0.3)");
  g.addColorStop(1, "rgba(197,160,89,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

/**
 * Self-contained geodesic glass network sphere — the same look as the
 * hero globe (glass body, gold wireframe, glowing vertices, lit core,
 * env-map reflections, bloom). Fills its parent container.
 */
export default function GlassGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let W = mount.offsetWidth;
    let H = mount.offsetHeight;
    if (W === 0 || H === 0) { W = 360; H = 360; }

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();

    const camera = new THREE.PerspectiveCamera(46, W / H, 0.1, 100);
    camera.position.set(0, 0, 4.6);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(W, H), 0.7, 0.45, 0.25);
    composer.addPass(bloom);
    composer.addPass(new OutputPass());

    scene.add(new THREE.AmbientLight(0x16223a, 1.2));
    const coreLight = new THREE.PointLight(0xffd98a, 4.0, 12);
    scene.add(coreLight);
    const key = new THREE.DirectionalLight(0xfff0d0, 1.2);
    key.position.set(-4, 5, 4);
    scene.add(key);

    const glowTex = makeGlowTexture();

    // ── geodesic glass globe ──
    const R = 1.45;
    const globe = new THREE.Group();
    scene.add(globe);

    const icoGeo = new THREE.IcosahedronGeometry(R, 2);
    const glass = new THREE.Mesh(icoGeo, new THREE.MeshPhysicalMaterial({
      color: 0x2a3a55, metalness: 0, roughness: 0.06,
      transmission: 0.92, thickness: 1.4, ior: 1.45,
      transparent: true, opacity: 0.34, flatShading: true, envMapIntensity: 1.3,
    }));
    globe.add(glass);

    const wire = new THREE.LineSegments(
      new THREE.EdgesGeometry(icoGeo),
      new THREE.LineBasicMaterial({ color: 0xc5a059, transparent: true, opacity: 0.5 })
    );
    globe.add(wire);

    const posAttr = icoGeo.attributes.position as THREE.BufferAttribute;
    const seen = new Set<string>();
    const nodeVerts: number[] = [];
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i), y = posAttr.getY(i), z = posAttr.getZ(i);
      const key2 = `${x.toFixed(2)},${y.toFixed(2)},${z.toFixed(2)}`;
      if (seen.has(key2)) continue;
      seen.add(key2);
      nodeVerts.push(x, y, z);
    }
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(nodeVerts), 3));
    const nodePts = new THREE.Points(nodeGeo, new THREE.PointsMaterial({
      map: glowTex, color: 0xffd98a, size: 0.16, transparent: true,
      blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
    }));
    globe.add(nodePts);

    const shellMat = new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: `varying vec3 vN; varying vec3 vV;
        void main(){ vN = normalize(normalMatrix * normal); vec4 mv = modelViewMatrix*vec4(position,1.0); vV = normalize(-mv.xyz); gl_Position = projectionMatrix*mv; }`,
      fragmentShader: `varying vec3 vN; varying vec3 vV;
        void main(){ float f = pow(1.0 - abs(dot(vN,vV)), 3.5); gl_FragColor = vec4(0.85,0.72,0.47, f*0.5); }`,
      transparent: true, blending: THREE.AdditiveBlending, side: THREE.FrontSide, depthWrite: false,
    });
    const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(R * 1.08, 4), shellMat);
    scene.add(shell);

    const coreMesh = new THREE.Mesh(new THREE.SphereGeometry(0.15, 20, 20), new THREE.MeshBasicMaterial({ color: 0xffe6b8 }));
    scene.add(coreMesh);
    const coreHalo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: 0xffd98a, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false }));
    coreHalo.scale.set(1.2, 1.2, 1);
    scene.add(coreHalo);

    // gentle mouse tilt
    const mouse = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      const r = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      mouse.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    };
    mount.addEventListener("mousemove", onMove);

    let running = true;
    const io = new IntersectionObserver(([e]) => { running = e.isIntersecting; }, { threshold: 0.02 });
    io.observe(mount);

    let t = 0;
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!running) return;
      t += 0.01;
      globe.rotation.y += 0.0045;
      globe.rotation.x += (mouse.y * 0.3 - globe.rotation.x) * 0.04;
      globe.rotation.y += (mouse.x * 0.02);
      shell.rotation.copy(globe.rotation);
      const cs = 1 + Math.sin(t * 1.8) * 0.06;
      coreMesh.scale.setScalar(cs);
      coreHalo.scale.set(1.2 * cs, 1.2 * cs, 1);
      coreLight.intensity = 3.6 + Math.sin(t * 1.8) * 0.7;
      composer.render();
    };
    animate();

    const onResize = () => {
      W = mount.offsetWidth; H = mount.offsetHeight;
      if (W === 0 || H === 0) return;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
      composer.setSize(W, H);
      bloom.resolution.set(W, H);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      mount.removeEventListener("mousemove", onMove);
      glowTex.dispose();
      composer.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" />;
}
