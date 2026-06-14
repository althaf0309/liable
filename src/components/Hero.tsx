import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

// ─────────────────────────────────────────────────────────────────
// LGS brand palette
// ─────────────────────────────────────────────────────────────────
const GOLD = "#C5A059";        // Soft Champagne Gold
const GOLD_BRIGHT = "#E8C77E"; // highlight / bloom core
const CREAM = "#F5F2ED";       // Heirloom Cream
const OBSIDIAN = "#0A0A0A";    // Obsidian Black

// ─────────────────────────────────────────────────────────────────
// Connection nodes — the eight points Quantum Link™ unites
// ─────────────────────────────────────────────────────────────────
const ICONS: Record<string, string> = {
  users: `<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`,
  building: `<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01"/>`,
  home: `<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>`,
  card: `<rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>`,
  headset: `<path d="M3 14v-2a9 9 0 0 1 18 0v2"/><path d="M21 14v4a2 2 0 0 1-2 2h-2v-6h2a2 2 0 0 1 2 2zM3 14v4a2 2 0 0 0 2 2h0"/>`,
  shield: `<path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/>`,
  wrench: `<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.3-2.3z"/>`,
  settings: `<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>`,
};

// name, icon, and screen-space direction (x right, y up) for placement around the globe
const NODES = [
  { name: "Students",         icon: "users",    dir: [0.0, 1.0],   desc: "Verified student profiles with ISRA™ tenancy-readiness assessment." },
  { name: "Landlords",        icon: "building", dir: [-0.78, 0.66], desc: "Property owners with role-gated dashboards and tenancy oversight." },
  { name: "Properties",       icon: "home",     dir: [0.78, 0.66],  desc: "Listed, verified, and compliance-checked accommodation." },
  { name: "Payments",         icon: "card",     dir: [1.0, -0.02],  desc: "Secure rent handling and transparent transaction records." },
  { name: "Support Services", icon: "headset",  dir: [0.0, -1.0],   desc: "Arrival, settlement, and 24/7 student welfare support." },
  { name: "Compliance",       icon: "shield",   dir: [-0.78, -0.66],desc: "Right-to-rent, GDPR, and safety compliance clearance." },
  { name: "Property Care",    icon: "wrench",   dir: [-1.0, -0.02], desc: "Maintenance tracking and structured property trust scoring." },
  { name: "Admin",            icon: "settings", dir: [0.78, -0.66], desc: "Operational controls, matching, and platform-wide insights." },
];

// ─────────────────────────────────────────────────────────────────
// Hover tooltip
// ─────────────────────────────────────────────────────────────────
interface HoverInfo { nodeIndex: number; x: number; y: number }

function NodeCard({ info }: { info: HoverInfo }) {
  const node = NODES[info.nodeIndex];
  if (!node) return null;
  const vw = typeof window !== "undefined" ? window.innerWidth : 1440;
  const left = info.x + 24 > vw - 290 ? info.x - 290 : info.x + 24;

  return (
    <motion.div
      key={info.nodeIndex}
      initial={{ opacity: 0, scale: 0.9, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 8 }}
      transition={{ duration: 0.16, ease: "easeOut" }}
      style={{ position: "fixed", left, top: info.y - 40, zIndex: 9999, pointerEvents: "none", width: 260 }}
    >
      <div style={{ background: "rgba(10,10,10,0.92)", backdropFilter: "blur(28px)", border: `1px solid ${GOLD}40`, borderRadius: 16, padding: "16px 18px" }}>
        <div style={{ height: 2, borderRadius: 2, background: `linear-gradient(90deg, ${GOLD}, transparent)`, marginBottom: 12 }} />
        <p className="font-serif font-bold text-base mb-1.5" style={{ color: CREAM }}>{node.name}</p>
        <p className="text-xs leading-relaxed" style={{ color: "rgba(245,242,237,0.6)" }}>{node.desc}</p>
      </div>
    </motion.div>
  );
}

