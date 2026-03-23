import { MessageCircle, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useActor } from "../hooks/useActor";

interface Message {
  id: number;
  text: string;
  from: "user" | "bot";
}

function getBotReply(input: string): string {
  const q = input.toLowerCase();
  if (/\b(hi|hello|hey)\b/.test(q))
    return "Hi! I'm your SEO Assistant. How can I help you today? Ask me about our services, pricing, or how to get started.";
  if (/service|what do you do/.test(q))
    return "We offer On-Page SEO, Off-Page SEO, Technical SEO, Keyword Research, and Local SEO services. Visit our Services page for details!";
  if (/price|cost|how much/.test(q))
    return "Our pricing is customized based on your needs. Get a free SEO audit to start -- no obligations!";
  if (/audit|free/.test(q))
    return "We offer a FREE SEO audit! Just visit our Contact page and fill out the form, or click 'Get Free SEO Audit' in the top menu.";
  if (/contact|reach|email|phone/.test(q))
    return "You can reach us via the Contact page. We respond within 24 hours!";
  if (/result|case study|proof/.test(q))
    return "Check out our Case Studies page to see real results we've achieved for clients \u2014 traffic increases, ranking improvements, and ROI.";
  if (/blog|tips|guide/.test(q))
    return "Our Blog has actionable SEO tips and guides. Check it out for the latest strategies!";
  if (/local seo/.test(q))
    return "Local SEO helps you rank in your city. We optimize your Google Business Profile, local citations, and on-page signals.";
  if (/technical seo/.test(q))
    return "Technical SEO covers site speed, crawlability, indexing, Core Web Vitals, and more. We do full technical audits.";
  if (/keyword/.test(q))
    return "Keyword research is the foundation of SEO. We find high-value, low-competition keywords your competitors are missing.";
  return "Great question! For detailed answers, please visit our Contact page or fill out the free audit form. We'd love to help!";
}

let idCounter = 0;
function nextId() {
  return ++idCounter;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [initialized, setInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messageCount = messages.length;
  const { actor } = useActor();

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
    const botReply = getBotReply(text);
    const userMsg: Message = { id: nextId(), text, from: "user" };
    const botMsg: Message = { id: nextId(), text: botReply, from: "bot" };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");

    // Log to backend silently
    if (actor) {
      actor.logChatbotMessage(text, botReply).catch(() => {});
    }
    // Also save to localStorage so admin panel can always see chatbot logs
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
