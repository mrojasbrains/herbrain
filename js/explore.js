import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { buildBrain, commitCortexColors, NEUTRAL } from './brain.js';
import { MODES, PARTS } from './data.js';

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

const MODE_BY_ID = Object.fromEntries(MODES.map((mode) => [mode.id, mode]));
const DIM = new THREE.Color('#dce3ef');
const WHITE = new THREE.Color('#ffffff');

for (const [id, part] of Object.entries(PARTS)) {
  part.id = id;
  part.color3 = new THREE.Color(part.color);
}

// The first tab each part shows up in, used when jumping to a part from elsewhere.
const HOME_MODE = {};
for (const mode of MODES) {
  for (const id of mode.parts) {
    HOME_MODE[id] ??= mode.id;
  }
}

const smallScreen = matchMedia('(max-width: 820px)');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

const $ = (selector) => document.querySelector(selector);
const els = {
  stage: $('#stage'),
  panel: $('#panel'),
  panelBody: $('#panel-body'),
  sheetToggle: $('#sheet-toggle'),
  sheetTitle: $('#sheet-title'),
  tabs: $('#tabs'),
  search: $('#search'),
  results: $('#search-results'),
  hint: $('#hint'),
  toast: $('#toast'),
  loading: $('#loading'),
  reset: $('#btn-reset'),
  xray: $('#btn-xray'),
  labels: $('#btn-labels'),
  spin: $('#btn-spin'),
};

const state = {
  mode: MODES[0],
  part: null,
  hover: null,
  xray: false,
  labels: true,
  visual: null,
};

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.toneMappingExposure = 1.05;
els.stage.appendChild(renderer.domElement);

const labelRenderer = new CSS2DRenderer();
labelRenderer.domElement.className = 'label-layer';
els.stage.appendChild(labelRenderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(38, 1, 0.01, 50);

const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = 0.55;

scene.add(new THREE.HemisphereLight('#ffffff', '#bcd9ff', 0.9));
const keyLight = new THREE.DirectionalLight('#fff1e6', 1.6);
keyLight.position.set(2, 3, 2.5);
const rimLight = new THREE.DirectionalLight('#ff8fd0', 1.1);
rimLight.position.set(-2.5, 1, -3);
const fillLight = new THREE.DirectionalLight('#9fd3ff', 0.6);
fillLight.position.set(-2, -1.5, 2);
scene.add(keyLight, rimLight, fillLight);
scene.add(makeShadowBlob());

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.minDistance = 0.3;
controls.maxDistance = 7;
controls.zoomToCursor = true;
controls.rotateSpeed = 0.8;
controls.autoRotateSpeed = 1.2;

// let the loading screen paint before the (slightly heavy) brain build
await new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve, 30)));
const brain = buildBrain({ quality: smallScreen.matches ? 'mid' : 'high' });
scene.add(brain.root);

const homunculusLabels = brain.homunculusPoints().map((point) => {
  const el = document.createElement('div');
  el.className = 'homu';
  el.textContent = point.name;
  el.style.fontSize = `${Math.round(10 + 9 * (point.weight - 0.7))}px`;
  const obj = new CSS2DObject(el);
  obj.position.copy(point.pos);
  obj.visible = false;
  scene.add(obj);
  return { el, obj, point };
});

function makeShadowBlob() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, 'rgba(36, 60, 130, 0.32)');
  gradient.addColorStop(1, 'rgba(36, 60, 130, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);
  const blob = new THREE.Mesh(
    new THREE.PlaneGeometry(2.6, 2.0),
    new THREE.MeshBasicMaterial({
      map: new THREE.CanvasTexture(canvas),
      transparent: true,
      depthWrite: false,
    }),
  );
  blob.rotation.x = -Math.PI / 2;
  blob.position.y = -1.3;
  return blob;
}

