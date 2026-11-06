// Builds a stylized, procedurally generated 3D brain.
//
// Coordinate system (world space):
//   +x = the brain's LEFT side, -x = the brain's RIGHT side
//   +y = up (superior), +z = front (anterior)
//
// The cerebral cortex is two deformed spheres with grooves carved in to look like
// gyri (ridges) and sulci (grooves). Every cortex vertex is tagged with the regions it
// belongs to (hemisphere, lobe, special areas, cortex type) so the explorer can color
// the brain by any classification. Everything else (thalamus, brainstem, ...) is a
// separate mesh, looked up by a short key.

import * as THREE from 'three';
import { ImprovedNoise } from 'three/addons/math/ImprovedNoise.js';
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';

export const NEUTRAL = new THREE.Color('#f5cfe0');

const perlin = new ImprovedNoise();
const noise = (x, y, z) => perlin.noise(x, y, z);

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const gauss = (x, mu, s) => Math.exp(-(((x - mu) / s) ** 2));

function smoothstep(a, b, x) {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
}

// Scales the negative side of u by k and keeps the positive side, with a smooth join.
function softScaleNegative(u, k, e) {
  return 0.5 * ((1 + k) * u + (1 - k) * (Math.sqrt(u * u + e * e) - e));
}

// ---------------------------------------------------------------------------
// Cerebral hemisphere shape
// ---------------------------------------------------------------------------

const HEMI = {
  ax: 0.527,
  ay: 0.48,
  az: 0.9,
  cx: 0.241,
  cy: 0.12,
};

// Lateral (Sylvian) sulcus, as a polyline in hemisphere-local (z, y), front to back.
const LATERAL_SULCUS = [
  [0.62, -0.33],
  [0.45, -0.27],
  [0.2, -0.2],
  [-0.05, -0.13],
  [-0.28, -0.05],
  [-0.42, 0.06],
];

const CALCARINE_SULCUS = [
  [-0.58, -0.06],
  [-0.75, -0.04],
  [-0.95, -0.02],
];

function lateralSulcusY(z) {
  const first = LATERAL_SULCUS[0];
  const last = LATERAL_SULCUS[LATERAL_SULCUS.length - 1];
  if (z >= first[0]) {
    return first[1] - (z - first[0]) * 0.4;
  }
  if (z <= last[0]) {
    return last[1] + (last[0] - z) * 0.8;
  }
  for (let i = 0; i < LATERAL_SULCUS.length - 1; i++) {
    const [z0, y0] = LATERAL_SULCUS[i];
    const [z1, y1] = LATERAL_SULCUS[i + 1];
    if (z <= z0 && z >= z1) {
      return y0 + ((y1 - y0) * (z - z0)) / (z1 - z0);
    }
  }
  return last[1];
}

const centralSulcusZ = (y) => 0.13 - 0.38 * y + 0.018 * Math.sin(y * 17);
const parietoOccipitalZ = (y) => -0.6 + 0.08 * y;

function distanceToPolyline(z, y, points) {
  let best = Infinity;
  for (let i = 0; i < points.length - 1; i++) {
    const [az, ay] = points[i];
    const [bz, by] = points[i + 1];
    const dz = bz - az;
    const dy = by - ay;
    const t = clamp01(((z - az) * dz + (y - ay) * dy) / (dz * dz + dy * dy));
    const pz = az + dz * t;
    const py = ay + dy * t;
    best = Math.min(best, Math.hypot(z - pz, y - py));
  }
  return best;
}

// Unit sphere direction (ux = lateral, uy = up, uz = front) -> hemisphere-local position.
function deformHemisphere(ux, uy, uz) {
  let xl = softScaleNegative(ux, 0.4, 0.12) * HEMI.ax;
  let y = softScaleNegative(uy, 0.78, 0.12) * HEMI.ay;
  const z = uz * HEMI.az;

  // temporal lobe bulges down and out on the lower side
  const temporalWeight = gauss(uz, 0.02, 0.42) * smoothstep(0.1, -0.7, uy) * smoothstep(-0.25, 0.55, ux);
  y -= 0.2 * temporalWeight;
  xl += 0.035 * temporalWeight;

  // occipital pole tapers
  const occipitalWeight = smoothstep(-0.45, -1.0, uz);
  xl *= 1 - 0.2 * occipitalWeight;
  y = y * (1 - 0.1 * occipitalWeight) - 0.03 * occipitalWeight;

  // frontal pole narrows slightly
  const frontalWeight = smoothstep(0.45, 1.0, uz);
  xl *= 1 - 0.1 * frontalWeight;
  y -= 0.025 * frontalWeight;

  // crown is highest around the parietal area
  y += 0.035 * gauss(uz, -0.15, 0.5) * Math.max(uy, 0);

  return [xl, y, z];
}

