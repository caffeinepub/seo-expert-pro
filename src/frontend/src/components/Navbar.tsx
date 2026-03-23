import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar";

const NAV_BG = "#0a1628";

const servicesDropdown = [
  { label: "On-Page SEO", desc: "Optimize content, meta tags & structure" },
  { label: "Off-Page SEO", desc: "High-quality backlinks & brand authority" },
  { label: "Technical SEO", desc: "Fix crawlability, speed & indexing" },
  { label: "Keyword Research", desc: "Target what your customers search for" },
  { label: "Local SEO", desc: "Dominate local search & Google Maps" },
  { label: "SEO Strategy", desc: "Custom growth roadmaps" },
];

const caseStudiesDropdown = [
  {
    label: "E-commerce Retailer",
    desc: "+312% organic traffic in 6 months",
  },
  {
    label: "SaaS Startup",
    desc: "+240% keyword rankings in 4 months",
  },
  {
    label: "Local Medical Practice",
    desc: "+185% local leads in 3 months",
  },
];

function NavDropdown({
  label,
  items,
  to,
}: {
  label: string;
  items: { label: string; desc: string }[];
  to: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const routerStateDropdown = useRouterState();
  const isActive =
    routerStateDropdown.location.pathname === to ||
    routerStateDropdown.location.pathname.startsWith(`${to}/`);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to={to}
        data-ocid="nav.link"
        className="relative px-3 py-2 text-sm font-medium group flex items-center gap-1"
      >
        <span
          className={`transition-colors duration-200 ${isActive ? "text-white font-semibold" : "text-white/70"} group-hover:text-white`}
        >
          {label}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-white/50 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
        <span
          className={`absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-[#38C98A] transition-all duration-300 origin-left ${
            isActive || open
              ? "scale-x-100 opacity-100"
              : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-60"
          }`}
        />
      </Link>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-0 mt-1 min-w-[280px] rounded-xl shadow-2xl border border-white/10 overflow-hidden z-50"
            style={{ background: NAV_BG }}
          >
            {items.map((item) => (
              <Link
                key={item.label}
                to={to}
                data-ocid="nav.link"
                className="flex flex-col px-4 py-3 hover:bg-[#38C98A]/20 transition-colors group/item border-b border-white/5 last:border-0"
              >
                <span className="text-white text-sm font-semibold group-hover/item:text-[#38C98A] transition-colors">
                  {item.label}
                </span>
                <span className="text-white/50 text-xs mt-0.5">
                  {item.desc}
                </span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileCaseStudiesOpen, setMobileCaseStudiesOpen] = useState(false);
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const simpleLinks = [
    { to: "/", label: "Home" },
    { to: "/blog", label: "Blog" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "shadow-[0_4px_24px_rgba(0,0,0,0.35)] border-b border-white/10"
          : "border-b border-white/10"
      }`}
      style={{ background: NAV_BG }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo — completely static, no hover movement */}
          <Link
            to="/"
            className="flex items-center gap-2.5 no-underline"
            data-ocid="nav.link"
          >
            <img
              src="/assets/generated/rankpro-logo.png"
              alt="RankPro Logo"
              className="h-14 w-auto object-contain block rounded-tl-xl rounded-bl-xl rounded-br-xl"
              loading="eager"
              fetchPriority="high"
              decoding="sync"
            />
            <span className="text-2xl font-bold tracking-tight select-none pointer-events-none">
              <span className="text-white">Rank</span>
              <span className="text-[#38C98A]">Pro</span>
              <span className="text-[#7DD3FC]"> SEO</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Home */}
            <Link
              to="/"
              data-ocid="nav.link"
              className="relative px-3 py-2 text-sm font-medium group"
            >
              <span
                className={`transition-colors duration-200 ${
                  pathname === "/"
                    ? "text-white"
                    : "text-white/70 group-hover:text-white"
                }`}
              >
                Home
              </span>
              <span
                className={`absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-[#38C98A] transition-all duration-300 origin-left ${
                  pathname === "/"
                    ? "scale-x-100 opacity-100"
                    : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-60"
                }`}
              />
            </Link>

            {/* Services dropdown */}
            <NavDropdown
              label="Services"
              items={servicesDropdown}
              to="/services"
            />

            {/* Case Studies dropdown */}
            <NavDropdown
              label="Case Studies"
              items={caseStudiesDropdown}
              to="/case-studies"
            />

            {simpleLinks.slice(1).map((l) => {
              const isActive = pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  data-ocid="nav.link"
                  className="relative px-3 py-2 text-sm font-medium group"
                >
                  <span
                    className={`transition-colors duration-200 ${
                      isActive
                        ? "text-white"
                        : "text-white/70 group-hover:text-white"
                    }`}
                  >
                    {l.label}
                  </span>
                  <span
                    className={`absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-[#38C98A] transition-all duration-300 origin-left ${
                      isActive
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-60"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <SearchBar />
            <Link
              to="/contact"
              data-ocid="nav.primary_button"
              className="
                relative inline-flex items-center gap-1.5
                bg-gradient-to-r from-[#38C98A] to-[#2db87a]
                hover:from-[#2db87a] hover:to-[#25a36b]
                text-white px-5 py-2.5 rounded-full text-sm font-semibold
                shadow-[0_2px_12px_rgba(56,201,138,0.35)]
                hover:shadow-[0_4px_20px_rgba(56,201,138,0.5)]
                hover:-translate-y-0.5
                transition-all duration-200
              "
            >
              Get Free SEO Audit
            </Link>
          </div>

          {/* Mobile: search + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <SearchBar />
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-label="Toggle mobile menu"
              data-ocid="nav.toggle"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden border-t border-white/10 shadow-lg"
            style={{ background: NAV_BG }}
          >
            <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-0.5">
              {/* Home */}
              <Link
                to="/"
                onClick={() => setOpen(false)}
                data-ocid="nav.link"
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname === "/"
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                Home
                {pathname === "/" && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38C98A]" />
                )}
              </Link>

              {/* Services accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  data-ocid="nav.toggle"
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                >
                  Services
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileServicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 pb-1 space-y-0.5">
                        {servicesDropdown.map((item) => (
                          <Link
                            key={item.label}
                            to="/services"
                            onClick={() => setOpen(false)}
                            data-ocid="nav.link"
                            className="flex flex-col px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                          >
                            <span className="text-white text-sm font-medium">
                              {item.label}
                            </span>
                            <span className="text-white/40 text-xs">
                              {item.desc}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Case Studies accordion */}
              <div>
                <button
                  type="button"
                  onClick={() =>
                    setMobileCaseStudiesOpen(!mobileCaseStudiesOpen)
                  }
                  data-ocid="nav.toggle"
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                >
                  Case Studies
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileCaseStudiesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {mobileCaseStudiesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 pb-1 space-y-0.5">
                        {caseStudiesDropdown.map((item) => (
                          <Link
                            key={item.label}
                            to="/case-studies"
                            onClick={() => setOpen(false)}
                            data-ocid="nav.link"
                            className="flex flex-col px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                          >
                            <span className="text-white text-sm font-medium">
                              {item.label}
                            </span>
                            <span className="text-white/40 text-xs">
                              {item.desc}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Simple links */}
              {simpleLinks.slice(1).map((l, i) => {
                const isActive = pathname === l.to;
                return (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.18 }}
                  >
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      data-ocid="nav.link"
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-white/10 text-white"
                          : "text-white/70 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {l.label}
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#38C98A]" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              <div className="pt-2 pb-1">
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  data-ocid="nav.primary_button"
                  className="
                    block text-center
                    bg-gradient-to-r from-[#38C98A] to-[#2db87a]
                    text-white px-5 py-2.5 rounded-full text-sm font-semibold
                    shadow-[0_2px_12px_rgba(56,201,138,0.3)]
                    transition-all duration-200
                  "
                >
                  Get Free SEO Audit
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