// Calls fn for every real material on an object (handles groups, skips pick proxies).
function forEachMaterial(obj, fn) {
  if (obj.userData.proxy) {
    return;
  }
  if (obj.material) {
    fn(obj.material);
    return;
  }
  obj.children.forEach((child) => child.material && fn(child.material));
}

// ---------------------------------------------------------------------------
// What is visible, see-through and colored
// ---------------------------------------------------------------------------

function computeVisualState() {
  const mode = state.mode;
  const part = state.part ? PARTS[state.part] : null;
  const shown = new Set(mode.show);
  for (const id of mode.parts) {
    (PARTS[id].meshes ?? []).forEach((key) => shown.add(key));
  }
  const ghost = new Set(mode.ghost ?? []);
  (part?.ghost ?? []).forEach((key) => ghost.add(key));
  if (state.xray) {
    ghost.add('cortex');
  }
  let cortex = mode.cortex;
  if (cortex === 'opaque' && ghost.has('cortex')) {
    cortex = 'ghost';
  }
  return {
    shown,
    ghost,
    translucent: new Set(mode.translucent ?? []),
    cortex,
  };
}

function applyVisibility() {
  const vs = computeVisualState();
  state.visual = vs;

  const material = brain.cortexMaterial;
  const ghosted = vs.cortex === 'ghost';
  if (material.userData.ghosted !== ghosted) {
    material.userData.ghosted = ghosted;
    material.transparent = ghosted;
    material.opacity = ghosted ? 0.13 : 1;
    material.depthWrite = !ghosted;
    material.needsUpdate = true;
  }
  for (const hemi of brain.hemis) {
    hemi.mesh.visible = vs.cortex !== 'hidden';
    hemi.mesh.renderOrder = ghosted ? 10 : 0;
  }

  for (const [key, list] of brain.meshes) {
    const visible = vs.shown.has(key);
    const ghost = vs.ghost.has(key);
    const translucent = vs.translucent.has(key);
    for (const obj of list) {
      obj.visible = visible;
      obj.renderOrder = ghost ? 8 : translucent ? 4 : 0;
      forEachMaterial(obj, (mat) => {
        mat.opacity = ghost ? 0.14 : translucent ? 0.35 : (obj.userData.baseOpacity ?? 1);
        mat.depthWrite = !(ghost || translucent);
      });
    }
  }
}

function modePaintParts() {
  return state.mode.parts.map((id) => PARTS[id]).filter((part) => !part.noPaint);
}

function paintCortex() {
  const selected = state.part ? PARTS[state.part] : null;
  const hovered = state.hover && state.hover !== state.part ? PARTS[state.hover] : null;
  const painters = modePaintParts().filter((part) => part.regions);

  for (const hemi of brain.hemis) {
    const out = hemi.paint;
    const n = hemi.count;
    for (let i = 0; i < n; i++) {
      out[i * 3] = NEUTRAL.r;
      out[i * 3 + 1] = NEUTRAL.g;
      out[i * 3 + 2] = NEUTRAL.b;
    }
    for (const part of painters) {
      const { r, g, b } = part.color3;
      for (const region of part.regions) {
        const mask = hemi.masks.get(region);
        if (!mask) {
          continue;
        }
        for (let i = 0; i < n; i++) {
          if (mask[i]) {
            out[i * 3] = r;
            out[i * 3 + 1] = g;
            out[i * 3 + 2] = b;
          }
        }
      }
    }
    if (selected) {
      blendRegions(hemi, selected.regions, selected.color3, 1, DIM, 0.75);
    }
    if (hovered?.regions) {
      blendRegions(hemi, hovered.regions, WHITE, 0.35, null, 0);
    }
    commitCortexColors(hemi);
  }
}