function corticalDisplacement(ux, xl, y, z, wx, wy, wz) {
  // domain-warped noise; its zero-crossings become wiggly grooves (sulci)
  const s = 1.6;
  const qx = wx + 0.25 * noise(wx * s + 11.3, wy * s + 2.1, wz * s + 5.7);
  const qy = wy + 0.25 * noise(wx * s + 3.7, wy * s + 9.2, wz * s + 1.4);
  const qz = wz + 0.25 * noise(wx * s + 6.1, wy * s + 4.4, wz * s + 8.8);
  const f = 4.4;
  const n = Math.abs(noise(qx * f, qy * f, qz * f));
  const groove = 1 - smoothstep(0.0, 0.17, n);
  const crown = smoothstep(0.08, 0.4, n);
  let d = -0.03 * groove + 0.008 * crown;

  const n2 = Math.abs(noise(qx * f * 2.1 + 7, qy * f * 2.1 + 3, qz * f * 2.1 + 1));
  const groove2 = (1 - smoothstep(0, 0.2, n2)) * crown;
  d -= 0.008 * groove2;

  let cavity = Math.max(groove, groove2 * 0.4);

  // lateral sulcus
  const lateralWeight = smoothstep(-0.15, 0.35, ux);
  const dl = distanceToPolyline(z, y, LATERAL_SULCUS);
  const gl = Math.exp(-((dl / 0.045) ** 2)) * lateralWeight;
  d -= 0.12 * gl;
  cavity = Math.max(cavity, gl);

  // central sulcus (stops just above the lateral sulcus)
  const yEnd = lateralSulcusY(z) + 0.04;
  const dc = Math.abs(z - centralSulcusZ(y)) * 0.93;
  const gc = Math.exp(-((dc / 0.024) ** 2)) * smoothstep(yEnd, yEnd + 0.05, y) * smoothstep(-0.75, -0.4, ux);
  d -= 0.055 * gc;
  cavity = Math.max(cavity, gc);

  // medial surface: parieto-occipital and calcarine sulci
  const medialWeight = smoothstep(-0.15, -0.45, ux);
  const dpo = Math.abs(z - parietoOccipitalZ(y));
  const gpo = Math.exp(-((dpo / 0.025) ** 2)) * medialWeight * smoothstep(-0.12, 0.0, y);
  const dca = distanceToPolyline(z, y, CALCARINE_SULCUS);
  const gca = Math.exp(-((dca / 0.022) ** 2)) * medialWeight;
  const gm = Math.max(gpo, gca);
  d -= 0.05 * gm;
  cavity = Math.max(cavity, gm);

  return [d, clamp01(cavity)];
}

// Brodmann areas, as an ordered list of rules: the first rule that matches wins.
// c.dz = distance in front of the central sulcus (negative means behind it)
// c.dy = height above the lateral sulcus (negative means below it)
// Areas 9/46, 20/21, 41/42, 44/45 and 3/1/2 are grouped, as they are usually taught together.
const BRODMANN_RULES = [
  ['17', (c) => c.lobe === 'occipital' && (c.z < -0.8 || (c.medial && c.y > -0.17 && c.y < 0.07))],
  ['18', (c) => c.lobe === 'occipital' && (c.z < -0.7 || c.medial)],
  ['19', (c) => c.lobe === 'occipital'],
  [null, (c) => c.lobe === 'temporal' && c.medial],
  ['38', (c) => c.lobe === 'temporal' && c.z > 0.32],
  ['41', (c) => c.lobe === 'temporal' && c.lateral && c.z > -0.1 && c.z < 0.14 && c.dy > -0.09],
  ['22', (c) => c.lobe === 'temporal' && c.dy > -0.13],
  ['37', (c) => c.lobe === 'temporal' && c.z < -0.32],
  ['20', (c) => c.lobe === 'temporal'],
  ['11', (c) => c.lobe === 'frontal' && c.uy < -0.45 && c.z > 0.25],
  ['43', (c) => c.lateral && Math.abs(c.dz) < 0.11 && c.dy > -0.02 && c.dy < 0.08],
  ['4', (c) => c.lobe === 'frontal' && c.dz < 0.11 && c.dy > 0.02],
  ['44', (c) => c.lobe === 'frontal' && c.lateral && c.dz < 0.24 && c.dy < 0.2],
  ['6', (c) => c.lobe === 'frontal' && c.dz < 0.24],
  ['45', (c) => c.lobe === 'frontal' && c.lateral && c.dz < 0.36 && c.dy < 0.2],
  ['8', (c) => c.lobe === 'frontal' && c.dz < 0.36],
  ['10', (c) => c.lobe === 'frontal' && c.z > 0.72],
  ['9', (c) => c.lobe === 'frontal' && !c.medial],
  ['312', (c) => c.lobe === 'parietal' && c.dz > -0.11],
  ['5', (c) => c.lobe === 'parietal' && c.dz > -0.22 && (c.y > 0.2 || c.medial)],
  ['7', (c) => c.lobe === 'parietal' && (c.y > 0.2 || c.medial)],
  ['40', (c) => c.lobe === 'parietal' && c.dz > -0.42],
  ['39', (c) => c.lobe === 'parietal'],
];

