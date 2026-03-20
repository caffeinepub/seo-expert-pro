import { Link } from "@tanstack/react-router";
import { Clock, Tag } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { BlogPost } from "../backend";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useBackend } from "../hooks/useBackend";

const samplePosts = [
  {
    title: "10 On-Page SEO Techniques That Actually Work in 2026",
    excerpt:
      "Discover the most impactful on-page optimization tactics that search engines reward in 2026.",
    tags: ["On-Page SEO", "Best Practices"],
    readTime: 7,
  },
  {
    title: "How to Build High-Quality Backlinks (Without Spamming)",
    excerpt:
      "Ethical link building strategies that boost authority and rankings sustainably.",
    tags: ["Off-Page SEO", "Link Building"],
    readTime: 9,
  },
  {
    title: "The Complete Technical SEO Checklist for 2026",
    excerpt:
      "Everything you need to audit and fix your site's technical foundation.",
    tags: ["Technical SEO"],
    readTime: 12,
  },
  {
    title: "Keyword Research: Finding Hidden Opportunities",
    excerpt:
      "A step-by-step guide to uncovering keywords your competitors are missing.",
    tags: ["Keyword Research"],
    readTime: 8,
  },
  {
    title: "Local SEO: How to Rank #1 in Your City",
    excerpt: "Proven tactics to dominate local search results and Google Maps.",
    tags: ["Local SEO"],
    readTime: 6,
  },
];

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const backend = useBackend();

  const load = useCallback(async () => {
    try {
      let existing = await backend.listBlogPosts();
      if (existing.length === 0) {
        for (const p of samplePosts) {
          await backend.createBlogPost(
            p.title,
            p.excerpt,
            `${p.excerpt} This is the full content of this post. Read on to learn more about this important SEO topic.`,
            p.tags,
            p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            BigInt(p.readTime),
          );
        }
        existing = await backend.listBlogPosts();
      }
      setPosts(existing);
    } catch {
      // show empty state
    } finally {
      setLoading(false);
    }
  }, [backend]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="bg-[#0B2A43] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white mb-4">
            SEO Insights &amp; Guides
          </h1>
          <p className="text-[#C7D2E0] text-lg">
            Actionable tips, industry updates, and deep-dives to grow your
            organic search presence.
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="animate-pulse bg-gray-100 rounded-xl h-56"
                />
              ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.id.toString()}
                  to="/blog/$id"
                  params={{ id: post.id.toString() }}
                  className="group border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="bg-[#0B2A43] h-32 flex items-center justify-center p-4">
                    <span className="text-[#38C98A] font-bold text-lg text-center line-clamp-2">
                      {post.title}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-gray-400 text-xs">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime.toString()} min read</span>
                      </div>
                      <span className="text-[#38C98A] text-xs font-medium group-hover:underline">
                        Read More →
                      </span>
                    </div>
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {post.tags.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="flex items-center gap-1 bg-[#38C98A]/10 text-[#38C98A] px-2 py-0.5 rounded-full text-xs"
                          >
                            <Tag className="w-2.5 h-2.5" />
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No posts yet. Check back soon!
            </p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
