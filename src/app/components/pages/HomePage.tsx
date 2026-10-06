import { useState, useEffect } from "react";
import aboutImg from "@/imports/image01.png";
import heroBg from "@/imports/image01.png";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { Link } from "react-router";
import {
  ArrowRight, CheckCircle, Star, Calendar, Clock,
  ChevronLeft, ChevronRight, ExternalLink, Phone,
} from "lucide-react";
import {
  NAVY, ORANGE, NAVY_DARK, NAVY_MID, ORANGE_HVR,
  STATS, SERVICES, PORTFOLIO, TESTIMONIALS, BLOG_POSTS, FAQS,
  SectionTag, SectionTagLeft,
} from "../shared";

// ─── Hero ──────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0" style={{ background: NAVY_DARK }}>
        <img
          src={heroBg}
          alt="Creative marketing team collaborating"
          className="w-full h-full object-cover object-center opacity-20"
          style={{ objectPosition: "center top" }}
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(110deg, ${NAVY_DARK} 40%, ${NAVY}80 100%)` }} />
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: ORANGE }} />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-10 pt-28 pb-16 w-full">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12" style={{ background: ORANGE }} />
            <p className="text-xs tracking-[0.3em] uppercase font-medium" style={{ fontFamily: "'Inter', sans-serif", color: ORANGE }}>
              Marketing & Advertising Agency · Yaoundé, Cameroun
            </p>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] text-white leading-[1.1] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            We Create Campaigns
            <span className="italic block" style={{ color: ORANGE }}>That Move Markets.</span>
          </h1>

          <p className="text-white/75 text-lg leading-relaxed mb-10 max-w-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
            SLIM BIZ is a full-service marketing and advertising agency delivering integrated campaigns across traditional, digital, and social channels — from TV commercials to targeted digital ads, all driven by strategy and measured by results.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/consultation"
              className="inline-flex items-center gap-3 px-8 py-4 text-white font-medium tracking-wide transition-all duration-200 group"
              style={{ fontFamily: "'Inter', sans-serif", background: ORANGE }}
              onMouseEnter={(e) => (e.currentTarget.style.background = ORANGE_HVR)}
              onMouseLeave={(e) => (e.currentTarget.style.background = ORANGE)}>
              Get Free Consultation <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/portfolio"
              className="inline-flex items-center gap-3 px-8 py-4 border border-white/30 text-white font-medium tracking-wide hover:border-white transition-all duration-200"
              style={{ fontFamily: "'Inter', sans-serif" }}>
              See Our Work
            </Link>
          </div>

          <div className="mt-14 flex flex-wrap gap-6 items-center">
            {["Google Partner", "Meta Business Partner", "Cannes Lions Finalist", "D&AD Award Winner"].map((b) => (
              <div key={b} className="flex items-center gap-2">
                <CheckCircle size={14} style={{ color: ORANGE }} />
                <span className="text-white/60 text-xs tracking-wide" style={{ fontFamily: "'Inter', sans-serif" }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span className="text-[10px] tracking-[0.2em] uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}

// ─── Stats bar ─────────────────────────────────────────────────────────────────
function StatsBar() {
  return (
    <section className="py-10 border-y" style={{ background: NAVY_DARK, borderColor: `${ORANGE}30` }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl lg:text-4xl mb-1" style={{ fontFamily: "'Playfair Display', serif", color: ORANGE }}>{s.value}</p>
              <p className="text-xs tracking-widest uppercase" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.5)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About preview ─────────────────────────────────────────────────────────────
function AboutPreview() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="overflow-hidden w-full" style={{ height: 460 }}>
              <ImageWithFallback
                src={aboutImg}
                alt="SLIM BIZ team in a strategy session"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-36 flex items-end p-5 z-20" style={{ background: NAVY }}>
              <div>
                <p className="text-white" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem" }}>2018</p>
                <p className="text-white/80 text-xs tracking-widest uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>Est. in Yaoundé</p>
              </div>
            </div>
          </div>

          <div>
            <SectionTagLeft label="About SLIM BIZ" />
            <h2 className="text-3xl lg:text-4xl text-foreground mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Traditional Reach. Digital Precision. One Integrated Strategy.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-5" style={{ fontFamily: "'Inter', sans-serif" }}>
              Created in 2018 and officially registered in 2024, SLIM BIZ SARL is a full-service marketing and advertising agency headquartered in Yaoundé, Cameroun — bridging the power of traditional media with the agility of digital channels.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {["Integrated Campaign Planning", "Full TV & Broadcast Production", "Media Buying Across All Channels", "Award-Winning Creative Team"].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle size={16} className="mt-0.5 shrink-0" style={{ color: ORANGE }} />
                  <span className="text-foreground/80 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>{item}</span>
                </div>
              ))}
            </div>
            <Link to="/about"
              className="inline-flex items-center gap-2 px-6 py-3 text-white text-sm font-medium tracking-wide transition-colors group"
              style={{ fontFamily: "'Inter', sans-serif", background: NAVY }}
              onMouseEnter={(e) => (e.currentTarget.style.background = NAVY_MID)}
              onMouseLeave={(e) => (e.currentTarget.style.background = NAVY)}>
              Learn About Us <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services preview ──────────────────────────────────────────────────────────
function ServicesPreview() {
  return (
    <section className="py-24 lg:py-32" style={{ background: NAVY_DARK }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="text-center mb-16">
          <SectionTag label="What We Do" />
          <h2 className="text-3xl lg:text-4xl text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Traditional. Digital. Social. All Orchestrated.
          </h2>
          <p className="max-w-xl mx-auto" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.5)" }}>
            From TV commercials to outdoor billboards to targeted social ads — we plan, create, and execute across every channel with one cohesive strategy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "rgba(255,255,255,0.06)" }}>
          {SERVICES.slice(0, 6).map((svc) => (
            <div
              key={svc.title}
              className="p-8 group cursor-pointer transition-colors duration-300"
              style={{ background: NAVY_DARK }}
              onMouseEnter={(e) => (e.currentTarget.style.background = NAVY_MID)}
              onMouseLeave={(e) => (e.currentTarget.style.background = NAVY_DARK)}>
              <div className="w-12 h-12 flex items-center justify-center mb-6" style={{ background: `${svc.color}20`, border: `1px solid ${svc.color}40` }}>
                <svc.icon size={22} style={{ color: svc.color }} />
              </div>
              <h3 className="text-white mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem" }}>{svc.title}</h3>
              <p className="text-sm leading-relaxed mb-5" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.5)" }}>{svc.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/services"
            className="inline-flex items-center gap-3 px-8 py-4 text-sm font-medium tracking-wide transition-all duration-200 group"
            style={{ fontFamily: "'Inter', sans-serif", border: `1px solid ${ORANGE}60`, color: ORANGE }}
            onMouseEnter={(e) => { e.currentTarget.style.background = ORANGE; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = ORANGE; }}>
            View All Services <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Portfolio preview ─────────────────────────────────────────────────────────
function PortfolioPreview() {
  return (
    <section className="py-24 lg:py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="text-center mb-16">
          <SectionTag label="Selected Work" />
          <h2 className="text-3xl lg:text-4xl text-foreground mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Campaigns That Moved the Needle</h2>
          <p className="text-muted-foreground max-w-xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
            A curated look at work we're proud of — and the numbers behind it.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO.slice(0, 6).map((item) => (
            <div key={item.title} className="group overflow-hidden bg-card border border-border transition-all duration-300"
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${NAVY}40`)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "")}>
              <div className="relative overflow-hidden h-52 bg-muted">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" style={{ background: `${NAVY_DARK}85` }}>
                  <ExternalLink size={24} className="text-white" />
                </div>
                <div className="absolute top-3 right-3 text-white text-xs px-3 py-1" style={{ background: ORANGE, fontFamily: "'Inter', sans-serif" }}>
                  {item.result}
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs tracking-wide mb-2" style={{ fontFamily: "'Inter', sans-serif", color: ORANGE }}>{item.category}</p>
                <h3 className="text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/portfolio"
            className="inline-flex items-center gap-3 px-8 py-4 text-sm font-medium tracking-wide transition-all duration-200 group"
            style={{ fontFamily: "'Inter', sans-serif", background: NAVY, color: "#fff" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = NAVY_MID)}
            onMouseLeave={(e) => (e.currentTarget.style.background = NAVY)}>
            View Full Portfolio <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials preview ─────────────────────────────────────────────────────
