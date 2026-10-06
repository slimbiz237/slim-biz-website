import { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle, Instagram, Linkedin, Facebook, Clock } from "lucide-react";
import { NAVY, ORANGE, NAVY_DARK, NAVY_MID, SERVICES, SectionTag, PageHero } from "../shared";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", budget: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("https://formsubmit.co/ajax/e1ebe916dc46af2e90be5073737b8e7e", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...form,
          _subject: "New Contact Message — SLIM BIZ Website",
          _replyto: form.email,
          _autoresponse: `Dear ${form.name},\n\nThank you for reaching out to SLIM BIZ Marketing Agency!\n\nWe have received your message and one of our senior strategists will get back to you within 1 working day.\n\nIn the meantime, feel free to explore our work at slimbizmarketingagency.com.\n\nWarm regards,\nThe SLIM BIZ Team\n📍 Rond Point Express, Yaoundé, Cameroun\n📞 +237 657 202 002`,
        }),
      });
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <>
      <PageHero
        tag="Get In Touch"
        title="Let's Talk About Your Brand"
        subtitle="Tell us where your marketing is today and where you want it to be. We'll come back to you within one working day."
      />

      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Left column */}
            <div className="lg:col-span-2">
              <SectionTag label="Contact Information" />
              <h2 className="text-3xl text-foreground mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Four Ways to Reach Us
              </h2>

              <div className="space-y-6 mb-10">
                {[
                  { icon: Phone,  label: "Phone",   value: "+237 657 202 002", sub: "Mon–Fri, 8am–6pm (WAT)" },
                  { icon: Mail,   label: "Email",   value: "infoslimbiz@gmail.com", sub: "We reply within 1 working day" },
                  { icon: MapPin, label: "Office",  value: "Rond Point Express\nYaoundé, Cameroun", sub: "Open to visits by appointment" },
                  { icon: Clock,  label: "Hours",   value: "Mon–Fri: 8:00am – 6:00pm\nSat: 9:00am – 1:00pm", sub: "WAT (UTC+1)" },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4">
                    <div className="w-10 h-10 flex items-center justify-center shrink-0" style={{ background: `${NAVY}12` }}>
                      <item.icon size={16} style={{ color: NAVY }} />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs tracking-wide uppercase mb-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>{item.label}</p>
                      <p className="text-foreground text-sm whitespace-pre-line mb-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>{item.value}</p>
                      <p className="text-muted-foreground text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div className="mb-10">
                <p className="text-xs text-muted-foreground tracking-widest uppercase mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>Follow Our Work</p>
                <div className="flex gap-3">
                  {[
                    { icon: Instagram, label: "@slimbizllc", href: "https://www.instagram.com/slimbizllc/" },
                    { icon: Linkedin,  label: "slim-bizllc", href: "https://www.linkedin.com/company/slim-bizllc/" },
                    { icon: Facebook,  label: "slimbizsarl", href: "https://www.facebook.com/slimbizsarl" },
                  ].map(({ icon: Icon, label, href }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}
                      className="w-10 h-10 border flex items-center justify-center transition-colors"
                      style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = ORANGE; e.currentTarget.style.color = ORANGE; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = ""; e.currentTarget.style.color = ""; }}>
                      <Icon size={15} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="relative h-48 overflow-hidden bg-muted border border-border">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=300&fit=crop&auto=format"
                  alt="Yaoundé, Cameroun map view"
                  className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white px-4 py-2 text-center shadow-lg">
                    <p className="text-xs font-medium" style={{ fontFamily: "'Inter', sans-serif", color: NAVY }}>Rond Point Express</p>
                    <p className="text-xs text-gray-500" style={{ fontFamily: "'Inter', sans-serif" }}>Yaoundé, Cameroun</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - form */}
            <div className="lg:col-span-3">
              <div className="bg-card border border-border p-8 lg:p-10">
                {submitted ? (
                  <div className="text-center py-20">
                    <CheckCircle size={56} className="mx-auto mb-5" style={{ color: NAVY }} />
                    <h3 className="text-foreground mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem" }}>Message Sent Successfully</h3>
                    <p className="text-muted-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
                      A senior team member will review your enquiry and respond within one working day.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-5" style={{ fontFamily: "'Inter', sans-serif" }}>Your Information</p>
                      <div className="grid sm:grid-cols-2 gap-5">
                        {[
                          { label: "Full Name *", key: "name", type: "text", ph: "Jane Smith" },
                          { label: "Email *",     key: "email", type: "email", ph: "jane@company.com" },
                        ].map((f) => (
                          <div key={f.key}>
                            <label className="block text-xs text-muted-foreground tracking-wide uppercase mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>{f.label}</label>
                            <input required type={f.type} value={(form as any)[f.key]} onChange={(e) => set(f.key, e.target.value)} placeholder={f.ph}
                              className="w-full px-4 py-3 bg-input-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none transition-colors"
                              style={{ fontFamily: "'Inter', sans-serif" }}
                              onFocus={(e) => (e.currentTarget.style.borderColor = NAVY)}
                              onBlur={(e) => (e.currentTarget.style.borderColor = "")} />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs text-muted-foreground tracking-wide uppercase mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>Company / Brand <span className="normal-case tracking-normal" style={{ color: "var(--muted-foreground)" }}>(optional)</span></label>
                        <input value={form.company} onChange={(e) => set("company", e.target.value)} placeholder="Acme Co. — leave blank if individual"
                          className="w-full px-4 py-3 bg-input-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none transition-colors"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = NAVY)}
                          onBlur={(e) => (e.currentTarget.style.borderColor = "")} />
                      </div>
                      <div>
                        <label className="block text-xs text-muted-foreground tracking-wide uppercase mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>Service Needed</label>
                        <select value={form.service} onChange={(e) => set("service", e.target.value)}
                          className="w-full px-4 py-3 bg-input-background border border-border text-foreground text-sm focus:outline-none transition-colors appearance-none"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = NAVY)}
                          onBlur={(e) => (e.currentTarget.style.borderColor = "")}>
                          <option value="">Select a service</option>
                          {SERVICES.map((s) => <option key={s.title} value={s.title}>{s.title}</option>)}
                          <option value="Multiple / Not sure">Multiple / Not sure</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-muted-foreground tracking-wide uppercase mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>Monthly Marketing Budget</label>
                      <select value={form.budget} onChange={(e) => set("budget", e.target.value)}
                        className="w-full px-4 py-3 bg-input-background border border-border text-foreground text-sm focus:outline-none transition-colors appearance-none"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = NAVY)}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "")}>
                        <option value="">Select a budget range</option>
                        {["Under FCFA 500K", "FCFA 500K – 1M", "FCFA 1M – 3M", "FCFA 3M – 10M", "FCFA 10M+"].map((b) => <option key={b}>{b}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-muted-foreground tracking-wide uppercase mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>Tell Us About Your Goals *</label>
                      <textarea required rows={5} value={form.message} onChange={(e) => set("message", e.target.value)}
                        placeholder="What's working, what isn't, what you're trying to achieve — the more context, the better our first conversation will be."
                        className="w-full px-4 py-3 bg-input-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none transition-colors resize-none"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = NAVY)}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "")} />
                    </div>

                    <button type="submit" disabled={loading}
                      className="w-full flex items-center justify-center gap-3 py-4 text-white font-medium text-sm tracking-wide transition-colors group disabled:opacity-60"
                      style={{ background: NAVY, fontFamily: "'Inter', sans-serif" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = NAVY_MID)}
                      onMouseLeave={(e) => (e.currentTarget.style.background = NAVY)}>
                      {loading ? "Sending…" : <> Send Message <Send size={16} className="group-hover:translate-x-1 transition-transform" /> </>}
                    </button>

                    <p className="text-center text-muted-foreground text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
                      We respond within one working day. No spam, ever.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
