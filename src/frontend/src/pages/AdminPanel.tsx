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
  BookOpen,
  Briefcase,
  Clock,
  Download,
  Eye,
  Home,
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
  Trash2,
  TrendingUp,
  User,
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
import type {
  ChatbotLog,
  ContactFormEntry,
  backendInterface,
} from "../backend";
import { useActor } from "../hooks/useActor";

type Tab =
  | "overview"
  | "home"
  | "services"
  | "case-studies"
  | "blog"
  | "about"
  | "contact"
  | "chatbot"
  | "analytics";
type AuthState = "loading" | "setup" | "login" | "dashboard";

const SESSION_KEY = "admin_session_token";
const LOCAL_ADMIN_KEY = "admin_credentials";
const HARDCODED_EMAIL = "amiyadav410@gmail.com";
const HARDCODED_PASS = "RankPro@2026";

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

// ─── Types ────────────────────────────────────────────────────────────────────

interface RawSubmission {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  source?: string;
  service?: string;
  caseStudy?: string;
  domain?: string;
  timestamp?: number;
  date?: string;
  tags?: string[];
  title?: string;
  action?: string;
  page?: string;
}

interface LocalContact {
  name: string;
  email: string;
  phone: string;
  message: string;
  source: string;
  service?: string;
  caseStudy?: string;
  domain?: string;
  tsMs: number;
}

interface BlogView {
  title: string;
  tags: string[];
  tsMs: number;
}

