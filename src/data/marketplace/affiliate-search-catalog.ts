/**
 * FoFit Marketplace — affiliate SEARCH/BROWSE catalog (eBay Partner Network + Amazon).
 *
 * Distinct from amazon-affiliate.ts (which holds REAL pasted SiteStripe links to specific
 * products). THIS layer holds CONSTRUCTED search/browse links — the EPN-sanctioned model
 * (you build the tracking URL with campid + customid) and Amazon's permitted tagged-search
 * model (?k=...&tag=...). Tapping a card opens the merchant's live search results, so there's
 * NO fabricated price (honest — defer to merchant) and the links never go stale like a single
 * listing would.
 *
 * Source: 2 EPN/SiteStripe batches generated + verified by the owner (campid 5339155456,
 * Amazon tag shopfofit-20). customIds are normalized to [a-z0-9] (a couple came out of the
 * link generator with stray spaces/typos — fixed here; a customId with a space is invalid).
 *
 * Builders reproduce the exact verified URL shapes. To add a category later: append one row
 * to AFFILIATE_SEARCH_CATALOG — the URLs and the product card derive automatically.
 */

// ── eBay Partner Network config (one campaign, applied to every link) ────────────────
export const EBAY_CAMPAIGN_ID = "5339155456";
export const EBAY_PUBLISHER_ID = "7370817";
const EBAY_ROTATION_ID = "711-53200-19255-0"; // mkrid (US marketplace)
const EBAY_MKCID = "1";
const EBAY_TOOL_ID = "10001";
const EBAY_SITE_ID = "0"; // eBay US

// ── Amazon Associates config (tagged search is permitted; pasted SiteStripe lives elsewhere) ──
export const AMAZON_SEARCH_TAG = "shopfofit-20";

/** FTC-aligned disclosures (rendered on affiliate surfaces). */
export const EBAY_AFFILIATE_DISCLOSURE =
  "FoFit may earn a commission from eBay purchases, at no extra cost to you.";
export const AMAZON_SEARCH_DISCLOSURE =
  "As an Amazon Associate, FoFit earns from qualifying purchases.";

/** Build the exact EPN tracking URL for an eBay search. customId must be [a-z0-9]. */
export function buildEbaySearchUrl(query: string, customId: string): string {
  const q = encodeURIComponent(query.trim()).replace(/%20/g, "+");
  return (
    `https://www.ebay.com/sch/i.html?_nkw=${q}` +
    `&mkcid=${EBAY_MKCID}&mkrid=${EBAY_ROTATION_ID}&siteid=${EBAY_SITE_ID}` +
    `&campid=${EBAY_CAMPAIGN_ID}&customid=${customId}&toolid=${EBAY_TOOL_ID}&mkevt=1`
  );
}

/** Build the Amazon tagged-search URL (shopfofit-20). */
export function buildAmazonSearchUrl(query: string): string {
  const q = encodeURIComponent(query.trim()).replace(/%20/g, "+");
  return `https://www.amazon.com/s?k=${q}&tag=${AMAZON_SEARCH_TAG}`;
}

/** Normalize a customId to the owner's own spec (letters + numbers only). */
export function normalizeCustomId(raw: string): string {
  return raw.toLowerCase().replace(/[^a-z0-9]/g, "");
}

type CatalogCategory =
  | "training"
  | "recovery"
  | "nutrition"
  | "meal_prep"
  | "supplements"
  | "apparel"
  | "home_gym"
  | "athlete_gear";

/**
 * One browsable category. `ebayQuery` is the eBay `_nkw`; `amazonQuery` defaults to it but is
 * stored separately where the owner's two batches used different search terms (e.g. eBay
 * "weekly pill organizer" vs Amazon "weekly pill organizer gym"). `amazon: false` = eBay-only
 * (batch 1). `ebayCustomId` is pre-normalized here.
 */
export type AffiliateSearchEntry = {
  id: string;
  name: string;
  category: CatalogCategory;
  ebayQuery: string;
  ebayCustomId: string;
  amazon: boolean;
  amazonQuery?: string;
};

// raw helper keeps rows compact; runs normalizeCustomId at module load.
function row(
  id: string,
  name: string,
  category: CatalogCategory,
  ebayQuery: string,
  ebayCustomId: string,
  amazon = false,
  amazonQuery?: string,
): AffiliateSearchEntry {
  return { id: `search-${id}`, name, category, ebayQuery, ebayCustomId: normalizeCustomId(ebayCustomId), amazon, amazonQuery };
}

