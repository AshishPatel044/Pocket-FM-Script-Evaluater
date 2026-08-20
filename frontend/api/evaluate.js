import { GoogleGenerativeAI } from '@google/generative-ai'

export const config = { maxDuration: 60 }

// ─── MASTER PROMPT (full, verbatim) ──────────────────────────────────────────
const SYSTEM_PROMPT = `You are a world-class OTT Promo Script Evaluator for PocketFM — India's largest audio storytelling platform.

You have deeply studied 49 high-performing promo scripts across Fantasy, Drama, and Horror genres on PocketFM. You understand exactly what makes a promo script a P0 (top performer), P1 (good), or P2 (weak).

You have observed the following patterns from the top-performing promos (P0 scripts):

═══════════════════════════════════════════════
SECTION A — GENRE PATTERNS YOU HAVE INTERNALIZED
═══════════════════════════════════════════════

FANTASY GENRE (Shows: The Warrior, King of Dragon, Purple Thunder Sovereign, Primordial God, Rudra, Divine Flame Burst, Divine Power, Brahmyodha, Brahmand Ka Rakshak, The Legend Gods):

1. WORLD-BUILDING IN HOOK: The best fantasy hooks immediately establish a supernatural or mythological world. Generic hooks like "yudh shuru hoga" fail. Strong hooks name specific powers, prophecies, or supernatural threats.

2. POWER HIERARCHY IS EVERYTHING: Fantasy promos that perform well always establish clear power hierarchy — who is the strongest, who is being challenged, what is at stake cosmically, not just personally.

3. PROTAGONIST JOURNEY ARC: Best fantasy promos show the protagonist at their lowest point first, then hint at their rise. This creates an irresistible transformation arc.

4. DIVINE/COSMIC STAKES: The conflict must feel larger than personal — it should feel world-ending or civilization-defining. "Ek yoddha ki kahaani" fails. "Sampoorna brahmand ke astitva ka sawaal" works.

5. ACTION LANGUAGE: Fantasy narration uses powerful Sanskrit-influenced vocabulary — words like "aahuti", "shakti", "yudh", "rakshak", "vinaash", "pratishodh". This creates authenticity.

TOP P0 FANTASY PROMOS TO MIRROR:
- TWAR-Akshay-LP1-30 Mins: Hook establishes the warrior's identity through a defiant dialogue, not description. Sequence is JUMBLED.
- TWAR-Hasim-LP1: Opens with the enemy's threat as hook. Creates immediate conflict polarity.
- KODGN-Hasim-LP1: Establishes dragon mythology in first 2 lines of context.
- PTS-Akshay-LP1: Purple Thunder's hook is a power declaration — short, specific, world-defining.
- PG-Hasim-LP1: Primordial God uses cosmic stakes in hook.
- DFB-Hasim-LP1: Divine Flame Burst uses prophecy as hook device.
- BKR-Hasim-LP3: Brahmand Ka Rakshak — hook is a divine warning dialogue.

DRAMA GENRE (Shows: Beggar Husband, Billionaire Hidden Wife, Ek Stranger Se Pyar, Empire of Hidden King, Fated To Be Yours, His Secret Fortune, Malang, My Mysterious Princess, Ruthless):

1. RELATIONSHIP TENSION IS THE HOOK: Drama hooks always stem from the central relationship — betrayal, hidden identity, forbidden love, or power imbalance between two characters.
2. IDENTITY CONCEALMENT PATTERN: The promo hook must tease the SECRET, not the surface story.
3. EMOTIONAL VULNERABILITY + POWER: Characters simultaneously powerful AND emotionally exposed.
4. HINGLISH TONE: Natural Hinglish — predominantly Hindi dialogue with English words woven in naturally.
5. FEMALE LEAD AGENCY: Must show her making a choice or confronting someone.

TOP P0 DRAMA PROMOS TO MIRROR:
- MMP-Shailendra-LP1 & LP2: My Mysterious Princess — hook is her identity revelation moment.
- EHK-Prakash-LP2-Hasim-V3: Empire of Hidden King — hook reveals the king's real power.
- BRHW-Akshay-LP1: Billionaire Hidden Wife — hook is the wife discovering the truth.
- BH-Prakash-LP1: Beggar Husband — hook uses the humiliation moment as entry point.
- HSF-Akshay-LP5: His Secret Fortune — secret-revealed moment as climax setup.

HORROR GENRE (Show: Shiva Ek Pretyodha):
1. DREAD BEFORE REVEAL: Horror hooks must create dread, not just describe horror.
2. SUPERNATURAL IDENTITY HOOK: Tease the supernatural, don't define it.
3. ISOLATION ATMOSPHERE: Horror context lines must establish loneliness, darkness, or helplessness.
4. SLOWER PACING: Build slowly then SPIKE suddenly at the end.

TOP P0 HORROR PROMO: STDL-Hasim-LP2-V1 — hook is a supernatural warning with sensory narration.

═══════════════════════════════════════════════
SECTION B — UNIVERSAL PROMO WRITING RULES
═══════════════════════════════════════════════

RULE 1 — THE HOOK LINE: Character dialogue 95% of time. Max 12-13 words HARD CEILING. Show-specific, scroll-stopping.
RULE 2 — CONTEXT LINES: 2-4 lines only. Answers who/where/what/tension. Creates intrigue, not summary.
RULE 3 — SEQUENCE: ORIGINAL / FLASHBACK (present→past→present) / JUMBLED (shock first→backstory→cliffhanger).
RULE 4 — SCENE DESIGN: Tension before scene → reveal character through internal thought OR dialogue (max 25 words) OR action. Never passive.
RULE 5 — TRANSITIONS: Smooth, linked by EMOTION not plot logic.
RULE 6 — PACING: After midpoint ACCELERATE — shorter lines, sharper dialogue. Audience must feel "Something BIG is about to happen".
RULE 7 — EP1 CALLBACK: Insert Ep1 lines or summary just before ending.
RULE 8 — ENDING: Grand and cinematic, energy peaks, resolves NOTHING.
RULE 9 — CTA: Exactly 3-4 questions. Order: latest cliffhanger → earlier mystery → character/relationship mystery → optional thematic. Max 10 words each.
RULE 10 — RATIO: 70% narration : 30% dialogue NON-NEGOTIABLE. No single dialogue chunk over 25 words.

═══════════════════════════════════════════════
SECTION C — EVALUATION FRAMEWORK
═══════════════════════════════════════════════

PARAMETER 1 — HOOK LINE QUALITY (Weight: 25%)
Score 9-10: Dialogue, under 13 words, show-specific, genuinely scroll-stopping
Score 7-8: Dialogue, under 13 words, but slightly generic
Score 5-6: Not a dialogue, or too long, or could belong to any show
Score 1-4: No clear hook, descriptive opening, or hook reveals too much

PARAMETER 2 — CONTEXT CLARITY (Weight: 10%)
Score 9-10: 2-4 lines, answers who/where/what/tension, creates intrigue not summary
Score 7-8: Slightly too long or answers too many questions
Score 5-6: Vague
Score 1-4: Missing entirely

PARAMETER 3 — SEQUENCE LOGIC (Weight: 15%)
Score 9-10: Right sequence type, every scene earns its place, emotional logic clear
Score 7-8: Right type but 1-2 weak scenes
Score 5-6: Wrong type OR scenes feel random
Score 1-4: No logic — feels like a summary

PARAMETER 4 — SCENE DESIGN (Weight: 15%)
Score 9-10: Every scene has tension setup + character revealed through action/dialogue/thought
Score 7-8: 1-2 passive scenes
Score 5-6: Half the scenes are passive
Score 1-4: All passive plot descriptions

PARAMETER 5 — PACING & TRANSITIONS (Weight: 15%)
Score 9-10: Clear acceleration after midpoint, all transitions smooth
Score 7-8: Good but 1-2 abrupt transitions
Score 5-6: Flat throughout
Score 1-4: No pacing awareness

PARAMETER 6 — ENDING & CTA (Weight: 10%)
Score 9-10: Grand ending + exactly 3-4 specific urgent CTA questions in correct order
Score 7-8: Good but CTA questions slightly generic
Score 5-6: Underwhelming OR only 1-2 CTA questions
Score 1-4: No clear ending OR generic CTA

PARAMETER 7 — NARRATION/DIALOGUE RATIO (Weight: 10%)
Score 9-10: ~70:30, no dialogue exceeds 25 words
Score 7-8: 65:35 or 75:25
Score 5-6: Too much dialogue OR dialogues exceed 25 words
Score 1-4: Ratio is reversed

FINAL = (Hook×0.25)+(Context×0.10)+(Sequence×0.15)+(SceneDesign×0.15)+(Pacing×0.15)+(Ending×0.10)+(Ratio×0.10)
P0=8.5-10 | P1=6.5-8.4 | P2=below 6.5

═══════════════════════════════════════════════
SECTION D — OUTPUT FORMAT
═══════════════════════════════════════════════

Return ONLY valid JSON — no markdown fences, no preamble:
{
  "overallScore": 7.4,
  "tier": "P1",
  "tierLabel": "Good script — needs specific fixes before publishing",
  "parameterScores": {
    "hookLine": { "score": 8, "feedback": "specific feedback quoting actual lines from script" },
    "context": { "score": 7, "feedback": "..." },
    "sequence": { "score": 8, "feedback": "..." },
    "sceneDesign": { "score": 6, "feedback": "..." },
    "pacing": { "score": 7, "feedback": "..." },
    "ending": { "score": 8, "feedback": "..." },
    "ratio": { "score": 9, "feedback": "..." }
  },
  "whatIsWorking": ["point 1 with actual script line reference", "point 2", "point 3"],
  "weakPoints": [{"issue": "...", "whyItFails": "...", "location": "where in script"}],
  "rewriteSuggestions": [{"original": "actual line from script", "rewritten": "improved version", "reason": "why stronger"}],
  "p0Comparison": {"closestP0Script": "ID (Show)", "whatP0DoesDifferently": "...", "keyLessons": ["...", "...", "..."]},
  "genreSpecificFeedback": "genre-specific observations"
}`

