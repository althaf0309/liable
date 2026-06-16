import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { useRef, useEffect } from "react";

function makeGlowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, "rgba(255,246,222,1)");
  g.addColorStop(0.3, "rgba(255,216,138,0.85)");
  g.addColorStop(0.7, "rgba(197,160,89,0.25)");
  g.addColorStop(1, "rgba(197,160,89,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

/**
 * Mission visual — a slowly swirling golden spiral galaxy of light particles
 * with differential rotation (inner spins faster) around a bright core. Bloom.
 */
export default function MissionCluster() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let W = mount.offsetWidth;
    let H = mount.offsetHeight;
    if (W === 0 || H === 0) { W = 460; H = 440; }

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(46, W / H, 0.1, 100);
    camera.position.set(0, 1.4, 6);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(W, H), 1.0, 0.55, 0.12);
    composer.addPass(bloom);
    composer.addPass(new OutputPass());

    const glowTex = makeGlowTexture();

    // ── spiral galaxy of particles ──
    const galaxy = new THREE.Group();
    galaxy.rotation.x = 1.0; // tilt the disk toward the viewer
    scene.add(galaxy);

    const N = 2800;
    const ARMS = 3;
    const MAXR = 3.2;
    const SPIN = 1.05;
    const pos = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);
    const rArr = new Float32Array(N);
    const aArr = new Float32Array(N);
    const yArr = new Float32Array(N);

    const cIn = new THREE.Color(0xfff0c8);
    const cOut = new THREE.Color(0xc5a059);

    for (let i = 0; i < N; i++) {
      const tR = Math.pow(Math.random(), 0.55);     // bias toward the centre
      const r = 0.18 + tR * MAXR;
      const arm = ((i % ARMS) / ARMS) * Math.PI * 2;
      const jitterA = (Math.random() - 0.5) * (0.55 / (r * 0.6 + 0.4)); // arm thickness
      const a = arm + r * SPIN + jitterA;
      const y = (Math.random() - 0.5) * 0.5 * (1 - tR * 0.7);            // thin disk

      rArr[i] = r; aArr[i] = a; yArr[i] = y;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(a) * r;

      const c = cIn.clone().lerp(cOut, Math.min(1, tR * 1.1));
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }

    const gGeo = new THREE.BufferGeometry();
    gGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    gGeo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    const gMat = new THREE.PointsMaterial({
      map: glowTex, size: 0.11, transparent: true, vertexColors: true,
      blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
    });
    const stars = new THREE.Points(gGeo, gMat);
    galaxy.add(stars);

    // bright core + halo
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.16, 20, 20), new THREE.MeshBasicMaterial({ color: 0xfff2d6 }));
    galaxy.add(core);
    const coreHalo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: 0xffd98a, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false }));
    coreHalo.scale.set(2.4, 2.4, 1);
    galaxy.add(coreHalo);

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
    let animId = 0;
    const positionAttr = gGeo.attributes.position as THREE.BufferAttribute;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!running) return;
      t += 0.016;

      // differential rotation — inner particles orbit faster
      const arr = positionAttr.array as Float32Array;
      for (let i = 0; i < N; i++) {
        const r = rArr[i];
        aArr[i] += (0.22 / (r + 0.35)) * 0.016 * 8;
        const a = aArr[i];
        arr[i * 3] = Math.cos(a) * r;
        arr[i * 3 + 2] = Math.sin(a) * r;
      }
      positionAttr.needsUpdate = true;

      galaxy.rotation.z += 0.0008;
      const cs = 1 + Math.sin(t * 3) * 0.1;
      core.scale.setScalar(cs);
      coreHalo.scale.set(2.4 * cs, 2.4 * cs, 1);

      camera.position.x += (mouse.x * 0.6 - camera.position.x) * 0.04;
      camera.position.y += (1.4 + mouse.y * 0.4 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

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
      gGeo.dispose();
      gMat.dispose();
      composer.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" />;
}
