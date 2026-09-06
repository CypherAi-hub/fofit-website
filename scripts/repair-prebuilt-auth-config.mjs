import { readFileSync, writeFileSync } from "node:fs";

// Emergency repair for the August production artifact. No values are logged.
const file = process.argv[2];
const url = process.env.VITE_SUPABASE_URL?.trim();
const key = process.env.VITE_SUPABASE_ANON_KEY?.trim();
if (!file || !url || !key) throw new Error("Bundle path and public Supabase configuration required");
if (new URL(url).protocol !== "https:") throw new Error("HTTPS Supabase URL required");
const source = readFileSync(file, "utf8");
const needle = 'const _j="",Sj="";';
if (source.split(needle).length !== 2) throw new Error("Unexpected bundle: refusing broad replacement");
const patched = source.replace(needle, `const _j=${JSON.stringify(url)},Sj=${JSON.stringify(key)};`)
  .replace('console.warn("[supabase] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY missing — auth will not work.");', "");
writeFileSync(file, patched);
console.log("Repaired public auth configuration; no page content changed.");
