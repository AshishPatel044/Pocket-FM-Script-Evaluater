import { GoogleGenerativeAI } from '@google/generative-ai'

export const config = { maxDuration: 60 }

// ─── MASTER PROMPT (full, verbatim) ──────────────────────────────────────────
const SYSTEM_PROMPT = `You are a world-class OTT Promo Script Evaluator for PocketFM — India's largest audio storytelling platform.

You have deeply studied all 26 confirmed P0 extraordinary-performing promo scripts AND the full episode content (episodes 1-50) of all 21 shows. You understand the characters, their speaking styles, show-specific vocabulary, and exactly what makes a promo script a P0 (top performer), P1 (good), or P2 (weak).

THE 26 CONFIRMED P0 SCRIPTS:
FANTASY (18): TWAR-Akshay-LP1-30 Mins-V2, TWAR-Hasim-LP1, TWAR-Hasim-LP2, TWAR-Pranjali-LP7, TWAR-Pranjali-LP7-Hasim-V1, TWAR-Pranjali-LP8-Hasim-V1, TWAR-Hasim-LP2-Akshay-V1, TBG-Akshay-LP3, TBG-Shailendra-LP3-Hasim-V1, PTS-Akshay-LP1-V1, PG-Hasim-LP1-V1, DFB-Hasim-LP1, BKR-Hasim-LP3, KOD-Hasim-LP4-V2, KODGN-Hasim-LP1-30 Mins-V1, KODGN-Rituraj-LP1-Hasim-V1, KODGN-Hasim-LP3-V2, KOD-Shailendra-LP10-Hasim-V1
DRAMA (7): MMP-Shailendra-LP1, MMP-Shailendra-LP2, EHK-Prakash-LP2-Hasim-V3, BRHW-Akshay-LP1, HSF-Akshay-LP5, BH-Prakash-LP1, BH-Prakash-LP1-V1
HORROR (1): STDL-Hasim-LP2-V1

SHOW KNOWLEDGE — what you know about each show's characters and world:

THE WARRIOR (TWAR): Atharv Dev (legendary warrior, dies swallowing आकाश विष मोती, reincarnates into Atharv Churu's broken body) + Arya (Frozen Cloud Sect, cold/formal Hindi, cannot love by sect law). Central engine: supreme warrior in zero-power body secretly rebuilding strength. Key vocab: आकाश विष मोती, मिस्टिक वेन्स, फ्रोजन क्लाउड सम्प्रदाय, सात स्वर्गीय खजाने, गहन क्षेत्र. 5 confirmed hook types: wedding humiliation, death-price declaration, blood-drinking mystery girl, one-night-only wife, afterlife disorientation.

KING OF DRAGON (KOD/KODGN): Arjun (6-year coma survivor, Dragon King reincarnation) + Shivanya (CEO heiress, clipped authority register). Central engine: coma survivor discovers Dragon King powers while protecting Shivanya in contract marriage. Key vocab: ड्रैगन किंग, तिलस्मी टुकड़ा, कॉन्ट्रैक्ट मैरिज, स्वर्ण ड्रैगन, दिव्य शक्तियाँ. Best hook: "बिना सुहागरात वाली शादी करोगे मुझसे?" (LP1) and mall insult reversal (LP10).

THE BEAST GURU (TBG): Rudra (protagonist, falsely accused) + Kavya (betrayal) + Samar (mahakaal villain) + Chuza (fire phoenix chick — comic relief). Central engine: false accusation destroys Rudra's reputation; he must clear his name, cure his mother with संजीवनी, defeat Samar. Key vocab: जीवन-बंधन प्राणी, काली भुजा, स्वर्ण गरुड़, स्वर्ग भवन, दस रहस्यमयी अंडे.

PURPLE THUNDER SOVEREIGN (PTS): Aryan (reincarnated modern-world person, awakens E-rank electric power). Rank system: E→D→C→B→A. Key vocab: इंद्रवज्र, तड़ित प्रहार, कच्ची बिजली, असुर सम्राट, अवेकनर. Hook: extreme humiliation ("गंदी नाली का कीड़ा").

PRIMORDIAL GOD (PG): Suryansh (mute/गूंगा, secretly holds Infinite-Grade Spirit Power) + Naira (arrogant, 6th-grade) + Himanshi (kind). Key vocab: स्पिरिट ग्रेड, क्रिस्टल रूलर, राज नगर, डिवाइन वॉइस, संदूक. Hook: forced marriage of mute protagonist ("इस गूंगे से शादी कर लो बेटा!").

DIVINE FLAME BURST (DFB): Aditya (wants to find missing mother, accidentally awakens galaxy-level Sarvoch Pauranik Chetna) + Jeevansh (antagonist). Key vocab: चेतना, पौराणिक चेतना, जीवा परिवार, नौरंगी अंडा, अर्य साम्राज्य. Hook: public mockery at ceremony.

DIVINE POWER (DP): Arya (sweeps academy, Acharya grants immense power that breaks the testing pillar). Key vocab: मंगोला, शक्ति स्तंभ, भविष्यवाणी, आचार्य, रुद्रपुर. Hook: guard's reaction to broken power pillar.

BRAHMYODHA (BHY): Vidhyut (carries a mysterious locket tied to hidden lineage) + Thama (cryptic guide). Key vocab: अग्नि शक्ति ग्रंथ, चक्र जागृत, लॉकेट, इंद्रपुरी, शक्तिगोला. Hook: locket = true identity question.

BRAHMAND KA RAKSHAK (BKR): Kshitij (prince, accidentally bonds with the rarest Som Dragon by bleeding on it). Key vocab: सोम ड्रैगन, अग्नि ड्रैगन, ड्रैगन अकादमी, सपनोल्लास साम्राज्य. Hook: mockery of dragon-taming ability.

RUDRA: RISE OF THE SUPREME YODHA (RRSY): Rudransh (zero-level power, betrayed by 5 companions with 5 knives, discovers divine body in magical ring world). Key vocab: शून्य स्तर, मायावी जंगल, अंगूठी की दुनिया, दिव्य शरीर, जीतू चंद्रा.

THE LEGEND GODS (TLG): Nikhil/Manish (reincarnated warrior emperor, seeks नरक की तलवार). Key vocab: नरक की तलवार, वनांचल, योद्धा सम्राट. Note: TLG-Shailendra-LP3 is P2 (only 2 CTAs).

MY MYSTERIOUS PRINCESS (MMP): Anamika (hidden biological identity, medical genius, fighter, billionaire — triple hidden identity) + Devanshu (love interest) + Natasha (rival sister). Key vocab: बायोलॉजिकल पहचान, ओबरॉय, सिंघानिया, मेडिकल जीनियस.

MALANG (ML): Mritunjay Sarang (CEO, arrogant/commanding) + Mahak (forced substitute bride). Central engine: bride-swap forced marriage → hate to love. Key vocab: सारंग कॉर्पोरेशन, जबरदस्ती की शादी.

HIS SECRET FORTUNE (HSF): Shanaya (forced to marry Vaibhav who hides secret fortune) + Vaibhav (cold/withholding). 4-question CTA = most complete Drama CTA structure. Key vocab: सीक्रेट फॉर्च्यून.

FATED TO BE YOURS (FTBY): Aarohi (jumps off flyover, asks drunk Rudra to marry her on the spot) + Rudransh Rana (SP's son). Accidental marriage → husband denies it. Key vocab: फ्लाईओवर, रुद्रांश राणा, मुझसे शादी कर लीजिए.

EMPIRE OF HIDDEN KING (EHK): Atharv (hides royal identity, minister bows in secret). Forced marriage to love arc. Key vocab: छुपा राजा, मंत्री.

EK STRANGER SE PYAR (ESSP): Suhani (flees tribal village in red lehenga) + Ayan. "नौकरानी पत्नी" dynamic. 3 CTA questions.

BILLIONAIRE HIDDEN WIFE (BHW/BRHW): Kartik (billionaire) + Anika (wife he doesn't recognize). Naqaabposh subplot. 2 confirmed P0 promo versions.

BEGGAR HUSBAND (BH): Shourya Rathore (secretly rich, living as beggar) + Shipra (forced bride). Raijaada family, Mukhtar revenge subplot.

RUTHLESS (RL): Arjun (may be Malini's lost son Samar) + Nayra + "Third Eye" mystery. P1 promos only — hook is narration-heavy, not dialogue-first.

SHIVA EK PRETYODHA (STDL/Horror): Shiva (ghost-fighter/तांत्रिक) + Kavya + Churail. Curiosity hook ("ये हॉट लड़का तांत्रिक है?") not horror hook. Sensory narration. Village setting: मंगलापुर. Key vocab: चुड़ैल, साया, प्रेत्योधा, ॐ birthmark.

You have observed the following patterns from these confirmed P0 scripts:

═══════════════════════════════════════════════
SECTION A — GENRE PATTERNS YOU HAVE INTERNALIZED
═══════════════════════════════════════════════

FANTASY GENRE (Shows: The Warrior, King of Dragon, The Beast Guru, Purple Thunder Sovereign, Primordial God, Divine Flame Burst, Brahmand Ka Rakshak):

1. WORLD-BUILDING IN HOOK: The best fantasy hooks immediately establish a supernatural or mythological world. Generic hooks fail. Strong hooks name specific powers, prophecies, or supernatural threats. TBG-Akshay-LP3 uses mystery: "मेरे हाथ की लकीरों में… ये आँख कहाँ से आ गई?" — 9 words, show-specific supernatural element.

2. POWER HIERARCHY IS EVERYTHING: Fantasy promos establish clear power hierarchy — who is strongest, who is challenged, what is at stake cosmically. TWAR-Hasim-LP1: "आकाश विष मोती तक पहुँचने की कीमत... सिर्फ़ मौत है।" — specific show item + death stakes.

3. PROTAGONIST LOWEST POINT FIRST: Best fantasy promos show protagonist being humiliated/mocked/dismissed, then hint at their rise. PTS: "तुझ जैसा गंदी नाली का कीड़ा अगर योद्धा बनेगा..." — maximum humiliation = maximum reversal payoff.

4. DIVINE/COSMIC STAKES: Conflict must feel world-defining. TBG uses divine eggs containing महादानव. BKR uses ब्रह्मांड-level threats.

5. TWO HOOK TYPES WORK: (a) HUMILIATION CHALLENGE — protagonist mocked/dismissed: BKR, PTS, DFB, KODGN. (b) MYSTERY/SURPRISE — protagonist sees impossible thing: TBG-Akshay, TWAR-Hasim.

TOP P0 FANTASY PROMOS TO MIRROR:
- TWAR-Hasim-LP1: "आकाश विष मोती तक पहुँचने की कीमत... सिर्फ़ मौत है।" — show-specific object in hook.
- TWAR-Akshay-LP1-30 Mins-V2: JUMBLED sequence, wife's confrontation as hook.
- KODGN-Hasim-LP1-30 Mins-V1: "बिना सुहागरात वाली शादी करोगे मुझसे?" — surprise marriage proposal as hook.
- TBG-Akshay-LP3: "मेरे हाथ की लकीरों में… ये आँख कहाँ से आ गई?" — mystery/wonder hook (not anger).
- TBG-Shailendra-LP3-Hasim-V1: "बचाओ! कोई मुझे बचाओ! ये दरिंदा मेरी इज़्ज़त लूट रहा है!" — distress cry hook. 4 CTA questions.
- PTS-Akshay-LP1-V1: "तुझ जैसा गंदी नाली का कीड़ा अगर योद्धा बनेगा..." — most extreme humiliation hook.
- BKR-Hasim-LP3: "तुम्हारी तो औकात ही नहीं हैं की तुम किसी भी ड्रैगन को वश में कर सको!"

DRAMA GENRE (Shows: My Mysterious Princess, Empire of Hidden King, Billionaire Hidden Wife, His Secret Fortune, Beggar Husband):

1. HUMILIATION AS HOOK: ALL 7 P0 Drama scripts open with the female protagonist being humiliated, dismissed, or threatened. No exception.
2. HIDDEN IDENTITY = THE ENGINE: Every P0 Drama has a hidden identity that powers the whole story. The hook teases this without revealing it.
3. FORCED MARRIAGE TRIGGER: 4 of 7 P0 Drama scripts involve forced or surprise marriage as the central trigger.
4. FEMALE LEAD AGENCY: Even when humiliated, the protagonist makes a choice or confronts someone.

TOP P0 DRAMA PROMOS TO MIRROR:
- MMP-Shailendra-LP1: "अब तेरे मंगेतर से शादी मैं करूँगी... और तू? तू गरीबी में सड़ेगी!" — identity theft hook.
- MMP-Shailendra-LP2: "क्या? ये दो कौड़ी की कॉलेज की लड़की... हार्ट सर्जरी करेगी?" — competence mockery.
- EHK-Prakash-LP2-Hasim-V3: "हाय जानेमन! एक रात का क्या रेट है तेरा?" — maximum humiliation hook.
- BH-Prakash-LP1 & V1: "मैं… मैं इस भिखारी से कभी शादी नहीं करूंगी! छोड़ो मेरा हाथ!"
- BRHW-Akshay-LP1: "दो कौड़ी की लड़की! सर से जुबान लड़ाती है? पैरों में गिर... और माफी माँग!"

HORROR GENRE (Show: Shiva Ek Pretyodha — Saya: The Dark Love):
1. CURIOSITY NOT FEAR AS HOOK: STDL-Hasim-LP2-V1 hook is a funny observation: "क्या? ये… ये हॉट, बॉडी-बिल्डर टाइप लड़का तांत्रिक है?" — creates intrigue, not dread.
2. LOVE STORY ANGLE: Horror + romance hybrid — supernatural identity reveal as payoff.
3. SENSORY ATMOSPHERIC NARRATION: Builds dread through sounds, cold, darkness — never just "it was scary."
4. SLOWER PACING THEN SPIKE: Build gradually, spike at the end.

TOP P0 HORROR PROMO: STDL-Hasim-LP2-V1 — hook is curiosity/surprise, not horror. Sensory narration throughout.

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
SECTION B2 — 7-STEP EVALUATION PROCESS (Walk Through In Order)
═══════════════════════════════════════════════

Before scoring any parameter, mentally walk through these 7 steps:

STEP 1 — CHARACTER OBSERVATION
From the script, extract: Who are the characters named? How do they speak (aggressive, soft, formal, street Hindi)? What is happening to them? What is their biggest desire or fear? Which events in the script have the most emotional punch?

STEP 2 — HOOK LINE
• Is the very first content line a character's spoken dialogue? (95% of the time it MUST be)
• Count the words in the dialogue: is it 13 words or fewer? (HARD LIMIT — count every word)
• Is it specific to THIS show's world — or could it belong to any show?
• Does it make someone think "Wait — what? What happened? I need to hear this."
• Test with 3 questions: (a) Does it make someone want to know what happened before/after? (b) Is it specific to THIS show's characters and world? (c) Is it under 13 words?

STEP 3 — CONTEXT LINES
After the hook, are there 2-4 lines that establish: WHO is this character + WHERE are they + WHAT situation are they in + what is the UNRESOLVED TENSION? Do these create intrigue (not a full story summary)?

STEP 4 — SEQUENCE TYPE
First, identify which sequence is used:
• ORIGINAL: Events flow chronologically (start of story → middle → end)
• FLASHBACK: Starts in present crisis → jumps to past origin → returns to present (markers: "साल पहले", "उस दिन", "तभी उसे याद आया", "वो पल जब")
• JUMBLED: Opens with a shocking moment from LATER in the story → provides earlier backstory → builds to cliffhanger (deliberately NOT chronological)
Then check scene design: Does every scene start with tension/narration BEFORE the dialogue reveal? Is every character shown through action, their own dialogue, or internal thought — never passive description?

STEP 5 — PACING
After the midpoint, do lines get noticeably shorter? Does dialogue become sharper and quicker? Are transitions between scenes connected by emotion (not just plot logic)? The audience must feel "Something BIG is about to happen."

STEP 6 — EPISODE 1 CALLBACK (Critical — often missing from weak scripts)
Just BEFORE the final CTA questions, is there an Episode 1 callback?
• OPTION A (preferred): The first 3-4 lines of Episode 1 quoted, then 1-2 lines summarizing how it all began
• OPTION B: 2-3 crisp lines capturing the essence of the story's starting point
• WHY: This creates a full-circle emotional moment — the audience feels the whole journey before the final CTA questions hit
• If absent: explicitly note this in episodeCallback.present = false with feedback on what to add

STEP 7 — ENDING & CTA
Is the ending grand and cinematic with energy peaking? Does it resolve NOTHING (leaves audience desperate for more)?
CTA questions MUST be exactly 3-4, in this specific order:
• Q1 (LATEST): The most recent cliffhanger — what just happened in the latest episode?
• Q2: An earlier mystery or unresolved tension from deeper in the story
• Q3: A character/relationship question left open
• Q4 (optional): A thematic or stakes-based question about the overall conflict
Each question must be answerable ONLY by listening to the show. Max 10 words per question. Escalating urgency. Ends with Pocket FM download mention.

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
  "genreSpecificFeedback": "genre-specific observations",
  "sequenceType": "ORIGINAL or FLASHBACK or JUMBLED — which type is this script using?",
  "episodeCallback": {
    "present": false,
    "feedback": "Is Episode 1 callback present just before the CTA? If not, what exactly should be added and where?"
  }
}`

