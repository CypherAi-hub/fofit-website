import type { ReactNode } from "react";
import { Revealer } from "../motion/Revealer";
import type { MarketingImage } from "../../data/future-homepage";

export type RouteStat = {
  value: string;
  label: string;
  detail: string;
};

export type RouteFeatureRow = {
  label: string;
  title?: string;
  detail: string;
};

export type RouteCard = {
  label: string;
  title: string;
  detail?: string;
  image?: MarketingImage;
};

type RoutePhoneClusterItem = {
  image: MarketingImage;
  label?: string;
  treatment?: "phone" | "scene" | "mark";
};

export function RoutePhoneCluster({
  images,
  label,
}: {
  images: RoutePhoneClusterItem[];
  label?: string;
}) {
  return (
    <div className="route-phone-cluster" aria-label={label}>
      {images.map((item, index) => (
        <figure
          className={`route-phone-cluster__item route-phone-cluster__item--${
            item.treatment ?? "phone"
          }`}
          key={`${item.image.src}-${index}`}
        >
          <img alt={item.image.alt} src={item.image.src} />
          {item.label ? <figcaption>{item.label}</figcaption> : null}
        </figure>
      ))}
    </div>
  );
}

export function RouteSection({
  kicker,
  title,
  description,
  children,
  className = "",
}: {
  kicker?: string;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`route-section ${className}`.trim()}>
      <div className="container route-section__inner">
        <Revealer className="route-section__heading">
          {kicker ? <span>{kicker}</span> : null}
          <h2>{title}</h2>
          {description ? <p>{description}</p> : null}
        </Revealer>
        {children}
      </div>
    </section>
  );
}

export function RouteStatGrid({ stats }: { stats: RouteStat[] }) {
  return (
    <Revealer className="route-stat-grid" delay="1">
      {stats.map((stat) => (
        <article className="route-stat" key={stat.label}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
          <p>{stat.detail}</p>
        </article>
      ))}
    </Revealer>
  );
}

export function RouteFeatureLedger({ rows }: { rows: RouteFeatureRow[] }) {
  return (
    <Revealer className="route-feature-ledger" delay="1">
      {rows.map((row, index) => (
        <article className="route-feature-row" key={`${row.label}-${index}`}>
          <span>{row.label}</span>
          <div>
            {row.title ? <h3>{row.title}</h3> : null}
            <p>{row.detail}</p>
          </div>
        </article>
      ))}
    </Revealer>
  );
}

export function RouteCardGrid({ cards }: { cards: RouteCard[] }) {
  return (
    <Revealer className="route-card-grid" delay="1">
      {cards.map((card) => (
        <article className="route-proof-card" key={`${card.label}-${card.title}`}>
          {card.image ? (
            <div className="route-proof-card__media">
              <img alt={card.image.alt} src={card.image.src} />
            </div>
          ) : null}
          <span>{card.label}</span>
          <h3>{card.title}</h3>
          {card.detail ? <p>{card.detail}</p> : null}
        </article>
      ))}
    </Revealer>
  );
}

export function RouteSplitProof({
  kicker,
  title,
  description,
  media,
  rows,
  flip = false,
}: {
  kicker: string;
  title: ReactNode;
  description: ReactNode;
  media: ReactNode;
  rows: RouteFeatureRow[];
  flip?: boolean;
}) {
  return (
    <section className="route-section route-section--split">
      <div className={`container route-split ${flip ? "route-split--flip" : ""}`}>
        <Revealer className="route-split__copy">
          <span>{kicker}</span>
          <h2>{title}</h2>
          <p>{description}</p>
          <RouteFeatureLedger rows={rows} />
        </Revealer>
        <Revealer className="route-split__media" delay="1">
          {media}
        </Revealer>
      </div>
    </section>
  );
}
