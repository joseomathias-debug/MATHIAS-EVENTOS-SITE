import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourceDir = path.join(root, "assets", "originals", "tendas-capacidades");
const outputDir = path.join(root, "public", "assets", "tendas", "capacidades");
const sourceFiles = (await readdir(sourceDir))
  .filter((file) => /^\d{2}-.+\.png$/i.test(file))
  .sort((a, b) => a.localeCompare(b, "pt-BR", { numeric: true }));

if (sourceFiles.length !== 29) {
  throw new Error(`Esperados 29 assets, encontrados ${sourceFiles.length}.`);
}

await mkdir(outputDir, { recursive: true });
const manifest = [];

for (const file of sourceFiles) {
  const source = path.join(sourceDir, file);
  const slug = path.basename(file, path.extname(file));
  const metadata = await sharp(source).metadata();

  if (metadata.width !== 2000 || metadata.height !== 1333 || !metadata.hasAlpha) {
    throw new Error(`Asset fora do padrão esperado: ${file}`);
  }

  for (const width of [640, 1000]) {
    await sharp(source)
      .resize({ width, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 86, alphaQuality: 92, effort: 5 })
      .toFile(path.join(outputDir, `${slug}-${width}.webp`));
  }

  await sharp(source)
    .resize({ width: 1000, fit: "inside", withoutEnlargement: true })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(path.join(outputDir, `${slug}-1000.png`));

  manifest.push({
    source: file,
    slug,
    original: { width: metadata.width, height: metadata.height },
    generated: {
      webp: [`${slug}-640.webp`, `${slug}-1000.webp`],
      png: `${slug}-1000.png`,
      width: 1000,
      height: 667,
    },
  });
}

await writeFile(
  path.join(outputDir, "manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
  "utf8",
);

console.log(`Processados ${manifest.length} assets em ${outputDir}`);