// Inside the regions: blend toward insideColor. Outside: blend toward outsideColor.
function blendRegions(hemi, regions, insideColor, insideAmount, outsideColor, outsideAmount) {
  const masks = (regions ?? []).map((region) => hemi.masks.get(region)).filter(Boolean);
  const out = hemi.paint;
  for (let i = 0; i < hemi.count; i++) {
    let inside = false;
    for (const mask of masks) {
      if (mask[i]) {
        inside = true;
        break;
      }
    }
    const color = inside ? insideColor : outsideColor;
    const amount = inside ? insideAmount : outsideAmount;
    if (!color || amount === 0) {
      continue;
    }
    out[i * 3] += (color.r - out[i * 3]) * amount;
    out[i * 3 + 1] += (color.g - out[i * 3 + 1]) * amount;
    out[i * 3 + 2] += (color.b - out[i * 3 + 2]) * amount;
  }
}

let pulsing = [];

function paintMeshes() {
  const selected = state.part ? PARTS[state.part] : null;
  const hovered = state.hover && state.hover !== state.part ? PARTS[state.hover] : null;
  const painters = modePaintParts().filter((part) => part.meshes);
  pulsing = [];

  for (const [key, list] of brain.meshes) {
    const color = NEUTRAL.clone();
    for (const part of painters) {
      if (part.meshes.includes(key)) {
        color.copy(part.color3);
      }
    }
    const isSelected = Boolean(selected?.meshes?.includes(key));
    if (selected) {
      if (isSelected) {
        color.copy(selected.color3);
      } else {
        color.lerp(DIM, 0.7);
      }
    }
    if (hovered?.meshes?.includes(key)) {
      color.lerp(WHITE, 0.3);
    }
    for (const obj of list) {
      forEachMaterial(obj, (mat) => {
        mat.color.copy(color);
        if (mat.emissive) {
          mat.emissive.copy(isSelected ? selected.color3 : WHITE);
          mat.emissiveIntensity = 0;
          if (isSelected) {
            pulsing.push(mat);
          }
        }
      });
    }
  }
}

function refreshScene() {
  applyVisibility();
  paintCortex();
  paintMeshes();
  refreshLabelClasses();
}

// ---------------------------------------------------------------------------
// Labels
// ---------------------------------------------------------------------------

let labels = [];

function anchorsFor(part) {
  if (part.regions?.length) {
    const anchors = brain.regionAnchors(part.regions, part.anchorHint);
    return part.homunculus ? anchors.slice(0, 1) : anchors;
  }
  return brain.meshAnchors(part.meshes);
}

function buildLabels() {
  labels.forEach((label) => label.obj.removeFromParent());
  labels = state.mode.parts.map((id) => {
    const part = PARTS[id];
    const el = document.createElement('div');
    el.className = 'label-wrap';
    // labels like "4 · Motor" shrink to just "4" on phones so the brain is not buried
    const full = part.short ?? part.name;
    const text = smallScreen.matches && full.includes(' · ') ? full.split(' · ')[0] : full;
    el.innerHTML = `<button class="label" type="button" style="--c:${part.color}"><i></i><span>${escapeHtml(text)}</span></button>`;
    el.querySelector('button').addEventListener('click', (event) => {
      event.stopPropagation();
      selectPart(state.part === id ? null : id);
    });
    const obj = new CSS2DObject(el);
    scene.add(obj);
    const anchors = anchorsFor(part);
    return {
      id,
      el,
      obj,
      anchors,
      onSurface: Boolean(part.regions?.length),
    };
  });
  refreshLabelClasses();
}

function refreshLabelClasses() {
  for (const label of labels) {
    const part = PARTS[label.id];
    const button = label.el.firstElementChild;
    const hidden = part.ghost?.includes('cortex') && state.visual.cortex === 'opaque';
    button.classList.toggle('inside', Boolean(hidden));
    button.classList.toggle('active', state.part === label.id);
  }
  const showHomunculus = state.part === 'homunculus';
  homunculusLabels.forEach((label) => {
    label.obj.visible = showHomunculus && state.labels;
  });
}

const toCamera = new THREE.Vector3();

