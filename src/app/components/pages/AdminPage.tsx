import { useState, useEffect } from "react";
import { CheckCircle, Upload, Eye, EyeOff, Loader, ArrowLeft } from "lucide-react";
import { Link } from "react-router";

const REPO = "slimbiz237/slim-biz-website";
const BRANCH = "main";
const FOLDER = "content/blog";
const NAVY = "#121F6B";
const ORANGE = "#E8601C";

const CATEGORIES = ["Strategy", "Media", "Branding", "Digital", "Training", "General"];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function estimateReadTime(body: string): string {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function toBase64utf8(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

type FormState = {
  title: string; date: string; category: string; tag: string;
  readTime: string; author: string; img: string; excerpt: string;
  body: string; slug: string;
};

const defaultForm = (): FormState => ({
  title: "",
  date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
  category: "Strategy",
  tag: "Strategy",
  readTime: "5 min read",
  author: "SLIM BIZ Editorial Team",
  img: "",
  excerpt: "",
  body: "",
  slug: "",
});

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [showToken, setShowToken] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [validating, setValidating] = useState(false);
  const [tokenError, setTokenError] = useState("");
  const [form, setForm] = useState<FormState>(defaultForm());
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  const [publishError, setPublishError] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("gh_admin_token");
    if (saved) { setToken(saved); setAuthenticated(true); }
  }, []);

  const setField = (k: keyof FormState, v: string) => {
    setForm((f) => {
      const updated = { ...f, [k]: v };
      if (k === "title") updated.slug = slugify(v);
      if (k === "body") updated.readTime = estimateReadTime(v);
      if (k === "category") updated.tag = v;
      return updated;
    });
  };

  async function validateToken() {
    setValidating(true);
    setTokenError("");
    try {
      const res = await fetch(`https://api.github.com/repos/${REPO}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        sessionStorage.setItem("gh_admin_token", token);
        setAuthenticated(true);
      } else {
        setTokenError("Invalid token or no access to this repository.");
      }
    } catch {
      setTokenError("Connection failed. Check your internet connection.");
    } finally {
      setValidating(false);
    }
  }

  async function publish() {
    setPublishing(true);
    setPublishError("");
    const postData = {
      title: form.title, date: form.date, category: form.category,
      tag: form.tag, readTime: form.readTime, author: form.author,
      img: form.img, excerpt: form.excerpt, body: form.body,
    };
    const filename = `${form.slug}.json`;
    const content = toBase64utf8(JSON.stringify(postData, null, 2));
    try {
      const res = await fetch(
        `https://api.github.com/repos/${REPO}/contents/${FOLDER}/${filename}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("gh_admin_token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: `Add blog post: ${form.title}`, content, branch: BRANCH }),
        }
      );
      if (res.ok) {
        setPublished(true);
      } else {
        const err = await res.json();
        setPublishError(err.message || "Failed to publish. Check token has repo write permission.");
      }
    } catch {
      setPublishError("Network error. Please try again.");
    } finally {
      setPublishing(false);
    }
  }

  const wordCount = form.body.trim().split(/\s+/).filter(Boolean).length;
  const checklist = [
    { label: "Title", done: form.title.length > 5 },
    { label: "Slug", done: !!form.slug },
    { label: "Image URL", done: form.img.startsWith("http") },
    { label: "Excerpt (min 50 chars)", done: form.excerpt.length >= 50 },
    { label: "Body (min 300 words)", done: wordCount >= 300 },
  ];
  const canPublish = checklist.every((c) => c.done) && !publishing;

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#F7F8FC", fontFamily: "'Inter', sans-serif" }}>
        <div className="w-full max-w-md p-10 bg-white border border-gray-200 shadow-sm">
          <div className="w-8 h-1 mb-8" style={{ background: ORANGE }} />
          <h1 className="text-xl font-semibold text-gray-900 mb-1">Blog Admin</h1>
          <p className="text-gray-400 text-sm mb-8">Enter your GitHub token to publish posts directly.</p>
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">GitHub Personal Access Token</label>
              <div className="relative">
                <input
                  type={showToken ? "text" : "password"}
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && token && validateToken()}
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                  className="w-full px-4 py-3 border border-gray-200 text-sm text-gray-900 pr-12 focus:outline-none focus:border-gray-400 font-mono"
                />
                <button type="button" onClick={() => setShowToken(!showToken)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500">
                  {showToken ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            {tokenError && <p className="text-red-500 text-sm">{tokenError}</p>}
            <button onClick={validateToken} disabled={!token || validating}
              className="w-full py-3 text-white text-sm font-medium tracking-wide disabled:opacity-40"
              style={{ background: NAVY }}>
              {validating ? "Connecting..." : "Connect to GitHub"}
            </button>
          </div>
          <p className="text-xs text-gray-300 mt-6 leading-relaxed">
            Token requires <strong>repo</strong> write permission. Stored only in your browser session.
          </p>
        </div>
      </div>
    );
  }

  if (published) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#F7F8FC", fontFamily: "'Inter', sans-serif" }}>
        <div className="text-center max-w-md px-8">
          <CheckCircle size={52} className="mx-auto mb-5" style={{ color: NAVY }} />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Published!</h2>
          <p className="text-gray-500 text-sm mb-1"><strong>{form.title}</strong></p>
          <p className="text-gray-400 text-sm mb-8">
            Saved as <code className="bg-gray-100 px-1 py-0.5 text-xs">{form.slug}.json</code>.<br />
            Cloudflare deploys in ~2 min. Posts appear after hard refresh.
          </p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => { setPublished(false); setForm(defaultForm()); }}
              className="px-6 py-3 text-white text-sm font-medium" style={{ background: NAVY }}>
              Write Another Post
            </button>
            <Link to="/blog" className="px-6 py-3 text-sm border border-gray-200 text-gray-600">
              View Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const jsonPreview = JSON.stringify({
    title: form.title, date: form.date, category: form.category,
    tag: form.tag, readTime: form.readTime, author: form.author,
    img: form.img, excerpt: form.excerpt, body: form.body,
  }, null, 2);

  return (
    <div className="min-h-screen" style={{ background: "#F7F8FC", fontFamily: "'Inter', sans-serif" }}>
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-gray-400 hover:text-gray-700">
            <ArrowLeft size={18} />
          </Link>
          <div className="w-px h-5 bg-gray-200" />
          <div className="w-5 h-0.5" style={{ background: ORANGE }} />
          <h1 className="text-sm font-semibold text-gray-900">New Blog Post</h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-1.5 text-xs text-gray-500 px-3 py-2 border border-gray-200">
            <Eye size={13} /> {showPreview ? "Hide" : "Preview"} JSON
          </button>
          <button onClick={() => { sessionStorage.removeItem("gh_admin_token"); setAuthenticated(false); setToken(""); }}
            className="text-xs text-gray-400 hover:text-gray-600 px-3 py-2">
            Disconnect
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Title *</label>
              <input type="text" value={form.title} onChange={(e) => setField("title", e.target.value)}
                placeholder="Best Marketing Agency in Cameroon"
                className="w-full px-4 py-3 border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:border-gray-400" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Slug (filename) *</label>
              <input type="text" value={form.slug} onChange={(e) => setField("slug", e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 bg-white text-gray-900 text-sm font-mono focus:outline-none focus:border-gray-400" />
              <p className="text-xs text-gray-300 mt-1">content/blog/<strong>{form.slug || "..."}</strong>.json</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Date</label>
                <input type="text" value={form.date} onChange={(e) => setField("date", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:border-gray-400" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Category</label>
                <select value={form.category} onChange={(e) => setField("category", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:border-gray-400">
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Tag</label>
                <input type="text" value={form.tag} onChange={(e) => setField("tag", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:border-gray-400" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Author</label>
                <input type="text" value={form.author} onChange={(e) => setField("author", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:border-gray-400" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Read Time</label>
                <input type="text" value={form.readTime} onChange={(e) => setField("readTime", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:border-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Image URL</label>
              <input type="text" value={form.img} onChange={(e) => setField("img", e.target.value)}
                placeholder="https://images.unsplash.com/photo-xxxxx?w=700&h=450&fit=crop&auto=format"
                className="w-full px-4 py-3 border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:border-gray-400" />
              {form.img && (
                <img src={form.img} alt="preview" className="mt-2 h-36 w-full object-cover border border-gray-200"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                  onLoad={(e) => (e.currentTarget.style.display = "block")} />
              )}
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Excerpt *</label>
              <textarea value={form.excerpt} onChange={(e) => setField("excerpt", e.target.value)} rows={3}
                placeholder="2-3 sentence summary shown on the blog listing page..."
                className="w-full px-4 py-3 border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:border-gray-400 resize-none" />
              <p className="text-xs text-gray-300 mt-1">{form.excerpt.length} chars</p>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
                Body * <span className="normal-case tracking-normal text-gray-300">— use ## for headings, **bold**, blank line between paragraphs</span>
              </label>
              <textarea value={form.body} onChange={(e) => setField("body", e.target.value)} rows={22}
                placeholder={"Start writing here...\n\nPress Enter twice between paragraphs.\n\nUse ## Heading for sections.\n\nNo JSON escaping needed!"}
                className="w-full px-4 py-3 border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:border-gray-400 resize-y font-mono leading-relaxed" />
              <p className="text-xs text-gray-300 mt-1">{wordCount} words · {estimateReadTime(form.body)}</p>
            </div>
            {publishError && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-sm">{publishError}</div>
            )}
            <button onClick={publish} disabled={!canPublish}
              className="w-full flex items-center justify-center gap-2 py-4 text-white text-sm font-medium disabled:opacity-40"
              style={{ background: NAVY }}>
              {publishing
                ? <><Loader size={15} className="animate-spin" /> Publishing to GitHub...</>
                : <><Upload size={15} /> Publish Post</>}
            </button>
          </div>

          <div className="space-y-5">
            <div className="bg-white border border-gray-200 p-5">
              <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Publish Checklist</h3>
              <div className="space-y-2">
                {checklist.map((item) => (
                  <div key={item.label} className="flex items-center gap-2.5 py-1 border-b border-gray-50 last:border-0">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${item.done ? "bg-green-400" : "bg-gray-200"}`} />
                    <span className={`text-sm ${item.done ? "text-gray-700" : "text-gray-400"}`}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white border border-gray-200 p-5">
              <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-3">Tips</h3>
              <ul className="space-y-2 text-xs text-gray-400 leading-relaxed">
                <li>• Type naturally — press Enter twice between paragraphs</li>
                <li>• ## Heading for H2 sections</li>
                <li>• **word** for bold text</li>
                <li>• Aim for 1000+ words for SEO</li>
                <li>• Unsplash URL: add ?w=700&h=450&fit=crop&auto=format</li>
              </ul>
            </div>
            {showPreview && (
              <div className="bg-white border border-gray-200 p-5">
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-3">JSON Preview</h3>
                <pre className="text-xs text-gray-500 overflow-auto max-h-96 whitespace-pre-wrap break-all">{jsonPreview}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
