import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { NAVY, ORANGE, NAVY_DARK, ORANGE_HVR, FAQS, SectionTag, PageHero } from "../shared";

const FAQ_CATEGORIES = ["All", "General", "Services", "Strategy", "Reporting", "Pricing"];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const filtered = activeCategory === "All" ? FAQS : FAQS.filter((f) => f.category === activeCategory);

  return (
    <>
      <PageHero
        tag="FAQ"
        title="Frequently Asked Questions"
        subtitle="Transparent answers to what clients ask us most. Still have a question that's not answered here? Just ask."
      />

      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-4xl mx-auto px-5 lg:px-10">
          {/* Category filter */}
          <div className="flex gap-2 flex-wrap mb-12 justify-center">
            {FAQ_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setOpenIdx(null); }}
                className="px-4 py-2 text-xs tracking-wide uppercase transition-all duration-200"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  background: activeCategory === cat ? NAVY : "transparent",
                  color: activeCategory === cat ? "#fff" : "var(--muted-foreground)",
                  border: `1px solid ${activeCategory === cat ? NAVY : "var(--border)"}`,
                }}>
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ accordion */}
          <div className="space-y-2">
            {filtered.map((faq, i) => (
              <div key={i} className="bg-card border border-border overflow-hidden">
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="w-full flex items-start justify-between gap-4 p-6 text-left transition-colors"
                  onMouseEnter={(e) => (e.currentTarget.style.background = `${ORANGE}08`)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "")}>
                  <div>
                    <span className="text-[10px] px-2 py-0.5 tracking-wide uppercase mr-3"
                      style={{ background: `${NAVY}12`, color: NAVY, fontFamily: "'Inter', sans-serif" }}>
                      {faq.category}
                    </span>
                    <span className="text-foreground leading-snug text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>{faq.q}</span>
                  </div>
                  <span className="shrink-0 mt-0.5 text-lg leading-none" style={{ color: ORANGE }}>
                    {openIdx === i ? "−" : "+"}
                  </span>
                </button>
                {openIdx === i && (
                  <div className="px-6 pb-6 border-t border-border">
                    <p className="text-muted-foreground text-sm leading-relaxed pt-4" style={{ fontFamily: "'Inter', sans-serif" }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
              No FAQs in this category yet.
            </div>
          )}
        </div>
      </section>

      {/* Still have questions */}
      <section className="py-20" style={{ background: NAVY_DARK }}>
        <div className="max-w-4xl mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTag label="Still Have Questions?" />
              <h2 className="text-3xl text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                We're Happy to Answer Anything
              </h2>
              <p className="leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.6)" }}>
                Every brand is different. If you have a specific question about your industry, your budget, or how we'd approach your particular challenge — just ask. We give honest, straightforward answers.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Link to="/contact"
                className="flex items-center justify-between px-6 py-4 text-white text-sm transition-colors group"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", fontFamily: "'Inter', sans-serif" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = ORANGE)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}>
                <span>Send us a message</span>
                <ArrowRight size={16} style={{ color: ORANGE }} />
              </Link>
              <Link to="/consultation"
                className="flex items-center justify-between px-6 py-4 text-white text-sm transition-colors group"
                style={{ background: ORANGE, fontFamily: "'Inter', sans-serif" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = ORANGE_HVR)}
                onMouseLeave={(e) => (e.currentTarget.style.background = ORANGE)}>
                <span>Book a free strategy call</span>
                <ArrowRight size={16} />
              </Link>
              <a href="https://wa.me/237657202002" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-between px-6 py-4 text-white text-sm transition-colors"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", fontFamily: "'Inter', sans-serif" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#25D366")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}>
                <span>Chat on WhatsApp</span>
                <ArrowRight size={16} style={{ color: "#25D366" }} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
