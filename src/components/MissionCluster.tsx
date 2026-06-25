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
 * Mission visual — an elegant gyroscope of glowing gold orbital rings at
 * different tilts, each precessing and carrying an orbiting light, around a
 * bright pulsing core. Clean "rotation" instrument, bloom.
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
    renderer.toneMappingExposure = 0.98;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(46, W / H, 0.1, 100);
    camera.position.set(0, 0, 6);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(W, H), 0.55, 0.5, 0.28);
    composer.addPass(bloom);
    composer.addPass(new OutputPass());

    const glowTex = makeGlowTexture();

    // backdrop glow
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: 0xc5a059, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false }));
    halo.scale.set(7, 7, 1);
    halo.position.set(0, 0, -2);
    scene.add(halo);

    const gyro = new THREE.Group();
    scene.add(gyro);

    // ── orbital rings ──
    interface Ring { group: THREE.Group; precess: THREE.Vector3; orbiter: THREE.Sprite; ang: number; speed: number; R: number }
    const rings: Ring[] = [];
    const defs = [
      { R: 1.25, tilt: [0.2, 0, 0], precess: [0, 0.004, 0], speed: 0.03, color: 0xe8c77e },
      { R: 1.7, tilt: [Math.PI / 2.3, 0, 0.35], precess: [0, 0, 0.003], speed: -0.022, color: 0xc5a059 },
      { R: 2.05, tilt: [-0.65, 0.5, 0], precess: [0.0025, 0, 0], speed: 0.017, color: 0xe8c77e },
      { R: 0.95, tilt: [1.1, 0, 0.7], precess: [0, 0.005, 0], speed: 0.036, color: 0xffd98a },
    ];
    defs.forEach((d) => {
      const g = new THREE.Group();
      g.rotation.set(d.tilt[0], d.tilt[1], d.tilt[2]);
      const torus = new THREE.Mesh(
        new THREE.TorusGeometry(d.R, 0.012, 10, 160),
        new THREE.MeshBasicMaterial({ color: d.color, transparent: true, opacity: 0.68, blending: THREE.AdditiveBlending, depthWrite: false })
      );
      g.add(torus);
      // soft wider ring
      const torus2 = new THREE.Mesh(
        new THREE.TorusGeometry(d.R, 0.004, 8, 160),
        new THREE.MeshBasicMaterial({ color: d.color, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending, depthWrite: false })
      );
      torus2.scale.setScalar(1.04);
      g.add(torus2);
      // orbiting light
      const orbiter = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: 0xfff0d0, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false }));
      orbiter.scale.set(0.28, 0.28, 1);
      g.add(orbiter);
      gyro.add(g);
      rings.push({ group: g, precess: new THREE.Vector3(d.precess[0], d.precess[1], d.precess[2]), orbiter, ang: Math.random() * Math.PI * 2, speed: d.speed, R: d.R });
    });

    // bright core
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.2, 22, 22), new THREE.MeshBasicMaterial({ color: 0xfff2d6 }));
    scene.add(core);
    const coreHalo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: 0xffd98a, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false }));
    coreHalo.scale.set(1.7, 1.7, 1);
    scene.add(coreHalo);

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
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!running) return;
      t += 0.016;

      gyro.rotation.y += 0.0015;
      rings.forEach((r) => {
        r.group.rotation.x += r.precess.x;
        r.group.rotation.y += r.precess.y;
        r.group.rotation.z += r.precess.z;
        r.ang += r.speed;
        r.orbiter.position.set(Math.cos(r.ang) * r.R, Math.sin(r.ang) * r.R, 0);
      });

      const cs = 1 + Math.sin(t * 2.4) * 0.1;
      core.scale.setScalar(cs);
      coreHalo.scale.set(1.7 * cs, 1.7 * cs, 1);

      camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.04;
      camera.position.y += (mouse.y * 0.4 - camera.position.y) * 0.04;
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
      composer.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" />;
}