// All 26 confirmed P0 scripts (extraordinary performers) as of August 2026
const P0_SCRIPTS = {
  fantasy: [
    // ── The Warrior (7 confirmed P0 scripts) ──
    { id: 'TWAR-Akshay-LP1-30 Mins-V2', show: 'The Warrior', hookPattern: 'Wife humiliation dialogue on wedding night — maximum shock', hookExample: 'तुझ जैसे नामर्द के साथ मैंने सुहागरात मनाई तो सब लोग मुझ पर थूकेंगे।', sequenceType: 'ORIGINAL', keyStrengths: ['Wedding-night humiliation = immediate conflict', 'Sets up arranged-marriage-to-love arc', 'Also exists as 30-min extended version'] },
    { id: 'TWAR-Hasim-LP1', show: 'The Warrior', hookPattern: 'Villain declares death price of show-specific relic', hookExample: 'आकाश विष मोती तक पहुँचने की कीमत... सिर्फ़ मौत है।', sequenceType: 'ORIGINAL', keyStrengths: ['Show-specific relic आकाश विष मोती in hook', 'Death stakes in 9 words', 'Reincarnation arc begins in battle scene'] },
    { id: 'TWAR-Hasim-LP2', show: 'The Warrior', hookPattern: 'Mystery girl drinks protagonist blood — immediate shock', hookExample: 'आखिर... तुम मेरा खून क्यों पी रही हो? छोड़ो मुझे!', sequenceType: 'ORIGINAL', keyStrengths: ['Blood-drinking hook = maximum curiosity', 'Mid-story promo targeting episode-range audience', 'Flame Dragon + Heavenly Treasures as CTA'] },
    { id: 'TWAR-Pranjali-LP7-Hasim-V1', show: 'The Warrior', hookPattern: 'Romantic tension — wife declares one-night-only status', hookExample: 'मैं सिर्फ़ आज रात के लिए तुम्हारी पत्नी हूँ अथर्व....', sequenceType: 'ORIGINAL', keyStrengths: ['Emotional restraint hook = romantic tension', 'TWAR LP7 = advanced episode promo', 'Arya character voice: शांत लेकिन कठोर'] },
    { id: 'TWAR-Pranjali-LP7', show: 'The Warrior', hookPattern: 'Same hook as LP7-Hasim-V1 with FLASHBACK structure', hookExample: 'मैं सिर्फ़ आज रात के लिए तुम्हारी पत्नी हूँ अथर्व....', sequenceType: 'FLASHBACK', keyStrengths: ['FLASHBACK confirmed by explicit marker in script', 'Origin of relationship revisited', 'Pranjali original + Hasim polish comparison'] },
    { id: 'TWAR-Pranjali-LP8-Hasim-V1', show: 'The Warrior', hookPattern: 'Afterlife disorientation — existential mystery hook', hookExample: 'ये मौत के बाद की दुनिया है...? या... या कोई सपना...?', sequenceType: 'FLASHBACK', keyStrengths: ['Afterlife/death hook = existential mystery', 'LP8 = deep story, reincarnation revisited', 'FLASHBACK structure confirmed'] },
    { id: 'TWAR-Hasim-LP2-Akshay-V1', show: 'The Warrior', hookPattern: 'Romantic emotional hook — memory of love warning', hookExample: 'याद रखना, आर्या... प्यार की एक चिंगारी भी तुम्हारे दिल की बर्फ पिघला सकती है।', sequenceType: 'FLASHBACK', keyStrengths: ['Romance-appeal hook (different audience targeting)', 'Collaborative Hasim+Akshay polish', 'Frozen Cloud Sect backstory as FLASHBACK'] },
    // ── King of Dragon (5 confirmed P0 scripts) ──
    { id: 'KOD-Hasim-LP4-V2', show: 'King of Dragon', hookPattern: 'Betrayal at wedding — brother stole girlfriend', hookExample: 'तुम मेरे भाई से शादी कैसे कर सकती हो मिषा? तुम तो मुझसे प्यार करती थी।', sequenceType: 'ORIGINAL', keyStrengths: ['Love betrayal hook (bhai ne girlfriend chhaini)', 'Coma backstory revealed after hook', 'Dragon King powers emerge later'] },
    { id: 'KODGN-Hasim-LP1-30 Mins-V1', show: 'King of Dragon', hookPattern: 'Bold contract marriage proposal — no suhagraat clause', hookExample: 'बिना सुहागरात वाली शादी करोगे मुझसे?', sequenceType: 'ORIGINAL', keyStrengths: ['Shivanya\'s bold proposal = immediate shock', '30-min extended version covers full arc', '3 strong CTA questions'] },
    { id: 'KODGN-Hasim-LP3-V2', show: 'King of Dragon', hookPattern: '10,000-year-old betrayal — Dragon King killed by lover', hookExample: 'एक योद्धा को दिल से नहीं, दिमाग से काम लेना चाहिए ड्रैगन किंग! / तुम... तुमने धोखा क्यों दिया...?', sequenceType: 'FLASHBACK', keyStrengths: ['10,000-year ancient betrayal FLASHBACK as cold open', 'Dual timeline (ancient/modern) = maximum intrigue', 'Narrator line: "जीससे करता था वो प्यार, उसी ने सीने में घोंप दी तलवार"'] },
    { id: 'KODGN-Shailendra-LP10-Hasim-V1', show: 'King of Dragon', hookPattern: 'Mall insult + instant reversal — beggar or Dragon King?', hookExample: 'इस भिखारी को अंदर किसने आने दिया?', sequenceType: 'ORIGINAL', keyStrengths: ['Salesgirl insult followed by Shivanya calling him darling = best reversal hook', 'Most polished character arcs', 'Promo named "Fighter Shivanya"'] },
    { id: 'KODGN-Rituraj-LP1-Hasim-V1', show: 'King of Dragon', hookPattern: 'Rituraj original draft polished by Hasim — LP1 variant', hookExample: 'बिना सुहागरात वाली शादी करोगे मुझसे?', sequenceType: 'ORIGINAL', keyStrengths: ['Rituraj + Hasim collaboration', 'LP1 variant targeting same entry point'] },
    // ── The Beast Guru (2 confirmed P0 scripts) ──
    { id: 'TBG-Akshay-LP3', show: 'The Beast Guru', hookPattern: 'Mystery discovery — demonic eye appears in palm (wonder/hairaani)', hookExample: 'मेरे हाथ की लकीरों में… ये आँख कहाँ से आ गई?', sequenceType: 'JUMBLED', keyStrengths: ['Mystery/wonder hook not anger — unique Fantasy type', 'Show-specific supernatural: काली भुजा (demonic arm)', 'JUMBLED: present (red eye) → 3-years-ago betrayal → now', '4 CTA questions including 10 mysterious eggs mystery'] },
    { id: 'TBG-Shailendra-LP3-Hasim-V1', show: 'The Beast Guru', hookPattern: 'False accusation distress scream — Kavya falsely accuses Rudra', hookExample: 'बचाओ! कोई मुझे बचाओ! ये दरिंदा मेरी इज़्ज़त लूट रहा है!', sequenceType: 'ORIGINAL', keyStrengths: ['Most extreme distress hook = maximum empathy', 'False accusation + mahakaal villain + mother\'s cure quest', '6 well-formed CTA questions covering full arc', 'Final CTA ties to show title: "क्या रुद्र ही बीस्ट गुरु बनेगा?"'] },
    // ── Other Fantasy shows ──
    { id: 'PTS-Akshay-LP1-V1', show: 'Purple Thunder Sovereign', hookPattern: 'Extreme humiliation challenge — lowest-of-the-low insult', hookExample: 'तुझ जैसा गंदी नाली का कीड़ा अगर योद्धा बनेगा, तो हम लोग क्या चने के खेत में नाचेंगे?', sequenceType: 'ORIGINAL', keyStrengths: ['Most extreme humiliation hook of all P0s', 'Specific insult tied to protagonist identity', 'Power reversal is the entire engine'] },
    { id: 'PG-Hasim-LP1-V1', show: 'Primordial God', hookPattern: 'Injustice hook — protagonist forced into humiliating situation', hookExample: 'इस गूंगे से शादी कर लो बेटा!', sequenceType: 'ORIGINAL', keyStrengths: ['Simple 6-word hook', 'Injustice creates instant empathy', 'Cosmic god reveals later'] },
    { id: 'DFB-Hasim-LP1', show: 'Divine Flame Burst', hookPattern: 'Public mockery at ceremony — protagonist declared unworthy', hookExample: 'तुम्हारी औकात ही नहीं है… कि तुम कोई चेतना जागृत कर सको!', sequenceType: 'FLASHBACK', keyStrengths: ['Public humiliation hook', 'Lowest point first — sets up reversal', 'Specific ceremony = world-building in hook'] },
    { id: 'BKR-Hasim-LP3', show: 'Brahmand Ka Rakshak', hookPattern: 'Mockery of protagonist\'s dragon-taming ability', hookExample: 'तुम्हारी तो औकात ही नहीं हैं की तुम किसी भी ड्रैगन को वश में कर सको!', sequenceType: 'JUMBLED', keyStrengths: ['Immediate power hierarchy challenge', 'Show-specific ability mocked', 'Sets up cosmic "Rakshak" reveal'] },
  ],
  drama: [
    { id: 'MMP-Shailendra-LP1', show: 'My Mysterious Princess', hookPattern: 'Identity theft — villain steals protagonist\'s engagement and future', hookExample: 'अब तेरे मंगेतर से शादी मैं करूँगी... और तू? तू गरीबी में सड़ेगी!', sequenceType: 'ORIGINAL', keyStrengths: ['Identity theft hook = immediate stakes', 'Anamika: hidden princess + medical genius + fighter (triple identity)', 'Devanshu love arc + Natasha rivalry = double engine'] },
    { id: 'MMP-Shailendra-LP2', show: 'My Mysterious Princess', hookPattern: 'Competence mockery — medical skill doubted publicly', hookExample: 'क्या? ये दो कौड़ी की कॉलेज की लड़की... हार्ट सर्जरी करेगी?', sequenceType: 'ORIGINAL', keyStrengths: ['LP2 = different audience angle on same show', 'Professional humiliation → competence reveal payoff', 'Same show, different entry point for fresh audience'] },
    { id: 'EHK-Prakash-LP2-Hasim-V3', show: 'Empire of Hidden King', hookPattern: 'Villain sexually harasses female lead in minister-bowing scene', hookExample: 'मंत्री (झुककर): "साहब… क्या आदेश है?" [sets up hidden king persona]', sequenceType: 'ORIGINAL', keyStrengths: ['Hidden king identity: minister bows in secret', 'EHK: Atharv hides royal identity', 'Forced marriage to love arc fully developed'] },
    { id: 'BRHW-Akshay-LP1', show: 'Billionaire Hidden Wife', hookPattern: 'Authority figure publicly humiliates protagonist', hookExample: 'दो कौड़ी की लड़की! सर से जुबान लड़ाती है? पैरों में गिर... और माफी माँग!', sequenceType: 'ORIGINAL', keyStrengths: ['Humiliation by power figure = instant empathy', 'Kartik-Anika: husband doesn\'t recognize wife (contract marriage)', 'Naqaabposh subplot adds second mystery layer'] },
    { id: 'HSF-Akshay-LP5', show: 'His Secret Fortune', hookPattern: 'Extreme class discrimination — poor shamed like dogs at food', hookExample: 'फ़्री का खाना देखा नहीं कि कुत्तों की तरह मुँह मारने आ जाते हैं, भिखारी कहीं के।', sequenceType: 'JUMBLED', keyStrengths: ['Most visceral class-discrimination hook', 'Shanaya forced to marry Vaibhav who hides secret fortune', '4-question CTA = most complete Drama CTA structure'] },
    { id: 'BH-Prakash-LP1', show: 'Beggar Husband', hookPattern: 'Forced marriage resistance — bride refuses the beggar groom', hookExample: 'मैं… मैं इस भिखारी से कभी शादी नहीं करूंगी! छोड़ो मेरा हाथ!', sequenceType: 'ORIGINAL', keyStrengths: ['Dramatic irony: beggar = secretly rich Shaurya Rathore', 'Shipra\'s resistance = immediate protagonist agency', 'Raijaada family + Mukhtar revenge subplot'] },
    { id: 'BH-Prakash-LP1-V1', show: 'Beggar Husband', hookPattern: 'V1 variant — same forced-marriage hook with tighter polish', hookExample: 'मैं… मैं इस भिखारी से कभी शादी नहीं करूंगी!', sequenceType: 'ORIGINAL', keyStrengths: ['V1 = 3 lines longer than base (93 vs 90 lines)', 'Same core hook, slightly different scene order', 'Both LP1 and LP1-V1 are confirmed P0'] },
  ],
  horror: [
    { id: 'STDL-Hasim-LP2-V1', show: 'Shiva Ek Pretyodha (Saya - The Dark Love)', hookPattern: 'Appearance-vs-identity surprise — funny observation reveals supernatural truth', hookExample: 'क्या? ये… ये हॉट, बॉडी-बिल्डर टाइप लड़का तांत्रिक है?', sequenceType: 'ORIGINAL', keyStrengths: ['Hook is curiosity not fear — unique Horror technique', 'Sensory atmospheric narration throughout', 'Supernatural identity teased, never explained', 'Love story angle makes horror accessible'] },
  ]
}