interface PageInteraction {
  action: string;
  page: string;
  tsMs: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function tsToDate(ts: bigint): Date {
  return new Date(Number(ts / 1_000_000n));
}

function formatDate(ts: bigint): string {
  return tsToDate(ts).toLocaleString();
}

function msToDateStr(ms: number): string {
  return new Date(ms).toLocaleString();
}

function msToDateShort(ms: number): string {
  return new Date(ms).toLocaleDateString();
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
    label: "Overview",
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  {
    id: "home",
    label: "Home Page",
    icon: <Home className="w-4 h-4" />,
  },
  {
    id: "services",
    label: "Services Page",
    icon: <Briefcase className="w-4 h-4" />,
  },
  {
    id: "case-studies",
    label: "Case Studies",
    icon: <TrendingUp className="w-4 h-4" />,
  },
  {
    id: "blog",
    label: "Blog Page",
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    id: "about",
    label: "About Page",
    icon: <User className="w-4 h-4" />,
  },
  {
    id: "contact",
    label: "Contact Page",
    icon: <Mail className="w-4 h-4" />,
  },
  {
    id: "chatbot",
    label: "Chatbot Data",
    icon: <MessageSquare className="w-4 h-4" />,
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
      <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
        <div className="w-8 h-8 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center">
          <Shield className="w-4 h-4 text-green-400" />
        </div>
        <span className="text-white font-bold text-sm">RankPro Admin</span>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="ml-auto text-white/40 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            data-ocid={`admin.nav.${item.id}.tab`}
            onClick={() => {
              setActiveTab(item.id);
              onClose?.();
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === item.id
                ? "bg-green-500/20 text-green-400"
                : "text-white/50 hover:text-white hover:bg-white/5"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
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
    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center gap-2 text-green-400 mb-3">{icon}</div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-white/40 text-sm">{label}</div>
      {sub && <p className="text-white/40 text-xs mt-1">{sub}</p>}
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
          Create Admin Account
        </h1>
        <p className="text-white/50 text-sm">
          Set up your admin credentials to access the dashboard.
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
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <Input
              id="setup-email"
              data-ocid="admin.setup.input"
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
          <Label htmlFor="setup-password" className="text-white/70 text-sm">
            Password
          </Label>
          <div className="relative">
            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <Input
              id="setup-password"
              data-ocid="admin.setup.input"
              type="password"
              placeholder="Min. 8 characters"
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
            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
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

// ─── Page Tab Helper ───────────────────────────────────────────────────────────
function PageTabHeader({
  title,
  subtitle,
  count,
  onExport,
  exportLabel = "Export CSV",
  onClearAll,
}: {
  title: string;
  subtitle: string;
  count: number;
  onExport: () => void;
  exportLabel?: string;
  onClearAll?: () => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
      <div>
        <h2 className="text-white text-xl font-bold">{title}</h2>
        <p className="text-white/40 text-sm mt-0.5">{subtitle}</p>
      </div>
      <div className="sm:ml-auto flex items-center gap-3">
        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
          {count} entries
        </Badge>
        {onClearAll && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearAll}
            className="border-red-500/30 text-red-400 hover:text-red-300 hover:bg-red-500/10 text-xs"
          >
            <Trash2 className="w-3.5 h-3.5 mr-1.5" />
            Clear All
          </Button>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={onExport}
          className="border-white/20 text-white/70 hover:text-white hover:bg-white/10 text-xs"
        >
          <Download className="w-3.5 h-3.5 mr-1.5" />
          {exportLabel}
        </Button>
      </div>
    </div>
  );
}

function SearchBar({
  value,
  onChange,
  placeholder,
  ocid,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  ocid: string;
}) {
  return (
    <div className="relative mb-4">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
      <Input
        data-ocid={ocid}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-green-500/50"
      />
    </div>
  );
}

function EmptyState({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex flex-col items-center py-16 text-white/30">
      <div className="w-10 h-10 mb-3 opacity-30">{icon}</div>
      <p>{text}</p>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
function Dashboard({
  chatbotLogs,
  localContacts,
  blogViews,
  pageInteractions,
  isLoading,
  onRefresh,
  onLogout,
  onDeleteContact,
  onDeleteBlogView,
  onDeletePageInteraction,
  onDeleteChatbotLog,
  onClearContacts,
  onClearBlogViews,
  onClearPageInteractions,
  onClearChatbotLogs,
}: {
  chatbotLogs: ChatbotLog[];
  localContacts: LocalContact[];
  blogViews: BlogView[];
  pageInteractions: PageInteraction[];
  isLoading: boolean;
  onRefresh: () => void;
  onLogout: () => void;
  onDeleteContact: (contact: LocalContact) => void;
  onDeleteBlogView: (index: number) => void;
  onDeletePageInteraction: (index: number) => void;
  onDeleteChatbotLog: (logId: bigint) => void;
  onClearContacts: (filter: (c: LocalContact) => boolean) => void;
  onClearBlogViews: () => void;
  onClearPageInteractions: () => void;
  onClearChatbotLogs: () => void;
}) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedContact, setSelectedContact] = useState<LocalContact | null>(
    null,
  );

  // ── Data filters ──
  const homeSubmissions = localContacts.filter(
    (c) =>
      c.source === "Home - Free SEO Audit" || c.source === "Home - Lead Form",
  );

  const serviceSubmissions = localContacts.filter(
    (c) =>
      c.service != null &&
      c.source !== "Home - Free SEO Audit" &&
      c.source !== "Home - Lead Form" &&
      !c.caseStudy,
  );

  const caseStudySubmissions = localContacts.filter((c) => c.caseStudy != null);

  const contactPageSubmissions = localContacts.filter(
    (c) =>
      c.source === "Contact Page" ||
      (!c.source &&
        !c.service &&
        !c.caseStudy &&
        c.source !== "Home - Free SEO Audit" &&
        c.source !== "Home - Lead Form"),
  );

  // ── Search helpers ──
  function filterContacts(list: LocalContact[]) {
    if (!search) return list;
    const q = search.toLowerCase();
    return list.filter(
      (c) =>
        (c.name || "").toLowerCase().includes(q) ||
        (c.email || "").toLowerCase().includes(q) ||
        (c.message || "").toLowerCase().includes(q),
    );
  }

  function filterBlogViews(list: BlogView[]) {
    if (!search) return list;
    const q = search.toLowerCase();
    return list.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }

  const contactsOverTime = groupByDay(
    localContacts.map((c) => ({ timestamp: BigInt(c.tsMs) * 1_000_000n })),
  );
  const chatOverTime = groupByDay(chatbotLogs);
  const topics = extractTopics(chatbotLogs);

  const mostRecentTs = localContacts.length
    ? Math.max(...localContacts.map((c) => c.tsMs))
    : null;

  // ── Recent activity feed (last 20 across all sources) ──
  const allActivity = [
    ...localContacts.map((c) => ({
      label: c.source || c.service || "Contact Form",
      detail: c.name ? `${c.name} (${c.email})` : c.email || "—",
      ts: c.tsMs,
      type: "contact" as const,
    })),
    ...blogViews.map((b) => ({
      label: "Blog View",
      detail: b.title,
      ts: b.tsMs,
      type: "blog" as const,
    })),
    ...pageInteractions.map((p) => ({
      label: `${p.page} Interaction`,
      detail: p.action,
      ts: p.tsMs,
      type: "interaction" as const,
    })),
    ...chatbotLogs.map((l) => ({
      label: "Chatbot",
      detail: l.question,
      ts: Number(l.timestamp / 1_000_000n),
      type: "chat" as const,
    })),
  ]
    .sort((a, b) => b.ts - a.ts)
    .slice(0, 20);

  // ── Export helpers ──
  function exportContacts(list: LocalContact[], filename: string) {
    exportCSV(
      ["#", "Source", "Name", "Email", "Phone", "Message", "Date"],
      list.map((c, i) => [
        String(i + 1),
        c.source || c.service || "",
        c.name || "",
        c.email || "",
        c.phone || "",
        c.message || "",
        msToDateStr(c.tsMs),
      ]),
      filename,
    );
  }

  const activityTypeColors: Record<string, string> = {
    contact: "#22c55e",
    blog: "#38bdf8",
    interaction: "#a78bfa",
    chat: "#fb923c",
  };

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

                {/* Page summary cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 mb-8">
                  {[
                    {
                      label: "Home",
                      count: homeSubmissions.length,
                      icon: <Home className="w-4 h-4" />,
                      color: "#22c55e",
                    },
                    {
                      label: "Services",
                      count: serviceSubmissions.length,
                      icon: <Briefcase className="w-4 h-4" />,
                      color: "#38bdf8",
                    },
                    {
                      label: "Case Studies",
                      count: caseStudySubmissions.length,
                      icon: <TrendingUp className="w-4 h-4" />,
                      color: "#a78bfa",
                    },
                    {
                      label: "Blog Views",
                      count: blogViews.length,
                      icon: <BookOpen className="w-4 h-4" />,
                      color: "#fb923c",
                    },
                    {
                      label: "About CTAs",
                      count: pageInteractions.length,
                      icon: <User className="w-4 h-4" />,
                      color: "#f472b6",
                    },
                    {
                      label: "Contact",
                      count: contactPageSubmissions.length,
                      icon: <Mail className="w-4 h-4" />,
                      color: "#34d399",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-white/10 bg-white/5 p-4 text-center"
                    >
                      <div
                        className="w-8 h-8 rounded-lg mx-auto mb-2 flex items-center justify-center"
                        style={{
                          background: `${item.color}20`,
                          color: item.color,
                        }}
                      >
                        {item.icon}
                      </div>
                      <div className="text-2xl font-bold text-white mb-0.5">
                        {item.count}
                      </div>
                      <div className="text-white/40 text-xs">{item.label}</div>
                    </div>
                  ))}
                </div>

                {/* Additional stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  <StatCard
                    icon={<Mail className="w-5 h-5" />}
                    label="Total Contact Submissions"
                    value={localContacts.length}
                  />
                  <StatCard
                    icon={<MessageSquare className="w-5 h-5" />}
                    label="Total Chatbot Conversations"
                    value={chatbotLogs.length}
                  />
                  <StatCard
                    icon={<Clock className="w-5 h-5" />}
                    label="Most Recent Submission"
                    value={mostRecentTs ? msToDateShort(mostRecentTs) : "—"}
                    sub={mostRecentTs ? msToDateStr(mostRecentTs) : undefined}
                  />
                </div>

                {/* Recent Activity Feed */}
                <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-4 h-4 text-green-400" />
                    <h3 className="text-white font-semibold text-sm">
                      Recent Activity
                    </h3>
                    <Badge className="ml-auto bg-white/5 text-white/40 border-white/10 text-xs">
                      Last 20 events
                    </Badge>
                  </div>
                  {allActivity.length === 0 ? (
                    <div
                      data-ocid="admin.overview.empty_state"
                      className="text-white/30 text-sm text-center py-8"
                    >
                      No activity yet. Submit a form or chat with the bot.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {allActivity.map((item, i) => (
                        <div
                          key={`${item.ts}-${i}`}
                          data-ocid={`admin.overview.item.${i + 1}`}
                          className="flex items-start gap-3 py-2 border-b border-white/5 last:border-0"
                        >
                          <div
                            className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                            style={{
                              background: activityTypeColors[item.type],
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <span
                              className="text-xs font-semibold px-1.5 py-0.5 rounded mr-2"
                              style={{
                                background: `${activityTypeColors[item.type]}20`,
                                color: activityTypeColors[item.type],
                              }}
                            >
                              {item.label}
                            </span>
                            <span className="text-white/60 text-xs truncate">
                              {item.detail}
                            </span>
                          </div>
                          <span className="text-white/30 text-xs whitespace-nowrap shrink-0">
                            {msToDateShort(item.ts)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* ── Home Page ── */}
            {activeTab === "home" && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                data-ocid="admin.home.section"
              >
                <PageTabHeader
                  title="Home Page Submissions"
                  subtitle="Free SEO Audit requests and Lead Form submissions from the homepage"
                  count={filterContacts(homeSubmissions).length}
                  onExport={() =>
                    exportContacts(homeSubmissions, "home-submissions.csv")
                  }
                  onClearAll={() =>
                    onClearContacts(
                      (c) =>
                        c.source === "Home - Free SEO Audit" ||
                        c.source === "Home - Lead Form",
                    )
                  }
                />
                <SearchBar
                  value={search}
                  onChange={setSearch}
                  placeholder="Search by name, email or message..."
                  ocid="admin.home.search_input"
                />

                {/* Free Audit sub-section */}
                <div className="mb-6">
                  <h3 className="text-green-400 text-sm font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Search className="w-3.5 h-3.5" /> Free SEO Audit Requests
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 ml-1">
                      {
                        filterContacts(
                          homeSubmissions.filter(
                            (c) => c.source === "Home - Free SEO Audit",
                          ),
                        ).length
                      }
                    </Badge>
                  </h3>
                  <PageDataTable
                    data={filterContacts(
                      homeSubmissions.filter(
                        (c) => c.source === "Home - Free SEO Audit",
                      ),
                    )}
                    columns={[
                      { key: "domain", label: "Domain" },
                      { key: "email", label: "Email" },
                      {
                        key: "tsMs",
                        label: "Date",
                        render: (c) => msToDateShort(c.tsMs),
                      },
                    ]}
                    emptyText="No audit requests yet"
                    ocidPrefix="admin.home.audit"
                    onRowClick={(c) => setSelectedContact(c)}
                    onDelete={(c) => onDeleteContact(c)}
                  />
                </div>

                {/* Lead Form sub-section */}
                <div>
                  <h3 className="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Users className="w-3.5 h-3.5" /> Lead Form Submissions
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 ml-1">
                      {
                        filterContacts(
                          homeSubmissions.filter(
                            (c) => c.source === "Home - Lead Form",
                          ),
                        ).length
                      }
                    </Badge>
                  </h3>
                  <PageDataTable
                    data={filterContacts(
                      homeSubmissions.filter(
                        (c) => c.source === "Home - Lead Form",
                      ),
                    )}
                    columns={[
                      { key: "name", label: "Name" },
                      { key: "email", label: "Email" },
                      {
                        key: "domain",
                        label: "Website",
                        render: (c) =>
                          c.domain ||
                          (c as LocalContact & { website?: string }).website ||
                          "—",
                      },
                      { key: "message", label: "Message", truncate: true },
                      {
                        key: "tsMs",
                        label: "Date",
                        render: (c) => msToDateShort(c.tsMs),
                      },
                    ]}
                    emptyText="No lead form submissions yet"
                    ocidPrefix="admin.home.lead"
                    onRowClick={(c) => setSelectedContact(c)}
                    onDelete={(c) => onDeleteContact(c)}
                  />
                </div>
              </motion.div>
            )}

            {/* ── Services Page ── */}
            {activeTab === "services" && (
              <motion.div
                key="services"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                data-ocid="admin.services.section"
              >
                <PageTabHeader
                  title="Services Page Quote Requests"
                  subtitle="Quote form submissions from individual service detail pages"
                  count={filterContacts(serviceSubmissions).length}
                  onExport={() =>
                    exportContacts(serviceSubmissions, "service-quotes.csv")
                  }
                  onClearAll={() =>
                    onClearContacts(
                      (c) =>
                        c.service != null &&
                        c.source !== "Home - Free SEO Audit" &&
                        c.source !== "Home - Lead Form" &&
                        !c.caseStudy,
                    )
                  }
                />
                <SearchBar
                  value={search}
                  onChange={setSearch}
                  placeholder="Search by name, email, service..."
                  ocid="admin.services.search_input"
                />
                <PageDataTable
                  data={filterContacts(serviceSubmissions)}
                  columns={[
                    {
                      key: "service",
                      label: "Service",
                      render: (c) => c.service || "—",
                    },
                    { key: "name", label: "Name" },
                    { key: "email", label: "Email" },
                    {
                      key: "phone",
                      label: "Phone",
                      render: (c) => c.phone || "—",
                    },
                    { key: "message", label: "Message", truncate: true },
                    {
                      key: "tsMs",
                      label: "Date",
                      render: (c) => msToDateShort(c.tsMs),
                    },
                  ]}
                  emptyText="No service quote requests yet"
                  ocidPrefix="admin.services"
                  onRowClick={(c) => setSelectedContact(c)}
                  onDelete={(c) => onDeleteContact(c)}
                />
              </motion.div>
            )}

            {/* ── Case Studies Page ── */}
            {activeTab === "case-studies" && (
              <motion.div
                key="case-studies"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                data-ocid="admin.casestudies.section"
              >
                <PageTabHeader
                  title="Case Studies Quote Requests"
                  subtitle="Quote form submissions from case study detail pages"
                  count={filterContacts(caseStudySubmissions).length}
                  onExport={() =>
                    exportContacts(
                      caseStudySubmissions,
                      "case-study-quotes.csv",
                    )
                  }
                  onClearAll={() => onClearContacts((c) => c.caseStudy != null)}
                />
                <SearchBar
                  value={search}
                  onChange={setSearch}
                  placeholder="Search by name, email, case study..."
                  ocid="admin.casestudies.search_input"
                />
                <PageDataTable
                  data={filterContacts(caseStudySubmissions)}
                  columns={[
                    {
                      key: "caseStudy",
                      label: "Case Study",
                      render: (c) => c.caseStudy || c.service || "—",
                    },
                    { key: "name", label: "Name" },
                    { key: "email", label: "Email" },
                    {
                      key: "phone",
                      label: "Phone",
                      render: (c) => c.phone || "—",
                    },
                    { key: "message", label: "Message", truncate: true },
                    {
                      key: "tsMs",
                      label: "Date",
                      render: (c) => msToDateShort(c.tsMs),
                    },
                  ]}
                  emptyText="No case study quote requests yet"
                  ocidPrefix="admin.casestudies"
                  onRowClick={(c) => setSelectedContact(c)}
                  onDelete={(c) => onDeleteContact(c)}
                />
              </motion.div>
            )}

            {/* ── Blog Page ── */}
            {activeTab === "blog" && (
              <motion.div
                key="blog"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                data-ocid="admin.blog.section"
              >
                <PageTabHeader
                  title="Blog Page Views"
                  subtitle="Articles viewed by users on the blog page"
                  count={filterBlogViews(blogViews).length}
                  onExport={() =>
                    exportCSV(
                      ["#", "Article Title", "Tags", "Date Viewed"],
                      blogViews.map((b, i) => [
                        String(i + 1),
                        b.title,
                        b.tags.join(", "),
                        msToDateStr(b.tsMs),
                      ]),
                      "blog-views.csv",
                    )
                  }
                  onClearAll={onClearBlogViews}
                />
                <SearchBar
                  value={search}
                  onChange={setSearch}
                  placeholder="Search by article title or tags..."
                  ocid="admin.blog.search_input"
                />
                <div
                  data-ocid="admin.blog.table"
                  className="rounded-xl border border-white/10 bg-white/5 overflow-hidden"
                >
                  {filterBlogViews(blogViews).length === 0 ? (
                    <div data-ocid="admin.blog.empty_state">
                      <EmptyState
                        icon={<BookOpen className="w-10 h-10" />}
                        text="No blog article views tracked yet"
                      />
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow className="border-white/10 hover:bg-transparent">
                          <TableHead className="text-white/40 w-10">
                            #
                          </TableHead>
                          <TableHead className="text-white/40">
                            Article Title
                          </TableHead>
                          <TableHead className="text-white/40">Tags</TableHead>
                          <TableHead className="text-white/40 w-32">
                            Date Viewed
                          </TableHead>
                          <TableHead className="text-white/40 w-8" />
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filterBlogViews(blogViews).map((b, i) => (
                          <TableRow
                            key={`${b.tsMs}-${i}`}
                            data-ocid={`admin.blog.row.${i + 1}`}
                            className="border-white/10 hover:bg-white/5"
                          >
                            <TableCell className="text-white/30 text-xs">
                              {i + 1}
                            </TableCell>
                            <TableCell className="text-white text-sm max-w-xs">
                              <p className="line-clamp-2">{b.title}</p>
                            </TableCell>
                            <TableCell className="text-white/60 text-sm">
                              <div className="flex flex-wrap gap-1">
                                {b.tags.slice(0, 2).map((t) => (
                                  <span
                                    key={t}
                                    className="bg-green-500/15 text-green-400 text-xs px-2 py-0.5 rounded-full"
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell className="text-white/40 text-xs whitespace-nowrap">
                              {msToDateShort(b.tsMs)}
                            </TableCell>
                            <TableCell onClick={(e) => e.stopPropagation()}>
                              <button
                                type="button"
                                data-ocid={`admin.blog.delete_button.${i + 1}`}
                                onClick={() =>
                                  onDeleteBlogView(blogViews.indexOf(b))
                                }
                                className="text-white/20 hover:text-red-400 transition-colors p-1 rounded"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </div>
              </motion.div>
            )}

            {/* ── About Page ── */}
            {activeTab === "about" && (
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                data-ocid="admin.about.section"
              >
                <PageTabHeader
                  title="About Page Interactions"
                  subtitle="CTA button clicks and user interactions from the About page"
                  count={pageInteractions.length}
                  onExport={() =>
                    exportCSV(
                      ["#", "Action", "Page", "Date"],
                      pageInteractions.map((p, i) => [
                        String(i + 1),
                        p.action,
                        p.page,
                        msToDateStr(p.tsMs),
                      ]),
                      "about-interactions.csv",
                    )
                  }
                  onClearAll={onClearPageInteractions}
                />
                <div
                  data-ocid="admin.about.table"
                  className="rounded-xl border border-white/10 bg-white/5 overflow-hidden"
                >
                  {pageInteractions.length === 0 ? (
                    <div data-ocid="admin.about.empty_state">
                      <EmptyState
                        icon={<User className="w-10 h-10" />}
                        text="No About page interactions tracked yet"
                      />
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow className="border-white/10 hover:bg-transparent">
                          <TableHead className="text-white/40 w-10">
                            #
                          </TableHead>
                          <TableHead className="text-white/40">
                            Action
                          </TableHead>
                          <TableHead className="text-white/40 w-36">
                            Date
                          </TableHead>
                          <TableHead className="text-white/40 w-8" />
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pageInteractions.map((p, i) => (
                          <TableRow
                            key={`${p.tsMs}-${i}`}
                            data-ocid={`admin.about.row.${i + 1}`}
                            className="border-white/10 hover:bg-white/5"
                          >
                            <TableCell className="text-white/30 text-xs">
                              {i + 1}
                            </TableCell>
                            <TableCell className="text-white text-sm">
                              {p.action}
                            </TableCell>
                            <TableCell className="text-white/40 text-xs whitespace-nowrap">
                              {msToDateShort(p.tsMs)}
                            </TableCell>
                            <TableCell onClick={(e) => e.stopPropagation()}>
                              <button
                                type="button"
                                data-ocid={`admin.about.delete_button.${i + 1}`}
                                onClick={() =>
                                  onDeletePageInteraction(
                                    pageInteractions.indexOf(p),
                                  )
                                }
                                className="text-white/20 hover:text-red-400 transition-colors p-1 rounded"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </div>
              </motion.div>
            )}

            {/* ── Contact Page ── */}
            {activeTab === "contact" && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                data-ocid="admin.contact.section"
              >
                <PageTabHeader
                  title="Contact Page Submissions"
                  subtitle="Form submissions from the main Contact page"
                  count={filterContacts(contactPageSubmissions).length}
                  onExport={() =>
                    exportContacts(
                      contactPageSubmissions,
                      "contact-submissions.csv",
                    )
                  }
                  onClearAll={() =>
                    onClearContacts(
                      (c) =>
                        c.source === "Contact Page" ||
                        (!c.source &&
                          !c.service &&
                          !c.caseStudy &&
                          c.source !== "Home - Free SEO Audit" &&
                          c.source !== "Home - Lead Form"),
                    )
                  }
                />
                <SearchBar
                  value={search}
                  onChange={setSearch}
                  placeholder="Search by name, email or message..."
                  ocid="admin.contact.search_input"
                />
                <PageDataTable
                  data={filterContacts(contactPageSubmissions)}
                  columns={[
                    { key: "name", label: "Name" },
                    { key: "email", label: "Email" },
                    {
                      key: "phone",
                      label: "Phone",
                      render: (c) => c.phone || "—",
                    },
                    { key: "message", label: "Message", truncate: true },
                    {
                      key: "tsMs",
                      label: "Date",
                      render: (c) => msToDateShort(c.tsMs),
                    },
                  ]}
                  emptyText="No contact form submissions yet"
                  ocidPrefix="admin.contact"
                  onRowClick={(c) => setSelectedContact(c)}
                  onDelete={(c) => onDeleteContact(c)}
                />
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
                      {
                        chatbotLogs.filter(
                          (l) =>
                            !search ||
                            l.question
                              .toLowerCase()
                              .includes(search.toLowerCase()) ||
                            l.answer
                              .toLowerCase()
                              .includes(search.toLowerCase()),
                        ).length
                      }{" "}
                      messages
                    </Badge>
                    <Button
                      data-ocid="admin.chatbot.export.button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        exportCSV(
                          ["#", "Question", "Bot Answer", "Date/Time"],
                          chatbotLogs.map((l, i) => [
                            String(i + 1),
                            l.question,
                            l.answer,
                            formatDate(l.timestamp),
                          ]),
                          "chatbot-logs.csv",
                        )
                      }
                      className="border-white/20 text-white/70 hover:text-white hover:bg-white/10 text-xs"
                    >
                      <Download className="w-3.5 h-3.5 mr-1.5" />
                      Export CSV
                    </Button>
                    <Button
                      data-ocid="admin.chatbot.clear_all.button"
                      variant="outline"
                      size="sm"
                      onClick={onClearChatbotLogs}
                      className="border-red-500/30 text-red-400 hover:text-red-300 hover:bg-red-500/10 text-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                      Clear All
                    </Button>
                  </div>
                </div>

                <SearchBar
                  value={search}
                  onChange={setSearch}
                  placeholder="Search questions or answers..."
                  ocid="admin.chatbot.search_input"
                />

                <div
                  data-ocid="admin.chatbot.table"
                  className="rounded-xl border border-white/10 bg-white/5 overflow-hidden"
                >
                  {chatbotLogs.filter(
                    (l) =>
                      !search ||
                      l.question.toLowerCase().includes(search.toLowerCase()) ||
                      l.answer.toLowerCase().includes(search.toLowerCase()),
                  ).length === 0 ? (
                    <div data-ocid="admin.chatbot.empty_state">
                      <EmptyState
                        icon={<MessageSquare className="w-10 h-10" />}
                        text="No chatbot messages found"
                      />
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
                          <TableHead className="text-white/40 w-8" />
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {chatbotLogs
                          .filter(
                            (l) =>
                              !search ||
                              l.question
                                .toLowerCase()
                                .includes(search.toLowerCase()) ||
                              l.answer
                                .toLowerCase()
                                .includes(search.toLowerCase()),
                          )
                          .map((log, i) => (
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
                              <TableCell>
                                <button
                                  type="button"
                                  data-ocid={`admin.chatbot.delete_button.${i + 1}`}
                                  onClick={() => onDeleteChatbotLog(log.id)}
                                  className="text-white/20 hover:text-red-400 transition-colors p-1 rounded"
                                  title="Delete"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  )}
                </div>
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

                  {/* Blog views by article */}
                  <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center gap-2 mb-5">
                      <BookOpen className="w-4 h-4 text-green-400" />
                      <h3 className="text-white font-semibold text-sm">
                        Blog Article View Counts
                      </h3>
                    </div>
                    {blogViews.length === 0 ? (
                      <div className="flex items-center justify-center h-48 text-white/30 text-sm">
                        No blog views yet
                      </div>
                    ) : (
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart
                          data={Object.entries(
                            blogViews.reduce<Record<string, number>>(
                              (acc, b) => {
                                const key = `${b.title.slice(0, 30)}...`;
                                acc[key] = (acc[key] ?? 0) + 1;
                                return acc;
                              },
                              {},
                            ),
                          ).map(([name, count]) => ({ name, count }))}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="rgba(255,255,255,0.05)"
                          />
                          <XAxis
                            dataKey="name"
                            tick={{
                              fill: "rgba(255,255,255,0.4)",
                              fontSize: 9,
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
                            fill="#38bdf8"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                  </div>

                  {/* Pie chart: top chatbot topics */}
                  <div className="rounded-xl border border-white/10 bg-white/5 p-5">
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
                              <span className="text-white/70 text-sm capitalize">
                                {t.name}
                              </span>
                              <span className="ml-auto text-white/40 text-sm">
                                {t.value}x
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
              Submission Details
            </DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-3">
                {selectedContact.name && (
                  <div className="rounded-lg bg-white/5 p-3">
                    <p className="text-white/40 text-xs mb-1">Name</p>
                    <p className="text-white text-sm font-medium">
                      {selectedContact.name}
                    </p>
                  </div>
                )}
                <div className="rounded-lg bg-white/5 p-3">
                  <p className="text-white/40 text-xs mb-1">Email</p>
                  <p className="text-white text-sm break-all">
                    {selectedContact.email}
                  </p>
                </div>
                {selectedContact.phone && (
                  <div className="rounded-lg bg-white/5 p-3">
                    <p className="text-white/40 text-xs mb-1">Phone</p>
                    <p className="text-white text-sm">
                      {selectedContact.phone}
                    </p>
                  </div>
                )}
                <div className="rounded-lg bg-white/5 p-3">
                  <p className="text-white/40 text-xs mb-1">Submitted</p>
                  <p className="text-white text-sm">
                    {msToDateStr(selectedContact.tsMs)}
                  </p>
                </div>
                {selectedContact.source && (
                  <div className="rounded-lg bg-white/5 p-3 col-span-2">
                    <p className="text-white/40 text-xs mb-1">Source</p>
                    <p className="text-green-400 text-sm font-medium">
                      {selectedContact.source}
                    </p>
                  </div>
                )}
                {selectedContact.service && (
                  <div className="rounded-lg bg-white/5 p-3 col-span-2">
                    <p className="text-white/40 text-xs mb-1">Service</p>
                    <p className="text-blue-400 text-sm font-medium">
                      {selectedContact.service}
                    </p>
                  </div>
                )}
                {selectedContact.domain && (
                  <div className="rounded-lg bg-white/5 p-3 col-span-2">
                    <p className="text-white/40 text-xs mb-1">Domain</p>
                    <p className="text-white text-sm">
                      {selectedContact.domain}
                    </p>
                  </div>
                )}
              </div>
              {selectedContact.message && (
                <div className="rounded-lg bg-white/5 p-3">
                  <p className="text-white/40 text-xs mb-2">Message</p>
                  <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">
                    {selectedContact.message}
                  </p>
                </div>
              )}
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
    </div>
  );
}

// ─── Generic Page Data Table ─────────────────────────────────────────────────
interface ColumnDef {
  key: string;
  label: string;
  truncate?: boolean;
  render?: (row: LocalContact) => string;
}

function PageDataTable({
  data,
  columns,
  emptyText,
  ocidPrefix,
  onRowClick,
  onDelete,
}: {
  data: LocalContact[];
  columns: ColumnDef[];
  emptyText: string;
  ocidPrefix: string;
  onRowClick: (row: LocalContact) => void;
  onDelete?: (row: LocalContact, index: number) => void;
}) {
  return (
    <div
      data-ocid={`${ocidPrefix}.table`}
      className="rounded-xl border border-white/10 bg-white/5 overflow-hidden"
    >
      {data.length === 0 ? (
        <div data-ocid={`${ocidPrefix}.empty_state`}>
          <EmptyState icon={<Mail className="w-10 h-10" />} text={emptyText} />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-white/40 w-10">#</TableHead>
              {columns.map((col) => (
                <TableHead key={col.key} className="text-white/40">
                  {col.label}
                </TableHead>
              ))}
              <TableHead className="text-white/40 w-8" />
              {onDelete && <TableHead className="text-white/40 w-8" />}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, i) => (
              <TableRow
                key={`${row.tsMs}-${i}`}
                data-ocid={`${ocidPrefix}.row.${i + 1}`}
                className="border-white/10 hover:bg-white/5 cursor-pointer"
                onClick={() => onRowClick(row)}
              >
                <TableCell className="text-white/30 text-xs">{i + 1}</TableCell>
                {columns.map((col) => {
                  const val = col.render
                    ? col.render(row)
                    : String(
                        (row as unknown as Record<string, unknown>)[col.key] ??
                          "—",
                      );
                  return (
                    <TableCell
                      key={col.key}
                      className="text-white text-sm max-w-xs"
                    >
                      {col.truncate ? <p className="truncate">{val}</p> : val}
                    </TableCell>
                  );
                })}
                <TableCell>
                  <Eye className="w-3.5 h-3.5 text-white/30" />
                </TableCell>
                {onDelete && (
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      data-ocid={`${ocidPrefix}.delete_button.${i + 1}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(row, i);
                      }}
                      className="text-white/20 hover:text-red-400 transition-colors p-1 rounded"
                      title="Delete entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

// ─── AdminPanel (orchestrator) ────────────────────────────────────────────────
export default function AdminPanel() {
  const { actor: _actor, isFetching } = useActor();
  const actor = _actor as backendInterface | null;

  const [authState, setAuthState] = useState<AuthState>("loading");
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [chatbotLogs, setChatbotLogs] = useState<ChatbotLog[]>([]);
  const [localContacts, setLocalContacts] = useState<LocalContact[]>([]);
  const [blogViews, setBlogViews] = useState<BlogView[]>([]);
  const [pageInteractions, setPageInteractions] = useState<PageInteraction[]>(
    [],
  );
  const [isLoadingData, setIsLoadingData] = useState(false);

  // On mount: check local credentials and session
  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored) {
      setSessionToken(stored);
      setAuthState("dashboard");
    } else {
      const creds = localStorage.getItem(LOCAL_ADMIN_KEY);
      setAuthState(creds ? "login" : "setup");
    }
  }, []);

  const loadData = useCallback(
    async (_token: string) => {
      setIsLoadingData(true);
      try {
        // ── Chatbot logs ──
        const localLogs: ChatbotLog[] = (() => {
          try {
            const raw = localStorage.getItem("rankpro_chatbot_logs");
            if (!raw) return [];
            const parsed = JSON.parse(raw) as Array<{
              id: number;
              question: string;
              answer: string;
              timestamp: number;
            }>;
            return parsed.map((e) => ({
              id: BigInt(e.id),
              question: e.question,
              answer: e.answer,
              timestamp: BigInt(e.timestamp) * 1_000_000n,
            }));
          } catch {
            return [];
          }
        })();

        // ── Contact submissions ──
        const contacts: LocalContact[] = (() => {
          try {
            const raw = localStorage.getItem("rankpro_contact_submissions");
            if (!raw) return [];
            const parsed = JSON.parse(raw) as RawSubmission[];
            return parsed
              .filter((e) => e.email || e.name || e.domain)
              .map((e) => {
                const tsMs = e.timestamp
                  ? e.timestamp
                  : e.date
                    ? new Date(e.date).getTime()
                    : Date.now();
                return {
                  name: e.name || "",
                  email: e.email || "",
                  phone: e.phone || "",
                  message: e.message || "",
                  source: e.source || "",
                  service: e.service,
                  caseStudy: e.caseStudy,
                  domain: e.domain,
                  tsMs,
                };
              });
          } catch {
            return [];
          }
        })();

        // ── Blog views ──
        const bViews: BlogView[] = (() => {
          try {
            const raw = localStorage.getItem("rankpro_blog_views");
            if (!raw) return [];
            const parsed = JSON.parse(raw) as Array<{
              title: string;
              tags: string[];
              timestamp: number;
            }>;
            return parsed.map((e) => ({
              title: e.title || "",
              tags: e.tags || [],
              tsMs: e.timestamp,
            }));
          } catch {
            return [];
          }
        })();

        // ── Page interactions ──
        const interactions: PageInteraction[] = (() => {
          try {
            const raw = localStorage.getItem("rankpro_page_interactions");
            if (!raw) return [];
            const parsed = JSON.parse(raw) as Array<{
              action: string;
              page: string;
              timestamp: number;
            }>;
            return parsed.map((e) => ({
              action: e.action || "",
              page: e.page || "",
              tsMs: e.timestamp,
            }));
          } catch {
            return [];
          }
        })();

        setChatbotLogs(localLogs);
        setLocalContacts(contacts);
        setBlogViews(bViews);
        setPageInteractions(interactions);

        // Secondary: merge backend data if available
        if (actor) {
          try {
            const backendToken =
              sessionStorage.getItem("admin_backend_token") ?? _token;
            const [backendLogs, backendContacts] = await Promise.all([
              actor.getChatbotLogsWithToken(backendToken),
              actor.getContactSubmissionsWithToken(backendToken),
            ]);
            const localLogTimes = new Set(
              localLogs.map((l) => l.timestamp.toString()),
            );
            const mergedLogs = [
              ...localLogs,
              ...backendLogs.filter(
                (l) => !localLogTimes.has(l.timestamp.toString()),
              ),
            ];
            const localContactEmails = new Set(
              contacts.map((c) => `${c.email}-${c.tsMs}`),
            );
            const mergedContacts: LocalContact[] = [
              ...contacts,
              ...backendContacts
                .filter(
                  (c) =>
                    !localContactEmails.has(
                      `${c.email}-${Number(c.timestamp / 1_000_000n)}`,
                    ),
                )
                .map((c) => ({
                  name: c.name,
                  email: c.email,
                  phone: c.phone,
                  message: c.message,
                  source: "Contact Page",
                  tsMs: Number(c.timestamp / 1_000_000n),
                })),
            ];
            setChatbotLogs(mergedLogs);
            setLocalContacts(mergedContacts);
          } catch {
            /* backend unavailable, localStorage data already displayed */
          }
        }
      } catch (err) {
        console.error("loadData error:", err);
      } finally {
        setIsLoadingData(false);
      }
    },
    [actor],
  );

  useEffect(() => {
    if (authState === "dashboard" && sessionToken && !isFetching) {
      void loadData(sessionToken);
    }
  }, [authState, sessionToken, loadData, isFetching]);

  async function handleLogin(
    email: string,
    password: string,
  ): Promise<string | null> {
    const creds = localStorage.getItem(LOCAL_ADMIN_KEY);
    let valid = false;
    if (creds) {
      try {
        // biome-ignore lint: dynamic parse
        const saved = JSON.parse(creds) as { email: string; password: string };
        valid = saved.email === email && saved.password === password;
      } catch {
        /* ignore */
      }
    }
    if (!valid) {
      valid = email === HARDCODED_EMAIL && password === HARDCODED_PASS;
    }
    if (!valid) return null;
    const token = `local-admin-${Date.now()}`;
    sessionStorage.setItem(SESSION_KEY, token);
    setSessionToken(token);
    setAuthState("dashboard");
    return token;
  }

  async function handleSetup(
    email: string,
    password: string,
  ): Promise<boolean> {
    localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify({ email, password }));
    setTimeout(() => setAuthState("login"), 1500);
    return true;
  }

  function handleLogout() {
    sessionStorage.removeItem(SESSION_KEY);
    setSessionToken(null);
    setChatbotLogs([]);
    setLocalContacts([]);
    setBlogViews([]);
    setPageInteractions([]);
    setAuthState("login");
  }

  function handleDeleteContact(contact: LocalContact) {
    const updated = localContacts.filter(
      (c) => !(c.email === contact.email && c.tsMs === contact.tsMs),
    );
    const raw = updated.map((c) => ({
      name: c.name,
      email: c.email,
      phone: c.phone,
      message: c.message,
      source: c.source,
      service: c.service,
      caseStudy: c.caseStudy,
      domain: c.domain,
      timestamp: c.tsMs,
    }));
    localStorage.setItem("rankpro_contact_submissions", JSON.stringify(raw));
    setLocalContacts(updated);
  }

  function handleDeleteBlogView(index: number) {
    const updated = blogViews.filter((_, i) => i !== index);
    localStorage.setItem(
      "rankpro_blog_views",
      JSON.stringify(
        updated.map((b) => ({
          title: b.title,
          tags: b.tags,
          timestamp: b.tsMs,
        })),
      ),
    );
    setBlogViews(updated);
  }

  function handleDeletePageInteraction(index: number) {
    const updated = pageInteractions.filter((_, i) => i !== index);
    localStorage.setItem(
      "rankpro_page_interactions",
      JSON.stringify(
        updated.map((p) => ({
          action: p.action,
          page: p.page,
          timestamp: p.tsMs,
        })),
      ),
    );
    setPageInteractions(updated);
  }

  function handleDeleteChatbotLog(logId: bigint) {
    const updated = chatbotLogs.filter((l) => l.id !== logId);
    const raw = updated.map((l) => ({
      id: Number(l.id),
      question: l.question,
      answer: l.answer,
      timestamp: Number(l.timestamp / 1_000_000n),
    }));
    localStorage.setItem("rankpro_chatbot_logs", JSON.stringify(raw));
    setChatbotLogs(updated);
  }

  function handleClearContacts(filter: (c: LocalContact) => boolean) {
    const updated = localContacts.filter((c) => !filter(c));
    const raw = updated.map((c) => ({
      name: c.name,
      email: c.email,
      phone: c.phone,
      message: c.message,
      source: c.source,
      service: c.service,
      caseStudy: c.caseStudy,
      domain: c.domain,
      timestamp: c.tsMs,
    }));
    localStorage.setItem("rankpro_contact_submissions", JSON.stringify(raw));
    setLocalContacts(updated);
  }

  function handleClearBlogViews() {
    localStorage.removeItem("rankpro_blog_views");
    setBlogViews([]);
  }

  function handleClearPageInteractions() {
    localStorage.removeItem("rankpro_page_interactions");
    setPageInteractions([]);
  }

  function handleClearChatbotLogs() {
    localStorage.removeItem("rankpro_chatbot_logs");
    setChatbotLogs([]);
  }

  if (authState === "loading") {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#0a0f1e" }}
      >
        <RefreshCw className="w-6 h-6 text-green-400 animate-spin" />
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
      localContacts={localContacts}
      blogViews={blogViews}
      pageInteractions={pageInteractions}
      isLoading={isLoadingData}
      onRefresh={() => sessionToken && loadData(sessionToken)}
      onLogout={handleLogout}
      onDeleteContact={handleDeleteContact}
      onDeleteBlogView={handleDeleteBlogView}
      onDeletePageInteraction={handleDeletePageInteraction}
      onDeleteChatbotLog={handleDeleteChatbotLog}
      onClearContacts={handleClearContacts}
      onClearBlogViews={handleClearBlogViews}
      onClearPageInteractions={handleClearPageInteractions}
      onClearChatbotLogs={handleClearChatbotLogs}
    />
  );
}
