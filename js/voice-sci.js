// Scientific voice: textbook-register text for every mode (tab) and brain part shown in the explorer.

export const MODES_TEXT = {
  hemispheres: {
    tab: 'Hemispheres',
    title: 'The Cerebral Hemispheres',
    blurb: 'The cerebrum is divided by the longitudinal fissure into left and right cerebral hemispheres, which are anatomically similar but show functional lateralization. Each hemisphere predominantly controls movement and receives sensation from the contralateral side of the body. The hemispheres communicate chiefly through commissural fibers, the largest of which is the corpus callosum.',
  },
  regions3: {
    tab: 'Primary Vesicles',
    title: 'Primary Brain Vesicles',
    blurb: 'During the fourth week of embryonic development, the rostral end of the neural tube expands into three primary vesicles: the prosencephalon (forebrain), mesencephalon (midbrain) and rhombencephalon (hindbrain). Every structure of the adult brain derives from one of these three subdivisions.',
  },
  divisions5: {
    tab: 'Secondary Vesicles',
    title: 'Secondary Brain Vesicles',
    blurb: 'By the fifth week of development, the three primary vesicles give rise to five secondary vesicles. The prosencephalon divides into the telencephalon and diencephalon, the mesencephalon remains undivided, and the rhombencephalon divides into the metencephalon and myelencephalon. The suffix "-encephalon" derives from the Greek enkephalos, "within the head".',
  },
  lobes: {
    tab: 'Cerebral Lobes',
    title: 'Lobes of the Cerebral Cortex',
    blurb: 'The cortex of each hemisphere is conventionally divided into lobes using major sulci as boundaries, chiefly the central sulcus, the lateral (Sylvian) fissure and the parieto-occipital sulcus. The four externally visible lobes (frontal, parietal, temporal and occipital) are named after the overlying cranial bones. The insula, concealed within the lateral fissure, is frequently classified as a fifth lobe.',
  },
  hotspots: {
    tab: 'Functional Areas',
    title: 'Functional Areas of the Cortex',
    blurb: 'Specific cortical regions are associated with relatively specialized functions, including the primary motor and primary somatosensory cortices, the primary auditory and visual cortices, and the classical language areas. Language areas are typically illustrated on the left hemisphere because language is left-lateralized in the majority of individuals. Such localization is a useful approximation; most functions depend on distributed networks of interconnected areas.',
  },
  brodmann: {
    tab: 'Brodmann Areas',
    title: 'Brodmann Cytoarchitectonic Areas',
    blurb: 'In 1909 the German neuroanatomist Korbinian Brodmann parcellated the cerebral cortex into numbered areas on the basis of cytoarchitecture, that is, differences in the size, density and laminar arrangement of neurons. He assigned numbers up to 52 across the species he studied, of which roughly 43 are identified in the human brain. Many of these anatomically defined areas were later found to correspond to distinct functions, and Brodmann area (BA) numbers remain a standard reference in neuroscience. The numbering reflects the order in which the areas were described, not their spatial sequence.',
  },
  matter: {
    tab: 'Cortical Organization',
    title: 'Gray Matter, White Matter and Cortical Types',
    blurb: 'Cerebral tissue consists of gray matter, dominated by neuronal cell bodies, dendrites and synapses, and white matter, composed largely of myelinated axons. The cerebral cortex is gray matter and is classified by laminar structure into the six-layered neocortex (isocortex) and the phylogenetically older allocortex, which has fewer layers. The allocortex is subdivided into the paleocortex and the archicortex.',
  },
  deep: {
    tab: 'Subcortical Structures',
    title: 'Subcortical Structures of the Forebrain',
    blurb: 'Beneath the cerebral cortex lie numerous subcortical structures, including the diencephalic nuclei (thalamus and hypothalamus), endocrine glands (pituitary and pineal), the basal ganglia, the corpus callosum and the components of the limbic system. In this view the cortex is rendered translucent so that these deep structures can be visualized.',
  },
  midbrainzoom: {
    tab: 'Mesencephalon',
    title: 'Internal Anatomy of the Mesencephalon',
    blurb: 'The mesencephalon (midbrain) is the shortest segment of the brainstem, approximately 1.5-2 cm in length. Dorsal to the cerebral aqueduct lies the tectum, bearing the paired superior and inferior colliculi; ventral to it lie the tegmentum and the cerebral peduncles. The cerebrum and cerebellum are hidden in this view to expose the midbrain and its nuclei.',
  },
  hindbrainzoom: {
    tab: 'Rhombencephalon',
    title: 'The Rhombencephalon',
    blurb: 'The rhombencephalon (hindbrain) comprises the pons, medulla oblongata and cerebellum. Its brainstem components contain centers for vital autonomic functions, including respiration, heart rate and blood pressure, as well as the nuclei of several cranial nerves, while the cerebellum coordinates posture, balance and movement. The cerebrum is rendered translucent in this view.',
  },
};

