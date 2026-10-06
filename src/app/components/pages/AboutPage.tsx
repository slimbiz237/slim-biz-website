import { Link } from "react-router";
import { CheckCircle, ArrowRight, Award, Users, Zap, TrendingUp, Target, Linkedin } from "lucide-react";
import { NAVY, ORANGE, NAVY_DARK, NAVY_MID, ORANGE_HVR, TEAM, STATS, SectionTag, SectionTagLeft, PageHero } from "../shared";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import ourStoryImg from "@/imports/image.png";

const VALUES = [
  { icon: Target,      title: "Integrated Thinking",     desc: "We orchestrate traditional, digital, and social campaigns as one cohesive system — so every channel amplifies the others." },
  { icon: Users,       title: "Senior-Led Accounts",     desc: "No juniors-only execution. Your account is owned by a senior strategist who shows up, thinks ahead, and stays accountable." },
  { icon: Zap,         title: "In-House Creative Studio", desc: "From TV commercials to Instagram carousels — we produce everything in-house for faster turnaround and tighter brand control." },
  { icon: TrendingUp,  title: "Performance-First",       desc: "Every campaign is built around business KPIs. We optimize for awareness, consideration, conversion, and retention — not vanity metrics." },
  { icon: CheckCircle, title: "Strategic Media Planning", desc: "We combine media buying expertise across digital platforms, broadcast, print, and OOH to maximize reach and frequency within your budget." },
  { icon: Award,       title: "Award-Winning Work",       desc: "Recognized across Cannes Lions, D&AD, and industry awards for creative excellence — but proudest of the business results we deliver." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        tag="About SLIM BIZ"
        title="We Are SLIM BIZ"
        subtitle="A full-service marketing and advertising agency based in Yaoundé, Cameroun — bridging traditional and digital media to deliver integrated campaigns that move markets."
      />

      {/* Company overview */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <ImageWithFallback
                src={ourStoryImg}
                alt="SLIM BIZ team in a strategy session at the Yaoundé office"
                className="w-full object-cover object-center"
                style={{ height: 500 }}
              />
              <div
                className="absolute -bottom-6 -right-6 w-52 h-36 flex items-end p-5 z-10"
                style={{ background: NAVY }}
              >
                <div>
                  <p className="text-white" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem", lineHeight: 1 }}>2018</p>
                  <p className="text-white/60 text-xs tracking-[0.2em] uppercase mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>Est. in Yaoundé</p>
                </div>
              </div>
              <div
                className="absolute top-6 left-6 px-4 py-2"
                style={{ background: ORANGE }}
              >
                <p className="text-white text-xs font-semibold tracking-widest uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Our Team
                </p>
              </div>
            </div>

            <div>
              <SectionTagLeft label="Our Story" />
              <h2 className="text-3xl lg:text-4xl text-foreground mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Traditional Reach. Digital Precision. One Integrated Strategy.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-5" style={{ fontFamily: "'Inter', sans-serif" }}>
                SLIM BIZ was created in 2018 with a simple belief: the best marketing campaigns aren't channel-specific — they're channel-agnostic. We started as a digital-first agency and quickly recognized that our clients needed something more: an integrated partner that could manage the full media landscape. In 2024, we officially registered as SLIM BIZ SARL, formalizing our commitment to growth and excellence across Cameroun.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
                Today, we're one of the few agencies in Central and West Africa with genuine end-to-end capabilities — brand strategy, TV production, outdoor media buying, digital performance, and data analytics all under one roof. We've delivered over 800 campaigns for 150+ brands, managing more than 90B FCFA in total media spend.
              </p>
              <div className="grid grid-cols-2 gap-8">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <p className="text-3xl mb-1" style={{ fontFamily: "'Playfair Display', serif", color: ORANGE }}>{s.value}</p>
                    <p className="text-xs tracking-widest uppercase text-muted-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 lg:py-32" style={{ background: NAVY_DARK }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-16">
            <SectionTag label="What Drives Us" />
            <h2 className="text-3xl lg:text-4xl text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Mission & Vision</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="p-10 border-l-4" style={{ background: "rgba(255,255,255,0.04)", borderColor: ORANGE }}>
              <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'Inter', sans-serif", color: ORANGE }}>Our Mission</p>
              <h3 className="text-white text-2xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                To be the agency that makes African brands globally competitive.
              </h3>
              <p className="leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.6)" }}>
                We exist to give businesses across Cameroun and Central Africa access to the same caliber of strategic thinking, creative excellence, and media sophistication that global brands enjoy — at a scale and price that makes sense for ambitious, growth-oriented companies.
              </p>
            </div>
            <div className="p-10 border-l-4" style={{ background: "rgba(255,255,255,0.04)", borderColor: NAVY }}>
              <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'Inter', sans-serif", color: ORANGE }}>Our Vision</p>
              <h3 className="text-white text-2xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                A world where integrated marketing is the standard, not the exception.
              </h3>
              <p className="leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.6)" }}>
                We envision a marketing landscape where every campaign — from a local SME to a multinational — is built on strategic insight, executed with creative excellence, and measured against real business outcomes. We're building that future, one integrated campaign at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-16">
            <SectionTag label="Core Values" />
            <h2 className="text-3xl lg:text-4xl text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>Why Leading Brands Choose SLIM BIZ</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((item) => (
              <div key={item.title} className="p-6 bg-card border border-border transition-colors duration-300"
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${NAVY}40`)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "")}>
                <div className="w-10 h-10 flex items-center justify-center mb-4" style={{ background: `${NAVY}12` }}>
                  <item.icon size={18} style={{ color: NAVY }} />
                </div>
                <h3 className="text-foreground mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem" }}>{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 lg:py-32 bg-secondary">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-16">
            <SectionTag label="The Team" />
            <h2 className="text-3xl lg:text-4xl text-foreground mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Senior-Led. Strategy-First.</h2>
            <p className="text-muted-foreground max-w-xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
              Every account is led by a senior strategist. No hand-offs to juniors. No gaps between the pitch team and the delivery team.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM.map((member) => (
              <div key={member.name} className="group bg-card border border-border overflow-hidden transition-all duration-300"
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${NAVY}40`)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "")}>
                <div className="h-72 overflow-hidden bg-muted">
                  <img src={member.img} alt={member.name} className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${"imgPosition" in member ? (member as { imgPosition: string }).imgPosition : "object-top"}`} />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-foreground" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem" }}>{member.name}</h3>
                    <a href={member.linkedin} className="text-muted-foreground transition-colors"
                      onMouseEnter={(e) => (e.currentTarget.style.color = NAVY)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "")}>
                      <Linkedin size={16} />
                    </a>
                  </div>
                  <p className="text-xs tracking-wide mb-3" style={{ fontFamily: "'Inter', sans-serif", color: ORANGE }}>{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: NAVY }}>
        <div className="max-w-4xl mx-auto px-5 lg:px-10 text-center">
          <h2 className="text-3xl text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Ready to Work Together?</h2>
          <p className="text-white/70 mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>Let's talk about your brand, your goals, and how we can help you get there.</p>
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