const P0_SCRIPTS = {
  fantasy: [
    { id: 'TWAR-Hasim-LP1', show: 'The Warrior', hookPattern: 'Enemy/protagonist defiant dialogue at peak crisis', hookExample: 'आकाश विष मोती तक पहुँचने की कीमत... सिर्फ़ मौत है।', sequenceType: 'JUMBLED', keyStrengths: ['Crisis-first opening', 'Show-specific object in hook', 'Cosmic stakes'] },
    { id: 'KODGN-Hasim-LP1', show: 'King of Dragon', hookPattern: 'Confrontation dialogue — proposal with hidden conflict', hookExample: 'बिना सुहागरात वाली शादी करोगे मुझसे?', sequenceType: 'JUMBLED', keyStrengths: ['Immediate surprise', 'Dragon mythology in first 2 narration lines'] },
    { id: 'BKR-Hasim-LP3-V1', show: 'Brahmand Ka Rakshak', hookPattern: 'Mockery of protagonist — challenge to power', hookExample: 'तुम्हारी तो औकात ही नहीं हैं की तुम किसी भी ड्रैगन को वश में कर सको!', sequenceType: 'JUMBLED', keyStrengths: ['Immediate humiliation hook', 'Power hierarchy established'] },
    { id: 'PTS-Akshay-LP1-V1', show: 'Purple Thunder Sovereign', hookPattern: 'Extreme humiliation challenge', hookExample: 'तुझ जैसा गंदी नाली का कीड़ा अगर योद्धा बनेगा, तो हम लोग क्या चने के खेत में नाचेंगे?', sequenceType: 'ORIGINAL', keyStrengths: ['Specific insult creates show-specific hook', 'Power reversal is the engine'] },
    { id: 'DFB-Hasim-LP1', show: 'Divine Flame Burst', hookPattern: 'Mockery dialogue at public ceremony', hookExample: 'तुम्हारी औकात ही नहीं है… कि तुम कोई चेतना जागृत कर सको!', sequenceType: 'FLASHBACK', keyStrengths: ['Public humiliation hook', 'Shows protagonist at lowest point first'] },
  ],
  drama: [
    { id: 'MMPS-Shailendra-LP1', show: 'My Mysterious Princess', hookPattern: 'Betrayal/threat dialogue — villain reveals plan to protagonist', hookExample: 'अब तेरे मंगेतर से शादी मैं करूँगी... और तू? तू गरीबी में सड़ेगी!', sequenceType: 'ORIGINAL', keyStrengths: ['Hidden identity engine', 'Stakes for female protagonist'] },
    { id: 'EHK-Prakash-LP2-Hasim-V3', show: 'Empire of Hidden King', hookPattern: 'Villain sexual harassment as hook — creates immediate stakes', hookExample: 'हाय जानेमन! एक रात का क्या रेट है तेरा?', sequenceType: 'FLASHBACK', keyStrengths: ['Extreme humiliation hooks empathy', 'Hidden identity reveal is the payoff engine'] },
    { id: 'BH-Prakash-LP1', show: 'Beggar Husband', hookPattern: 'Forced marriage resistance — protagonist refuses', hookExample: 'मैं… मैं इस भिखारी से कभी शादी नहीं करूंगी! छोड़ो मेरा हाथ!', sequenceType: 'ORIGINAL', keyStrengths: ['Immediate conflict established', 'Reversal (beggar = rich) is the core engine'] },
    { id: 'BRHW-Akshay-LP1', show: 'Billionaire Hidden Wife', hookPattern: 'Public humiliation of protagonist by authority figure', hookExample: 'दो कौड़ी की लड़की! सर से जुबान लड़ाती है? पैरों में गिर... और माफी माँग!', sequenceType: 'ORIGINAL', keyStrengths: ['Humiliation creates immediate empathy', 'Hidden billionaire identity is payoff'] },
    { id: 'HSF-Akshay-LP5', show: 'His Secret Fortune', hookPattern: 'Public humiliation — class discrimination as hook', hookExample: 'फ़्री का खाना देखा नहीं कि कुत्तों की तरह मुँह मारने आ जाते हैं, भिखारी कहीं के।', sequenceType: 'JUMBLED', keyStrengths: ['Strongest possible humiliation hook', 'Secret fortune as payoff'] },
  ],
  horror: [
    { id: 'STDL-Hasim-LP2-V1', show: 'Shiva Ek Pretyodha (Saya - The Dark Love)', hookPattern: 'Surprising revelation about protagonist — not horror, but curiosity', hookExample: 'क्या? ये… ये हॉट, बॉडी-बिल्डर टाइप लड़का तांत्रिक है?', sequenceType: 'ORIGINAL', keyStrengths: ['Hook creates curiosity not horror', 'Sensory atmospheric narration', 'Supernatural identity teased never explained'] },
  ]
}

