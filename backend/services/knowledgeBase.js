const P0_SCRIPTS = {
  fantasy: [
    {
      id: "TWAR-Akshay-LP1-30Mins",
      show: "The Warrior",
      hookPattern: "Protagonist defiant dialogue establishing identity under threat — character speaks directly against the enemy",
      sequenceType: "JUMBLED",
      hookExample: "Character makes a declaration of war/identity in 10 words or less",
      ctaPattern: "3 questions: latest battle outcome → who betrayed protagonist → what the prophecy means",
      pacing: "Slow build for 40%, sharp acceleration at 60%, explosive last 20%",
      keyStrengths: [
        "World-building hook — supernatural world established in first line",
        "Power hierarchy established in context — who is strongest, who is challenged",
        "Cosmic stakes in CTA — world-ending consequence teased",
        "Jumbled sequence creates instant curiosity — starts at peak crisis",
        "Sanskrit-influenced vocabulary creates authenticity"
      ],
      hookWords: ["yoddha", "shakti", "yudh", "pratishodh", "aahuti"],
      genreNotes: "Fantasy hooks must name specific powers or prophecies — never generic 'war will begin'"
    },
    {
      id: "TWAR-Hasim-LP1",
      show: "The Warrior",
      hookPattern: "Enemy threat as hook — creates immediate conflict polarity from first line",
      sequenceType: "JUMBLED",
      ctaPattern: "3 questions: battle outcome → enemy's true power → protagonist's destiny",
      pacing: "Opens with enemy threat, builds protagonist arc, accelerates hard after midpoint",
      keyStrengths: [
        "Enemy voice as hook creates instant conflict polarity",
        "Protagonist shown at lowest point first — transformation arc irresistible",
        "Power hierarchy crystal clear in first 3 lines of context",
        "Cosmic stakes — not personal but civilization-level conflict"
      ]
    },
    {
      id: "TWAR-Hasim-LP2",
      show: "The Warrior",
      hookPattern: "Warrior's inner conflict expressed through defiant self-declaration",
      sequenceType: "JUMBLED",
      keyStrengths: [
        "Inner conflict made external through dialogue",
        "Jumbled sequence shows peak moment first, then reveals origin",
        "Prophecy element adds inevitability to the arc"
      ]
    },
    {
      id: "TWAR-Pranjali-LP7",
      show: "The Warrior",
      hookPattern: "Female narrator perspective on warrior's identity — emotional angle into fantasy world",
      sequenceType: "FLASHBACK",
      keyStrengths: [
        "Female voice adds emotional dimension to action-heavy fantasy",
        "Flashback reveals origin story — why warrior fights",
        "Relationship stakes woven into cosmic conflict"
      ]
    },
    {
      id: "TWAR-Pranjali-LP7-Hasim-V1",
      show: "The Warrior",
      hookPattern: "Combined emotional + action hook — dual perspective creates depth",
      sequenceType: "JUMBLED",
      keyStrengths: [
        "Dual narrative voice creates layered emotional engagement",
        "Stakes are both personal (relationship) and cosmic (world)",
        "Jumbled sequence maximizes mystery"
      ]
    },
    {
      id: "TWAR-Pranjali-LP8-Hasim-V1",
      show: "The Warrior",
      hookPattern: "Peak dramatic moment of betrayal used as entry hook",
      sequenceType: "JUMBLED",
      keyStrengths: [
        "Betrayal as hook creates immediate emotional investment",
        "Context builds who betrayed whom before showing consequences",
        "CTA questions focus on relationship fallout + cosmic stakes"
      ]
    },
    {
      id: "TWAR-Hasim-LP2-Akshay-V1",
      show: "The Warrior",
      hookPattern: "Warrior identity challenged — defiance is the hook",
      sequenceType: "JUMBLED",
      keyStrengths: [
        "Challenge to identity creates primal narrative hook",
        "Power vocabulary sets fantasy tone immediately",
        "Escalation from personal to cosmic stakes mid-promo"
      ]
    },
    {
      id: "KODGN-Hasim-LP1",
      show: "King of Dragon",
      hookPattern: "Dragon mythology established through threat or warning dialogue in first 2 lines",
      sequenceType: "JUMBLED",
      ctaPattern: "4 questions: dragon's true power → who controls him → ancient prophecy → world at stake",
      pacing: "Opens with dragon mythology, builds protagonist's connection to dragons, sharp acceleration at midpoint",
      keyStrengths: [
        "Mythology established in first 2 context lines — no wasted space",
        "Hard pacing acceleration at midpoint — audience feels momentum shift",
        "Dragon as symbol for supreme power — not just creature, but cosmic force",
        "Protagonist's lineage revealed gradually — creates mystery and destiny arc",
        "CTA questions escalate from immediate to cosmic"
      ]
    },
    {
      id: "KOD-Hasim-LP4-V2",
      show: "King of Dragon",
      hookPattern: "Dragon power at peak — protagonist claiming ultimate dominion",
      sequenceType: "JUMBLED",
      keyStrengths: [
        "Peak power moment as hook — reverse journey creates intrigue",
        "Dragon bond shown as unique supernatural relationship",
        "Climactic battle teased without revealing outcome"
      ]
    },
    {
      id: "KODGN-Hasim-LP3-V2",
      show: "King of Dragon",
      hookPattern: "Ancient prophecy revealing protagonist as chosen dragon king",
      sequenceType: "FLASHBACK",
      keyStrengths: [
        "Prophecy creates inevitability — destiny arc strongest fantasy hook",
        "Flashback shows humble origins before cosmic rise",
        "Dragon mythology deepened through cultural/divine references"
      ]
    },
    {
      id: "KOD-Shailendra-LP10-Hasim-V1",
      show: "King of Dragon",
      hookPattern: "Dragon betrayal or false king challenged by true heir",
      sequenceType: "JUMBLED",
      keyStrengths: [
        "False vs true power creates moral dimension",
        "Betrayal adds emotional depth to action fantasy",
        "World-building through conflict exposition"
      ]
    },
    {
      id: "PTS-Akshay-LP1",
      show: "Purple Thunder Sovereign",
      hookPattern: "Power declaration — short, specific, world-defining. Not an event, a statement of cosmic identity",
      sequenceType: "ORIGINAL",
      ctaPattern: "3 questions: nature of purple thunder power → who threatens the sovereign → what happens when full power unleashed",
      keyStrengths: [
        "Hook is a power STATEMENT not an event description",
        "Cosmic framing of personal conflict — sovereign's power = world's fate",
        "Thunder/lightning vocabulary creates visceral sensory hook",
        "Original sequence works because natural power progression creates tension",
        "Specific supernatural element (purple thunder) makes show instantly unique"
      ]
    },
    {
      id: "PG-Hasim-LP1",
      show: "Primordial God",
      hookPattern: "Cosmic stakes in hook — 'Srishti ka pahla yoddha' framing establishes ultimate power level",
      sequenceType: "ORIGINAL",
      ctaPattern: "3 questions: primordial origin → who challenges first god → cosmic consequence of defeat",
      keyStrengths: [
        "Primordial/first framing — being the first establishes ultimate stakes",
        "Origin mythology as hook device — precedes all other narratives",
        "Cosmic stakes absolute — defeat = existence itself at risk",
        "Sanskrit divine vocabulary elevates tone to mythological level",
        "Protagonist as the SOURCE of all power — ultimate power fantasy hook"
      ]
    },
    {
      id: "DFB-Hasim-LP1",
      show: "Divine Flame Burst",
      hookPattern: "Prophecy as hook device — divine flame is destiny, not choice",
      sequenceType: "FLASHBACK",
      ctaPattern: "3 questions: what is the divine flame → who seeks to extinguish it → what happens when prophecy fulfills",
      keyStrengths: [
        "Prophecy creates inevitable destiny feeling — audience knows this MUST happen",
        "Flashback shows divine origin clearly — flame existed before protagonist",
        "Fire/flame vocabulary creates sensory visceral hook",
        "Divine vs mortal framing — flame chooses wielder, not reverse",
        "Flashback sequence earns its use — shows why flame is divine"
      ]
    },
    {
      id: "BKR-Hasim-LP3",
      show: "Brahmand Ka Rakshak",
      hookPattern: "Divine warning dialogue — cosmic protector's identity revealed through a challenge",
      sequenceType: "JUMBLED",
      ctaPattern: "3 questions: what threatens the cosmos → who is the true rakshak → can cosmos be saved",
      keyStrengths: [
        "Immediate cosmic stakes — brahmand (cosmos/universe) as the thing at risk",
        "Enemy established as existential threat in context lines",
        "Rakshak (protector) identity creates duty-based narrative hook",
        "Jumbled sequence reveals protector at peak first, then shows origin",
        "Divine vocabulary throughout — Brahma, cosmic forces, universal balance"
      ]
    }
  ],
  drama: [
    {
      id: "MMP-Shailendra-LP1",
      show: "My Mysterious Princess",
      hookPattern: "Female lead identity revelation — her secret IS the hook, not described but implied",
      sequenceType: "ORIGINAL",
      ctaPattern: "3 questions: her true identity → who knows the secret → will the relationship survive",
      keyStrengths: [
        "Female agency shown in hook — she makes a choice or confrontation, never reacts passively",
        "Identity concealment tension sustained throughout — secret teased never revealed in promo",
        "Relationship stakes personal and political — love + power both at risk",
        "Hinglish tone natural — not forced English or formal Hindi",
        "Original sequence works because natural revelation order creates dramatic irony"
      ]
    },
    {
      id: "MMP-Shailendra-LP2",
      show: "My Mysterious Princess",
      hookPattern: "Princess agency moment — she takes control, defies expectation",
      sequenceType: "ORIGINAL",
      keyStrengths: [
        "Princess shown as active agent — makes decisions that drive plot",
        "Mystery sustained through selective revelation — more questions raised than answered",
        "Emotional vulnerability + power contrast creates irresistible character hook"
      ]
    },
    {
      id: "EHK-Prakash-LP2-Hasim-V3",
      show: "Empire of Hidden King",
      hookPattern: "Hidden king's real power revealed through a single defiant line — power speaks itself",
      sequenceType: "FLASHBACK",
      ctaPattern: "3 questions: the king's true empire → who knows his real identity → what happens when secret exposed",
      keyStrengths: [
        "Weakness-to-power arc made visible in flashback sequence",
        "Hidden identity revealed through ACTION not explanation — show don't tell",
        "Empire as metaphor for inner power — not just wealth but authority",
        "Defiant line as hook creates immediate character investment",
        "Flashback earns its place — shows the gap between perceived and real power"
      ]
    },
    {
      id: "BRHW-Akshay-LP1",
      show: "Billionaire Hidden Wife",
      hookPattern: "Wife discovers the truth — shock and betrayal fused in one line",
      sequenceType: "ORIGINAL",
      ctaPattern: "3 questions: the billionaire's secret → why he hid it → what wife chooses now",
      keyStrengths: [
        "Emotional stakes in context lines — relationship investment before the reveal",
        "Relationship tension sustained throughout — love vs betrayal",
        "Discovery moment as hook — the moment of realization creates instant empathy",
        "Billionaire identity concealment pattern executed perfectly",
        "Wife's agency shown — she discovers, she chooses, she acts"
      ]
    },
    {
      id: "BH-Prakash-LP1",
      show: "Beggar Husband",
      hookPattern: "Humiliation moment used as entry point — reversal is the narrative engine",
      sequenceType: "ORIGINAL",
      ctaPattern: "3 questions: husband's real identity → why he pretended to be poor → when truth will emerge",
      keyStrengths: [
        "Irony of rich-man-as-beggar established fast — creates powerful cognitive dissonance",
        "Emotional reversal drives entire promo — audience knows the twist, tension is when/how",
        "Humiliation scenes create visceral empathy before the reveal",
        "Hinglish dialogue feels authentic — not scripted, feels real relationship conflict",
        "CTA questions escalate from personal shame to financial revelation"
      ]
    },
    {
      id: "BH-Prakash-LP1-V1",
      show: "Beggar Husband",
      hookPattern: "Sharpened humiliation hook with tighter word economy",
      sequenceType: "ORIGINAL",
      keyStrengths: [
        "Same reversal engine but hooks refined for maximum word efficiency",
        "Emotional beats tighter — every line earns its place",
        "V1 improvement: stronger CTA questions with more urgency"
      ]
    },
    {
      id: "HSF-Akshay-LP5",
      show: "His Secret Fortune",
      hookPattern: "Secret fortune revelation moment — financial power as emotional surprise",
      sequenceType: "JUMBLED",
      ctaPattern: "3 questions: the fortune's origin → who else knows → relationship consequence",
      keyStrengths: [
        "Secret-reveal positioned as climax setup — builds to maximum impact",
        "CTA questions escalate from personal to financial stakes",
        "Financial power framed emotionally — money is not the real secret, love is",
        "Jumbled sequence creates mystery around why the secret was kept",
        "Male vulnerability + financial power contrast creates character depth"
      ]
    }
  ],
  horror: [
    {
      id: "STDL-Hasim-LP2-V1",
      show: "Shiva Ek Pretyodha",
      hookPattern: "Supernatural warning — dread established BEFORE the reveal, not through the reveal",
      sequenceType: "ORIGINAL",
      ctaPattern: "3 questions: what Shiva really is → who sent the supernatural force → can he survive what's coming",
      pacing: "Slow atmospheric build — 60% slow dread, 30% mounting tension, 10% sudden spike at end",
      keyStrengths: [
        "Sensory atmospheric narration — sounds, darkness, cold establish dread without description",
        "Supernatural identity teased, never explained — mystery sustains throughout",
        "Isolation in context lines — character alone, helpless, trapped",
        "SLOWER pacing than fantasy — horror needs to breathe to create dread",
        "Sudden spike at end — contrast with slow build makes finale hit harder",
        "Shiva as name creates immediate cultural resonance — divine warrior meets supernatural horror"
      ],
      horrorSpecificRules: [
        "Never show the supernatural thing directly in promo — tease through reactions",
        "Darkness and sound are stronger horror tools than visual descriptions",
        "The protagonist must feel trapped — no escape path visible",
        "End on an UNANSWERED question — not a cliffhanger, a mystery"
      ]
    }
  ]
};

function getP0Scripts(genre) {
  const key = (genre || 'fantasy').toLowerCase();
  return P0_SCRIPTS[key] || P0_SCRIPTS.fantasy;
}

function getAllP0Scripts() {
  return P0_SCRIPTS;
}

module.exports = { getP0Scripts, getAllP0Scripts, P0_SCRIPTS };
