import { Link } from "react-router";
import { Star, ArrowRight, TrendingUp, ExternalLink } from "lucide-react";
import { NAVY, ORANGE, NAVY_DARK, ORANGE_HVR, TESTIMONIALS, SectionTag, PageHero } from "../shared";

const GMB_URL = "https://share.google/pnzloYYmIlCC0jjwv";

const CLIENT_LOGOS = [
  { name: "National Bank", sector: "Financial Services" },
  { name: "AutoNation Group", sector: "Automotive" },
  { name: "NovaSkin Cosmetics", sector: "Beauty & Skincare" },
  { name: "TechCorp Africa", sector: "Technology" },
  { name: "UrbanFit Gyms", sector: "Fitness" },
  { name: "Artisan Foods Ltd", sector: "FMCG" },
  { name: "MedPlus Clinics", sector: "Healthcare" },
  { name: "Horizon Hotels", sector: "Hospitality" },
];

const SUCCESS_METRICS = [
  { value: "97%", label: "Client Retention Rate", desc: "Clients who stay with us beyond 12 months" },
  { value: "4.9/5", label: "Average Client Rating", desc: "Based on 150+ project reviews" },
  { value: "90B FCFA+", label: "Media Spend Managed", desc: "Across 800+ campaigns since 2018" },
  { value: "3.8×", label: "Average ROAS Delivered", desc: "Return on ad spend across digital campaigns" },
];

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        tag="Client Success"
        title="What Our Clients Say"
        subtitle="Real reviews from real clients who've trusted SLIM BIZ with their most important campaigns — and seen measurable results."
      />

      {/* Success metrics */}
      <section className="py-16 border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {SUCCESS_METRICS.map((m) => (
              <div key={m.label} className="text-center">
                <p className="mb-1" style={{ fontFamily: "'Playfair Display', serif", color: ORANGE, fontSize: "2.25rem" }}>{m.value}</p>
                <p className="text-foreground text-sm mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>{m.label}</p>
                <p className="text-muted-foreground text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials grid */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-16">
            <SectionTag label="Client Reviews" />
            <h2 className="text-3xl lg:text-4xl text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
              Every Story. Every Result.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-card border border-border p-8 transition-all duration-300"
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${NAVY}40`)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "")}>
                <div className="flex gap-1 mb-5">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={15} style={{ color: ORANGE, fill: ORANGE }} />)}
                </div>
                <blockquote className="text-foreground/85 leading-relaxed italic mb-6" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem" }}>
                  "{t.quote}"
                </blockquote>
                <div className="border-t border-border pt-5 flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover object-top bg-muted" style={{ border: `2px solid ${ORANGE}40` }} />
                  <div>
                    <p className="text-foreground text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>{t.name}</p>
                    <p className="text-muted-foreground text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>{t.role}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 px-3 py-2" style={{ background: `${ORANGE}12` }}>
                  <TrendingUp size={14} style={{ color: ORANGE }} />
                  <span className="text-xs" style={{ fontFamily: "'Inter', sans-serif", color: ORANGE }}>{t.result}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client logos */}
      <section className="py-20" style={{ background: NAVY_DARK }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-12">
            <SectionTag label="Our Clients" />
            <h2 className="text-3xl text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Brands That Trust SLIM BIZ</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {CLIENT_LOGOS.map((c) => (
              <div key={c.name} className="border p-6 text-center transition-colors"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${ORANGE}40`)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}>
                <p className="text-white text-sm mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{c.name}</p>
                <p className="text-xs" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.4)" }}>{c.sector}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured story */}
      <section className="py-24 lg:py-32 bg-secondary">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'Inter', sans-serif", color: ORANGE }}>Featured Story</p>
              <h2 className="text-3xl lg:text-4xl text-foreground mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                How NovaSkin Hit 1.7B FCFA in First-Month Sales
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                NovaSkin came to us as an idea on a slide deck. 6 months later, they were on shelves in 120 stores with 1.7B FCFA in first-month sales. Here's how we did it: brand identity, packaging design, influencer strategy, social advertising, and retail activation — all orchestrated from a single strategic brief.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { value: "1.7B FCFA", label: "First-month sales" },
                  { value: "4.8M", label: "Influencer reach" },
                  { value: "120", label: "Retail stockists" },
                ].map((m) => (
                  <div key={m.label} className="text-center p-4 bg-card border border-border">
                    <p className="mb-1" style={{ fontFamily: "'Playfair Display', serif", color: ORANGE, fontSize: "1.5rem" }}>{m.value}</p>
                    <p className="text-muted-foreground text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>{m.label}</p>
                  </div>
                ))}
              </div>
              <blockquote className="border-l-4 pl-6 italic text-foreground/80" style={{ borderColor: ORANGE, fontFamily: "'Playfair Display', serif" }}>
                "SLIM BIZ doesn't just think creative — they think commercial."
                <footer className="text-muted-foreground text-sm mt-2 not-italic" style={{ fontFamily: "'Inter', sans-serif" }}>
                  — Amara Osei-Bonsu, Founder, NovaSkin
                </footer>
              </blockquote>
            </div>
            <img
              src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=700&h=500&fit=crop&auto=format"
              alt="NovaSkin product launch campaign"
              className="w-full object-cover bg-muted"
              style={{ height: 460 }}
            />
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="py-20 bg-background border-t border-border">
        <div className="max-w-5xl mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left — branding + rating */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                {/* Google "G" logo */}
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="40" height="40" rx="4" fill="white" stroke="#e5e7eb" strokeWidth="1"/>
                  <path d="M20.5 10C14.977 10 10.5 14.477 10.5 20C10.5 25.523 14.977 30 20.5 30C26.023 30 30.5 25.523 30.5 20C30.5 14.477 26.023 10 20.5 10ZM20.5 28.182C15.982 28.182 12.318 24.518 12.318 20C12.318 15.482 15.982 11.818 20.5 11.818C22.759 11.818 24.795 12.695 26.286 14.132L24.373 16.045C23.364 15.073 22.009 14.477 20.5 14.477C17.464 14.477 14.977 16.964 14.977 20C14.977 23.036 17.464 25.523 20.5 25.523C23.091 25.523 25.091 23.927 25.668 21.727H20.5V19.091H28.409C28.5 19.545 28.545 20.018 28.545 20.5C28.545 24.764 24.973 28.182 20.5 28.182Z" fill="#4285F4"/>
                  <path d="M28.409 19.091H20.5V21.727H25.668C25.091 23.927 23.091 25.523 20.5 25.523C17.464 25.523 14.977 23.036 14.977 20C14.977 16.964 17.464 14.477 20.5 14.477C22.009 14.477 23.364 15.073 24.373 16.045L26.286 14.132C24.795 12.695 22.759 11.818 20.5 11.818C15.982 11.818 12.318 15.482 12.318 20C12.318 24.518 15.982 28.182 20.5 28.182C24.973 28.182 28.545 24.764 28.545 20.5C28.545 20.018 28.5 19.545 28.409 19.091Z" fill="#34A853"/>
                </svg>
                <div>
                  <p className="text-foreground font-medium text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>Google Reviews</p>
                  <p className="text-muted-foreground text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>SLIM BIZ SARL · Yaoundé</p>
                </div>
              </div>
              <div className="flex items-end gap-3 mb-3">
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "4rem", lineHeight: 1, color: ORANGE }}>5.0</p>
                <div className="mb-2">
                  <div className="flex gap-1 mb-1">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} size={20} fill="#E8622A" style={{ color: "#E8622A" }} />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>Based on Google Reviews</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                Our clients share their experiences on Google. Read their unfiltered feedback and see why businesses in Cameroun choose SLIM BIZ for their most important campaigns.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={GMB_URL} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-white text-sm font-medium tracking-wide transition-colors"
                  style={{ background: ORANGE, fontFamily: "'Inter', sans-serif" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = ORANGE_HVR)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = ORANGE)}>
                  Read Our Google Reviews <ExternalLink size={14} />
                </a>
                <a href={GMB_URL} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium tracking-wide border border-border transition-colors hover:border-foreground/30"
                  style={{ fontFamily: "'Inter', sans-serif", color: "var(--foreground)" }}>
                  Leave Us a Review <Star size={14} style={{ color: ORANGE }} />
                </a>
              </div>
            </div>

            {/* Right — 5-star badge block */}
            <div className="border border-border p-8 text-center" style={{ background: "var(--secondary)" }}>
              <div className="flex justify-center gap-1.5 mb-4">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={32} fill="#E8622A" style={{ color: "#E8622A" }} />
                ))}
              </div>
              <p className="text-foreground mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem" }}>
                5-Star Rated on Google
              </p>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                SLIM BIZ SARL is proud to carry a 5-star rating on Google My Business — a reflection of our commitment to results, transparency, and exceptional client service.
              </p>
              <div className="border-t border-border pt-5 flex flex-col gap-2">
                {[
                  "Verified by Google",
                  "Genuine client feedback",
                  "Serving Cameroun since 2018",
                ].map((item) => (
                  <div key={item} className="flex items-center justify-center gap-2 text-xs text-muted-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: ORANGE }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: NAVY }}>
        <div className="max-w-4xl mx-auto px-5 lg:px-10 text-center">
          <h2 className="text-3xl text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Ready to Write Your Success Story?</h2>
          <p className="text-white/70 mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>Start with a free 30-minute consultation. No obligation, no sales pitch — just an honest conversation about your brand.</p>
          <Link to="/consultation"
            className="inline-flex items-center gap-3 px-8 py-4 text-white text-sm font-medium tracking-wide transition-colors group"
            style={{ background: ORANGE, fontFamily: "'Inter', sans-serif" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = ORANGE_HVR)}
            onMouseLeave={(e) => (e.currentTarget.style.background = ORANGE)}>
            Book a Free Consultation <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