function buildUserPrompt(script, showName, genre, episodeRange) {
  const p0s = (P0_SCRIPTS[(genre || 'fantasy').toLowerCase()] || P0_SCRIPTS.fantasy)
  const p0Summary = p0s.map(s =>
    `- ${s.id} (${s.show}): Hook: "${s.hookExample}" | Type: ${s.sequenceType} | Strengths: ${s.keyStrengths[0]}`
  ).join('\n')

  return `Evaluate this PocketFM promo script for show "${showName}" (${genre} genre, episodes ${episodeRange}).

SUBMITTED PROMO SCRIPT:
---
${script}
---

ACTUAL P0 BENCHMARK SCRIPTS FOR ${genre.toUpperCase()} (study these hook examples carefully):
${p0Summary}

IMPORTANT EVALUATION RULES:
1. Quote ACTUAL lines from the submitted script in all feedback
2. Do NOT give high scores unless genuinely earned — P2 is correct for weak scripts
3. P0 requires ALL 7 parameters to be strong — a single weak parameter should drop the tier
4. Compare the hook DIRECTLY to the P0 hook examples above — is it as specific, confrontational, and concise?
5. Count the ACTUAL number of CTA questions — must be exactly 3-4

Return ONLY valid JSON. No preamble. No markdown.`
}

// ══════════════════════════════════════════════════════════════════════════════
// INTELLIGENT RULE-BASED EVALUATOR
// Built from analysis of 14 actual P0 scripts
// ══════════════════════════════════════════════════════════════════════════════

// Real P0 vocabulary extracted from actual scripts
const GENRE_VOCAB = {
  Fantasy: ['शक्ति', 'स्तर', 'ड्रैगन', 'ब्रह्मांड', 'योद्धा', 'साम्राज्य', 'औकात', 'चेतना', 'बदला', 'तलवार', 'दिव्य', 'शक्तिशाली', 'अकेला', 'कमज़ोर', 'ताकत', 'विद्या', 'रहस्यमयी', 'शून्य', 'मोती', 'देव', 'राक्षस', 'योद्धा', 'dragon', 'warrior', 'power', 'level', 'rank', 'spirit', 'divine', 'realm', 'empire', 'clan', 'soul'],
  Drama: ['शादी', 'भिखारी', 'दौलत', 'राज़', 'प्यार', 'धोखा', 'अमीर', 'गरीब', 'इज्जत', 'बेइज्जती', 'परिवार', 'पत्नी', 'पति', 'माँ', 'बाप', 'मंगेतर', 'सुहागरात', 'रिश्ता', 'मजबूरी', 'अपमान', 'secret', 'marriage', 'rich', 'poor', 'family', 'love', 'betrayal', 'hidden', 'identity'],
  Horror: ['तांत्रिक', 'चुड़ैल', 'भूत', 'श्राप', 'ॐ', 'साया', 'डर', 'रहस्य', 'अंधेरा', 'आत्मा', 'दानव', 'शैतान', 'tantric', 'ghost', 'demon', 'curse', 'dark', 'fear', 'spirit', 'supernatural'],
}

// Real P0 hook patterns from actual scripts
const HOOK_CONFLICT_PATTERNS = [
  // Hindi confrontation/humiliation patterns
  /औकात|नहीं है|कभी नहीं|नामर्द|भिखारी|गंदी|छोड़ो|मत करो|मरोगे|मार डालूँगी/,
  // Direct threats
  /कब्र बनेगी|मौत|जान लेंगे|बर्बाद|तबाह|मिटा देंगे/,
  // Relationship conflict
  /शादी नहीं|रेट है|सुहागरात|माफी माँग|पैरों में गिर/,
  // Challenge/mockery
  /नाचेंगे|हँसाओगे|इतना कमज़ोर|निकम्मे|फटीचर/,
  // English conflict
  /never|won't|can't|stop|kill|die|hate|threat|danger|destroy/i,
]

// Known CTA patterns from actual P0 scripts
const CTA_PATTERNS = {
  hindi: /क्या .{5,80}\?/g,
  pocketfm: /pocket\s*fm|पॉकेट|install|download|डाउनलोड|सुनिए|सुनते रहें/i,
  questionEnd: /[?।]\s*(?:जानने|सुनने|देखने|समझने)/,
}

// ─── UTILITIES ───────────────────────────────────────────────────────────────
function parseLines(text) {
  return text.split(/\n+/).map(l => l.trim()).filter(l => l.length > 2)
}

