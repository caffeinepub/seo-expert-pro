import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import type { BlogPost as BlogPostType } from "../backend";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useBackend } from "../hooks/useBackend";

const TAG_COLORS: Record<string, { bg: string; text: string; glow: string }> = {
  "On-Page SEO": {
    bg: "rgba(56,201,138,0.15)",
    text: "#38C98A",
    glow: "rgba(56,201,138,0.4)",
  },
  "Best Practices": {
    bg: "rgba(56,201,138,0.10)",
    text: "#5be8a8",
    glow: "rgba(91,232,168,0.3)",
  },
  "Off-Page SEO": {
    bg: "rgba(100,180,255,0.15)",
    text: "#64B4FF",
    glow: "rgba(100,180,255,0.4)",
  },
  "Link Building": {
    bg: "rgba(100,180,255,0.10)",
    text: "#7ec8ff",
    glow: "rgba(126,200,255,0.3)",
  },
  "Technical SEO": {
    bg: "rgba(255,160,80,0.15)",
    text: "#FFA050",
    glow: "rgba(255,160,80,0.4)",
  },
  "Keyword Research": {
    bg: "rgba(200,130,255,0.15)",
    text: "#C882FF",
    glow: "rgba(200,130,255,0.4)",
  },
  "Local SEO": {
    bg: "rgba(255,200,60,0.15)",
    text: "#FFC83C",
    glow: "rgba(255,200,60,0.4)",
  },
};

const LOADING_WIDTHS = ["75%", "50%", "100%", "85%", "65%"];

function parseBold(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*.+?\*\*)/g);
  return parts.map((part) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={part}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function PostHeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100,
    );
    camera.position.z = 5;

    const knotGeo = new THREE.TorusKnotGeometry(1, 0.28, 80, 16);
    const knotMat = new THREE.MeshBasicMaterial({
      color: 0x38c98a,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const knot = new THREE.Mesh(knotGeo, knotMat);
    knot.position.set(3.5, 0, -1);
    scene.add(knot);

    const icoGeo = new THREE.IcosahedronGeometry(0.5, 0);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    ico.position.set(-4, 1, -2);
    scene.add(ico);

    const count = 250;
    const posArr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) posArr[i] = (Math.random() - 0.5) * 18;
    const partGeo = new THREE.BufferGeometry();
    partGeo.setAttribute("position", new THREE.BufferAttribute(posArr, 3));
    const partMat = new THREE.PointsMaterial({
      color: 0x38c98a,
      size: 0.055,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(partGeo, partMat);
    scene.add(particles);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      knot.rotation.x += 0.004;
      knot.rotation.y += 0.006;
      ico.rotation.x += 0.005;
      ico.rotation.z += 0.004;
      particles.rotation.y += 0.0008;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!canvas) return;
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      knotGeo.dispose();
      icoGeo.dispose();
      partGeo.dispose();
      knotMat.dispose();
      icoMat.dispose();
      partMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

function ReadingProgressBar({
  contentRef,
}: { contentRef: React.RefObject<HTMLElement | null> }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = contentRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const totalHeight = el.scrollHeight;
      const viewportHeight = window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const scrollable = totalHeight - viewportHeight;
      const pct =
        scrollable > 0 ? Math.min(100, (scrolled / scrollable) * 100) : 0;
      setProgress(pct);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [contentRef]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        zIndex: 9999,
        background: "rgba(0,0,0,0.2)",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: "linear-gradient(90deg, #38C98A, #00d4ff)",
          transition: "width 0.1s linear",
          boxShadow: "0 0 8px rgba(56,201,138,0.6)",
        }}
      />
    </div>
  );
}

