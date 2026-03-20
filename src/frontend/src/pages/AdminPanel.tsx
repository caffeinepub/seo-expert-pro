import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertTriangle,
  BarChart3,
  ChevronRight,
  Clock,
  Download,
  Eye,
  KeyRound,
  LayoutDashboard,
  Lock,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  RefreshCw,
  Search,
  Shield,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import type { ChatbotLog, ContactFormEntry } from "../backend";
import { useActor } from "../hooks/useActor";

type Tab = "overview" | "chatbot" | "contacts" | "analytics";
type AuthState = "loading" | "setup" | "login" | "dashboard";

const SESSION_KEY = "admin_session_token";

const STOPWORDS = new Set([
  "the",
  "a",
  "an",
  "and",
  "or",
  "but",
  "in",
  "on",
  "at",
  "to",
  "for",
  "of",
  "with",
  "by",
  "from",
  "is",
  "it",
  "as",
  "be",
  "i",
  "my",
  "our",
  "your",
  "we",
  "how",
  "what",
  "when",
  "where",
  "do",
  "does",
  "can",
  "you",
  "me",
  "about",
  "that",
  "this",
  "are",
  "was",
  "get",
  "us",
  "have",
  "will",
  "not",
  "no",
  "so",
  "if",
  "s",
]);

function tsToDate(ts: bigint): Date {
  return new Date(Number(ts / 1_000_000n));
}

function formatDate(ts: bigint): string {
  return tsToDate(ts).toLocaleString();
}

function formatDateShort(ts: bigint): string {
  return tsToDate(ts).toLocaleDateString();
}

function groupByDay(items: { timestamp: bigint }[]) {
  const counts: Record<string, number> = {};
  for (const item of items) {
    const day = tsToDate(item.timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    counts[day] = (counts[day] ?? 0) + 1;
  }
  return Object.entries(counts)
    .slice(-14)
    .map(([date, count]) => ({ date, count }));
}

function extractTopics(logs: ChatbotLog[], topN = 5) {
  const freq: Record<string, number> = {};
  for (const log of logs) {
    const words = log.question
      .toLowerCase()
      .replace(/[^a-z\s]/g, "")
      .split(/\s+/);
    for (const w of words) {
      if (w.length > 2 && !STOPWORDS.has(w)) {
        freq[w] = (freq[w] ?? 0) + 1;
      }
    }
  }
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([name, value]) => ({ name, value }));
}

function exportCSV(headers: string[], rows: string[][], filename: string) {
  const csv = [headers, ...rows]
    .map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

const GREEN = "#22c55e";
const PIE_COLORS = ["#22c55e", "#16a34a", "#4ade80", "#86efac", "#0ea5e9"];

// ─── Background Particles ─────────────────────────────────────────────────────
const BG_PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  width: 30 + ((i * 37) % 70),
  height: 25 + ((i * 53) % 65),
  left: (i * 17 + 3) % 100,
  top: (i * 23 + 7) % 100,
  duration: 4 + (i % 6),
  delay: (i * 0.4) % 4,
}));

// ─── Sidebar ─────────────────────────────────────────────────────────────────
const NAV_ITEMS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  {
    id: "overview",
    label: "Dashboard Overview",
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  {
    id: "chatbot",
    label: "Chatbot Data",
    icon: <MessageSquare className="w-4 h-4" />,
  },
  {
    id: "contacts",
    label: "Contact Submissions",
    icon: <Mail className="w-4 h-4" />,
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: <BarChart3 className="w-4 h-4" />,
  },
];

interface SidebarProps {
  activeTab: Tab;
  setActiveTab: (t: Tab) => void;
  onClose?: () => void;
}

