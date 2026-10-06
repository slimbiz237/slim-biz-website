import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, TrendingUp } from "lucide-react";
import { NAVY, ORANGE, NAVY_DARK, ORANGE_HVR, PORTFOLIO, SectionTag, PageHero } from "../shared";

const ALL_TAGS = ["All", "Branding", "TV", "Digital", "Social", "OOH", "B2B", "FMCG", "Launch", "Influencer", "Radio", "Automotive", "Fitness", "Events", "Packaging"];

export default function PortfolioPage() {
  const [activeTag, setActiveTag] = useState("All");
  const [activeCase, setActiveCase] = useState<number | null>(null);

  const filtered = activeTag === "All"
    ? PORTFOLIO
    : PORTFOLIO.filter((p) => p.tags.includes(activeTag));

  return (
    <>
      <PageHero
        tag="Our Work"
        title="Campaigns That Moved the Needle"
        subtitle="A curated selection of campaigns across industries and channels — with the real business outcomes that matter most to our clients."
      />

      {/* Filter bar */}
      <section className="py-8 bg-background border-b border-border sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="flex gap-2 flex-wrap">
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className="px-4 py-2 text-xs tracking-wide uppercase transition-all duration-200"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  background: activeTag === tag ? NAVY : "transparent",
                  color: activeTag === tag ? "#fff" : "var(--muted-foreground)",
                  border: `1px solid ${activeTag === tag ? NAVY : "var(--border)"}`,
                }}>
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio grid */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item, i) => (
              <div key={item.title}>
                <div
                  className="group cursor-pointer overflow-hidden bg-card border border-border transition-all duration-300"
                  onClick={() => setActiveCase(activeCase === i ? null : i)}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${NAVY}40`)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "")}>
                  <div className="relative h-56 overflow-hidden bg-muted">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `${NAVY_DARK}80` }}>
                      <div className="absolute bottom-4 left-4 right-4 text-white text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Click to see case study details →
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 text-white text-xs px-3 py-1" style={{ background: ORANGE, fontFamily: "'Inter', sans-serif" }}>
                      {item.result}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex gap-2 mb-3 flex-wrap">
                      {item.tags.map((t) => (
                        <span key={t} className="text-[10px] px-2 py-0.5 tracking-wide uppercase"
                          style={{ background: `${NAVY}12`, color: NAVY, fontFamily: "'Inter', sans-serif" }}>{t}</span>
                      ))}
                    </div>
                    <p className="text-xs mb-1" style={{ fontFamily: "'Inter', sans-serif", color: ORANGE }}>{item.category}</p>
                    <h3 className="text-foreground" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem" }}>{item.title}</h3>
                    <p className="text-muted-foreground text-xs mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>{item.client} · {item.year}</p>
                  </div>
                </div>

                {/* Expanded case study */}
                {activeCase === i && (
                  <div className="border border-border bg-card p-8 mt-1 border-t-0">
                    <div className="grid lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2">
                        <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ fontFamily: "'Inter', sans-serif", color: ORANGE }}>Case Study</p>
                        <h4 className="text-foreground mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem" }}>{item.title}</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{item.desc}</p>
                      </div>
                      <div>
                        <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ fontFamily: "'Inter', sans-serif", color: ORANGE }}>Key Results</p>
                        <div className="space-y-4">
                          {item.metrics.map((m) => (
                            <div key={m.label} className="flex items-center gap-4">
                              <TrendingUp size={16} style={{ color: ORANGE, flexShrink: 0 }} />
                              <div>
                                <p className="text-foreground" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem" }}>{m.value}</p>
                                <p className="text-muted-foreground text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>{m.label}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-24 text-muted-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
              No projects found for this filter. <button onClick={() => setActiveTag("All")} className="underline" style={{ color: ORANGE }}>View all</button>
            </div>
          )}
        </div>
      </section>

      {/* Before/After metrics */}
      <section className="py-24 lg:py-32" style={{ background: NAVY_DARK }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-16">
            <SectionTag label="Performance Benchmarks" />
            <h2 className="text-3xl lg:text-4xl text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Average Results Across Our Portfolio
            </h2>
            <p className="max-w-xl mx-auto" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.55)" }}>
              Aggregated performance data across 800+ campaigns. Outcomes vary by industry, budget, and channel mix.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { metric: "+43%", label: "Average Brand Awareness Lift", sub: "Integrated campaigns (TV + Digital)" },
              { metric: "4.2×", label: "Average ROAS", sub: "Digital performance campaigns" },
              { metric: "-31%", label: "Cost Per Lead Reduction", sub: "vs. prior agency benchmarks" },
              { metric: "+67%", label: "Avg. Organic Traffic Growth", sub: "SEO clients, 12-month view" },
            ].map((item) => (
              <div key={item.label} className="p-8 text-center border" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <p className="mb-2" style={{ fontFamily: "'Playfair Display', serif", color: ORANGE, fontSize: "2.5rem" }}>{item.metric}</p>
                <p className="text-white text-sm mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>{item.label}</p>
                <p className="text-xs" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.4)" }}>{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: NAVY }}>
        <div className="max-w-4xl mx-auto px-5 lg:px-10 text-center">
          <h2 className="text-3xl text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Want to Be Our Next Success Story?</h2>
          <p className="text-white/70 mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>Let's talk about your brand and what kind of results we could achieve together.</p>
          <Link to="/consultation"
            className="inline-flex items-center gap-3 px-8 py-4 text-white text-sm font-medium tracking-wide transition-colors group"
            style={{ background: ORANGE, fontFamily: "'Inter', sans-serif" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = ORANGE_HVR)}
            onMouseLeave={(e) => (e.currentTarget.style.background = ORANGE)}>
            Start a Project <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
