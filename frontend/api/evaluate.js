export const config = { maxDuration: 30 }

// ─── GENRE DATA ───────────────────────────────────────────────────────────────
const GENRE_DATA = {
  Fantasy: {
    keywords: ['magic', 'magical', 'kingdom', 'dragon', 'sword', 'quest', 'realm', 'wizard', 'witch', 'prophecy', 'ancient', 'power', 'throne', 'warrior', 'spell', 'enchant', 'legend', 'chosen', 'destiny', 'forbidden', 'divine', 'cosmic', 'shakti', 'yudh', 'rakshak', 'brahmand', 'aahuti', 'vinaash', 'pratishodh', 'dev', 'asur', 'yoddha', 'brahma', 'avatar', 'trishul', 'celestial', 'immortal', 'primordial', 'srishti', 'duniya', 'akash', 'prithvi'],
    p0Scripts: [
      { id: 'TWAR-Hasim-LP1', show: 'The Warrior', hookPattern: 'Enemy threat as hook — immediate conflict polarity' },
      { id: 'KODGN-Hasim-LP1', show: 'King of Dragon', hookPattern: 'Dragon mythology via threat or warning in first 2 lines' },
      { id: 'BKR-Hasim-LP3', show: 'Brahmand Ka Rakshak', hookPattern: 'Divine warning dialogue — cosmic protector under threat' },
      { id: 'PG-Hasim-LP1', show: 'Primordial God', hookPattern: 'Cosmic stakes in hook — Srishti ka pahla yoddha framing' },
    ],
    specificFeedback: [
      { check: ['shakti', 'yoddha', 'brahmand', 'dharma', 'aahuti', 'vinaash', 'dev', 'asur', 'rakshak'], good: 'Sanskrit-influenced vocabulary adds authenticity — matches P0 fantasy pattern', bad: 'Add Sanskrit-influenced words (shakti, yoddha, brahmand) — P0 fantasy promos use this vocabulary for authenticity' },
      { check: ['universe', 'world', 'cosmos', 'brahmand', 'srishti', 'civilization', 'existence', 'astitva', 'duniya'], good: 'Cosmic stakes established — matches P0 pattern of world-ending conflict', bad: 'Raise stakes from personal to cosmic — best fantasy promos feel civilization-threatening, not just personally important' },
    ],
  },
  Drama: {
    keywords: ['love', 'betrayal', 'secret', 'heart', 'promise', 'truth', 'lies', 'marriage', 'sacrifice', 'forgive', 'revenge', 'jealous', 'desire', 'passion', 'grief', 'loss', 'trust', 'deceive', 'identity', 'hidden', 'billionaire', 'princess', 'king', 'reveal', 'affair', 'divorce', 'cheat', 'mohabbat', 'ishq', 'dil', 'raaz', 'jhooth', 'sach', 'rishta', 'dhoka', 'khwaab', 'dard', 'aansoo', 'pyar', 'wafa', 'bewafa'],
    p0Scripts: [
      { id: 'MMP-Shailendra-LP1', show: 'My Mysterious Princess', hookPattern: 'Female lead identity revelation — secret is the hook' },
      { id: 'EHK-Prakash-LP2-Hasim-V3', show: 'Empire of Hidden King', hookPattern: 'Hidden king power revealed through single defiant line' },
      { id: 'BH-Prakash-LP1', show: 'Beggar Husband', hookPattern: 'Humiliation moment as entry — reversal is the engine' },
      { id: 'BRHW-Akshay-LP1', show: 'Billionaire Hidden Wife', hookPattern: 'Wife discovers truth — shock and betrayal fused in one line' },
    ],
    specificFeedback: [
      { check: ['dil', 'mohabbat', 'ishq', 'raaz', 'sach', 'rishta', 'dard', 'pyar'], good: 'Hinglish tone detected — correct emotional register for drama genre', bad: 'Use natural Hinglish — blend Hindi emotional words (dil, mohabbat, raaz) with English for authentic drama tone' },
      { check: ['hidden', 'secret', 'identity', 'disguise', 'real', 'actually', 'truly', 'raaz', 'asli', 'pehchaan'], good: 'Hidden identity / secret element present — core drama engine working', bad: 'Add a hidden identity or concealed secret — P0 drama promos tease the secret without revealing it; this is what hooks the listener' },
    ],
  },
  Horror: {
    keywords: ['dark', 'fear', 'terror', 'haunted', 'demon', 'blood', 'nightmare', 'evil', 'curse', 'shadow', 'ghost', 'monster', 'creature', 'scream', 'death', 'murder', 'escape', 'trapped', 'possessed', 'sinister', 'dread', 'prey', 'lurk', 'darr', 'bhoot', 'shaitan', 'andhere', 'maut', 'atma', 'buri', 'pretyodha', 'supernatural'],
    p0Scripts: [
      { id: 'STDL-Hasim-LP2-V1', show: 'Shiva Ek Pretyodha', hookPattern: 'Supernatural warning — dread before reveal, not through reveal' },
    ],
    specificFeedback: [
      { check: ['sound', 'shadow', 'cold', 'dark', 'silence', 'whisper', 'scream', 'andhere', 'aawaz', 'saans', 'paon'], good: 'Sensory atmospheric narration present — key P0 horror technique', bad: 'Add sensory details (sounds, darkness, cold silence, footsteps) — P0 horror (STDL) builds dread through senses, not description' },
      { check: ['alone', 'lonely', 'isolated', 'trapped', 'helpless', 'akela', 'darr', 'koi nahi', 'chhod'], good: 'Isolation atmosphere established — correct character positioning for horror', bad: 'Establish isolation and helplessness in context lines — character must feel completely alone and trapped' },
    ],
  },
}

