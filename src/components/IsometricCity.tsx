import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const GOLD = "197,160,89";
const GOLD_BRIGHT = "#E8C77E";
const CREAM = "#F5F2ED";
const DARK = "hsl(222,52%,2%)";

// Emissive window texture — black facade, scattered lit windows
function makeWindowTexture(litChance: number) {
  const c = document.createElement("canvas");
  c.width = 64; c.height = 128;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, 64, 128);
  for (let y = 8; y < 122; y += 11) {
    for (let x = 7; x < 57; x += 12) {
      if (Math.random() < litChance) {
        ctx.fillStyle = Math.random() < 0.82 ? "#ffc474" : "#cfe0ff";
        ctx.fillRect(x, y, 7, 7);
      }
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 2);
  return tex;
}

function makeGlowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, "rgba(255,238,200,1)");
  g.addColorStop(0.3, "rgba(255,216,138,0.7)");
  g.addColorStop(1, "rgba(197,160,89,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

function CityCanvas({ labelRef }: { labelRef: React.RefObject<HTMLDivElement> }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let W = mount.offsetWidth;
    let H = mount.offsetHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.92;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    // image-based lighting → realistic glass + subtle reflections
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();

    const frustum = 15;
    let aspect = W / H;
    const camera = new THREE.OrthographicCamera(
      (-frustum * aspect) / 2, (frustum * aspect) / 2, frustum / 2, -frustum / 2, 0.1, 100
    );
    camera.position.set(15, 12.5, 15);
    camera.lookAt(0, 1.2, 0);

    // soft bloom for windows + sphere
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(W, H), 0.32, 0.4, 0.6);
    composer.addPass(bloom);
    composer.addPass(new OutputPass());

    scene.add(new THREE.AmbientLight(0x2a3550, 0.6));
    const key = new THREE.DirectionalLight(0xfff0d8, 1.9);
    key.position.set(14, 22, 10);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 70;
    key.shadow.camera.left = -16; key.shadow.camera.right = 16;
    key.shadow.camera.top = 16; key.shadow.camera.bottom = -16;
    key.shadow.bias = -0.0004;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x33507f, 0.4);
    fill.position.set(-10, 6, -10);
    scene.add(fill);
    const coreLight = new THREE.PointLight(0xffd98a, 2.4, 16);
    coreLight.position.set(0, 4, 0);
    scene.add(coreLight);

    const glowTex = makeGlowTexture();
    const winTex = [makeWindowTexture(0.2), makeWindowTexture(0.3), makeWindowTexture(0.12)];

    // turntable group
    const city = new THREE.Group();
    scene.add(city);

    // ground
    const ground = new THREE.Mesh(
      new THREE.BoxGeometry(22, 0.5, 22),
      new THREE.MeshStandardMaterial({ color: 0x0b0e16, roughness: 1, metalness: 0 })
    );
    ground.position.y = -0.25;
    ground.receiveShadow = true;
    city.add(ground);

    const grid = new THREE.GridHelper(22, 22, 0xc5a059, 0x161c2a);
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.14;
    grid.position.y = 0.02;
    city.add(grid);

    // building body palette (muted, dark)
    const bodyColors = [0x161d2e, 0x1b2336, 0x202a40, 0x141a29];
    const buildMats = winTex.map((t, i) =>
      new THREE.MeshStandardMaterial({
        color: bodyColors[i % bodyColors.length], roughness: 0.85, metalness: 0.08,
        emissive: 0xffce8a, emissiveMap: t, emissiveIntensity: 0.5,
      })
    );
    const treeLeaf = new THREE.MeshStandardMaterial({ color: 0x2f6b43, roughness: 0.9, flatShading: true });
    const treeTrunk = new THREE.MeshStandardMaterial({ color: 0x4a3a24 });
    const eyePos = { x: 4.6, z: 4.4 };
    const benPos = { x: -4.9, z: -4.0 };

    const span = 4;
    const step = 2.0;
    for (let gx = -span; gx <= span; gx++) {
      for (let gz = -span; gz <= span; gz++) {
        const dist = Math.hypot(gx, gz);
        if (dist < 1.7) continue;             // clear center for sphere
        if (Math.random() < 0.07) continue;   // a few plazas / gaps

        const x = gx * step + (Math.random() - 0.5) * 0.35;
        const z = gz * step + (Math.random() - 0.5) * 0.35;

        if (Math.hypot(x - eyePos.x, z - eyePos.z) < 2.4) continue;    // London Eye clearance
        if (Math.hypot(x - benPos.x, z - benPos.z) < 1.7) continue;    // Big Ben clearance

        if (Math.random() < 0.1) {
          const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.09, 0.35, 6), treeTrunk);
          trunk.position.set(x, 0.17, z);
          const leaves = new THREE.Mesh(new THREE.ConeGeometry(0.36, 0.9, 7), treeLeaf);
          leaves.position.set(x, 0.78, z);
          leaves.castShadow = true;
          city.add(trunk, leaves);
          continue;
        }

        const h = 1.2 + Math.random() * (dist < 3 ? 4.8 : 3.0);
        const w = 0.78 + Math.random() * 0.6;
        const d = 0.78 + Math.random() * 0.6;
        const mat = buildMats[Math.floor(Math.random() * buildMats.length)];
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
        mesh.position.set(x, h / 2, z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        city.add(mesh);

        // crisp roof cap for definition
        const cap = new THREE.Mesh(new THREE.BoxGeometry(w * 1.02, 0.06, d * 1.02), new THREE.MeshStandardMaterial({ color: 0x2c374f, roughness: 0.7 }));
        cap.position.set(x, h, z);
        cap.castShadow = true;
        city.add(cap);
      }
    }

    // ── landmark towers (London-style skyline) ──
    const landMat = new THREE.MeshStandardMaterial({ color: 0x222c44, roughness: 0.45, metalness: 0.35, emissive: 0x5a4a20, emissiveIntensity: 0.25, envMapIntensity: 1.2 });
    const shard = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.6, 7.6, 4), landMat); // The Shard — tapered spire
    shard.position.set(5.4, 3.8, -5.0);
    shard.rotation.y = Math.PI / 4;
    shard.castShadow = true;
    city.add(shard);
    const gherkin = new THREE.Mesh(new THREE.SphereGeometry(0.55, 20, 24), landMat); // The Gherkin — rounded tower
    gherkin.scale.set(1, 3.0, 1);
    gherkin.position.set(-5.3, 1.6, 5.1);
    gherkin.castShadow = true;
    city.add(gherkin);

    // ── London Eye ──
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0xaebfdc, roughness: 0.4, metalness: 0.55, emissive: 0x24406e, emissiveIntensity: 0.4, envMapIntensity: 1.3 });
    const eye = new THREE.Group();
    eye.position.set(eyePos.x, 1.9, eyePos.z);
    eye.rotation.y = -0.6;
    const eyeWheel = new THREE.Group();
    const rimR = 1.5;
    eyeWheel.add(new THREE.Mesh(new THREE.TorusGeometry(rimR, 0.03, 8, 64), wheelMat));
    eyeWheel.add(new THREE.Mesh(new THREE.TorusGeometry(rimR * 0.93, 0.014, 6, 64), wheelMat));
    const spokePos: number[] = [];
    const capGeo = new THREE.BoxGeometry(0.1, 0.1, 0.18);
    const capMat = new THREE.MeshStandardMaterial({ color: 0xcfe0ff, roughness: 0.5, emissive: 0x8aa0c8, emissiveIntensity: 0.35 });
    const NS = 18;
    for (let k = 0; k < NS; k++) {
      const a = (k / NS) * Math.PI * 2;
      spokePos.push(0, 0, 0, Math.cos(a) * rimR, Math.sin(a) * rimR, 0);
      const cap = new THREE.Mesh(capGeo, capMat);
      cap.position.set(Math.cos(a) * rimR, Math.sin(a) * rimR, 0);
      eyeWheel.add(cap);
    }
    const spokeGeo = new THREE.BufferGeometry();
    spokeGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(spokePos), 3));
    eyeWheel.add(new THREE.LineSegments(spokeGeo, new THREE.LineBasicMaterial({ color: 0x9fb4d8, transparent: true, opacity: 0.5 })));
    eyeWheel.add(new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 12), wheelMat));
    eye.add(eyeWheel);
    const legGeo = new THREE.CylinderGeometry(0.04, 0.05, 2.5, 8);
    ([[-0.55, 0.5], [0.55, 0.5], [-0.55, -0.5], [0.55, -0.5]] as [number, number][]).forEach(([lx, lz]) => {
      const leg = new THREE.Mesh(legGeo, wheelMat);
      leg.position.set(lx, -1.05, lz);
      leg.rotation.x = lz > 0 ? 0.28 : -0.28;
      leg.rotation.z = lx > 0 ? -0.28 : 0.28;
      eye.add(leg);
    });
    city.add(eye);

    // ── Big Ben ──
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x6b5a3a, roughness: 0.7, metalness: 0.1, emissive: 0x3a2e15, emissiveIntensity: 0.2 });
    const ben = new THREE.Group();
    ben.position.set(benPos.x, 0, benPos.z);
    const benTower = new THREE.Mesh(new THREE.BoxGeometry(0.72, 4.2, 0.72), stoneMat);
    benTower.position.y = 2.1; benTower.castShadow = true; ben.add(benTower);
    const clockMat = new THREE.MeshBasicMaterial({ color: 0xfff0c0 });
    ([[0, 0.37], [0, -0.37], [0.37, 0], [-0.37, 0]] as [number, number][]).forEach(([cx, cz]) => {
      const clock = new THREE.Mesh(new THREE.CircleGeometry(0.16, 24), clockMat);
      clock.position.set(cx, 3.6, cz);
      if (cz > 0) clock.rotation.y = 0;
      else if (cz < 0) clock.rotation.y = Math.PI;
      else if (cx > 0) clock.rotation.y = Math.PI / 2;
      else clock.rotation.y = -Math.PI / 2;
      ben.add(clock);
    });
    const belfry = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.5, 0.82), stoneMat);
    belfry.position.y = 4.45; ben.add(belfry);
    const spire = new THREE.Mesh(new THREE.ConeGeometry(0.56, 1.3, 4), stoneMat);
    spire.position.y = 5.35; spire.rotation.y = Math.PI / 4; spire.castShadow = true; ben.add(spire);
    city.add(ben);

    // central glass sphere
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.95, 48, 48),
      new THREE.MeshPhysicalMaterial({
        color: 0x9aa6c4, metalness: 0, roughness: 0.04,
        transmission: 0.97, thickness: 2.4, ior: 1.45, transparent: true, opacity: 0.86,
      })
    );
    sphere.position.set(0, 2.6, 0);
    scene.add(sphere);
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.45, 24, 24), new THREE.MeshBasicMaterial({ color: 0xffe6b0 }));
    core.position.copy(sphere.position);
    scene.add(core);
    const coreGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: 0xffd98a, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false }));
    coreGlow.scale.set(2.8, 2.8, 1);
    coreGlow.position.copy(sphere.position);
    scene.add(coreGlow);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.45, 0.015, 8, 140), new THREE.MeshBasicMaterial({ color: 0xe8c77e, transparent: true, opacity: 0.6 }));
    ring.position.copy(sphere.position);
    ring.rotation.x = Math.PI / 2.3;
    scene.add(ring);

    // floating bubbles
    const bubbleMat = new THREE.MeshPhysicalMaterial({ color: 0xb3bcd6, metalness: 0, roughness: 0.05, transmission: 0.95, thickness: 0.5, transparent: true, opacity: 0.45 });
    const bubbles: { m: THREE.Mesh; sp: number; off: number }[] = [];
    for (let i = 0; i < 7; i++) {
      const m = new THREE.Mesh(new THREE.SphereGeometry(0.16 + Math.random() * 0.22, 16, 16), bubbleMat);
      m.position.set((Math.random() - 0.5) * 16, Math.random() * 6, (Math.random() - 0.5) * 16);
      scene.add(m);
      bubbles.push({ m, sp: 0.004 + Math.random() * 0.006, off: Math.random() * 10 });
    }

    let t = 0;
    let running = true;
    const io = new IntersectionObserver(([e]) => { running = e.isIntersecting; }, { threshold: 0.02 });
    io.observe(mount);

    const label = labelRef.current;
    let animId: number;
    const tmp = new THREE.Vector3();
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!running) return;
      t += 0.01;

      city.rotation.y += 0.0015;
      eyeWheel.rotation.z += 0.0035;
      const sy = 2.6 + Math.sin(t) * 0.12;
      sphere.position.y = sy; core.position.y = sy; coreGlow.position.y = sy; ring.position.y = sy;
      ring.rotation.z = t * 0.4;
      sphere.rotation.y = t * 0.12;
      coreLight.intensity = 2.1 + Math.sin(t * 1.7) * 0.5;

      bubbles.forEach((b) => {
        b.m.position.y += b.sp;
        b.m.position.x += Math.sin(t + b.off) * 0.002;
        if (b.m.position.y > 7) b.m.position.y = -0.5;
      });

      composer.render();

      if (label) {
        tmp.copy(sphere.position).project(camera);
        label.style.left = `${(tmp.x * 0.5 + 0.5) * W}px`;
        label.style.top = `${(-tmp.y * 0.5 + 0.5) * H}px`;
      }
    };
    animate();

    const onResize = () => {
      W = mount.offsetWidth;
      H = mount.offsetHeight;
      aspect = W / H;
      camera.left = (-frustum * aspect) / 2;
      camera.right = (frustum * aspect) / 2;
      camera.top = frustum / 2;
      camera.bottom = -frustum / 2;
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
      glowTex.dispose();
      winTex.forEach((t) => t.dispose());
      composer.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [labelRef]);

  return <div ref={mountRef} className="absolute inset-0" />;
}

