import { useState } from "react";
import type { FAQGroup } from "../../data/faqs";

export function FAQAccordion({ groups }: { groups: FAQGroup[] }) {
  const [openKey, setOpenKey] = useState<string | null>(groups[0]?.items[0]?.question ?? null);

  return (
    <div className="faq-groups">
      {groups.map((group, groupIndex) => (
        <section className="faq-group" key={group.title}>
          <h3>{group.title}</h3>
          <div className="faq-list">
            {group.items.map((item, itemIndex) => {
              const isOpen = openKey === item.question;
              const questionId = `faq-question-${groupIndex}-${itemIndex}`;
              const answerId = `faq-answer-${groupIndex}-${itemIndex}`;
              return (
                <article className={`faq-item ${isOpen ? "is-open" : ""}`} key={item.question}>
                  <button
                    aria-controls={answerId}
                    aria-expanded={isOpen}
                    className="faq-item__question"
                    id={questionId}
                    onClick={() =>
                      setOpenKey(isOpen ? null : item.question)
                    }
                    type="button"
                  >
                    <span>{item.question}</span>
                    <span>{isOpen ? "−" : "+"}</span>
                  </button>
                  <div
                    aria-labelledby={questionId}
                    className="faq-item__answer"
                    id={answerId}
                    role="region"
                  >
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