// ─── TEXT UTILITIES ───────────────────────────────────────────────────────────
function splitSentences(text) {
  return text.split(/(?<=[.!?।])\s+|(?<=।)\s*/g).map(s => s.trim()).filter(s => s.length > 3)
}

function wordCount(text) {
  return text.split(/\s+/).filter(w => w.length > 0).length
}

function extractDialogues(text) {
  const matches = []
  const patterns = [/"([^"]+)"/g, /“([^”]+)”/g, /‘([^’]+)’/g]
  for (const pattern of patterns) {
    let m
    while ((m = pattern.exec(text)) !== null) matches.push(m[1])
  }
  return matches
}

function countQuestions(text) {
  return (text.match(/\?/g) || []).length
}

function avgWordsPerSentence(sentences) {
  if (!sentences.length) return 0
  return sentences.reduce((s, x) => s + wordCount(x), 0) / sentences.length
}

function includes(lower, words) {
  return words.filter(w => lower.includes(w))
}

// ─── PARAMETER 1: HOOK LINE QUALITY (weight 25%) ──────────────────────────────
function scoreHookLine(sentences, fullText) {
  const first = sentences[0] || ''
  const opening = sentences.slice(0, 2).join(' ')
  const openingLower = opening.toLowerCase()
  const firstWordCount = wordCount(first)
  const dialogs = extractDialogues(opening)

  let score = 3
  const parts = []

  if (dialogs.length > 0) {
    score += 3
    parts.push('Hook uses character dialogue — correct technique (Rule 1: dialogue 95% of the time)')
  } else {
    parts.push('Hook is narration, not dialogue — replace the opening with a character\'s spoken line for maximum impact')
  }

  if (firstWordCount >= 4 && firstWordCount <= 13) {
    score += 2
    parts.push(`Opening line is ${firstWordCount} words — within the 13-word hard limit`)
  } else if (firstWordCount > 13) {
    score -= 1
    parts.push(`Hook runs ${firstWordCount} words — trim to under 13 words (Rule 1: hard ceiling, no exceptions)`)
  } else if (firstWordCount < 4) {
    parts.push('Opening line is too short to establish context')
  }

  if (/\?/.test(first)) {
    score += 1
    parts.push('Opening question creates immediate curiosity — good hook device')
  }

  const conflictWords = ['threat', 'war', 'danger', 'betrayed', 'kill', 'destroy', 'trapped', 'secret', 'truth', 'lies', 'never', 'stop', 'naam', 'marne', 'maar', 'khatam', 'nahi', 'kabhi', 'end', 'final', 'last']
  if (conflictWords.some(w => openingLower.includes(w))) {
    score += 1
    parts.push('Conflict or crisis element in hook — good tension signal')
  }

  if (/!/.test(first)) score += 0.5

  score = Math.max(1, Math.min(10, Math.round(score)))
  if (!parts.length) parts.push('Hook needs stronger dramatic tension — use a character\'s spoken words to open')

  return { score, feedback: parts.join('. ') }
}

