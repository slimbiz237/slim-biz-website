import { useState } from "react";

import { CheckCircle, ArrowRight, Phone, Star, Clock, Send } from "lucide-react";
import { NAVY, ORANGE, NAVY_DARK, NAVY_MID, ORANGE_HVR, TESTIMONIALS, SERVICES, SectionTag } from "../shared";

const BENEFITS = [
  { title: "Honest Assessment",       desc: "We'll review your current marketing honestly — including what's NOT worth doing — rather than just selling you services." },
  { title: "Channel Recommendations", desc: "Based on your goals, audience, and budget, we'll outline which channels offer the best ROI for your specific situation." },
  { title: "Budget Framework",        desc: "We'll share a realistic budget framework showing what different spend levels can realistically achieve." },
  { title: "Zero Obligation",         desc: "There's no pitch, no proposal fee, and no pressure. You get genuine strategic thinking with zero strings attached." },
];

export default function ConsultationPage() {
  const [step, setStep] = useState<"form" | "booked">("form");
  const [form, setForm] = useState({
    name: "", email: "", company: "", phone: "",
    goals: "", services: [] as string[], budget: "", timeline: "", hear: "",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const toggleService = (s: string) => {
    setForm((f) => ({
      ...f,
      services: f.services.includes(s) ? f.services.filter((x) => x !== s) : [...f.services, s],
    }));
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("https://formsubmit.co/ajax/e1ebe916dc46af2e90be5073737b8e7e", {
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
    } finally {
      setLoading(false);
      setStep("booked");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-24 overflow-hidden" style={{ background: NAVY_DARK }}>
        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: ORANGE }} />
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=500&fit=crop&auto=format" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-10" style={{ background: ORANGE }} />
                <p className="text-xs tracking-[0.3em] uppercase font-medium" style={{ fontFamily: "'Inter', sans-serif", color: ORANGE }}>100% Free · No Obligation</p>
              </div>
              <h1 className="text-4xl lg:text-5xl text-white mb-5 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Book Your Free<br />
                <span className="italic" style={{ color: ORANGE }}>30-Minute Strategy Call</span>
              </h1>
              <p className="text-white/70 text-lg leading-relaxed mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
                Tell us about your brand and goals. We'll give you honest strategic thinking — including what NOT to do — at absolutely no cost and with zero sales pressure.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {BENEFITS.map((b) => (
                  <div key={b.title} className="p-4 border" style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)" }}>
                    <CheckCircle size={16} className="mb-2" style={{ color: ORANGE }} />
                    <p className="text-white text-sm mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>{b.title}</p>
                    <p className="text-xs leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.5)" }}>{b.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {TESTIMONIALS.slice(0, 3).map((t) => (
                    <img key={t.name} src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover object-top border-2 bg-muted" style={{ borderColor: NAVY_DARK }} />
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => <Star key={i} size={13} style={{ color: ORANGE, fill: ORANGE }} />)}
                  </div>
                  <p className="text-white/60 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>Rated 4.9/5 by 150+ clients</p>
                </div>
              </div>
            </div>

            {/* Form / Success */}
            <div className="bg-card border border-border p-8">
              {step === "booked" ? (
                <div className="text-center py-12">
                  <CheckCircle size={56} className="mx-auto mb-5" style={{ color: ORANGE }} />
                  <h2 className="text-foreground mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem" }}>You're Booked!</h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                    We've received your request. A senior team member will reach out within one working day to confirm your call time.
                  </p>
                  <div className="p-5 mb-6 text-left border-l-4" style={{ background: "var(--secondary)", borderColor: ORANGE }}>
                    <p className="text-foreground text-sm mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>While you wait, explore our work:</p>
                    <a href="/portfolio" className="text-sm font-medium" style={{ color: ORANGE, fontFamily: "'Inter', sans-serif" }}>→ View our portfolio</a>
                  </div>
                  <p className="text-muted-foreground text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Questions? Call us directly: <a href="tel:+237657202002" style={{ color: ORANGE }}>+237 657 202 002</a>
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <p className="text-foreground text-sm mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem" }}>Tell us about your brand</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { label: "Full Name *",  key: "name",  type: "text",  ph: "Jane Smith" },
                      { label: "Email *",       key: "email", type: "email", ph: "jane@company.com" },
                    ].map((f) => (
                      <div key={f.key}>
                        <label className="block text-xs text-muted-foreground tracking-wide uppercase mb-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>{f.label}</label>
                        <input required type={f.type} value={(form as any)[f.key]} onChange={(e) => set(f.key, e.target.value)} placeholder={f.ph}
                          className="w-full px-4 py-3 bg-input-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none transition-colors"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = NAVY)}
                          onBlur={(e) => (e.currentTarget.style.borderColor = "")} />
                      </div>
                    ))}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-muted-foreground tracking-wide uppercase mb-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>Company / Brand</label>
                      <input value={form.company} onChange={(e) => set("company", e.target.value)} placeholder="Acme Co."
                        className="w-full px-4 py-3 bg-input-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none transition-colors"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = NAVY)}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "")} />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground tracking-wide uppercase mb-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>Phone Number</label>
                      <input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+237 6XX XXX XXX" type="tel"
                        className="w-full px-4 py-3 bg-input-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none transition-colors"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = NAVY)}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "")} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-muted-foreground tracking-wide uppercase mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>Services You're Interested In</label>
                    <div className="flex flex-wrap gap-2">
                      {[...SERVICES.slice(0, 6).map((s) => s.title), "Training"].map((title) => (
                        <button
                          key={title}
                          type="button"
                          onClick={() => toggleService(title)}
                          className="px-3 py-1.5 text-xs tracking-wide transition-all duration-200"
                          style={{
                            fontFamily: "'Inter', sans-serif",
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
                      <label className="block text-xs text-muted-foreground tracking-wide uppercase mb-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>Monthly Budget</label>
                      <select value={form.budget} onChange={(e) => set("budget", e.target.value)}
                        className="w-full px-4 py-3 bg-input-background border border-border text-foreground text-sm focus:outline-none appearance-none"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = NAVY)}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "")}>
                        <option value="">Select budget range</option>
                        {["50,000 FCFA", "75,000 FCFA", "100,000 FCFA", "150,000 FCFA", "200,000 FCFA", "250,000 FCFA", "300,000 FCFA", "350,000 FCFA", "400,000 FCFA", "450,000 FCFA", "500,000 FCFA", "600,000 FCFA", "700,000 FCFA", "800,000 FCFA", "900,000 FCFA", "1,000,000 FCFA", "1,500,000 FCFA", "2,000,000 FCFA", "3,000,000 FCFA", "5,000,000 FCFA+"].map((b) => <option key={b}>{b}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground tracking-wide uppercase mb-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>Timeline</label>
                      <select value={form.timeline} onChange={(e) => set("timeline", e.target.value)}
                        className="w-full px-4 py-3 bg-input-background border border-border text-foreground text-sm focus:outline-none appearance-none"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = NAVY)}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "")}>
                        <option value="">When do you want to start?</option>
                        {["Immediately", "Within 1 month", "1–3 months", "3–6 months", "Just exploring"].map((t) => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-muted-foreground tracking-wide uppercase mb-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>What are your main marketing goals? *</label>
                    <textarea required rows={3} value={form.goals} onChange={(e) => set("goals", e.target.value)}
                      placeholder="Brand awareness, more leads, product launch, entering a new market..."
                      className="w-full px-4 py-3 bg-input-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none resize-none"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = NAVY)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "")} />
                  </div>

                  <button type="submit" disabled={loading}
                    className="w-full flex items-center justify-center gap-3 py-4 text-white text-sm font-medium tracking-wide transition-colors group disabled:opacity-60"
                    style={{ background: ORANGE, fontFamily: "'Inter', sans-serif" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = ORANGE_HVR)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = ORANGE)}>
                    {loading ? "Sending…" : <> Book My Free Consultation <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /> </>}
                  </button>

                  <p className="text-center text-muted-foreground text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <Clock size={11} className="inline mr-1" />
                    30-minute call · Zero obligation · Response within 1 working day
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Social proof strip */}
      <section className="py-16 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "150+", label: "Brands Served" },
              { value: "4.9/5", label: "Average Client Rating" },
              { value: "97%", label: "Retention Rate" },
              { value: "< 1 day", label: "Average Response Time" },
            ].map((m) => (
              <div key={m.label}>
                <p className="mb-1" style={{ fontFamily: "'Playfair Display', serif", color: ORANGE, fontSize: "2rem" }}>{m.value}</p>
                <p className="text-muted-foreground text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial strip */}
      <section className="py-20" style={{ background: NAVY_DARK }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-12">
            <SectionTag label="What Clients Say" />
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {TESTIMONIALS.slice(0, 3).map((t) => (
              <div key={t.name} className="p-6 border" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={14} style={{ color: ORANGE, fill: ORANGE }} />)}
                </div>
                <p className="italic leading-relaxed mb-5 text-sm" style={{ fontFamily: "'Playfair Display', serif", color: "rgba(255,255,255,0.85)" }}>
                  "{t.quote.slice(0, 150)}..."
                </p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover object-top bg-muted" />
                  <div>
                    <p className="text-white text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>{t.name}</p>
                    <p className="text-xs" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.45)" }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
