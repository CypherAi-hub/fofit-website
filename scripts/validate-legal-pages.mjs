import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { legalRoutes, placeholderPatterns, shellPatterns } from "./legal-route-expectations.mjs";

const root = process.cwd();

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function assertContains(body, expectation, label) {
  if (typeof expectation === "string") {
    assert.ok(body.includes(expectation), `${label} missing "${expectation}"`);
    return;
  }

  assert.match(body, expectation, `${label} missing ${expectation}`);
}

for (const route of legalRoutes) {
  const relativeHtmlPath = `public${route.path}/index.html`;
  const body = read(relativeHtmlPath);

  for (const expectation of route.expectations) {
    assertContains(body, expectation, relativeHtmlPath);
  }

  for (const pattern of placeholderPatterns) {
    assert.doesNotMatch(body, pattern, `${relativeHtmlPath} contains launch placeholder ${pattern}`);
  }

  for (const pattern of shellPatterns) {
    assert.doesNotMatch(body, pattern, `${relativeHtmlPath} is serving the app shell pattern ${pattern}`);
  }
}

const vercelConfig = JSON.parse(read("vercel.json"));
const rewriteSources = vercelConfig.rewrites?.map((rewrite) => rewrite.source) ?? [];
const catchAllIndex = rewriteSources.indexOf("/(.*)");
assert.ok(catchAllIndex >= 0, "vercel.json missing SPA catch-all rewrite");

for (const route of legalRoutes) {
  const routeIndex = rewriteSources.indexOf(route.path);
  assert.ok(routeIndex >= 0, `vercel.json missing ${route.path} rewrite`);
  assert.ok(routeIndex < catchAllIndex, `${route.path} rewrite must run before /(.*) catch-all`);

  const rewrite = vercelConfig.rewrites[routeIndex];
  assert.equal(rewrite.destination, `${route.path}/index.html`, `${route.path} rewrite destination`);
}

const footerNav = read("src/data/nav.ts");
for (const route of legalRoutes) {
  assertContains(footerNav, `href: "${route.path}"`, `footer legal link ${route.path}`);
}

console.log("PASS: website static legal pages and Vercel route order are launch-ready");