function isDialogue(line) {
  // Hindi/English quotes or Character: "text" format
  return /[""“”‘’]/.test(line) || /^[A-Za-zऀ-ॿ]+[^:]{0,30}:\s*[""]/.test(line)
}

function isNarrationLine(line) {
  return /^(नरेशन|Narrator|Narration|\[V\/O\]|Voice Over)/i.test(line)
}

function isCTALine(line) {
  return /pocket\s*fm|पॉकेट|install|download|डाउनलोड|सुनिए|बटन पर/i.test(line)
}

function extractDialogueText(line) {
  const m = line.match(/"([^"]{2,})"|"([^"]{2,})"/)
  if (m) return (m[1] || m[2]).trim()
  // No quotes — return the line itself if it looks like dialogue
  return line.replace(/^[^:]+:\s*/, '').trim()
}

function wc(text) {
  return text.split(/\s+/).filter(w => w.length > 0).length
}

function avgWc(lines) {
  if (!lines.length) return 0
  return lines.reduce((s, l) => s + wc(l), 0) / lines.length
}

// ─── 1. HOOK LINE QUALITY (25%) ───────────────────────────────────────────────
function scoreHookLine(lines) {
  // Skip character description lines (>200 chars, no quotes)
  let hookSearchLines = []
  let startIdx = 0
  for (let i = 0; i < Math.min(lines.length, 15); i++) {
    if (lines[i].length < 300) { startIdx = i; break }
  }
  hookSearchLines = lines.slice(startIdx, startIdx + 8)

  const hookIdx = hookSearchLines.findIndex(l => isDialogue(l))
  let score = 2
  const parts = []

  if (hookIdx === -1) {
    parts.push('NO dialogue found in opening — hook MUST be a character\'s spoken line in quotes. Starting with narration is the #1 cause of P2 scripts.')
    return { score: 2, feedback: parts.join(' ') }
  }

  const hookLine = hookSearchLines[hookIdx]
  const dialogueText = extractDialogueText(hookLine)
  const hookWc = wc(dialogueText)

  // Is dialogue — strong positive signal
  score += 3
  parts.push('Hook is character dialogue — correct P0 technique (Rule 1: dialogue 95% of time)')

  // Word count check (P0 hooks average 6-12 Hindi words)
  if (hookWc >= 3 && hookWc <= 13) {
    score += 2
    parts.push(`Hook is ${hookWc} words — within 13-word hard limit`)
  } else if (hookWc > 13 && hookWc <= 18) {
    score += 1
    parts.push(`Hook runs ${hookWc} words — over 13-word limit by ${hookWc - 13}. Trim: "${dialogueText.split(' ').slice(0, 13).join(' ')}..."`)
  } else if (hookWc > 18) {
    parts.push(`Hook is ${hookWc} words — far over 13-word limit. P0 hooks average 6-9 words. Current: "${dialogueText.substring(0, 60)}..."`)
  }

  // Conflict/tension check — drawn from actual P0 script patterns
  const hasConflict = HOOK_CONFLICT_PATTERNS.some(p => p.test(dialogueText)) ||
    /!/.test(dialogueText) ||
    (/\?/.test(dialogueText) && hookWc <= 10)

  if (hasConflict) {
    score += 2
    parts.push('Hook contains immediate conflict/tension — draws listener in (confrontation, challenge, or crisis)')
  } else {
    parts.push('Hook lacks conflict — P0 hooks all contain confrontation, humiliation, challenge, or crisis. Compare: "मैं इस भिखारी से कभी शादी नहीं करूंगी!" (BH) vs "बिना सुहागरात वाली शादी करोगे?" (KODGN)')
  }

  // Is it the very first content line? (P0 scripts open IMMEDIATELY with dialogue)
  if (hookIdx === 0) {
    score += 1
    parts.push('Dialogue is the opening line — correct P0 structure (no narration before hook)')
  } else if (hookIdx <= 1) {
    parts.push(`Hook appears at line ${hookIdx + 1} — ideally should be line 1. Narration before the hook delays impact.`)
  } else {
    parts.push(`Hook appears at line ${hookIdx + 1} — too late. P0 scripts open IMMEDIATELY with the hook dialogue, not with narration.`)
    score -= 1
  }

  score = Math.max(1, Math.min(10, Math.round(score)))
  return { score, feedback: parts.join('. ') }
}

// ─── 2. CONTEXT CLARITY (10%) ─────────────────────────────────────────────────
function scoreContext(lines) {
  const hookIdx = lines.findIndex(l => isDialogue(l))
  if (hookIdx === -1) return { score: 3, feedback: 'Cannot evaluate context — no hook dialogue found' }

  // Context = lines between hook and second dialogue
  const afterHook = lines.slice(hookIdx + 1, hookIdx + 12)
  const ctxLines = []

  for (const line of afterHook) {
    if (isDialogue(line) && ctxLines.length >= 1) break
    if (!isCTALine(line) && line.length > 10) ctxLines.push(line)
    if (ctxLines.length >= 7) break
  }

  const count = ctxLines.length
  const ctxText = ctxLines.join(' ')
  const lower = ctxText.toLowerCase()

  let score = 4
  const parts = []

  if (count >= 2 && count <= 4) {
    score += 3
    parts.push(`Context is ${count} lines — ideal (Rule 2: 2-4 lines that answer who/where/what without summarizing)`)
  } else if (count === 1) {
    score += 1
    parts.push(`Context is only 1 line — add 2-3 more narration lines establishing the character, their world, and what they're stuck in`)
  } else if (count === 5 || count === 6) {
    score += 2
    parts.push(`Context is ${count} lines — slightly long. Trim 1-2 lines. P0 scripts keep context tight at 2-4 lines.`)
  } else if (count > 6) {
    parts.push(`Context is ${count} lines — too much. Cut to max 4 lines. Over-explanation destroys mystery (Rule 2).`)
  }

  // WHO established?
  const hasWho = /वो|वह|उसके|उनका|protagonist|नायक|he |she |his |her /.test(lower) ||
    /[A-Z][a-z]+\s+(was|is|had|stood|sat|ran)/.test(ctxText)

  // WHERE established?
  const hasWhere = /महाद्वीप|साम्राज्य|शहर|मंदिर|पहाड़|palace|kingdom|city|village|world|गाँव|स्थान|जगह/.test(lower)

  // WHAT/SITUATION?
  const hasWhat = /था\.|थी\.|खड़ा था|बैठा था|चला था|था।|तब से|वाला था|होने वाला/.test(ctxText)

  const setupScore = [hasWho, hasWhere, hasWhat].filter(Boolean).length
  if (setupScore >= 2) {
    score += 2
    parts.push('Context establishes who/where/situation effectively — creates world without summarizing')
  } else {
    parts.push('Context missing key setup elements — must answer: WHO is the character? WHERE are they? WHAT are they stuck in? Without telling the full story.')
  }

  score = Math.max(1, Math.min(10, Math.round(score)))
  return { score, feedback: parts.join('. ') }
}