function bestAnchor(anchors) {
  let best = anchors[0];
  let bestScore = -Infinity;
  for (const anchor of anchors) {
    let score;
    if (anchor.normal) {
      score = toCamera.copy(camera.position).sub(anchor.pos).normalize().dot(anchor.normal);
    } else {
      score = -anchor.pos.distanceTo(camera.position);
    }
    if (score > bestScore) {
      bestScore = score;
      best = anchor;
    }
  }
  return best;
}

function smoothstep(a, b, x) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

const projected = new THREE.Vector3();
const LABEL_HEIGHT = 26;

// Nudges labels down so they do not sit on top of each other.
function spreadLabels(visible) {
  const width = els.stage.clientWidth;
  const height = els.stage.clientHeight;
  const items = visible.map((label) => {
    projected.copy(label.obj.position).project(camera);
    label.width ||= label.el.firstElementChild.offsetWidth;
    return {
      label,
      x: ((projected.x + 1) / 2) * width,
      y: ((1 - projected.y) / 2) * height,
      w: label.width || 110,
      first: label.id === state.part,
    };
  });
  items.sort((a, b) => (b.first - a.first) || (a.y - b.y));
  const placed = [];
  for (const item of items) {
    let offset = 0;
    for (let attempt = 0; attempt < 10; attempt++) {
      const y = item.y + offset;
      const hit = placed.find((p) => Math.abs(p.x - item.x) < (p.w + item.w) / 2 + 6 && Math.abs(p.y - y) < LABEL_HEIGHT);
      if (!hit) {
        break;
      }
      offset = hit.y + LABEL_HEIGHT - item.y;
    }
    offset = Math.min(offset, 110);
    placed.push({ x: item.x, y: item.y + offset, w: item.w });
    item.label.el.style.top = `${offset}px`;
  }
}

function updateLabels() {
  const surfaceVisible = state.visual.cortex === 'opaque';
  const visible = [];
  for (const label of labels) {
    if (!state.labels || !label.anchors.length) {
      label.obj.visible = false;
      continue;
    }
    label.obj.visible = true;
    const anchor = bestAnchor(label.anchors);
    label.obj.position.copy(anchor.pos);
    let opacity = 1;
    if (label.onSurface && surfaceVisible && anchor.normal) {
      const facing = toCamera.copy(camera.position).sub(anchor.pos).normalize().dot(anchor.normal);
      opacity = smoothstep(-0.05, 0.25, facing);
    }
    if (state.part && state.part !== label.id) {
      opacity *= 0.45;
    }
    label.el.style.opacity = opacity.toFixed(2);
    label.el.style.pointerEvents = opacity < 0.2 ? 'none' : '';
    if (opacity >= 0.2) {
      visible.push(label);
    }
  }
  spreadLabels(visible);
  for (const label of homunculusLabels) {
    if (!label.obj.visible) {
      continue;
    }
    const facing = toCamera.copy(camera.position).sub(label.point.pos).normalize().dot(label.point.normal);
    label.el.style.opacity = smoothstep(-0.1, 0.2, facing).toFixed(2);
  }
}

// ---------------------------------------------------------------------------
// Camera flights
// ---------------------------------------------------------------------------

let flight = null;

function flyTo(position, target, duration = 950) {
  flight = {
    fromTarget: controls.target.clone(),
    toTarget: target.clone(),
    fromOffset: camera.position.clone().sub(controls.target),
    toOffset: position.clone().sub(target),
    start: performance.now(),
    duration,
  };
}

function stepFlight(now) {
  if (!flight) {
    return;
  }
  const t = Math.min(1, (now - flight.start) / flight.duration);
  const k = t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
  const fromDir = flight.fromOffset.clone().normalize();
  const toDir = flight.toOffset.clone().normalize();
  const rotation = new THREE.Quaternion().setFromUnitVectors(fromDir, toDir);
  const partial = new THREE.Quaternion().slerp(rotation, k);
  const length = THREE.MathUtils.lerp(flight.fromOffset.length(), flight.toOffset.length(), k);
  controls.target.lerpVectors(flight.fromTarget, flight.toTarget, k);
  camera.position.copy(controls.target).add(fromDir.applyQuaternion(partial).multiplyScalar(length));
  if (t >= 1) {
    flight = null;
  }
}