function classifyCortex(side, ux, uy, xl, y, z) {
  const yls = lateralSulcusY(z);
  const zcs = centralSulcusZ(y);
  const zpo = parietoOccipitalZ(y);
  const medialUpper = ux < -0.35 && y > -0.3;

  let lobe = 'parietal';
  if (z < zpo) {
    lobe = 'occipital';
  } else if (y < yls && z < 0.52 && !medialUpper && (z < 0.22 || ux > 0.1)) {
    lobe = 'temporal';
  } else if (z > zcs) {
    lobe = 'frontal';
  }

  const spots = [];
  const lateral = ux > 0.25;
  if (lobe === 'frontal' && z < zcs + 0.11 && y > yls + 0.02) {
    spots.push('precentral');
  }
  if (lobe === 'parietal' && z > zcs - 0.11 && y > yls + 0.02) {
    spots.push('postcentral');
  }
  if (lobe === 'frontal' && z > zcs + 0.3) {
    spots.push('prefrontal');
  }
  if (side === 'L' && lobe === 'frontal' && lateral && z > zcs + 0.1 && z < zcs + 0.38 && y > yls && y < yls + 0.2) {
    spots.push('broca');
  }
  if (side === 'L' && lobe === 'temporal' && lateral && z > -0.5 && z < -0.12 && y > yls - 0.17) {
    spots.push('wernicke');
  }
  if (lobe === 'temporal' && lateral && z > -0.1 && z < 0.14 && y > yls - 0.09) {
    spots.push('auditory');
  }
  if (lobe === 'occipital' && (z < -0.8 || (ux < -0.3 && y > -0.17 && y < 0.07))) {
    spots.push('v1');
  }

  const isPaleo = y < -0.26 && z > 0.17 && z < 0.4 && ux < 0.05 && ux > -0.55 && uy < -0.6;
  const ctype = isPaleo ? 'paleo' : 'neo';

  const landmarks = {
    lobe,
    ux,
    uy,
    y,
    z,
    dz: z - zcs,
    dy: y - yls,
    medial: ux < -0.35,
    lateral,
  };
  const brodmann = BRODMANN_RULES.find(([, test]) => test(landmarks))?.[0] ?? null;

  return [lobe, spots, ctype, brodmann];
}

// Mirroring geometry flips triangle winding; this restores outward-facing triangles.
function flipWinding(geometry) {
  const index = geometry.index.array;
  for (let i = 0; i < index.length; i += 3) {
    const tmp = index[i + 1];
    index[i + 1] = index[i + 2];
    index[i + 2] = tmp;
  }
  geometry.index.needsUpdate = true;
}

function unitSphere(widthSegments, heightSegments) {
  const sphere = new THREE.SphereGeometry(1, widthSegments, heightSegments);
  sphere.deleteAttribute('uv');
  sphere.deleteAttribute('normal');
  return mergeVertices(sphere);
}

function buildHemisphere(side, widthSegments, heightSegments, material) {
  const sign = side === 'L' ? 1 : -1;
  const geometry = unitSphere(widthSegments, heightSegments);
  if (sign < 0) {
    flipWinding(geometry);
  }
  const position = geometry.attributes.position;
  const count = position.count;
  const unit = new Float32Array(count * 3);
  const local = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const ux = position.getX(i);
    const uy = position.getY(i);
    const uz = position.getZ(i);
    unit[i * 3] = ux;
    unit[i * 3 + 1] = uy;
    unit[i * 3 + 2] = uz;
    const [xl, y, z] = deformHemisphere(ux, uy, uz);
    local[i * 3] = xl;
    local[i * 3 + 1] = y;
    local[i * 3 + 2] = z;
    position.setXYZ(i, sign * (HEMI.cx + xl), HEMI.cy + y, z);
  }
  geometry.computeVertexNormals();
  const baseNormal = geometry.attributes.normal.array.slice();

  const cavity = new Float32Array(count);
  const masks = new Map();
  const mark = (id, i) => {
    let mask = masks.get(id);
    if (!mask) {
      mask = new Uint8Array(count);
      masks.set(id, mask);
    }
    mask[i] = 1;
  };

  for (let i = 0; i < count; i++) {
    const ux = unit[i * 3];
    const uy = unit[i * 3 + 1];
    const xl = local[i * 3];
    const y = local[i * 3 + 1];
    const z = local[i * 3 + 2];
    const wx = position.getX(i);
    const wy = position.getY(i);
    const wz = position.getZ(i);

    const [d, cav] = corticalDisplacement(ux, xl, y, z, wx, wy, wz);
    cavity[i] = cav;
    position.setXYZ(
      i,
      wx + baseNormal[i * 3] * d,
      wy + baseNormal[i * 3 + 1] * d,
      wz + baseNormal[i * 3 + 2] * d,
    );

    const [lobe, spots, ctype, brodmann] = classifyCortex(side, ux, uy, xl, y, z);
    if (brodmann) {
      mark(`ba:${brodmann}`, i);
    }
    mark('all', i);
    mark(`hemi:${side}`, i);
    mark(`lobe:${lobe}`, i);
    mark(`ctype:${ctype}`, i);
    for (const spot of spots) {
      mark(`spot:${spot}`, i);
    }
  }
  geometry.computeVertexNormals();

  const colorAttribute = new THREE.BufferAttribute(new Float32Array(count * 3), 3);
  geometry.setAttribute('color', colorAttribute);
  geometry.computeBoundingSphere();

  const mesh = new THREE.Mesh(geometry, material);
  const hemi = {
    side,
    sign,
    mesh,
    count,
    unit,
    local,
    cavity,
    masks,
    baseNormal,
    colorAttribute,
    neighbors: buildNeighbors(geometry.index.array, count),
    paint: new Float32Array(count * 3),
    scratch: new Float32Array(count * 3),
    center: new THREE.Vector3(sign * HEMI.cx, HEMI.cy, 0),
  };
  mesh.userData.hemi = hemi;
  mesh.userData.key = 'cortex';
  return hemi;
}

