import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { NAVY, ORANGE, NAVY_DARK } from "../shared";

type BlogPost = {
  title: string; date: string; category: string; tag: string;
  readTime: string; excerpt: string; body: string; author: string; img?: string;
};

const REPO = "slimbiz237/slim-biz-website";
const BRANCH = "main";
const FOLDER = "content/blog";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch(`https://raw.githubusercontent.com/${REPO}/${BRANCH}/${FOLDER}/${slug}.json?t=${Date.now()}`)
      .then((r) => {
        if (!r.ok) throw new Error("not found");
        return r.json();
      })
      .then(setPost)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

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

  const paragraphs = post.body
    ? post.body.split(/\n\n+/).filter(Boolean)
    : [post.excerpt];

  return (
    <>
      <section className="pt-24 pb-0" style={{ background: NAVY_DARK }}>
        <div className="max-w-3xl mx-auto px-5 lg:px-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors"
            style={{ fontFamily: "'Inter', sans-serif" }}>
            <ArrowLeft size={14} /> Back to Blog
          </Link>
          <div className="inline-block text-white text-xs px-3 py-1 mb-4" style={{ background: ORANGE, fontFamily: "'Inter', sans-serif" }}>
            {post.tag}
          </div>
          <h1 className="text-3xl lg:text-5xl text-white mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            {post.title}
          </h1>
          <div className="flex items-center gap-6 text-white/60 text-sm pb-10" style={{ fontFamily: "'Inter', sans-serif" }}>
            <span className="flex items-center gap-1.5"><Calendar size={13} /> {post.date}</span>
            <span className="flex items-center gap-1.5"><Clock size={13} /> {post.readTime}</span>
            <span>{post.author}</span>
          </div>
        </div>
      </section>

      {post.img && (
        <div className="max-w-4xl mx-auto px-5 lg:px-10">
          <div className="h-72 lg:h-96 overflow-hidden">
            <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      <article className="py-16 lg:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-5 lg:px-10">
          <p className="text-muted-foreground text-lg leading-relaxed mb-8 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
            {post.excerpt}
          </p>
          <div className="border-t border-border mb-8" />
          {paragraphs.map((para, i) => (
            <p key={i} className="text-foreground leading-relaxed mb-6" style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.05rem" }}>
              {para.replace(/^#+\s*/, "")}
            </p>
          ))}
          <div className="border-t border-border mt-12 pt-8 flex items-center justify-between">
            <span className="text-muted-foreground text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
              Written by <strong style={{ color: "var(--foreground)" }}>{post.author}</strong>
            </span>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-white text-sm font-medium transition-colors"
              style={{ background: NAVY, fontFamily: "'Inter', sans-serif" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#1A2B8A")}
              onMouseLeave={(e) => (e.currentTarget.style.background = NAVY)}>
              <ArrowLeft size={14} /> All Articles
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
