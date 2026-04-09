import { useRouterState } from "@tanstack/react-router";
import { MessageCircle, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: number;
  text: string;
  from: "user" | "bot";
}

let idCounter = 0;
function nextId() {
  return ++idCounter;
}

function getBotReply(input: string): string {
  const q = input.toLowerCase();
  if (
    q.includes("price") ||
    q.includes("cost") ||
    q.includes("pricing") ||
    q.includes("how much")
  ) {
    return "Our pricing depends on your needs. We offer Starter, Growth, and Enterprise plans. Please visit the Services page or contact us for a custom quote!";
  }
  if (q.includes("on-page") || q.includes("on page")) {
    return "On-Page SEO involves optimizing your website's content, titles, meta descriptions, headings, and internal links to rank higher in search engines.";
  }
  if (
    q.includes("off-page") ||
    q.includes("off page") ||
    q.includes("backlink") ||
    q.includes("link building")
  ) {
    return "Off-Page SEO focuses on building high-quality backlinks from authoritative sites to improve your website's domain authority and rankings.";
  }
  if (
    q.includes("technical seo") ||
    q.includes("site speed") ||
    q.includes("core web vitals")
  ) {
    return "Technical SEO ensures your website is fast, secure, mobile-friendly, and free of crawl errors — giving search engines the best chance to index your pages.";
  }
  if (
    q.includes("local seo") ||
    q.includes("google my business") ||
    q.includes("local")
  ) {
    return "Local SEO helps your business appear in local search results and Google Maps, driving nearby customers to your door.";
  }
  if (q.includes("keyword") || q.includes("keyword research")) {
    return "Keyword research identifies the exact terms your target audience uses, so we can create content that ranks and converts.";
  }
  if (
    q.includes("how long") ||
    q.includes("time") ||
    q.includes("result") ||
    q.includes("when")
  ) {
    return "SEO typically takes 3–6 months to show significant results. The timeline depends on competition, your current site health, and the strategies applied.";
  }
  if (q.includes("audit") || q.includes("free")) {
    return "We offer a Free SEO Audit! Visit the Contact page or click the Free SEO Audit link in the footer to get started.";
  }
  if (
    q.includes("contact") ||
    q.includes("reach") ||
    q.includes("call") ||
    q.includes("phone")
  ) {
    return "You can reach us at +977 9868730337 or visit our Contact page. We're based in Baneshwor, Kathmandu and serve clients worldwide.";
  }
  if (
    q.includes("seo") ||
    q.includes("search engine") ||
    q.includes("rank") ||
    q.includes("traffic") ||
    q.includes("organic")
  ) {
    return "SEO (Search Engine Optimization) is the process of improving your website's visibility on Google. We specialize in On-Page, Off-Page, Technical, Local SEO, and Keyword Research.";
  }
  if (
    q.includes("hello") ||
    q.includes("hi") ||
    q.includes("hey") ||
    q.includes("good")
  ) {
    return "Hello! I'm your RankPro SEO Assistant. Ask me anything about SEO strategies, our services, or how to improve your website's ranking!";
  }
  return "Thanks for your question! For personalized SEO advice, please contact us at +977 9868730337 or use the Contact page. We'd love to help you grow your website!";
}

export default function ChatBot() {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [initialized, setInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messageCount = messages.length;

  function openChat() {
    if (!initialized) {
      setMessages([
        {
          id: nextId(),
          text: "Hi! I'm your SEO Assistant. Ask me anything about SEO or our services!",
          from: "bot",
        },
      ]);
      setInitialized(true);
    }
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  function closeChat() {
    setIsOpen(false);
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text) return;

    const userMsg: Message = { id: nextId(), text, from: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const botReply = getBotReply(text);
    const botMsg: Message = { id: nextId(), text: botReply, from: "bot" };
    setMessages((prev) => [...prev, botMsg]);

    // Log to localStorage so admin panel can see conversations
    try {
      const existing = JSON.parse(
        localStorage.getItem("rankpro_chatbot_logs") ?? "[]",
      );
      existing.push({
        id: Date.now(),
        question: text,
        answer: botReply,
        timestamp: Date.now(),
      });
      localStorage.setItem("rankpro_chatbot_logs", JSON.stringify(existing));
    } catch {
      /* ignore */
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      void sendMessage();
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally scroll when message count changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageCount]);

  if (pathname === "/admin") return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            data-ocid="chatbot.panel"
            className="w-[340px] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-100"
            style={{ height: 480 }}
          >
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ background: "#0B2A43" }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "#38C98A" }}
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    SEO Assistant
                  </p>
                  <p className="text-green-300 text-xs">&#9679; Online</p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeChat}
                aria-label="Close chat"
                data-ocid="chatbot.close_button"
                className="text-white/60 hover:text-white transition-colors p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-3 bg-gray-50 space-y-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.from === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-snug ${
                      msg.from === "user"
                        ? "bg-[#0B2A43] text-white rounded-br-sm"
                        : "bg-white text-gray-700 rounded-bl-sm shadow-sm border border-gray-100"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="flex items-center gap-2 px-3 py-3 bg-white border-t border-gray-100">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about SEO..."
                data-ocid="chatbot.input"
                className="flex-1 text-sm px-3 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#38C98A]/40 focus:border-[#38C98A] bg-gray-50"
              />
              <button
                type="button"
                onClick={() => {
                  void sendMessage();
                }}
                disabled={!input.trim()}
                data-ocid="chatbot.submit_button"
                className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                style={{ background: "#38C98A" }}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={isOpen ? closeChat : openChat}
        aria-label={isOpen ? "Close chat" : "Open SEO Assistant chat"}
        data-ocid="chatbot.open_modal_button"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full text-white shadow-xl flex items-center justify-center transition-colors"
        style={{ background: isOpen ? "#0B2A43" : "#38C98A" }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6" />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
