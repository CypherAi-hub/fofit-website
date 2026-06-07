/**
 * FoFit marketplace SEARCH + RANKING engine — pure, zero-dependency, deterministic.
 *
 * Modeled on Amazon's documented TWO-STAGE search (relevance gates products IN, then signals
 * rank WITHIN) — but using ONLY signals FoFit honestly owns. FoFit is affiliate-outbound: no
 * checkout, so NO conversion / sales-velocity / real reviews / live price feed. Those Amazon
 * factors are deliberately excluded from ranking (feeding curated ratings/deal scores would
 * resurrect the fake-data problem). What we own: the product TEXT (title/brand/tags/goalFit/
 * category) + the query, plus human-curated editorial boosts and, on mobile, the user's goals.
 *
 * Pure TS by design: NO react-native import, NO require(), NO Math.random/Date.now in the
 * ranking path — so RN/Hermes and the Vite web SPA bundle it identically and agree on order.
 * The same module is shared by the app and the website.
 */

export type SearchableProduct = {
  id: string;
  title: string;
  brand: string;
  tags: string[];
  goalFit: string[];
  category: string;
  categoryLabel: string;
  description: string;
  /** Editorial rank weight (curated, NOT measured data). */
  rankBoost: number;
  isFeatured: boolean;
  /** Optional 0..1 commission tier — a tiny, capped tie-breaker only (never reorders relevance). */
  commissionTier?: number;
};

export type SearchContext = {
  /** Mobile passes the user's goals for intent fit; the anonymous web SPA omits this. */
  userGoals?: string[];
  /** 1–12; enables a small seasonality nudge. Omit to disable (kept out of the ranking path so
   *  callers control determinism — pass a fixed month, never let the engine read the clock). */
  month?: number;
};

export type SearchResult = {
  product: SearchableProduct;
  score: number;
  /** "browse" (empty query) or "query" (relevance-led). */
  mode: "browse" | "query";
};

// ── Tokenization ─────────────────────────────────────────────────────────────────────
const STOPWORDS = new Set([
  "the", "a", "an", "and", "or", "for", "with", "to", "of", "in", "on", "your", "you",
  // catalog-useless bare words (every product is "fitness/gym/workout")
  "fitness", "gym", "workout", "exercise",
]);

/** Curated synonym/abbreviation map, applied at BOTH index and query time (higher precision
 *  than a stemmer for a known fitness catalog). Keys are post-singularized tokens. */
const SYNONYMS: Record<string, string[]> = {
  db: ["dumbbell"],
  kb: ["kettlebell"],
  pre: ["preworkout"],
  preworkout: ["pre", "supplement"],
  whey: ["protein", "supplement"],
  bcaa: ["protein", "supplement", "amino"],
  eaa: ["protein", "supplement", "amino"],
  creatine: ["supplement"],
  band: ["resistance"],
  strap: ["lifting", "accessory"],
  sleeve: ["lifting", "accessory"],
  wrap: ["lifting", "accessory"],
  treadmill: ["cardio"],
  bike: ["cardio"],
  rower: ["cardio", "rowing"],
  mat: ["yoga"],
};

function singularize(t: string): string {
  return t.length > 3 && t.endsWith("s") ? t.slice(0, -1) : t;
}

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map(singularize)
    .filter((t) => t.length > 0 && !STOPWORDS.has(t));
}

function expandSynonyms(tokens: string[]): string[] {
  const out = new Set(tokens);
  for (const t of tokens) for (const syn of SYNONYMS[t] ?? []) out.add(syn);
  return [...out];
}

// ── Fuzzy (bounded edit distance) ──────────────────────────────────────────────────────
function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (Math.abs(m - n) > 2) return 99; // early out — we only care about small distances
  const dp = Array.from({ length: m + 1 }, (_, i) => i);
  for (let j = 1; j <= n; j++) {
    let prev = dp[0];
    dp[0] = j;
    for (let i = 1; i <= m; i++) {
      const tmp = dp[i];
      dp[i] = Math.min(
        dp[i] + 1,
        dp[i - 1] + 1,
        prev + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
      prev = tmp;
    }
  }
  return dp[m];
}