const vec = (array) => new THREE.Vector3(...array);

// Tall, narrow screens (phones) need the camera further back to fit the same view.
const fitDistance = (distance) => distance * Math.max(1, 1.15 / camera.aspect);

function fittedView(pos, target) {
  const offset = pos.clone().sub(target);
  return target.clone().addScaledVector(offset.normalize(), fitDistance(pos.distanceTo(target)));
}

function flyToMode() {
  const target = vec(state.mode.camera.target);
  flyTo(fittedView(vec(state.mode.camera.pos), target), target);
}

function focusPart(part) {
  if (part.view) {
    const target = vec(part.view.target);
    flyTo(fittedView(vec(part.view.pos), target), target);
    return;
  }
  const label = labels.find((l) => l.id === part.id);
  const anchors = label?.anchors.length ? label.anchors : anchorsFor(part);
  if (!anchors.length) {
    return;
  }
  const anchor = bestAnchor(anchors);
  const currentDir = camera.position.clone().sub(controls.target).normalize();
  const modeTarget = vec(state.mode.camera.target);
  const modeDistance = vec(state.mode.camera.pos).distanceTo(modeTarget);

  if (part.wide) {
    const dir = anchor.normal ? anchor.normal.clone().lerp(currentDir, 0.35).normalize() : currentDir;
    flyTo(modeTarget.clone().addScaledVector(dir, fitDistance(modeDistance)), modeTarget);
    return;
  }
  const dir = currentDir.clone();
  if (anchor.normal && state.visual.cortex === 'opaque') {
    dir.lerp(anchor.normal, 0.65).normalize();
  }
  const target = anchor.pos.clone();
  flyTo(target.clone().addScaledVector(dir, fitDistance(part.dist ?? 1.4)), target);
}

// ---------------------------------------------------------------------------
// Picking parts with mouse / finger
// ---------------------------------------------------------------------------

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function pickTargets() {
  const vs = state.visual;
  const targets = [];
  if (vs.cortex === 'opaque') {
    brain.hemis.forEach((hemi) => targets.push(hemi.mesh));
  }
  for (const [key, list] of brain.meshes) {
    if (!vs.shown.has(key) || vs.ghost.has(key)) {
      continue;
    }
    for (const obj of list) {
      if (key !== 'reticular' || obj.userData.proxy) {
        targets.push(obj);
      }
    }
  }
  return targets;
}

// Returns { part, key } for whatever is under the pointer.
function pickAt(clientX, clientY) {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(pickTargets(), false);
  const hit = hits.find((h) => !state.visual.translucent.has(h.object.userData.key)) ?? hits[0];
  if (!hit) {
    return { part: null, key: null };
  }
  const hemi = hit.object.userData.hemi;
  if (hemi) {
    return { part: partForVertex(hemi, hit.face.a), key: 'cortex' };
  }
  const key = hit.object.userData.key;
  return { part: partForMesh(key), key };
}

// Most specific part (painted last) wins; group parts only if nothing else matches.
function partForVertex(hemi, index) {
  const parts = state.mode.parts.map((id) => PARTS[id]);
  let fallback = null;
  for (let k = parts.length - 1; k >= 0; k--) {
    const part = parts[k];
    if (!part.regions?.some((region) => hemi.masks.get(region)?.[index])) {
      continue;
    }
    if (!part.noPaint) {
      return part.id;
    }
    fallback ??= part.id;
  }
  return fallback;
}

function partForMesh(key) {
  const parts = state.mode.parts.map((id) => PARTS[id]);
  let fallback = null;
  for (let k = parts.length - 1; k >= 0; k--) {
    const part = parts[k];
    if (!part.meshes?.includes(key)) {
      continue;
    }
    if (!part.noPaint) {
      return part.id;
    }
    fallback ??= part.id;
  }
  return fallback;
}