export const PARTS_TEXT = {
  // -------------------------------------------------------------------------
  // Hemispheres
  // -------------------------------------------------------------------------
  left: {
    aka: 'Hemispherium cerebri sinistrum',
    tagline: 'The left cerebral hemisphere, which in most individuals is dominant for language and which controls the right (contralateral) side of the body.',
    where: 'The left half of the cerebrum, separated from the right hemisphere by the longitudinal fissure and connected to it by the corpus callosum and smaller commissures.',
    does: [
      'Language production and comprehension in approximately 95% of right-handed and about 70% of left-handed individuals.',
      'Analytical, sequential and verbal processing, including arithmetic calculation.',
      'Fine-grained, detail-oriented (local) analysis of stimuli.',
      'Motor control of and somatosensory input from the right side of the body.',
    ],
    fact: 'Functional asymmetry between the hemispheres is termed lateralization. The popular idea of "left-brained" (logical) versus "right-brained" (creative) personalities is not supported by evidence; large neuroimaging studies find no individual-level hemispheric dominance of this kind, and both hemispheres contribute to nearly all complex tasks.',
  },
  right: {
    aka: 'Hemispherium cerebri dextrum',
    tagline: 'The right cerebral hemisphere, which shows relative specialization for visuospatial and some emotional and prosodic processing, and which controls the left (contralateral) side of the body.',
    where: 'The right half of the cerebrum, approximately a mirror image of the left, separated from it by the longitudinal fissure.',
    does: [
      'Visuospatial processing, including spatial attention, mental rotation and navigation.',
      'A relative advantage in face recognition and in interpreting facial expressions.',
      'Processing emotional prosody (the emotional tone of speech) and aspects of pragmatic language such as sarcasm.',
      'Global (holistic) processing of stimuli and aspects of music perception.',
      'Motor control of and somatosensory input from the left side of the body.',
    ],
    fact: 'Lesions of the right parietal lobe, typically the inferior parietal lobule, frequently cause hemispatial neglect: a failure to attend or respond to stimuli in the left half of space, despite intact vision. Patients may, for example, eat only from the right side of a plate or draw only the right half of a clock.',
  },
  cc: {
    aka: 'Latin for "tough body"; principal cerebral commissure',
    tagline: 'The largest commissural white matter tract of the brain, connecting homologous regions of the left and right cerebral hemispheres.',
    where: 'A broad, arched band of white matter at the floor of the longitudinal fissure, forming much of the roof of the lateral ventricles. From anterior to posterior it is divided into the rostrum, genu, body (trunk) and splenium.',
    does: [
      'Enables interhemispheric transfer of sensory, motor and cognitive information.',
      'Contains approximately 200 million axons, making it the largest white matter structure in the brain.',
      'Supports bimanual coordination and the integration of information from both visual fields.',
    ],
    fact: 'Surgical section of the corpus callosum (callosotomy) is used to treat severe, drug-resistant epilepsy. Studies of these "split-brain" patients by Roger Sperry and Michael Gazzaniga showed that information presented to one hemisphere may be unavailable to the other; Sperry shared the 1981 Nobel Prize in Physiology or Medicine for this work.',
  },

  // -------------------------------------------------------------------------
  // Forebrain, midbrain, hindbrain
  // -------------------------------------------------------------------------
  forebrain: {
    aka: 'Prosencephalon',
    tagline: 'The most rostral of the three primary brain vesicles, giving rise to the cerebral hemispheres and the diencephalon.',
    where: 'The largest and most rostral division of the brain, comprising both cerebral hemispheres (telencephalon) and the centrally located diencephalon, superior to the brainstem.',
    does: [
      'Higher cognitive functions: reasoning, planning, learning and memory.',
      'Conscious perception in all sensory modalities.',
      'Initiation of voluntary movement, language and aspects of personality.',
      'Homeostatic and endocrine regulation, including hunger, thirst and body temperature, via the diencephalon.',
    ],
    fact: 'The term derives from the Greek pro ("before, in front") and enkephalos ("brain"). During development the prosencephalon divides into two secondary vesicles: the telencephalon and the diencephalon.',
  },
  midbrain: {
    aka: 'Mesencephalon',
    tagline: 'The most rostral part of the brainstem, located between the forebrain and the hindbrain.',
    where: 'The uppermost segment of the brainstem, situated between the diencephalon superiorly and the pons inferiorly, and traversed by the cerebral aqueduct.',
    does: [
      'Visual and auditory orienting reflexes (superior and inferior colliculi).',
      'Control of eye movements and the pupillary light reflex via the oculomotor (III) and trochlear (IV) cranial nerve nuclei.',
      'Motor regulation (substantia nigra) and reward processing (ventral tegmental area).',
      'Conduction of ascending and descending tracts between the forebrain, hindbrain and spinal cord.',
    ],
    fact: 'The midbrain is the only primary vesicle that does not subdivide during development; it remains the mesencephalon in the five-vesicle scheme.',
  },
  hindbrain: {
    aka: 'Rhombencephalon',
    tagline: 'The most caudal of the three primary brain vesicles, comprising the pons, medulla oblongata and cerebellum.',
    where: 'The posterior and inferior part of the brain, occupying the posterior cranial fossa and continuous inferiorly with the spinal cord.',
    does: [
      'Regulation of respiration, heart rate and blood pressure (medulla and pons).',
      'Balance, posture and motor coordination (cerebellum).',
      'Regulation of sleep, including the generation of REM sleep (pontine tegmentum).',
      'Protective reflexes such as swallowing, coughing, sneezing and vomiting.',
    ],
    fact: 'The name refers to the rhomboid (diamond-shaped) fossa that forms the floor of the fourth ventricle, the cerebrospinal fluid-filled cavity of the hindbrain. It divides into the metencephalon and the myelencephalon.',
  },

  // -------------------------------------------------------------------------
  // The 5 divisions
  // -------------------------------------------------------------------------
  telencephalon: {
    aka: 'Cerebrum; Greek for "end brain"',
    tagline: 'The most rostral secondary brain vesicle, which develops into the cerebral hemispheres.',
    where: 'The two cerebral hemispheres, consisting of the cerebral cortex, the underlying white matter and deep structures including the basal ganglia, hippocampus and amygdala.',
    does: [
      'Higher cognitive functions, including reasoning, language and abstract thought.',
      'Conscious sensory perception and interpretation.',
      'Planning and initiation of voluntary movement.',
      'Memory and emotion (hippocampus and amygdala).',
    ],
    fact: 'The prefix derives from the Greek telos, "end". The telencephalon is the largest part of the human brain, accounting for approximately 85% of its mass.',
  },
  diencephalon: {
    aka: 'Interbrain; Greek for "between brain"',
    tagline: 'The caudal derivative of the prosencephalon, containing the thalamus, hypothalamus, epithalamus and subthalamus.',
    where: 'Located deep in the center of the brain, between the cerebral hemispheres and superior to the mesencephalon, surrounding the third ventricle. It is not visible from the lateral surface of the intact brain.',
    does: [
      'Relay and gating of sensory and motor information to the cerebral cortex (thalamus).',
      'Homeostatic regulation of temperature, hunger, thirst and sleep (hypothalamus).',
      'Neuroendocrine control via the hypothalamic-pituitary axis.',
      'Regulation of circadian rhythm through melatonin secretion (pineal gland of the epithalamus).',
    ],
    fact: 'The name derives from the Greek dia, "through" or "between", reflecting its position between the telencephalon and the brainstem.',
  },
  mesencephalon: {
    aka: 'Midbrain; Greek for "middle brain"',
    tagline: 'The secondary vesicle that persists unchanged from the primary midbrain vesicle and forms the rostral brainstem.',
    where: 'The rostral brainstem, between the diencephalon superiorly and the pons inferiorly.',
    does: [
      'Visual and auditory reflexes (tectum).',
      'Oculomotor control and the pupillary light reflex.',
      'Motor regulation and reward processing (tegmentum, substantia nigra, ventral tegmental area).',
      'Descending modulation of pain (periaqueductal gray).',
    ],
    fact: 'The prefix derives from the Greek mesos, "middle". The cerebral aqueduct, a narrow channel conducting cerebrospinal fluid from the third to the fourth ventricle, passes through it.',
  },
  metencephalon: {
    aka: 'Greek for "after brain"',
    tagline: 'The rostral secondary vesicle of the rhombencephalon, giving rise to the pons and the cerebellum.',
    where: 'The upper portion of the hindbrain, consisting of the pons anteriorly and the cerebellum posteriorly, with the fourth ventricle between them.',
    does: [
      'Motor coordination, balance and motor learning (cerebellum).',
      'Relay of information from the cerebral cortex to the cerebellum via the pontine nuclei.',
      'Modulation of respiratory rhythm (pontine respiratory group).',
      'Regulation of sleep, including REM sleep.',
    ],
    fact: 'The prefix derives from the Greek meta, "after", indicating its position caudal to the mesencephalon.',
  },
  myelencephalon: {
    aka: 'Medulla oblongata; Greek for "marrow brain"',
    tagline: 'The most caudal secondary brain vesicle, which develops into the medulla oblongata.',
    where: 'The lowest part of the brainstem, continuous with the spinal cord at the level of the foramen magnum.',
    does: [
      'Cardiovascular and respiratory control centers.',
      'Reflexes including swallowing, coughing, sneezing and vomiting.',
      'Conduction of all ascending and descending tracts between the brain and the spinal cord.',
    ],
    fact: 'The prefix derives from the Greek myelos, "marrow"; the spinal cord was historically called the spinal marrow, and the medulla was regarded as its extension into the skull.',
  },

  // -------------------------------------------------------------------------
  // Lobes
  // -------------------------------------------------------------------------
  frontal: {
    aka: 'Lobus frontalis',
    tagline: 'The largest cerebral lobe, responsible for executive function, voluntary motor control and, in the dominant hemisphere, speech production.',
    where: 'The anterior part of each hemisphere, bounded posteriorly by the central sulcus and inferiorly by the lateral (Sylvian) fissure.',
    does: [
      'Executive functions: planning, decision-making and problem-solving (prefrontal cortex).',
      'Regulation of personality, social behavior and impulse control.',
      'Voluntary movement (primary motor cortex of the precentral gyrus).',
      'Speech production (Broca\'s area, usually in the left inferior frontal gyrus).',
      'Working memory and sustained attention.',
    ],
    fact: 'The prefrontal cortex is among the last brain regions to mature, with myelination and synaptic refinement continuing into the mid-20s. The 1848 case of Phineas Gage, whose personality reportedly changed after an iron tamping rod passed through his left frontal lobe, is a classic early example of frontal lobe localization, although later accounts of his case were often exaggerated.',
  },
  parietal: {
    aka: 'Lobus parietalis',
    tagline: 'The cerebral lobe responsible for somatosensory processing, spatial attention and multisensory integration.',
    where: 'The superior posterior part of each hemisphere, posterior to the central sulcus, superior to the lateral fissure and anterior to the parieto-occipital sulcus.',
    does: [
      'Somatosensation (touch, pressure, pain and temperature) in the primary somatosensory cortex of the postcentral gyrus.',
      'Proprioception, the sense of limb and body position.',
      'Spatial attention and the representation of extrapersonal space.',
      'Numerical cognition and integration of information across sensory modalities.',
    ],
    fact: 'Like the frontal, temporal and occipital lobes, it is named after the overlying cranial bone, in this case the paired parietal bones (Latin paries, "wall").',
  },
  temporal: {
    aka: 'Lobus temporalis',
    tagline: 'The cerebral lobe responsible for auditory processing, language comprehension, visual object recognition and, through its medial structures, memory.',
    where: 'The inferolateral part of each hemisphere, inferior to the lateral fissure and beneath the temporal bone of the skull.',
    does: [
      'Auditory processing (primary auditory cortex of Heschl\'s gyrus).',
      'Language comprehension (Wernicke\'s area, usually in the left hemisphere).',
      'Declarative memory formation via the hippocampus in the medial temporal lobe.',
      'Visual recognition of objects and faces (inferior temporal cortex and fusiform gyrus).',
      'Emotional processing via the amygdala.',
    ],
    fact: 'The temporal lobe is named after the temporal bone, from the Latin tempora, "temples". Temporal lobe epilepsy is the most common form of focal epilepsy in adults and frequently involves the hippocampus.',
  },
  occipital: {
    aka: 'Lobus occipitalis',
    tagline: 'The cerebral lobe devoted primarily to visual processing.',
    where: 'The posterior pole of each hemisphere, superior to the cerebellum (separated from it by the tentorium cerebelli) and posterior to the parieto-occipital sulcus on the medial surface.',
    does: [
      'Primary processing of visual information in the striate cortex (V1).',
      'Analysis of form, color, orientation and motion in extrastriate areas.',
      'Transmission of visual information to the temporal ("what") and parietal ("where") streams.',
    ],
    fact: 'It is the smallest of the four principal lobes. Bilateral damage to the primary visual cortex causes cortical blindness, in which the eyes and pupillary reflexes are intact but conscious vision is lost.',
  },
  insula: {
    aka: 'Insular cortex; Island of Reil',
    tagline: 'A region of cortex concealed within the lateral fissure, involved in interoception, taste and emotional awareness.',
    where: 'Deep within the lateral (Sylvian) fissure, completely covered by the frontal, parietal and temporal opercula, and surrounded by the circular sulcus.',
    does: [
      'Interoception: awareness of internal bodily states such as heartbeat, hunger and visceral sensation.',
      'Gustation: the primary gustatory cortex lies in the anterior insula and adjacent frontal operculum.',
      'The experience of disgust.',
      'Empathy, subjective emotional awareness and the affective component of pain.',
    ],
    fact: 'Insula is Latin for "island". It is also called the Island of Reil after the German physician Johann Christian Reil, who described it in 1809.',
  },

  // -------------------------------------------------------------------------
  // Cortex hotspots
  // -------------------------------------------------------------------------
  prefrontal: {
    aka: 'Prefrontal cortex (PFC)',
    tagline: 'The anterior portion of the frontal lobe, essential for executive functions and goal-directed behavior.',
    where: 'The most anterior region of the frontal lobe, rostral to the premotor cortex, including dorsolateral, ventromedial and orbitofrontal subdivisions.',
    does: [
      'Executive functions: planning, organization and goal setting.',
      'Inhibitory control of impulses and behavior.',
      'Evaluation of options and anticipation of consequences.',
      'Regulation of social behavior and aspects of personality.',
    ],
    fact: 'The dual-systems model proposes that increased risk-taking in adolescence reflects earlier maturation of subcortical reward circuitry relative to the prefrontal cortex. The model is influential, though the details remain an active area of research.',
  },
  precentral: {
    aka: 'Gyrus precentralis; location of the primary motor cortex',
    tagline: 'The gyrus immediately anterior to the central sulcus, containing the primary motor cortex.',
    where: 'A vertically oriented gyrus of the frontal lobe, bounded posteriorly by the central sulcus and anteriorly by the precentral sulcus. It extends onto the medial surface as the anterior part of the paracentral lobule.',
    does: [
      'Generates motor commands for voluntary movement via the corticospinal and corticobulbar tracts.',
      'Controls muscles on the contralateral side of the body.',
      'Is somatotopically organized, forming the motor homunculus.',
    ],
    fact: 'Layer V of the primary motor cortex contains Betz cells, among the largest neurons in the central nervous system. Their axons descend to the spinal cord, where some synapse directly on lower motor neurons.',
  },
  postcentral: {
    aka: 'Gyrus postcentralis; location of the primary somatosensory cortex',
    tagline: 'The gyrus immediately posterior to the central sulcus, containing the primary somatosensory cortex (S1).',
    where: 'A vertically oriented gyrus of the parietal lobe, bounded anteriorly by the central sulcus and posteriorly by the postcentral sulcus.',
    does: [
      'Receives touch, pressure, vibration, pain and temperature information relayed by the thalamus.',
      'Processes proprioceptive information about limb position.',
      'Represents the contralateral side of the body.',
      'Is somatotopically organized, forming the sensory homunculus.',
    ],
    fact: 'Regions with high receptor density, such as the lips and fingertips, occupy disproportionately large cortical areas, a principle known as cortical magnification. This contributes to the greater tactile acuity of those regions compared with, for example, the back.',
  },
  homunculus: {
    aka: 'Cortical homunculus; Latin for "little man"',
    tagline: 'A topographic representation of the body surface and musculature across the primary motor and primary somatosensory cortices.',
    where: 'Not a discrete structure but a somatotopic map along the precentral gyrus (motor) and postcentral gyrus (sensory) of each hemisphere.',
    does: [
      'Illustrates which cortical regions control (motor) or receive sensation from (sensory) each body part.',
      'The lower limb is represented on the medial surface (paracentral lobule), with the trunk, upper limb, face and tongue represented progressively more laterally and inferiorly toward the lateral fissure.',
      'Body parts requiring fine motor control or high sensory acuity, such as the hands, lips and tongue, receive disproportionately large representations.',
    ],
    fact: 'The map was characterized by the neurosurgeon Wilder Penfield and colleagues from the 1930s to the 1950s through electrical stimulation of the cortex in awake patients undergoing epilepsy surgery. Because brain tissue itself lacks pain receptors, such procedures can be performed under local anesthesia.',
  },
  broca: {
    aka: 'Broca\'s area; anterior speech area',
    tagline: 'A region of the dominant inferior frontal gyrus essential for speech production and syntactic processing.',
    where: 'The posterior part of the inferior frontal gyrus (pars opercularis and pars triangularis), usually in the left hemisphere, just above the lateral fissure.',
    does: [
      'Motor planning of speech articulation.',
      'Syntactic processing in both production and comprehension.',
      'Contributes to written language and to signed languages.',
    ],
    fact: 'Named after the French physician Paul Broca, who in 1861 described a patient, Louis Victor Leborgne, who could understand language but could produce only the syllable "tan". Damage to this region causes Broca\'s (expressive, non-fluent) aphasia, characterized by effortful, telegraphic speech with relatively preserved comprehension.',
  },
  wernicke: {
    aka: 'Wernicke\'s area; posterior speech area',
    tagline: 'A region of the dominant posterior superior temporal gyrus essential for language comprehension.',
    where: 'The posterior part of the superior temporal gyrus, usually in the left hemisphere, adjacent to the primary auditory cortex. Its exact boundaries are debated.',
    does: [
      'Comprehension of spoken and written language.',
      'Selection of words and their meanings during speech production.',
      'Connected to Broca\'s area by the arcuate fasciculus, a white matter tract whose damage is associated with conduction aphasia.',
    ],
    fact: 'Named after the German neurologist Carl Wernicke, who described it in 1874. Damage causes Wernicke\'s (receptive, fluent) aphasia: speech is fluent but contains incorrect or invented words, often termed "word salad", and comprehension is severely impaired.',
  },
  auditory: {
    aka: 'Primary auditory cortex (A1); Heschl\'s gyrus',
    tagline: 'The first cortical area to receive auditory information, located on the transverse temporal gyrus.',
    where: 'On the transverse temporal gyrus (Heschl\'s gyrus) on the superior surface of the temporal lobe, largely concealed within the lateral fissure. It is present bilaterally.',
    does: [
      'Receives auditory input from the medial geniculate nucleus of the thalamus.',
      'Encodes the frequency (pitch) and intensity (loudness) of sounds.',
      'Projects to auditory association areas, including Wernicke\'s area, for higher-level analysis such as speech recognition.',
    ],
    fact: 'A1 is tonotopically organized: neurons responding to different sound frequencies are arranged in an orderly gradient across the cortex, mirroring the frequency map of the cochlea.',
  },
  v1: {
    aka: 'Primary visual cortex (V1)',
    tagline: 'The first cortical area to receive visual information, distinguished by a visible stripe of myelinated fibers.',
    where: 'At the occipital pole, predominantly on the medial surface, lining the upper and lower banks of the calcarine sulcus.',
    does: [
      'Receives visual input from the lateral geniculate nucleus of the thalamus via the optic radiations.',
      'Contains neurons selective for edge orientation, spatial frequency, direction of motion, binocular disparity and color.',
      'Represents the contralateral visual field: the left V1 processes the right visual hemifield and vice versa.',
    ],
    fact: 'The name "striate" (striped) refers to the stria of Gennari, a band of myelinated fibers in layer IV visible to the naked eye in cross-section. David Hubel and Torsten Wiesel shared the 1981 Nobel Prize in Physiology or Medicine for discovering the orientation-selective neurons of this region.',
  },

  // -------------------------------------------------------------------------
  // Brodmann areas
  // -------------------------------------------------------------------------
  ba4: {
    aka: 'Primary motor cortex (M1)',
    tagline: 'The cortical area that issues the principal descending commands for voluntary movement.',
    where: 'Occupies the posterior part of the precentral gyrus, extending into the anterior wall of the central sulcus, and continues onto the medial surface in the paracentral lobule.',
    does: [
      'Executes voluntary movements of the contralateral side of the body via the corticospinal and corticobulbar tracts.',
      'Is somatotopically organized as the motor homunculus.',
      'Encodes movement parameters such as force and direction.',
    ],
    fact: 'BA4 is agranular cortex (lacking a distinct internal granular layer IV) and is characterized by Betz cells, giant pyramidal neurons in layer V. Betz cells nonetheless supply only a small fraction of corticospinal axons; most originate from smaller pyramidal neurons in BA4 and neighboring areas.',
  },
  ba6: {
    aka: 'Premotor cortex (PMC) and supplementary motor area (SMA)',
    tagline: 'Agranular frontal cortex involved in planning, selecting and sequencing movements.',
    where: 'In the frontal lobe, immediately anterior to BA4. Its lateral portion forms the premotor cortex and its medial portion the supplementary motor area.',
    does: [
      'Planning and preparation of voluntary movements.',
      'Sequencing of complex movements.',
      'Coordination of bimanual and postural movements (SMA).',
      'Selection of movements in response to external cues (premotor cortex).',
    ],
    fact: 'The readiness potential (Bereitschaftspotential), a slow negative EEG shift recorded before self-initiated movements, is generated in large part by the supplementary motor area.',
  },
  ba8: {
    aka: 'Includes the frontal eye fields (FEF)',
    tagline: 'A frontal region associated with voluntary control of eye movements and visual attention.',
    where: 'In the frontal lobe, anterior to BA6, mainly in the posterior parts of the superior and middle frontal gyri.',
    does: [
      'Voluntary (intentional) saccadic eye movements.',
      'Top-down control of visual spatial attention.',
    ],
    fact: 'The frontal eye fields are traditionally assigned to BA8, although functional imaging in humans places them near the junction of the precentral and superior frontal sulci, around the BA6/8 border. They project to the superior colliculus, which also generates reflexive, stimulus-driven saccades.',
  },
  ba9: {
    aka: 'Dorsolateral prefrontal cortex (DLPFC)',
    tagline: 'Prefrontal regions central to working memory and cognitive control.',
    where: 'On the dorsolateral surface of the frontal lobe, mainly in the superior and middle frontal gyri, forming part of the prefrontal cortex. BA46 lies largely within the middle frontal gyrus.',
    does: [
      'Working memory: the active maintenance and manipulation of information over short periods.',
      'Planning, organization and abstract reasoning.',
      'Cognitive flexibility and task switching.',
    ],
    fact: 'BA46 in particular is strongly associated with working memory. Patients with DLPFC damage often perform poorly on the Wisconsin Card Sorting Test, persisting with a previously correct rule after it has changed (perseveration).',
  },
  ba10: {
    aka: 'Frontopolar cortex; anterior prefrontal cortex',
    tagline: 'The most anterior region of the prefrontal cortex, associated with complex, multi-step cognition.',
    where: 'The frontal pole, the most rostral part of the frontal lobe.',
    does: [
      'Maintaining a main goal while pursuing subgoals (cognitive branching).',
      'Prospective memory and long-term planning.',
      'Metacognition: monitoring and evaluating one\'s own thoughts.',
    ],
    fact: 'Comparative studies indicate that BA10 is relatively larger in humans than in other great apes, and it is thought to contribute to distinctively human abilities in planning and abstract thought.',
  },
  ba11: {
    aka: 'Orbitofrontal cortex (OFC)',
    tagline: 'Ventral prefrontal cortex that represents the value of rewards and guides decision-making.',
    where: 'On the inferior (orbital) surface of the frontal lobe, superior to the orbits of the eyes.',
    does: [
      'Representation of reward value and decision-making based on expected outcomes.',
      'Regulation of emotion and social behavior.',
      'Evaluation of the pleasantness of tastes and odors.',
    ],
    fact: 'Damage to the orbitofrontal and ventromedial prefrontal cortex is associated with impulsivity, poor social judgment and personality change. Reconstructions of Phineas Gage\'s skull suggest that his injury affected these regions.',
  },
  ba44: {
    aka: 'Broca\'s area (pars opercularis and pars triangularis)',
    tagline: 'The cytoarchitectonic areas of the inferior frontal gyrus that constitute Broca\'s area.',
    where: 'The posterior inferior frontal gyrus, superior to the lateral fissure. BA44 corresponds to the pars opercularis and BA45 to the more anterior pars triangularis.',
    does: [
      'Motor planning of speech articulation (particularly BA44).',
      'Syntactic and semantic processing of sentences (BA44 and BA45).',
      'In the non-dominant (usually right) hemisphere, the homologous areas are implicated in the processing of speech prosody.',
    ],
    fact: 'Lesions confined to BA44/45 typically produce milder deficits than the full syndrome of Broca\'s aphasia, which usually requires damage extending into surrounding cortex and underlying white matter.',
  },
  ba312: {
    aka: 'Primary somatosensory cortex (S1)',
    tagline: 'The cytoarchitectonic areas that constitute the primary somatosensory cortex.',
    where: 'The postcentral gyrus and the posterior wall of the central sulcus, in the parietal lobe. From anterior to posterior the order is 3a, 3b, 1 and 2.',
    does: [
      'Area 3b receives the majority of cutaneous (touch) input from the thalamus; area 3a receives proprioceptive input.',
      'Area 1 is particularly involved in processing texture.',
      'Area 2 integrates tactile and proprioceptive information to encode the size and shape of objects.',
      'All represent the contralateral side of the body.',
    ],
    fact: 'The non-sequential ordering 3, 1, 2 reflects the order in which Brodmann described the areas rather than their spatial arrangement.',
  },
  ba5: {
    aka: 'Somatosensory association cortex',
    tagline: 'Parietal association cortex that integrates tactile and proprioceptive information.',
    where: 'In the superior parietal lobule, immediately posterior to the postcentral gyrus, extending onto the medial surface.',
    does: [
      'Integration of touch with information about limb position.',
      'Guidance of reaching and grasping movements.',
      'Recognition of objects by touch (stereognosis).',
    ],
    fact: 'The ability to identify objects by touch alone is called stereognosis. Its loss, astereognosis, with intact basic sensation, is a sign of parietal lobe damage.',
  },
  ba7: {
    aka: 'Superior parietal lobule; visuomotor association cortex',
    tagline: 'Posterior parietal cortex that integrates visual and somatosensory information to guide action in space.',
    where: 'In the superior parietal lobule, posterior to BA5, extending onto the medial surface as the precuneus.',
    does: [
      'Integration of visual information with body position.',
      'Visual guidance of reaching and grasping (visuomotor coordination).',
      'Spatial localization of objects relative to the body.',
    ],
    fact: 'Damage to the superior parietal lobule can produce optic ataxia, an inability to reach accurately toward visually presented targets despite normal vision and strength. Optic ataxia is one component of Bálint syndrome, which follows bilateral parieto-occipital damage.',
  },
  ba40: {
    aka: 'Supramarginal gyrus',
    tagline: 'Inferior parietal cortex involved in phonological processing and somatosensory integration.',
    where: 'In the anterior inferior parietal lobule, arching over the posterior end of the lateral fissure.',
    does: [
      'Phonological processing and phonological working memory, supporting reading and spelling.',
      'Higher-order processing of touch and body position.',
      'Participation in the perisylvian language network together with Wernicke\'s and Broca\'s areas.',
    ],
    fact: 'The name means "above the margin", referring to its position over the posterior end of the lateral fissure. Left supramarginal lesions are associated with ideomotor apraxia, a difficulty performing learned skilled gestures on command.',
  },
  ba39: {
    aka: 'Angular gyrus',
    tagline: 'Inferior parietal cortex at the junction of the parietal, temporal and occipital lobes, involved in reading, semantic processing and calculation.',
    where: 'In the posterior inferior parietal lobule, curving around the posterior end of the superior temporal sulcus, near the parieto-temporo-occipital junction.',
    does: [
      'Reading and writing: linking written word forms to their meanings.',
      'Number processing and arithmetic.',
      'Semantic processing; it has also been implicated in the comprehension of metaphor.',
    ],
    fact: 'Lesions of the dominant (usually left) angular gyrus are associated with Gerstmann syndrome: agraphia (impaired writing), acalculia (impaired calculation), finger agnosia and left-right disorientation.',
  },
  ba43: {
    aka: 'Subcentral area',
    tagline: 'A small area at the inferior end of the central sulcus, classically associated with gustatory and orofacial sensory processing.',
    where: 'At the inferior ends of the precentral and postcentral gyri, just above the lateral fissure, adjacent to the frontoparietal operculum and the insula.',
    does: [
      'Somatosensory and motor processing related to the tongue, mouth and pharynx.',
      'Has been associated with taste processing in classical maps, in conjunction with the insula.',
    ],
    fact: 'Some classical Brodmann maps label BA43 as the gustatory area. Modern evidence locates the primary gustatory cortex mainly in the anterior insula and adjacent frontal operculum, close to but largely distinct from BA43, so its precise role in taste remains debated.',
  },
  ba41: {
    aka: 'Primary (41) and secondary (42) auditory cortex',
    tagline: 'The cytoarchitectonic areas of the transverse temporal gyrus that constitute the primary auditory cortex and its immediate belt.',
    where: 'On the superior surface of the temporal lobe, mainly on Heschl\'s gyrus within the lateral fissure. BA41 lies medially on the gyrus and BA42 lateral to it.',
    does: [
      'BA41 (primary auditory cortex) encodes frequency and intensity of sound.',
      'BA42 (auditory belt) performs early analysis of complex sounds.',
      'Each hemisphere receives input from both ears, with a contralateral predominance.',
    ],
    fact: 'Because the ascending auditory pathways carry information from both ears to both hemispheres, damage to the auditory cortex of one hemisphere does not cause deafness in either ear, though sound localization may be impaired.',
  },
  ba22: {
    aka: 'Superior temporal gyrus; includes Wernicke\'s area',
    tagline: 'Auditory association cortex of the superior temporal gyrus, whose posterior part in the dominant hemisphere forms Wernicke\'s area.',
    where: 'The superior temporal gyrus, surrounding the primary auditory areas (BA41/42).',
    does: [
      'Auditory association: higher-order analysis of complex sounds, including speech.',
      'Language comprehension in its posterior portion in the dominant hemisphere (Wernicke\'s area).',
      'Recognition of voices and processing of music.',
    ],
    fact: 'Lesions of the posterior part of the left BA22 are classically associated with Wernicke\'s aphasia: fluent but meaningless speech with severely impaired comprehension.',
  },
  ba20: {
    aka: 'Inferior (20) and middle (21) temporal gyri',
    tagline: 'Temporal association cortex involved in visual object recognition and semantic memory.',
    where: 'BA21 occupies the middle temporal gyrus and BA20 the inferior temporal gyrus, on the lateral and inferior surfaces of the temporal lobe.',
    does: [
      'Visual object recognition as part of the ventral ("what") visual stream.',
      'Storage and retrieval of word meanings and general knowledge (semantic memory).',
      'Visual memory.',
    ],
    fact: 'Visual processing divides into a ventral ("what") stream projecting into the temporal lobe and a dorsal ("where" or "how") stream projecting into the parietal lobe, a model proposed by Ungerleider and Mishkin in 1982. Progressive degeneration of the anterior temporal lobes causes semantic dementia, a loss of word and object knowledge.',
  },
  ba37: {
    aka: 'Occipitotemporal area; includes much of the fusiform gyrus',
    tagline: 'Ventral occipitotemporal cortex specialized for recognition of faces, words and objects.',
    where: 'At the junction of the temporal and occipital lobes, largely on the inferior surface, including much of the posterior fusiform gyrus.',
    does: [
      'Face recognition (the fusiform face area, typically stronger in the right hemisphere).',
      'Recognition of written words (the visual word form area, in the left hemisphere).',
      'Recognition of objects and processing of color.',
    ],
    fact: 'Damage to this region, particularly bilaterally or in the right hemisphere, can cause prosopagnosia ("face blindness"), an inability to recognize familiar faces, sometimes including one\'s own, with otherwise intact vision.',
  },
  ba38: {
    aka: 'Temporal pole; temporopolar area',
    tagline: 'The anterior tip of the temporal lobe, involved in semantic, social and emotional processing.',
    where: 'The most anterior part of the temporal lobe, in the middle cranial fossa.',
    does: [
      'Recognition of familiar people and retrieval of proper names.',
      'Linking emotional responses with semantic knowledge and memories.',
      'Social cognition, including understanding the mental states of others.',
    ],
    fact: 'The temporal pole is closely interconnected with the amygdala and orbitofrontal cortex, and it is among the regions affected early in semantic dementia.',
  },
  ba17: {
    aka: 'Primary visual cortex (V1); striate cortex',
    tagline: 'The cytoarchitectonic area that constitutes the primary visual cortex.',
    where: 'At the occipital pole, predominantly on the medial surface, lining the banks of the calcarine sulcus.',
    does: [
      'Receives visual input from the lateral geniculate nucleus of the thalamus.',
      'Detects orientation, spatial frequency, direction of motion and binocular disparity.',
      'Maps the contralateral visual field retinotopically, with the fovea over-represented at the occipital pole.',
    ],
    fact: 'BA17 is synonymous with the striate cortex, named for the stria of Gennari. Damage to part of BA17 produces a corresponding blind area (scotoma) in the contralateral visual field.',
  },
  ba18: {
    aka: 'Secondary visual cortex (V2); parastriate cortex',
    tagline: 'Extrastriate visual cortex that receives input primarily from V1 and performs intermediate visual processing.',
    where: 'A band of occipital cortex immediately surrounding BA17.',
    does: [
      'Processing of contours, textures, patterns and depth.',
      'Relays information to higher visual areas in the dorsal and ventral streams.',
    ],
    fact: 'BA18 and BA19 are together referred to as extrastriate cortex, meaning cortex outside the striate area.',
  },
  ba19: {
    aka: 'Visual association cortex; peristriate cortex',
    tagline: 'Extrastriate visual association cortex containing multiple specialized visual areas.',
    where: 'The occipital cortex anterior to BA18, extending toward the parietal and temporal lobes.',
    does: [
      'Higher-order integration of visual information for recognition.',
      'Contains areas specialized for color (V4) and, near its border with the temporal lobe, motion (V5/MT).',
      'Links visual input with memory and other sensory modalities.',
    ],
    fact: 'Bilateral damage to the motion area V5/MT can cause akinetopsia, a rare inability to perceive motion. A well-documented patient described in 1983 saw moving objects as a series of static positions.',
  },

  // -------------------------------------------------------------------------
  // Gray matter, white matter, cortex types
  // -------------------------------------------------------------------------
  cortex: {
    aka: 'Cortex cerebri; Latin cortex, "bark"',
    tagline: 'The layered sheet of gray matter forming the outer surface of the cerebrum.',
    where: 'The outer layer of the cerebral hemispheres, approximately 2-4 mm thick, folded into gyri (ridges) and sulci (grooves).',
    does: [
      'Higher cognitive functions, including reasoning, language and memory.',
      'Conscious perception in all sensory modalities.',
      'Planning and control of voluntary movement.',
    ],
    fact: 'The cortex contains approximately 16 billion of the brain\'s roughly 86 billion neurons. Its total surface area is roughly 2,000-2,500 cm² (estimates vary), about two-thirds of which lies hidden within the sulci; this folding (gyrification) allows a large surface area to fit within the skull.',
  },
  neocortex: {
    aka: 'Isocortex; "new cortex"',
    tagline: 'Six-layered cortex unique to mammals, constituting the great majority of the human cerebral cortex.',
    where: 'Approximately 90% of the cerebral cortex, including essentially all of the lateral surface of the hemispheres.',
    does: [
      'Supports sensory perception, voluntary movement, language, conscious thought and planning.',
      'Has six cellular layers (I-VI), in contrast to the three to five layers of the allocortex.',
      'Comprises the cortex of the frontal, parietal, temporal and occipital lobes.',
    ],
    fact: 'The neocortex is a defining feature of mammals. Humans have an exceptionally large neocortex relative to body size, which is associated with complex cognitive abilities such as language and abstract reasoning.',
  },
  allocortex: {
    aka: 'Heterotypic cortex; Greek for "other cortex"',
    tagline: 'Phylogenetically older cortex with fewer than six layers.',
    where: 'Restricted regions mainly on the medial and inferior surfaces of the brain, including the olfactory cortex and the hippocampal formation.',
    does: [
      'Has fewer layers than the neocortex, typically three.',
      'Is subdivided into the paleocortex (primarily olfactory) and the archicortex (primarily the hippocampal formation).',
    ],
    fact: 'The prefix derives from the Greek allos, "other", distinguishing it from the neocortex. Transitional cortex between allocortex and neocortex, such as parts of the cingulate and parahippocampal gyri, is termed mesocortex or periallocortex.',
  },
  paleocortex: {
    aka: 'Olfactory cortex; "old cortex"',
    tagline: 'Allocortex associated chiefly with olfaction.',
    where: 'On the ventral surface of the brain near the junction of the frontal and temporal lobes, receiving input from the olfactory bulbs via the olfactory tracts.',
    does: [
      'Processing of olfactory information.',
      'Includes the piriform cortex, the anterior olfactory nucleus and the olfactory tubercle.',
      'Links odors with emotion and memory through connections with the amygdala and entorhinal cortex.',
    ],
    fact: 'Olfaction is the only sensory modality whose primary pathway reaches the cortex without first relaying in the thalamus. Its close connections with limbic structures are thought to explain why odors can evoke vivid emotional memories.',
  },
  archicortex: {
    aka: 'Hippocampal formation; "ancient cortex"',
    tagline: 'The phylogenetically oldest type of cortex, represented in humans chiefly by the hippocampal formation.',
    where: 'Within the medial temporal lobe of each hemisphere, forming the hippocampus and dentate gyrus along the floor of the inferior horn of the lateral ventricle.',
    does: [
      'Formation of new declarative (episodic and semantic) memories.',
      'Spatial memory and navigation.',
      'Has a three-layered structure.',
    ],
    fact: 'The prefix derives from the Greek arche, "beginning" or "origin". The dentate gyrus of the archicortex is one of the few sites in the mammalian brain where adult neurogenesis has been demonstrated, although its extent in adult humans is debated.',
  },
  white: {
    aka: 'Substantia alba',
    tagline: 'Central nervous tissue composed predominantly of myelinated axons that interconnect regions of gray matter.',
    where: 'Beneath the cerebral cortex, forming the core of each hemisphere and surrounding the deep gray matter nuclei.',
    does: [
      'Conducts signals between cortical areas, subcortical structures and the spinal cord.',
      'Consists of axons ensheathed in myelin produced by oligodendrocytes, which increases conduction velocity through saltatory conduction.',
      'Is organized into commissural fibers (connecting the hemispheres, e.g. the corpus callosum), association fibers (connecting areas within a hemisphere) and projection fibers (connecting the cortex with subcortical structures and the spinal cord).',
    ],
    fact: 'Its pale color reflects the high lipid content of myelin. Stereological estimates put the total length of myelinated fibers in the adult human brain at roughly 150,000-180,000 km. Multiple sclerosis is an autoimmune disease in which central myelin is damaged.',
  },

  // -------------------------------------------------------------------------
  // Deep forebrain
  // -------------------------------------------------------------------------
  thalamus: {
    aka: 'Diencephalic relay nucleus complex; Greek for "inner chamber"',
    tagline: 'A paired mass of nuclei in the diencephalon that relays and regulates sensory and motor information destined for the cerebral cortex.',
    where: 'Two ovoid masses of gray matter forming the superior part of the diencephalon, on either side of the third ventricle and superior to the midbrain. In most people they are joined across the midline by the interthalamic adhesion.',
    does: [
      'Relays all sensory modalities except olfaction to their primary cortical areas, for example vision via the lateral geniculate nucleus, hearing via the medial geniculate nucleus and somatosensation via the ventral posterior nuclei.',
      'Relays motor information from the basal ganglia and cerebellum to motor cortex (ventral anterior and ventral lateral nuclei).',
      'Regulates arousal, sleep-wake states and cortical activity through thalamocortical circuits.',
      'Contributes to attention, consciousness and memory (e.g. the anterior and mediodorsal nuclei).',
    ],
    fact: 'Thalamic strokes can produce contralateral sensory loss, and damage to the ventral posterior thalamus may later lead to central post-stroke pain (Dejerine-Roussy syndrome), a persistent burning pain on the affected side of the body.',
  },
  hypothalamus: {
    aka: 'Greek for "under the thalamus"',
    tagline: 'A small diencephalic region that integrates autonomic, endocrine and behavioral responses to maintain homeostasis.',
    where: 'Inferior to the thalamus, separated from it by the hypothalamic sulcus, forming the floor and lower walls of the third ventricle. The pituitary gland is attached to it by the infundibulum.',
    does: [
      'Homeostatic regulation of body temperature, hunger, thirst and fluid balance.',
      'Generation of circadian rhythms via the suprachiasmatic nucleus.',
      'Control of the autonomic nervous system, including sympathetic "fight-or-flight" responses.',
      'Neuroendocrine control of the pituitary gland through releasing and inhibiting hormones and through direct neural projections.',
    ],
    fact: 'Despite weighing only about 4 grams, it controls the pituitary gland, the so-called "master gland". The hypothalamic-pituitary-adrenal (HPA) axis is the principal hormonal pathway of the stress response.',
  },
  pituitary: {
    aka: 'Hypophysis; the "master gland"',
    tagline: 'An endocrine gland suspended from the hypothalamus that secretes hormones regulating growth, metabolism, stress responses and reproduction.',
    where: 'Attached to the base of the hypothalamus by the infundibulum (pituitary stalk), resting in the sella turcica ("Turkish saddle"), a depression of the sphenoid bone.',
    does: [
      'The anterior lobe (adenohypophysis) secretes growth hormone, prolactin, thyroid-stimulating hormone (TSH), adrenocorticotropic hormone (ACTH), follicle-stimulating hormone (FSH) and luteinizing hormone (LH).',
      'Through TSH, ACTH, FSH and LH it regulates the thyroid gland, adrenal cortex and gonads.',
      'The posterior lobe (neurohypophysis) releases antidiuretic hormone (ADH, vasopressin), which promotes water reabsorption by the kidneys.',
      'The posterior lobe also releases oxytocin, which stimulates uterine contraction and milk ejection and is involved in social bonding.',
    ],
    fact: 'Although called the "master gland", it is itself controlled by the hypothalamus. ADH and oxytocin are synthesized by hypothalamic neurons (supraoptic and paraventricular nuclei) and transported down their axons for release from the posterior pituitary.',
  },
  pineal: {
    aka: 'Epiphysis cerebri; part of the epithalamus',
    tagline: 'A small endocrine gland of the epithalamus that secretes melatonin and contributes to the regulation of circadian rhythms.',
    where: 'A pinecone-shaped gland at the posterior end of the roof of the third ventricle, between the two thalami and superior to the superior colliculi.',
    does: [
      'Synthesizes and secretes the hormone melatonin from serotonin.',
      'Secretes melatonin mainly during darkness; light exposure suppresses its release via a pathway from the retina through the suprachiasmatic nucleus.',
      'Helps entrain the body\'s circadian rhythms, including the sleep-wake cycle.',
    ],
    fact: 'Light, particularly short-wavelength (blue) light detected by melanopsin-containing retinal ganglion cells, suppresses melatonin secretion; evening light exposure, including from screens, can therefore delay sleep onset. In the 17th century, René Descartes proposed the pineal gland as the "principal seat of the soul".',
  },
  hippocampus: {
    aka: 'Hippocampus proper (Ammon\'s horn); Greek for "seahorse"',
    tagline: 'A curved structure of the medial temporal lobe essential for forming new declarative memories and for spatial navigation.',
    where: 'In the medial temporal lobe of each hemisphere, forming the floor of the inferior (temporal) horn of the lateral ventricle, posterior to the amygdala.',
    does: [
      'Consolidation of short-term memories into long-term declarative memory.',
      'Encoding of episodic (events) and semantic (facts) information.',
      'Spatial memory and navigation, supported by "place cells" that fire at specific locations.',
    ],
    fact: 'Patient H.M. (Henry Molaison) underwent bilateral removal of much of the medial temporal lobes, including most of both hippocampi, in 1953 to treat epilepsy. He developed profound anterograde amnesia for new declarative memories, yet could still learn new motor skills, showing that different memory systems are anatomically separable. John O\'Keefe shared the 2014 Nobel Prize in Physiology or Medicine for discovering place cells.',
  },
  amygdala: {
    aka: 'Amygdaloid nuclear complex; Greek for "almond"',
    tagline: 'A group of nuclei in the medial temporal lobe central to processing threat, fear and emotional salience.',
    where: 'An almond-shaped cluster of nuclei in the anteromedial temporal lobe of each hemisphere, anterior to the hippocampus and the tip of the inferior horn of the lateral ventricle.',
    does: [
      'Detection of potential threats and initiation of fear responses via the hypothalamus and brainstem.',
      'Processing of emotions, particularly fear, and of emotional salience more generally.',
      'Enhancement of memory consolidation for emotionally arousing events.',
      'Recognition of emotional facial expressions, especially fear.',
    ],
    fact: 'Research by Joseph LeDoux identified a rapid subcortical pathway from the thalamus to the amygdala that can trigger defensive responses before detailed cortical analysis is complete. Patient S.M., who has bilateral amygdala damage due to Urbach-Wiethe disease, shows a marked absence of fear.',
  },
  basal: {
    aka: 'Basal nuclei (corpus striatum)',
    tagline: 'A group of interconnected subcortical nuclei that regulate the selection and initiation of movement, habit learning and reward-related behavior.',
    where: 'Deep within each cerebral hemisphere, lateral to the thalamus. The principal components are the caudate nucleus (a C-shaped nucleus following the lateral ventricle), the putamen and the globus pallidus.',
    does: [
      'Facilitation of intended movements and suppression of competing, unwanted movements.',
      'Procedural learning and the formation of habits.',
      'Reward processing and motivation (ventral striatum, including the nucleus accumbens).',
      'Operation within cortico-basal ganglia-thalamo-cortical loops, in close connection with the substantia nigra and subthalamic nucleus.',
    ],
    fact: 'The caudate nucleus and putamen together form the striatum ("striped"). Loss of dopaminergic input from the substantia nigra pars compacta to the striatum causes Parkinson\'s disease, whereas degeneration of striatal neurons, particularly in the caudate, characterizes Huntington\'s disease.',
  },
  limbic: {
    aka: 'Limbic lobe and associated structures',
    tagline: 'A functionally defined set of interconnected cortical and subcortical structures involved in emotion, motivation and memory.',
    where: 'A ring of structures on the medial border of each hemisphere surrounding the diencephalon, including the hippocampus, amygdala, cingulate gyrus, fornix, hypothalamus (especially the mammillary bodies) and the anterior nuclei of the thalamus.',
    does: [
      'Generation and regulation of emotional responses.',
      'Memory formation, particularly for emotionally significant events.',
      'Motivation and goal-directed behavior.',
      'Integration of olfactory information with emotion and memory.',
    ],
    fact: 'The name derives from the Latin limbus, "border": in 1878 Paul Broca described the "limbic lobe" as the cortex bordering the corpus callosum and brainstem. The term "limbic system" was popularized by Paul MacLean in 1952; its boundaries are not universally agreed upon, and many neuroscientists regard it as a convenient grouping rather than a single unified system.',
  },
  cingulate: {
    aka: 'Gyrus cinguli; Latin cingulum, "belt" or "girdle"',
    tagline: 'A medial cortical gyrus encircling the corpus callosum, involved in emotion, pain affect, error monitoring and attention.',
    where: 'On the medial surface of each hemisphere, curving around the corpus callosum and separated from it by the callosal sulcus; bounded superiorly by the cingulate sulcus.',
    does: [
      'Processing of emotion and the affective (unpleasant) component of pain, particularly in the anterior cingulate cortex.',
      'Detection of errors and response conflict.',
      'Regulation of attention and motivation.',
    ],
    fact: 'The anterior cingulate cortex is a major generator of the error-related negativity, an EEG signal that appears within about 100 ms of making an error. The cingulate gyrus is part of the Papez circuit and links limbic structures with the prefrontal cortex.',
  },
  fornix: {
    aka: 'Latin for "arch" or "vault"',
    tagline: 'The principal efferent fiber tract of the hippocampus.',
    where: 'An arched bundle of white matter that arises from the hippocampus of each side, ascends beneath the splenium and body of the corpus callosum, and descends anteriorly as the columns of the fornix to the mammillary bodies of the hypothalamus.',
    does: [
      'Carries efferent fibers from the hippocampus to the mammillary bodies, septal nuclei and other targets.',
      'Forms part of the Papez circuit: hippocampus, fornix, mammillary bodies, mammillothalamic tract, anterior thalamic nucleus, cingulate gyrus, and back to the hippocampus via the parahippocampal region.',
    ],
    fact: 'The Papez circuit was proposed by James Papez in 1937. Bilateral damage to the fornix, for example during surgical removal of tumors near the third ventricle, can cause anterograde amnesia.',
  },
  olfactory: {
    aka: 'Bulbi olfactorii',
    tagline: 'Paired forebrain structures that receive input from olfactory receptor neurons and constitute the first relay of the olfactory pathway.',
    where: 'On the inferior surface of the frontal lobes, lying on the cribriform plate of the ethmoid bone, superior to the nasal cavity; each continues posteriorly as the olfactory tract.',
    does: [
      'Receive axons of olfactory receptor neurons, which together form the olfactory nerve (cranial nerve I).',
      'Process odor information in spherical synaptic clusters called glomeruli.',
      'Project via the olfactory tracts to the piriform cortex, amygdala and entorhinal cortex.',
    ],
    fact: 'Olfactory receptor neurons are continuously replaced throughout life from basal stem cells of the olfactory epithelium, an unusual property among neurons. Head trauma can shear the receptor axons where they pass through the cribriform plate, causing anosmia (loss of smell).',
  },

  // -------------------------------------------------------------------------
  // Midbrain zoom
  // -------------------------------------------------------------------------
  tectum: {
    aka: 'Tectum mesencephali; Latin for "roof"',
    tagline: 'The dorsal portion of the midbrain, mediating visual and auditory orienting reflexes.',
    where: 'The dorsal part of the midbrain, posterior to the cerebral aqueduct, consisting of two pairs of rounded elevations, the superior and inferior colliculi.',
    does: [
      'Mediates rapid orienting responses to visual and auditory stimuli.',
      'Contains the superior colliculi (visual) and the inferior colliculi (auditory).',
    ],
    fact: 'The four colliculi together are known as the corpora quadrigemina ("quadruplet bodies"). The tectum is homologous to the optic tectum, which is the principal visual center in fish, amphibians and birds.',
  },
  supcol: {
    aka: 'Colliculi superiores; Latin for "upper little hills"',
    tagline: 'Paired midbrain nuclei that coordinate orienting movements of the eyes and head toward visual and other stimuli.',
    where: 'The rostral pair of elevations on the dorsal surface of the midbrain (tectum), inferior to the pineal gland.',
    does: [
      'Visual orienting reflexes: directing the eyes and head toward sudden movements or flashes.',
      'Generation of rapid eye movements (saccades).',
      'Integration of visual, auditory and somatosensory spatial maps.',
    ],
    fact: 'The superior colliculus receives direct input from the retina via the retinotectal pathway. This pathway, which bypasses the primary visual cortex, is thought to contribute to blindsight, in which patients with V1 damage can respond to visual stimuli they report not seeing.',
  },
  infcol: {
    aka: 'Colliculi inferiores; Latin for "lower little hills"',
    tagline: 'Paired midbrain nuclei that form an obligatory relay of the ascending auditory pathway.',
    where: 'The caudal pair of elevations on the dorsal surface of the midbrain (tectum), immediately inferior to the superior colliculi.',
    does: [
      'Relays nearly all ascending auditory information to the medial geniculate nucleus of the thalamus.',
      'Integrates binaural cues used in sound localization.',
      'Contributes to auditory orienting reflexes, such as turning the head toward a sound.',
    ],
    fact: 'Nearly all ascending auditory fibers synapse in the inferior colliculus, which projects to the medial geniculate nucleus via the brachium of the inferior colliculus. The trochlear nerve (cranial nerve IV), the only cranial nerve to exit the dorsal brainstem, emerges just below it.',
  },
  tegmentum: {
    aka: 'Tegmentum mesencephali; Latin for "covering"',
    tagline: 'The ventral portion of the midbrain, containing numerous nuclei and ascending and descending tracts.',
    where: 'The part of the midbrain anterior (ventral) to the cerebral aqueduct and dorsal to the cerebral crura.',
    does: [
      'Contains the red nucleus, substantia nigra, ventral tegmental area, periaqueductal gray and part of the reticular formation.',
      'Contributes to motor control, arousal and pain modulation.',
      'Contains the oculomotor (III) and trochlear (IV) nuclei controlling most eye movements.',
      'Transmits ascending sensory pathways such as the medial lemniscus and spinothalamic tract.',
    ],
    fact: 'The tegmentum continues caudally as the tegmentum of the pons and medulla, forming the phylogenetically older core of the entire brainstem.',
  },
  peduncles: {
    aka: 'Pedunculi cerebri; Latin for "little feet"',
    tagline: 'Paired bundles on the ventral midbrain that carry descending fibers from the cerebral cortex to the brainstem and spinal cord.',
    where: 'Two large columns on the ventral (anterior) surface of the midbrain, diverging superiorly and separated by the interpeduncular fossa, from which the oculomotor nerves emerge.',
    does: [
      'Carry corticospinal fibers from the motor cortex to the spinal cord, and corticobulbar fibers to cranial nerve nuclei.',
      'Carry corticopontine fibers to the pontine nuclei, which relay to the cerebellum.',
    ],
    fact: 'A lesion of the ventral midbrain affecting one cerebral peduncle and the adjacent oculomotor nerve fibers produces Weber syndrome: ipsilateral oculomotor palsy with contralateral hemiparesis.',
  },
  rednuc: {
    aka: 'Nucleus ruber',
    tagline: 'A paired midbrain nucleus involved in motor control, with extensive connections to the cerebellum.',
    where: 'A pair of ovoid nuclei in the rostral midbrain tegmentum, at the level of the superior colliculi, dorsomedial to the substantia nigra.',
    does: [
      'Receives input from the cerebellum (via the superior cerebellar peduncle) and the motor cortex.',
      'Gives rise to the rubrospinal tract, which influences flexor muscles of the upper limb; this tract is prominent in many mammals but small in humans.',
      'In humans, projects mainly to the inferior olivary nucleus, forming part of a loop with the cerebellum thought to be involved in motor learning.',
    ],
    fact: 'Its pinkish color in fresh tissue is attributed to its high iron content and vascularity. Its exact functional role in humans is less well understood than in other mammals.',
  },
  sn: {
    aka: 'Latin for "black substance"',
    tagline: 'A midbrain nucleus whose dopaminergic neurons modulate the basal ganglia and are lost in Parkinson\'s disease.',
    where: 'A curved band of gray matter in each half of the midbrain, between the tegmentum and the cerebral crus. It comprises a dorsal pars compacta and a ventral pars reticulata.',
    does: [
      'The pars compacta supplies dopamine to the striatum via the nigrostriatal pathway.',
      'The pars reticulata is a major GABAergic output nucleus of the basal ganglia.',
      'Contributes to the initiation and smooth execution of movement, as well as to reward-related learning.',
    ],
    fact: 'Its dark color comes from neuromelanin in dopaminergic neurons of the pars compacta. Degeneration of these neurons causes Parkinson\'s disease, characterized by resting tremor, bradykinesia and rigidity; symptoms typically appear only after a large proportion of these neurons has been lost.',
  },
  pag: {
    aka: 'Periaqueductal gray (PAG); central gray',
    tagline: 'Midbrain gray matter surrounding the cerebral aqueduct that coordinates descending pain modulation and defensive behaviors.',
    where: 'A column of gray matter surrounding the cerebral aqueduct in the midbrain tegmentum (Greek peri, "around").',
    does: [
      'Descending modulation of pain through projections to the rostral ventromedial medulla and from there to the dorsal horn of the spinal cord.',
      'A principal site of action of endogenous opioids and opioid analgesics.',
      'Coordination of defensive behaviors such as freezing, fight or flight, and of associated autonomic changes.',
    ],
    fact: 'In 1969 David Reynolds showed that electrical stimulation of the PAG produces analgesia strong enough to permit surgery in rats. PAG-mediated descending inhibition is thought to contribute to stress-induced analgesia, in which injuries are not immediately felt during intense situations.',
  },
  vta: {
    aka: 'Ventral tegmental area (VTA); area tegmentalis ventralis',
    tagline: 'A group of midbrain neurons that is the principal source of dopamine for the brain\'s reward circuitry.',
    where: 'A region on the floor of the midbrain tegmentum, near the midline, medial to the substantia nigra.',
    does: [
      'Supplies dopamine to the nucleus accumbens and other limbic structures via the mesolimbic pathway.',
      'Supplies dopamine to the prefrontal cortex via the mesocortical pathway.',
      'Signals reward and reward prediction error, supporting motivation and reinforcement learning.',
    ],
    fact: 'Drugs of abuse, despite differing mechanisms, all increase dopamine signaling in the mesolimbic pathway, which is central to the development of addiction. Dysregulation of mesolimbic and mesocortical dopamine is also implicated in schizophrenia.',
  },
  aqueduct: {
    aka: 'Aqueductus mesencephali; aqueduct of Sylvius',
    tagline: 'A narrow channel through the midbrain that conducts cerebrospinal fluid from the third ventricle to the fourth ventricle.',
    where: 'A canal approximately 1.5 cm long running through the midbrain, between the tectum dorsally and the tegmentum ventrally, surrounded by the periaqueductal gray.',
    does: [
      'Conducts cerebrospinal fluid (CSF) from the third ventricle to the fourth ventricle.',
      'Marks the boundary between the tectum (dorsal) and the tegmentum (ventral).',
    ],
    fact: 'As the narrowest part of the ventricular system, it is particularly vulnerable to obstruction. Aqueductal stenosis is a common cause of congenital obstructive (non-communicating) hydrocephalus (Greek for "water head"), in which CSF accumulates and enlarges the lateral and third ventricles.',
  },
  reticular: {
    aka: 'Formatio reticularis; Latin for "little net"',
    tagline: 'A diffuse network of interconnected nuclei in the brainstem core that regulates arousal, autonomic functions and muscle tone.',
    where: 'A net-like column of neurons extending through the central core of the brainstem tegmentum, from the medulla through the pons to the midbrain.',
    does: [
      'Maintains wakefulness and cortical arousal via the ascending reticular activating system (ARAS).',
      'Contributes to sensory gating, the modulation of which stimuli reach awareness.',
      'Regulates sleep-wake transitions and contains centers involved in respiratory and cardiovascular control.',
      'Modulates posture, muscle tone and pain through reticulospinal projections.',
    ],
    fact: 'Giuseppe Moruzzi and Horace Magoun showed in 1949 that stimulation of the brainstem reticular formation produces EEG arousal in sleeping animals. Damage to the ARAS in the upper brainstem can cause coma.',
  },

  // -------------------------------------------------------------------------
  // Hindbrain
  // -------------------------------------------------------------------------
  cerebellum: {
    aka: 'Latin for "little brain"',
    tagline: 'A hindbrain structure that coordinates movement, maintains balance and posture, and supports motor learning.',
    where: 'In the posterior cranial fossa, inferior to the occipital lobes (separated from them by the tentorium cerebelli) and dorsal to the pons and medulla, with the fourth ventricle between them. It connects to the brainstem through three pairs of cerebellar peduncles.',
    does: [
      'Maintenance of balance and posture (vestibulocerebellum).',
      'Coordination of the timing, force and accuracy of movements, comparing intended with actual movement.',
      'Fine motor control of skilled movements such as writing or playing an instrument.',
      'Motor learning and adaptation; it also contributes to some cognitive functions.',
    ],
    fact: 'The cerebellum makes up about 10% of brain volume but contains roughly 80% of the brain\'s neurons, most of them small granule cells. Unlike the cerebrum, each cerebellar hemisphere coordinates the ipsilateral (same) side of the body, so cerebellar lesions cause ataxia on the same side. In sagittal section its white matter forms a branching pattern called the arbor vitae ("tree of life").',
  },
  pons: {
    aka: 'Latin for "bridge"',
    tagline: 'The part of the brainstem between the midbrain and medulla that relays cortical information to the cerebellum and contains centers for respiration, sleep and several cranial nerves.',
    where: 'The prominent ventral bulge of the brainstem, between the midbrain superiorly and the medulla oblongata inferiorly, anterior to the cerebellum and fourth ventricle.',
    does: [
      'Relays information from the cerebral cortex to the contralateral cerebellum via the pontine nuclei and middle cerebellar peduncle.',
      'Modulates respiratory rhythm (pontine respiratory group) in conjunction with medullary centers.',
      'Participates in the generation of REM sleep (pontine tegmentum).',
      'Contains nuclei of cranial nerves V (trigeminal) through VIII, serving facial sensation, mastication, lateral eye movement, facial expression, hearing and balance.',
    ],
    fact: 'A stroke affecting the ventral pons can produce locked-in syndrome: consciousness is preserved, but nearly all voluntary muscles are paralyzed except those controlling vertical eye movements and blinking.',
  },
  medulla: {
    aka: 'Medulla oblongata; Latin for "elongated marrow"',
    tagline: 'The most caudal part of the brainstem, containing vital cardiovascular and respiratory centers.',
    where: 'The lowest segment of the brainstem, extending from the inferior border of the pons to the foramen magnum, where it becomes continuous with the spinal cord.',
    does: [
      'Regulation of heart rate (cardiac centers).',
      'Generation of the respiratory rhythm (dorsal and ventral respiratory groups, including the pre-Bötzinger complex).',
      'Regulation of blood pressure (vasomotor center).',
      'Reflexes including swallowing, coughing, sneezing, gagging and vomiting; contains the nuclei of cranial nerves IX-XII.',
    ],
    fact: 'At the decussation of the pyramids in the caudal medulla, approximately 85-90% of corticospinal fibers cross to the opposite side, which is the principal reason each cerebral hemisphere controls the contralateral side of the body. Damage to the medulla can be rapidly fatal because of its control of breathing and circulation.',
  },
  spinal: {
    aka: 'Medulla spinalis',
    tagline: 'The caudal part of the central nervous system, conducting information between the brain and the body and mediating spinal reflexes.',
    where: 'Continuous with the medulla oblongata at the foramen magnum, it descends within the vertebral canal and ends at approximately the L1-L2 vertebral level as the conus medullaris. It is about 42-45 cm long in adults.',
    does: [
      'Conducts ascending sensory and descending motor signals between the brain and the body.',
      'Mediates reflexes independently of the brain, such as the monosynaptic stretch (knee-jerk) reflex and the polysynaptic withdrawal reflex.',
      'Contains central pattern generators that contribute to rhythmic movements such as walking.',
    ],
    fact: 'Together, the brain and spinal cord form the central nervous system (CNS). Thirty-one pairs of spinal nerves arise from it: 8 cervical, 12 thoracic, 5 lumbar, 5 sacral and 1 coccygeal.',
  },
};
