import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useParams, Link } from "react-router";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { NAVY, ORANGE, NAVY_DARK } from "../shared";

type BlogPost = {
  title: string; date: string; category: string; tag: string;
  readTime: string; excerpt: string; body: string; author: string; img?: string;
};

function imgUrl(img?: string): string | undefined {
  if (!img) return undefined;
  if (img.startsWith("http")) return img;
  return `https://images.unsplash.com/${img}?w=700&h=450&fit=crop&auto=format`;
}

const REPO = "slimbiz237/slim-biz-website";
const BRANCH = "main";
const FOLDER = "content/blog";
const SITE = "https://slimbizmarketingagency.com";

// ─── Tiny markdown renderer: ## headings, **bold**, "- " lists, paragraphs ────
function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean).map((part, i) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={i} style={{ color: "var(--foreground)" }}>{part.slice(2, -2)}</strong>
      : <span key={i}>{part}</span>
  );
}

function renderBody(body: string): ReactNode[] {
  const blocks = body.split(/\n\n+/).map((b) => b.trim()).filter(Boolean);

  return blocks.map((block, i) => {
    // Headings: ## Title  (also # and ###)
    const heading = block.match(/^(#{1,4})\s+(.*)$/s);
    if (heading) {
      const level = heading[1].length;
      const text = heading[2].replace(/\*\*/g, "");
      if (level >= 3) {
        return (
          <h3 key={i} className="text-foreground mt-8 mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem" }}>
            {text}
          </h3>
        );
      }
      return (
        <h2 key={i} className="text-foreground mt-12 mb-4 leading-snug" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.65rem" }}>
          {text}
        </h2>
      );
    }

    // Bullet list: every line starts with "- " or "* "
    const lines = block.split("\n");
    if (lines.every((l) => /^\s*[-*]\s+/.test(l))) {
      return (
        <ul key={i} className="mb-6 space-y-2 pl-1">
          {lines.map((l, j) => (
            <li key={j} className="flex items-start gap-3 text-foreground leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.05rem" }}>
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: ORANGE }} />
              <span>{renderInline(l.replace(/^\s*[-*]\s+/, ""))}</span>
            </li>
          ))}
        </ul>
      );
    }

    // Normal paragraph
    return (
      <p key={i} className="text-foreground leading-relaxed mb-6" style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.05rem" }}>
        {renderInline(block)}
      </p>
    );
  });
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setNotFound(false);
    fetch(`https://raw.githubusercontent.com/${REPO}/${BRANCH}/${FOLDER}/${slug}.json?t=${Date.now()}`)
      .then((r) => {
        if (!r.ok) throw new Error("not found");
        return r.json();
      })
      .then(setPost)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  // Unique title, description, canonical and Article data for every post
  useEffect(() => {
    if (!post || !slug) return;

    const url = `${SITE}/blog/${slug}`;
    document.title = `${post.title} | SLIM BIZ Marketing Agency`;

    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = post.excerpt;

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      author: { "@type": "Organization", name: post.author },
      publisher: { "@type": "Organization", name: "SLIM BIZ SARL", url: SITE },
      datePublished: post.date,
      mainEntityOfPage: url,
      ...(post.img ? { image: imgUrl(post.img) } : {}),
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [post, slug]);

  if (loading) {
    return (
      <div className="py-40 text-center text-muted-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
        Loading article...
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="py-40 text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
        <p className="text-muted-foreground mb-6">Article not found.</p>
        <Link to="/blog" className="text-sm underline" style={{ color: ORANGE }}>← Back to Blog</Link>
      </div>
    );
  }

  return (
    <>
      <section className="pt-24 pb-0" style={{ background: NAVY_DARK }}>
        <div className="max-w-3xl mx-auto px-5 lg:px-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors"
            style={{ fontFamily: "'Inter', sans-serif" }}>
            <ArrowLeft size={14} /> <span>Back to Blog</span>
          </Link>
          <div className="inline-block text-white text-xs px-3 py-1 mb-4" style={{ background: ORANGE, fontFamily: "'Inter', sans-serif" }}>
            {post.tag}
          </div>
          <h1 className="text-3xl lg:text-5xl text-white mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/60 text-sm pb-10" style={{ fontFamily: "'Inter', sans-serif" }}>
            <span className="flex items-center gap-1.5"><Calendar size={13} /> <span>{post.date}</span></span>
            <span className="flex items-center gap-1.5"><Clock size={13} /> <span>{post.readTime}</span></span>
            <span>{post.author}</span>
          </div>
        </div>
      </section>

      {post.img && (
        <div className="max-w-4xl mx-auto px-5 lg:px-10">
          <div className="h-72 lg:h-96 overflow-hidden">
            <img src={imgUrl(post.img)} alt={post.title} className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      <article className="py-16 lg:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-5 lg:px-10">
          <p className="text-muted-foreground text-lg leading-relaxed mb-8 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
            {post.excerpt}
          </p>
          <div className="border-t border-border mb-8" />

          {post.body ? renderBody(post.body) : null}

          <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-muted-foreground text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
              <span>Written by </span><strong style={{ color: "var(--foreground)" }}>{post.author}</strong>
            </span>
            <Link
              to="/blog"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-white text-sm font-medium transition-colors"
              style={{ background: NAVY, fontFamily: "'Inter', sans-serif" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#1A2B8A")}
              onMouseLeave={(e) => (e.currentTarget.style.background = NAVY)}>
              <ArrowLeft size={14} /> <span>All Articles</span>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