// Soft radial glow sprite texture (for nodes + core halo)
function makeGlowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, "rgba(255,238,200,1)");
  g.addColorStop(0.25, "rgba(255,216,138,0.85)");
  g.addColorStop(0.55, "rgba(197,160,89,0.35)");
  g.addColorStop(1, "rgba(197,160,89,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

// ─────────────────────────────────────────────────────────────────
// 3D Quantum Link network-globe
// ─────────────────────────────────────────────────────────────────
function QuantumCanvas({
  onHover,
  labelContainerRef,
}: {
  onHover: (info: HoverInfo | null) => void;
  labelContainerRef: React.RefObject<HTMLDivElement>;
}) {
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
    renderer.toneMappingExposure = 1.05;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();
    const camera = new THREE.PerspectiveCamera(46, W / H, 0.1, 100);
    camera.position.set(0, 0, 18);

    // Bloom — tuned for a soft realistic halo, not a blown-out glow
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(W, H), 0.7, 0.45, 0.25);
    composer.addPass(bloom);
    composer.addPass(new OutputPass());

    scene.add(new THREE.AmbientLight(0x121a2e, 1.2));
    const coreLight = new THREE.PointLight(0xffd98a, 5.0, 18);
    scene.add(coreLight);

    const glowTex = makeGlowTexture();

    // Warm backdrop halo (subtle lit-from-within feel)
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: 0xc5a059, transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending, depthWrite: false }));
    halo.scale.set(6.5, 6.5, 1);
    halo.position.set(0, 0, -2.5);
    scene.add(halo);

    // ── Network glass globe (clean geodesic) ──────────────────────
    const R = 1.55;
    const globe = new THREE.Group();
    scene.add(globe);

    const icoGeo = new THREE.IcosahedronGeometry(R, 2);

    // see-through glass body
    const glass = new THREE.Mesh(icoGeo, new THREE.MeshPhysicalMaterial({
      color: 0x2a3a55, metalness: 0, roughness: 0.06,
      transmission: 0.92, thickness: 1.4, ior: 1.45,
      transparent: true, opacity: 0.34, flatShading: true,
      envMapIntensity: 1.3,
    }));
    globe.add(glass);

    // geodesic gold wireframe — distinct lines, not a fog
    const wire = new THREE.LineSegments(
      new THREE.EdgesGeometry(icoGeo),
      new THREE.LineBasicMaterial({ color: 0xc5a059, transparent: true, opacity: 0.5 })
    );
    globe.add(wire);

    // glowing nodes at unique vertices
    const posAttr = icoGeo.attributes.position as THREE.BufferAttribute;
    const seen = new Set<string>();
    const nodeVerts: number[] = [];
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i), y = posAttr.getY(i), z = posAttr.getZ(i);
      const key = `${x.toFixed(2)},${y.toFixed(2)},${z.toFixed(2)}`;
      if (seen.has(key)) continue;
      seen.add(key);
      nodeVerts.push(x, y, z);
    }
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(nodeVerts), 3));
    const nodePts = new THREE.Points(nodeGeo, new THREE.PointsMaterial({
      map: glowTex, color: 0xffd98a, size: 0.16, transparent: true,
      blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
    }));
    globe.add(nodePts);

    // faint fresnel rim
    const shellMat = new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: `
        varying vec3 vN; varying vec3 vV;
        void main(){ vN = normalize(normalMatrix * normal); vec4 mv = modelViewMatrix*vec4(position,1.0); vV = normalize(-mv.xyz); gl_Position = projectionMatrix*mv; }`,
      fragmentShader: `
        varying vec3 vN; varying vec3 vV;
        void main(){ float f = pow(1.0 - abs(dot(vN,vV)), 3.5); gl_FragColor = vec4(0.85,0.72,0.47, f*0.5); }`,
      transparent: true, blending: THREE.AdditiveBlending, side: THREE.FrontSide, depthWrite: false,
    });
    const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(R * 1.08, 4), shellMat);
    scene.add(shell);

    // contained bright core
    const coreMesh = new THREE.Mesh(new THREE.SphereGeometry(0.16, 20, 20), new THREE.MeshBasicMaterial({ color: 0xffe6b8 }));
    scene.add(coreMesh);
    const coreHalo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: 0xffd98a, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false }));
    coreHalo.scale.set(1.3, 1.3, 1);
    scene.add(coreHalo);

    // ── Module nodes (fixed ring) + connectors + pulses ───────────
    const moduleGroup = new THREE.Group();
    scene.add(moduleGroup);
    const NR = 2.15;
    const modMeshes: THREE.Mesh[] = [];
    const modPositions: THREE.Vector3[] = [];

    NODES.forEach((node, i) => {
      const dir = new THREE.Vector3(node.dir[0], node.dir[1], 0.42).normalize().multiplyScalar(NR);
      modPositions.push(dir);

      // glowing orb sprite
      const orb = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: 0xffd98a, transparent: true, opacity: 1, blending: THREE.AdditiveBlending, depthWrite: false }));
      orb.scale.set(0.5, 0.5, 1);
      orb.position.copy(dir);
      moduleGroup.add(orb);

      // raycast target (invisible-ish small mesh)
      const hit = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 12), new THREE.MeshBasicMaterial({ color: 0xffe6b0, transparent: true, opacity: 0.9 }));
      hit.position.copy(dir);
      hit.userData.nodeIndex = i;
      moduleGroup.add(hit);
      modMeshes.push(hit);

      // connector core → node
      const cg = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), dir]);
      moduleGroup.add(new THREE.Line(cg, new THREE.LineBasicMaterial({ color: 0xc5a059, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending, depthWrite: false })));
    });

    // Traveling pulses along connectors
    const pulseArr = new Float32Array(NODES.length * 3);
    const pulseGeo = new THREE.BufferGeometry();
    pulseGeo.setAttribute("position", new THREE.BufferAttribute(pulseArr, 3));
    const pulsePts = new THREE.Points(pulseGeo, new THREE.PointsMaterial({ map: glowTex, color: 0xffe49a, size: 0.18, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
    moduleGroup.add(pulsePts);
    const pulsePhase = NODES.map((_, i) => i / NODES.length);

    // Star field
    const starCount = 2200;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 20 + Math.random() * 28;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      starPos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      starPos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      starPos[i * 3 + 2] = r * Math.cos(ph);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.045, transparent: true, opacity: 0.45 })));

    // Podium rings beneath
    const podium = new THREE.Group();
    podium.position.y = -2.5;
    [1.5, 2.0, 2.5].forEach((r, i) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.01, 8, 160), new THREE.MeshBasicMaterial({ color: 0xe8c77e, transparent: true, opacity: 0.5 - i * 0.13 }));
      ring.rotation.x = Math.PI / 2;
      podium.add(ring);
    });
    scene.add(podium);

    // GSAP zoom-in
    const camZ = { value: 18.0 };
    gsap.to(camZ, { value: 7.6, duration: 3.0, ease: "power3.inOut", delay: 0.3 });

    // Mouse / raycaster
    const mouse = { x: 0, y: 0 };
    const pointer = new THREE.Vector2(-9, -9);
    const raycaster = new THREE.Raycaster();
    raycaster.params.Points = { threshold: 0.2 };
    let hoveredIdx: number | null = null;

    const onMouseMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouse.x = pointer.x;
      mouse.y = pointer.y;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(modMeshes, false);
      if (hits.length > 0) {
        const idx = (hits[0].object as THREE.Mesh).userData.nodeIndex as number;
        if (idx !== hoveredIdx) {
          hoveredIdx = idx;
          onHover({ nodeIndex: idx, x: e.clientX, y: e.clientY });
          document.body.style.cursor = "pointer";
        }
      } else if (hoveredIdx !== null) {
        hoveredIdx = null;
        onHover(null);
        document.body.style.cursor = "";
      }
    };
    const onMouseLeave = () => { hoveredIdx = null; onHover(null); document.body.style.cursor = ""; };
    mount.addEventListener("mousemove", onMouseMove);
    mount.addEventListener("mouseleave", onMouseLeave);

    // Labels
    const tmpVec = new THREE.Vector3();
    const labelContainer = labelContainerRef.current;
    const labelEls: HTMLDivElement[] = [];
    const centerLabelEl = document.createElement("div");

    if (labelContainer) {
      centerLabelEl.style.cssText = `position:absolute;transform:translate(-50%,-50%);pointer-events:none;text-align:center;transition:opacity 0.4s;`;
      centerLabelEl.innerHTML = `
        <div style="font-family:Georgia,serif;font-size:30px;font-weight:700;color:${CREAM};letter-spacing:0.05em;line-height:1;text-shadow:0 0 30px rgba(197,160,89,0.9),0 0 60px rgba(197,160,89,0.5);">LGS</div>
        <div style="font-size:8.5px;font-weight:700;color:${GOLD};letter-spacing:0.32em;margin-top:5px;font-family:system-ui,sans-serif;">QUANTUM LINK</div>`;
      labelContainer.appendChild(centerLabelEl);

      NODES.forEach((node) => {
        const el = document.createElement("div");
        el.style.cssText = `position:absolute;transform:translate(-50%,-50%);pointer-events:none;text-align:center;transition:opacity 0.25s;white-space:nowrap;`;
        el.innerHTML = `
          <div style="display:inline-flex;align-items:center;gap:6px;background:rgba(10,10,10,0.74);backdrop-filter:blur(12px);border:1px solid rgba(197,160,89,0.3);border-radius:999px;padding:4px 11px 4px 6px;box-shadow:0 4px 18px rgba(0,0,0,0.5);">
            <span style="width:18px;height:18px;border-radius:999px;background:rgba(197,160,89,0.18);display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="${GOLD}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[node.icon]}</svg>
            </span>
            <span style="font-size:9px;font-weight:700;color:${CREAM};letter-spacing:0.12em;text-transform:uppercase;font-family:system-ui,sans-serif;">${node.name}</span>
          </div>`;
        labelContainer.appendChild(el);
        labelEls.push(el);
      });
    }

    // Animation loop
    let t = 0;
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      t += 0.01;

      globe.rotation.y = t * 0.12;
      globe.rotation.x = Math.sin(t * 0.15) * 0.08;
      shell.rotation.copy(globe.rotation);
      const pulse = 4.6 + Math.sin(t * 1.8) * 0.8;
      coreLight.intensity = pulse;
      const cs = 1 + Math.sin(t * 1.8) * 0.06;
      coreMesh.scale.setScalar(cs);
      coreHalo.scale.set(1.3 * cs, 1.3 * cs, 1);
      podium.rotation.y = t * 0.15;
      moduleGroup.rotation.y = Math.sin(t * 0.2) * 0.05;

      camera.position.z = camZ.value;
      camera.position.x += (mouse.x * 0.45 - camera.position.x) * 0.04;
      camera.position.y += (mouse.y * 0.28 - camera.position.y) * 0.04;
      camera.lookAt(0, -0.25, 0);

      // travel pulses core → node
      for (let i = 0; i < modPositions.length; i++) {
        pulsePhase[i] += 0.006;
        if (pulsePhase[i] > 1) pulsePhase[i] -= 1;
        const p = modPositions[i];
        pulseArr[i * 3] = p.x * pulsePhase[i];
        pulseArr[i * 3 + 1] = p.y * pulsePhase[i];
        pulseArr[i * 3 + 2] = p.z * pulsePhase[i];
      }
      pulseGeo.attributes.position.needsUpdate = true;

      composer.render();

      if (labelContainer) {
        const c = new THREE.Vector3(0, 0, 0).project(camera);
        const cx = (c.x * 0.5 + 0.5) * W;
        const cy = (-c.y * 0.5 + 0.5) * H;
        centerLabelEl.style.left = `${cx}px`;
        centerLabelEl.style.top = `${cy}px`;
        centerLabelEl.style.opacity = camZ.value < 12 ? "1" : "0";

        modMeshes.forEach((m, i) => {
          const el = labelEls[i];
          if (!el) return;
          m.getWorldPosition(tmpVec);
          const proj = tmpVec.clone().project(camera);
          const x = (proj.x * 0.5 + 0.5) * W;
          const y = (-proj.y * 0.5 + 0.5) * H;
          // push label outward from center
          const dx = x - cx, dy = y - cy;
          const len = Math.hypot(dx, dy) || 1;
          el.style.left = `${x + (dx / len) * 26}px`;
          el.style.top = `${y + (dy / len) * 20}px`;
          el.style.opacity = proj.z < 1 && camZ.value < 9.5 ? "1" : "0";
        });
      }
    };
    animate();

    const onResize = () => {
      W = mount.offsetWidth;
      H = mount.offsetHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
      composer.setSize(W, H);
      bloom.resolution.set(W, H);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      mount.removeEventListener("mousemove", onMouseMove);
      mount.removeEventListener("mouseleave", onMouseLeave);
      document.body.style.cursor = "";
      if (labelContainer) {
        labelEls.forEach((el) => labelContainer.contains(el) && labelContainer.removeChild(el));
        if (labelContainer.contains(centerLabelEl)) labelContainer.removeChild(centerLabelEl);
      }
      glowTex.dispose();
      composer.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [onHover, labelContainerRef]);

  return <div ref={mountRef} className="absolute inset-0" />;
}

