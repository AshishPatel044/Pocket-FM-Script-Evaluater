# PocketFM Promo Script Evaluator — CLAUDE.md

Full project context for Claude Code. Read this at the start of every new session.

---

## What This Project Is

A full-stack AI Promo Script Evaluator for PocketFM (India's largest audio storytelling platform).
Built by Ashish Patel (ashish.patel@pocketfm.com) — content/promo team.

Writers paste a promo script → tool evaluates it on 7 parameters → gives score, tier (P0/P1/P2), feedback, and rewrite suggestions.

---

## Tech Stack

| Layer | Tech | Notes |
|---|---|---|
| Frontend | React (Vite) + TailwindCSS | `/frontend/` |
| Backend | Vercel Serverless Functions | `/frontend/api/evaluate.js` — THE ONLY ACTIVE BACKEND |
| Deployment | Vercel (auto-deploy on git push to main) | GitHub: `AshishPatel044/Pocket-FM-Script-Evaluater` |
| AI (optional) | Gemini 1.5 Flash | Only if `GEMINI_API_KEY` env var is set in Vercel |
| Auth | localStorage, 7-day session | No JWT, no server call needed |
| Railway | DISCONNECTED | Old backend, runs stale code — ignore it |

**Important**: Railway is disconnected from GitHub. All evaluation logic lives in `frontend/api/evaluate.js`.

---

## The Single Most Important File

```
frontend/api/evaluate.js
```

This is the entire evaluation engine. It contains:
- `SYSTEM_PROMPT` — full show/character knowledge for all 21 shows
- `P0_SCRIPTS` — all 26 confirmed P0 scripts with hook examples, organized by genre
- `getShowData(showName)` — alias-based show lookup, returns show-specific P0s
- `SHOW_VOCAB` — per-show vocabulary lists (characters, world elements)
- `GENRE_VOCAB` — genre-level vocabulary
- `METADATA_LINE_PATTERNS` + `isMetadataLine()` — skips the docx header block before finding hook
- All 7 scoring functions: `scoreHookLine`, `scoreContext`, `scoreSequence`, `scoreSceneDesign`, `scorePacing`, `scoreEnding`, `scoreRatio`
- `buildUserPrompt()` — Gemini prompt builder (uses show-specific P0s)
- `runIntelligentEvaluation()` — rule-based engine (no API key needed)
- `buildGenreFeedback(text, genre, showName)` — show-specific + genre vocab feedback
- Vercel handler at the bottom

**Current version: 1.5.0**

---

## Evaluation Parameters & Weights

| Parameter | Weight | Key Rule |
|---|---|---|
| Hook Line | 25% | Character dialogue, max 12-13 words, show-specific, scroll-stopping |
| Context Clarity | 10% | 2-4 lines, answers who/where/what/tension |
| Sequence Logic | 15% | ORIGINAL / FLASHBACK / JUMBLED — must be intentional |
| Scene Design | 15% | Every scene: tension setup + character revealed through action/dialogue/thought |
| Pacing & Transitions | 15% | Accelerate after midpoint, smooth transitions |
| Ending & CTA | 10% | Grand ending + exactly 3-4 क्या questions in correct order |
| Narration/Dialogue Ratio | 10% | 70% narration : 30% dialogue — NON-NEGOTIABLE. No dialogue chunk > 25 words |

**Score formula**: `(Hook×0.25)+(Context×0.10)+(Sequence×0.15)+(SceneDesign×0.15)+(Pacing×0.15)+(Ending×0.10)+(Ratio×0.10)`

**Tiers**: P0 ≥ 8.5 | P1 6.5–8.4 | P2 < 6.5

---

## 26 Confirmed P0 Scripts (Extraordinary Performers)

### Fantasy (18)
| ID | Show | Hook Example |
|---|---|---|
| TWAR-Akshay-LP1-30 Mins-V2 | The Warrior | तुझ जैसे नामर्द के साथ मैंने सुहागरात मनाई तो सब लोग मुझ पर थूकेंगे। |
| TWAR-Hasim-LP1 | The Warrior | आकाश विष मोती तक पहुँचने की कीमत... सिर्फ़ मौत है। |
| TWAR-Hasim-LP2 | The Warrior | आखिर... तुम मेरा खून क्यों पी रही हो? छोड़ो मुझे! |
| TWAR-Pranjali-LP7 | The Warrior | मैं सिर्फ़ आज रात के लिए तुम्हारी पत्नी हूँ अथर्व.... |
| TWAR-Pranjali-LP7-Hasim-V1 | The Warrior | मैं सिर्फ़ आज रात के लिए तुम्हारी पत्नी हूँ अथर्व.... |
| TWAR-Pranjali-LP8-Hasim-V1 | The Warrior | ये मौत के बाद की दुनिया है...? या... या कोई सपना...? |
| TWAR-Hasim-LP2-Akshay-V1 | The Warrior | याद रखना, आर्या... प्यार की एक चिंगारी भी तुम्हारे दिल की बर्फ पिघला सकती है। |
| TBG-Akshay-LP3 | The Beast Guru | मेरे हाथ की लकीरों में… ये आँख कहाँ से आ गई? |
| TBG-Shailendra-LP3-Hasim-V1 | The Beast Guru | बचाओ! कोई मुझे बचाओ! ये दरिंदा मेरी इज़्ज़त लूट रहा है! |
| PTS-Akshay-LP1-V1 | Purple Thunder Sovereign | तुझ जैसा गंदी नाली का कीड़ा अगर योद्धा बनेगा, तो हम लोग क्या चने के खेत में नाचेंगे? |
| PG-Hasim-LP1-V1 | Primordial God | इस गूंगे से शादी कर लो बेटा! |
| DFB-Hasim-LP1 | Divine Flame Burst | तुम्हारी औकात ही नहीं है… कि तुम कोई चेतना जागृत कर सको! |
| BKR-Hasim-LP3 | Brahmand Ka Rakshak | तुम्हारी तो औकात ही नहीं हैं की तुम किसी भी ड्रैगन को वश में कर सको! |
| KOD-Hasim-LP4-V2 | King of Dragon | तुम मेरे भाई से शादी कैसे कर सकती हो मिषा? तुम तो मुझसे प्यार करती थी। |
| KODGN-Hasim-LP1-30 Mins-V1 | King of Dragon | बिना सुहागरात वाली शादी करोगे मुझसे? |
| KODGN-Rituraj-LP1-Hasim-V1 | King of Dragon | बिना सुहागरात वाली शादी करोगे मुझसे? |
| KODGN-Hasim-LP3-V2 | King of Dragon | एक योद्धा को दिल से नहीं, दिमाग से काम लेना चाहिए ड्रैगन किंग! |
| KOD-Shailendra-LP10-Hasim-V1 | King of Dragon | इस भिखारी को अंदर किसने आने दिया? |

### Drama (7)
| ID | Show | Hook Example |
|---|---|---|
| MMP-Shailendra-LP1 | My Mysterious Princess | अब तेरे मंगेतर से शादी मैं करूँगी... और तू? तू गरीबी में सड़ेगी! |
| MMP-Shailendra-LP2 | My Mysterious Princess | क्या? ये दो कौड़ी की कॉलेज की लड़की... हार्ट सर्जरी करेगी? |
| EHK-Prakash-LP2-Hasim-V3 | Empire of Hidden King | हाय जानेमन! एक रात का क्या रेट है तेरा? |
| BRHW-Akshay-LP1 | Billionaire Hidden Wife | दो कौड़ी की लड़की! सर से जुबान लड़ाती है? पैरों में गिर... और माफी माँग! |
| HSF-Akshay-LP5 | His Secret Fortune | फ़्री का खाना देखा नहीं कि कुत्तों की तरह मुँह मारने आ जाते हैं, भिखारी कहीं के। |
| BH-Prakash-LP1 | Beggar Husband | मैं… मैं इस भिखारी से कभी शादी नहीं करूंगी! छोड़ो मेरा हाथ! |
| BH-Prakash-LP1-V1 | Beggar Husband | मैं… मैं इस भिखारी से कभी शादी नहीं करूंगी! |

### Horror (1)
| ID | Show | Hook Example |
|---|---|---|
| STDL-Hasim-LP2-V1 | Shiva Ek Pretyodha | क्या? ये… ये हॉट, बॉडी-बिल्डर टाइप लड़का तांत्रिक है? |

---

## All 21 Shows — Quick Reference

### Fantasy Shows
| Show | Abbr | Key Characters | Central Engine |
|---|---|---|---|
| The Warrior | TWAR | Atharv Dev / Atharv Churu, Arya (Frozen Cloud Sect) | Supreme warrior reincarnates in zero-power body, secretly rebuilds |
| King of Dragon | KOD / KODGN | Arjun (coma survivor), Shivanya (CEO heiress) | Coma survivor = Dragon King reincarnation, contract marriage |
| The Beast Guru | TBG | Rudra, Kavya (betrayal), Samar (mahakaal villain), Chuza (phoenix chick) | False accusation, cure mother with संजीवनी, defeat Samar |
| Purple Thunder Sovereign | PTS | Aryan | E-rank awakening → rise through power ranks |
| Primordial God | PG | Suryansh (mute/गूंगा), Naira (arrogant), Himanshi (kind) | Mute protagonist holds Infinite-Grade Spirit Power secretly |
| Divine Flame Burst | DFB | Aditya, Jeevansh (antagonist) | Accidentally awakens galaxy-level Sarvoch Pauranik Chetna |
| Divine Power | DP | Arya | Academy sweeper breaks power pillar with Acharya's power |
| Brahmyodha | BHY | Vidhyut, Thama | Mysterious locket = hidden lineage |
| Brahmand Ka Rakshak | BKR | Kshitij | Accidentally bonds with rarest Som Dragon by bleeding on it |
| Rudra: Rise of Supreme Yodha | RRSY | Rudransh | Zero-level power, betrayed, discovers divine body in magic ring world |
| The Legend Gods | TLG | Nikhil/Manish | Reincarnated warrior emperor seeks नरक की तलवार |

### Drama Shows
| Show | Abbr | Key Characters | Central Engine |
|---|---|---|---|
| My Mysterious Princess | MMP | Anamika (triple hidden identity), Devanshu, Natasha | Medical genius / billionaire / fighter hidden under poor girl |
| Malang | ML | Mritunjay Sarang (CEO), Mahak | Bride-swap forced marriage → hate to love |
| His Secret Fortune | HSF | Shanaya, Vaibhav | Forced marriage to man hiding secret fortune |
| Fated To Be Yours | FTBY | Aarohi, Rudransh Rana | Accidental marriage, husband denies it |
| Empire of Hidden King | EHK | Atharv, Naina | Hides royal identity, minister bows in secret |
| Ek Stranger Se Pyar | ESSP | Suhani, Ayan | नौकरानी पत्नी dynamic |
| Billionaire Hidden Wife | BHW / BRHW | Kartik (billionaire), Anika | Husband doesn't recognize own wife, Naqaabposh subplot |
| Beggar Husband | BH | Shourya Rathore (secretly rich), Shipra | Forced marriage to apparent beggar who is secretly wealthy |
| Ruthless | RL | Arjun, Nayra, Malini | P1 promos only — hook is narration-heavy, not dialogue-first |

### Horror Shows
| Show | Abbr | Key Characters | Central Engine |
|---|---|---|---|
| Shiva Ek Pretyodha (Saya) | STDL | Shiva (तांत्रिक), Kavya, Churail | Ghost-fighter with ॐ birthmark + love story; village: मंगलापुर |

---

## Critical Bug Fixes (Already Implemented)

### 1. Metadata Header Skip (CRITICAL — was breaking all hook scores)
Every `.docx` promo file starts with a metadata block BEFORE the actual script:
```
Show Name - The Warrior
Promo No - TWAR-Hasim-LP1
Voice Over - Hasim
Character Description - ...
```
Old code was reading "Show Name - The Warrior" as the hook line.

**Fix**: `METADATA_LINE_PATTERNS` array + `isMetadataLine()` function. `scoreHookLine()` scans up to 25 lines looking for the first non-metadata line before checking for the hook.

### 2. Show-Specific Comparison (v1.5.0)
Old code compared all submitted scripts against ALL Fantasy P0s regardless of which show was selected. If you submitted a Primordial God script it compared to Warrior hooks.

**Fix**: `getShowData(showName)` function with alias matching maps every show name/abbreviation to that show's own confirmed P0s. Falls back to full genre pool only for shows with no confirmed P0s yet.

### 3. Rule-Based Evaluator Giving Same Scores
Old shallow keyword-matching gave identical results to all scripts.

**Fix**: Structural analysis — detect dialogue vs narration lines, find hook position, count क्या questions, calculate actual ratio. Full 7-parameter scoring.

---

## getShowData() — Show Aliases

The function accepts any of these inputs and returns the right P0s:

| Show | Accepted aliases |
|---|---|
| The Warrior | twar, warrior |
| King of Dragon | kod, kodgn, dragon king |
| The Beast Guru | tbg, beast guru, beast |
| Purple Thunder Sovereign | pts, purple thunder, purple |
| Primordial God | pg, primordial |
| Divine Flame Burst | dfb, divine flame |
| Brahmand Ka Rakshak | bkr, brahmand, rakshak |
| Divine Power | dp |
| Brahmyodha | bhy |
| Rudra | rrsy, rudra rise, supreme yodha |
| The Legend Gods | tlg, legend gods |
| My Mysterious Princess | mmp, mysterious princess |
| Empire of Hidden King | ehk, hidden king |
| Billionaire Hidden Wife | bhw, brhw, billionaire hidden, hidden wife |
| His Secret Fortune | hsf, secret fortune |
| Beggar Husband | bh, beggar |
| Malang | ml |
| Fated To Be Yours | ftby, fated |
| Ek Stranger Se Pyar | essp, ek stranger, stranger pyar |
| Ruthless | rl |
| Shiva Ek Pretyodha | stdl, saya, dark love, shiva pretyodha |

---

## How to Deploy

Every push to `main` branch auto-deploys to Vercel. To force a redeploy, bump `frontend/package.json` version (1.4.0 → 1.5.0 → 1.6.0 etc.).

```bash
git add frontend/api/evaluate.js frontend/package.json
git commit -m "your message"
git push origin main
```

Vercel picks it up in ~1-2 minutes.

---

## Environment Variables (Vercel Dashboard)

| Variable | Purpose |
|---|---|
| `GEMINI_API_KEY` | If set, uses Gemini 1.5 Flash for evaluation. If missing, rule-based engine runs. |

Note: The Gemini key must start with `AIzaSy`. The key shared in chat earlier (`AQ.Ab8RN6...`) was NOT a valid Gemini key — never commit API keys to git.

---

## File Structure

```
script-evaluator/
├── CLAUDE.md                    ← this file
├── frontend/
│   ├── api/
│   │   └── evaluate.js          ← ENTIRE BACKEND (v1.5.0)
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   └── ...
│   ├── package.json             ← version 1.5.0
│   └── vite.config.js
└── backend/                     ← OLD, not connected to Vercel, ignore
    └── server.js
```

---

## Version History

| Version | What Changed |
|---|---|
| 1.5.0 | Show-specific P0 comparison (`getShowData()`), show-specific vocab (`SHOW_VOCAB`), `buildGenreFeedback` takes `showName` |
| 1.4.0 | Metadata header skip fix, deep show knowledge from all 21 show episode files |
| 1.3.0 | 26 confirmed P0 scripts added to knowledge base |
| 1.2.0 | Moved all evaluation to Vercel serverless, Railway disconnected |
| 1.0.0 | Initial build |

---

## Things NOT to Change Without Asking

1. The 26 confirmed P0 script IDs in `P0_SCRIPTS` — these are confirmed by the PocketFM team
2. The 7-parameter weight formula — established by master prompt
3. The tier thresholds (P0 ≥ 8.5, P1 ≥ 6.5) — established by master prompt
4. The 70:30 narration:dialogue ratio rule — non-negotiable per master prompt
