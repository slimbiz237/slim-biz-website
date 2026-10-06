import { Link } from "react-router";
import { ArrowRight, CheckCircle } from "lucide-react";
import { NAVY, ORANGE, NAVY_DARK, NAVY_MID, ORANGE_HVR, SERVICES, SectionTag, PageHero } from "../shared";

const PROCESS = [
  { num: "01", title: "Discovery & Audit", desc: "We audit your current marketing, competitive landscape, and audience to understand where you are and where the opportunities lie." },
  { num: "02", title: "Strategy & Planning", desc: "We develop an integrated campaign strategy with clear objectives, channel mix, budget allocation, and KPIs tied to business outcomes." },
  { num: "03", title: "Creative Development", desc: "Our in-house studio develops campaign creative — from TV scripts to social assets — ensuring every execution fits your brand and objectives." },
  { num: "04", title: "Campaign Execution", desc: "We launch across all agreed channels simultaneously, with centralized management to ensure consistency, pacing, and brand coherence." },
  { num: "05", title: "Optimization & Reporting", desc: "Real-time optimization on digital channels, bi-weekly reporting across all channels, and monthly strategic reviews tied to your business goals." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        tag="Our Services"
        title="Every Channel. One Strategy."
        subtitle="From TV commercials to programmatic digital — we plan, create, and execute across the full media landscape with a single integrated strategic vision."
      />

      {/* Services grid */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-16">
            <SectionTag label="What We Offer" />
            <h2 className="text-3xl lg:text-4xl text-foreground mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Our Service Portfolio</h2>
            <p className="text-muted-foreground max-w-xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
              Ten core service areas. All connected by a single strategic vision and managed by senior specialists who live and breathe your industry.
            </p>
          </div>

          <div className="space-y-8">
            {SERVICES.map((svc, i) => (
              <div key={svc.title} className="grid lg:grid-cols-5 gap-0 bg-card border border-border overflow-hidden transition-all duration-300"
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${NAVY}40`)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "")}>
                <div className="lg:col-span-1 p-8 flex flex-col items-center justify-center text-center" style={{ background: i % 2 === 0 ? NAVY_DARK : NAVY }}>
                  <div className="w-14 h-14 flex items-center justify-center mb-4" style={{ background: `${svc.color}30`, border: `1px solid ${svc.color}60` }}>
                    <svc.icon size={26} style={{ color: svc.color }} />
                  </div>
                  <p className="text-xs tracking-[0.2em] uppercase" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.5)" }}>0{i + 1}</p>
                </div>
                <div className="lg:col-span-2 p-8 border-b lg:border-b-0 lg:border-r border-border">
                  <h3 className="text-foreground mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem" }}>{svc.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{svc.desc}</p>
                </div>
                <div className="lg:col-span-2 p-8 flex flex-col">
                  <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ fontFamily: "'Inter', sans-serif", color: ORANGE }}>What's Included</p>
                  <ul className="space-y-2 flex-1">
                    {svc.details.map((d) => (
                      <li key={d} className="flex items-start gap-2.5">
                        <CheckCircle size={14} className="mt-0.5 shrink-0" style={{ color: ORANGE }} />
                        <span className="text-foreground/80 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>{d}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-5 border-t border-border">
                    <Link
                      to={`/contact?service=${encodeURIComponent(svc.title)}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-white text-xs font-medium tracking-wide transition-colors"
                      style={{ background: ORANGE, fontFamily: "'Inter', sans-serif" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = ORANGE_HVR)}
                      onMouseLeave={(e) => (e.currentTarget.style.background = ORANGE)}
                    >
                      Contact Us About This Service <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="py-24 lg:py-32" style={{ background: NAVY_DARK }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-16">
            <SectionTag label="How We Work" />
            <h2 className="text-3xl lg:text-4xl text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Our 5-Step Process</h2>
            <p className="max-w-xl mx-auto" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.55)" }}>
              A disciplined process that ensures every campaign is grounded in strategy, executed with craft, and measured against business outcomes.
            </p>
          </div>
          <div className="grid lg:grid-cols-5 gap-0 relative">
            {/* connecting line */}
            <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-px" style={{ background: `${ORANGE}30` }} />
            {PROCESS.map((step, i) => (
              <div key={step.num} className="relative p-6 text-center">
                <div className="w-16 h-16 mx-auto flex items-center justify-center mb-6 relative z-10" style={{ background: NAVY, border: `2px solid ${ORANGE}` }}>
                  <span className="text-sm" style={{ fontFamily: "'Playfair Display', serif", color: ORANGE }}>{step.num}</span>
                </div>
                <h3 className="text-white mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem" }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.55)" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Marketing detail */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionTag label="Digital Marketing Deep Dive" />
              <h2 className="text-3xl lg:text-4xl text-foreground mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Digital Performance. Built on Strategy. Driven by Data.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                Our digital marketing practice covers the full funnel — from brand awareness at the top to conversion optimization at the bottom. We integrate SEO, paid search, paid social, programmatic display, email, and content marketing into a single, cohesive digital strategy.
              </p>
              <div className="space-y-3">
                {[
                  "SEO & technical site optimization",
                  "Google Ads (Search, Display, Shopping, YouTube)",
                  "Meta, Instagram, TikTok & LinkedIn advertising",
                  "Programmatic display & retargeting",
                  "Email marketing & marketing automation",
                  "Content marketing & editorial strategy",
                  "Analytics, attribution & CRO",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle size={16} style={{ color: ORANGE }} />
                    <span className="text-foreground/80 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=500&fit=crop&auto=format"
                alt="Digital marketing analytics dashboard"
                className="w-full object-cover bg-muted"
                style={{ height: 440 }}
              />
              <div className="absolute -bottom-6 -left-6 p-6 w-56" style={{ background: NAVY }}>
                <p className="text-white text-xs tracking-wide uppercase mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>Avg. ROAS for clients</p>
                <p className="text-white" style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem" }}>4.2×</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: NAVY }}>
        <div className="max-w-4xl mx-auto px-5 lg:px-10 text-center">
          <h2 className="text-3xl text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Not Sure Which Services You Need?</h2>
          <p className="text-white/70 mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
            Book a free 30-minute strategy call. We'll review your current marketing, identify the biggest opportunities, and recommend a tailored approach.
          </p>
          <Link to="/consultation"
            className="inline-flex items-center gap-3 px-8 py-4 text-white text-sm font-medium tracking-wide transition-colors group"
            style={{ background: ORANGE, fontFamily: "'Inter', sans-serif" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = ORANGE_HVR)}
            onMouseLeave={(e) => (e.currentTarget.style.background = ORANGE)}>
            Book a Free Strategy Call <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
