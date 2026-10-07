import { useParams, Link } from "react-router";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { NAVY, ORANGE, PageHero } from "../shared";

type BlogPost = {
  title: string; date: string; category: string; tag: string;
  readTime: string; excerpt: string; body: string; author: string; img: string; slug: string;
};

const postModules = import.meta.glob("/content/blog/*.json", { eager: true }) as Record<string, any>;
const ALL_POSTS: BlogPost[] = Object.entries(postModules).map(([key, m]: [string, any]) => ({
  ...(m.default || m),
  slug: key.replace("/content/blog/", "").replace(".json", ""),
}));

function renderBody(text: string) {
  return text.split("\n\n").map((block, i) => {
    if (block.startsWith("# ")) return <h2 key={i} className="text-2xl font-bold mt-8 mb-4" style={{ color: NAVY }}>{block.slice(2)}</h2>;
    if (block.startsWith("## ")) return <h3 key={i} className="text-xl font-semibold mt-6 mb-3" style={{ color: NAVY }}>{block.slice(3)}</h3>;
    const parts = block.split(/\*\*(.*?)\*\*/g);
    return (
      <p key={i} className="mb-5 text-lg leading-relaxed text-muted-foreground">
        {parts.map((p, j) => j % 2 === 1 ? <strong key={j} className="text-foreground">{p}</strong> : p)}
      </p>
    );
  });
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = ALL_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Article not found</h1>
        <Link to="/blog" className="underline" style={{ color: NAVY }}>← Back to Blog</Link>
      </div>
    );
  }

  return (
    <>
      <PageHero tag={post.category} title={post.title} subtitle={post.excerpt} />
      <article className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-5 lg:px-10">
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground text-sm mb-8">
            <span className="flex items-center gap-2"><Calendar size={14} /> {post.date}</span>
            <span className="flex items-center gap-2"><Clock size={14} /> {post.readTime}</span>
            <span>By {post.author}</span>
          </div>
          {post.img && <img src={post.img} alt={post.title} className="w-full h-72 object-cover mb-10 rounded" />}
          <div>{renderBody(post.body)}</div>
          <div className="mt-12 pt-8 border-t border-border">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-medium hover:underline" style={{ color: NAVY }}>
              <ArrowLeft size={16} /> Back to Blog
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
