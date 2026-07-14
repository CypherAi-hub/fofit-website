import fs from "node:fs";
import path from "node:path";

const roots = [
  "src/pages",
  "src/components/marketing",
  "src/components/layout",
  "src/data",
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
  /\bthe cure\b/gi,
  /\bguaranteed results?\b/gi,
  /\btrain through (?:the )?pain\b/gi,
  /\bno pain,? no gain\b/gi,
  /\bsafe for (?:everyone|all)\b/gi,
  /\bboost (?:immunity|metabolism)\b/gi,
  /\b(?:balance|reset) hormones\b/gi,
  /\bspot reduce\b/gi,
];

const requiredFooterCopy = [
  "FoFit is a general fitness and wellness app and does not provide medical",
  "substitute for advice from a registered dietitian",
  "Consult a qualified",
  "healthcare professional before starting any new program",
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

const footerPath = path.resolve("src/components/layout/Footer.tsx");
const footerCopy = fs.readFileSync(footerPath, "utf8");
for (const requiredCopy of requiredFooterCopy) {
  if (!footerCopy.includes(requiredCopy)) {
    findings.push({
      filePath: footerPath,
      pattern: `missing required disclaimer: ${requiredCopy}`,
      count: 1,
    });
  }
}

if (findings.length) {
  console.error("Found website copy compliance issues:");
  for (const finding of findings) {
    console.error(`- ${path.relative(process.cwd(), finding.filePath)} :: /${finding.pattern}/ x${finding.count}`);
  }
  process.exit(1);
}

console.log("PASS: website copy and required fitness/nutrition disclaimers are compliant");