// ─── PARAMETER 2: CONTEXT CLARITY (weight 10%) ───────────────────────────────
function scoreContext(sentences) {
  const contextBlock = sentences.slice(1, 7)
  const count = contextBlock.length
  const text = contextBlock.join(' ').toLowerCase()

  let score = 4
  const parts = []

  if (count >= 2 && count <= 4) {
    score += 3
    parts.push(`Context is ${count} lines — ideal range (Rule 2: 2-4 lines only)`)
  } else if (count === 1) {
    score += 1
    parts.push('Context is only 1 line — expand to 2-4 lines to establish who, where, and what stakes exist')
  } else if (count === 5) {
    score += 2
    parts.push('Context is 5 lines — slightly over. Cut 1 line to tighten.')
  } else if (count > 5) {
    parts.push(`Context is ${count} lines — too long. Cut to 2-4 lines. Over-explanation kills mystery.`)
  }

  const hasWho = includes(text, ['he ', 'she ', 'they ', 'his ', 'her ', 'uski', 'unka', 'woh ', 'iska', 'yeh ']).length > 0
  const hasWhere = includes(text, ['palace', 'kingdom', 'city', 'village', 'world', 'realm', 'place', 'duniya', 'mahal', 'sheher', 'forest', 'jungl', 'ghar', 'desh']).length > 0
  const hasWhat = includes(text, ['must', 'will', 'trying', 'fighting', 'hiding', 'running', 'seeking', 'chahta', 'karna', 'karna hai', 'ladna', 'bachna', 'dhundh']).length > 0

  const setupCount = [hasWho, hasWhere, hasWhat].filter(Boolean).length
  if (setupCount >= 2) {
    score += 2
    parts.push('Context establishes who/where/what effectively — creates situation without summarizing plot')
  } else {
    parts.push('Context should establish: who the character is, where they are, and what is at stake — without telling the full story')
  }

  score = Math.max(1, Math.min(10, Math.round(score)))
  return { score, feedback: parts.join('. ') }
}