/** exact = 1, prefix = 0.8, fuzzy = 0.5, none = 0. Fuzzy disabled for short (<=3) terms. */
function termMatchStrength(queryTerm: string, docTerm: string): number {
  if (queryTerm === docTerm) return 1;
  if (docTerm.startsWith(queryTerm) || queryTerm.startsWith(docTerm)) return 0.8;
  if (queryTerm.length > 3) {
    const maxEdits = Math.max(1, Math.floor(queryTerm.length * 0.2));
    if (levenshtein(queryTerm, docTerm) <= maxEdits) return 0.5;
  }
  return 0;
}

// ── Field corpus + BM25-lite ───────────────────────────────────────────────────────────
const FIELD_WEIGHTS: Record<string, number> = {
  title: 6,
  brand: 4,
  tags: 3,
  goalFit: 2.5,
  categoryLabel: 2,
  description: 1,
};
const K1 = 1.2;
const B = 0.75;

type FieldTokens = Record<keyof typeof FIELD_WEIGHTS, string[]>;

function fieldTokens(p: SearchableProduct): FieldTokens {
  return {
    title: expandSynonyms(tokenize(p.title)),
    brand: expandSynonyms(tokenize(p.brand)),
    tags: expandSynonyms(tokenize(p.tags.join(" "))),
    goalFit: expandSynonyms(tokenize(p.goalFit.join(" "))),
    categoryLabel: expandSynonyms(tokenize(p.categoryLabel)),
    description: expandSynonyms(tokenize(p.description)),
  };
}

type Index = {
  docs: { product: SearchableProduct; fields: FieldTokens }[];
  // per field: document frequency of each term + average field length
  df: Record<string, Map<string, number>>;
  avgLen: Record<string, number>;
};

function buildIndex(records: SearchableProduct[]): Index {
  const docs = records.map((product) => ({ product, fields: fieldTokens(product) }));
  const df: Index["df"] = {} as Index["df"];
  const avgLen: Index["avgLen"] = {} as Index["avgLen"];
  for (const field of Object.keys(FIELD_WEIGHTS)) {
    const map = new Map<string, number>();
    let total = 0;
    for (const d of docs) {
      const toks = d.fields[field as keyof FieldTokens];
      total += toks.length;
      for (const t of new Set(toks)) map.set(t, (map.get(t) ?? 0) + 1);
    }
    df[field] = map;
    avgLen[field] = docs.length ? total / docs.length : 0;
  }
  return { docs, df, avgLen };
}

function idf(N: number, dft: number): number {
  // floored so common terms in a tiny corpus never go negative
  return Math.max(0, Math.log(1 + (N - dft + 0.5) / (dft + 0.5)));
}

/** BM25-lite relevance of one doc for the (synonym-expanded) query terms, summed over fields. */
function relevanceScore(
  queryTerms: string[],
  doc: Index["docs"][number],
  index: Index,
): number {
  const N = index.docs.length;
  let score = 0;
  for (const field of Object.keys(FIELD_WEIGHTS) as (keyof typeof FIELD_WEIGHTS)[]) {
    const toks = doc.fields[field];
    if (toks.length === 0) continue;
    const len = toks.length;
    const weight = FIELD_WEIGHTS[field];
    for (const q of queryTerms) {
      // best match strength of this query term against any token in the field, + its frequency
      let strength = 0;
      let tf = 0;
      for (const t of toks) {
        const s = termMatchStrength(q, t);
        if (s > 0) {
          tf += s; // weighted term frequency (exact counts more than fuzzy)
          if (s > strength) strength = s;
        }
      }
      if (tf === 0) continue;
      const dft = index.df[field].get(q) ?? 1;
      const idfq = idf(N, dft) || 0.1; // tiny floor so a present term always contributes
      const norm = (tf * (K1 + 1)) / (tf + K1 * (1 - B + B * (len / (index.avgLen[field] || 1))));
      score += weight * idfq * norm * strength;
    }
  }
  return score;
}

