import { useEffect } from "react";
import { Link } from "react-router";
import { Star, ArrowRight, ExternalLink, CheckCircle } from "lucide-react";
import { NAVY, ORANGE, NAVY_DARK, ORANGE_HVR, SectionTag, PageHero } from "../shared";

// ─── Links (change here if a link is wrong) ───────────────────────────────────
const GOOGLE_READ_URL = "https://share.google/pnzloYYmIlCC0jjwv";   // opens your Google reviews
const GOOGLE_REVIEW_URL = "https://share.google/8vkvgkpqWWaB68FKL"; // "Leave us a review" button
const SORTLIST_URL = "https://www.sortlist.com/agency/slim-biz-marketing-agency#reviews";

// ─── Verified facts only ──────────────────────────────────────────────────────
const FACTS = [
  { value: "4.5/5",    label: "Sortlist Rating",  desc: "From a verified client review on Sortlist" },
  { value: "40",       label: "Academy Courses",  desc: "Digital marketing, design, video, web and AI" },
  { value: "15",       label: "Team Members",     desc: "Strategists, creatives and trainers" },
  { value: "EN & FR",  label: "Two Languages",    desc: "We work with clients in English and French" },
];

// Add new real reviews here. Use the client's own permission and words.
type Review = {
  name: string;
  role: string;
  service: string;
  rating: string;
  summary: string;
  source: string;
  url: string;
};

const REVIEWS: Review[] = [
  {
    name: "Carine",
    role: "Entrepreneur at Carilux Beauty Cosmetics",
    service: "Digital Strategy",
    rating: "4.5/5",
    summary:
      "Carine worked with us to raise her brand's visibility and reach a wider audience. She enjoyed the collaboration, especially the mutual support and creativity, saw nothing to improve, and recommends SLIM BIZ.",
    source: "Sortlist",
    url: SORTLIST_URL,
  },
];

// ─── Brands we have worked with ───────────────────────────────────────────────
// Only list a business after the owner has agreed. Leave url as "" to hide the button.
type Client = { name: string; sector: string; work: string; url: string };

const CLIENTS: Client[] = [
  {
    name: "Carilux Beauty Cosmetics",
    sector: "Skincare & Beauty Products",
    work: "Social media community management, website development and paid advertising",
    url: "", // add the Carilux Facebook page link here
  },
  {
    name: "Berline Cosmetic Canada",
    sector: "Skincare & Beauty Products",
    work: "Social media community management, website development and paid advertising",
    url: "https://www.facebook.com/BerlineCosmeticCanada",
  },
  {
    name: "Miss Shasha Organic Skincare",
    sector: "Skincare & Beauty Products",
    work: "Social media community management, website development and paid advertising",
    url: "https://www.facebook.com/missshashaorganicskincare/",
  },
];

const initials = (name: string) =>
  name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");

