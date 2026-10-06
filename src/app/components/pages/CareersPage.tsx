import { useState } from "react";
import { Link } from "react-router";
import { MapPin, Briefcase, Clock, ArrowRight, Send, CheckCircle, X } from "lucide-react";
import { NAVY, ORANGE, NAVY_DARK, NAVY_MID, ORANGE_HVR, JOBS, TEAM, SectionTag, PageHero } from "../shared";
import cultureImg from "@/imports/image_mf-1.png";

const CULTURE_VALUES = [
  { title: "Senior Talent. Real Work.",    desc: "Every team member works on real campaigns for real brands. No internal busywork, no account-padding, no hierarchy for its own sake." },
  { title: "Integrated by Design",         desc: "You'll work across strategy, creative, and media — not siloed in a single channel. Expect to learn things you didn't expect to." },
  { title: "Growth That Matters",          desc: "We invest in our people: training, conference attendance, mentorship from experienced leaders, and clear paths to senior roles." },
  { title: "Outcomes Over Hours",          desc: "We care about what you deliver, not when you clock in. Results-focused culture with flexible working for the right people." },
];

export default function CareersPage() {
  const [activeJob, setActiveJob] = useState<number | null>(null);
  const [applied, setApplied] = useState<string | null>(null);
  const [appForm, setAppForm] = useState({ name: "", email: "", cv: "", message: "" });
  const [applyLoading, setApplyLoading] = useState(false);

  const setField = (k: string, v: string) => setAppForm((f) => ({ ...f, [k]: v }));

  const handleApply = async (e: React.FormEvent, jobTitle: string) => {
    e.preventDefault();
    setApplyLoading(true);
    try {
      await fetch("https://formsubmit.co/ajax/e1ebe916dc46af2e90be5073737b8e7e", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...appForm, position: jobTitle, _subject: `Job Application: ${jobTitle} — SLIM BIZ Website` }),
      });
    } finally {
      setApplyLoading(false);
      setApplied(jobTitle);
    }
  };

  return (
    <>
      <PageHero
        tag="Join Our Team"
        title="Build Careers. Build Brands."
        subtitle="We're a team of strategists, creatives, and media experts who believe great advertising changes businesses. Sound like your kind of place?"
      />

      {/* Culture */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <SectionTag label="Our Culture" />
              <h2 className="text-3xl lg:text-4xl text-foreground mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                A Place Where Senior People Do Senior Work
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-5" style={{ fontFamily: "'Inter', sans-serif" }}>
                At SLIM BIZ, we don't believe in hierarchy for its own sake. Every team member — from junior analyst to creative director — works directly with clients, contributes ideas in strategy sessions, and sees their work shipped to the world.
              </p>
              <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                We're a growing agency in a growing market. If you're ambitious, curious, and want to build campaigns that actually move brands forward — this is the right place.
              </p>
            </div>
            <img
              src={cultureImg}
              alt="SLIM BIZ team working together"
              className="w-full object-cover object-top bg-muted"
              style={{ height: 400 }}
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CULTURE_VALUES.map((v) => (
              <div key={v.title} className="p-6 bg-card border border-border">
                <h3 className="text-foreground mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem" }}>{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20" style={{ background: NAVY_DARK }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-12">
            <SectionTag label="What We Offer" />
            <h2 className="text-3xl text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Benefits & Perks</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Competitive Salary",          desc: "Market-rate pay with annual performance reviews and merit-based increases." },
              { title: "Flexible Working",            desc: "Hybrid model with remote options for eligible roles after 3-month onboarding." },
              { title: "Training Budget",             desc: "FCFA 200K annual learning budget for courses, conferences, and certifications." },
              { title: "Health Insurance",            desc: "Comprehensive health coverage for you and your immediate family." },
              { title: "Mentorship Programme",        desc: "Structured mentorship from senior leaders and access to our network." },
              { title: "Real Client Exposure",        desc: "You'll work on real campaigns from day one. No busywork, no sidelining." },
            ].map((b) => (
              <div key={b.title} className="p-6 border" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="w-2 h-2 mb-4" style={{ background: ORANGE }} />
                <h3 className="text-white mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem" }}>{b.title}</h3>
                <p className="text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.55)" }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open positions */}
      <section className="py-24 lg:py-32 bg-secondary">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-16">
            <SectionTag label="Open Roles" />
            <h2 className="text-3xl lg:text-4xl text-foreground mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Current Openings</h2>
            <p className="text-muted-foreground max-w-xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
              We hire for attitude and aptitude as much as experience. If you don't see a perfect match, send us an open application.
            </p>
          </div>

          <div className="space-y-4">
            {JOBS.map((job, i) => (
              <div key={job.title}>
                <div
                  className="bg-card border border-border overflow-hidden cursor-pointer"
                  onClick={() => setActiveJob(activeJob === i ? null : i)}>
                  <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    onMouseEnter={(e) => (e.currentTarget.style.background = `${ORANGE}06`)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "")}>
                    <div>
                      <div className="flex gap-2 mb-2 flex-wrap">
                        <span className="text-[10px] px-2 py-0.5 tracking-wide uppercase"
                          style={{ background: `${NAVY}12`, color: NAVY, fontFamily: "'Inter', sans-serif" }}>{job.department}</span>
                        <span className="text-[10px] px-2 py-0.5 tracking-wide uppercase"
                          style={{ background: `${ORANGE}12`, color: ORANGE, fontFamily: "'Inter', sans-serif" }}>{job.type}</span>
                      </div>
                      <h3 className="text-foreground" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem" }}>{job.title}</h3>
                      <div className="flex gap-4 mt-2">
                        <span className="flex items-center gap-1.5 text-muted-foreground text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
                          <MapPin size={12} />{job.location}
                        </span>
                        <span className="flex items-center gap-1.5 text-muted-foreground text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
                          <Briefcase size={12} />{job.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="text-sm" style={{ color: ORANGE, fontFamily: "'Inter', sans-serif" }}>
                        {activeJob === i ? "Collapse" : "View & Apply"}
                      </span>
                      <ArrowRight size={16} style={{ color: ORANGE, transform: activeJob === i ? "rotate(90deg)" : "none", transition: "transform 0.2s" }} />
                    </div>
                  </div>
                </div>

                {activeJob === i && (
                  <div className="bg-card border border-border border-t-0 p-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                      <div>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>{job.desc}</p>
                        <p className="text-foreground text-sm mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>What we're looking for:</p>
                        <ul className="space-y-2">
                          {["Strong strategic and analytical thinking", "Excellent communication skills (French & English)", "Proactive, self-starter mentality", "Collaborative team player", "Relevant experience in marketing/advertising"].map((req) => (
                            <li key={req} className="flex items-start gap-2.5">
                              <CheckCircle size={14} className="mt-0.5 shrink-0" style={{ color: ORANGE }} />
                              <span className="text-muted-foreground text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {applied === job.title ? (
                        <div className="text-center py-12">
                          <CheckCircle size={48} className="mx-auto mb-4" style={{ color: NAVY }} />
                          <h4 className="text-foreground mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Application Received!</h4>
                          <p className="text-muted-foreground text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>We'll review your application and reach out within 5 working days.</p>
                        </div>
                      ) : (
                        <form onSubmit={(e) => handleApply(e, job.title)} className="space-y-4">
                          <p className="text-foreground text-sm mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>Apply for this role:</p>
                          {[
                            { label: "Full Name *", key: "name", type: "text", ph: "Jane Smith" },
                            { label: "Email *",     key: "email", type: "email", ph: "jane@email.com" },
                            { label: "LinkedIn / CV URL", key: "cv", type: "url", ph: "https://linkedin.com/in/..." },
                          ].map((f) => (
                            <div key={f.key}>
                              <label className="block text-xs text-muted-foreground tracking-wide uppercase mb-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>{f.label}</label>
                              <input required={f.label.includes("*")} type={f.type} value={(appForm as any)[f.key]} onChange={(e) => setField(f.key, e.target.value)} placeholder={f.ph}
                                className="w-full px-4 py-3 bg-input-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none"
                                style={{ fontFamily: "'Inter', sans-serif" }}
                                onFocus={(e) => (e.currentTarget.style.borderColor = NAVY)}
                                onBlur={(e) => (e.currentTarget.style.borderColor = "")} />
                            </div>
                          ))}
                          <div>
                            <label className="block text-xs text-muted-foreground tracking-wide uppercase mb-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>Why SLIM BIZ? *</label>
                            <textarea required rows={4} value={appForm.message} onChange={(e) => setField("message", e.target.value)}
                              placeholder="Tell us why you want to work here and what you'd bring to this role."
                              className="w-full px-4 py-3 bg-input-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none resize-none"
                              style={{ fontFamily: "'Inter', sans-serif" }}
                              onFocus={(e) => (e.currentTarget.style.borderColor = NAVY)}
                              onBlur={(e) => (e.currentTarget.style.borderColor = "")} />
                          </div>
                          <button type="submit" disabled={applyLoading}
                            className="w-full flex items-center justify-center gap-2 py-3.5 text-white text-sm font-medium transition-colors disabled:opacity-60"
                            style={{ background: NAVY, fontFamily: "'Inter', sans-serif" }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = NAVY_MID)}
                            onMouseLeave={(e) => (e.currentTarget.style.background = NAVY)}>
                            {applyLoading ? "Sending…" : <> Submit Application <Send size={14} /> </>}
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Open application */}
          <div className="mt-12 p-8 border border-dashed text-center" style={{ borderColor: `${NAVY}30` }}>
            <h3 className="text-foreground mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem" }}>Don't See Your Role?</h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-lg mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
              We always welcome exceptional talent. Send us an open application with your background and what you'd love to work on.
            </p>
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 text-white text-sm font-medium transition-colors"
              style={{ background: ORANGE, fontFamily: "'Inter', sans-serif" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = ORANGE_HVR)}
              onMouseLeave={(e) => (e.currentTarget.style.background = ORANGE)}>
              Send Open Application <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
