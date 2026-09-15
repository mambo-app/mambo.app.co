import { readFile, writeFile, copyFile, mkdir } from 'node:fs/promises';

const source = await readFile('mambo.source.html', 'utf8');
// Recover the original embedded brand asset from the supplied standalone draft.
let logo;
try { logo = await readFile('mambo-logo.png'); }
catch {
  const previous = await readFile('index.html', 'utf8');
  const embedded = previous.match(/data:image\/png;base64,([A-Za-z0-9+/=]+)/);
  if (!embedded) throw new Error('Original MAMBO logo not found');
  logo = Buffer.from(embedded[1], 'base64');
  await writeFile('mambo-logo.png', logo);
}
const app = await readFile('mambo-app.js', 'utf8');
const world = await readFile('mambo-world.js', 'utf8');
const polish = await readFile('mambo-polish.css', 'utf8');
const essence = await readFile('mambo-essence.css', 'utf8');
const config = await readFile('mambo-config.js', 'utf8');
const explore = await readFile('mambo-explore.js', 'utf8');
const exploreCSS = await readFile('mambo-explore.css', 'utf8');
const html = source
  .replaceAll('__MAMBO_LOGO__', `data:image/png;base64,${logo.toString('base64')}`)
  .replace('/* MAMBO_CONFIG */', () => config)
  .replace('/* MAMBO_POLISH */', () => `${polish}\n${essence}\n${exploreCSS}`)
  .replace('/* MAMBO_APP */', () => `${app}\n${explore}\n${world}`);

await writeFile('index.html', html);
try {
  await mkdir('outputs', { recursive: true });
  await writeFile('outputs/mambo.html', html);
  await writeFile('outputs/index.html', html);
} catch {}

try {
  await mkdir('public', { recursive: true });
  await copyFile('mambo apk/mambo.v1.0.5.7.apk', 'public/mambo.v1.0.5.7.apk');
  await copyFile('mambo apk/mambo.v1.0.5.7.apk', 'public/mambo.apk');
  console.log('Copied mambo.v1.0.5.7.apk to public/');
} catch (e) {
  console.warn('Warning copying APK:', e.message);
}

console.log(`Built index.html (${(Buffer.byteLength(html) / 1024).toFixed(0)} KB)`);