function TestimonialsPreview() {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setIdx((i) => (i + 1) % TESTIMONIALS.length);
  const t = TESTIMONIALS[idx];

  return (
    <section className="py-24 lg:py-32" style={{ background: NAVY_DARK }}>
      <div className="max-w-5xl mx-auto px-5 lg:px-10">
        <div className="text-center mb-16">
          <SectionTag label="Client Voices" />
          <h2 className="text-3xl lg:text-4xl text-white" style={{ fontFamily: "'Playfair Display', serif" }}>What Our Clients Say</h2>
        </div>

        <div className="text-center px-4 lg:px-16">
          <div className="flex justify-center gap-1 mb-8">
            {[...Array(t.rating)].map((_, i) => <Star key={i} size={18} style={{ color: ORANGE, fill: ORANGE }} />)}
          </div>
          <blockquote className="text-white/90 text-xl lg:text-2xl leading-relaxed italic mb-10" style={{ fontFamily: "'Playfair Display', serif" }}>
            "{t.quote}"
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full object-cover object-top bg-muted" style={{ border: `2px solid ${ORANGE}60` }} />
            <div className="text-left">
              <p className="text-white" style={{ fontFamily: "'Inter', sans-serif" }}>{t.name}</p>
              <p className="text-sm" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.5)" }}>{t.role}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-12">
          <button onClick={prev} className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 transition-colors"
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = ORANGE; e.currentTarget.style.color = ORANGE; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}>
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} className="h-1.5 transition-all duration-300"
                style={{ width: i === idx ? 32 : 6, background: i === idx ? ORANGE : "rgba(255,255,255,0.2)" }} />
            ))}
          </div>
          <button onClick={next} className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 transition-colors"
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = ORANGE; e.currentTarget.style.color = ORANGE; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}>
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="text-center mt-8">
          <Link to="/testimonials" className="text-sm font-medium inline-flex items-center gap-2" style={{ color: ORANGE, fontFamily: "'Inter', sans-serif" }}>
            Read All Reviews <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Blog preview ──────────────────────────────────────────────────────────────