// ─── 3. SEQUENCE LOGIC (15%) ──────────────────────────────────────────────────
function scoreSequence(lines, fullText) {
  const lower = fullText.toLowerCase()
  const firstDiaLine = lines.find(l => isDialogue(l)) || ''
  const firstDiaText = extractDialogueText(firstDiaLine).toLowerCase()

  let score = 4
  const parts = []

  // Crisis-opening check (from actual P0 patterns)
  const crisisOpening = HOOK_CONFLICT_PATTERNS.some(p => p.test(firstDiaText)) ||
    /!/.test(firstDiaLine)

  if (crisisOpening) {
    score += 3
    parts.push('Script opens at peak crisis/conflict — JUMBLED or FLASHBACK sequence technique. P0 promos drop the listener into maximum tension immediately.')
  } else {
    parts.push('Opening dialogue lacks immediate crisis — P0 promos open at the most dramatic moment first. See BH hook ("मैं इस भिखारी से शादी नहीं करूंगी!") or BRHW hook ("पैरों में गिर... माफी माँग!")')
  }

  // Flashback / time-shift detection
  const flashbackWords = ['तीन साल पहले', 'एक महीने पहले', 'साल पहले', 'तब से', 'उस दिन', 'years ago', 'months ago', 'one year', 'इसी के साथ', 'आँखों के सामने', 'यादें', 'flashback', 'तभी उसे याद आया', 'वो पल याद', 'उसी पल']
  const hasFlashback = flashbackWords.some(w => lower.includes(w))

  if (hasFlashback) {
    score += 2
    parts.push('Flashback/time-shift structure detected — effective for showing protagonist\'s origin or reversal arc (used in EHK, DFB, BRHW)')
  } else {
    parts.push('No flashback detected — consider FLASHBACK or JUMBLED sequence to add depth: show crisis first, then reveal why it matters')
  }

  // Scene transitions
  const transitions = ['तभी', 'लेकिन', 'मगर', 'अगले ही पल', 'इसके बाद', 'उसी पल', 'देखते ही', 'par ', 'suddenly', 'then ', 'but ', 'however', 'at that moment']
  const transCount = transitions.filter(w => lower.includes(w)).length

  if (transCount >= 5) {
    score += 2
    parts.push(`${transCount} transition markers — good scene flow with emotional connective narration (Rule 5)`)
  } else if (transCount >= 3) {
    score += 1
    parts.push(`${transCount} transitions — add more emotional bridges between scenes. Rule 5: transitions must link by emotion, not just plot.`)
  } else {
    parts.push('Very few scene transitions — scenes feel disconnected. Add connective narration (तभी, अगले ही पल, लेकिन) between scenes.')
  }

  score = Math.max(1, Math.min(10, Math.round(score)))
  return { score, feedback: parts.join('. ') }
}

// ─── 4. SCENE DESIGN (15%) ────────────────────────────────────────────────────
function scoreSceneDesign(lines, fullText) {
  const lower = fullText.toLowerCase()
  const dialogueLines = lines.filter(l => isDialogue(l) && !isCTALine(l))

  let score = 3
  const parts = []

  // Active character indicators (from actual P0 scripts)
  const activeWords = ['मन में', 'मन ही मन', 'सोचते हुए', 'समझ गया', 'पहचान', 'याद आया', 'अगले ही पल', 'झटके से', 'तुरंत', 'दृढ़', 'संकल्प', 'realized', 'decided', 'grabbed', 'confronted', 'refused', 'recognized', 'understood']
  const activeCount = activeWords.filter(w => lower.includes(w)).length

  // Thought/internal monologue (very common in P0 scripts)
  const thoughtWords = ['मन ही मन', 'मन में', 'सोचा', 'मन में सोचा', 'अंदर से', '(मन में)', 'thought', 'felt', 'knew', 'realized']
  const hasThought = thoughtWords.some(w => lower.includes(w))

  // Tension-before-scene count (narration line immediately before dialogue)
  let tensionBeforeScene = 0
  for (let i = 0; i < lines.length - 1; i++) {
    if (!isDialogue(lines[i]) && !isCTALine(lines[i]) && isDialogue(lines[i + 1])) {
      tensionBeforeScene++
    }
  }

  if (dialogueLines.length >= 6) {
    score += 2
    parts.push(`${dialogueLines.length} dialogue exchanges — characters speak actively in their own voice`)
  } else if (dialogueLines.length >= 4) {
    score += 1
    parts.push(`${dialogueLines.length} dialogue exchanges — good, could add 1-2 more key character moments`)
  } else {
    parts.push(`Only ${dialogueLines.length} dialogue lines — too few. P0 scripts have 6-10+ dialogue exchanges, each revealing character through confrontation or inner life`)
  }

  if (activeCount >= 4) {
    score += 3
    parts.push('Characters act, react, and make decisions — strong active scene design (Rule 4: character revealed through action/thought/dialogue)')
  } else if (activeCount >= 2) {
    score += 2
    parts.push('Some active character moments — add more scenes showing characters decide, confront, or have internal realizations')
  } else {
    parts.push('Most scenes are passive description — Rule 4 requires EVERY scene to show character through action, dialogue, or internal thought. Never just describe them passively.')
  }

  if (hasThought) {
    score += 1
    parts.push('Internal monologue present — effective character revelation technique (used in TWAR: "मन ही मन", "अगर मेरी मौत तय है...")')
  }

  if (tensionBeforeScene >= 3) {
    score += 1
    parts.push(`${tensionBeforeScene} scenes have narration setup before the dialogue — correct tension-before-reveal technique (Rule 4, Step 1)`)
  }

  score = Math.max(1, Math.min(10, Math.round(score)))
  return { score, feedback: parts.join('. ') }
}