// Vertex adjacency in compressed form: neighbors of i are list[offsets[i] .. offsets[i + 1]).
function buildNeighbors(index, count) {
  const sets = Array.from({ length: count }, () => new Set());
  for (let i = 0; i < index.length; i += 3) {
    const a = index[i];
    const b = index[i + 1];
    const c = index[i + 2];
    sets[a].add(b).add(c);
    sets[b].add(a).add(c);
    sets[c].add(a).add(b);
  }
  const offsets = new Uint32Array(count + 1);
  for (let i = 0; i < count; i++) {
    offsets[i + 1] = offsets[i] + sets[i].size;
  }
  const list = new Uint32Array(offsets[count]);
  for (let i = 0; i < count; i++) {
    list.set([...sets[i]], offsets[i]);
  }
  return { offsets, list };
}

// Averages each vertex color with its neighbors, softening region borders like airbrush.
function blurPaint(hemi, passes) {
  const { offsets, list } = hemi.neighbors;
  let src = hemi.paint;
  let dst = hemi.scratch;
  for (let pass = 0; pass < passes; pass++) {
    for (let i = 0; i < hemi.count; i++) {
      let r = src[i * 3];
      let g = src[i * 3 + 1];
      let b = src[i * 3 + 2];
      const start = offsets[i];
      const end = offsets[i + 1];
      for (let k = start; k < end; k++) {
        const j = list[k];
        r += src[j * 3];
        g += src[j * 3 + 1];
        b += src[j * 3 + 2];
      }
      const n = end - start + 1;
      dst[i * 3] = r / n;
      dst[i * 3 + 1] = g / n;
      dst[i * 3 + 2] = b / n;
    }
    [src, dst] = [dst, src];
  }
  return src;
}

// Writes base colors (hemi.paint, linear RGB) into the mesh, darkening the grooves.
export function commitCortexColors(hemi, blurPasses = 2) {
  const out = hemi.colorAttribute.array;
  const paint = blurPaint(hemi, blurPasses);
  for (let i = 0; i < hemi.count; i++) {
    const shade = 1 - 0.42 * hemi.cavity[i];
    out[i * 3] = paint[i * 3] * shade;
    out[i * 3 + 1] = paint[i * 3 + 1] * shade;
    out[i * 3 + 2] = paint[i * 3 + 2] * shade;
  }
  hemi.colorAttribute.needsUpdate = true;
}

// ---------------------------------------------------------------------------
// White matter: a smaller, smoother copy of each hemisphere
// ---------------------------------------------------------------------------

function buildWhiteMatter(side, widthSegments, heightSegments) {
  const sign = side === 'L' ? 1 : -1;
  const geometry = unitSphere(widthSegments, heightSegments);
  if (sign < 0) {
    flipWinding(geometry);
  }
  const position = geometry.attributes.position;
  for (let i = 0; i < position.count; i++) {
    const [xl, y, z] = deformHemisphere(position.getX(i), position.getY(i), position.getZ(i));
    const shrink = 0.74;
    const wobble = 1 + 0.03 * noise(xl * 6 + sign, y * 6, z * 6);
    position.setXYZ(
      i,
      sign * (HEMI.cx + xl * shrink * wobble),
      HEMI.cy + y * shrink * wobble,
      z * shrink * wobble,
    );
  }
  geometry.computeVertexNormals();
  return geometry;
}

// ---------------------------------------------------------------------------
// Cerebellum: two lobes with lots of thin transverse folds (folia)
// ---------------------------------------------------------------------------

const CEREBELLUM_CENTER = new THREE.Vector3(0, -0.37, -0.52);

