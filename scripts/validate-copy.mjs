import fs from "node:fs";
import path from "node:path";

const roots = [
  "src/pages",
  "src/components/marketing",
];

const bannedPatterns = [
  /this page carries/gi,
  /the page now/gi,
  /the site now/gi,
  /should feel/gi,
  /this route helps/gi,
  /reads like/gi,
  /makes .* feel/gi,
  /ai-powered/gi,
  /smart platform/gi,
  /adaptive engine/gi,
  /seamless experience/gi,
  /holistic approach/gi,
];

const findings = [];

function scanFile(filePath) {
  const contents = fs.readFileSync(filePath, "utf8");

  for (const pattern of bannedPatterns) {
    const matches = contents.match(pattern);
    if (!matches) {
      continue;
    }

    findings.push({
      filePath,
      pattern: pattern.source,
      count: matches.length,
    });
  }
}

function scanDirectory(dirPath) {
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      scanDirectory(fullPath);
      continue;
    }

    if (entry.isFile() && /\.(ts|tsx)$/.test(entry.name)) {
      scanFile(fullPath);
    }
  }
}

for (const root of roots) {
  scanDirectory(path.resolve(root));
}

if (findings.length) {
  console.error("Found banned editorial-copy patterns:");
  for (const finding of findings) {
    console.error(`- ${path.relative(process.cwd(), finding.filePath)} :: /${finding.pattern}/ x${finding.count}`);
  }
  process.exit(1);
}

console.log("No banned editorial-copy patterns found.");