function Sidebar({ activeTab, setActiveTab, onClose }: SidebarProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
        <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center shrink-0">
          <Shield className="w-4 h-4 text-white" />
        </div>
        <span className="text-white font-bold text-sm tracking-wide">
          RankPro Admin
        </span>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="ml-auto text-white/50 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <nav className="flex-1 py-4 px-3 space-y-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            data-ocid={`admin.${item.id}.tab`}
            onClick={() => {
              setActiveTab(item.id);
              onClose?.();
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === item.id
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            {item.icon}
            {item.label}
            {activeTab === item.id && (
              <ChevronRight className="w-3.5 h-3.5 ml-auto" />
            )}
          </button>
        ))}
      </nav>
      <div className="px-3 pb-4">
        <div className="rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 text-xs text-white/40">
          Owner-only access
        </div>
      </div>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div
      data-ocid="admin.overview.card"
      className="rounded-xl border border-white/10 bg-white/5 backdrop-blur p-5 flex items-start gap-4"
    >
      <div className="w-10 h-10 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center text-green-400 shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-white/50 text-xs mb-1">{label}</p>
        <p className="text-white text-2xl font-bold">{value}</p>
        {sub && <p className="text-white/40 text-xs mt-1">{sub}</p>}
      </div>
    </div>
  );
}

