# herbrain

ojas did not want to do juvenile model making hence ojas is now creating a website. ojas better get her 10 marks for this (or more hehehe)

A colorful, graffiti-styled website about the human brain:

- **Intro page** (`index.html`): what the brain is, fun stats, brain cells, how it is protected, and the different ways to classify it.
- **3D Brain Explorer** (`explore.html`): a 3D brain you can spin, zoom and tap (mouse, trackpad or touch). Each tab recolors the brain by a different classification, and tapping a part shows its name and what it does.

Classifications covered: left/right hemispheres, forebrain/midbrain/hindbrain, the 5 divisions, the lobes (including the insula), cortex hotspots (precentral and postcentral gyrus, homunculus, Broca's, Wernicke's, auditory and striate cortex), Brodmann's functional map (areas 3/1/2, 4, 5, 6, 7, 8, 9/46, 10, 11, 17, 18, 19, 20/21, 22, 37, 38, 39, 40, 41/42, 43, 44/45), gray/white matter and cortex types (neo-, allo-, paleo-, archicortex), the deep forebrain (thalamus, hypothalamus, pituitary, pineal, hippocampus, amygdala, basal ganglia, limbic system...), a midbrain zoom (tectum, colliculi, tegmentum, red nucleus, substantia nigra, PAG, VTA...) and the hindbrain.

## Run it locally

The pages use JavaScript modules, so they must be served over http (opening the file directly will not work):

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Put it online (GitHub Pages)

1. Push this repo to GitHub.
1. On GitHub: **Settings > Pages > Build and deployment**, set the source to **Deploy from a branch**, pick `main` and `/ (root)`, and save.
1. After a minute the site is live at `https://<username>.github.io/herbrain/`.

## Where things are

| File | What it does |
| --- | --- |
| `index.html` | The intro page |
| `explore.html` | The 3D explorer page |
| `js/data.js` | Every classification and brain part: names, colors, which 3D pieces they use |
| `js/voice-genz.js`, `js/voice-sci.js` | All the explanations, in Gen Z and scientific voice |
| `js/voice.js` | The Gen Z / Science switch and button wording |
| `js/brain.js` | Builds the 3D brain out of code (no 3D model file needed) |
| `js/explore.js` | The explorer: tabs, clicking parts, labels, camera, search |
| `js/home.js` | The spinning brain on the intro page |
| `css/style.css` | Shared graffiti / baby blue styling |
| `css/explore.css` | Explorer layout (side panel on desktop, bottom sheet on phones) |

The site has a **Gen Z / Science switch** (top bar). Gen Z is the default; the choice is remembered between pages.

To change any wording, edit `js/voice-genz.js` (Gen Z) or `js/voice-sci.js` (scientific). Each part has an `aka`, `tagline`, `where`, `does` (a list) and `fact`; each tab has a `tab`, `title` and `blurb`. Intro page text is in `index.html`, written twice (`data-v="genz"` and `data-v="sci"`). `js/data.js` only holds structure (colors, which 3D pieces belong to each part).

Built with [three.js](https://threejs.org) (loaded from a CDN).