// ─── 5. PACING & TRANSITIONS (15%) ───────────────────────────────────────────
function scorePacing(lines, fullText) {
  const contentLines = lines.filter(l => !isCTALine(l))
  if (contentLines.length < 6) return { score: 4, feedback: 'Script too short to evaluate pacing. Needs 200+ words.' }

  let score = 4
  const parts = []

  const mid = Math.floor(contentLines.length / 2)
  const firstAvg = avgWc(contentLines.slice(0, mid))
  const secondAvg = avgWc(contentLines.slice(mid))

  if (secondAvg < firstAvg * 0.82) {
    score += 4
    parts.push(`Strong pacing acceleration — second half averages ${Math.round(secondAvg)} words/line vs ${Math.round(firstAvg)} in first half. Rule 6 followed: audience feels "Something BIG is about to happen"`)
  } else if (secondAvg <= firstAvg * 0.95) {
    score += 2
    parts.push(`Mild acceleration (${Math.round(firstAvg)} → ${Math.round(secondAvg)} words/line) — sharpen the second half: shorter lines, cut any unnecessary narration after midpoint`)
  } else {
    parts.push(`Flat or slower pacing in second half (${Math.round(firstAvg)} → ${Math.round(secondAvg)} words/line) — Rule 6: after midpoint, EVERY line must be shorter and sharper. Skip anything that doesn't raise stakes.`)
  }

  // Urgency in second half
  const secondHalfText = contentLines.slice(mid).join(' ').toLowerCase()
  const urgencyWords = ['आखिरकार', 'अब', 'सिर्फ', 'एकमात्र', 'अंत में', 'finally', 'now ', 'only ', 'last ', 'final ', 'never ', 'आखिर', 'ab ', 'sirf ']
  const urgencyCount = urgencyWords.filter(w => secondHalfText.includes(w)).length

  if (urgencyCount >= 3) {
    score += 1
    parts.push(`${urgencyCount} urgency markers in second half — good momentum build before CTA`)
  }

  const total = wc(fullText)
  if (total >= 200 && total <= 450) {
    score += 1
    parts.push(`Script length ${total} words — within ideal 200-450 word range for promo`)
  } else if (total < 150) {
    score -= 2
    parts.push(`Only ${total} words — too short. A complete promo needs 200-400 words covering hook, context, 3-4 key scenes, and CTA.`)
  } else if (total > 500) {
    score -= 1
    parts.push(`${total} words — slightly long. Trim any scenes that don't raise a question or answer one.`)
  }

  score = Math.max(1, Math.min(10, Math.round(score)))
  return { score, feedback: parts.join('. ') }
}

// ─── 6. ENDING & CTA (10%) ────────────────────────────────────────────────────
function scoreEnding(lines, fullText) {
  const lastLines = lines.slice(-8).join(' ')
  const lower = lastLines.toLowerCase()
  const fullLower = fullText.toLowerCase()

  let score = 3
  const parts = []

  // Count क्या-type questions (the real CTA format from P0 scripts)
  const kyaQuestions = (lastLines.match(/क्या /g) || []).length
  const questionMarks = (lastLines.match(/\?/g) || []).length
  const effectiveQ = Math.max(kyaQuestions, questionMarks)

  if (effectiveQ >= 3 && effectiveQ <= 4) {
    score += 5
    parts.push(`${effectiveQ} CTA questions — exactly right. Rule 9: 3-4 questions in order: latest cliffhanger → earlier mystery → character/relationship question`)
  } else if (effectiveQ === 2) {
    score += 3
    parts.push(`2 CTA questions — good start. Add 1 more. P0 template: क्या [cliffhanger]? क्या [earlier mystery]? क्या [relationship/character]? जानने के लिए Pocket FM डाउनलोड करें।`)
  } else if (effectiveQ >= 5) {
    score += 3
    parts.push(`${effectiveQ} CTA questions — slightly too many. Trim to 3-4. Each question should be progressively more mysterious.`)
  } else if (effectiveQ === 1) {
    score += 1
    parts.push(`Only 1 CTA question — needs 2 more. P0 CTAs: BH has 3 क्या questions, TWAR has 3, HSF has 4. Each question escalates stakes.`)
  } else {
    parts.push('No CTA questions detected — Rule 9: MUST end with exactly 3-4 urgent क्या questions + Pocket FM download mention. This drives listener action.')
  }

  // Pocket FM mention
  const hasPF = CTA_PATTERNS.pocketfm.test(lower) || CTA_PATTERNS.pocketfm.test(fullLower)
  if (hasPF) {
    score += 1
    parts.push('Pocket FM / download / listen CTA present at end ✓')
  } else {
    parts.push('Missing Pocket FM mention — end with "जानने के लिए डाउनलोड करें Pocket FM"')
  }

  // Grand language before CTA
  const preCTA = lines.slice(-12, -4).join(' ').toLowerCase()
  const grandWords = ['सब कुछ', 'duniya', 'आखिरी', 'किस्मत', 'सच', 'everything', 'fate', 'final', 'truth', 'दुनिया', 'हमेशा', 'never again', 'अब कभी नहीं']
  if (grandWords.some(w => preCTA.includes(w))) {
    score += 1
    parts.push('Grand, cinematic language before CTA — Rule 8: energy peaks before the questions')
  }

  score = Math.max(1, Math.min(10, Math.round(score)))
  return { score, feedback: parts.join('. ') }
}

// ─── 7. NARRATION/DIALOGUE RATIO (10%) ───────────────────────────────────────
function scoreRatio(lines, fullText) {
  // Exclude CTA section from ratio calculation
  const ctaIdx = lines.findIndex(l => isCTALine(l))
  const mainLines = ctaIdx > 0 ? lines.slice(0, ctaIdx) : lines

  const diaLines = mainLines.filter(l => isDialogue(l))
  let diaWords = 0
  let longestDia = 0

  for (const line of diaLines) {
    const text = extractDialogueText(line)
    const w = wc(text)
    diaWords += w
    if (w > longestDia) longestDia = w
  }

  const totalWords = mainLines.reduce((s, l) => s + wc(l), 0)
  const ratio = totalWords > 0 ? diaWords / totalWords : 0

  let score = 5
  const parts = []

  if (ratio >= 0.22 && ratio <= 0.38) {
    score += 4
    parts.push(`Ratio is ${Math.round((1 - ratio) * 100)}% narration : ${Math.round(ratio * 100)}% dialogue — matches 70:30 target (Rule 10: non-negotiable)`)
  } else if (ratio > 0.38 && ratio <= 0.50) {
    score += 2
    parts.push(`Dialogue is ${Math.round(ratio * 100)}% — over target. Reduce by removing 1-2 dialogue exchanges, or converting dialogue to narration. Target: 30% dialogue.`)
  } else if (ratio > 0.50) {
    score -= 1
    parts.push(`Dialogue is ${Math.round(ratio * 100)}% — far over target. Rule 10: 70% narration is non-negotiable. Narration carries emotional tone and story structure. Convert dialogue-heavy sections to narration.`)
  } else if (ratio < 0.15 && diaLines.length > 0) {
    score += 1
    parts.push(`Dialogue is only ${Math.round(ratio * 100)}% — slightly low. Add 2-3 key character dialogue moments to bring the story to life.`)
  } else if (diaLines.length === 0) {
    score -= 1
    parts.push('No dialogue detected — add character dialogue. Rule 10: 30% dialogue is required. Every key scene needs a character\'s spoken line.')
  }

  if (longestDia > 25) {
    score -= 2
    parts.push(`Longest dialogue is ${longestDia} words — over 25-word hard limit (Rule 10). Break this exchange into two shorter lines.`)
  } else if (longestDia > 0 && longestDia <= 25) {
    parts.push(`All dialogue chunks within 25-word limit ✓`)
  }

  score = Math.max(1, Math.min(10, Math.round(score)))
  return { score, feedback: parts.join('. ') }
}

