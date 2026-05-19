import { useState } from "react";
import { Link } from "react-router";
import {
  Sparkles,
  StickyNote,
  CheckCircle2,
  FolderKanban,
  Timer,
  ArrowRight,
  Brain,
  Zap,
  Mail,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const features = [
  {
    icon: StickyNote,
    title: "Smart Notes",
    description:
      "Write freely and let AI generate summaries and auto-apply tags so you can find anything instantly.",
    color: "bg-violet-500/15 text-violet-600",
    border: "border-violet-500/20",
  },
  {
    icon: CheckCircle2,
    title: "Task Tracking",
    description:
      "Create tasks, set priorities and due dates, and move through your backlog with confidence.",
    color: "bg-blue-500/15 text-blue-600",
    border: "border-blue-500/20",
  },
  {
    icon: FolderKanban,
    title: "Projects",
    description:
      "Group tasks into projects, track progress, and collaborate with your team — all in one place.",
    color: "bg-emerald-500/15 text-emerald-600",
    border: "border-emerald-500/20",
  },
  {
    icon: Timer,
    title: "Focus Timer",
    description:
      "Built-in Pomodoro timer with streak tracking to keep you in deep work mode every day.",
    color: "bg-amber-500/15 text-amber-600",
    border: "border-amber-500/20",
  },
];

const steps = [
  {
    step: "01",
    icon: StickyNote,
    title: "Capture",
    description:
      "Dump your thoughts as notes. PlanMe's AI instantly summarises and tags them for you.",
  },
  {
    step: "02",
    icon: FolderKanban,
    title: "Organise",
    description:
      "Turn notes into tasks, group them into projects, and prioritise what matters most.",
  },
  {
    step: "03",
    icon: Brain,
    title: "Focus",
    description:
      "Use the built-in Pomodoro timer to enter deep work and keep your daily streak alive.",
  },
];

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-[Geist_Variable,sans-serif]">
      {/* ── Navbar ─────────────────────────────────────────────────── */}
      <header className="w-full sticky top-0 z-50 py-4 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="glass-card h-16 flex items-center justify-between pl-4 pr-2 sm:pl-6 sm:pr-4">
            {/* Brand */}
            <a
              href="#"
              className="flex items-center gap-2.5 group no-underline"
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
                <Sparkles className="w-5 h-5" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-base font-semibold tracking-tight">
                  PlanMe
                </span>
                <span className="hidden sm:inline text-[11px] text-muted-foreground -mt-0.5">
                  Note AI
                </span>
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium no-underline text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/signup">
                  Get started <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-secondary/60 transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="mt-2 glass-card px-4 py-4 flex flex-col gap-2 md:hidden">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-medium no-underline text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="border-t border-border/60 mt-2 pt-2 flex flex-col gap-2">
                <Button variant="ghost" size="sm" asChild className="w-full">
                  <Link to="/login">Log in</Link>
                </Button>
                <Button size="sm" asChild className="w-full">
                  <Link to="/signup">Get started</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="px-4 pt-20 pb-28 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-6">
            <Zap className="w-3 h-3" />
            AI-powered productivity
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
            Your second brain,
            <br />
            <span className="text-muted-foreground">powered by AI</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            PlanMe combines smart notes, task management, project boards, and a
            Pomodoro timer — with AI that keeps everything organised for you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link to="/signup">
                Start for free
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-full sm:w-auto"
            >
              <a href="#features">See what's inside</a>
            </Button>
          </div>
        </div>

        {/* Dashboard preview card */}
        <div className="max-w-5xl mx-auto mt-16">
          <div className="glass-card p-6 sm:p-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {[
                {
                  label: "Notes",
                  value: "24",
                  color: "bg-violet-500/15 text-violet-600",
                },
                {
                  label: "Open tasks",
                  value: "8",
                  color: "bg-blue-500/15 text-blue-600",
                },
                {
                  label: "Projects",
                  value: "3",
                  color: "bg-emerald-500/15 text-emerald-600",
                },
                {
                  label: "Focus today",
                  value: "90m",
                  color: "bg-amber-500/15 text-amber-600",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-border/60 p-4 text-left"
                >
                  <p className={`text-2xl font-bold ${s.color} -ml-1 px-1 rounded-lg w-fit mb-1`}>
                    {s.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
              <div className="h-full w-3/5 bg-primary rounded-full" />
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-left">
              Weekly productivity — 60%
            </p>
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────────── */}
      <section id="features" className="px-4 py-24 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Everything you need to stay on top
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Four tightly integrated tools that work together — no more
              switching between apps.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => (
              <div key={f.title} className="glass-card p-6 flex flex-col gap-4">
                <span
                  className={`flex items-center justify-center w-11 h-11 rounded-xl border ${f.color} ${f.border}`}
                >
                  <f.icon className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-base mb-1.5">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────────────── */}
      <section id="about" className="px-4 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              How it works
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              A simple three-step loop that turns raw thoughts into focused
              output.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div key={s.step} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-border/60 -translate-x-6 z-0" />
                )}
                <div className="glass-card p-6 relative z-10">
                  <span className="text-4xl font-bold text-border/60 block mb-4">
                    {s.step}
                  </span>
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary mb-4">
                    <s.icon className="w-5 h-5" />
                  </span>
                  <h3 className="font-semibold text-base mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ────────────────────────────────────────────────── */}
      <section id="contact" className="px-4 py-24 bg-secondary/30">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Get in touch
            </h2>
            <p className="text-muted-foreground">
              Have a question, idea, or just want to say hello? We'd love to
              hear from you.
            </p>
          </div>
          <div className="glass-card p-8">
            {sent ? (
              <div className="text-center py-8">
                <span className="flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-600 mx-auto mb-4">
                  <CheckCircle2 className="w-7 h-7" />
                </span>
                <h3 className="font-semibold text-lg mb-1">Message sent!</h3>
                <p className="text-sm text-muted-foreground">
                  Thanks for reaching out. We'll get back to you soon.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-6"
                  onClick={() => setSent(false)}
                >
                  Send another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium">Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      className="h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50 focus:ring-offset-2 focus:ring-offset-background transition-shadow placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, email: e.target.value }))
                      }
                      className="h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50 focus:ring-offset-2 focus:ring-offset-background transition-shadow placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium">Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us what's on your mind..."
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/50 focus:ring-offset-2 focus:ring-offset-background transition-shadow resize-none placeholder:text-muted-foreground"
                  />
                </div>
                <Button type="submit" className="self-end">
                  <Mail className="w-4 h-4" />
                  Send message
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="px-4 py-10 border-t border-border/60">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <a href="#" className="flex items-center gap-2 no-underline group">
            <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-primary text-primary-foreground transition-transform group-hover:scale-105">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="font-semibold tracking-tight">PlanMe</span>
          </a>

          {/* Links */}
          <nav className="flex items-center gap-5 flex-wrap justify-center">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground no-underline transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/login"
              className="text-sm text-muted-foreground hover:text-foreground no-underline transition-colors"
            >
              Sign in
            </Link>
          </nav>

          {/* Social */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground no-underline transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground no-underline transition-colors"
            >
              Twitter
            </a>
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-8">
          © {new Date().getFullYear()} PlanMe · Note AI. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