// When you tap something that belongs to a different tab, point you there.
function suggestElsewhere(key) {
  if (!key || key === 'cortex') {
    return;
  }
  const match = Object.values(PARTS).find((part) => !part.noPaint && part.meshes?.length === 1 && part.meshes[0] === key)
    ?? Object.values(PARTS).find((part) => !part.noPaint && part.meshes?.includes(key));
  if (!match) {
    return;
  }
  const mode = MODE_BY_ID[HOME_MODE[match.id]];
  showToast(`That's the <b>${escapeHtml(match.name)}</b>. It lives in the <b>${escapeHtml(mode.tab)}</b> tab.`, () => goToPart(match.id));
}

const activePointers = new Set();
let press = null;

renderer.domElement.addEventListener('pointerdown', (event) => {
  activePointers.add(event.pointerId);
  press = activePointers.size === 1
    ? { x: event.clientX, y: event.clientY, time: performance.now() }
    : null;
});

renderer.domElement.addEventListener('pointerup', (event) => {
  activePointers.delete(event.pointerId);
  if (!press) {
    return;
  }
  const moved = Math.hypot(event.clientX - press.x, event.clientY - press.y);
  const quick = performance.now() - press.time < 600;
  press = null;
  if (moved > 7 || !quick) {
    return;
  }
  const { part, key } = pickAt(event.clientX, event.clientY);
  if (part) {
    selectPart(part);
    return;
  }
  if (state.part) {
    selectPart(null);
  }
  suggestElsewhere(key);
});

renderer.domElement.addEventListener('pointercancel', (event) => {
  activePointers.delete(event.pointerId);
  press = null;
});

let hoverQueued = null;
let lastHoverAt = 0;

if (finePointer) {
  renderer.domElement.addEventListener('pointermove', (event) => {
    if (event.buttons) {
      return;
    }
    hoverQueued = { x: event.clientX, y: event.clientY };
  });
  renderer.domElement.addEventListener('pointerleave', () => {
    hoverQueued = null;
    setHover(null);
  });
}

function processHover(now) {
  if (!hoverQueued || now - lastHoverAt < 70) {
    return;
  }
  lastHoverAt = now;
  const { part } = pickAt(hoverQueued.x, hoverQueued.y);
  hoverQueued = null;
  setHover(part);
}

function setHover(id) {
  renderer.domElement.style.cursor = id ? 'pointer' : '';
  if (state.hover === id) {
    return;
  }
  state.hover = id;
  paintCortex();
  paintMeshes();
}

// ---------------------------------------------------------------------------
// Selecting modes and parts
// ---------------------------------------------------------------------------

function applyMode(id, { part = null, fly = true } = {}) {
  state.mode = MODE_BY_ID[id] ?? MODES[0];
  state.part = null;
  state.hover = null;
  applyVisibility();
  buildLabels();
  refreshScene();
  renderTabs();
  renderPanel();
  if (part && state.mode.parts.includes(part)) {
    selectPart(part);
    return;
  }
  updateHash();
  if (fly) {
    flyToMode();
  }
}

function selectPart(id, { fly = true } = {}) {
  state.part = id;
  refreshScene();
  renderPanel();
  updateHash();
  if (id && fly) {
    focusPart(PARTS[id]);
  }
  if (id && smallScreen.matches) {
    setSheet(true);
  }
}

function goToPart(id) {
  if (state.mode.parts.includes(id)) {
    selectPart(id);
    return;
  }
  applyMode(HOME_MODE[id], { part: id });
}

function updateHash() {
  const hash = `#mode=${state.mode.id}${state.part ? `&part=${state.part}` : ''}`;
  history.replaceState(null, '', hash);
}

function readHash() {
  const params = new URLSearchParams(location.hash.slice(1));
  return {
    mode: params.get('mode'),
    part: params.get('part'),
  };
}

// ---------------------------------------------------------------------------
// UI: tabs, side panel, search, toolbar
// ---------------------------------------------------------------------------