// ─── GENRE FEEDBACK ───────────────────────────────────────────────────────────
function buildGenreFeedback(text, genre) {
  const lower = text.toLowerCase()
  const vocab = GENRE_VOCAB[genre] || GENRE_VOCAB.Fantasy
  const vocabMatches = vocab.filter(w => lower.includes(w)).length
  const parts = []

  if (vocabMatches >= 6) parts.push(`${genre} genre vocabulary is strong (${vocabMatches} genre-specific words found in script)`)
  else if (vocabMatches >= 3) parts.push(`${genre} vocabulary is moderate (${vocabMatches} matches) — use more genre-specific language`)
  else parts.push(`${genre} vocabulary is weak (${vocabMatches} matches) — scripts without genre-specific vocabulary feel generic`)

  if (genre === 'Fantasy') {
    const hasCosmic = /ब्रह्मांड|cosmos|universe|साम्राज्य|srishti|सृष्टि|world|duniya/.test(lower)
    const hasPower = /स्तर|level|शक्ति|power|rank|शून्य|zero|दसवें|tenth/.test(lower)
    const hasHumiliation = /औकात|कमज़ोर|फटीचर|निकम्मे|weak|outcast/.test(lower)
    if (hasCosmic) parts.push('Cosmic/world-level stakes present — matches P0 Fantasy pattern')
    else parts.push('Raise stakes to cosmic level — P0 Fantasy promos make conflict feel civilization-defining, not personal (e.g., "ब्रह्मांड का अस्तित्व")')
    if (hasPower) parts.push('Power hierarchy established — correct Fantasy technique')
    else parts.push('Add clear power hierarchy — who is the strongest? Who is challenging them? What cosmic rank is at stake?')
    if (hasHumiliation) parts.push('Protagonist shown at lowest point first — creates powerful transformation arc (P0 Fantasy pattern)')
  } else if (genre === 'Drama') {
    const hasSecret = /राज़|secret|hidden|छुपा|असली|real|disguise|नकली/.test(lower)
    const hasHumiliation = /अपमान|बेइज्जती|humiliation|गिर|insult|भिखारी|निकम्मे|दो कौड़ी/.test(lower)
    const hasReversal = /असल में|actually|दरअसल|खुद को|पहचान|reveal|pata chala/.test(lower)
    if (hasSecret) parts.push('Hidden identity / secret element present — core Drama engine (all P0 Drama scripts use this)')
    else parts.push('Missing hidden identity — EVERY P0 Drama promo revolves around a secret (billionaire pretending to be poor, king hiding empire, etc.)')
    if (hasHumiliation) parts.push('Humiliation/conflict moment present — creates empathy and drives listener curiosity')
    else parts.push('Add a humiliation or conflict moment early — P0 Drama hooks: BRHW, BH, EHK, HSF all open with the protagonist being humiliated')
    if (hasReversal) parts.push('Reversal/reveal element present — the payoff engine is working')
  } else if (genre === 'Horror') {
    const hasSensory = /आवाज़|सांस|ठंड|अंधेरा|साया|sound|breath|cold|dark|shadow|silence/.test(lower)
    const hasDread = /डर|fear|दहशत|terror|आत्मा|ghost|चुड़ैल|demon|evil|supernatural/.test(lower)
    const hasIdentity = /तांत्रिक|tantric|ॐ|birthmark|special|chosen/.test(lower)
    if (hasSensory) parts.push('Sensory atmospheric narration present — P0 Horror technique: STDL builds dread through senses (sounds, cold, darkness)')
    else parts.push('Missing sensory atmosphere — add sounds, cold, shadows, silence to create dread. Horror is felt through senses, not told through description.')
    if (hasDread) parts.push('Supernatural/dread elements present')
    else parts.push('Horror hook must make listener feel something wrong BEFORE revealing the threat (dread before reveal — Rule for Horror)')
    if (hasIdentity) parts.push('Protagonist\'s special identity established — correct Horror technique (STDL: ॐ birthmark reveals Shiva\'s destiny)')
  }

  return parts.join('. ')
}

// ─── FULL EVALUATION ASSEMBLY ─────────────────────────────────────────────────
const PARAM_LABELS = { hookLine: 'Hook Line', context: 'Context Clarity', sequence: 'Sequence Logic', sceneDesign: 'Scene Design', pacing: 'Pacing & Transitions', ending: 'Ending & CTA', ratio: 'Narration/Dialogue Ratio' }
const PARAM_WHY = { hookLine: 'Hook is the first thing heard — weak hook loses listener before story begins', context: 'Vague context leaves the listener confused about who they should care about', sequence: 'Wrong sequence makes the promo feel like a summary, not a story', sceneDesign: 'Passive scenes feel flat — listeners connect to what characters DO', pacing: 'Flat pacing kills momentum; second half must accelerate to drive listener to hit play', ending: 'CTA questions are the last thing heard — weak questions mean no listener action', ratio: 'Wrong ratio breaks the listening experience — 70:30 narration:dialogue is PocketFM\'s proven formula' }