function renderContent(content: string): React.ReactNode[] {
  const lines = content.split("\n");
  const nodes: React.ReactNode[] = [];
  let listItems: string[] = [];
  let nodeKey = 0;

  const flushList = () => {
    if (listItems.length > 0) {
      const captured = [...listItems];
      nodes.push(
        <ul
          key={`ul-${nodeKey++}`}
          style={{
            listStyle: "none",
            padding: 0,
            margin: "0 0 24px 0",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {captured.map((item) => (
            <li
              key={item}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                lineHeight: 1.7,
                color: "#374151",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #38C98A, #00d4ff)",
                  flexShrink: 0,
                  marginTop: "8px",
                }}
              />
              <span>{parseBold(item)}</span>
            </li>
          ))}
        </ul>,
      );
      listItems = [];
    }
  };

  for (const line of lines) {
    if (line.startsWith("## ")) {
      flushList();
      nodes.push(
        <h2
          key={`h2-${nodeKey++}`}
          style={{
            color: "#0B2A43",
            fontSize: "1.5rem",
            fontWeight: 800,
            marginTop: "40px",
            marginBottom: "16px",
            lineHeight: 1.3,
            borderLeft: "4px solid #38C98A",
            paddingLeft: "16px",
            letterSpacing: "-0.01em",
          }}
        >
          {line.slice(3)}
        </h2>,
      );
    } else if (line.startsWith("- ")) {
      listItems.push(line.slice(2));
    } else if (line.trim() === "") {
      flushList();
    } else {
      flushList();
      nodes.push(
        <p
          key={`p-${nodeKey++}`}
          style={{
            color: "#374151",
            lineHeight: 1.8,
            marginBottom: "18px",
            fontSize: "16px",
          }}
        >
          {parseBold(line)}
        </p>,
      );
    }
  }
  flushList();
  return nodes;
}