// ─────────────────────────────────────────────────────────────────
// Floating glass stat card
// ─────────────────────────────────────────────────────────────────
function StatCard({ value, label, className, delay }: { value: string; label: string; className: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      className={`absolute hidden lg:block z-20 ${className}`}
    >
      <motion.div animate={{ y: [0, -9, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay }}>
        <div className="rounded-2xl px-4 py-3 text-left" style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(16px)", border: `1px solid ${GOLD}26`, boxShadow: "0 8px 32px rgba(0,0,0,0.45)" }}>
          <p className="font-serif font-bold text-xl leading-none mb-1" style={{ color: CREAM }}>{value}</p>
          <p className="text-[10px] leading-tight" style={{ color: "rgba(245,242,237,0.5)" }}>{label}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────────
const PARTNERS = [
  "University of Bristol", "UCL", "King's College London",
  "University of Manchester", "University of Westminster", "Coventry University",
];

const Hero = () => {
  const navigate = useNavigate();
  const [hoverInfo, setHoverInfo] = useState<HoverInfo | null>(null);
  const labelContainerRef = useRef<HTMLDivElement>(null);
  const handleHover = useCallback((info: HoverInfo | null) => setHoverInfo(info), []);

  return (
    <section className="relative min-h-[100svh] overflow-hidden flex flex-col" style={{ background: OBSIDIAN }}>
      {/* Deep-space gradient */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse 65% 65% at 72% 42%, rgba(40,34,22,0.5) 0%, transparent 60%), radial-gradient(ellipse 90% 55% at 50% 122%, rgba(28,36,64,0.5) 0%, transparent 60%), #0A0A0A" }}
      />

      <AnimatePresence>
        {hoverInfo && <NodeCard key={hoverInfo.nodeIndex} info={hoverInfo} />}
      </AnimatePresence>

      {/* Main grid */}
      <div className="relative z-10 flex-1 container-custom grid lg:grid-cols-12 items-center gap-6 lg:gap-4 pt-28 lg:pt-24 pb-10">
        {/* LEFT — copy */}
        <div className="lg:col-span-5 order-2 lg:order-1">
          <motion.span
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.28em] uppercase mb-6"
            style={{ color: GOLD }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: GOLD }} />
            Welcome to LGS
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="font-serif font-bold leading-[1.05] mb-6"
            style={{ fontSize: "clamp(2.4rem,4.4vw,4rem)", color: CREAM }}
          >
            Quantum Link™<br />
            Connecting People.<br />
            Properties.<br />
            <span style={{ background: `linear-gradient(135deg,${GOLD} 0%,${GOLD_BRIGHT} 50%,${GOLD} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Possibilities.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-sm md:text-base leading-relaxed mb-8 max-w-md"
            style={{ color: "rgba(245,242,237,0.58)" }}
          >
            A technology-driven lifestyle infrastructure platform that seamlessly connects
            students, landlords, and support services through intelligent systems and human care.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => navigate("/auth")}
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full text-sm font-semibold transition-transform hover:scale-[1.03]"
              style={{ background: `linear-gradient(135deg,${GOLD},${GOLD_BRIGHT})`, color: OBSIDIAN, boxShadow: `0 8px 30px ${GOLD}40` }}
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate("/quantum-link")}
              className="inline-flex items-center gap-2.5 h-12 px-6 rounded-full text-sm font-semibold transition-colors"
              style={{ border: "1px solid rgba(245,242,237,0.2)", color: CREAM, background: "rgba(255,255,255,0.03)" }}
            >
              <span className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(197,160,89,0.16)" }}>
                <Play className="w-3 h-3 fill-current" style={{ color: GOLD }} />
              </span>
              Watch Video
            </button>
          </motion.div>
        </div>

        {/* RIGHT — 3D globe + floating stats */}
        <div className="lg:col-span-7 order-1 lg:order-2 relative h-[58vh] sm:h-[64vh] lg:h-[78vh]">
          <QuantumCanvas onHover={handleHover} labelContainerRef={labelContainerRef as React.RefObject<HTMLDivElement>} />
          <div ref={labelContainerRef} className="absolute inset-0 pointer-events-none overflow-visible" />

          <StatCard value="10K+" label="Students Supported" className="top-[6%] left-[2%]" delay={1.0} />
          <StatCard value="2K+" label="Properties Managed" className="top-[4%] right-[3%]" delay={1.15} />
          <StatCard value="24/7" label="Support" className="top-[44%] right-[-1%]" delay={1.3} />
          <StatCard value="99%" label="Occupancy Rate" className="bottom-[16%] left-[0%]" delay={1.45} />
          <StatCard value="5" label="Countries Supported" className="bottom-[8%] right-[4%]" delay={1.6} />
        </div>
      </div>

      {/* TRUSTED BY strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="relative z-10 border-t py-6 px-4"
        style={{ borderColor: "rgba(245,242,237,0.08)" }}
      >
        <div className="container-custom">
          <p className="text-center text-[10px] font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: GOLD }}>
            Trusted by Universities &amp; Partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {PARTNERS.map((p) => (
              <span key={p} className="font-serif text-sm md:text-base font-semibold tracking-wide" style={{ color: "rgba(245,242,237,0.42)" }}>
                {p}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