// ─── PARAMETER 3: SEQUENCE LOGIC (weight 15%) ────────────────────────────────
function scoreSequence(sentences, fullText) {
  const lower = fullText.toLowerCase()
  const first = (sentences[0] || '').toLowerCase()

  let score = 4
  const parts = []

  const flashbackMarkers = ['ek din', 'years ago', 'pehle', 'pahle', 'shuru', 'bachpan', 'us waqt', 'tab se', 'jab se', 'before', 'used to', 'once upon', 'past mein', 'purane']
  const hasFlashback = flashbackMarkers.some(m => lower.includes(m))

  const crisisStart = /^(kill|die|destroy|war|fight|betray|truth|secret|help|stop|save|never|don't|mat|nahi|ruk|bach)/i.test(first)
  const hasDialogueOpen = extractDialogues(sentences.slice(0, 2).join(' ')).length > 0

  const transMarkers = ['but', 'however', 'yet', 'suddenly', 'then', 'now', 'par', 'lekin', 'tab', 'tabhi', 'aur tab', 'magar', 'aakhir', 'phir bhi', 'is liye', 'kyunki', 'meanwhile', 'jab', 'toh', 'phir', 'aur fir']
  const transCount = transMarkers.filter(m => lower.includes(m)).length

  if (crisisStart || hasDialogueOpen) {
    score += 3
    parts.push('Opens at peak crisis or with dialogue — strong JUMBLED/flashback sequence technique (best P0 promos start at the climax)')
  } else {
    parts.push('Consider opening at the most dramatic moment first (JUMBLED sequence) — P0 promos drop the audience into peak crisis immediately')
  }

  if (transCount >= 4) {
    score += 2
    parts.push(`${transCount} scene transitions detected — good narrative flow between scenes`)
  } else if (transCount >= 2) {
    score += 1
    parts.push(`${transCount} transitions — add more connective narration linking scenes by emotion (Rule 5)`)
  } else {
    parts.push('Very few scene transitions — scenes feel disconnected. Add emotional bridges between each scene.')
  }

  if (hasFlashback) {
    score += 1
    parts.push('Flashback structure detected — effective for showing character origin or reversal arc')
  }

  const endText = sentences.slice(-4).join(' ')
  if (countQuestions(endText) >= 2) {
    score += 1
    parts.push('Ending leaves questions open — correct cliffhanger technique (Rule 8: must NOT resolve anything)')
  }

  score = Math.max(1, Math.min(10, Math.round(score)))
  return { score, feedback: parts.join('. ') }
}

// ─── PARAMETER 4: SCENE DESIGN (weight 15%) ──────────────────────────────────
function scoreSceneDesign(sentences, fullText) {
  const lower = fullText.toLowerCase()

  let score = 3
  const parts = []

  const actionWords = ['runs', 'fights', 'decides', 'realizes', 'discovers', 'confronts', 'refuses', 'chooses', 'challenges', 'reveals', 'grabs', 'pulls', 'pushes', 'breaks', 'bhaaga', 'ladha', 'samjha', 'jaana', 'dekha', 'bola', 'kiya', 'liya', 'daudta', 'roka', 'mara']
  const thoughtWords = ['knows', 'feels', 'thinks', 'realizes', 'understands', 'believes', 'fears', 'hopes', 'jaanta', 'samajhta', 'maanta', 'darta', 'chahta', 'sochta', 'mehsoos', 'pata hai', 'jaan gaya']
  const passiveWords = [' is ', ' was ', ' are ', ' were ', ' sits ', ' stands ', ' lives ', ' stays ', ' remains ']

  const actionCount = actionWords.filter(w => lower.includes(w)).length
  const thoughtCount = thoughtWords.filter(w => lower.includes(w)).length
  const dialogues = extractDialogues(fullText)
  const passiveCount = passiveWords.filter(w => lower.includes(w)).length
  const activeTotal = actionCount + thoughtCount + (dialogues.length * 2)

  if (activeTotal >= 8) {
    score += 5
    parts.push('Characters are strongly active — they act, think, and speak in their own voice (Rule 4: character revealed through action/dialogue/thought)')
  } else if (activeTotal >= 4) {
    score += 3
    parts.push('Some active character moments present — add more scenes where characters physically act or voice their internal thoughts')
  } else {
    score += 1
    parts.push('Scenes feel passive — Rule 4 requires every scene to reveal character through action, dialogue, or internal thought (never passive existence)')
  }

  if (dialogues.length >= 2) {
    score += 2
    parts.push(`${dialogues.length} dialogue sections — characters speak in their own voice, which creates emotional connection`)
  } else if (dialogues.length === 1) {
    score += 1
    parts.push('Only 1 dialogue section — add 1-2 more character lines to make them feel alive')
  } else {
    parts.push('No dialogue detected — at least 2-3 character lines are needed for scene design (Rule 10: 30% dialogue target)')
  }

  if (passiveCount > actionCount + 2) {
    score -= 1
    parts.push('Too many passive descriptions ("he was...", "she is...") — convert to active moments')
  }

  score = Math.max(1, Math.min(10, Math.round(score)))
  return { score, feedback: parts.join('. ') }
}

// ─── PARAMETER 5: PACING & TRANSITIONS (weight 15%) ──────────────────────────
function scorePacing(sentences, fullText) {
  if (sentences.length < 4) return { score: 4, feedback: 'Script too short to fully evaluate pacing. A promo needs 150-350 words.' }

  let score = 4
  const parts = []

  const mid = Math.floor(sentences.length / 2)
  const firstHalfAvg = avgWordsPerSentence(sentences.slice(0, mid))
  const secondHalfAvg = avgWordsPerSentence(sentences.slice(mid))

  if (secondHalfAvg < firstHalfAvg * 0.8) {
    score += 4
    parts.push(`Clear acceleration in second half (avg ${Math.round(secondHalfAvg)} words/sentence vs ${Math.round(firstHalfAvg)} in first half) — Rule 6: audience must feel "something BIG is about to happen"`)
  } else if (secondHalfAvg <= firstHalfAvg) {
    score += 2
    parts.push(`Slight pacing variation (${Math.round(firstHalfAvg)} → ${Math.round(secondHalfAvg)} words/sentence) — good direction but sharpen the acceleration after the midpoint`)
  } else {
    parts.push(`Second half (avg ${Math.round(secondHalfAvg)} words/sentence) is slower than first half (${Math.round(firstHalfAvg)}) — Rule 6: after midpoint, use shorter lines, sharper dialogue, faster cuts`)
  }

  const secondHalfLower = sentences.slice(mid).join(' ').toLowerCase()
  const urgency = includes(secondHalfLower, ['now', 'must', 'only', 'last', 'final', 'never', 'always', 'ab', 'sirf', 'akhiri', 'aakhir', 'every', 'everything'])
  if (urgency.length >= 3) {
    score += 1
    parts.push('Strong urgency language in second half — momentum building correctly')
  }

  const total = wordCount(fullText)
  if (total < 100) {
    score -= 2
    parts.push(`Script is only ${total} words — a complete promo needs 150-350 words to hit all required elements`)
  } else if (total >= 150 && total <= 400) {
    parts.push(`Length is good at ${total} words — within ideal promo range`)
  } else if (total > 450) {
    score -= 1
    parts.push(`Script is ${total} words — consider trimming; promos work best under 400 words for audio attention spans`)
  }

  score = Math.max(1, Math.min(10, Math.round(score)))
  return { score, feedback: parts.join('. ') }
}

// ─── PARAMETER 6: ENDING & CTA (weight 10%) ──────────────────────────────────
function scoreEnding(sentences, fullText) {
  const endSentences = sentences.slice(-6)
  const endText = endSentences.join(' ')
  const endLower = endText.toLowerCase()
  const qCount = countQuestions(endText)

  let score = 3
  const parts = []

  if (qCount >= 3 && qCount <= 4) {
    score += 5
    parts.push(`${qCount} CTA questions — exactly right (Rule 9: 3-4 questions required, each answerable only by listening)`)
  } else if (qCount === 2) {
    score += 3
    parts.push('2 CTA questions — add 1 more. Rule 9 requires 3-4 urgent questions at escalating stakes')
  } else if (qCount >= 5) {
    score += 3
    parts.push(`${qCount} CTA questions — slightly too many. Trim to 3-4 for maximum impact`)
  } else if (qCount === 1) {
    score += 1
    parts.push('Only 1 CTA question — Rule 9 requires 3-4. Structure: latest cliffhanger → earlier mystery → character mystery → optional thematic question')
  } else {
    parts.push('No CTA questions — Rule 9 requires exactly 3-4 urgent questions at end. This is what drives listener action.')
  }

  if (includes(endLower, ['pocket fm', 'pocketfm', 'listen', 'tune in', 'episode', 'available', 'sirf', 'exclusively', 'only on']).length > 0) {
    score += 1
    parts.push('Platform CTA or urgency call present — good')
  }

  if (includes(endLower, ['everything', 'world', 'final', 'last', 'sab kuch', 'duniya', 'akhiri', 'destiny', 'fate', 'aakhir', 'truth', 'sach', 'astitva', 'end']).length > 0) {
    score += 1
    parts.push('Grand language at ending — Rule 8: ending must feel cinematic and peak energy')
  } else {
    parts.push('Ending language needs to feel grander — Rule 8: biggest emotional/visual moment of the promo, energy peaks here')
  }

  score = Math.max(1, Math.min(10, Math.round(score)))
  return { score, feedback: parts.join('. ') }
}

// ─── PARAMETER 7: NARRATION/DIALOGUE RATIO (weight 10%) ──────────────────────
function scoreRatio(fullText) {
  const dialogues = extractDialogues(fullText)
  const dialogueWords = dialogues.reduce((s, d) => s + wordCount(d), 0)
  const totalWords = wordCount(fullText)
  const longestDialogue = dialogues.reduce((max, d) => Math.max(max, wordCount(d)), 0)
  const ratio = totalWords > 0 ? dialogueWords / totalWords : 0

  let score = 5
  const parts = []

  if (ratio >= 0.22 && ratio <= 0.38) {
    score += 4
    parts.push(`Narration/dialogue ratio is ${Math.round((1 - ratio) * 100)}:${Math.round(ratio * 100)} — very close to the required 70:30 (Rule 10: non-negotiable)`)
  } else if (ratio > 0.38 && ratio <= 0.50) {
    score += 2
    parts.push(`Dialogue is ${Math.round(ratio * 100)}% of total text — slightly high. Remove 1-2 dialogue sections. Target is 30% dialogue, 70% narration.`)
  } else if (ratio > 0.50) {
    score -= 1
    parts.push(`Dialogue is ${Math.round(ratio * 100)}% of total — far too much. Rule 10: 70% narration, 30% dialogue is non-negotiable. Narration carries structure and transitions.`)
  } else if (ratio < 0.15 && dialogues.length === 0) {
    score -= 1
    parts.push('No dialogue detected — add 2-3 character lines to bring the story to life (Rule 10 target: 30% dialogue)')
  } else if (ratio < 0.15) {
    score += 1
    parts.push(`Dialogue is only ${Math.round(ratio * 100)}% — add 1-2 more character moments to reach the 30% target`)
  }

  if (longestDialogue > 25) {
    score -= 2
    parts.push(`Longest dialogue chunk is ${longestDialogue} words — exceeds the 25-word hard limit (Rule 10). Break it into two shorter exchanges.`)
  } else if (longestDialogue > 0 && longestDialogue <= 25) {
    parts.push(`All dialogue chunks are within the 25-word limit ✓`)
  }

  score = Math.max(1, Math.min(10, Math.round(score)))
  return { score, feedback: parts.join('. ') }
}

// ─── GENRE-SPECIFIC FEEDBACK ──────────────────────────────────────────────────
function buildGenreFeedback(fullText, genre) {
  const lower = fullText.toLowerCase()
  const data = GENRE_DATA[genre] || GENRE_DATA.Fantasy
  const matchCount = data.keywords.filter(k => lower.includes(k)).length
  const strength = matchCount >= 10 ? 'strong' : matchCount >= 5 ? 'moderate' : 'weak'

  const lines = [`${genre} genre alignment is ${strength} (${matchCount} genre-specific vocabulary matches found).`]

  for (const item of data.specificFeedback) {
    const found = item.check.some(w => lower.includes(w))
    lines.push(found ? item.good : item.bad)
  }

  if (genre === 'Fantasy' && matchCount < 5) {
    lines.push('Use more Sanskrit-influenced and cosmic vocabulary — this is what separates PocketFM fantasy from generic storytelling')
  }
  if (genre === 'Horror') {
    const hasSlowBuild = sentences => {
      const s = sentences
      return s.length > 8
    }
    lines.push('Horror promos must build SLOWLY then spike suddenly at the end — unlike Fantasy which accelerates from midpoint (Rule 6 applies differently for Horror)')
  }

  return lines.join('. ')
}

// ─── WHAT IS WORKING / WEAK POINTS ───────────────────────────────────────────
const PARAM_LABELS = {
  hookLine: 'Hook Line',
  context: 'Context Clarity',
  sequence: 'Sequence Logic',
  sceneDesign: 'Scene Design',
  pacing: 'Pacing & Transitions',
  ending: 'Ending & CTA',
  ratio: 'Narration/Dialogue Ratio',
}

const PARAM_WHY = {
  hookLine: 'The hook is the first thing the listener hears — a weak hook loses them immediately, before the story begins',
  context: 'Context lines establish the world and stakes; vague context leaves the audience confused about who they are rooting for',
  sequence: 'Wrong sequence type or poor scene order makes the promo feel like a summary, not a story',
  sceneDesign: 'Passive scenes feel flat — audiences connect to what characters DO and SAY, not what they passively are',
  pacing: 'Flat pacing kills momentum; the second half must accelerate to drive the audience to hit play',
  ending: 'The CTA questions are the last thing heard — weak questions mean no action from the listener',
  ratio: 'Too much dialogue makes a promo feel like a play; too little makes it cold — 70:30 is the proven formula',
}

function generateWhatIsWorking(parameterScores) {
  return Object.entries(parameterScores)
    .sort(([, a], [, b]) => b.score - a.score)
    .slice(0, 3)
    .map(([param, data]) => `${PARAM_LABELS[param]} (${data.score}/10): ${data.feedback.split('.')[0]}`)
}

function generateWeakPoints(parameterScores) {
  return Object.entries(parameterScores)
    .sort(([, a], [, b]) => a.score - b.score)
    .slice(0, 3)
    .filter(([, d]) => d.score < 8)
    .map(([param, data]) => ({
      issue: `${PARAM_LABELS[param]}: ${data.feedback.split('.')[0]}`,
      whyItFails: PARAM_WHY[param],
      location: `Overall ${PARAM_LABELS[param].toLowerCase()} — see Feedback tab for line-level detail`,
    }))
}

// ─── REWRITE SUGGESTIONS ──────────────────────────────────────────────────────
function generateRewriteSuggestions(sentences, parameterScores, genre) {
  const suggestions = []

  if (parameterScores.hookLine.score < 7) {
    const templates = {
      Fantasy: '"Aaj ke baad, is brahmand mein koi bhi surakshit nahi..." — A character\'s defiant warning, under 13 words, drops the audience into peak crisis',
      Drama: '"Main jaanta hoon tu kaun hai... aur teri asli pehchaan kya hai." — A confrontation line that teases hidden identity without revealing it',
      Horror: '"Woh sach jaanta tha... jo koi dekhna nahi chahta." — Atmospheric dread that withholds more than it reveals',
    }
    suggestions.push({
      original: sentences[0] || '[Your current opening line]',
      rewritten: templates[genre] || templates.Drama,
      reason: 'Rule 1: Hook must be a character\'s spoken dialogue under 13 words. It should tease the most dramatic moment — not describe or introduce.',
    })
  }

  if (parameterScores.ending.score < 7) {
    const ctaTemplates = {
      Fantasy: '1. Kya [protagonist] is yudh mein jiit paayega?\n2. Woh rahasya kya hai jo ise rok sakta hai?\n3. Kya [show name] ka ant... duniya ka bhi ant hai?',
      Drama: '1. Kya [character] ka raaz kabhi saamne aayega?\n2. Toh woh sachchi kaun hai — woh jo dikhti hai, ya woh jo hai?\n3. Rishta bachega... ya sab kuch bikhar jaayega?',
      Horror: '1. Woh aawaz kahan se aati hai?\n2. Kya woh insaan hai... ya kuch aur?\n3. Kya woh kabhi andhere se niklega?',
    }
    suggestions.push({
      original: 'Current ending / CTA section',
      rewritten: ctaTemplates[genre] || ctaTemplates.Drama,
      reason: 'Rule 9: Exactly 3-4 CTA questions, escalating from specific cliffhanger → earlier mystery → character mystery. Each must be answerable ONLY by listening.',
    })
  }

  return suggestions.slice(0, 2)
}

// ─── P0 COMPARISON ────────────────────────────────────────────────────────────
function buildP0Comparison(genre, parameterScores) {
  const data = GENRE_DATA[genre] || GENRE_DATA.Fantasy
  const p0 = data.p0Scripts[0]
  const weakest = Object.entries(parameterScores).sort(([, a], [, b]) => a.score - b.score)[0]

  return {
    closestP0Script: `${p0.id} (${p0.show})`,
    whatP0DoesDifferently: `${p0.show}'s P0 promo uses this technique: "${p0.hookPattern}". The key difference is the hook immediately creates a specific, show-exclusive conflict — no general setup, no descriptive intro. It drops you into the story at maximum tension.`,
    keyLessons: [
      `Hook must be a character's own spoken words — never narrator description. P0 scripts open with a line that could ONLY belong to this specific show.`,
      `The highest-performing ${genre} promos establish the core conflict within the first 2 lines — before any context or backstory.`,
      weakest ? `Your lowest-scoring parameter is ${PARAM_LABELS[weakest[0]]} (${weakest[1].score}/10) — fixing this single parameter would have the biggest impact on your overall score.` : 'All parameters need consistent strength to hit P0 tier.',
    ],
  }
}

// ─── MAIN EVALUATOR ───────────────────────────────────────────────────────────
function runEvaluation(script, showName, genre, episodeRange) {
  const sentences = splitSentences(script)

  const parameterScores = {
    hookLine: scoreHookLine(sentences, script),
    context: scoreContext(sentences),
    sequence: scoreSequence(sentences, script),
    sceneDesign: scoreSceneDesign(sentences, script),
    pacing: scorePacing(sentences, script),
    ending: scoreEnding(sentences, script),
    ratio: scoreRatio(script),
  }

  // Final = (Hook×0.25) + (Context×0.10) + (Sequence×0.15) + (SceneDesign×0.15) + (Pacing×0.15) + (Ending×0.10) + (Ratio×0.10)
  const overallScore = parseFloat((
    parameterScores.hookLine.score * 0.25 +
    parameterScores.context.score * 0.10 +
    parameterScores.sequence.score * 0.15 +
    parameterScores.sceneDesign.score * 0.15 +
    parameterScores.pacing.score * 0.15 +
    parameterScores.ending.score * 0.10 +
    parameterScores.ratio.score * 0.10
  ).toFixed(1))

  let tier, tierLabel
  if (overallScore >= 8.5) {
    tier = 'P0'; tierLabel = 'Top performer — ready to publish'
  } else if (overallScore >= 6.5) {
    tier = 'P1'; tierLabel = 'Good script — needs specific fixes before publishing'
  } else {
    tier = 'P2'; tierLabel = 'Weak script — major rework required'
  }

  return {
    overallScore,
    tier,
    tierLabel,
    parameterScores,
    whatIsWorking: generateWhatIsWorking(parameterScores),
    weakPoints: generateWeakPoints(parameterScores),
    rewriteSuggestions: generateRewriteSuggestions(sentences, parameterScores, genre),
    p0Comparison: buildP0Comparison(genre, parameterScores),
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
    return res.status(400).json({ success: false, message: 'Script is too short. Please paste the full promo script (minimum 50 characters).' })
  }

  try {
    const evaluation = runEvaluation(script.trim(), showName, genre, episodeRange || '1-50')
    return res.status(200).json({ success: true, evaluation })
  } catch (error) {
    console.error('Evaluation error:', error)
    return res.status(500).json({ success: false, message: error.message || 'Evaluation failed. Please try again.' })
  }
}
