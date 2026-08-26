const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = process.env.SHOW_CONTENT_ROOT || path.resolve(__dirname, '../../../Serieses Scripts');
const PROMOS = process.env.SHOW_PROMOS_ROOT || path.resolve(__dirname, '../../../Show Wise Promos');
const cache = new Map();

function docxText(file) {
  const xml = execFileSync('unzip', ['-p', file, 'word/document.xml'], { maxBuffer: 30 * 1024 * 1024 }).toString();
  return xml.replace(/<w:tab[^>]*\/>/g, '\t').replace(/<w:br[^>]*\/>/g, '\n')
    .replace(/<w:t[^>]*>([\s\S]*?)<\/w:t>/g, '$1').replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/\r/g, '').split('\n').map(x => x.trim()).filter(Boolean).join('\n');
}
function files(root) { if (!fs.existsSync(root)) return []; return walk(root); }
function walk(dir) { return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(dir, e.name)) : e.name.toLowerCase().endsWith('.docx') ? [path.join(dir, e.name)] : []); }
function showName(file) { return path.basename(file).replace(/\s*1-50\.?docx$/i, '').trim(); }
function genre(file) { const p = file.toLowerCase(); return p.includes('fantasy') ? 'Fantasy' : p.includes('horror') ? 'Horror' : 'Drama'; }
function catalog() {
  return files(ROOT).map(file => ({ showName: showName(file), genre: genre(file), sourceFile: file, updatedAt: fs.statSync(file).mtimeMs }))
    .filter((x, i, a) => a.findIndex(y => y.showName.toLowerCase() === x.showName.toLowerCase()) === i);
}
function findShow(name) { return catalog().find(x => x.showName.toLowerCase() === String(name).toLowerCase()); }
function snapshot(name, selectedGenre, episodeRange = '1-20') {
  const item = findShow(name); if (!item) throw new Error(`Show source not found: ${name}`);
  const st = fs.statSync(item.sourceFile); const key = item.sourceFile + st.mtimeMs;
  if (!cache.has(key)) cache.set(key, docxText(item.sourceFile));
  const all = cache.get(key); const lines = all.split('\n');
  // The corpus is labelled 1–50. The rules require the first 20 episodes;
  // retain headings and all text in that window, with a safe character cap.
  const requested = String(episodeRange).match(/(\d+)\s*[-–]\s*(\d+)/);
  const endEpisode = Math.min(requested ? Number(requested[2]) : 20, 20);
  const episodeStart = new RegExp(`(?:episode|ep(?:isode)?)[ .:_-]*1\\b`, 'i');
  const episodeMarkers = lines.map((line, i) => /^(?:episode|ep(?:isode)?)[ .:_-]*\d+/i.test(line) ? i : -1).filter(i => i >= 0);
  let source = lines.slice(0, Math.min(lines.length, 2400)).join('\n');
  if (episodeMarkers.length) {
    const cutoff = episodeMarkers.find(i => { const m = lines[i].match(/\d+/); return m && Number(m[0]) > endEpisode; });
    source = lines.slice(0, cutoff || Math.min(lines.length, 2400)).join('\n');
  }
  source = source.slice(0, 90000);
  const promoFiles = files(PROMOS).filter(f => path.basename(path.dirname(f)).toLowerCase() === item.showName.toLowerCase());
  const promos = promoFiles.slice(0, 30).map(f => ({ file: f, text: docxText(f).slice(0, 12000) }));
  return { ...item, genre: selectedGenre || item.genre, source, promos, episodeRange: `1-${endEpisode}` };
}
module.exports = { catalog, snapshot, findShow };