function escapeHtml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function renderTabs() {
  els.tabs.innerHTML = MODES.map((mode, i) => `
    <button type="button" role="tab" class="tab tab-${i % 6}" data-mode="${mode.id}"
      aria-selected="${mode.id === state.mode.id}">${escapeHtml(mode.tab)}</button>`).join('');
  els.tabs.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest', inline: 'center' });
}

els.tabs.addEventListener('click', (event) => {
  const button = event.target.closest('[data-mode]');
  if (button) {
    applyMode(button.dataset.mode);
  }
});

function chipList(title, ids) {
  const valid = (ids ?? []).filter((id) => PARTS[id]);
  if (!valid.length) {
    return '';
  }
  return `<div class="chips"><span class="chips-title">${title}</span>${valid.map((id) => `
    <button type="button" class="chip" data-goto="${id}" style="--c:${PARTS[id].color}">${escapeHtml(PARTS[id].name)}</button>`).join('')}</div>`;
}

function renderPanel() {
  const mode = state.mode;
  const part = state.part ? PARTS[state.part] : null;
  els.sheetTitle.textContent = part ? part.name : mode.title;

  if (!part) {
    els.panelBody.innerHTML = `
      <p class="eyebrow">Classification</p>
      <h2 class="panel-title">${escapeHtml(mode.title)}</h2>
      <p class="blurb">${escapeHtml(mode.blurb)}</p>
      <p class="panel-hint">Tap a part on the brain, or pick one:</p>
      <ul class="part-list">${mode.parts.map((id) => {
        const p = PARTS[id];
        return `<li><button type="button" data-part="${id}" style="--c:${p.color}">
          <i></i><span><b>${escapeHtml(p.name)}</b><small>${escapeHtml(p.aka)}</small></span></button></li>`;
      }).join('')}</ul>`;
    els.panelBody.scrollTop = 0;
    return;
  }

  const index = mode.parts.indexOf(part.id);
  const count = mode.parts.length;
  els.panelBody.innerHTML = `
    <div class="card-nav">
      <button type="button" class="link-btn" data-back>&larr; All parts</button>
      <span>${index + 1} / ${count}</span>
    </div>
    <div class="card-title" style="--c:${part.color}">
      <i></i>
      <div><h2>${escapeHtml(part.name)}</h2><p class="aka">${escapeHtml(part.aka)}</p></div>
    </div>
    <p class="tagline">${escapeHtml(part.tagline)}</p>
    <h3>Where is it?</h3>
    <p>${escapeHtml(part.where)}</p>
    <h3>What does it do?</h3>
    <ul class="does">${part.does.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
    <div class="fact"><span class="fact-tag">Fun fact</span><p>${escapeHtml(part.fact)}</p></div>
    ${chipList('Includes', part.includes)}
    ${chipList('Part of', part.belongs)}
    <div class="pager">
      <button type="button" class="sticker-btn small" data-step="-1">&larr; Prev</button>
      <button type="button" class="sticker-btn small pink" data-step="1">Next &rarr;</button>
    </div>`;
  els.panelBody.scrollTop = 0;
}

els.panelBody.addEventListener('click', (event) => {
  const target = event.target.closest('button');
  if (!target) {
    return;
  }
  if (target.dataset.part) {
    selectPart(target.dataset.part);
  } else if (target.dataset.goto) {
    goToPart(target.dataset.goto);
  } else if ('back' in target.dataset) {
    selectPart(null);
    flyToMode();
  } else if (target.dataset.step) {
    const parts = state.mode.parts;
    const next = (parts.indexOf(state.part) + Number(target.dataset.step) + parts.length) % parts.length;
    selectPart(parts[next]);
  }
});

function setSheet(open) {
  els.panel.classList.toggle('open', open);
  els.sheetToggle.setAttribute('aria-expanded', String(open));
}

els.sheetToggle.addEventListener('click', () => setSheet(!els.panel.classList.contains('open')));

