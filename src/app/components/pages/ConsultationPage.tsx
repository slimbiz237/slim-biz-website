import { useState, useEffect } from "react";
import type { InputHTMLAttributes, SelectHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router";
import { CheckCircle, ArrowRight, Phone, Star, Clock, ExternalLink } from "lucide-react";
import { NAVY, ORANGE, NAVY_DARK, ORANGE_HVR, SERVICES, SectionTag } from "../shared";

const SORTLIST_URL = "https://www.sortlist.com/agency/slim-biz-marketing-agency#reviews";
const GOOGLE_REVIEW_URL = "https://www.google.com/maps/contrib/100748149562616474313/reviews?hl=en-GB";

const BENEFITS = [
  { title: "Honest Assessment",       desc: "We'll review your current marketing honestly — including what's NOT worth doing — rather than just selling you services." },
  { title: "Channel Recommendations", desc: "Based on your goals, audience, and budget, we'll outline which channels offer the best ROI for your specific situation." },
  { title: "Budget Framework",        desc: "We'll share a realistic budget framework showing what different spend levels can realistically achieve." },
  { title: "Zero Obligation",         desc: "There's no pitch, no proposal fee, and no pressure. You get genuine strategic thinking with zero strings attached." },
];

const BUDGETS = ["50,000 FCFA", "75,000 FCFA", "100,000 FCFA", "150,000 FCFA", "200,000 FCFA", "250,000 FCFA", "300,000 FCFA", "350,000 FCFA", "400,000 FCFA", "450,000 FCFA", "500,000 FCFA", "600,000 FCFA", "700,000 FCFA", "800,000 FCFA", "900,000 FCFA", "1,000,000 FCFA", "1,500,000 FCFA", "2,000,000 FCFA", "3,000,000 FCFA", "5,000,000 FCFA+"];
const TIMELINES = ["Immediately", "Within 1 month", "1–3 months", "3–6 months", "Just exploring"];

// ─── Small form pieces (defined outside the page so inputs keep focus) ────────
const FIELD_CLS = "w-full px-4 py-3 bg-input-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none transition-colors";
const FONT = { fontFamily: "'Inter', sans-serif" } as const;

function Label({ children }: { children: ReactNode }) {
  return (
    <label className="block text-xs text-muted-foreground tracking-wide uppercase mb-1.5" style={FONT}>
      {children}
    </label>
  );
}

function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={FIELD_CLS}
      style={FONT}
      onFocus={(e) => (e.currentTarget.style.borderColor = NAVY)}
      onBlur={(e) => (e.currentTarget.style.borderColor = "")}
    />
  );
}

function SelectBox(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={FIELD_CLS + " appearance-none"}
      style={FONT}
      onFocus={(e) => (e.currentTarget.style.borderColor = NAVY)}
      onBlur={(e) => (e.currentTarget.style.borderColor = "")}
    />
  );
}

