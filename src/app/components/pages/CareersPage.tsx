import { useState, useEffect } from "react";
import type { ReactNode, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { Link } from "react-router";
import { MapPin, Briefcase, ArrowRight, Send, CheckCircle } from "lucide-react";
import { NAVY, ORANGE, NAVY_DARK, ORANGE_HVR, SectionTag, PageHero } from "../shared";
import cultureImg from "@/imports/image_mf-1.png";

// ─── Open roles ───────────────────────────────────────────────────────────────
// We are not hiring right now, so this list is empty on purpose.
// When you start hiring, add roles here (copy the example below, remove the //),
// then commit. The page shows them automatically.
type Role = { title: string; department: string; type: string; location: string; desc: string };

const OPEN_ROLES: Role[] = [
  // {
  //   title: "Community Manager",
  //   department: "Digital",
  //   type: "Full-time",
  //   location: "Yaoundé, Cameroun",
  //   desc: "Manage client social media pages, plan content and report on results.",
  // },
];

const INTEREST_AREAS = [
  "Community management",
  "Digital marketing & ads",
  "Graphic design",
  "Video & photography",
  "Website development",
  "Sales & business development",
  "Training & coaching",
  "Other",
];

const CULTURE_VALUES = [
  { title: "Real Work, Real Brands",  desc: "Every team member works on real campaigns for real businesses. No busywork, no hierarchy for its own sake." },
  { title: "Integrated by Design",    desc: "You work across strategy, content, ads and web, not stuck in a single channel. Expect to learn things you didn't expect to." },
  { title: "Growth That Matters",     desc: "We train our people through our own academy and real client projects, with clear paths to bigger roles." },
  { title: "Outcomes Over Hours",     desc: "We care about what you deliver, not when you clock in." },
];

const HIRING_STEPS = [
  { num: "01", title: "Send your details",   desc: "Fill in the short form below. Tell us what you do best and what you'd love to work on." },
  { num: "02", title: "We keep it on file",  desc: "Your application joins our talent pool. We review every one we receive." },
  { num: "03", title: "We contact you",      desc: "When a role matches your skills, we reach out for a conversation." },
];

// ─── Small form pieces (outside the page so inputs keep focus) ────────────────
const FONT = { fontFamily: "'Inter', sans-serif" } as const;
const FIELD_CLS = "w-full px-4 py-3 bg-input-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none transition-colors";

function Label({ children }: { children: ReactNode }) {
  return <label className="block text-xs text-muted-foreground tracking-wide uppercase mb-1.5" style={FONT}>{children}</label>;
}
function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={FIELD_CLS} style={FONT}
    onFocus={(e) => (e.currentTarget.style.borderColor = NAVY)} onBlur={(e) => (e.currentTarget.style.borderColor = "")} />;
}
function SelectBox(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={FIELD_CLS + " appearance-none"} style={FONT}
    onFocus={(e) => (e.currentTarget.style.borderColor = NAVY)} onBlur={(e) => (e.currentTarget.style.borderColor = "")} />;
}
function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={FIELD_CLS + " resize-none"} style={FONT}
    onFocus={(e) => (e.currentTarget.style.borderColor = NAVY)} onBlur={(e) => (e.currentTarget.style.borderColor = "")} />;
}