// ─── Auth Card Wrapper ────────────────────────────────────────────────────────
function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        background: "linear-gradient(135deg, #0a0f1e 0%, #0d1b2a 100%)",
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {BG_PARTICLES.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-green-500/10"
            style={{
              width: p.width,
              height: p.height,
              left: `${p.left}%`,
              top: `${p.top}%`,
              animation: `float ${p.duration}s ease-in-out infinite alternate`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md mx-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl"
      >
        {children}
      </motion.div>
    </div>
  );
}

// ─── Login Screen ─────────────────────────────────────────────────────────────
function LoginScreen({
  onLogin,
}: {
  onLogin: (email: string, password: string) => Promise<string | null>;
}) {
  const [email, setEmail] = useState("amiyadav410@gmail.com");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setIsSubmitting(true);
    setError("");
    const token = await onLogin(email, password);
    if (!token) {
      setError("Invalid email or password.");
    }
    setIsSubmitting(false);
  }

  return (
    <AuthCard>
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-green-500/20 border border-green-500/30 flex items-center justify-center mb-4">
          <Lock className="w-8 h-8 text-green-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Admin Login</h1>
        <p className="text-white/50 text-sm">
          This area is restricted to the website owner.
        </p>
      </div>

      {error && (
        <div
          data-ocid="admin.login.error_state"
          className="mb-5 rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 flex items-center gap-3"
        >
          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        data-ocid="admin.login.card"
      >
        <div className="space-y-1.5">
          <Label htmlFor="admin-email" className="text-white/70 text-sm">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <Input
              id="admin-email"
              data-ocid="admin.login.input"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-green-500/50"
              autoComplete="email"
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="admin-password" className="text-white/70 text-sm">
            Password
          </Label>
          <div className="relative">
            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <Input
              id="admin-password"
              data-ocid="admin.login.input"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-green-500/50"
              autoComplete="current-password"
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          data-ocid="admin.login.primary_button"
          disabled={isSubmitting}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold h-11 mt-2"
        >
          {isSubmitting ? (
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Shield className="w-4 h-4 mr-2" />
          )}
          {isSubmitting ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      {/* Default credentials info box */}
      <div className="mt-5 rounded-lg bg-blue-500/10 border border-blue-400/20 px-4 py-3">
        <p className="text-blue-300 text-xs font-semibold uppercase tracking-wider mb-2">
          Default Login Credentials
        </p>
        <p className="text-blue-200/80 text-sm">
          <span className="text-white/50">Email:</span> amiyadav410@gmail.com
        </p>
        <p className="text-blue-200/80 text-sm mt-1">
          <span className="text-white/50">Password:</span> RankPro@2026
        </p>
      </div>
    </AuthCard>
  );
}

// ─── Setup Screen ─────────────────────────────────────────────────────────────
function SetupScreen({
  onSetup,
}: {
  onSetup: (email: string, password: string) => Promise<boolean>;
}) {
  const [email, setEmail] = useState("amiyadav410@gmail.com");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password || !confirm) {
      setError("All fields are required.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setIsSubmitting(true);
    setError("");
    const ok = await onSetup(email, password);
    if (ok) {
      setSuccess(true);
    } else {
      setError("Setup failed. Please try again.");
    }
    setIsSubmitting(false);
  }

  if (success) {
    return (
      <AuthCard>
        <div
          data-ocid="admin.setup.success_state"
          className="flex flex-col items-center text-center gap-4 py-4"
        >
          <div className="w-16 h-16 rounded-2xl bg-green-500/20 border border-green-500/30 flex items-center justify-center">
            <Shield className="w-8 h-8 text-green-400" />
          </div>
          <h2 className="text-white text-xl font-bold">
            Admin account created!
          </h2>
          <p className="text-white/50 text-sm">Redirecting to login...</p>
          <RefreshCw className="w-5 h-5 text-green-400 animate-spin" />
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-green-500/20 border border-green-500/30 flex items-center justify-center mb-4">
          <KeyRound className="w-8 h-8 text-green-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">
          Set Up Admin Access
        </h1>
        <p className="text-white/50 text-sm">
          Create your admin credentials to protect this panel.
        </p>
      </div>

      {error && (
        <div
          data-ocid="admin.setup.error_state"
          className="mb-5 rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 flex items-center gap-3"
        >
          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        data-ocid="admin.setup.card"
      >
        <div className="space-y-1.5">
          <Label htmlFor="setup-email" className="text-white/70 text-sm">
            Admin Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <Input
              id="setup-email"
              data-ocid="admin.setup.input"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-green-500/50"
              autoComplete="email"
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="setup-password" className="text-white/70 text-sm">
            Password
          </Label>
          <div className="relative">
            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <Input
              id="setup-password"
              data-ocid="admin.setup.input"
              type="password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-green-500/50"
              autoComplete="new-password"
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="setup-confirm" className="text-white/70 text-sm">
            Confirm Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <Input
              id="setup-confirm"
              data-ocid="admin.setup.input"
              type="password"
              placeholder="Repeat password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-green-500/50"
              autoComplete="new-password"
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          data-ocid="admin.setup.submit_button"
          disabled={isSubmitting}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold h-11 mt-2"
        >
          {isSubmitting ? (
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Shield className="w-4 h-4 mr-2" />
          )}
          {isSubmitting ? "Creating..." : "Create Admin Account"}
        </Button>
      </form>
    </AuthCard>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
function Dashboard({
  chatbotLogs,
  contactSubmissions,
  isLoading,
  onRefresh,
  onLogout,
}: {
  chatbotLogs: ChatbotLog[];
  contactSubmissions: ContactFormEntry[];
  isLoading: boolean;
  onRefresh: () => void;
  onLogout: () => void;
}) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatSearch, setChatSearch] = useState("");
  const [contactSearch, setContactSearch] = useState("");
  const [selectedContact, setSelectedContact] =
    useState<ContactFormEntry | null>(null);

  const filteredChat = chatbotLogs.filter(
    (l) =>
      l.question.toLowerCase().includes(chatSearch.toLowerCase()) ||
      l.answer.toLowerCase().includes(chatSearch.toLowerCase()),
  );

  const filteredContacts = contactSubmissions.filter(
    (c) =>
      c.name.toLowerCase().includes(contactSearch.toLowerCase()) ||
      c.email.toLowerCase().includes(contactSearch.toLowerCase()) ||
      c.message.toLowerCase().includes(contactSearch.toLowerCase()),
  );

  const recentContacts = [...contactSubmissions]
    .sort((a, b) => Number(b.timestamp - a.timestamp))
    .slice(0, 5);
  const recentChat = [...chatbotLogs]
    .sort((a, b) => Number(b.timestamp - a.timestamp))
    .slice(0, 5);

  const contactsOverTime = groupByDay(contactSubmissions);
  const chatOverTime = groupByDay(chatbotLogs);
  const topics = extractTopics(chatbotLogs);

  const mostRecentTs = contactSubmissions.length
    ? contactSubmissions.reduce((a, b) => (a.timestamp > b.timestamp ? a : b))
        .timestamp
    : null;

  function handleExportChat() {
    exportCSV(
      ["#", "Question", "Bot Answer", "Date/Time"],
      filteredChat.map((l, i) => [
        String(i + 1),
        l.question,
        l.answer,
        formatDate(l.timestamp),
      ]),
      "chatbot-logs.csv",
    );
  }

  function handleExportContacts() {
    exportCSV(
      ["#", "Name", "Email", "Phone", "Message", "Date/Time"],
      filteredContacts.map((c, i) => [
        String(i + 1),
        c.name,
        c.email,
        c.phone,
        c.message,
        formatDate(c.timestamp),
      ]),
      "contact-submissions.csv",
    );
  }

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: "#0a0f1e" }}
    >
      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex flex-col w-60 shrink-0 border-r border-white/10"
        style={{ background: "#0d1b2a" }}
      >
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-60 flex flex-col border-r border-white/10"
              style={{ background: "#0d1b2a" }}
            >
              <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onClose={() => setSidebarOpen(false)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header
          className="flex items-center gap-3 px-4 py-3 border-b border-white/10"
          style={{ background: "#0d1b2a" }}
        >
          <button
            type="button"
            data-ocid="admin.sidebar.toggle"
            className="lg:hidden text-white/60 hover:text-white"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-white font-bold text-sm">Admin Panel</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button
              type="button"
              data-ocid="admin.refresh.button"
              onClick={onRefresh}
              disabled={isLoading}
              className="text-white/50 hover:text-white transition-colors"
            >
              <RefreshCw
                className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
              />
            </button>
            <Button
              data-ocid="admin.logout.button"
              variant="outline"
              size="sm"
              onClick={onLogout}
              className="border-white/20 text-white/70 hover:text-white hover:bg-white/10 text-xs"
            >
              <LogOut className="w-3.5 h-3.5 mr-1.5" />
              Logout
            </Button>
          </div>
        </header>

        {/* Content */}
        <ScrollArea className="flex-1">
          <div className="p-6">
            {/* ── Overview ── */}
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                data-ocid="admin.overview.section"
              >
                <h2 className="text-white text-xl font-bold mb-6">
                  Dashboard Overview
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  <StatCard
                    icon={<Mail className="w-5 h-5" />}
                    label="Total Contact Submissions"
                    value={contactSubmissions.length}
                  />
                  <StatCard
                    icon={<MessageSquare className="w-5 h-5" />}
                    label="Total Chatbot Conversations"
                    value={chatbotLogs.length}
                  />
                  <StatCard
                    icon={<Clock className="w-5 h-5" />}
                    label="Most Recent Submission"
                    value={mostRecentTs ? formatDateShort(mostRecentTs) : "—"}
                    sub={mostRecentTs ? formatDate(mostRecentTs) : undefined}
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Contacts */}
                  <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Mail className="w-4 h-4 text-green-400" />
                      <h3 className="text-white font-semibold text-sm">
                        Recent Contacts
                      </h3>
                    </div>
                    {recentContacts.length === 0 ? (
                      <p
                        data-ocid="admin.contacts.empty_state"
                        className="text-white/30 text-sm text-center py-6"
                      >
                        No submissions yet
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {recentContacts.map((c, idx) => (
                          <div
                            key={c.email + String(c.timestamp)}
                            data-ocid={`admin.contacts.item.${idx + 1}`}
                            className="flex items-center gap-3 p-2.5 rounded-lg bg-white/5"
                          >
                            <div className="w-7 h-7 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-xs font-bold shrink-0">
                              {c.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-sm font-medium truncate">
                                {c.name}
                              </p>
                              <p className="text-white/40 text-xs truncate">
                                {c.email}
                              </p>
                            </div>
                            <p className="text-white/30 text-xs shrink-0">
                              {formatDateShort(c.timestamp)}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Recent Chatbot */}
                  <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <MessageSquare className="w-4 h-4 text-green-400" />
                      <h3 className="text-white font-semibold text-sm">
                        Recent Chatbot Messages
                      </h3>
                    </div>
                    {recentChat.length === 0 ? (
                      <p
                        data-ocid="admin.chatbot.empty_state"
                        className="text-white/30 text-sm text-center py-6"
                      >
                        No messages yet
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {recentChat.map((l, i) => (
                          <div
                            key={Number(l.id)}
                            data-ocid={`admin.chatbot.item.${i + 1}`}
                            className="p-2.5 rounded-lg bg-white/5"
                          >
                            <p className="text-white text-xs font-medium truncate mb-1">
                              Q: {l.question}
                            </p>
                            <p className="text-white/40 text-xs truncate">
                              A: {l.answer}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── Chatbot Data ── */}
            {activeTab === "chatbot" && (
              <motion.div
                key="chatbot"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                data-ocid="admin.chatbot.section"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
                  <div>
                    <h2 className="text-white text-xl font-bold">
                      Chatbot Data
                    </h2>
                    <p className="text-white/40 text-sm mt-0.5">
                      All logged chatbot conversations
                    </p>
                  </div>
                  <div className="sm:ml-auto flex items-center gap-3">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      {filteredChat.length} messages
                    </Badge>
                    <Button
                      data-ocid="admin.chatbot.export.button"
                      variant="outline"
                      size="sm"
                      onClick={handleExportChat}
                      className="border-white/20 text-white/70 hover:text-white hover:bg-white/10 text-xs"
                    >
                      <Download className="w-3.5 h-3.5 mr-1.5" />
                      Export CSV
                    </Button>
                  </div>
                </div>

                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <Input
                    data-ocid="admin.chatbot.search_input"
                    placeholder="Search questions or answers..."
                    value={chatSearch}
                    onChange={(e) => setChatSearch(e.target.value)}
                    className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-green-500/50"
                  />
                </div>

                <div
                  data-ocid="admin.chatbot.table"
                  className="rounded-xl border border-white/10 bg-white/5 overflow-hidden"
                >
                  {filteredChat.length === 0 ? (
                    <div
                      data-ocid="admin.chatbot.empty_state"
                      className="flex flex-col items-center py-16 text-white/30"
                    >
                      <MessageSquare className="w-10 h-10 mb-3 opacity-30" />
                      <p>No chatbot messages found</p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow className="border-white/10 hover:bg-transparent">
                          <TableHead className="text-white/40 w-10">
                            #
                          </TableHead>
                          <TableHead className="text-white/40">
                            Question
                          </TableHead>
                          <TableHead className="text-white/40">
                            Bot Answer
                          </TableHead>
                          <TableHead className="text-white/40 w-32">
                            Date/Time
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredChat.map((log, i) => (
                          <TableRow
                            key={Number(log.id)}
                            data-ocid={`admin.chatbot.row.${i + 1}`}
                            className="border-white/10 hover:bg-white/5"
                          >
                            <TableCell className="text-white/30 text-xs">
                              {i + 1}
                            </TableCell>
                            <TableCell className="text-white text-sm max-w-xs">
                              <p className="truncate">{log.question}</p>
                            </TableCell>
                            <TableCell className="text-white/60 text-sm max-w-xs">
                              <p className="truncate">{log.answer}</p>
                            </TableCell>
                            <TableCell className="text-white/40 text-xs whitespace-nowrap">
                              {formatDate(log.timestamp)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </div>
              </motion.div>
            )}

            {/* ── Contact Submissions ── */}
            {activeTab === "contacts" && (
              <motion.div
                key="contacts"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                data-ocid="admin.contacts.section"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
                  <div>
                    <h2 className="text-white text-xl font-bold">
                      Contact Submissions
                    </h2>
                    <p className="text-white/40 text-sm mt-0.5">
                      All form submissions from the contact page
                    </p>
                  </div>
                  <div className="sm:ml-auto flex items-center gap-3">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      {filteredContacts.length} entries
                    </Badge>
                    <Button
                      data-ocid="admin.contacts.export.button"
                      variant="outline"
                      size="sm"
                      onClick={handleExportContacts}
                      className="border-white/20 text-white/70 hover:text-white hover:bg-white/10 text-xs"
                    >
                      <Download className="w-3.5 h-3.5 mr-1.5" />
                      Export CSV
                    </Button>
                  </div>
                </div>

                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <Input
                    data-ocid="admin.contacts.search_input"
                    placeholder="Search by name, email or message..."
                    value={contactSearch}
                    onChange={(e) => setContactSearch(e.target.value)}
                    className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-green-500/50"
                  />
                </div>

                <div
                  data-ocid="admin.contacts.table"
                  className="rounded-xl border border-white/10 bg-white/5 overflow-hidden"
                >
                  {filteredContacts.length === 0 ? (
                    <div
                      data-ocid="admin.contacts.empty_state"
                      className="flex flex-col items-center py-16 text-white/30"
                    >
                      <Mail className="w-10 h-10 mb-3 opacity-30" />
                      <p>No contact submissions found</p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow className="border-white/10 hover:bg-transparent">
                          <TableHead className="text-white/40 w-10">
                            #
                          </TableHead>
                          <TableHead className="text-white/40">Name</TableHead>
                          <TableHead className="text-white/40">Email</TableHead>
                          <TableHead className="text-white/40 hidden md:table-cell">
                            Phone
                          </TableHead>
                          <TableHead className="text-white/40">
                            Message
                          </TableHead>
                          <TableHead className="text-white/40 w-32">
                            Date
                          </TableHead>
                          <TableHead className="text-white/40 w-10" />
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredContacts.map((c, i) => (
                          <TableRow
                            key={c.email + String(c.timestamp)}
                            data-ocid={`admin.contacts.row.${i + 1}`}
                            className="border-white/10 hover:bg-white/5 cursor-pointer"
                            onClick={() => setSelectedContact(c)}
                          >
                            <TableCell className="text-white/30 text-xs">
                              {i + 1}
                            </TableCell>
                            <TableCell className="text-white font-medium text-sm">
                              {c.name}
                            </TableCell>
                            <TableCell className="text-white/60 text-sm">
                              {c.email}
                            </TableCell>
                            <TableCell className="text-white/60 text-sm hidden md:table-cell">
                              {c.phone || "—"}
                            </TableCell>
                            <TableCell className="text-white/60 text-sm max-w-xs">
                              <p className="truncate">{c.message}</p>
                            </TableCell>
                            <TableCell className="text-white/40 text-xs whitespace-nowrap">
                              {formatDateShort(c.timestamp)}
                            </TableCell>
                            <TableCell>
                              <Eye className="w-3.5 h-3.5 text-white/30" />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </div>

                {/* Contact Detail Modal */}
                <Dialog
                  open={!!selectedContact}
                  onOpenChange={(o) => !o && setSelectedContact(null)}
                >
                  <DialogContent
                    data-ocid="admin.contact.dialog"
                    className="border-white/10 text-white max-w-lg"
                    style={{ background: "#0d1b2a" }}
                  >
                    <DialogHeader>
                      <DialogTitle className="text-white flex items-center gap-2">
                        <Users className="w-4 h-4 text-green-400" />
                        Contact Details
                      </DialogTitle>
                    </DialogHeader>
                    {selectedContact && (
                      <div className="space-y-4 mt-2">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="rounded-lg bg-white/5 p-3">
                            <p className="text-white/40 text-xs mb-1">Name</p>
                            <p className="text-white text-sm font-medium">
                              {selectedContact.name}
                            </p>
                          </div>
                          <div className="rounded-lg bg-white/5 p-3">
                            <p className="text-white/40 text-xs mb-1">Email</p>
                            <p className="text-white text-sm break-all">
                              {selectedContact.email}
                            </p>
                          </div>
                          <div className="rounded-lg bg-white/5 p-3">
                            <p className="text-white/40 text-xs mb-1">Phone</p>
                            <p className="text-white text-sm">
                              {selectedContact.phone || "—"}
                            </p>
                          </div>
                          <div className="rounded-lg bg-white/5 p-3">
                            <p className="text-white/40 text-xs mb-1">
                              Submitted
                            </p>
                            <p className="text-white text-sm">
                              {formatDate(selectedContact.timestamp)}
                            </p>
                          </div>
                        </div>
                        <div className="rounded-lg bg-white/5 p-3">
                          <p className="text-white/40 text-xs mb-2">Message</p>
                          <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">
                            {selectedContact.message}
                          </p>
                        </div>
                        <Button
                          data-ocid="admin.contact.close_button"
                          variant="outline"
                          className="w-full border-white/20 text-white/70 hover:text-white hover:bg-white/10"
                          onClick={() => setSelectedContact(null)}
                        >
                          Close
                        </Button>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </motion.div>
            )}

            {/* ── Analytics ── */}
            {activeTab === "analytics" && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                data-ocid="admin.analytics.section"
              >
                <div className="mb-6">
                  <h2 className="text-white text-xl font-bold">Analytics</h2>
                  <p className="text-white/40 text-sm mt-0.5">
                    Visual insights from your site data
                  </p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {/* Contact form submissions over time */}
                  <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center gap-2 mb-5">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <h3 className="text-white font-semibold text-sm">
                        Contact Submissions Over Time
                      </h3>
                    </div>
                    {contactsOverTime.length === 0 ? (
                      <div
                        data-ocid="admin.analytics.contacts_chart.empty_state"
                        className="flex items-center justify-center h-48 text-white/30 text-sm"
                      >
                        No data yet
                      </div>
                    ) : (
                      <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={contactsOverTime}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="rgba(255,255,255,0.05)"
                          />
                          <XAxis
                            dataKey="date"
                            tick={{
                              fill: "rgba(255,255,255,0.4)",
                              fontSize: 11,
                            }}
                          />
                          <YAxis
                            tick={{
                              fill: "rgba(255,255,255,0.4)",
                              fontSize: 11,
                            }}
                            allowDecimals={false}
                          />
                          <RechartsTooltip
                            contentStyle={{
                              background: "#0d1b2a",
                              border: "1px solid rgba(255,255,255,0.1)",
                              borderRadius: 8,
                              color: "#fff",
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="count"
                            stroke={GREEN}
                            strokeWidth={2}
                            dot={{ fill: GREEN, r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    )}
                  </div>

                  {/* Chatbot conversations by day */}
                  <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center gap-2 mb-5">
                      <BarChart3 className="w-4 h-4 text-green-400" />
                      <h3 className="text-white font-semibold text-sm">
                        Chatbot Conversations by Day
                      </h3>
                    </div>
                    {chatOverTime.length === 0 ? (
                      <div
                        data-ocid="admin.analytics.chatbot_chart.empty_state"
                        className="flex items-center justify-center h-48 text-white/30 text-sm"
                      >
                        No data yet
                      </div>
                    ) : (
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={chatOverTime}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="rgba(255,255,255,0.05)"
                          />
                          <XAxis
                            dataKey="date"
                            tick={{
                              fill: "rgba(255,255,255,0.4)",
                              fontSize: 11,
                            }}
                          />
                          <YAxis
                            tick={{
                              fill: "rgba(255,255,255,0.4)",
                              fontSize: 11,
                            }}
                            allowDecimals={false}
                          />
                          <RechartsTooltip
                            contentStyle={{
                              background: "#0d1b2a",
                              border: "1px solid rgba(255,255,255,0.1)",
                              borderRadius: 8,
                              color: "#fff",
                            }}
                          />
                          <Bar
                            dataKey="count"
                            fill={GREEN}
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                  </div>

                  {/* Pie chart: top chatbot topics */}
                  <div className="rounded-xl border border-white/10 bg-white/5 p-5 xl:col-span-2">
                    <div className="flex items-center gap-2 mb-5">
                      <MessageSquare className="w-4 h-4 text-green-400" />
                      <h3 className="text-white font-semibold text-sm">
                        Top 5 Chatbot Question Topics
                      </h3>
                    </div>
                    {topics.length === 0 ? (
                      <div
                        data-ocid="admin.analytics.topics_chart.empty_state"
                        className="flex items-center justify-center h-48 text-white/30 text-sm"
                      >
                        No chatbot data yet
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row items-center gap-6">
                        <ResponsiveContainer width={240} height={240}>
                          <PieChart>
                            <Pie
                              data={topics}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={100}
                              paddingAngle={3}
                              dataKey="value"
                            >
                              {topics.map((_, index) => (
                                <Cell
                                  key={PIE_COLORS[index % PIE_COLORS.length]}
                                  fill={PIE_COLORS[index % PIE_COLORS.length]}
                                />
                              ))}
                            </Pie>
                            <RechartsTooltip
                              contentStyle={{
                                background: "#0d1b2a",
                                border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: 8,
                                color: "#fff",
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="flex flex-col gap-2 flex-1">
                          {topics.map((t, i) => (
                            <div
                              key={t.name}
                              className="flex items-center gap-3"
                            >
                              <div
                                className="w-3 h-3 rounded-full shrink-0"
                                style={{
                                  background: PIE_COLORS[i % PIE_COLORS.length],
                                }}
                              />
                              <span className="text-white/70 text-sm capitalize flex-1">
                                {t.name}
                              </span>
                              <span className="text-white/40 text-xs">
                                {t.value} mentions
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

// ─── AdminPanel (orchestrator) ────────────────────────────────────────────────
export default function AdminPanel() {
  const { actor: _actor, isFetching } = useActor();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actor = _actor as any;

  const [authState, setAuthState] = useState<AuthState>("loading");
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [chatbotLogs, setChatbotLogs] = useState<ChatbotLog[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<
    ContactFormEntry[]
  >([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  // On mount + actor ready: check setup and token validity
  useEffect(() => {
    if (!actor || isFetching) return;

    async function init() {
      if (!actor) return;
      try {
        const stored = sessionStorage.getItem(SESSION_KEY);
        if (!stored) {
          setAuthState("login");
          return;
        }
        // Accept any non-empty token returned by the backend
        const valid = stored.length > 0;
        if (valid) {
          setSessionToken(stored);
          setAuthState("dashboard");
        } else {
          sessionStorage.removeItem(SESSION_KEY);
          setAuthState("login");
        }
      } catch {
        setAuthState("login");
      }
    }

    void init();
  }, [actor, isFetching]);

  const loadData = useCallback(
    async (token: string) => {
      if (!actor) return;
      setIsLoadingData(true);
      try {
        const [logs, contacts] = await Promise.all([
          actor.getChatbotLogsWithToken(token),
          actor.getContactSubmissionsWithToken(token),
        ]);
        setChatbotLogs(logs);
        setContactSubmissions(contacts);
      } catch (err) {
        console.error("loadData error:", err);
      } finally {
        setIsLoadingData(false);
      }
    },
    [actor],
  );

  // Load data when entering dashboard
  useEffect(() => {
    if (authState === "dashboard" && sessionToken) {
      void loadData(sessionToken);
    }
  }, [authState, sessionToken, loadData]);

  async function handleLogin(
    email: string,
    password: string,
  ): Promise<string | null> {
    if (!actor) return null;
    try {
      const result = await actor.loginAdmin(email, password);
      // result is ?Text (Motoko optional), so it's [] | [string] in JS
      const token = Array.isArray(result) ? result[0] : result;
      if (token) {
        sessionStorage.setItem(SESSION_KEY, token);
        setSessionToken(token);
        setAuthState("dashboard");
        return token;
      }
      return null;
    } catch {
      return null;
    }
  }

  async function handleSetup(
    email: string,
    password: string,
  ): Promise<boolean> {
    if (!actor) return false;
    try {
      const ok = await actor.setupAdminCredentials(email, password);
      if (ok) {
        // Brief delay to show success, then switch to login
        setTimeout(() => setAuthState("login"), 1800);
      }
      return ok;
    } catch {
      return false;
    }
  }

  async function handleLogout() {
    if (actor && sessionToken) {
      try {
        await actor.logoutAdmin(sessionToken);
      } catch {
        // silent
      }
    }
    sessionStorage.removeItem(SESSION_KEY);
    setSessionToken(null);
    setChatbotLogs([]);
    setContactSubmissions([]);
    setAuthState("login");
  }

  // Loading state
  if (authState === "loading" || isFetching) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#0a0f1e" }}
        data-ocid="admin.loading_state"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center">
            <Shield className="w-6 h-6 text-green-400 animate-pulse" />
          </div>
          <p className="text-white/50 text-sm">Checking admin access...</p>
        </div>
      </div>
    );
  }

  if (authState === "setup") {
    return <SetupScreen onSetup={handleSetup} />;
  }

  if (authState === "login") {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <Dashboard
      chatbotLogs={chatbotLogs}
      contactSubmissions={contactSubmissions}
      isLoading={isLoadingData}
      onRefresh={() => sessionToken && loadData(sessionToken)}
      onLogout={handleLogout}
    />
  );
}
