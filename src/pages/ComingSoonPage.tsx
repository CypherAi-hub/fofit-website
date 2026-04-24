import type { ReactNode } from "react";
import { PageHero } from "../components/layout/PageHero";
import { PageMeta } from "../components/layout/PageMeta";

type ComingSoonPageProps = {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  metaTitle: string;
  metaDescription: string;
};

export function ComingSoonPage({
  eyebrow,
  title,
  description,
  metaTitle,
  metaDescription,
}: ComingSoonPageProps) {
  return (
    <>
      <PageMeta description={metaDescription} title={metaTitle} />
      <PageHero
        actions={[
          { label: "Join the waitlist", intent: "waitlist" },
          { label: "Back to home", to: "/", variant: "secondary" },
        ]}
        compact
        description={description}
        eyebrow={eyebrow}
        title={title}
      />
    </>
  );
}

export function ShopPage() {
  return (
    <ComingSoonPage
      description="A curated shop for FoFit programs, founder gear, and partner kits is on the way. Join the waitlist and we'll hold a spot."
      eyebrow="Shop — coming soon"
      metaDescription="FoFit Shop is coming soon. Programs, gear, and partner kits tied to the training system."
      metaTitle="Shop | FoFit"
      title={
        <>
          Shop, <em>soon</em>.
        </>
      }
    />
  );
}

export function NutritionPage() {
  return (
    <ComingSoonPage
      description="Nutrition that stays attached to your training block is the next FoFit surface. Join the waitlist and be first in when it opens."
      eyebrow="Nutrition — coming soon"
      metaDescription="FoFit Nutrition is coming soon. Training-linked nutrition direction built into the same system."
      metaTitle="Nutrition | FoFit"
      title={
        <>
          Nutrition, <em>connected</em>.
        </>
      }
    />
  );
}