export default function CareersPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", area: "", cv: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Careers at SLIM BIZ | Join Our Talent Pool in Yaoundé, Cameroon";
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = "Join the SLIM BIZ talent pool. We're a marketing agency in Yaoundé, Cameroon, and we also help businesses recruit the right people.";
  }, []);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const applyFor = (title: string) => {
    set("area", title);
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://formsubmit.co/ajax/e1ebe916dc46af2e90be5073737b8e7e", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...form,
          _subject: `Talent Pool Application: ${form.area || "General"} — SLIM BIZ Website`,
          _replyto: form.email,
          _autoresponse: `Dear ${form.name},\n\nThank you for your interest in SLIM BIZ!\n\nWe have received your application and added it to our talent pool. We will contact you when a role matches your skills.\n\nWarm regards,\nThe SLIM BIZ Team\n📍 Rond Point Express, Yaoundé, Cameroun\n📞 +237 657 202 002`,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSent(true);
    } catch {
      setError("We could not send your application. Please try again, or contact us on +237 657 202 002.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero
        tag="Join Our Team"
        title="Build Careers. Build Brands."
        subtitle="We're not hiring for a specific role right now, but we're always glad to meet talented people. Join our talent pool and we'll reach out when the right role opens."
      />

      {/* Culture */}
      <section className="py-16 lg:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16">
            <div>
              <SectionTag label="Our Culture" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl text-foreground mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                A Place to Do Real Work and Grow Fast
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-5" style={FONT}>
                At SLIM BIZ, every team member works directly on client campaigns, contributes ideas and sees their work go live. We're a growing agency in a growing market.
              </p>
              <p className="text-muted-foreground leading-relaxed" style={FONT}>
                If you're ambitious, curious and want to build campaigns that actually move brands forward, we'd like to hear from you.
              </p>
            </div>
            <img src={cultureImg} alt="SLIM BIZ team working together" className="w-full object-cover object-top bg-muted h-72 sm:h-96" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CULTURE_VALUES.map((v) => (
              <div key={v.title} className="p-6 bg-card border border-border">
                <h3 className="text-foreground mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem" }}>{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed" style={FONT}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles / talent pool */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="max-w-5xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-10">
            <SectionTag label="Open Roles" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-foreground mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              {OPEN_ROLES.length > 0 ? "Current Openings" : "No Openings Right Now"}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto" style={FONT}>
              {OPEN_ROLES.length > 0
                ? "We hire for attitude and aptitude as much as experience."
                : "We'll be hiring in the coming months. Send us your details below and you'll be first on our list."}
            </p>
          </div>

          {OPEN_ROLES.length > 0 && (
            <div className="space-y-4 mb-10">
              {OPEN_ROLES.map((job) => (
                <div key={job.title} className="bg-card border border-border p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex gap-2 mb-2 flex-wrap">
                      <span className="text-[10px] px-2 py-0.5 tracking-wide uppercase" style={{ background: `${NAVY}12`, color: NAVY, ...FONT }}>{job.department}</span>
                      <span className="text-[10px] px-2 py-0.5 tracking-wide uppercase" style={{ background: `${ORANGE}12`, color: ORANGE, ...FONT }}>{job.type}</span>
                    </div>
                    <h3 className="text-foreground" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem" }}>{job.title}</h3>
                    <div className="flex gap-4 mt-2">
                      <span className="flex items-center gap-1.5 text-muted-foreground text-xs" style={FONT}><MapPin size={12} /><span>{job.location}</span></span>
                      <span className="flex items-center gap-1.5 text-muted-foreground text-xs" style={FONT}><Briefcase size={12} /><span>{job.type}</span></span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mt-3" style={FONT}>{job.desc}</p>
                  </div>
                  <button onClick={() => applyFor(job.title)}
                    className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 text-white text-sm font-medium transition-colors"
                    style={{ background: ORANGE, ...FONT }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = ORANGE_HVR)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = ORANGE)}>
                    <span>Apply</span> <ArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* How it works */}
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {HIRING_STEPS.map((s) => (
              <div key={s.num} className="p-6 bg-card border border-border">
                <p className="text-3xl mb-3" style={{ fontFamily: "'Playfair Display', serif", color: `${ORANGE}80` }}>{s.num}</p>
                <p className="text-foreground text-sm mb-2" style={FONT}>{s.title}</p>
                <p className="text-muted-foreground text-xs leading-relaxed" style={FONT}>{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Application form */}
          <div id="apply" className="bg-card border border-border p-6 sm:p-8 scroll-mt-28">
            {sent ? (
              <div key="sent" className="text-center py-10">
                <CheckCircle size={48} className="mx-auto mb-4" style={{ color: NAVY }} />
                <h3 className="text-foreground mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem" }}>Application Received!</h3>
                <p className="text-muted-foreground text-sm" style={FONT}>
                  Thank you. You're now in our talent pool, and we'll contact you when a role matches your skills.
                </p>
              </div>
            ) : (
              <form key="form" onSubmit={handleSubmit} className="space-y-4">
                <p className="text-foreground" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem" }}>Join the talent pool</p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name *</Label>
                    <TextInput required type="text" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Jane Smith" />
                  </div>
                  <div>
                    <Label>Email *</Label>
                    <TextInput required type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="jane@email.com" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Phone / WhatsApp</Label>
                    <TextInput type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+237 6XX XXX XXX" />
                  </div>
                  <div>
                    <Label>Area you're interested in *</Label>
                    <SelectBox required value={form.area} onChange={(e) => set("area", e.target.value)}>
                      <option value="">Select an area</option>
                      {OPEN_ROLES.map((r) => <option key={r.title} value={r.title}>{r.title}</option>)}
                      {INTEREST_AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
                    </SelectBox>
                  </div>
                </div>

                <div>
                  <Label>LinkedIn / CV link</Label>
                  <TextInput type="url" value={form.cv} onChange={(e) => set("cv", e.target.value)} placeholder="https://linkedin.com/in/..." />
                </div>

                <div>
                  <Label>Tell us about yourself *</Label>
                  <TextArea required rows={4} value={form.message} onChange={(e) => set("message", e.target.value)}
                    placeholder="Your experience, your best skills, and what you'd love to work on." />
                </div>

                {error && (
                  <div className="p-4 text-sm" style={{ ...FONT, background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.35)", color: "#b91c1c" }}>
                    {error}
                  </div>
                )}

                <button type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-4 text-white text-sm font-medium transition-colors disabled:opacity-60"
                  style={{ background: NAVY, ...FONT }}>
                  {loading ? (
                    <span key="sending">Sending…</span>
                  ) : (
                    <span key="idle" className="flex items-center gap-2"><span>Submit Application</span><Send size={14} /></span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Recruitment for clients */}
      <section className="py-16 lg:py-24" style={{ background: NAVY_DARK }}>
        <div className="max-w-5xl mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <SectionTag label="Need to Hire?" />
              <h2 className="text-2xl sm:text-3xl text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                We Help Businesses Find the Right People
              </h2>
              <p className="leading-relaxed mb-4" style={{ ...FONT, color: "rgba(255,255,255,0.6)" }}>
                We find and recruit staff for our own team, and we do the same for our clients. Tell us the role you need to fill, and we'll help you find and shortlist the right candidates.
              </p>
              <ul className="space-y-2">
                {["Marketing, design, video and digital roles", "Sales and customer-service staff", "Training for new hires through SLIM BIZ Academy"].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm" style={{ ...FONT, color: "rgba(255,255,255,0.7)" }}>
                    <CheckCircle size={14} className="mt-0.5 shrink-0" style={{ color: ORANGE }} /> <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <Link to="/consultation"
                className="flex items-center justify-between px-6 py-4 text-white text-sm transition-colors"
                style={{ background: ORANGE, ...FONT }}
                onMouseEnter={(e) => (e.currentTarget.style.background = ORANGE_HVR)}
                onMouseLeave={(e) => (e.currentTarget.style.background = ORANGE)}>
                <span>Tell us who you need to hire</span> <ArrowRight size={16} />
              </Link>
              <Link to="/training"
                className="flex items-center justify-between px-6 py-4 text-white text-sm transition-colors"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", ...FONT }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = ORANGE)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}>
                <span>See our training academy</span> <ArrowRight size={16} style={{ color: ORANGE }} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
