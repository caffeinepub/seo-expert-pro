import { useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const pages = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Case Studies", path: "/case-studies" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

const blogPosts = [
  {
    label: "10 On-Page SEO Techniques That Actually Work in 2026",
    path: "/blog",
  },
  {
    label: "How to Build High-Quality Backlinks (Without Spamming)",
    path: "/blog",
  },
  { label: "The Complete Technical SEO Checklist for 2026", path: "/blog" },
  { label: "Keyword Research: Finding Hidden Opportunities", path: "/blog" },
  { label: "Local SEO: How to Rank #1 in Your City", path: "/blog" },
];

const allItems = [
  ...pages.map((p) => ({ ...p, type: "Page" })),
  ...blogPosts.map((b) => ({ ...b, type: "Blog" })),
];

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const results = query.trim()
    ? allItems.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  function handleOpen() {
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  const handleClose = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  function handleSelect(path: string) {
    navigate({ to: path });
    handleClose();
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    function onClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        handleClose();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [handleClose]);

  return (
    <div ref={containerRef} className="relative" data-ocid="search.panel">
      {!open ? (
        <button
          type="button"
          onClick={handleOpen}
          aria-label="Open search"
          data-ocid="search.button"
          className="p-2 rounded-full text-gray-500 hover:text-[#0B2A43] hover:bg-gray-100 transition-colors"
        >
          <Search className="w-5 h-5" />
        </button>
      ) : (
        <div className="flex items-center gap-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pages & posts..."
              data-ocid="search.input"
              className="w-56 pl-9 pr-3 py-1.5 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#38C98A]/40 focus:border-[#38C98A] bg-white"
            />
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close search"
            data-ocid="search.close_button"
            className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {open && results.length > 0 && (
        <div
          className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50"
          data-ocid="search.dropdown_menu"
        >
          {results.map((item) => (
            <button
              key={`${item.type}-${item.label}`}
              type="button"
              onClick={() => handleSelect(item.path)}
              className="w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
            >
              <span className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-[#38C98A] bg-[#38C98A]/10 px-1.5 py-0.5 rounded w-12 text-center shrink-0">
                {item.type}
              </span>
              <span className="text-sm text-gray-700 leading-snug">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      )}

      {open && query.trim() && results.length === 0 && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 z-50">
          <p className="text-sm text-gray-500">No results for "{query}"</p>
        </div>
      )}
    </div>
  );
}
