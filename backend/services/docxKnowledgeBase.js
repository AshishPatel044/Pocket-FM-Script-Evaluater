const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

function resolveLibraryRoot(envName, folder) {
  const candidates = [
    process.env[envName],
    path.resolve(process.cwd(), folder),
    path.resolve(__dirname, '../../', folder),
    path.resolve(__dirname, '../../../', folder)
  ].filter(Boolean);
  // A configured directory can exist while still being the wrong/empty mount
  // in a deployment. Select the first directory that contains the expected
  // DOCX corpus instead of treating directory existence as sufficient.
  const hasDocx = candidate => {
    if (!fs.existsSync(candidate) || !fs.statSync(candidate).isDirectory()) return false;
    const pending = [candidate];
    while (pending.length) {
      const current = pending.pop();
      for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
        const fullPath = path.join(current, entry.name);
        if (entry.isDirectory()) pending.push(fullPath);
        else if (entry.name.toLowerCase().endsWith('.docx')) return true;
      }
    }
    return false;
  };
  return candidates.find(hasDocx) || candidates.find(fs.existsSync) || candidates[0];
}
const ROOT = resolveLibraryRoot('SHOW_CONTENT_ROOT', 'Serieses Scripts');
const PROMOS = resolveLibraryRoot('SHOW_PROMOS_ROOT', 'Show Wise Promos');
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
// Content files are named `<show> 1-50.docx`, but some existing files use
// variants such as `1-50..docx`. Keep the catalog name independent of those
// harmless filename punctuation differences so frontend selections resolve
// to the same backend show.
function showName(file) {
  return path.basename(file)
    .replace(/\s+\d+\s*-\s*\d+\.*docx$/i, '')
    .replace(/\s+/g, ' ')
    .trim();
}
function genre(file) { const p = file.toLowerCase(); return p.includes('fantasy') ? 'Fantasy' : p.includes('horror') ? 'Horror' : 'Drama'; }
function catalog() {
  return files(ROOT).map(file => ({ showName: showName(file), genre: genre(file), sourceFile: file, updatedAt: fs.statSync(file).mtimeMs }))
    .filter((x, i, a) => a.findIndex(y => y.showName.toLowerCase() === x.showName.toLowerCase()) === i);
}
// Frontend labels can contain repeated or non-breaking whitespace copied from
// filenames. Treat equivalent whitespace as the same show name.
function normalizeShowName(name) {
  return String(name || '').replace(/[\u00a0\s]+/g, ' ').trim().toLowerCase();
}
function findShow(name) { return catalog().find(x => normalizeShowName(x.showName) === normalizeShowName(name)); }
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