function buildCerebellum(segments) {
  const geometry = unitSphere(segments, Math.round(segments * 0.75));
  const position = geometry.attributes.position;
  const count = position.count;
  const local = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const ux = position.getX(i);
    const uy = position.getY(i);
    const uz = position.getZ(i);
    const x = ux * 0.5;
    let y = -softScaleNegative(-uy, 0.72, 0.15) * 0.25;
    let z = uz * 0.3;
    const notch = Math.exp(-((ux / 0.14) ** 2)) * smoothstep(0.2, -0.8, uz);
    z += 0.05 * notch;
    y -= 0.035 * ux * ux;
    local[i * 3] = x;
    local[i * 3 + 1] = y;
    local[i * 3 + 2] = z;
    position.setXYZ(i, x + CEREBELLUM_CENTER.x, y + CEREBELLUM_CENTER.y, z + CEREBELLUM_CENTER.z);
  }
  geometry.computeVertexNormals();
  const normal = geometry.attributes.normal.array.slice();
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const x = local[i * 3];
    const y = local[i * 3 + 1];
    const z = local[i * 3 + 2];
    const theta = Math.atan2(y, 0.38 - z);
    const wobble = 0.35 * noise(x * 3, y * 3, z * 3);
    const folia = 1 - smoothstep(0, 0.35, Math.abs(Math.sin(theta * 34 + wobble * 3)));
    const fissure = Math.exp(-(((theta - 0.05 + 0.08 * x * x) / 0.05) ** 2));
    const paramedian = Math.exp(-(((Math.abs(x) - 0.085) / 0.02) ** 2)) * smoothstep(-0.1, 0.05, -z);
    const d = -0.014 * folia - 0.03 * fissure - 0.02 * paramedian;
    const cav = clamp01(Math.max(folia * 0.9, fissure, paramedian));
    position.setXYZ(
      i,
      position.getX(i) + normal[i * 3] * d,
      position.getY(i) + normal[i * 3 + 1] * d,
      position.getZ(i) + normal[i * 3 + 2] * d,
    );
    const shade = 1 - 0.4 * cav;
    colors[i * 3] = shade;
    colors[i * 3 + 1] = shade;
    colors[i * 3 + 2] = shade;
  }
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.computeVertexNormals();
  return geometry;
}

// ---------------------------------------------------------------------------
// Small helpers for the other structures
// ---------------------------------------------------------------------------

function ellipsoid(rx, ry, rz, segments = 40) {
  const geometry = new THREE.SphereGeometry(1, segments, Math.round(segments * 0.75));
  geometry.scale(rx, ry, rz);
  return geometry;
}

// A tube along a smooth curve whose thickness follows radiusAt(t), t in [0, 1].
function taperedTube(points, radiusAt, tubularSegments = 72, radialSegments = 18) {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)));
  const geometry = new THREE.TubeGeometry(curve, tubularSegments, 1, radialSegments, false);
  const position = geometry.attributes.position;
  const center = new THREE.Vector3();
  const vertex = new THREE.Vector3();
  for (let i = 0; i <= tubularSegments; i++) {
    const t = i / tubularSegments;
    curve.getPointAt(t, center);
    const r = radiusAt(t);
    for (let j = 0; j <= radialSegments; j++) {
      const index = i * (radialSegments + 1) + j;
      vertex.fromBufferAttribute(position, index).sub(center).multiplyScalar(r).add(center);
      position.setXYZ(index, vertex.x, vertex.y, vertex.z);
    }
  }
  geometry.computeVertexNormals();
  return geometry;
}

// Rounds off both ends of a tube so it does not look hollow.
const capped = (radius, sharpness = 14) => (t) =>
  radius(t) * Math.sqrt(clamp01(t * sharpness)) * Math.sqrt(clamp01((1 - t) * sharpness));

function candyMaterial(options = {}) {
  return new THREE.MeshPhysicalMaterial({
    color: NEUTRAL.clone(),
    roughness: 0.42,
    metalness: 0,
    clearcoat: 0.6,
    clearcoatRoughness: 0.35,
    sheen: 0.35,
    sheenRoughness: 0.6,
    sheenColor: new THREE.Color('#ffffff'),
    transparent: true,
    ...options,
  });
}

// ---------------------------------------------------------------------------
// Reticular formation: a little net of neurons through the brainstem core
// ---------------------------------------------------------------------------

function brainstemCoreZ(y) {
  if (y > -0.33) {
    return -0.13;
  }
  if (y > -0.58) {
    return -0.13 - (y + 0.33) * 0.04;
  }
  return -0.12 - (-0.58 - y) * 0.15;
}

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function buildReticular() {
  const random = seededRandom(42);
  const nodes = [];
  for (let i = 0; i < 130; i++) {
    const y = -0.17 - random() * 0.68;
    nodes.push(new THREE.Vector3((random() - 0.5) * 0.09, y, brainstemCoreZ(y) + (random() - 0.5) * 0.06));
  }
  const segments = [];
  for (let i = 0; i < nodes.length; i++) {
    const near = nodes
      .map((node, j) => [j, node.distanceTo(nodes[i])])
      .filter(([j, distance]) => j !== i && distance < 0.09)
      .sort((a, b) => a[1] - b[1])
      .slice(0, 3);
    for (const [j] of near) {
      if (j > i) {
        segments.push(nodes[i], nodes[j]);
      }
    }
  }
  const group = new THREE.Group();
  const lines = new THREE.LineSegments(
    new THREE.BufferGeometry().setFromPoints(segments),
    new THREE.LineBasicMaterial({ color: '#7bd12f', transparent: true }),
  );
  const dots = new THREE.InstancedMesh(
    new THREE.SphereGeometry(0.008, 10, 8),
    new THREE.MeshStandardMaterial({ color: '#8ce63b', roughness: 0.4, transparent: true }),
    nodes.length,
  );
  const matrix = new THREE.Matrix4();
  nodes.forEach((node, i) => {
    dots.setMatrixAt(i, matrix.makeTranslation(node.x, node.y, node.z));
  });
  group.add(lines, dots);
  return group;
}