export const AFFILIATE_SEARCH_CATALOG: AffiliateSearchEntry[] = [
  // ── Batch 1 — eBay only ──────────────────────────────────────────────────────────
  row("adjustable-dumbbells", "Adjustable Dumbbells", "home_gym", "adjustable dumbbells", "fofitmarketplaceequipmentadjustabledumbbells"),
  row("resistance-bands", "Resistance Bands", "training", "resistance bands", "fofitmarketplaceequipmentresistancebands"),
  row("pull-up-bar", "Pull-Up Bar", "training", "pull up bar", "fofitmarketplaceequipmentpullupbar"),
  row("ankle-weights", "Ankle Weights", "training", "ankle weights", "fofitmarketplaceequipmentankleweights"),
  row("jump-rope", "Jump Rope", "training", "jump rope", "fofitmarketplaceequipmentjumprope"),
  row("yoga-mat", "Yoga Mat", "training", "yoga mat", "fofitmarketplaceequipmentyogamat"),
  row("kettlebell", "Kettlebell", "training", "kettlebell", "fofitmarketplaceequipmentkettlebell"),
  row("battle-rope", "Battle Rope", "training", "battle rope", "fofitmarketplaceequipmentbattlerope"),
  row("ab-roller-wheel", "Ab Roller Wheel", "training", "ab roller wheel", "fofitmarketplaceequipmentabrollerwheel"),
  row("dip-station", "Dip Station", "home_gym", "dip station", "fofitmarketplaceequipmentdipstation"),
  row("adjustable-weight-bench", "Adjustable Weight Bench", "home_gym", "adjustable weight bench", "fofitmarketplaceequipmentweightbench"),
  row("medicine-ball", "Medicine Ball", "training", "medicine ball", "fofitmarketplaceequipmentmedicineball"),
  row("speed-jump-rope", "Speed Jump Rope", "training", "speed jump rope", "fofitmarketplaceequipmentspeedjumprope"),
  row("balance-board", "Balance Board", "training", "balance board", "fofitmarketplaceequipmentbalanceboard"),
  row("olympic-weight-plates", "Olympic Weight Plates", "home_gym", "olympic weight plates", "fofitmarketplaceequipmentweightplates"),
  row("olympic-barbell", "Olympic Barbell", "home_gym", "olympic barbell", "fofitmarketplaceequipmentbarbell"),
  row("pull-up-resistance-band", "Pull-Up Resistance Band", "training", "pull up resistance band", "fofitmarketplaceequipmentpullupband"),
  row("foam-roller", "Foam Roller", "recovery", "foam roller", "fofitmarketplacerecoveryfoamroller"),
  row("massage-gun", "Massage Gun", "recovery", "massage gun", "fofitmarketplacerecoverymassagegun"),
  row("ice-bath-cold-plunge", "Ice Bath / Cold Plunge", "recovery", "ice bath tub cold plunge", "fofitmarketplacerecoveryicebathtub"),
  row("foot-massager", "Foot Massager", "recovery", "foot massager electric", "fofitmarketplacerecoveryfootmassager"),
  row("lacrosse-ball", "Lacrosse Ball", "recovery", "lacrosse ball massage", "fofitmarketplacerecoverylacrosseball"),
  row("massage-stick", "Massage Stick", "recovery", "massage stick roller", "fofitmarketplacerecoverymassagestick"),
  row("trigger-point-roller", "Trigger Point Roller", "recovery", "trigger point roller", "fofitmarketplacerecoverytriggerpointroller"),
  row("sauna-blanket", "Sauna Blanket", "recovery", "sauna blanket", "fofitmarketplacewellnesssaunablanket"),
  row("posture-corrector", "Posture Corrector", "recovery", "posture corrector", "fofitmarketplacewellnessposturecorrector"),
  row("volleyball-knee-pads", "Volleyball Knee Pads", "athlete_gear", "volleyball knee pads", "fofitmarketplacevolleyballkneepads"),
  row("compression-socks", "Compression Socks", "apparel", "compression socks running", "fofitmarketplaceapparelcompressionsocks"),
  row("gym-gloves", "Gym Gloves", "apparel", "gym gloves workout", "fofitmarketplaceapparelgymgloves"),
  row("wrist-wraps", "Wrist Wraps", "apparel", "wrist wraps weightlifting", "fofitmarketplaceapparelwristwraps"),
  row("lifting-belt", "Lifting Belt", "apparel", "weightlifting belt", "fofitmarketplaceapparelliftingbelt"),
  row("knee-sleeves", "Knee Sleeves", "athlete_gear", "knee sleeves powerlifting", "fofitmarketplaceapparelkneesleeves"),
  row("elbow-sleeves", "Elbow Sleeves", "athlete_gear", "elbow sleeves gym", "fofitmarketplaceapparelelbowsleeves"),
  row("sports-headband", "Sports Headband", "apparel", "sports headband sweat", "fofitmarketplaceapparelsportsheadband"),
  row("gym-bag-duffel", "Gym Bag / Duffel", "apparel", "gym bag duffel", "fofitmarketplaceapparelgymbagduffel"),
  row("meal-prep-containers", "Meal Prep Containers", "meal_prep", "meal prep containers", "fofitmarketplacenutritionmealprepcontainers"),
  row("shaker-bottle", "Shaker Bottle", "nutrition", "shaker bottle", "fofitmarketplacenutritionshakerbottle"),
  row("insulated-water-bottle", "Insulated Water Bottle", "nutrition", "insulated water bottle", "fofitmarketplacehydrationwaterbottle"),
  row("hydration-running-vest", "Hydration Running Vest", "athlete_gear", "hydration vest running", "fofitmarketplacehydrationrunningvest"),
  row("swimming-goggles", "Swimming Goggles", "athlete_gear", "swimming goggles", "fofitmarketplacesportsswimminggoggles"),
  row("running-belt", "Running Belt", "athlete_gear", "running belt phone holder", "fofitmarketplacesportsrunningbelt"),
  row("folding-treadmill", "Folding Treadmill", "home_gym", "folding treadmill", "fofitmarketplacecardiotreadmill"),
  row("stationary-bike", "Stationary Bike", "home_gym", "exercise stationary bike", "fofitmarketplacecardiostatbike"),
  row("rowing-machine", "Rowing Machine", "home_gym", "rowing machine exercise", "fofitmarketplacecardiorowingmachine"),

  // ── Batch 2 — eBay + Amazon (amazonQuery only where it differs from the eBay term) ──
  row("yoga-block", "Yoga Block", "training", "yoga blocks", "fofitmarketplaceequipmentyogablocks", true),
  row("yoga-strap", "Yoga Strap", "training", "yoga strap stretching", "fofitmarketplaceequipmentyogastrap", true),
  row("yoga-wheel", "Yoga Wheel", "training", "yoga wheel", "fofitmarketplaceequipmentyogawheel", true),
  row("stretching-mat", "Stretching Mat", "training", "stretching mat thick", "fofitmarketplaceequipmentstretchingmat", true),
  row("ankle-brace", "Ankle Brace", "athlete_gear", "ankle brace support", "fofitmarketplaceapparelanklebrace", true),
  row("knee-brace", "Knee Brace", "athlete_gear", "knee brace support", "fofitmarketplaceapparelkneebrace", true),
  row("shoulder-brace", "Shoulder Brace", "athlete_gear", "shoulder brace support", "fofitmarketplaceapparelshoulderbrace", true),
  row("back-brace", "Back Brace", "athlete_gear", "back brace lower back support", "fofitmarketplaceapparelbackbrace", true),
  row("plantar-fasciitis-socks", "Plantar Fasciitis Socks", "athlete_gear", "plantar fasciitis compression socks", "fofitmarketplaceapparelplantarsocks", true),
  row("running-shoes", "Running Shoes", "apparel", "mens running shoes", "fofitmarketplacesportsrunningshoes", true),
  row("trail-running-shoes", "Trail Running Shoes", "apparel", "trail running shoes", "fofitmarketplacesportstrailshoes", true),
  row("sports-sunglasses", "Sports Sunglasses", "athlete_gear", "sports sunglasses running", "fofitmarketplacesportssunglasses", true),
  row("gps-running-watch", "GPS Running Watch", "athlete_gear", "GPS running watch", "fofitmarketplacesportsgpswatch", true),
  row("reflective-running-vest", "Reflective Running Vest", "apparel", "reflective running vest", "fofitmarketplacesportsreflectvest", true),
  row("cycling-helmet", "Cycling Helmet", "athlete_gear", "cycling helmet road bike", "fofitmarketplacesportscyclinghelmet", true),
  row("cycling-gloves", "Cycling Gloves", "apparel", "cycling gloves padded", "fofitmarketplacesportscyclinggloves", true),
  row("bike-lock", "Bike Lock", "athlete_gear", "bike lock heavy duty", "fofitmarketplacesportsbikelock", true),
  row("bike-bottle-cage", "Bike Water Bottle Cage", "athlete_gear", "bike water bottle cage", "fofitmarketplacesportsbottlecage", true),
  row("swim-cap", "Swim Cap", "athlete_gear", "swim cap silicone", "fofitmarketplacesportsswimcap", true),
  row("kickboard", "Kickboard", "athlete_gear", "swim kickboard", "fofitmarketplacesportsswimkickboard", true),
  row("pull-buoy", "Pull Buoy", "athlete_gear", "swim pull buoy", "fofitmarketplacesportspullbuoy", true),
  row("compression-leggings", "Compression Leggings", "apparel", "womens compression leggings workout", "fofitmarketplaceapparelleggings", true),
  row("athletic-shorts", "Athletic Shorts", "apparel", "mens athletic shorts gym", "fofitmarketplaceapparelathleticshorts", true),
  row("compression-shirt", "Compression Shirt", "apparel", "mens compression shirt workout", "fofitmarketplaceapparelcompressionshirt", true),
  row("sports-bra", "Sports Bra", "apparel", "high impact sports bra", "fofitmarketplaceapparelsportsbra", true),
  row("gym-tank-top", "Gym Tank Top", "apparel", "mens gym tank top muscle", "fofitmarketplaceapparelgymtanktop", true),
  row("workout-hoodie", "Workout Hoodie", "apparel", "mens workout hoodie gym", "fofitmarketplaceapparelworkouthoodie", true),
  row("protein-powder", "Protein Powder", "supplements", "whey protein powder", "fofitmarketplacenutritionwheyprotein", true),
  row("pre-workout", "Pre-Workout", "supplements", "pre workout supplement", "fofitmarketplacenutritionpreworkout", true),
  row("creatine", "Creatine", "supplements", "creatine monohydrate", "fofitmarketplacenutritioncreatine", true),
  row("bcaas", "BCAAs", "supplements", "BCAA amino acids supplement", "fofitmarketplacenutritionbcaas", true),
  row("electrolyte-powder", "Electrolyte Powder", "supplements", "electrolyte powder drink mix", "fofitmarketplacenutritionelectrolytes", true),
  row("protein-bars", "Protein Bars", "supplements", "protein bars high protein", "fofitmarketplacenutritionproteinbars", true),
  row("collagen-peptides", "Collagen Peptides", "supplements", "collagen peptides powder", "fofitmarketplacenutritioncollagen", true),
  row("pill-organizer", "Pill Organizer", "meal_prep", "weekly pill organizer", "fofitmarketplacenutritionpillorganizer", true, "weekly pill organizer gym"),
  row("sleep-mask", "Sleep Mask", "recovery", "sleep mask blackout", "fofitmarketplacewellnesssleepmask", true),
  row("magnesium-supplement", "Magnesium Supplement", "supplements", "magnesium glycinate sleep", "fofitmarketplacewellnessmagnesium", true),
  row("percussive-therapy-device", "Percussive Therapy Device", "recovery", "percussive therapy device muscle", "fofitmarketplacerecoverypercussive", true),
  row("cold-therapy-ice-pack", "Cold Therapy Ice Pack", "recovery", "reusable ice pack cold therapy", "fofitmarketplacerecoveryicepack", true),
  row("fitness-tracker", "Fitness Tracker / Smart Band", "athlete_gear", "fitness tracker smart band", "fofitmarketplacetechfitnesstracker", true),
  row("smart-scale", "Smart Scale", "athlete_gear", "smart body weight scale bluetooth", "fofitmarketplacetechsmartscale", true),
  row("sport-earbuds", "Wireless Earbuds (Sport)", "athlete_gear", "wireless earbuds sport waterproof", "fofitmarketplacetechsportearbuds", true),
  row("armband-phone-holder", "Arm Band Phone Holder", "athlete_gear", "armband phone holder running", "fofitmarketplacetecharmband", true),
  row("squat-rack", "Power Rack / Squat Rack", "home_gym", "power rack squat rack home gym", "fofitmarketplaceequipmentsquatrack", true),
  row("cable-machine", "Cable Machine", "home_gym", "cable machine home gym", "fofitmarketplaceequipmentcablemachine", true),
  row("gym-flooring", "Gym Flooring / Rubber Mat", "home_gym", "gym rubber flooring mat tiles", "fofitmarketplaceequipmentgymmats", true),
  row("pull-up-tower", "Pull-Up Tower", "home_gym", "pull up tower home gym", "fofitmarketplaceequipmentpulluptower", true),
  row("suspension-trainer", "Suspension Trainer (TRX-style)", "athlete_gear", "suspension trainer", "fofitmarketplaceequipmentsusptrainer", true, "suspension trainer TRX gym"),
  row("parallette-bars", "Parallette Bars", "training", "parallette bars calisthenics", "fofitmarketplaceequipmentparallettes", true),
  row("agility-ladder", "Agility Ladder", "athlete_gear", "agility ladder speed training", "fofitmarketplacesportsagilityladder", true),
];

/** Count helper for the validator / "N categories" copy. */
export const AFFILIATE_SEARCH_CATALOG_COUNT = AFFILIATE_SEARCH_CATALOG.length;

/** Resolve the eBay (always) + Amazon (when present) links for one catalog entry. */
export function resolveAffiliateSearchLinks(entry: AffiliateSearchEntry): {
  ebayUrl: string;
  amazonUrl: string | null;
} {
  return {
    ebayUrl: buildEbaySearchUrl(entry.ebayQuery, entry.ebayCustomId),
    amazonUrl: entry.amazon ? buildAmazonSearchUrl(entry.amazonQuery ?? entry.ebayQuery) : null,
  };
}
