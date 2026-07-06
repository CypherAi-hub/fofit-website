import assert from "node:assert/strict";
import http from "node:http";
import https from "node:https";
import { URL } from "node:url";
import { legalRoutes, placeholderPatterns, shellPatterns } from "./legal-route-expectations.mjs";

const baseUrls = (process.env.FOFIT_LIVE_BASE_URLS ?? "https://fofit.app,https://www.fofit.app")
  .split(",")
  .map((value) => value.trim().replace(/\/$/, ""))
  .filter(Boolean);

function fetchText(url, redirects = []) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const client = parsed.protocol === "http:" ? http : https;
    const request = client.get(
      parsed,
      {
        headers: {
          "User-Agent": "FoFit legal route verifier",
        },
      },
      (response) => {
        const statusCode = response.statusCode ?? 0;
        const location = response.headers.location;

        if (statusCode >= 300 && statusCode < 400 && location) {
          if (redirects.length >= 6) {
            reject(new Error(`Too many redirects for ${url}`));
            response.resume();
            return;
          }

          const nextUrl = new URL(location, parsed).toString();
          response.resume();
          fetchText(nextUrl, [...redirects, url]).then(resolve, reject);
          return;
        }

        const chunks = [];
        response.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
        response.on("end", () => {
          resolve({
            body: Buffer.concat(chunks).toString("utf8"),
            finalUrl: url,
            headers: response.headers,
            redirects,
            statusCode,
          });
        });
      },
    );

    request.setTimeout(15000, () => {
      request.destroy(new Error(`Timed out fetching ${url}`));
    });
    request.on("error", reject);
  });
}

function assertContains(body, expectation, label) {
  if (typeof expectation === "string") {
    assert.ok(body.includes(expectation), `${label} missing "${expectation}"`);
    return;
  }

  assert.match(body, expectation, `${label} missing ${expectation}`);
}

const failures = [];

for (const baseUrl of baseUrls) {
  for (const route of legalRoutes) {
    const requestedUrl = `${baseUrl}${route.path}`;

    try {
      const result = await fetchText(requestedUrl);
      const contentType = String(result.headers["content-type"] ?? "");

      assert.equal(result.statusCode, 200, `${requestedUrl} returned ${result.statusCode}`);
      assert.match(contentType, /text\/html/i, `${requestedUrl} content-type ${contentType}`);
      assert.ok(result.body.length > 1000, `${requestedUrl} returned an unexpectedly short body`);

      for (const expectation of route.expectations) {
        assertContains(result.body, expectation, requestedUrl);
      }

      for (const pattern of placeholderPatterns) {
        assert.doesNotMatch(result.body, pattern, `${requestedUrl} contains launch placeholder ${pattern}`);
      }

      for (const pattern of shellPatterns) {
        assert.doesNotMatch(result.body, pattern, `${requestedUrl} is still serving the app shell pattern ${pattern}`);
      }

      console.log(
        `PASS ${route.label}: ${requestedUrl} -> ${result.finalUrl} (${result.statusCode}, ${result.body.length} bytes)`,
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      failures.push(`${requestedUrl}: ${message}`);
      console.error(`FAIL ${route.label}: ${message}`);
    }
  }
}

if (failures.length) {
  console.error("\nLive legal route verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("PASS: live legal/support/delete routes return raw legal HTML");