// ---------------------------------------------------------------------------
// Assembly
// ---------------------------------------------------------------------------

const QUALITY = {
  high: { width: 300, height: 220, cerebellum: 170, white: 120 },
  mid: { width: 220, height: 160, cerebellum: 130, white: 90 },
  low: { width: 150, height: 110, cerebellum: 96, white: 60 },
};

export function buildBrain({ quality = 'high' } = {}) {
  const q = QUALITY[quality] ?? QUALITY.high;
  const root = new THREE.Group();
  const meshes = new Map();

  const cortexMaterial = new THREE.MeshPhysicalMaterial({
    vertexColors: true,
    roughness: 0.48,
    metalness: 0,
    clearcoat: 0.55,
    clearcoatRoughness: 0.4,
    sheen: 0.45,
    sheenRoughness: 0.55,
    sheenColor: new THREE.Color('#ffffff'),
  });

  const hemis = ['L', 'R'].map((side) => buildHemisphere(side, q.width, q.height, cortexMaterial));
  hemis.forEach((hemi) => root.add(hemi.mesh));

  const add = (key, geometry, position = [0, 0, 0], options = {}) => {
    const mesh = new THREE.Mesh(geometry, candyMaterial(options.material));
    mesh.position.set(...position);
    if (options.rotation) {
      mesh.rotation.set(...options.rotation);
    }
    mesh.userData.key = key;
    mesh.userData.baseOpacity = options.opacity ?? 1;
    root.add(mesh);
    if (!meshes.has(key)) {
      meshes.set(key, []);
    }
    meshes.get(key).push(mesh);
    return mesh;
  };
  const both = (fn) => [1, -1].forEach((s) => fn(s));

  // --- telencephalon extras ---
  both((s) => add('white', buildWhiteMatter(s > 0 ? 'L' : 'R', q.white, Math.round(q.white * 0.75)), [0, 0, 0], {
    material: { color: new THREE.Color('#fff4d6') },
  }));

  const ccPath = [
    [0, -0.02, 0.3],
    [0, 0.07, 0.4],
    [0, 0.17, 0.33],
    [0, 0.22, 0.1],
    [0, 0.215, -0.15],
    [0, 0.15, -0.35],
    [0, 0.06, -0.4],
  ];
  const cc = add('cc', taperedTube(ccPath, capped((t) => 0.03 + 0.012 * Math.exp(-(((t - 0.92) / 0.08) ** 2)))));
  cc.scale.set(3.6, 1, 1);

  both((s) => {
    const x = s * 0.05;
    add('cingulate', taperedTube([
      [x, 0.0, 0.42],
      [x, 0.15, 0.47],
      [x, 0.28, 0.36],
      [x, 0.315, 0.08],
      [x, 0.295, -0.2],
      [x, 0.2, -0.44],
      [x, 0.05, -0.5],
    ], capped(() => 0.034)));
  });

  both((s) => {
    add('fornix', taperedTube([
      [s * 0.24, -0.08, -0.3],
      [s * 0.12, 0.06, -0.33],
      [s * 0.045, 0.13, -0.18],
      [s * 0.03, 0.13, 0.05],
      [s * 0.03, 0.04, 0.15],
      [s * 0.02, -0.1, 0.07],
    ], capped(() => 0.013, 30), 64, 10));
  });

  both((s) => {
    add('hippocampus', taperedTube([
      [s * 0.29, -0.24, 0.18],
      [s * 0.31, -0.22, 0.02],
      [s * 0.29, -0.17, -0.15],
      [s * 0.25, -0.08, -0.28],
    ], capped((t) => 0.018 + 0.042 * (1 - t), 10)));
  });

  both((s) => add('amygdala', ellipsoid(0.05, 0.045, 0.06), [s * 0.3, -0.2, 0.26]));

  both((s) => {
    add('caudate', taperedTube([
      [s * 0.13, 0.08, 0.25],
      [s * 0.15, 0.17, 0.08],
      [s * 0.17, 0.17, -0.12],
      [s * 0.21, 0.08, -0.3],
      [s * 0.25, -0.06, -0.27],
      [s * 0.27, -0.14, -0.14],
    ], (t) => (0.012 + 0.05 * (1 - t) ** 1.5) * Math.sqrt(clamp01(t * 12)) * Math.sqrt(clamp01((1 - t) * 20))));
    add('putamen', ellipsoid(0.05, 0.11, 0.15), [s * 0.25, 0.02, 0.06]);
    add('pallidus', ellipsoid(0.028, 0.075, 0.09), [s * 0.185, 0.0, 0.03]);
  });

  both((s) => {
    add('olfactory', ellipsoid(0.024, 0.02, 0.08), [s * 0.07, -0.19, 0.5]);
    add('olfactory', taperedTube([
      [s * 0.07, -0.19, 0.45],
      [s * 0.09, -0.21, 0.36],
      [s * 0.12, -0.22, 0.26],
    ], capped(() => 0.01, 20), 24, 8));
  });

  both((s) => add('insula', ellipsoid(0.03, 0.11, 0.17), [s * 0.6, 0.03, 0.05], {
    rotation: [0.15, 0, s * -0.15],
  }));

  // --- diencephalon ---
  both((s) => add('thalamus', ellipsoid(0.075, 0.07, 0.14), [s * 0.085, -0.02, -0.06]));
  add('hypothalamus', ellipsoid(0.07, 0.05, 0.075), [0, -0.13, 0.04]);
  add('pituitary', ellipsoid(0.05, 0.035, 0.04), [0, -0.3, 0.09]);
  add('pituitary', taperedTube([
    [0, -0.16, 0.06],
    [0, -0.22, 0.075],
    [0, -0.28, 0.09],
  ], () => 0.012, 16, 10));
  add('pineal', ellipsoid(0.02, 0.02, 0.036), [0, -0.03, -0.24]);

  // --- midbrain (mesencephalon) ---
  const M = new THREE.Vector3(0, -0.24, -0.12);
  const at = (dx, dy, dz) => [M.x + dx, M.y + dy, M.z + dz];
  const tegmentum = new THREE.CylinderGeometry(0.11, 0.105, 0.17, 48);
  tegmentum.scale(1, 1, 0.8);
  add('tegmentum', tegmentum, at(0, 0, 0.01));
  add('tectum', ellipsoid(0.1, 0.095, 0.035), at(0, 0, -0.085));
  both((s) => {
    add('supcol', ellipsoid(0.034, 0.034, 0.034, 28), at(s * 0.042, 0.04, -0.11));
    add('infcol', ellipsoid(0.028, 0.028, 0.028, 28), at(s * 0.038, -0.042, -0.108));
    add('peduncle', ellipsoid(0.05, 0.1, 0.055), at(s * 0.065, 0.0, 0.075), { rotation: [0.15, 0, s * -0.25] });
    add('rednuc', ellipsoid(0.024, 0.024, 0.024, 24), at(s * 0.032, 0.015, 0.005));
    add('sn', ellipsoid(0.012, 0.06, 0.05, 24), at(s * 0.055, 0.0, 0.045), { rotation: [0, s * 0.6, 0] });
  });
  add('aqueduct', new THREE.CylinderGeometry(0.011, 0.011, 0.2, 16), at(0, 0, -0.05));
  add('pag', new THREE.CylinderGeometry(0.032, 0.032, 0.16, 32, 1, true), at(0, 0, -0.05), {
    material: { side: THREE.DoubleSide },
    opacity: 0.8,
  });
  add('vta', ellipsoid(0.02, 0.025, 0.018, 20), at(0, -0.01, 0.05));

  // --- hindbrain ---
  add('pons', ellipsoid(0.15, 0.115, 0.13), [0, -0.46, -0.06]);
  const medulla = taperedTube([
    [0, -0.5, -0.11],
    [0, -0.62, -0.12],
    [0, -0.74, -0.14],
    [0, -0.86, -0.16],
  ], (t) => (0.1 - 0.032 * t) * Math.sqrt(clamp01(t * 8)), 48, 32);
  add('medulla', medulla);
  add('spinal', taperedTube([
    [0, -0.83, -0.155],
    [0, -0.98, -0.175],
    [0, -1.14, -0.19],
  ], (t) => 0.066 * Math.sqrt(clamp01((1 - t) * 10)), 32, 28));
  const cerebellum = add('cerebellum', buildCerebellum(q.cerebellum));
  cerebellum.material.vertexColors = true;

  // reticular formation (visual net + invisible pick target)
  const reticular = buildReticular();
  reticular.userData.key = 'reticular';
  root.add(reticular);
  const reticularProxy = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.05, 0.7, 12),
    new THREE.MeshBasicMaterial({ visible: false }),
  );
  reticularProxy.position.set(0, -0.51, -0.135);
  reticularProxy.userData.key = 'reticular';
  reticularProxy.userData.proxy = true;
  root.add(reticularProxy);
  meshes.set('reticular', [reticular, reticularProxy]);

  root.updateMatrixWorld(true);

  return {
    root,
    hemis,
    meshes,
    cortexMaterial,
    regionAnchors: (regionIds, hint) => regionAnchors(hemis, regionIds, hint),
    meshAnchors: (keys) => meshAnchors(meshes, keys),
    homunculusPoints: () => homunculusPoints(hemis[0]),
  };
}