export default function ConsultationPage() {
  const [step, setStep] = useState<"form" | "booked">("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", company: "", phone: "",
    goals: "", services: [] as string[], budget: "", timeline: "", hear: "",
  });

  useEffect(() => {
    document.title = "Free Marketing Consultation | SLIM BIZ Marketing Agency, Yaoundé";
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = "Book a free 30-minute marketing strategy call with SLIM BIZ in Yaoundé, Cameroon. Honest advice on channels and budget, with no obligation.";
  }, []);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const toggleService = (s: string) => {
    setForm((f) => ({
      ...f,
      services: f.services.includes(s) ? f.services.filter((x) => x !== s) : [...f.services, s],
    }));
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
          services: form.services.join(", "),
          _subject: "New Consultation Request — SLIM BIZ Website",
          _replyto: form.email,
          _autoresponse: `Dear ${form.name},\n\nThank you for booking a free consultation with SLIM BIZ Marketing Agency!\n\nWe have received your request and a senior strategist will contact you within 1 working day to confirm your consultation slot.\n\nHere is a summary of what to expect:\n• An honest review of your current marketing\n• Channel recommendations tailored to your goals and budget\n• A realistic budget framework — zero obligation\n\nVisit us at slimbizmarketingagency.com to learn more about our work.\n\nWarm regards,\nThe SLIM BIZ Team\n📍 Rond Point Express, Yaoundé, Cameroun\n📞 +237 657 202 002`,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStep("booked");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("We could not send your request. Please try again, or call or WhatsApp us on +237 657 202 002.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden" style={{ background: NAVY_DARK }}>
        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: ORANGE }} />
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=500&fit=crop&auto=format" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-10 shrink-0" style={{ background: ORANGE }} />
                <p className="text-xs tracking-[0.3em] uppercase font-medium" style={{ ...FONT, color: ORANGE }}>100% Free · No Obligation</p>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-5 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Book Your Free<br />
                <span className="italic" style={{ color: ORANGE }}>30-Minute Strategy Call</span>
              </h1>
              <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-8" style={FONT}>
                Tell us about your brand and goals. We'll give you honest strategic thinking — including what NOT to do — at absolutely no cost and with zero sales pressure.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {BENEFITS.map((b) => (
                  <div key={b.title} className="p-4 border" style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)" }}>
                    <CheckCircle size={16} className="mb-2" style={{ color: ORANGE }} />
                    <p className="text-white text-sm mb-1" style={FONT}>{b.title}</p>
                    <p className="text-xs leading-relaxed" style={{ ...FONT, color: "rgba(255,255,255,0.5)" }}>{b.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} style={{ color: ORANGE, fill: s <= 4 ? ORANGE : "transparent" }} />
                  ))}
                </div>
                <p className="text-white/60 text-xs" style={FONT}>Rated 4.5/5 by a client on Sortlist</p>
              </div>
            </div>

            {/* Form / Success */}
            <div className="bg-card border border-border p-6 sm:p-8">
              {step === "booked" ? (
                <div key="booked" className="text-center py-12">
                  <CheckCircle size={56} className="mx-auto mb-5" style={{ color: ORANGE }} />
                  <h2 className="text-foreground mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem" }}>You're Booked!</h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed" style={FONT}>
                    We've received your request. A senior team member will reach out within one working day to confirm your call time.
                  </p>
                  <div className="p-5 mb-6 text-left border-l-4" style={{ background: "var(--secondary)", borderColor: ORANGE }}>
                    <p className="text-foreground text-sm mb-1" style={FONT}>While you wait, explore our work:</p>
                    <Link to="/portfolio" className="text-sm font-medium" style={{ color: ORANGE, ...FONT }}>
                      <span>→ View our portfolio</span>
                    </Link>
                  </div>
                  <p className="text-muted-foreground text-xs" style={FONT}>
                    <span>Questions? Call us directly: </span>
                    <a href="tel:+237657202002" style={{ color: ORANGE }}>+237 657 202 002</a>
                  </p>
                </div>
              ) : (
                <form key="form" onSubmit={handleSubmit} className="space-y-5">
                  <p className="text-foreground" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem" }}>Tell us about your brand</p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label>Full Name *</Label>
                      <TextInput required type="text" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Jane Smith" />
                    </div>
                    <div>
                      <Label>Email *</Label>
                      <TextInput required type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="jane@company.com" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label>Company / Brand</Label>
                      <TextInput value={form.company} onChange={(e) => set("company", e.target.value)} placeholder="Acme Co." />
                    </div>
                    <div>
                      <Label>Phone Number</Label>
                      <TextInput type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+237 6XX XXX XXX" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-muted-foreground tracking-wide uppercase mb-2" style={FONT}>Services You're Interested In</label>
                    <div className="flex flex-wrap gap-2">
                      {[...SERVICES.slice(0, 6).map((s) => s.title), "Training"].map((title) => (
                        <button
                          key={title}
                          type="button"
                          onClick={() => toggleService(title)}
                          className="px-3 py-2 text-xs tracking-wide transition-all duration-200"
                          style={{
                            ...FONT,
                            background: form.services.includes(title) ? NAVY : "var(--secondary)",
                            color: form.services.includes(title) ? "#fff" : "var(--foreground)",
                            border: `1px solid ${form.services.includes(title) ? NAVY : "var(--border)"}`,
                          }}>
                          {title}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label>Monthly Budget</Label>
                      <SelectBox value={form.budget} onChange={(e) => set("budget", e.target.value)}>
                        <option value="">Select budget range</option>
                        {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                      </SelectBox>
                    </div>
                    <div>
                      <Label>Timeline</Label>
                      <SelectBox value={form.timeline} onChange={(e) => set("timeline", e.target.value)}>
                        <option value="">When do you want to start?</option>
                        {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </SelectBox>
                    </div>
                  </div>

                  <div>
                    <Label>What are your main marketing goals? *</Label>
                    <textarea
                      required rows={3} value={form.goals} onChange={(e) => set("goals", e.target.value)}
                      placeholder="Brand awareness, more leads, product launch, entering a new market..."
                      className={FIELD_CLS + " resize-none"}
                      style={FONT}
                      onFocus={(e) => (e.currentTarget.style.borderColor = NAVY)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "")}
                    />
                  </div>

                  {error && (
                    <div className="p-4 text-sm" style={{ ...FONT, background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.35)", color: "#b91c1c" }}>
                      {error}
                    </div>
                  )}

                  <button type="submit" disabled={loading}
                    className="w-full flex items-center justify-center gap-3 py-4 text-white text-sm font-medium tracking-wide transition-colors group disabled:opacity-60"
                    style={{ background: ORANGE, ...FONT }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = ORANGE_HVR)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = ORANGE)}>
                    {loading ? (
                      <span key="sending">Sending…</span>
                    ) : (
                      <span key="idle" className="flex items-center gap-3">
                        <span>Book My Free Consultation</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </button>

                  <p className="text-center text-muted-foreground text-xs" style={FONT}>
                    <Clock size={11} className="inline mr-1" />
                    <span>30-minute call · Zero obligation · Response within 1 working day</span>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Facts strip */}
      <section className="py-14 sm:py-16 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "4.5/5",   label: "Sortlist Rating" },
              { value: "40",      label: "Academy Courses" },
              { value: "EN & FR", label: "Two Languages" },
              { value: "1 day",   label: "We Reply Within" },
            ].map((m) => (
              <div key={m.label}>
                <p className="mb-1" style={{ fontFamily: "'Playfair Display', serif", color: ORANGE, fontSize: "2rem" }}>{m.value}</p>
                <p className="text-muted-foreground text-sm" style={FONT}>{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client review */}
      <section className="py-16 sm:py-20" style={{ background: NAVY_DARK }}>
        <div className="max-w-3xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-10">
            <SectionTag label="What Clients Say" />
          </div>
          <div className="p-6 sm:p-8 border text-center" style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }}>
            <div className="flex justify-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={16} style={{ color: ORANGE, fill: ORANGE }} />
              ))}
            </div>
            <p lang="fr" className="italic leading-relaxed mb-5 text-sm sm:text-base" style={{ fontFamily: "'Playfair Display', serif", color: "rgba(255,255,255,0.85)" }}>
              “La meilleure agence! ma marque Carilux Cosmétiques est aujourd'hui reconnue partout au Cameroun grâce aux partenariat entre nous et slim biz Équipe pro, créative et efficace. Je recommande à 100%.”
            </p>
            <p className="text-white text-sm" style={FONT}>Carilux Cosmetics · Google review</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-2 mt-4">
              <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium"
                style={{ ...FONT, color: ORANGE }}>
                <span>See it on Google</span> <ExternalLink size={13} />
              </a>
              <a href={SORTLIST_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium"
                style={{ ...FONT, color: "rgba(255,255,255,0.7)" }}>
                <span>Also reviewed on Sortlist (4.5/5)</span> <ExternalLink size={13} />
              </a>
            </div>
          </div>
          <div className="text-center mt-8">
            <a href="tel:+237657202002"
              className="inline-flex items-center justify-center gap-2 text-white/70 text-sm hover:text-white transition-colors"
              style={FONT}>
              <Phone size={14} /> <span>Prefer to talk? +237 657 202 002</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
