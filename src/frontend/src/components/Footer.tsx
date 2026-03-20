import { Link } from "@tanstack/react-router";
import { Facebook, Linkedin, Mail, Phone, Twitter } from "lucide-react";

const socialLinks = [
  { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { Icon: Facebook, href: "https://facebook.com", label: "Facebook" },
];

const resources = [
  { label: "Free SEO Audit", href: "/contact" },
  { label: "SEO Checklist", href: "/blog" },
  { label: "SEO Glossary", href: "/blog" },
  { label: "Privacy Policy", href: "/" },
  { label: "Terms of Service", href: "/" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0B2A43] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#38C98A] flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="font-bold text-lg">RankPro SEO</span>
            </div>
            <p className="text-[#C7D2E0] text-sm leading-relaxed">
              Helping businesses grow through data-driven SEO strategies since
              2015.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-[#C7D2E0]">
              Pages
            </h4>
            <ul className="space-y-2">
              {(
                [
                  "/",
                  "/about",
                  "/services",
                  "/case-studies",
                  "/blog",
                  "/contact",
                ] as const
              ).map((path, i) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-sm text-[#C7D2E0] hover:text-[#38C98A] transition-colors"
                  >
                    {
                      (
                        [
                          "Home",
                          "About",
                          "Services",
                          "Case Studies",
                          "Blog",
                          "Contact",
                        ] as const
                      )[i]
                    }
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-[#C7D2E0]">
              Services
            </h4>
            <ul className="space-y-2 text-sm text-[#C7D2E0]">
              {[
                "On-Page SEO",
                "Off-Page SEO",
                "Technical SEO",
                "Keyword Research",
                "Local SEO",
              ].map((s) => (
                <li key={s}>
                  <Link
                    to="/services"
                    className="hover:text-[#38C98A] transition-colors"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-[#C7D2E0]">
              Resources
            </h4>
            <ul className="space-y-2 text-sm text-[#C7D2E0]">
              {resources.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href as "/"}
                    className="hover:text-[#38C98A] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-[#C7D2E0]">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-[#C7D2E0]">
                <Mail className="w-4 h-4 text-[#38C98A]" />
                <span>hello@rankproseo.com</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-[#C7D2E0]">
                <Phone className="w-4 h-4 text-[#38C98A]" />
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#38C98A] transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-sm text-[#C7D2E0]">
          &copy; {new Date().getFullYear()} RankPro SEO. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
