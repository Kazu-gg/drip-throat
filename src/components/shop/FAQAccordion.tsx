"use client";

import { useId, useState } from "react";
import type { ProductFaqItem } from "@/lib/products";

type FAQAccordionProps = {
  items: ProductFaqItem[];
  title?: string;
  testId?: string;
};

export function FAQAccordion({
  items,
  title = "Frequently asked questions",
  testId = "product_faq_accordion",
}: FAQAccordionProps) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!items.length) return null;

  return (
    <section className="mt-10 border-t border-[var(--border-subtle)] pt-8" data-testid={testId}>
      <h2 className="font-body text-[11px] tracking-[0.28em] text-gold uppercase">{title}</h2>
      <div className="mt-4 divide-y divide-[var(--border-subtle)]">
        {items.map((item, index) => {
          const panelId = `${baseId}-panel-${index}`;
          const buttonId = `${baseId}-button-${index}`;
          const open = openIndex === index;
          return (
            <div key={item.question}>
              <h3>
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={open}
                  aria-controls={panelId}
                  data-testid={`product_faq_${index}_button`}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left font-body text-sm text-[var(--campaign-text)]"
                  onClick={() => setOpenIndex(open ? null : index)}
                >
                  <span>{item.question}</span>
                  <span className="text-gold" aria-hidden>
                    {open ? "−" : "+"}
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!open}
                className="pb-4 font-body text-sm leading-relaxed text-[var(--campaign-text)]/55"
                data-testid={`product_faq_${index}_panel`}
              >
                {item.answer}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
