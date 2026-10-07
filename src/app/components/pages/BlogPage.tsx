import { useState } from "react";
import { Link } from "react-router";
import { Calendar, Clock, Search, ArrowRight } from "lucide-react";
import { NAVY, ORANGE, NAVY_DARK, ORANGE_HVR, SectionTag, SectionTagLeft, PageHero } from "../shared";
type BlogPost = {
  title: string; date: string; category: string; tag: string;
  readTime: string; excerpt: string; body: string; author: string; img: string;
};
const postModules = import.meta.glob("/content/blog/*.json", { eager: true }) as Record<string, any>;
const BLOG_POSTS: BlogPost[] = Object.values(postModules).map((m: any) => m.default || m).reverse();
const CATEGORIES = ["All", "Strategy", "Media", "Branding", "Digital"];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filtered = BLOG_POSTS.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = searchQuery === "" || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = BLOG_POSTS[0];
  const rest = filtered.filter((p) => p.title !== featured.title);

  return (
    <>
      <PageHero
        tag="Insights & Thinking"
        title="The SLIM BIZ Blog"
        subtitle="Practical insights on integrated marketing, media strategy, creative production, and what's working for brands across Africa and beyond."
      />

      {/* Featured article */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <SectionTagLeft label="Featured Article" />
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 overflow-hidden bg-muted">
              <img src={featured.img} alt={featured.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 text-white text-xs px-3 py-1" style={{ background: ORANGE, fontFamily: "'Inter', sans-serif" }}>{featured.tag}</div>
            </div>
            <div>
              <div className="flex items-center gap-4 text-muted-foreground text-xs mb-5" style={{ fontFamily: "'Inter', sans-serif" }}>
                <span className="flex items-center gap-1.5"><Calendar size={12} /> {featured.date}</span>
                <span className="flex items-center gap-1.5"><Clock size={12} /> {featured.readTime}</span>
              </div>
              <h2 className="text-3xl lg:text-4xl text-foreground mb-4 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                {featured.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>{featured.excerpt}</p>
              <div className="flex items-center gap-3 mb-8">
                <img src={featured.authorImg} alt={featured.author} className="w-10 h-10 rounded-full object-cover bg-muted" />
                <span className="text-foreground text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>{featured.author}</span>
              </div>
              <button className="inline-flex items-center gap-2 px-6 py-3 text-white text-sm font-medium tracking-wide transition-colors group"
                style={{ background: NAVY, fontFamily: "'Inter', sans-serif" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#1A2B8A")}
                onMouseLeave={(e) => (e.currentTarget.style.background = NAVY)}>
                Read Article <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Search + filter + grid */}
      <section className="py-24 lg:py-32 bg-secondary">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          {/* Search bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-card border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = NAVY)}
                onBlur={(e) => (e.currentTarget.style.borderColor = "")}
              />
            </div>
            <div className="flex gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-4 py-3 text-xs tracking-wide uppercase transition-all duration-200"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    background: activeCategory === cat ? NAVY : "var(--card)",
                    color: activeCategory === cat ? "#fff" : "var(--muted-foreground)",
                    border: `1px solid ${activeCategory === cat ? NAVY : "var(--border)"}`,
                  }}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Recent posts */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
              {activeCategory === "All" ? "All Articles" : activeCategory} {searchQuery && `· "${searchQuery}"`}
            </h2>
            <span className="text-muted-foreground text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>{filtered.length} article{filtered.length !== 1 ? "s" : ""}</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post) => (
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
                  <h3 className="text-foreground leading-snug mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem" }}>{post.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>{post.excerpt}</p>
                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <div className="flex items-center gap-2">
                      <img src={post.authorImg} alt={post.author} className="w-7 h-7 rounded-full object-cover bg-muted" />
                      <span className="text-muted-foreground text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-medium" style={{ color: ORANGE, fontFamily: "'Inter', sans-serif" }}>
                      Read <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-24 text-muted-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
              No articles found. <button onClick={() => { setSearchQuery(""); setActiveCategory("All"); }} className="underline" style={{ color: ORANGE }}>Clear filters</button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20" style={{ background: NAVY_DARK }}>
        <div className="max-w-2xl mx-auto px-5 lg:px-10 text-center">
          <SectionTag label="Stay Informed" />
          <h2 className="text-3xl text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Get the Marketing Playbook</h2>
          <p className="mb-8" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.6)" }}>
            Monthly insights on integrated campaigns, media trends, creative strategy, and what's working across traditional and digital channels. No spam, ever.
          </p>
          {subscribed ? (
            <div className="py-6 text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
              ✓ You're subscribed! Look out for our next edition.
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }} className="flex gap-0 max-w-md mx-auto">
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-5 py-3 text-white placeholder:text-white/35 text-sm focus:outline-none"
                style={{ fontFamily: "'Inter', sans-serif", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRight: "none" }}
              />
              <button type="submit" className="px-6 py-3 text-white text-sm font-medium shrink-0 transition-colors"
                style={{ background: ORANGE, fontFamily: "'Inter', sans-serif" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = ORANGE_HVR)}
                onMouseLeave={(e) => (e.currentTarget.style.background = ORANGE)}>
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
