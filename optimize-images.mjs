import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const IMPORTS = path.join("src", "imports");

const IMAGES = {
  "image01": 1600,
  "image": 1600,
  "image_mf-1": 1600,
  "slimbiz": 1000,
  "1234567-1": 900,
  "31e4f30c-45fb-4042-b295-e6eaedca3b10-1": 900,
  "Yofende_Louis_Kogah-1": 900,
  "Mepipyou_Nouguep_Nadyane_Paola-1": 900,
  "Mbuntum_gilbert_neng-1": 900,
  "Lizeth_Kemji-1": 900,
};

const QUALITY = 78;
const kb = (bytes) => Math.round(bytes / 1024) + " KB";

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (["node_modules", "dist", ".git"].includes(entry.name)) continue;
      walk(full, out);
    } else if (/\.(tsx?|jsx?|css|html|mjs)$/.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

const converted = [];
let before = 0;
let after = 0;

for (const [name, width] of Object.entries(IMAGES)) {
  const input = path.join(IMPORTS, `${name}.png`);
  const output = path.join(IMPORTS, `${name}.webp`);

  if (!fs.existsSync(input)) {
    console.log(`SKIP   ${name}.png (not found)`);
    continue;
  }

  try {
    await sharp(input)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(output);

    const a = fs.statSync(input).size;
    const b = fs.statSync(output).size;
    if (b === 0) throw new Error("empty output");

    before += a;
    after += b;
    converted.push(name);
    console.log(`OK     ${name}: ${kb(a)} -> ${kb(b)}`);
  } catch (err) {
    console.log(`FAILED ${name}: ${err.message}`);
  }
}

let edits = 0;
for (const file of walk("src")) {
  const text = fs.readFileSync(file, "utf8");
  let changed = text;
  for (const name of converted) {
    const safe = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    changed = changed.replace(new RegExp(`(?<=[/"'])${safe}\\.png`, "g"), `${name}.webp`);
  }
  if (changed !== text) {
    fs.writeFileSync(file, changed);
    edits++;
    console.log(`EDITED ${file}`);
  }
}

for (const name of converted) {
  fs.unlinkSync(path.join(IMPORTS, `${name}.png`));
}

console.log("");
console.log(`Converted ${converted.length} images: ${kb(before)} -> ${kb(after)}`);
console.log(`Edited ${edits} code file(s).`);
console.log("Next: run  npm run build");
