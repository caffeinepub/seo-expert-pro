const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Contact3DScene-FhSrj2Rw.js","assets/index-E0l8bml0.js","assets/index-DrfxZijs.css","assets/react-three-fiber.esm-DrHQSLel.js","assets/three.module-DUeOZydE.js"])))=>i.map(i=>d[i]);
import { r as reactExports, j as jsxRuntimeExports, _ as __vitePreload } from "./index-E0l8bml0.js";
import { N as Navbar, P as Phone, M as MapPin, T as Twitter, L as Linkedin, a as Facebook, F as Footer } from "./Navbar-B6wQFb1d.js";
import { u as useBackend } from "./useBackend-DEZOpj5P.js";
import { C as CircleCheckBig } from "./circle-check-big-h6ebg5jg.js";
import { M as Mail } from "./search-B8lbwY5c.js";
const Contact3DScene = reactExports.lazy(() => __vitePreload(() => import("./Contact3DScene-FhSrj2Rw.js"), true ? __vite__mapDeps([0,1,2,3,4]) : void 0));
const socialLinks = [
  { Icon: Twitter, href: "https://twitter.com/rankproseo", label: "Twitter" },
  {
    Icon: Linkedin,
    href: "https://linkedin.com/in/amityadav",
    label: "LinkedIn"
  },
  {
    Icon: Facebook,
    href: "https://facebook.com/rankproseo",
    label: "Facebook"
  }
];
function Contact() {
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [sent, setSent] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const backend = useBackend();
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await backend.submitContactForm(
        form.name,
        form.email,
        form.phone,
        form.message
      );
    } catch {
    }
    try {
      const existing = JSON.parse(
        localStorage.getItem("rankpro_contact_submissions") ?? "[]"
      );
      existing.push({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        source: "Contact Page",
        timestamp: Date.now()
      });
      localStorage.setItem(
        "rankpro_contact_submissions",
        JSON.stringify(existing)
      );
    } catch {
    }
    setSent(true);
    setLoading(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-[#0B2A43] py-20 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Contact3DScene, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-extrabold text-white mb-4", children: "Let's Grow Your Website" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#C7D2E0] text-lg", children: "Tell us about your business and we'll craft a custom SEO strategy for you." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-white py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-[#0B2A43] mb-6", children: "Send Us a Message" }),
        sent ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-16 h-16 text-[#38C98A] mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-[#0B2A43] mb-2", children: "Message Received!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "We'll review your request and get back to you within 24 hours with your free SEO audit." })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "contact-name",
                className: "block text-sm font-medium text-gray-700 mb-1",
                children: "Full Name *"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "contact-name",
                required: true,
                value: form.name,
                onChange: (e) => setForm({ ...form, name: e.target.value }),
                placeholder: "John Smith",
                className: "w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#38C98A] focus:ring-1 focus:ring-[#38C98A]"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "contact-email",
                className: "block text-sm font-medium text-gray-700 mb-1",
                children: "Email Address *"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "contact-email",
                required: true,
                type: "email",
                value: form.email,
                onChange: (e) => setForm({ ...form, email: e.target.value }),
                placeholder: "john@company.com",
                className: "w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#38C98A] focus:ring-1 focus:ring-[#38C98A]"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "contact-phone",
                className: "block text-sm font-medium text-gray-700 mb-1",
                children: "Phone Number"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "contact-phone",
                type: "tel",
                value: form.phone,
                onChange: (e) => setForm({ ...form, phone: e.target.value }),
                placeholder: "+977 98XXXXXXXX",
                className: "w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#38C98A] focus:ring-1 focus:ring-[#38C98A]"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "contact-message",
                className: "block text-sm font-medium text-gray-700 mb-1",
                children: "How Can We Help? *"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                id: "contact-message",
                required: true,
                rows: 5,
                value: form.message,
                onChange: (e) => setForm({ ...form, message: e.target.value }),
                placeholder: "Tell us about your website, current rankings, and SEO goals...",
                className: "w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#38C98A] focus:ring-1 focus:ring-[#38C98A] resize-none"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "submit",
              disabled: loading,
              className: "w-full bg-[#38C98A] hover:bg-[#2db87a] disabled:opacity-60 text-white py-3.5 rounded-lg font-semibold transition-colors",
              children: loading ? "Sending..." : "Send Message & Get Free Audit"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-[#0B2A43] mb-6", children: "Get in Touch" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-[#38C98A]/10 flex items-center justify-center flex-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-5 h-5 text-[#38C98A]" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-[#0B2A43] text-sm", children: "Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: "mailto:hello@rankproseo.com",
                  className: "text-gray-600 text-sm hover:text-[#38C98A]",
                  children: "hello@rankproseo.com"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-[#38C98A]/10 flex items-center justify-center flex-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-5 h-5 text-[#38C98A]" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-[#0B2A43] text-sm", children: "Phone" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: "tel:+9779868730337",
                  className: "text-gray-600 text-sm hover:text-[#38C98A]",
                  children: "+977 9868730337"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-[#38C98A]/10 flex items-center justify-center flex-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-5 h-5 text-[#38C98A]" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-[#0B2A43] text-sm", children: "Location" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-600 text-sm", children: "Baneshwor, Kathmandu (Remote Worldwide)" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-[#0B2A43] mb-3", children: "Follow Us" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3", children: socialLinks.map(({ Icon, href, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href,
              target: "_blank",
              rel: "noopener noreferrer",
              "aria-label": label,
              className: "w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#38C98A] hover:border-[#38C98A] hover:text-white text-gray-500 transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" })
            },
            label
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F7F9FC] rounded-2xl p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-[#0B2A43] mb-3", children: "Trust Badges" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: [
            "Google Analytics Certified",
            "4+ Yrs Experience",
            "100+ Happy Clients",
            "98% Retention Rate"
          ].map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-[#38C98A] flex-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-700 text-xs", children: b })
          ] }, b)) })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  Contact as default
};