// ---------------------------------------------------------------------------
// Anchors: where to pin labels and where the camera should fly to
// ---------------------------------------------------------------------------

// hint: optional preferred direction [x, y, z], with x pointing outward (mirrored per side)
function regionAnchors(hemis, regionIds, hint = null) {
  const anchors = [];
  for (const hemi of hemis) {
    const masks = regionIds.map((id) => hemi.masks.get(id)).filter(Boolean);
    if (!masks.length) {
      continue;
    }
    const position = hemi.mesh.geometry.attributes.position;
    const inside = [];
    const centroid = new THREE.Vector3();
    for (let i = 0; i < hemi.count; i++) {
      if (masks.some((mask) => mask[i])) {
        inside.push(i);
        centroid.x += position.getX(i);
        centroid.y += position.getY(i);
        centroid.z += position.getZ(i);
      }
    }
    if (!inside.length) {
      continue;
    }
    centroid.divideScalar(inside.length);

    // prefer a vertex that faces outward (sideways and up) but stays near the region's middle
    const direction = hint
      ? new THREE.Vector3(hemi.sign * hint[0], hint[1], hint[2]).normalize()
      : centroid.clone().sub(hemi.center).add(new THREE.Vector3(hemi.sign * 0.5, 0, 0)).normalize();
    const distances = inside.map((i) => Math.hypot(
      position.getX(i) - centroid.x,
      position.getY(i) - centroid.y,
      position.getZ(i) - centroid.z,
    ));
    const spread = Math.sqrt(distances.reduce((sum, d) => sum + d * d, 0) / distances.length) || 1;
    const n = hemi.baseNormal;
    let best = inside[0];
    let bestScore = -Infinity;
    inside.forEach((i, k) => {
      const facing = n[i * 3] * direction.x + n[i * 3 + 1] * direction.y + n[i * 3 + 2] * direction.z;
      const score = facing - 0.6 * (distances[k] / spread);
      if (score > bestScore) {
        bestScore = score;
        best = i;
      }
    });
    const normal = new THREE.Vector3(
      hemi.baseNormal[best * 3],
      hemi.baseNormal[best * 3 + 1],
      hemi.baseNormal[best * 3 + 2],
    ).normalize();
    const pos = new THREE.Vector3().fromBufferAttribute(position, best).addScaledVector(normal, 0.015);
    anchors.push({
      pos,
      normal,
    });
  }
  return anchors;
}