export default function IsometricCity() {
  const labelRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative py-24 overflow-hidden" style={{ background: DARK }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(${GOLD},0.4), transparent)` }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 50% at 50% 40%, rgba(${GOLD},0.06) 0%, transparent 70%)` }} />

      <div className="container-custom px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase rounded-full px-4 py-1.5 mb-5"
            style={{ color: GOLD_BRIGHT, background: `rgba(${GOLD},0.08)`, border: `1px solid rgba(${GOLD},0.16)` }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: GOLD_BRIGHT }} />
            Our Vision
          </span>
          <h2 className="font-serif font-bold leading-tight mb-4" style={{ fontSize: "clamp(2rem,4vw,3rem)", color: CREAM }}>
            One platform at the centre of{" "}
            <span style={{ background: `linear-gradient(135deg,#C5A059,${GOLD_BRIGHT},#C5A059)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              every neighbourhood
            </span>
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "rgba(245,242,237,0.55)" }}>
            To build a globally recognised operational platform that connects people, properties,
            and services across international housing ecosystems.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9 }}
          className="relative mx-auto"
          style={{ maxWidth: 1000, height: 560 }}
        >
          <CityCanvas labelRef={labelRef} />
          <div ref={labelRef} className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <span className="font-serif font-bold text-lg md:text-xl whitespace-nowrap" style={{ color: CREAM, textShadow: `0 0 24px rgba(${GOLD},0.9), 0 0 48px rgba(${GOLD},0.5)` }}>
              Quantum&nbsp;Link™
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