// ── Ranking signals (honest, owned) ─────────────────────────────────────────────────────
function normRankBoost(rankBoost: number): number {
  // catalog rankBoost spans ~10..100; normalize to 0..1
  return Math.max(0, Math.min(1, rankBoost / 100));
}

function intentFit(p: SearchableProduct, userGoals?: string[]): number {
  if (!userGoals || userGoals.length === 0) return 0;
  const goals = new Set(userGoals.map((g) => g.toLowerCase()));
  const hay = new Set([...p.goalFit, ...p.tags].map((x) => x.toLowerCase()));
  let hits = 0;
  for (const g of goals) if (hay.has(g)) hits += 1;
  return Math.min(1, hits / Math.max(1, goals.size));
}

const SEASONAL: Record<string, number[]> = {
  // category -> months (1-12) where it gets a small nudge
  recovery: [6, 7, 8], // cold plunge / electrolytes in summer
  home_gym: [1, 2], // January home-gym resolutions
  training: [1, 2],
};
function seasonality(p: SearchableProduct, month?: number): number {
  if (!month) return 0;
  return SEASONAL[p.category]?.includes(month) ? 1 : 0;
}

// weights / caps (see spec)
const BROWSE_W = { intent: 3, rankBoost: 2, season: 0.5, commission: 0.5 };
const QUERY_K = 0.4; // rankBoost influence
const QUERY_FEATURED = 0.15;
const QUERY_INTENT = 0.3;
const QUERY_COMMISSION = 0.1;
const QUERY_MULTIPLIER_CAP = 1.6; // a featured/high-commission weak match can never outrank a strong match

/**
 * Search + rank. Empty query → BROWSE mode (curation + intent + seasonality). Non-empty →
 * QUERY mode (relevance gates; curation only nudges within, hard-capped). Deterministic:
 * sort by score desc, tiebreak by id.
 */
export function searchProducts(
  query: string,
  records: SearchableProduct[],
  ctx: SearchContext = {},
): SearchResult[] {
  const index = buildIndex(records);
  const trimmed = query.trim();

  if (trimmed.length === 0) {
    // BROWSE: additive composite, no relevance term.
    const results: SearchResult[] = index.docs.map(({ product }) => {
      const score =
        BROWSE_W.intent * intentFit(product, ctx.userGoals) +
        BROWSE_W.rankBoost * normRankBoost(product.rankBoost) +
        BROWSE_W.season * seasonality(product, ctx.month) +
        BROWSE_W.commission * Math.min(0.05, product.commissionTier ?? 0);
      return { product, score, mode: "browse" as const };
    });
    return sortResults(results);
  }

  // QUERY: relevance is the gate + dominant term.
  const queryTerms = expandSynonyms(tokenize(trimmed));
  const results: SearchResult[] = [];
  for (const doc of index.docs) {
    const relevance = relevanceScore(queryTerms, doc, index);
    if (relevance <= 0) continue; // relevance GATE — no text match, not in results
    const p = doc.product;
    const multiplier = Math.min(
      QUERY_MULTIPLIER_CAP,
      1 +
        QUERY_K * normRankBoost(p.rankBoost) +
        (p.isFeatured ? QUERY_FEATURED : 0) +
        QUERY_INTENT * intentFit(p, ctx.userGoals) +
        QUERY_COMMISSION * Math.min(0.05, p.commissionTier ?? 0),
    );
    results.push({ product: p, score: relevance * multiplier, mode: "query" });
  }
  return sortResults(results);
}

function sortResults(results: SearchResult[]): SearchResult[] {
  return results.sort(
    (a, b) => b.score - a.score || a.product.id.localeCompare(b.product.id),
  );
}
