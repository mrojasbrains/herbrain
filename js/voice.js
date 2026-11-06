// Gen Z <-> Science voice switch, shared by every page.
//
// The current voice lives on <html data-voice="genz|sci">, so CSS can show/hide
// static text marked with data-v="genz" / data-v="sci". Dynamic text (brain parts,
// tabs, buttons) is looked up through the helpers below.

import * as GENZ from './voice-genz.js';
import * as SCI from './voice-sci.js';

const STORE_KEY = 'herbrain-voice';
const VOICES = { genz: GENZ, sci: SCI };

const UI = {
  genz: {
    eyebrow: 'the lore',
    tapHint: 'tap a part on the brain or pick one, bestie:',
    where: 'where it lives',
    does: 'what it does (no cap)',
    fact: 'lore drop',
    includes: 'the squad',
    partOf: 'part of',
    allParts: 'all the parts',
    prev: 'prev',
    next: 'next',
    hintMouse: 'drag to spin · scroll to zoom · click a part',
    hintTouch: 'drag to spin · pinch to zoom · tap a part',
    search: 'find a part...',
    noResults: 'no parts found. try another spelling?',
    reset: 'reset view',
    xray: 'x-ray',
    labels: 'labels',
    spin: 'spin',
    inside: ' (inside)',
    loading: 'growing a brain...',
    back: 'intro',
    toast: (name, tab) => `that's the <b>${name}</b>, it's in the <b>${tab}</b> tab fr`,
    toastGo: 'take me there',
    explore: 'explore in 3D',
  },
  sci: {
    eyebrow: 'Classification',
    tapHint: 'Select a structure on the model or from the list:',
    where: 'Location',
    does: 'Functions',
    fact: 'Clinical & historical note',
    includes: 'Includes',
    partOf: 'Part of',
    allParts: 'All structures',
    prev: 'Previous',
    next: 'Next',
    hintMouse: 'Drag to rotate · Scroll to zoom · Click a structure',
    hintTouch: 'Drag to rotate · Pinch to zoom · Tap a structure',
    search: 'Search structures...',
    noResults: 'No matching structures.',
    reset: 'Reset view',
    xray: 'X-ray',
    labels: 'Labels',
    spin: 'Rotate',
    inside: ' (internal)',
    loading: 'Generating model...',
    back: 'Intro',
    toast: (name, tab) => `This is the <b>${name}</b>, covered under <b>${tab}</b>.`,
    toastGo: 'Go to it',
    explore: 'View in 3D',
  },
};

function readStored() {
  try {
    const value = localStorage.getItem(STORE_KEY);
    return value in VOICES ? value : null;
  } catch {
    return null;
  }
}

let current = readStored() ?? 'genz';
const listeners = new Set();
document.documentElement.dataset.voice = current;

export const getVoice = () => current;
export const ui = (key) => UI[current][key];
export const partText = (id) => VOICES[current].PARTS_TEXT[id];
export const modeText = (id) => VOICES[current].MODES_TEXT[id];

export function setVoice(voice) {
  if (!(voice in VOICES) || voice === current) {
    return;
  }
  current = voice;
  document.documentElement.dataset.voice = voice;
  try {
    localStorage.setItem(STORE_KEY, voice);
  } catch {
    // private mode etc: the switch still works, it just is not remembered
  }
  listeners.forEach((fn) => fn(voice));
}

export function onVoiceChange(fn) {
  listeners.add(fn);
}

// Turns every [data-voice-toggle] element into the Gen Z / Science switch.
export function mountToggles() {
  for (const host of document.querySelectorAll('[data-voice-toggle]')) {
    host.innerHTML = `
      <button type="button" class="voice-toggle" role="switch" aria-label="Scientific explanations">
        <span class="vt-label vt-genz">Gen Z</span>
        <span class="vt-track" aria-hidden="true"><span class="vt-thumb"></span></span>
        <span class="vt-label vt-sci">Science</span>
      </button>`;
    const button = host.querySelector('button');
    const sync = () => button.setAttribute('aria-checked', String(current === 'sci'));
    button.addEventListener('click', () => setVoice(current === 'sci' ? 'genz' : 'sci'));
    onVoiceChange(sync);
    sync();
  }
}