export default function BlogPost() {
  const { id } = useParams({ strict: false }) as { id?: string };
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const backend = useBackend();
  const contentRef = useRef<HTMLElement | null>(null);

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

  const primaryTag = post?.tags[0];
  const tagColors = primaryTag
    ? (TAG_COLORS[primaryTag] ?? TAG_COLORS["On-Page SEO"])
    : TAG_COLORS["On-Page SEO"];

  return (
    <div
      style={{ minHeight: "100vh", background: "#f8fafb" }}
      ref={contentRef as React.RefObject<HTMLDivElement>}
    >
      <ReadingProgressBar contentRef={contentRef} />
      <Navbar />

      {loading ? (
        <div
          style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 24px" }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {LOADING_WIDTHS.map((w) => (
              <div
                key={w}
                style={{
                  height: w === "75%" ? "36px" : "18px",
                  width: w,
                  background: "#e5e7eb",
                  borderRadius: "8px",
                  animation: "pulse 2s infinite",
                }}
              />
            ))}
          </div>
        </div>
      ) : post ? (
        <>
          {/* Hero */}
          <section
            style={{
              position: "relative",
              overflow: "hidden",
              background: "linear-gradient(135deg, #0B2A43 0%, #071c2e 100%)",
              padding: "80px 24px 70px",
            }}
          >
            <PostHeroCanvas />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse at 60% 50%, rgba(56,201,138,0.1) 0%, transparent 60%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                maxWidth: "800px",
                margin: "0 auto",
                position: "relative",
                zIndex: 1,
              }}
            >
              <Link
                to="/blog"
                data-ocid="blog_post.link"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "rgba(199,210,224,0.7)",
                  fontSize: "14px",
                  fontWeight: 500,
                  marginBottom: "28px",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "#38C98A";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "rgba(199,210,224,0.7)";
                }}
              >
                <ArrowLeft size={16} /> Back to Blog
              </Link>

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  flexWrap: "wrap",
                  marginBottom: "20px",
                }}
              >
                {post.tags.map((t) => {
                  const tc = TAG_COLORS[t] ?? TAG_COLORS["On-Page SEO"];
                  return (
                    <span
                      key={t}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        background: tc.bg,
                        color: tc.text,
                        fontSize: "12px",
                        fontWeight: 700,
                        padding: "4px 12px",
                        borderRadius: "99px",
                        border: `1px solid ${tc.glow}`,
                        letterSpacing: "0.04em",
                      }}
                    >
                      <Tag size={11} /> {t}
                    </span>
                  );
                })}
              </div>

              <h1
                style={{
                  color: "#fff",
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  fontWeight: 900,
                  lineHeight: 1.2,
                  marginBottom: "20px",
                  letterSpacing: "-0.02em",
                }}
              >
                {post.title}
              </h1>

              <div
                style={{ display: "flex", alignItems: "center", gap: "20px" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "rgba(199,210,224,0.6)",
                    fontSize: "14px",
                  }}
                >
                  <Clock size={14} />
                  <span>{post.readTime.toString()} min read</span>
                </div>
                <div
                  style={{
                    height: "4px",
                    width: "4px",
                    borderRadius: "50%",
                    background: "rgba(199,210,224,0.3)",
                  }}
                />
                <span
                  style={{ color: "rgba(199,210,224,0.6)", fontSize: "14px" }}
                >
                  By Amit Yadav
                </span>
              </div>
            </div>
          </section>

          {/* Article body */}
          <div
            style={{
              maxWidth: "800px",
              margin: "-32px auto 0",
              padding: "0 24px 80px",
              position: "relative",
              zIndex: 2,
            }}
          >
            <article
              style={{
                background: "#fff",
                borderRadius: "20px",
                boxShadow:
                  "0 20px 60px rgba(0,0,0,0.12), 0 4px 20px rgba(0,0,0,0.06)",
                padding: "clamp(28px, 5vw, 56px)",
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <p
                style={{
                  fontSize: "18px",
                  color: "#374151",
                  lineHeight: 1.75,
                  marginBottom: "32px",
                  fontWeight: 500,
                  paddingBottom: "32px",
                  borderBottom: `2px solid ${tagColors.glow}`,
                }}
              >
                {post.excerpt}
              </p>

              <div>{renderContent(post.content)}</div>

              <div
                style={{
                  marginTop: "48px",
                  paddingTop: "32px",
                  borderTop: "1px solid #e5e7eb",
                  display: "flex",
                  gap: "16px",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #0B2A43, #38C98A)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: "18px",
                    flexShrink: 0,
                  }}
                >
                  AY
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      color: "#0B2A43",
                      fontSize: "15px",
                    }}
                  >
                    Amit Yadav
                  </div>
                  <div
                    style={{
                      color: "#6b7280",
                      fontSize: "14px",
                      marginTop: "2px",
                    }}
                  >
                    SEO Expert &amp; Digital Marketing Strategist
                  </div>
                </div>
              </div>
            </article>

            <div
              style={{
                marginTop: "32px",
                background: "linear-gradient(135deg, #0B2A43, #071c2e)",
                borderRadius: "16px",
                padding: "32px",
                textAlign: "center",
                border: "1px solid rgba(56,201,138,0.2)",
                boxShadow: "0 8px 40px rgba(56,201,138,0.08)",
              }}
            >
              <h3
                style={{
                  color: "#fff",
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  marginBottom: "10px",
                }}
              >
                Want These Results for Your Site?
              </h3>
              <p
                style={{
                  color: "rgba(199,210,224,0.75)",
                  fontSize: "15px",
                  marginBottom: "24px",
                }}
              >
                Get a free SEO audit and discover exactly what&apos;s holding
                your rankings back.
              </p>
              <Link
                to="/contact"
                data-ocid="blog_post.primary_button"
                style={{
                  display: "inline-block",
                  background: "linear-gradient(135deg, #38C98A, #00d4ff)",
                  color: "#071c2e",
                  fontWeight: 800,
                  fontSize: "15px",
                  padding: "14px 32px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  boxShadow: "0 4px 20px rgba(56,201,138,0.3)",
                }}
              >
                Get My Free SEO Audit →
              </Link>
            </div>

            <div style={{ marginTop: "24px", textAlign: "center" }}>
              <Link
                to="/blog"
                data-ocid="blog_post.link"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#6b7280",
                  fontSize: "14px",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "#38C98A";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "#6b7280";
                }}
              >
                <ArrowLeft size={14} /> Back to all articles
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div
          data-ocid="blog_post.error_state"
          style={{
            textAlign: "center",
            padding: "80px 24px",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>🔍</div>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#0B2A43",
              marginBottom: "12px",
            }}
          >
            Post Not Found
          </h2>
          <p style={{ color: "#6b7280", marginBottom: "24px" }}>
            This article may have been moved or is no longer available.
          </p>
          <Link
            to="/blog"
            data-ocid="blog_post.link"
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #38C98A, #00d4ff)",
              color: "#071c2e",
              fontWeight: 700,
              padding: "12px 28px",
              borderRadius: "10px",
              textDecoration: "none",
            }}
          >
            Return to Blog
          </Link>
        </div>
      )}

      <Footer />
    </div>
  );
}