function BlogPreview() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <SectionTagLeft label="Insights & Thinking" />
            <h2 className="text-3xl lg:text-4xl text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>From the SLIM BIZ Blog</h2>
          </div>
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all shrink-0" style={{ fontFamily: "'Inter', sans-serif", color: ORANGE }}>
            View All Posts <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <article key={post.title} className="group bg-card border border-border overflow-hidden cursor-pointer transition-colors duration-300"
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${NAVY}30`)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "")}>
              <div className="relative h-52 overflow-hidden bg-muted">
                <img src={post.img} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute top-3 left-3 text-white text-xs px-3 py-1" style={{ background: ORANGE, fontFamily: "'Inter', sans-serif" }}>{post.tag}</div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-muted-foreground text-xs mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                  <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</span>
                  <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime}</span>
                </div>
                <h3 className="text-foreground leading-snug mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{post.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{post.excerpt}</p>
                <div className="flex items-center gap-2 mt-5 text-sm font-medium" style={{ color: ORANGE, fontFamily: "'Inter', sans-serif" }}>
                  Read Article <ArrowRight size={14} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ preview ──────────────────────────────────────────────────────────────
function FAQPreview() {
  const [open, setOpen] = useState<number | null>(0);
  const preview = FAQS.slice(0, 4);

  return (
    <section className="py-24 lg:py-32 bg-secondary">
      <div className="max-w-4xl mx-auto px-5 lg:px-10">
        <div className="text-center mb-16">
          <SectionTag label="FAQ" />
          <h2 className="text-3xl lg:text-4xl text-foreground mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Frequently Asked Questions</h2>
        </div>
        <div className="space-y-2 mb-8">
          {preview.map((faq, i) => (
            <div key={i} className="bg-card border border-border overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-start justify-between gap-4 p-6 text-left"
                onMouseEnter={(e) => (e.currentTarget.style.background = `${ORANGE}08`)}
                onMouseLeave={(e) => (e.currentTarget.style.background = "")}>
                <span className="text-foreground leading-snug text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>{faq.q}</span>
                <span className="shrink-0 mt-0.5 text-lg" style={{ color: ORANGE }}>{open === i ? "−" : "+"}</span>
              </button>
              {open === i && (
                <div className="px-6 pb-6 border-t border-border">
                  <p className="text-muted-foreground text-sm leading-relaxed pt-4" style={{ fontFamily: "'Inter', sans-serif" }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link to="/faq" className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: ORANGE, fontFamily: "'Inter', sans-serif" }}>
            View All FAQs <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────
function CtaBanner() {
  return (
    <section className="py-16" style={{ background: NAVY }}>
      <div className="max-w-5xl mx-auto px-5 lg:px-10 text-center">
        <h2 className="text-3xl lg:text-4xl text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          Ready to Grow Your Brand?
        </h2>
        <p className="text-white/75 mb-8 max-w-xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
          Let's build something that looks great, converts better, and scales further. Start with a free strategy consultation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/consultation"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 text-sm tracking-wide transition-colors group"
            style={{ fontFamily: "'Inter', sans-serif", background: ORANGE, color: "#fff" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = ORANGE_HVR)}
            onMouseLeave={(e) => (e.currentTarget.style.background = ORANGE)}>
            Book a Free Consultation <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a href="tel:+237657202002"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-white/40 text-white text-sm tracking-wide hover:border-white transition-colors"
            style={{ fontFamily: "'Inter', sans-serif" }}>
            <Phone size={16} /> +237 657 202 002
          </a>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <AboutPreview />
      <ServicesPreview />
      <PortfolioPreview />
      <TestimonialsPreview />
      <BlogPreview />
      <FAQPreview />
      <CtaBanner />
    </>
  );
}
