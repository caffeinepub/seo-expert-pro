import { a as createLucideIcon, u as useParams, r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-BxINLDd1.js";
import { W as WebGLRenderer, S as Scene, P as PerspectiveCamera, h as TorusKnotGeometry, M as MeshBasicMaterial, b as Mesh, I as IcosahedronGeometry, c as BufferGeometry, d as BufferAttribute, e as PointsMaterial, f as Points } from "./three.module-DUeOZydE.js";
import { N as Navbar, F as Footer } from "./Navbar-CBcDUy39.js";
import { u as useBackend } from "./useBackend-okQ5lZf6.js";
import { T as Tag } from "./tag-4SrMzU2-.js";
import { C as Clock } from "./clock-BROyecDb.js";
import "./search-BwP7uQVp.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode);
const TAG_COLORS = {
  "On-Page SEO": {
    bg: "rgba(56,201,138,0.15)",
    text: "#38C98A",
    glow: "rgba(56,201,138,0.4)"
  },
  "Best Practices": {
    bg: "rgba(56,201,138,0.10)",
    text: "#5be8a8",
    glow: "rgba(91,232,168,0.3)"
  },
  "Off-Page SEO": {
    bg: "rgba(100,180,255,0.15)",
    text: "#64B4FF",
    glow: "rgba(100,180,255,0.4)"
  },
  "Link Building": {
    bg: "rgba(100,180,255,0.10)",
    text: "#7ec8ff",
    glow: "rgba(126,200,255,0.3)"
  },
  "Technical SEO": {
    bg: "rgba(255,160,80,0.15)",
    text: "#FFA050",
    glow: "rgba(255,160,80,0.4)"
  },
  "Keyword Research": {
    bg: "rgba(200,130,255,0.15)",
    text: "#C882FF",
    glow: "rgba(200,130,255,0.4)"
  },
  "Local SEO": {
    bg: "rgba(255,200,60,0.15)",
    text: "#FFC83C",
    glow: "rgba(255,200,60,0.4)"
  }
};
const LOADING_WIDTHS = ["75%", "50%", "100%", "85%", "65%"];
function parseBold(text) {
  const parts = text.split(/(\*\*.+?\*\*)/g);
  return parts.map((part) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: part.slice(2, -2) }, part);
    }
    return part;
  });
}
function PostHeroCanvas() {
  const canvasRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const renderer = new WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0, 0);
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      60,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    camera.position.z = 5;
    const knotGeo = new TorusKnotGeometry(1, 0.28, 80, 16);
    const knotMat = new MeshBasicMaterial({
      color: 3721610,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const knot = new Mesh(knotGeo, knotMat);
    knot.position.set(3.5, 0, -1);
    scene.add(knot);
    const icoGeo = new IcosahedronGeometry(0.5, 0);
    const icoMat = new MeshBasicMaterial({
      color: 54527,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const ico = new Mesh(icoGeo, icoMat);
    ico.position.set(-4, 1, -2);
    scene.add(ico);
    const count = 250;
    const posArr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) posArr[i] = (Math.random() - 0.5) * 18;
    const partGeo = new BufferGeometry();
    partGeo.setAttribute("position", new BufferAttribute(posArr, 3));
    const partMat = new PointsMaterial({
      color: 3721610,
      size: 0.055,
      transparent: true,
      opacity: 0.6
    });
    const particles = new Points(partGeo, partMat);
    scene.add(particles);
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      knot.rotation.x += 4e-3;
      knot.rotation.y += 6e-3;
      ico.rotation.x += 5e-3;
      ico.rotation.z += 4e-3;
      particles.rotation.y += 8e-4;
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "canvas",
    {
      ref: canvasRef,
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none"
      }
    }
  );
}
function ReadingProgressBar({
  contentRef
}) {
  const [progress, setProgress] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const handleScroll = () => {
      const el = contentRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const totalHeight = el.scrollHeight;
      const viewportHeight = window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const scrollable = totalHeight - viewportHeight;
      const pct = scrollable > 0 ? Math.min(100, scrolled / scrollable * 100) : 0;
      setProgress(pct);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [contentRef]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      style: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        zIndex: 9999,
        background: "rgba(0,0,0,0.2)"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(90deg, #38C98A, #00d4ff)",
            transition: "width 0.1s linear",
            boxShadow: "0 0 8px rgba(56,201,138,0.6)"
          }
        }
      )
    }
  );
}
function renderContent(content) {
  const lines = content.split("\n");
  const nodes = [];
  let listItems = [];
  let nodeKey = 0;
  const flushList = () => {
    if (listItems.length > 0) {
      const captured = [...listItems];
      nodes.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "ul",
          {
            style: {
              listStyle: "none",
              padding: 0,
              margin: "0 0 24px 0",
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            },
            children: captured.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                style: {
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  lineHeight: 1.7,
                  color: "#374151"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      style: {
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #38C98A, #00d4ff)",
                        flexShrink: 0,
                        marginTop: "8px"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: parseBold(item) })
                ]
              },
              item
            ))
          },
          `ul-${nodeKey++}`
        )
      );
      listItems = [];
    }
  };
  for (const line of lines) {
    if (line.startsWith("## ")) {
      flushList();
      nodes.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h2",
          {
            style: {
              color: "#0B2A43",
              fontSize: "1.5rem",
              fontWeight: 800,
              marginTop: "40px",
              marginBottom: "16px",
              lineHeight: 1.3,
              borderLeft: "4px solid #38C98A",
              paddingLeft: "16px",
              letterSpacing: "-0.01em"
            },
            children: line.slice(3)
          },
          `h2-${nodeKey++}`
        )
      );
    } else if (line.startsWith("- ")) {
      listItems.push(line.slice(2));
    } else if (line.trim() === "") {
      flushList();
    } else {
      flushList();
      nodes.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            style: {
              color: "#374151",
              lineHeight: 1.8,
              marginBottom: "18px",
              fontSize: "16px"
            },
            children: parseBold(line)
          },
          `p-${nodeKey++}`
        )
      );
    }
  }
  flushList();
  return nodes;
}
function BlogPost() {
  const { id } = useParams({ strict: false });
  const [post, setPost] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const backend = useBackend();
  const contentRef = reactExports.useRef(null);
  const fetchPost = reactExports.useCallback(async () => {
    if (!id) return;
    try {
      const result = await backend.getBlogPostById(BigInt(id));
      setPost(result);
    } catch {
    } finally {
      setLoading(false);
    }
  }, [backend, id]);
  reactExports.useEffect(() => {
    fetchPost();
  }, [fetchPost]);
  const primaryTag = post == null ? void 0 : post.tags[0];
  const tagColors = primaryTag ? TAG_COLORS[primaryTag] ?? TAG_COLORS["On-Page SEO"] : TAG_COLORS["On-Page SEO"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: { minHeight: "100vh", background: "#f8fafb" },
      ref: contentRef,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ReadingProgressBar, { contentRef }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: { maxWidth: "800px", margin: "0 auto", padding: "60px 24px" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: { display: "flex", flexDirection: "column", gap: "16px" },
                children: LOADING_WIDTHS.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      height: w === "75%" ? "36px" : "18px",
                      width: w,
                      background: "#e5e7eb",
                      borderRadius: "8px",
                      animation: "pulse 2s infinite"
                    }
                  },
                  w
                ))
              }
            )
          }
        ) : post ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "section",
            {
              style: {
                position: "relative",
                overflow: "hidden",
                background: "linear-gradient(135deg, #0B2A43 0%, #071c2e 100%)",
                padding: "80px 24px 70px"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(PostHeroCanvas, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      inset: 0,
                      background: "radial-gradient(ellipse at 60% 50%, rgba(56,201,138,0.1) 0%, transparent 60%)",
                      pointerEvents: "none"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      maxWidth: "800px",
                      margin: "0 auto",
                      position: "relative",
                      zIndex: 1
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Link,
                        {
                          to: "/blog",
                          "data-ocid": "blog_post.link",
                          style: {
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            color: "rgba(199,210,224,0.7)",
                            fontSize: "14px",
                            fontWeight: 500,
                            marginBottom: "28px",
                            textDecoration: "none",
                            transition: "color 0.2s"
                          },
                          onMouseEnter: (e) => {
                            e.currentTarget.style.color = "#38C98A";
                          },
                          onMouseLeave: (e) => {
                            e.currentTarget.style.color = "rgba(199,210,224,0.7)";
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 16 }),
                            " Back to Blog"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            display: "flex",
                            gap: "8px",
                            flexWrap: "wrap",
                            marginBottom: "20px"
                          },
                          children: post.tags.map((t) => {
                            const tc = TAG_COLORS[t] ?? TAG_COLORS["On-Page SEO"];
                            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "span",
                              {
                                style: {
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
                                  letterSpacing: "0.04em"
                                },
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { size: 11 }),
                                  " ",
                                  t
                                ]
                              },
                              t
                            );
                          })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "h1",
                        {
                          style: {
                            color: "#fff",
                            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                            fontWeight: 900,
                            lineHeight: 1.2,
                            marginBottom: "20px",
                            letterSpacing: "-0.02em"
                          },
                          children: post.title
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          style: { display: "flex", alignItems: "center", gap: "20px" },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "div",
                              {
                                style: {
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "6px",
                                  color: "rgba(199,210,224,0.6)",
                                  fontSize: "14px"
                                },
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 14 }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                                    post.readTime.toString(),
                                    " min read"
                                  ] })
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                style: {
                                  height: "4px",
                                  width: "4px",
                                  borderRadius: "50%",
                                  background: "rgba(199,210,224,0.3)"
                                }
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                style: { color: "rgba(199,210,224,0.6)", fontSize: "14px" },
                                children: "By Amit Yadav"
                              }
                            )
                          ]
                        }
                      )
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                maxWidth: "800px",
                margin: "-32px auto 0",
                padding: "0 24px 80px",
                position: "relative",
                zIndex: 2
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "article",
                  {
                    style: {
                      background: "#fff",
                      borderRadius: "20px",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 4px 20px rgba(0,0,0,0.06)",
                      padding: "clamp(28px, 5vw, 56px)",
                      border: "1px solid rgba(0,0,0,0.06)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          style: {
                            fontSize: "18px",
                            color: "#374151",
                            lineHeight: 1.75,
                            marginBottom: "32px",
                            fontWeight: 500,
                            paddingBottom: "32px",
                            borderBottom: `2px solid ${tagColors.glow}`
                          },
                          children: post.excerpt
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: renderContent(post.content) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          style: {
                            marginTop: "48px",
                            paddingTop: "32px",
                            borderTop: "1px solid #e5e7eb",
                            display: "flex",
                            gap: "16px",
                            alignItems: "center"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                style: {
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
                                  flexShrink: 0
                                },
                                children: "AY"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "div",
                                {
                                  style: {
                                    fontWeight: 700,
                                    color: "#0B2A43",
                                    fontSize: "15px"
                                  },
                                  children: "Amit Yadav"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "div",
                                {
                                  style: {
                                    color: "#6b7280",
                                    fontSize: "14px",
                                    marginTop: "2px"
                                  },
                                  children: "SEO Expert & Digital Marketing Strategist"
                                }
                              )
                            ] })
                          ]
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      marginTop: "32px",
                      background: "linear-gradient(135deg, #0B2A43, #071c2e)",
                      borderRadius: "16px",
                      padding: "32px",
                      textAlign: "center",
                      border: "1px solid rgba(56,201,138,0.2)",
                      boxShadow: "0 8px 40px rgba(56,201,138,0.08)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "h3",
                        {
                          style: {
                            color: "#fff",
                            fontSize: "1.4rem",
                            fontWeight: 800,
                            marginBottom: "10px"
                          },
                          children: "Want These Results for Your Site?"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          style: {
                            color: "rgba(199,210,224,0.75)",
                            fontSize: "15px",
                            marginBottom: "24px"
                          },
                          children: "Get a free SEO audit and discover exactly what's holding your rankings back."
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Link,
                        {
                          to: "/contact",
                          "data-ocid": "blog_post.primary_button",
                          style: {
                            display: "inline-block",
                            background: "linear-gradient(135deg, #38C98A, #00d4ff)",
                            color: "#071c2e",
                            fontWeight: 800,
                            fontSize: "15px",
                            padding: "14px 32px",
                            borderRadius: "10px",
                            textDecoration: "none",
                            boxShadow: "0 4px 20px rgba(56,201,138,0.3)"
                          },
                          children: "Get My Free SEO Audit →"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: "24px", textAlign: "center" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: "/blog",
                    "data-ocid": "blog_post.link",
                    style: {
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "#6b7280",
                      fontSize: "14px",
                      textDecoration: "none",
                      fontWeight: 500
                    },
                    onMouseEnter: (e) => {
                      e.currentTarget.style.color = "#38C98A";
                    },
                    onMouseLeave: (e) => {
                      e.currentTarget.style.color = "#6b7280";
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 14 }),
                      " Back to all articles"
                    ]
                  }
                ) })
              ]
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "blog_post.error_state",
            style: {
              textAlign: "center",
              padding: "80px 24px",
              maxWidth: "600px",
              margin: "0 auto"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "64px", marginBottom: "16px" }, children: "🔍" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  style: {
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "#0B2A43",
                    marginBottom: "12px"
                  },
                  children: "Post Not Found"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#6b7280", marginBottom: "24px" }, children: "This article may have been moved or is no longer available." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/blog",
                  "data-ocid": "blog_post.link",
                  style: {
                    display: "inline-block",
                    background: "linear-gradient(135deg, #38C98A, #00d4ff)",
                    color: "#071c2e",
                    fontWeight: 700,
                    padding: "12px 28px",
                    borderRadius: "10px",
                    textDecoration: "none"
                  },
                  children: "Return to Blog"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
      ]
    }
  );
}
export {
  BlogPost as default
};
