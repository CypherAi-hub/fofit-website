import { useState } from "react";
import type { FAQGroup } from "../../data/faqs";

export function FAQAccordion({ groups }: { groups: FAQGroup[] }) {
  const [openKey, setOpenKey] = useState<string | null>(groups[0]?.items[0]?.question ?? null);

  return (
    <div className="faq-groups">
      {groups.map((group) => (
        <section className="faq-group" key={group.title}>
          <h3>{group.title}</h3>
          <div className="faq-list">
            {group.items.map((item) => {
              const isOpen = openKey === item.question;
              return (
                <article className={`faq-item ${isOpen ? "is-open" : ""}`} key={item.question}>
                  <button
                    className="faq-item__question"
                    onClick={() =>
                      setOpenKey(isOpen ? null : item.question)
                    }
                    type="button"
                  >
                    <span>{item.question}</span>
                    <span>{isOpen ? "−" : "+"}</span>
                  </button>
                  <div className="faq-item__answer">
                    <p>{item.answer}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