// ─── SHOW-SPECIFIC LOOKUP ─────────────────────────────────────────────────────
// Maps show names / abbreviations to their confirmed P0 promos.
// Falls back to full genre list for shows that have no P0 promos yet.
function getShowData(showName) {
  const q = (showName || '').toLowerCase().replace(/['".,!?]/g, '').trim()
  const SHOW_ALIASES = [
    { key: 'the warrior',             aliases: ['twar', 'warrior'],                         genre: 'Fantasy', matchShows: ['The Warrior'] },
    { key: 'king of dragon',          aliases: ['kod', 'kodgn', 'dragon king'],              genre: 'Fantasy', matchShows: ['King of Dragon'] },
    { key: 'the beast guru',          aliases: ['tbg', 'beast guru', 'beast'],              genre: 'Fantasy', matchShows: ['The Beast Guru'] },
    { key: 'purple thunder sovereign',aliases: ['pts', 'purple thunder', 'purple'],          genre: 'Fantasy', matchShows: ['Purple Thunder Sovereign'] },
    { key: 'primordial god',          aliases: ['pg', 'primordial'],                         genre: 'Fantasy', matchShows: ['Primordial God'] },
    { key: 'divine flame burst',      aliases: ['dfb', 'divine flame'],                      genre: 'Fantasy', matchShows: ['Divine Flame Burst'] },
    { key: 'brahmand ka rakshak',     aliases: ['bkr', 'brahmand', 'rakshak'],               genre: 'Fantasy', matchShows: ['Brahmand Ka Rakshak'] },
    { key: 'divine power',            aliases: ['dp'],                                        genre: 'Fantasy', matchShows: [] },
    { key: 'brahmyodha',              aliases: ['bhy'],                                       genre: 'Fantasy', matchShows: [] },
    { key: 'rudra',                   aliases: ['rrsy', 'rudra rise', 'supreme yodha'],       genre: 'Fantasy', matchShows: [] },
    { key: 'the legend gods',         aliases: ['tlg', 'legend gods'],                       genre: 'Fantasy', matchShows: [] },
    { key: 'my mysterious princess',  aliases: ['mmp', 'mysterious princess'],                genre: 'Drama',   matchShows: ['My Mysterious Princess'] },
    { key: 'empire of hidden king',   aliases: ['ehk', 'hidden king'],                        genre: 'Drama',   matchShows: ['Empire of Hidden King'] },
    { key: 'billionaire hidden wife', aliases: ['bhw', 'brhw', 'billionaire hidden', 'hidden wife'], genre: 'Drama', matchShows: ['Billionaire Hidden Wife'] },
    { key: 'his secret fortune',      aliases: ['hsf', 'secret fortune'],                    genre: 'Drama',   matchShows: ['His Secret Fortune'] },
    { key: 'beggar husband',          aliases: ['bh', 'beggar'],                              genre: 'Drama',   matchShows: ['Beggar Husband'] },
    { key: 'malang',                  aliases: ['ml'],                                        genre: 'Drama',   matchShows: [] },
    { key: 'fated to be yours',       aliases: ['ftby', 'fated'],                             genre: 'Drama',   matchShows: [] },
    { key: 'ek stranger se pyar',     aliases: ['essp', 'ek stranger', 'stranger pyar'],      genre: 'Drama',   matchShows: [] },
    { key: 'ruthless',                aliases: ['rl'],                                        genre: 'Drama',   matchShows: [] },
    { key: 'shiva ek pretyodha',      aliases: ['stdl', 'saya', 'dark love', 'shiva pretyodha'], genre: 'Horror', matchShows: ['Shiva Ek Pretyodha (Saya - The Dark Love)'] },
  ]
  const genrePool = { Fantasy: P0_SCRIPTS.fantasy, Drama: P0_SCRIPTS.drama, Horror: P0_SCRIPTS.horror }

  let match = null
  for (const entry of SHOW_ALIASES) {
    const terms = [entry.key, ...entry.aliases]
    if (terms.some(t => q === t || q.includes(t) || t.includes(q))) { match = entry; break }
  }

  const genre = match ? match.genre
    : (q.includes('horror') ? 'Horror' : q.includes('drama') || q.includes('romance') ? 'Drama' : 'Fantasy')
  const pool = genrePool[genre] || P0_SCRIPTS.fantasy

  if (!match || match.matchShows.length === 0) {
    return { genre, p0Promos: pool, hasShowSpecificP0s: false, showKey: match ? match.key : '' }
  }

  const showP0s = pool.filter(s => match.matchShows.includes(s.show))
  if (showP0s.length === 0) {
    return { genre, p0Promos: pool, hasShowSpecificP0s: false, showKey: match.key }
  }
  return { genre, p0Promos: showP0s, hasShowSpecificP0s: true, showKey: match.key }
}

function buildUserPrompt(script, showName, genre, episodeRange) {
  const showData = getShowData(showName)
  const p0s = showData.p0Promos
  const p0Summary = p0s.map(s =>
    `- ${s.id} (${s.show}): Hook: "${s.hookExample}" | Type: ${s.sequenceType} | Strengths: ${s.keyStrengths[0]}`
  ).join('\n')

  const benchmarkLabel = showData.hasShowSpecificP0s
    ? `"${showName}" SHOW-SPECIFIC P0 BENCHMARKS (compare ONLY against these — same show)`
    : `${genre.toUpperCase()} GENRE P0 BENCHMARKS (no confirmed P0s yet for "${showName}" — use genre patterns)`

  return `Evaluate this PocketFM promo script for show "${showName}" (${genre} genre, episodes ${episodeRange}).

SUBMITTED PROMO SCRIPT:
---
${script}
---

ACTUAL P0 BENCHMARK SCRIPTS — ${benchmarkLabel}:
${p0Summary}

EVALUATION INSTRUCTIONS — Follow the 7-Step Process:

STEP 1: Observe characters, their speech style, and the most emotionally punchy events in this script.

STEP 2: Find the first content line. Is it character dialogue? Count the words (HARD LIMIT: 13 words). Is it specific to "${showName}"? Does it stop the scroll? Compare it DIRECTLY to the P0 hook examples above.

STEP 3: Find the 2-4 context lines after the hook. Do they answer WHO/WHERE/WHAT/TENSION without over-explaining?

STEP 4: Identify the SEQUENCE TYPE used (ORIGINAL / FLASHBACK / JUMBLED). Does each scene start with tension before the character reveal? Is every character active (not passive)?

STEP 5: Check pacing — does the second half have shorter, sharper lines? Are transitions smooth and emotional?

STEP 6 (CRITICAL — Episode 1 Callback): Look in the last 25% of the script, just BEFORE the CTA questions. Is there a callback to Episode 1 — either 3-4 lines from the very beginning of the show OR a 2-3 line summary of how the story started? Set episodeCallback.present accordingly.

STEP 7: Check the ending — is it grand and cinematic? Count the CTA questions: must be EXACTLY 3-4 क्या questions in order (latest cliffhanger → earlier mystery → character/relationship → optional thematic). Each must be answerable only by listening to the show.

STRICT SCORING RULES:
• Quote ACTUAL lines from the submitted script in ALL feedback (not generic phrases)
• Do NOT give high scores unless genuinely earned — P2 is correct for weak scripts
• P0 requires ALL 7 parameters to be strong — one weak parameter drops the tier
• Hook must match the directness and specificity of the P0 examples above
• If Episode 1 callback is missing, this MUST appear as a weak point with specific advice on what to add

Return ONLY valid JSON. No preamble. No markdown fences.`
}

// ══════════════════════════════════════════════════════════════════════════════
// INTELLIGENT RULE-BASED EVALUATOR
// Built from deep analysis of all episode content + all promo files:
// Fantasy (11 shows): TWAR, KOD/KODGN, TBG, RRSY, TLG, PTS, PG, DFB, DP, BHY, BKR
// Drama (9 shows): MMP, ML, HSF, FTBY, EHK, ESSP, BHW/BRHW, BH, Ruthless
// Horror (1 show): Shiva Ek Pretyodha (STDL)
// 26 confirmed extraordinary P0 performers analyzed
// ══════════════════════════════════════════════════════════════════════════════

// Metadata header patterns that appear at the TOP of every .docx promo file
// These must be skipped before looking for the actual hook line
const METADATA_LINE_PATTERNS = [
  /^show\s*(name|no|title)/i,
  /^promo\s*(no|name|number|title)/i,
  /^narrator\s*(voice|name|type)?/i,
  /^voice\s*(over|type|o)/i,
  /^character\s*(description|list|name|s)?[:\s-]/i,
  /^genre\s*[:\s-]/i,
  /^writer\s*[:\s-]/i,
  /^v\/o\s*[:\s-]/i,
  /^v\.o\.\s*[:\s-]/i,
  /^(शो|प्रोमो|नरेटर|वॉइस\s*ओवर|चरित्र\s*(परिचय|विवरण))/i,
  // Horizontal rules / separators
  /^[-=_]{3,}$/,
]

// Show-specific vocabulary extracted from actual episode content (all 21 shows)
const GENRE_VOCAB = {
  Fantasy: [
    // Universal Fantasy
    'शक्ति', 'स्तर', 'योद्धा', 'साम्राज्य', 'दिव्य', 'बदला', 'तलवार', 'राक्षस', 'ब्रह्मांड', 'देव',
    // The Warrior (TWAR)
    'आकाश विष मोती', 'मिस्टिक वेन्स', 'गहन क्षेत्र', 'गहन कोर', 'फ्रोजन क्लाउड', 'सम्प्रदाय', 'स्वर्गीय खजाने', 'फ़ीनिक्स',
    // King of Dragon (KOD)
    'ड्रैगन किंग', 'तिलस्मी टुकड़ा', 'कॉन्ट्रैक्ट मैरिज', 'स्वर्ण ड्रैगन', 'दिव्य शक्तियाँ',
    // The Beast Guru (TBG)
    'जीवन-बंधन प्राणी', 'काली भुजा', 'स्वर्ग भवन', 'संजीवनी', 'अग्निगिरि विद्यापीठ', 'स्वर्ण गरुड़', 'चूजा',
    // Purple Thunder Sovereign (PTS)
    'इंद्रवज्र', 'तड़ित प्रहार', 'कच्ची बिजली', 'असुर सम्राट', 'अवेकनर', 'awakener',
    // Primordial God (PG)
    'स्पिरिट शक्ति', 'क्रिस्टल रूलर', 'स्पिरिट ग्रेड', 'राज नगर', 'डिवाइन वॉइस', 'संदूक', 'गूंगा',
    // Divine Flame Burst (DFB)
    'चेतना', 'पौराणिक चेतना', 'जीवा परिवार', 'नौरंगी अंडा', 'अर्य साम्राज्य', 'जीवांश',
    // Divine Power (DP)
    'मंगोला', 'रुद्रपुर', 'शक्ति स्तंभ', 'भविष्यवाणी', 'आचार्य',
    // Brahmyodha (BHY)
    'अग्नि शक्ति ग्रंथ', 'चक्र जागृत', 'रक्षक', 'इंद्रपुरी', 'शक्तिगोला', 'लॉकेट',
    // Brahmand Ka Rakshak (BKR)
    'अग्नि ड्रैगन', 'सोम ड्रैगन', 'ड्रैगन अकादमी', 'साधना', 'सपनोल्लास साम्राज्य',
    // Rudra (RRSY)
    'शून्य स्तर', 'मायावी जंगल', 'अंगूठी की दुनिया', 'छलावा', 'संजीवनी पौधा', 'माथे का निशान', 'दिव्य शरीर',
    // The Legend Gods (TLG)
    'नरक की तलवार', 'वनांचल', 'योद्धा सम्राट', 'दिव्य रक्त',
    // English fantasy terms
    'dragon', 'warrior', 'power', 'level', 'rank', 'spirit', 'divine', 'realm', 'empire', 'clan', 'soul', 'profound', 'cultivation',
  ],
  Drama: [
    // Universal Drama
    'शादी', 'दौलत', 'राज़', 'प्यार', 'धोखा', 'अमीर', 'गरीब', 'इज्जत', 'बेइज्जती', 'मजबूरी', 'अपमान',
    // My Mysterious Princess (MMP)
    'अनामिका', 'देवांश', 'नताशा', 'जीविका', 'बायोलॉजिकल', 'असली पहचान', 'ओबरॉय', 'सिंघानिया', 'मेडिकल जीनियस',
    // Malang (ML)
    'मृत्युंजय', 'सारंग', 'महक', 'मीरा', 'सारंग कॉर्पोरेशन', 'CEO', 'जबरदस्ती',
    // His Secret Fortune (HSF)
    'शनाया', 'वैभव', 'दादी', 'सीक्रेट फॉर्च्यून', 'छुपी दौलत',
    // Fated To Be Yours (FTBY)
    'आरोही', 'रुद्रांश राणा', 'फ्लाईओवर', 'मुझसे शादी कर लीजिए', 'कान्हा जी', 'SP',
    // Empire of Hidden King (EHK)
    'अथर्व', 'नैना', 'राजवीर', 'छुपा राजा', 'मंत्री', 'साहब',
    // Ek Stranger Se Pyar (ESSP)
    'सुहानी', 'अयान', 'नौकरानी पत्नी', 'कबीला', 'मुखिया', 'उत्तराखंड',
    // Billionaire Hidden Wife (BHW/BRHW)
    'कार्तिक', 'अनिका', 'दादाजी', 'बिलियनेयर', 'नकाबपोश', 'पहचान',
    // Beggar Husband (BH)
    'शौर्य राठौर', 'शिप्रा', 'रायजादा', 'मुख्तार', 'धर्मवीर', 'भिखारी',
    // Ruthless (RL)
    'अर्जुन', 'नायरा', 'मालिनी', 'थर्ड आई', 'समर', 'शिमला',
    // Universal Drama English
    'secret', 'marriage', 'rich', 'poor', 'family', 'love', 'betrayal', 'hidden', 'identity', 'billionaire', 'CEO',
  ],
  Horror: [
    // Shiva Ek Pretyodha (STDL)
    'तांत्रिक', 'चुड़ैल', 'भूत', 'श्राप', 'ॐ', 'साया', 'डर', 'रहस्य', 'अंधेरा', 'आत्मा',
    'शिवा', 'काव्या', 'मंगलापुर', 'खौफनाक', 'प्रेत्योधा', 'दूल्हे-दुल्हन', 'तांत्रिक',
    'ghost', 'demon', 'curse', 'dark', 'fear', 'spirit', 'supernatural', 'witch', 'tantric',
  ],
}

// Hook conflict patterns drawn from ALL confirmed P0 scripts
const HOOK_CONFLICT_PATTERNS = [
  // Humiliation/mockery (PTS, BKR, DFB, MMP, BRHW, HSF, BH, EHK, HSF)
  /औकात|नामर्द|भिखारी|गंदी नाली|दो कौड़ी|निकम्मे|फटीचर|इस भिखारी से|कुत्तों की तरह/,
  // Direct threats / death (TWAR-Hasim)
  /कब्र बनेगी|मौत|बर्बाद|तबाह|मिटा देंगे|कीमत.{0,20}मौत/,
  // Relationship shock (BH, KODGN, BRHW, EHK)
  /शादी नहीं|सुहागरात|माफी माँग|पैरों में गिर|रेट है तेरा/,
  // Confrontation/refusal (TWAR-Akshay, MMP)
  /थूकेंगे|सड़ेगी|गरीबी में|छोड़ो मेरा हाथ|कपड़े उतारो|आज रात.{0,20}के लिए/,
  // Betrayal (KOD-LP3, TWAR)
  /धोखा|सीने में घोंप|तलवार|तुमने धोखा|किसने.{0,15}आने दिया/,
  // Distress cry (TBG-Shailendra-LP3)
  /बचाओ|कोई मुझे बचाओ|इज़्ज़त लूट|दरिंदा/,
  // Shock command (TWAR-Prakash)
  /कपड़े उतारो|जिंदा रहना चाहती हो|अपने कपड़े/,
  // Mystery/wonder (TBG-Akshay, TWAR-LP8)
  /कहाँ से आ गई|मौत के बाद की दुनिया|ये क्या है|ये आँख|ये निशान/,
  // Horror identity (STDL)
  /तांत्रिक है|चुड़ैल का|भूत है|आत्मा है/,
  // False accusation (TBG-LP3-V1, TBG-LP4)
  /इज़्ज़त लूटने|इज़्ज़त लूट रहा|दरिंदा.{0,20}इज़्ज़त|ये दरिंदा/,
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

function isNarrationLine(line) {
  return /^(नरेशन|Narrator|Narration|\[V\/O\]|\[नरेशन\]|Voice\s*Over|V\.O\.|V\/O)\s*[:–—]?/i.test(line)
}

function isDialogue(line) {
  // Narration/V.O. lines are explicitly NOT dialogue
  if (isNarrationLine(line)) return false
  // Has Hindi/English quote marks — clearly dialogue
  if (/[“”””’’]/.test(line)) return true
  // Character name: dialogue — “Name: text” or “Name (emotion): text”
  // Requires actual content (Hindi/English letter) after the colon
  if (/^[ऀ-ॿa-zA-Z][ऀ-ॿa-zA-Z\s]{0,30}(?:\([^)]{0,40}\))?\s*:\s*[ऀ-ॿa-zA-Z]/.test(line)) {
    if (!METADATA_LINE_PATTERNS.some(p => p.test(line))) return true
  }
  // Character name dash format — “Name - dialogue” or “Name – dialogue”
  if (/^[ऀ-ॿa-zA-Z][ऀ-ॿa-zA-Z\s]{1,30}\s*[-–—]\s*[ऀ-ॿa-zA-Z]/.test(line)) {
    if (!METADATA_LINE_PATTERNS.some(p => p.test(line))) return true
  }
  return false
}

function isCTALine(line) {
  return /pocket\s*fm|पॉकेट|install|download|डाउनलोड|सुनिए|बटन पर/i.test(line)
}

function extractDialogueText(line) {
  // Extract text within quotes first
  const m = line.match(/"([^"]{2,})"|"([^"]{2,})"/)
  if (m) return (m[1] || m[2]).trim()
  // Character name: dialogue (colon format, optional stage direction)
  const colonMatch = line.match(/^[ऀ-ॿa-zA-Z][ऀ-ॿa-zA-Z\s]{0,30}(?:\([^)]*\))?\s*:\s*(.+)$/)
  if (colonMatch) return colonMatch[1].trim()
  // Character name - dialogue (dash format)
  const dashMatch = line.match(/^[ऀ-ॿa-zA-Z][ऀ-ॿa-zA-Z\s]{1,30}\s*[-–—]\s*(.+)$/)
  if (dashMatch) return dashMatch[1].trim()
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
function isMetadataLine(line) {
  // Explicit metadata patterns (always metadata regardless of what follows)
  if (METADATA_LINE_PATTERNS.some(p => p.test(line))) return true
  // Character: dialogue format is NOT metadata — return false immediately
  // Example: “अर्जुन: मैं तुमसे प्यार करता हूँ” or “Arjun (angrily): Stop!”
  if (/^[ऀ-ॿa-zA-Z][ऀ-ॿa-zA-Z\s]{1,30}(?:\([^)]{0,40}\))?\s*:\s*[ऀ-ॿa-zA-Z]/.test(line)) {
    return false
  }
  // Short lines without sentence-ending punctuation or quotes — likely header labels
  if (line.length <= 60 && !/[“”””?!।]/.test(line) && /^[A-Za-zऀ-ॿ\s()–—:,\d]+$/.test(line)) {
    // Don't skip lines with clear Hindi verb markers (they're narrative content)
    if (!/\b(है|था|हूँ|गया|रहा|करो|दो|लो|जाओ|होगा|पाएगा|हुआ|हुई|आया|आई|गई|देगा|देगी|बनेगा)\b/.test(line)) return true
  }
  return false
}

function scoreHookLine(lines) {
  // Skip the metadata header block at the top of every promo .docx file
  let startIdx = 0
  for (let i = 0; i < Math.min(lines.length, 25); i++) {
    if (!isMetadataLine(lines[i])) { startIdx = i; break }
  }
  const hookSearchLines = lines.slice(startIdx, startIdx + 10)

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

  let score = 3
  const parts = []

  // ── SEQUENCE TYPE DETECTION ──────────────────────────────────────────────────
  // FLASHBACK markers (present→past→present structure)
  const flashbackMarkers = [
    'साल पहले', 'महीने पहले', 'दिन पहले', 'तब से',
    'उस दिन', 'उसी दिन', 'उस रात', 'उस वक्त',
    'years ago', 'months ago', 'flashback',
    'तभी उसे याद आया', 'वो पल याद', 'याद आया वो दिन',
    'एक साल पहले', 'दो साल पहले', 'तीन साल पहले',
    'पाँच साल पहले', 'दस साल पहले',
  ]
  const flashbackCount = flashbackMarkers.filter(w => lower.includes(w)).length
  const hasFlashback = flashbackCount >= 1

  // JUMBLED markers (non-chronological shock-first structure)
  // A JUMBLED script opens with peak shock AND has backstory/origin later
  const crisisOpening = HOOK_CONFLICT_PATTERNS.some(p => p.test(firstDiaText)) || /!/.test(firstDiaLine)
  const hasBackstory = /इसकी शुरुआत|यहाँ से शुरू|शुरू हुई थी|शुरू हुआ था|असल में|दरअसल|origin|पहले से|बहुत पहले/.test(lower)
  const isJumbled = crisisOpening && hasBackstory && !hasFlashback

  // Determine and report sequence type
  let detectedType = 'ORIGINAL'
  if (hasFlashback) {
    detectedType = 'FLASHBACK'
    score += 2
    parts.push(`FLASHBACK sequence detected (${flashbackCount} time-marker(s) found) — correct technique. Structure: present crisis → past origin → present consequence. This is used in TWAR-Pranjali-LP7, DFB-Hasim-LP1, KODGN-Hasim-LP3-V2.`)
  } else if (isJumbled) {
    detectedType = 'JUMBLED'
    score += 2
    parts.push('JUMBLED sequence detected — opens with peak shock moment, then provides backstory. This is the highest-impact sequence type used in TBG-Akshay-LP3 and BKR-Hasim-LP3. Each cut must raise a new question.')
  } else {
    detectedType = 'ORIGINAL'
    parts.push('ORIGINAL sequence (chronological) — events flow in story order. This works when the natural order creates enough tension. If not, consider JUMBLED: open with the most shocking moment first, then reveal why it happened.')
  }

  // ── CRISIS-OPENING CHECK ─────────────────────────────────────────────────────
  if (crisisOpening) {
    score += 2
    parts.push('Script opens at peak crisis/conflict ✓ — correct P0 technique. Listener is dropped into maximum tension immediately.')
  } else {
    parts.push('Opening lacks immediate crisis — every P0 script opens with maximum tension. Compare: BH "मैं इस भिखारी से शादी नहीं करूंगी!" or BRHW "पैरों में गिर... माफी माँग!" — listener must feel the conflict in the very first line.')
  }

  // ── TRANSITIONS ──────────────────────────────────────────────────────────────
  const transitions = ['तभी', 'लेकिन', 'मगर', 'अगले ही पल', 'इसके बाद', 'उसी पल', 'देखते ही', 'अचानक', 'suddenly', 'then', 'but', 'however', 'at that moment', 'इसी के साथ', 'और तभी']
  const transCount = transitions.filter(w => lower.includes(w)).length

  if (transCount >= 5) {
    score += 2
    parts.push(`${transCount} transition markers (Rule 5 ✓) — smooth emotional bridges between scenes. Scenes flow naturally.`)
  } else if (transCount >= 3) {
    score += 1
    parts.push(`${transCount} transition markers — good, but add more emotional bridges. Rule 5: every scene cut must be connected by emotion not plot. Ask: if you removed the narration bridge, would the cut feel abrupt?`)
  } else {
    parts.push(`Only ${transCount} transition markers — scenes feel disconnected. Add connective narration (तभी, अगले ही पल, लेकिन, अचानक) between each scene to guide the listener emotionally.`)
  }

  score = Math.max(1, Math.min(10, Math.round(score)))
  return { score, feedback: parts.join('. '), sequenceType: detectedType }
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

  const totalScenes = lines.filter(l => isDialogue(l) && !isCTALine(l)).length
  if (tensionBeforeScene >= 3) {
    const coveragePercent = totalScenes > 0 ? Math.round((tensionBeforeScene / totalScenes) * 100) : 0
    score += 1
    parts.push(`${tensionBeforeScene}/${totalScenes} dialogue scenes have narration setup before the line (${coveragePercent}% coverage) — correct tension-before-reveal technique (Rule 4, Step 4). Every scene should have tension FIRST.`)
  } else if (tensionBeforeScene > 0) {
    parts.push(`Only ${tensionBeforeScene}/${totalScenes} scenes have narration before the dialogue reveal. Rule 4 (Step 4): EVERY scene should start with tension or a setup narration line, then reveal the character/dialogue. Add build-up narration before each key dialogue moment.`)
  } else {
    parts.push('No tension-before-scene pattern detected. Rule 4 (Step 4): Before every dialogue, add a narration line that creates anticipation — "तभी...", "अचानक...", "उसी पल जब..." — so the audience feels something is coming before they hear the character speak.')
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
  const lastLines = lines.slice(-10).join(' ')
  const lower = lastLines.toLowerCase()
  const fullLower = fullText.toLowerCase()

  let score = 2
  const parts = []

  // STEP 6 CHECK — Episode 1 Callback (just before CTA)
  const ep1Callback = detectEpisodeCallback(lines, fullText)
  if (ep1Callback.present) {
    score += 2
    parts.push(`Episode 1 callback present (Step 6 ✓) — ${ep1Callback.evidence}. Creates full-circle emotional moment that primes the listener before CTA questions`)
  } else {
    parts.push('MISSING: Episode 1 callback (Step 6). Just before the CTA questions, add 3-4 lines from the very opening of Episode 1, then summarize Ep 1 in 1-2 lines. This full-circle moment significantly increases emotional impact before the final questions hit.')
  }

  // STEP 7 — CTA Question Count and Order
  // Look in last 15 lines for CTA questions (some scripts have longer CTA sections)
  const ctaSection = lines.slice(-15)
  const ctaSectionText = ctaSection.join(' ')
  const kyaQuestions = (ctaSectionText.match(/क्या /g) || []).length
  const questionMarks = (ctaSectionText.match(/\?/g) || []).length
  const effectiveQ = Math.max(kyaQuestions, Math.min(questionMarks, 6))

  if (effectiveQ >= 3 && effectiveQ <= 4) {
    score += 4
    parts.push(`${effectiveQ} CTA questions (Rule 9 ✓) — correct count. Check order: Q1=latest cliffhanger, Q2=earlier mystery, Q3=character/relationship, Q4=optional thematic. Each answerable only by listening.`)
  } else if (effectiveQ === 2) {
    score += 2
    parts.push(`Only 2 CTA questions — add 1 more. P0 template: क्या [latest cliffhanger]? क्या [earlier mystery]? क्या [character secret/relationship]? जानने के लिए डाउनलोड करें Pocket FM।`)
  } else if (effectiveQ >= 5) {
    score += 2
    parts.push(`${effectiveQ} CTA questions — too many. Trim to exactly 3-4. Each question must feel more urgent than the last. Cut the weakest one.`)
  } else if (effectiveQ === 1) {
    score += 1
    parts.push(`Only 1 CTA question — needs 2-3 more. BH has 3 क्या questions, TWAR has 3, HSF has 4. Questions must escalate: latest event → earlier mystery → character secret`)
  } else {
    parts.push('No CTA questions found — CRITICAL FAILURE (Rule 9). Script MUST end with exactly 3-4 urgent क्या questions. Without questions, listeners have no reason to download and listen.')
  }

  // Pocket FM mention
  const hasPF = CTA_PATTERNS.pocketfm.test(lower) || CTA_PATTERNS.pocketfm.test(fullLower)
  if (hasPF) {
    score += 1
    parts.push('Pocket FM / download mention present ✓')
  } else {
    parts.push('Missing Pocket FM mention — end with "जानने के लिए डाउनलोड करें Pocket FM और सुनिए [Show Name]"')
  }

  // Grand/cinematic language before CTA (Rule 8)
  const preCTA = lines.slice(-20, -5).join(' ').toLowerCase()
  const grandWords = ['सब कुछ', 'आखिरी', 'किस्मत', 'सच', 'दुनिया', 'हमेशा', 'अब कभी नहीं', 'बदल देगा', 'एक सच', 'आखिर', 'इस लम्हे', 'कभी नहीं']
  if (grandWords.some(w => preCTA.includes(w))) {
    score += 1
    parts.push('Grand, cinematic language before CTA (Rule 8 ✓) — energy peaks correctly')
  } else {
    parts.push('Ending language feels flat before CTA. Rule 8: the moment just before the CTA questions must feel GRAND — largest, most cinematic image of the whole promo.')
  }

  score = Math.max(1, Math.min(10, Math.round(score)))
  return { score, feedback: parts.join('. '), episodeCallback: ep1Callback }
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

// ─── EPISODE 1 CALLBACK DETECTOR ─────────────────────────────────────────────
function detectEpisodeCallback(lines, fullText) {
  const lower = fullText.toLowerCase()

  // Explicit Episode 1 references
  const ep1Explicit = [
    'episode 1', 'ep 1', 'ep-1', 'ep.1', 'ep 01',
    'एपिसोड 1', 'एपिसोड एक', 'पहला एपिसोड', 'पहले एपिसोड',
  ]

  // Story-start / journey-beginning markers
  const startMarkers = [
    'शुरुआत में', 'शुरू हुई', 'शुरू हुआ था', 'शुरुआत हुई',
    'पहली बार जब', 'जिस दिन', 'उस दिन से', 'उसी दिन',
    'तभी से', 'सब शुरू हुआ', 'यहाँ से शुरू', 'यहीं से शुरू',
    'यही वो पल', 'जब पहली बार', 'वो पहला दिन',
    'जब से मिले', 'जब से आई', 'जब से आया',
    'इसी पल से', 'इस एक पल ने', 'उस दिन किसे पता था',
  ]

  // Look in the last 30% of the script, before the CTA section
  const ctaIdx = lines.findIndex(l => isCTALine(l))
  const contentLines = ctaIdx > 0 ? lines.slice(0, ctaIdx) : lines
  const startOfLastSection = Math.floor(contentLines.length * 0.65)
  const lastSection = contentLines.slice(startOfLastSection)
  const lastText = lastSection.join(' ').toLowerCase()

  for (const marker of ep1Explicit) {
    if (lastText.includes(marker.toLowerCase())) {
      return { present: true, evidence: `Episode 1 explicit reference: "${marker}"` }
    }
  }
  for (const marker of startMarkers) {
    if (lastText.includes(marker.toLowerCase())) {
      return { present: true, evidence: `Story-beginning callback: "${marker}"` }
    }
  }

  return { present: false, evidence: 'No Episode 1 callback found in pre-ending section' }
}

// Per-show vocab lists for show-specific feedback
const SHOW_VOCAB = {
  'the warrior':             ['आकाश विष मोती', 'मिस्टिक वेन्स', 'फ्रोजन क्लाउड', 'सम्प्रदाय', 'स्वर्गीय खजाने', 'गहन क्षेत्र', 'अथर्व', 'आर्या'],
  'king of dragon':          ['ड्रैगन किंग', 'तिलस्मी टुकड़ा', 'कॉन्ट्रैक्ट मैरिज', 'स्वर्ण ड्रैगन', 'अर्जुन', 'शिवान्या', 'सुहागरात'],
  'the beast guru':          ['जीवन-बंधन प्राणी', 'काली भुजा', 'स्वर्ग भवन', 'संजीवनी', 'अग्निगिरि विद्यापीठ', 'स्वर्ण गरुड़', 'रुद्र', 'समर', 'काव्या', 'चूजा'],
  'purple thunder sovereign':['इंद्रवज्र', 'तड़ित प्रहार', 'कच्ची बिजली', 'असुर सम्राट', 'अवेकनर', 'आर्यन'],
  'primordial god':          ['स्पिरिट ग्रेड', 'क्रिस्टल रूलर', 'राज नगर', 'डिवाइन वॉइस', 'संदूक', 'गूंगा', 'सूर्यांश', 'नैरा', 'हिमांशी'],
  'divine flame burst':      ['चेतना', 'पौराणिक चेतना', 'जीवा परिवार', 'नौरंगी अंडा', 'अर्य साम्राज्य', 'जीवांश', 'आदित्य'],
  'brahmand ka rakshak':     ['सोम ड्रैगन', 'अग्नि ड्रैगन', 'ड्रैगन अकादमी', 'सपनोल्लास साम्राज्य', 'क्षितिज'],
  'my mysterious princess':  ['अनामिका', 'देवांश', 'नताशा', 'बायोलॉजिकल', 'ओबरॉय', 'सिंघानिया', 'मेडिकल जीनियस'],
  'empire of hidden king':   ['अथर्व', 'नैना', 'राजवीर', 'छुपा राजा', 'मंत्री', 'साहब'],
  'billionaire hidden wife': ['कार्तिक', 'अनिका', 'नकाबपोश', 'बिलियनेयर', 'पहचान', 'दादाजी'],
  'his secret fortune':      ['शनाया', 'वैभव', 'सीक्रेट फॉर्च्यून', 'छुपी दौलत', 'दादी'],
  'beggar husband':          ['शौर्य राठौर', 'शिप्रा', 'रायजादा', 'मुख्तार', 'भिखारी'],
  'shiva ek pretyodha':      ['तांत्रिक', 'चुड़ैल', 'ॐ', 'साया', 'मंगलापुर', 'प्रेत्योधा', 'शिवा', 'काव्या'],
}

// ─── GENRE FEEDBACK ───────────────────────────────────────────────────────────
function buildGenreFeedback(text, genre, showName) {
  const lower = text.toLowerCase()
  const showData = getShowData(showName || '')
  const showKey = showData.showKey || ''
  const showVocab = SHOW_VOCAB[showKey] || []
  const showVocabMatches = showVocab.filter(w => lower.includes(w.toLowerCase())).length
  const vocab = GENRE_VOCAB[genre] || GENRE_VOCAB.Fantasy
  const vocabMatches = vocab.filter(w => lower.includes(w)).length
  const parts = []

  if (showVocab.length > 0) {
    if (showVocabMatches >= 3) parts.push(`Show-specific vocabulary strong — ${showVocabMatches} "${showName}" words detected (characters, world elements)`)
    else if (showVocabMatches >= 1) parts.push(`Show-specific vocabulary weak — only ${showVocabMatches}/${showVocab.length} "${showName}" terms found. Use show names: ${showVocab.slice(0, 4).join(', ')}`)
    else parts.push(`No show-specific vocabulary detected — a P0 promo for "${showName}" MUST use its world terms. Expected: ${showVocab.slice(0, 4).join(', ')}`)
  }

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
  const showData = getShowData(showName)
  const p0s = showData.p0Promos
  const showLabel = showData.hasShowSpecificP0s
    ? `${showName} (show-specific P0)`
    : `${showData.genre} genre benchmark (no "${showName}" P0s yet)`

  const p0Comparison = {
    closestP0Script: `${p0s[0].id} (${p0s[0].show}) — ${showData.hasShowSpecificP0s ? 'same show' : 'same genre'}`,
    whatP0DoesDifferently: showData.hasShowSpecificP0s
      ? `"${showName}" confirmed P0 hook: "${p0s[0].hookExample}" — ${p0s[0].hookPattern}. Sequence: ${p0s[0].sequenceType}. This is your exact show's top-performing pattern.`
      : `No confirmed P0 promos yet for "${showName}". Nearest ${showData.genre} P0: ${p0s[0].show}'s hook: "${p0s[0].hookExample}" — ${p0s[0].hookPattern}. Apply same pattern to "${showName}" characters.`,
    keyLessons: [
      showData.hasShowSpecificP0s
        ? `Your show's proven hook pattern: "${p0s[0].hookExample.substring(0, 60)}" — study this for exact tone and style`
        : `No "${showName}" P0s yet — model your hook after ${p0s[0].show}: "${p0s[0].hookExample.substring(0, 50)}"`,
      `CTA needs exactly 3-4 क्या questions + Pocket FM mention. See ${p0s[0].id} for the correct question order and tone.`,
      weakest ? `Biggest opportunity: fix ${PARAM_LABELS[weakest[0]]} (${weakest[1].score}/10) — this single parameter is pulling your overall score down most` : 'Maintain consistency across all 7 parameters to reach P0'
    ]
  }

  // Extract sequenceType and episodeCallback from their scoring functions
  const sequenceType = parameterScores.sequence.sequenceType || 'ORIGINAL'
  const episodeCallback = parameterScores.ending.episodeCallback || { present: false, evidence: 'Not evaluated' }

  // Build rewrite suggestions
  const firstDia = lines.find(l => isDialogue(l)) || ''
  const rewriteSuggestions = []

  if (parameterScores.hookLine.score < 7) {
    rewriteSuggestions.push({
      original: firstDia.substring(0, 120) || '[Opening line of your script]',
      rewritten: `${showLabel} hook pattern: "${p0s[0].hookExample}"\n\nYour hook should be: character name + emotion + spoken dialogue in quotes + under 13 words + immediate conflict/crisis`,
      reason: `Rule 1: Hook MUST be character dialogue under 13 words with immediate crisis. ${p0s[0].id} achieves this with: "${p0s[0].hookPattern}"`
    })
  }

  if (!episodeCallback.present) {
    rewriteSuggestions.push({
      original: '[The section just before your CTA questions]',
      rewritten: `[Insert 3-4 opening lines from Episode 1 of "${showName}" here]\n\n[Then add 1-2 lines summarizing how the story began — what was the first moment that changed everything?]\n\n[Immediately follow with the CTA questions]`,
      reason: 'Step 6 (Episode 1 Callback): P0 promos create a full-circle emotional moment just before the CTA questions. It reminds the audience of where it all started and makes the ending feel inevitable. This is currently missing.'
    })
  }

  if (parameterScores.ratio.score < 6) {
    rewriteSuggestions.push({
      original: '[Dialogue-heavy section of your script]',
      rewritten: `Convert dialogue exchanges to narration. Instead of:\nCharacter A: "..."\nCharacter B: "..."\n\nWrite:\n[Narration line describing Character A's action/emotion]\nCharacter A: "[Shorter, punchy line — max 25 words]"\n[Narration bridge connecting to next scene]`,
      reason: 'Rule 10: 70% narration : 30% dialogue is non-negotiable. Narration carries emotional tone and story structure. No single dialogue chunk should exceed 25 words.'
    })
  }

  if (parameterScores.sceneDesign.score < 6) {
    rewriteSuggestions.push({
      original: '[Any scene that describes characters passively]',
      rewritten: `Add tension BEFORE every dialogue moment:\n[Narration: situation/tension building]\n[Character\'s internal thought or physical reaction]\nCharacter: "[Dialogue that reveals something about them]"\n\nExample structure from TBG-Akshay-LP3:\n"रुद्र की साँसें रुक गईं... [tension]\nमन ही मन सोचा — यह काली भुजा कहाँ से आई? [internal thought]\n"मेरे हाथ की लकीरों में… ये आँख कहाँ से आ गई?" [hook dialogue]"`,
      reason: 'Rule 4 (Step 4): Every scene must start with tension/narration BEFORE the character speaks. Never describe characters passively — show them through thought, action, or confrontation.'
    })
  }

  if (parameterScores.pacing.score < 6) {
    rewriteSuggestions.push({
      original: '[Second half of your script — after the midpoint]',
      rewritten: `In the second half, shorten every line by 30-40%.\nBefore: "अर्जुन ने देखा कि वो लड़की जो उसकी ज़िंदगी में आई थी, वो असल में उसकी दुश्मन थी"\nAfter: "और तभी सच सामने आया।"\n"वो लड़की... उसकी दुश्मन थी।"\n\nCut transitions. Cut context. Only keep what raises stakes.`,
      reason: 'Rule 6: After the midpoint, ACCELERATE. Shorter lines, sharper dialogue, faster cuts. The audience must feel "Something BIG is about to happen" — not read a story summary.'
    })
  }

  if (parameterScores.ending.score < 7 && episodeCallback.present) {
    const ctaEx = showData.genre === 'Fantasy'
      ? 'क्या [protagonist] अपनी खोई शक्ति वापस पा पाएगा?\nक्या [antagonist] का असली रहस्य सामने आएगा?\nक्या [protagonist] ब्रह्मांड को बचाने के लिए काफी शक्तिशाली बन पाएगा?\n\nजानने के लिए डाउनलोड करें Pocket FM और सुनिए "[Show Name]"'
      : showData.genre === 'Drama'
        ? 'क्या [protagonist] का राज़ कभी सामने आएगा?\nक्या ये रिश्ता कभी सच्चे प्यार में बदल पाएगा?\nआखिर [hidden identity] की सच्चाई क्या है?\n\nजानने के लिए डाउनलोड करें Pocket FM और सुनिए "[Show Name]"'
        : 'क्या [protagonist] उस [supernatural threat] का सामना कर पाएगा?\nआखिर वो [mystery element] क्या है?\nक्या [relationship] इस रहस्य को झेल पाएगा?\n\nजानने के लिए डाउनलोड करें Pocket FM और सुनिए "[Show Name]"'
    rewriteSuggestions.push({
      original: 'Current CTA / ending section',
      rewritten: ctaEx,
      reason: `Rule 9: Exactly 3-4 क्या questions in order: latest cliffhanger → earlier mystery → character/relationship. Each must be answerable ONLY by listening. See ${p0s[0].id} CTA pattern.`
    })
  }

  return {
    overallScore,
    tier,
    tierLabel,
    parameterScores,
    sequenceType,
    episodeCallback: {
      present: episodeCallback.present,
      feedback: episodeCallback.present
        ? `Episode 1 callback detected ✓ — ${episodeCallback.evidence}`
        : 'MISSING: No Episode 1 callback found before the CTA questions. Add 3-4 opening lines from Episode 1, then 1-2 lines summarizing how the story began. This full-circle moment significantly lifts the emotional impact of the ending.'
    },
    whatIsWorking: sorted.slice(0, 3).map(([k, v]) => `${PARAM_LABELS[k]} (${v.score}/10): ${v.feedback.split('.')[0]}`),
    weakPoints: sorted.slice(-3).filter(([, v]) => v.score < 8).map(([k, v]) => ({
      issue: `${PARAM_LABELS[k]}: ${v.feedback.split('.')[0]}`,
      whyItFails: PARAM_WHY[k],
      location: v.feedback.split('.').slice(-1)[0].trim() || `Overall ${PARAM_LABELS[k].toLowerCase()}`
    })),
    rewriteSuggestions: rewriteSuggestions.slice(0, 4),
    p0Comparison,
    genreSpecificFeedback: buildGenreFeedback(script, genre, showName),
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
