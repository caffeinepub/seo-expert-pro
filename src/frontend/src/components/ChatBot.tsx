import { MessageCircle, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useActor } from "../hooks/useActor";

interface Message {
  id: number;
  text: string;
  from: "user" | "bot";
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
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messageCount = messages.length;
  const { actor } = useActor();

  // Keep a rolling history for context (last 10 messages)
  const historyRef = useRef<{ role: string; content: string }[]>([]);

  function openChat() {
    if (!initialized) {
      setMessages([
        {
          id: nextId(),
          text: "Hi! I'm your SEO Assistant powered by AI. Ask me anything about SEO or our services!",
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
    if (!text || isLoading || !actor) return;

    const userMsg: Message = { id: nextId(), text, from: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    // Add to history
    historyRef.current = [
      ...historyRef.current.slice(-9),
      { role: "user", content: text },
    ];

    try {
      // Build history JSON string for backend (comma-prefixed objects, or empty string)
      const historyJsonStr =
        historyRef.current.length > 1
          ? `,${historyRef.current
              .slice(0, -1)
              .map(
                (m) =>
                  `{"role":"${m.role}","content":${JSON.stringify(m.content)}}`,
              )
              .join(",")}`
          : "";

      // Call backend askOpenAI via HTTP outcalls proxy
      // biome-ignore lint/suspicious/noExplicitAny: askOpenAI added in backend but not yet in generated types
      const botReply = (await (actor as any).askOpenAI(
        text,
        historyJsonStr,
      )) as string;

      historyRef.current = [
        ...historyRef.current,
        { role: "assistant", content: botReply },
      ];

      const botMsg: Message = { id: nextId(), text: botReply, from: "bot" };
      setMessages((prev) => [...prev, botMsg]);

      // Log silently
      actor.logChatbotMessage(text, botReply).catch(() => {});
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
    } catch {
      const errMsg: Message = {
        id: nextId(),
        text: "Sorry, I'm having trouble connecting right now. Please try again or contact us directly at +977 9868730337.",
        from: "bot",
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
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
  }, [messageCount, isLoading]);

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
                  <p className="text-green-300 text-xs">&#9679; AI-Powered</p>
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
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-400 px-3 py-2 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100 text-sm">
                    <span className="inline-flex gap-1">
                      <span
                        className="animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      >
                        ●
                      </span>
                      <span
                        className="animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      >
                        ●
                      </span>
                      <span
                        className="animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      >
                        ●
                      </span>
                    </span>
                  </div>
                </div>
              )}
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
                disabled={isLoading}
                data-ocid="chatbot.input"
                className="flex-1 text-sm px-3 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#38C98A]/40 focus:border-[#38C98A] bg-gray-50 disabled:opacity-60"
              />
              <button
                type="button"
                onClick={() => {
                  void sendMessage();
                }}
                disabled={!input.trim() || isLoading || !actor}
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