export default function TestimonialsPage() {
  useEffect(() => {
    document.title = "Client Reviews | SLIM BIZ Marketing Agency, Yaoundé, Cameroon";
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = "Read what clients say about SLIM BIZ, a marketing and advertising agency in Yaoundé, Cameroon. See our Sortlist and Google reviews.";
  }, []);

  return (
    <>
      <PageHero
        tag="Client Reviews"
        title="What Our Clients Say"
        subtitle="Honest feedback from clients who have trusted SLIM BIZ with their brand, shared on independent platforms."
      />

      {/* Facts */}
      <section className="py-14 border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {FACTS.map((m) => (
              <div key={m.label} className="text-center">
                <p className="mb-1" style={{ fontFamily: "'Playfair Display', serif", color: ORANGE, fontSize: "2.25rem" }}>{m.value}</p>
                <p className="text-foreground text-sm mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>{m.label}</p>
                <p className="text-muted-foreground text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="max-w-5xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-12">
            <SectionTag label="Verified Reviews" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
              Reviews From Real Clients
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {REVIEWS.map((r) => (
              <div key={r.name + r.source} className="bg-card border border-border p-6 sm:p-8 flex flex-col">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={16} style={{ color: ORANGE, fill: s <= 4 ? ORANGE : "transparent" }} />
                  ))}
                  <span className="ml-2 text-sm text-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>{r.rating}</span>
                </div>
                <p className="text-muted-foreground text-xs tracking-wide uppercase mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                  <span>Service: </span><span>{r.service}</span>
                </p>
                <p className="text-foreground/85 leading-relaxed mb-6 flex-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {r.summary}
                </p>
                <div className="border-t border-border pt-5">
                  <p className="text-foreground text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>{r.name}</p>
                  <p className="text-muted-foreground text-xs mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>{r.role}</p>
                  <a href={r.url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium"
                    style={{ color: ORANGE, fontFamily: "'Inter', sans-serif" }}>
                    <span>Read the full review on {r.source}</span> <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            ))}

            {/* Invitation card */}
            <div className="border border-dashed border-border p-6 sm:p-8 flex flex-col items-center justify-center text-center">
              <Star size={28} style={{ color: ORANGE }} />
              <p className="text-foreground mt-4 mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem" }}>
                Worked with SLIM BIZ?
              </p>
              <p className="text-muted-foreground text-sm mb-5" style={{ fontFamily: "'Inter', sans-serif" }}>
                Your honest feedback helps other businesses choose the right partner.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-white text-sm font-medium transition-colors"
                  style={{ background: ORANGE, fontFamily: "'Inter', sans-serif" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = ORANGE_HVR)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = ORANGE)}>
                  <span>Review us on Google</span>
                </a>
                <a href={SORTLIST_URL} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium border border-border"
                  style={{ color: "var(--foreground)", fontFamily: "'Inter', sans-serif" }}>
                  <span>Review us on Sortlist</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands we have worked with */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="max-w-6xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-12">
            <SectionTag label="Our Clients" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-foreground mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Brands We've Worked With
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
              Real businesses we support with strategy, content and advertising. Visit their pages to see their brands.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CLIENTS.map((c) => (
              <div key={c.name} className="bg-card border border-border p-6 flex flex-col">
                <div className="w-14 h-14 flex items-center justify-center mb-5 text-white"
                  style={{ background: NAVY, fontFamily: "'Playfair Display', serif", fontSize: "1.1rem" }}>
                  {initials(c.name)}
                </div>
                <h3 className="text-foreground mb-1" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem" }}>{c.name}</h3>
                <p className="text-xs tracking-wide mb-4" style={{ fontFamily: "'Inter', sans-serif", color: ORANGE }}>{c.sector}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                  <span>What we do: </span><span>{c.work}</span>
                </p>
                {c.url && (
                  <a href={c.url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 text-white text-sm font-medium transition-colors"
                    style={{ background: NAVY, fontFamily: "'Inter', sans-serif" }}>
                    <span>Visit their page</span> <ExternalLink size={13} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where to read more */}
      <section className="py-16 lg:py-20" style={{ background: NAVY_DARK }}>
        <div className="max-w-5xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-10">
            <SectionTag label="Independent Platforms" />
            <h2 className="text-2xl sm:text-3xl text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              Read More Reviews Online
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: "Google Reviews", desc: "See what clients say about SLIM BIZ on our Google profile.", href: GOOGLE_READ_URL, cta: "Open Google Reviews" },
              { title: "Sortlist", desc: "Read verified client reviews on the Sortlist agency directory.", href: SORTLIST_URL, cta: "Open Sortlist Reviews" },
            ].map((p) => (
              <div key={p.title} className="border p-6 sm:p-8 text-center" style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }}>
                <p className="text-white mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem" }}>{p.title}</p>
                <p className="text-sm mb-6" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.55)" }}>{p.desc}</p>
                <a href={p.href} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 text-white text-sm font-medium transition-colors"
                  style={{ background: ORANGE, fontFamily: "'Inter', sans-serif" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = ORANGE_HVR)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = ORANGE)}>
                  <span>{p.cta}</span> <ExternalLink size={14} />
                </a>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {["Independent platforms", "Genuine client feedback", "Based in Yaoundé, Cameroun"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-xs" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.55)" }}>
                <CheckCircle size={13} style={{ color: ORANGE }} /> <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: NAVY }}>
        <div className="max-w-4xl mx-auto px-5 lg:px-10 text-center">
          <h2 className="text-2xl sm:text-3xl text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Ready to Write Your Success Story?</h2>
          <p className="text-white/70 mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
            Start with a free 30-minute consultation. No obligation, no sales pitch, just an honest conversation about your brand.
          </p>
          <Link to="/consultation"
            className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 text-white text-sm font-medium tracking-wide transition-colors group"
            style={{ background: ORANGE, fontFamily: "'Inter', sans-serif" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = ORANGE_HVR)}
            onMouseLeave={(e) => (e.currentTarget.style.background = ORANGE)}>
            <span>Book a Free Consultation</span> <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
