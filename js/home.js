import * as THREE from 'three';
import { buildBrain, commitCortexColors, NEUTRAL } from './brain.js';
import { MODES, PARTS } from './data.js';
import { modeText, mountToggles, onVoiceChange, ui } from './voice.js';

mountToggles();

// ---------------------------------------------------------------------------
// Classification cards, generated from the same data the explorer uses
// ---------------------------------------------------------------------------

const cards = document.getElementById('mode-cards');

function renderCards() {
  cards.innerHTML = MODES.map((mode) => {
    const swatches = mode.parts.slice(0, 6).map((id) => `<i style="background:${PARTS[id].color}"></i>`).join('');
    const names = mode.parts.map((id) => PARTS[id].name).join(', ');
    return `
      <a class="card mode-card" href="explore.html#mode=${mode.id}">
        <span class="swatches">${swatches}</span>
        <h3>${modeText(mode.id).title}</h3>
        <p>${names}</p>
        <span class="go">${ui('explore')} &rarr;</span>
      </a>`;
  }).join('');
}

renderCards();
onVoiceChange(renderCards);

// ---------------------------------------------------------------------------
// Spinning brain preview inside the "click the brain" portal
// ---------------------------------------------------------------------------

const portal = document.getElementById('portal');

function startPreview() {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.NeutralToneMapping;
  portal.prepend(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 4 / 3, 0.1, 20);
  camera.position.set(0, 0.15, 3.6);
  camera.lookAt(0, -0.18, 0);

  scene.add(new THREE.HemisphereLight('#ffffff', '#bcd9ff', 1.2));
  const key = new THREE.DirectionalLight('#fff1e6', 1.7);
  key.position.set(2, 3, 2.5);
  const rim = new THREE.DirectionalLight('#ff8fd0', 1.2);
  rim.position.set(-2.5, 1, -3);
  scene.add(key, rim);

  const brain = buildBrain({ quality: 'low' });
  const pivot = new THREE.Group();
  pivot.add(brain.root);
  scene.add(pivot);

  // color the lobes like graffiti
  const lobeColors = [
    ['lobe:frontal', '#ff4fa3'],
    ['lobe:parietal', '#ffd93d'],
    ['lobe:temporal', '#8ce63b'],
    ['lobe:occipital', '#9b5cff'],
  ].map(([region, hex]) => [region, new THREE.Color(hex)]);
  for (const hemi of brain.hemis) {
    for (let i = 0; i < hemi.count; i++) {
      let color = NEUTRAL;
      for (const [region, c] of lobeColors) {
        if (hemi.masks.get(region)?.[i]) {
          color = c;
        }
      }
      color.toArray(hemi.paint, i * 3);
    }
    commitCortexColors(hemi);
  }
  const visible = new Set(['cerebellum', 'pons', 'medulla', 'spinal', 'tegmentum', 'tectum', 'supcol', 'infcol', 'peduncle', 'olfactory', 'pituitary']);
  for (const [key, list] of brain.meshes) {
    list.forEach((obj) => {
      obj.visible = visible.has(key);
    });
  }
  brain.meshes.get('cerebellum').forEach((m) => m.material.color.set('#36a8ff'));
  ['pons', 'medulla', 'spinal'].forEach((k) => brain.meshes.get(k).forEach((m) => m.material.color.set('#ff8a3d')));

  // brain leans toward the pointer
  const lean = { x: 0, y: 0 };
  portal.addEventListener('pointermove', (event) => {
    const rect = portal.getBoundingClientRect();
    lean.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    lean.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
  });
  portal.addEventListener('pointerleave', () => {
    lean.x = 0;
    lean.y = 0;
  });

  function resize() {
    const { clientWidth: width, clientHeight: height } = portal;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(portal);
  resize();

  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let running = false;
  let spin = 0.6;
  let last = performance.now();

  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (!still) {
      spin += dt * 0.5;
    }
    brain.root.rotation.y = spin;
    pivot.rotation.x += (lean.y * 0.25 - pivot.rotation.x) * 0.08;
    pivot.rotation.z += (-lean.x * 0.15 - pivot.rotation.z) * 0.08;
    pivot.position.y = still ? 0 : Math.sin(now / 900) * 0.04;
    renderer.render(scene, camera);
  }

  // only animate while the portal is on screen
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !running) {
      running = true;
      last = performance.now();
      renderer.setAnimationLoop(frame);
    } else if (!entry.isIntersecting && running) {
      running = false;
      renderer.setAnimationLoop(null);
    }
  }).observe(portal);
  renderer.render(scene, camera);
}

try {
  startPreview();
} catch (error) {
  console.error(error);
  const fallback = document.createElement('span');
  fallback.className = 'portal-fallback';
  fallback.textContent = 'Your brain is waiting inside. Tap to enter!';
  portal.prepend(fallback);
}