function runIntelligentEvaluation(script, showName, genre) {
  const lines = parseLines(script)

  const parameterScores = {
    hookLine: scoreHookLine(lines),
    context: scoreContext(lines),
    sequence: scoreSequence(lines, script),
    sceneDesign: scoreSceneDesign(lines, script),
    pacing: scorePacing(lines, script),
    ending: scoreEnding(lines, script),
    ratio: scoreRatio(lines, script),
  }

  const overallScore = parseFloat((
    parameterScores.hookLine.score * 0.25 +
    parameterScores.context.score * 0.10 +
    parameterScores.sequence.score * 0.15 +
    parameterScores.sceneDesign.score * 0.15 +
    parameterScores.pacing.score * 0.15 +
    parameterScores.ending.score * 0.10 +
    parameterScores.ratio.score * 0.10
  ).toFixed(1))

  const tier = overallScore >= 8.5 ? 'P0' : overallScore >= 6.5 ? 'P1' : 'P2'
  const tierLabel = tier === 'P0' ? 'Top performer — ready to publish' : tier === 'P1' ? 'Good script — needs specific fixes before publishing' : 'Weak script — major rework required'

  const sorted = Object.entries(parameterScores).sort(([, a], [, b]) => b.score - a.score)
  const weakest = [...sorted].sort(([, a], [, b]) => a.score - b.score)[0]
  const p0s = P0_SCRIPTS[(genre || 'fantasy').toLowerCase()] || P0_SCRIPTS.fantasy

  const p0Comparison = {
    closestP0Script: `${p0s[0].id} (${p0s[0].show})`,
    whatP0DoesDifferently: `${p0s[0].show}'s hook: "${p0s[0].hookExample}" — ${p0s[0].hookPattern}. This hook is show-specific, conflict-based, and under 13 words. The sequence type (${p0s[0].sequenceType}) ensures maximum tension from the opening.`,
    keyLessons: [
      `Hook must be confrontational dialogue, show-specific, under 13 words. P0 example: "${p0s[0].hookExample.substring(0, 50)}"`,
      `CTA needs exactly 3-4 क्या questions + Pocket FM mention. See ${p0s[0].id} for the correct question order and tone.`,
      weakest ? `Biggest opportunity: fix ${PARAM_LABELS[weakest[0]]} (${weakest[1].score}/10) — this single parameter is pulling your overall score down most` : 'Maintain consistency across all 7 parameters to reach P0'
    ]
  }

  return {
    overallScore,
    tier,
    tierLabel,
    parameterScores,
    whatIsWorking: sorted.slice(0, 3).map(([k, v]) => `${PARAM_LABELS[k]} (${v.score}/10): ${v.feedback.split('.')[0]}`),
    weakPoints: sorted.slice(-3).filter(([, v]) => v.score < 8).map(([k, v]) => ({ issue: `${PARAM_LABELS[k]}: ${v.feedback.split('.')[0]}`, whyItFails: PARAM_WHY[k], location: v.feedback.split('.').slice(-1)[0].trim() || `Overall ${PARAM_LABELS[k].toLowerCase()}` })),
    rewriteSuggestions: (() => {
      const s = []
      const firstDia = lines.find(l => isDialogue(l)) || ''
      if (parameterScores.hookLine.score < 7) {
        s.push({ original: firstDia.substring(0, 120) || '[Opening line of your script]', rewritten: `P0 hook pattern for ${genre}: "${p0s[0].hookExample}"\n\nYour hook should be: character name + emotion + dialogue in quotes + under 13 words + immediate conflict`, reason: `Rule 1: Hook must be character dialogue under 13 words with immediate crisis. Current hook misses this. ${p0s[0].id} achieves this with: "${p0s[0].hookPattern}"` })
      }
      if (parameterScores.ending.score < 7) {
        const ctaEx = genre === 'Fantasy' ? 'क्या [protagonist] अपनी खोई शक्ति वापस पा पाएगा?\nक्या [antagonist] का असली रहस्य सामने आएगा?\nक्या [protagonist] ब्रह्मांड को बचाने के लिए काफी शक्तिशाली बन पाएगा?\n\nजानने के लिए डाउनलोड करें Pocket FM और सुनिए "[Show Name]"' : genre === 'Drama' ? 'क्या [protagonist] का राज़ कभी सामने आएगा?\nक्या ये रिश्ता कभी सच्चे प्यार में बदल पाएगा?\nआखिर [hidden identity] की सच्चाई क्या है?\n\nजानने के लिए डाउनलोड करें Pocket FM और सुनिए "[Show Name]"' : 'क्या [protagonist] उस [supernatural threat] का सामना कर पाएगा?\nआखिर वो [mystery element] क्या है?\nक्या [relationship] इस रहस्य को झेल पाएगा?\n\nजानने के लिए डाउनलोड करें Pocket FM और सुनिए "[Show Name]"'
        s.push({ original: 'Current CTA / ending section', rewritten: ctaEx, reason: `Rule 9: Exactly 3-4 क्या questions in order: latest cliffhanger → earlier mystery → character/relationship. Each answerable ONLY by listening. See ${p0s[0].id} CTA pattern.` })
      }
      return s.slice(0, 2)
    })(),
    p0Comparison,
    genreSpecificFeedback: buildGenreFeedback(script, genre),
  }
}

// ─── HANDLER ─────────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' })

  const { script, showName, genre, episodeRange } = req.body || {}

  if (!script || !showName || !genre) {
    return res.status(400).json({ success: false, message: 'Script, show name, and genre are required' })
  }
  if (script.trim().length < 50) {
    return res.status(400).json({ success: false, message: 'Script is too short. Please paste the full promo script.' })
  }

  // Try Gemini AI first (if API key present)
  if (process.env.GEMINI_API_KEY) {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash', systemInstruction: SYSTEM_PROMPT, generationConfig: { maxOutputTokens: 4000, temperature: 0.3 } })
      const result = await model.generateContent(buildUserPrompt(script.trim(), showName, genre, episodeRange || '1-50'))
      let text = result.response.text().trim()
      if (text.startsWith('```')) text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '')
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      const evaluation = JSON.parse(jsonMatch ? jsonMatch[0] : text)
      return res.status(200).json({ success: true, evaluation, source: 'ai' })
    } catch (err) {
      console.error('Gemini error, using intelligent rule-based fallback:', err.message)
    }
  }

  // Intelligent rule-based evaluation (no API key needed)
  try {
    const evaluation = runIntelligentEvaluation(script.trim(), showName, genre)
    return res.status(200).json({ success: true, evaluation, source: 'rules' })
  } catch (error) {
    console.error('Evaluation error:', error)
    return res.status(500).json({ success: false, message: error.message || 'Evaluation failed. Please try again.' })
  }
}
