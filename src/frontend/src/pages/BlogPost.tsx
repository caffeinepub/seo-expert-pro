import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { BlogPost as BlogPostType } from "../backend";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useBackend } from "../hooks/useBackend";

export default function BlogPost() {
  const { id } = useParams({ strict: false }) as { id?: string };
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const backend = useBackend();

  const fetchPost = useCallback(async () => {
    if (!id) return;
    try {
      const result = await backend.getBlogPostById(BigInt(id));
      setPost(result);
    } catch {
      // post not found
    } finally {
      setLoading(false);
    }
  }, [backend, id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-[#38C98A] text-sm font-medium mb-8 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
        {loading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-100 rounded w-1/2" />
            <div className="h-64 bg-gray-100 rounded" />
          </div>
        ) : post ? (
          <article>
            <h1 className="text-3xl font-extrabold text-[#0B2A43] mb-3 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-gray-400 text-sm mb-6">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{post.readTime.toString()} min read</span>
              </div>
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-1 bg-[#38C98A]/10 text-[#38C98A] px-2 py-0.5 rounded-full text-xs"
                >
                  <Tag className="w-3 h-3" />
                  {t}
                </span>
              ))}
            </div>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="text-xl text-gray-600 mb-6 font-medium">
                {post.excerpt}
              </p>
              <div className="whitespace-pre-wrap">{post.content}</div>
            </div>
          </article>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold text-gray-700">
              Post not found
            </h2>
            <Link
              to="/blog"
              className="text-[#38C98A] mt-4 inline-block hover:underline"
            >
              Return to Blog
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