function meshAnchors(meshes, keys = []) {
  const anchors = [];
  const box = new THREE.Box3();
  for (const key of keys) {
    for (const mesh of meshes.get(key) ?? []) {
      if (mesh.userData.proxy || !mesh.geometry) {
        continue;
      }
      box.setFromObject(mesh);
      anchors.push({
        pos: box.getCenter(new THREE.Vector3()),
        normal: null,
      });
    }
  }
  return anchors;
}

// Body parts along the left motor strip, top/inside (toes) to bottom/outside (tongue).
// Weight is roughly how much cortex each body part gets.
const HOMUNCULUS = [
  ['toes', 0.7],
  ['knee', 0.75],
  ['hip', 0.75],
  ['trunk', 0.85],
  ['shoulder', 0.85],
  ['elbow', 0.85],
  ['wrist', 0.95],
  ['HAND', 1.5],
  ['FINGERS', 1.6],
  ['THUMB', 1.45],
  ['neck', 0.8],
  ['eyes', 1.0],
  ['face', 1.25],
  ['LIPS', 1.7],
  ['jaw', 1.0],
  ['TONGUE', 1.45],
  ['swallowing', 0.9],
];

function homunculusPoints(hemi) {
  const mask = hemi.masks.get('spot:precentral');
  const position = hemi.mesh.geometry.attributes.position;
  const candidates = [];
  for (let i = 0; i < hemi.count; i++) {
    if (mask?.[i]) {
      candidates.push(i);
    }
  }
  const startAngle = (118 * Math.PI) / 180;
  const sweep = (133 * Math.PI) / 180;
  return HOMUNCULUS.map(([name, weight], k) => {
    const target = startAngle - (sweep * k) / (HOMUNCULUS.length - 1);
    let best = candidates[0];
    let bestError = Infinity;
    for (const i of candidates) {
      const angle = Math.atan2(hemi.unit[i * 3 + 1], hemi.unit[i * 3]);
      const error = Math.abs(angle - target);
      if (error < bestError) {
        bestError = error;
        best = i;
      }
    }
    const normal = new THREE.Vector3(
      hemi.baseNormal[best * 3],
      hemi.baseNormal[best * 3 + 1],
      hemi.baseNormal[best * 3 + 2],
    ).normalize();
    return {
      name,
      weight,
      pos: new THREE.Vector3().fromBufferAttribute(position, best).addScaledVector(normal, 0.02),
      normal,
    };
  });
}
