import {
  CheckCircle,
  Facebook,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { Suspense, lazy, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useBackend } from "../hooks/useBackend";

const Contact3DScene = lazy(() => import("../components/Contact3DScene"));

const socialLinks = [
  { Icon: Twitter, href: "https://twitter.com/rankproseo", label: "Twitter" },
  {
    Icon: Linkedin,
    href: "https://linkedin.com/in/amityadav",
    label: "LinkedIn",
  },
  {
    Icon: Facebook,
    href: "https://facebook.com/rankproseo",
    label: "Facebook",
  },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const backend = useBackend();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await backend.submitContactForm(
        form.name,
        form.email,
        form.phone,
        form.message,
      );
    } catch {
      // ignore backend error, still save locally
    }
    // Save to localStorage so admin panel can always see submissions
    try {
      const existing = JSON.parse(
        localStorage.getItem("rankpro_contact_submissions") ?? "[]",
      );
      existing.push({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        source: "Contact Page",
        timestamp: Date.now(),
      });
      localStorage.setItem(
        "rankpro_contact_submissions",
        JSON.stringify(existing),
      );
    } catch {
      /* ignore */
    }
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#0B2A43] py-20 relative overflow-hidden">
        <Suspense fallback={null}>
          <Contact3DScene />
        </Suspense>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Let's Grow Your Website
          </h1>
          <p className="text-[#C7D2E0] text-lg">
            Tell us about your business and we'll craft a custom SEO strategy
            for you.
          </p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-[#0B2A43] mb-6">
                Send Us a Message
              </h2>
              {sent ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-[#38C98A] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#0B2A43] mb-2">
                    Message Received!
                  </h3>
                  <p className="text-gray-500">
                    We'll review your request and get back to you within 24
                    hours with your free SEO audit.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="John Smith"
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#38C98A] focus:ring-1 focus:ring-[#38C98A]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="john@company.com"
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#38C98A] focus:ring-1 focus:ring-[#38C98A]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      placeholder="+977 98XXXXXXXX"
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#38C98A] focus:ring-1 focus:ring-[#38C98A]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      How Can We Help? *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      placeholder="Tell us about your website, current rankings, and SEO goals..."
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#38C98A] focus:ring-1 focus:ring-[#38C98A] resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#38C98A] hover:bg-[#2db87a] disabled:opacity-60 text-white py-3.5 rounded-lg font-semibold transition-colors"
                  >
                    {loading ? "Sending..." : "Send Message & Get Free Audit"}
                  </button>
                </form>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#0B2A43] mb-6">
                Get in Touch
              </h2>
              <div className="space-y-5 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#38C98A]/10 flex items-center justify-center flex-none">
                    <Mail className="w-5 h-5 text-[#38C98A]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0B2A43] text-sm">
                      Email
                    </div>
                    <a
                      href="mailto:hello@rankproseo.com"
                      className="text-gray-600 text-sm hover:text-[#38C98A]"
                    >
                      hello@rankproseo.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#38C98A]/10 flex items-center justify-center flex-none">
                    <Phone className="w-5 h-5 text-[#38C98A]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0B2A43] text-sm">
                      Phone
                    </div>
                    <a
                      href="tel:+9779868730337"
                      className="text-gray-600 text-sm hover:text-[#38C98A]"
                    >
                      +977 9868730337
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#38C98A]/10 flex items-center justify-center flex-none">
                    <MapPin className="w-5 h-5 text-[#38C98A]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0B2A43] text-sm">
                      Location
                    </div>
                    <span className="text-gray-600 text-sm">
                      Baneshwor, Kathmandu (Remote Worldwide)
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <div className="font-semibold text-[#0B2A43] mb-3">
                  Follow Us
                </div>
                <div className="flex gap-3">
                  {socialLinks.map(({ Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#38C98A] hover:border-[#38C98A] hover:text-white text-gray-500 transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-[#F7F9FC] rounded-2xl p-6">
                <h3 className="font-bold text-[#0B2A43] mb-3">Trust Badges</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Google Analytics Certified",
                    "4+ Yrs Experience",
                    "100+ Happy Clients",
                    "98% Retention Rate",
                  ].map((b) => (
                    <div key={b} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#38C98A] flex-none" />
                      <span className="text-gray-700 text-xs">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