// search across every part in every tab
const searchIndex = Object.values(PARTS).map((part) => ({
  id: part.id,
  text: `${part.name} ${part.aka} ${part.short ?? ''}`.toLowerCase(),
}));

function renderResults() {
  const query = els.search.value.trim().toLowerCase();
  if (!query) {
    els.results.hidden = true;
    return;
  }
  const matches = searchIndex.filter((entry) => entry.text.includes(query)).slice(0, 8);
  els.results.innerHTML = matches.length
    ? matches.map((entry) => {
      const part = PARTS[entry.id];
      const mode = MODE_BY_ID[HOME_MODE[entry.id]];
      return `<li><button type="button" data-goto="${entry.id}" style="--c:${part.color}"><i></i>
        <span><b>${escapeHtml(part.name)}</b><small>${escapeHtml(mode.tab)}</small></span></button></li>`;
    }).join('')
    : '<li class="empty">No parts found. Try another spelling?</li>';
  els.results.hidden = false;
}

els.search.addEventListener('input', renderResults);
els.search.addEventListener('focus', renderResults);
els.search.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    els.results.querySelector('[data-goto]')?.click();
  } else if (event.key === 'Escape') {
    els.search.blur();
    els.results.hidden = true;
  }
});
els.results.addEventListener('click', (event) => {
  const button = event.target.closest('[data-goto]');
  if (!button) {
    return;
  }
  els.search.value = '';
  els.results.hidden = true;
  els.search.blur();
  goToPart(button.dataset.goto);
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.search')) {
    els.results.hidden = true;
  }
});

function setPressed(button, on) {
  button.setAttribute('aria-pressed', String(on));
}

els.reset.addEventListener('click', () => {
  selectPart(null, { fly: false });
  flyToMode();
});
els.xray.addEventListener('click', () => {
  state.xray = !state.xray;
  setPressed(els.xray, state.xray);
  refreshScene();
});
els.labels.addEventListener('click', () => {
  state.labels = !state.labels;
  setPressed(els.labels, state.labels);
  refreshLabelClasses();
});
els.spin.addEventListener('click', () => {
  controls.autoRotate = !controls.autoRotate;
  setPressed(els.spin, controls.autoRotate);
});

let toastTimer = null;
function showToast(html, onClick) {
  els.toast.innerHTML = `<span>${html}</span>${onClick ? '<button type="button" class="sticker-btn small lime">Take me there</button>' : ''}`;
  els.toast.hidden = false;
  els.toast.querySelector('button')?.addEventListener('click', () => {
    els.toast.hidden = true;
    onClick();
  });
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    els.toast.hidden = true;
  }, 5000);
}

function hideHint() {
  els.hint.classList.add('gone');
}

controls.addEventListener('start', () => {
  flight = null;
  hideHint();
});
setTimeout(hideHint, 9000);
if (!finePointer) {
  els.hint.textContent = 'Drag to spin · Pinch to zoom · Tap a part';
}

// ---------------------------------------------------------------------------
// Resize + render loop
// ---------------------------------------------------------------------------

function resize() {
  const { clientWidth: width, clientHeight: height } = els.stage;
  if (!width || !height) {
    return;
  }
  renderer.setSize(width, height);
  labelRenderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}
new ResizeObserver(resize).observe(els.stage);
resize();

renderer.setAnimationLoop((now) => {
  stepFlight(now);
  processHover(now);
  controls.update();
  const glow = 0.18 + 0.14 * Math.sin(now / 260);
  pulsing.forEach((mat) => {
    mat.emissiveIntensity = glow;
  });
  updateLabels();
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
});

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------

const initial = readHash();
const startMode = MODE_BY_ID[initial.mode] ?? MODES[0];
camera.position.copy(vec(startMode.camera.pos)).multiplyScalar(1.6);
controls.target.copy(vec(startMode.camera.target));
applyMode(startMode.id, { part: initial.part });
setSheet(!smallScreen.matches);
els.loading.classList.add('gone');
window.__ready = true;
