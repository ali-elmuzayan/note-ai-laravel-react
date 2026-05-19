import { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Settings2,
  CheckCircle2,
  Flame,
  Coffee,
  Brain,
  Clock,
  TrendingUp,
} from "lucide-react";
import GlassCard from "@/components/common/GlassCard";
import { Button } from "@/components/ui/button";
import { demoPomodoro } from "@/data/demoPomodoro";

type Mode = "focus" | "short-break" | "long-break";
type SessionEntry = {
  id: string;
  type: Mode;
  duration: number;
  completedAt: string;
};
type Settings = {
  focus: number;
  shortBreak: number;
  longBreak: number;
  autoStart: boolean;
  sessionsUntilLong: number;
};

const DEMO_LOG: SessionEntry[] = [
  { id: "1", type: "focus", duration: 25, completedAt: "2026-05-19T09:00:00" },
  {
    id: "2",
    type: "short-break",
    duration: 5,
    completedAt: "2026-05-19T09:30:00",
  },
  { id: "3", type: "focus", duration: 25, completedAt: "2026-05-19T09:35:00" },
  {
    id: "4",
    type: "short-break",
    duration: 5,
    completedAt: "2026-05-19T10:05:00",
  },
  { id: "5", type: "focus", duration: 25, completedAt: "2026-05-19T10:10:00" },
  {
    id: "6",
    type: "short-break",
    duration: 5,
    completedAt: "2026-05-19T10:40:00",
  },
  { id: "7", type: "focus", duration: 25, completedAt: "2026-05-19T10:45:00" },
];

const WEEK_DATA = [
  { day: "Mon", sessions: 4 },
  { day: "Tue", sessions: 5 },
  { day: "Wed", sessions: 3 },
  { day: "Thu", sessions: 6 },
  { day: "Fri", sessions: 4 },
  { day: "Sat", sessions: 2 },
  { day: "Sun", sessions: 0 },
];

const MODE_CONFIG = {
  focus: {
    label: "Focus",
    color: "text-amber-500",
    stroke: "#f59e0b",
    badge: "bg-amber-500/10 text-amber-600 border border-amber-500/20",
  },
  "short-break": {
    label: "Short Break",
    color: "text-emerald-500",
    stroke: "#10b981",
    badge: "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
  },
  "long-break": {
    label: "Long Break",
    color: "text-blue-500",
    stroke: "#3b82f6",
    badge: "bg-blue-500/10 text-blue-600 border border-blue-500/20",
  },
} as const;

const DEFAULT_SETTINGS: Settings = {
  focus: 25,
  shortBreak: 5,
  longBreak: 15,
  autoStart: false,
  sessionsUntilLong: 4,
};

const CIRCUMFERENCE = 2 * Math.PI * 54;
const TODAY = new Date().toLocaleDateString("en", { weekday: "short" });

const fmt = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

const fmtTime = (iso: string) =>
  new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const getDurationMins = (m: Mode, s: Settings) => {
  if (m === "focus") return s.focus;
  if (m === "short-break") return s.shortBreak;
  return s.longBreak;
};

const Pomodoro = () => {
  const [mode, setMode] = useState<Mode>("focus");
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [showSettings, setShowSettings] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(DEFAULT_SETTINGS.focus * 60);
  const [sessionCount, setSessionCount] = useState(demoPomodoro.todaySessions);
  const [log, setLog] = useState<SessionEntry[]>(DEMO_LOG);

  const modeRef = useRef(mode);
  const settingsRef = useRef(settings);
  const timeRef = useRef(DEFAULT_SETTINGS.focus * 60);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      timeRef.current -= 1;
      setTimeLeft(timeRef.current);
      if (timeRef.current <= 0) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        setIsRunning(false);
        const m = modeRef.current;
        const s = settingsRef.current;
        setLog((prev) => [
          {
            id: Date.now().toString(),
            type: m,
            duration: getDurationMins(m, s),
            completedAt: new Date().toISOString(),
          },
          ...prev,
        ]);
        if (m === "focus") setSessionCount((c) => c + 1);
      }
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const totalTime = getDurationMins(mode, settings) * 60;
  const progress = timeLeft / totalTime;
  const dashOffset = CIRCUMFERENCE * (1 - progress);
  const maxWeek = Math.max(...WEEK_DATA.map((d) => d.sessions), 1);

  const handleModeChange = (newMode: Mode) => {
    setIsRunning(false);
    setMode(newMode);
    const t = getDurationMins(newMode, settingsRef.current) * 60;
    timeRef.current = t;
    setTimeLeft(t);
  };

  const handleStartPause = () => {
    if (timeLeft === 0) {
      const t = getDurationMins(mode, settings) * 60;
      timeRef.current = t;
      setTimeLeft(t);
      setIsRunning(true);
    } else {
      setIsRunning((v) => !v);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    const t = getDurationMins(mode, settings) * 60;
    timeRef.current = t;
    setTimeLeft(t);
  };

  const updateSetting = (key: keyof Settings, value: number | boolean) => {
    setIsRunning(false);
    setSettings((s) => ({ ...s, [key]: value }));
    const modeKey =
      mode === "focus"
        ? "focus"
        : mode === "short-break"
          ? "shortBreak"
          : "longBreak";
    if (key === modeKey && typeof value === "number") {
      timeRef.current = value * 60;
      setTimeLeft(value * 60);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-8 space-y-6">
      {/* Header */}
      <div className="flex-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight flex items-center gap-2">
            <Timer className="w-7 h-7 text-amber-500" />
            Focus Timer
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Stay focused, take breaks, build momentum.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20">
            <Flame className="w-3.5 h-3.5" />
            {demoPomodoro.currentStreakDays}-day streak
          </span>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => setShowSettings((v) => !v)}
          >
            <Settings2 className="w-4 h-4" />
            Settings
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Timer + Settings + Chart */}
        <div className="lg:col-span-2 space-y-4">
          {/* Timer Card */}
          <GlassCard className="p-6">
            {/* Mode Tabs */}
            <div className="flex gap-1 bg-secondary/60 rounded-xl p-1 mb-8">
              {(["focus", "short-break", "long-break"] as Mode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => handleModeChange(m)}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                    mode === m
                      ? "bg-white shadow-sm text-foreground dark:bg-card"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {MODE_CONFIG[m].label}
                </button>
              ))}
            </div>

            {/* Circular Progress Ring */}
            <div className="flex flex-col items-center gap-6">
              <div className="relative w-[220px] h-[220px]">
                <svg
                  width="220"
                  height="220"
                  viewBox="0 0 120 120"
                  className="-rotate-90"
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    className="text-secondary"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke={MODE_CONFIG[mode].stroke}
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={dashOffset}
                    style={{ transition: "stroke-dashoffset 0.9s ease" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p
                    className={`text-4xl font-bold tabular-nums ${MODE_CONFIG[mode].color}`}
                  >
                    {fmt(timeLeft)}
                  </p>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                    {isRunning ? "running" : timeLeft === 0 ? "done!" : "ready"}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-10 h-10 rounded-full"
                  onClick={handleReset}
                  title="Reset"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
                <Button
                  size="lg"
                  onClick={handleStartPause}
                  className={`h-12 px-10 rounded-full text-base font-semibold gap-2 ${
                    isRunning ? "bg-red-500 hover:bg-red-600 text-white" : ""
                  }`}
                >
                  {isRunning ? (
                    <>
                      <Pause className="w-5 h-5" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />{" "}
                      {timeLeft === 0 ? "Restart" : "Start"}
                    </>
                  )}
                </Button>
              </div>

              {/* Session dots */}
              <div className="flex items-center gap-2">
                {Array.from({ length: settings.sessionsUntilLong }).map(
                  (_, i) => (
                    <div
                      key={i}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        i < sessionCount % settings.sessionsUntilLong
                          ? "bg-amber-500"
                          : "bg-secondary"
                      }`}
                    />
                  ),
                )}
                <span className="text-xs text-muted-foreground ml-1">
                  {sessionCount % settings.sessionsUntilLong}/
                  {settings.sessionsUntilLong} until long break
                </span>
              </div>
            </div>
          </GlassCard>

          {/* Settings Panel */}
          {showSettings && (
            <GlassCard className="p-5">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Settings2 className="w-4 h-4" />
                Timer Settings
              </h3>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {(
                  [
                    { key: "focus", label: "Focus (min)" },
                    { key: "shortBreak", label: "Short Break" },
                    { key: "longBreak", label: "Long Break" },
                  ] as { key: keyof Settings; label: string }[]
                ).map(({ key, label }) => (
                  <div key={key}>
                    <label className="text-xs text-muted-foreground mb-1.5 block">
                      {label}
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={60}
                      value={settings[key] as number}
                      onChange={(e) =>
                        updateSetting(
                          key,
                          Math.max(1, Math.min(60, Number(e.target.value))),
                        )
                      }
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-center font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
                <div>
                  <p className="text-sm font-medium">Auto-start breaks</p>
                  <p className="text-xs text-muted-foreground">
                    Automatically begin break timers
                  </p>
                </div>
                <button
                  onClick={() =>
                    setSettings((s) => ({ ...s, autoStart: !s.autoStart }))
                  }
                  className={`relative w-11 h-6 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-ring ${
                    settings.autoStart ? "bg-amber-500" : "bg-input"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                      settings.autoStart ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            </GlassCard>
          )}

          {/* Weekly Activity Chart */}
          <GlassCard className="p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-500" />
              Weekly Activity
            </h3>
            <div className="flex items-end gap-1.5 h-16 mb-2">
              {WEEK_DATA.map((d) => {
                const heightPct = d.sessions
                  ? Math.max((d.sessions / maxWeek) * 100, 10)
                  : 2;
                const isToday = d.day === TODAY;
                return (
                  <div
                    key={d.day}
                    className={`flex-1 rounded-t-sm transition-all ${
                      isToday ? "bg-amber-500" : "bg-amber-400/35"
                    }`}
                    style={{ height: `${heightPct}%` }}
                    title={`${d.sessions} sessions`}
                  />
                );
              })}
            </div>
            <div className="flex gap-1.5">
              {WEEK_DATA.map((d) => {
                const isToday = d.day === TODAY;
                return (
                  <div key={d.day} className="flex-1 text-center">
                    <span
                      className={`text-[10px] ${
                        isToday
                          ? "text-amber-500 font-semibold"
                          : "text-muted-foreground"
                      }`}
                    >
                      {d.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>

        {/* Right: Stats + Session Log */}
        <div className="space-y-4">
          {/* Stats */}
          <GlassCard className="p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-500" />
              Today's Progress
            </h3>
            <div>
              {(
                [
                  { label: "Sessions", value: sessionCount },
                  {
                    label: "Focus time",
                    value: `${sessionCount * settings.focus}m`,
                  },
                  {
                    label: "This week",
                    value: `${demoPomodoro.weekSessions} sessions`,
                  },
                  {
                    label: "Streak",
                    value: (
                      <span className="flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-amber-500" />
                        {demoPomodoro.currentStreakDays} days
                      </span>
                    ),
                  },
                ] as { label: string; value: ReactNode }[]
              ).map((item, i, arr) => (
                <div
                  key={item.label}
                  className={`flex justify-between items-center py-2.5 ${
                    i < arr.length - 1 ? "border-b border-border/60" : ""
                  }`}
                >
                  <span className="text-sm text-muted-foreground">
                    {item.label}
                  </span>
                  <span className="font-semibold text-sm">{item.value}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Session Log */}
          <GlassCard className="p-5">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" />
              Session Log
            </h3>
            <div className="flex flex-col gap-1.5 max-h-80 overflow-y-auto pr-0.5">
              {log.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/40"
                >
                  <div className="flex items-center gap-2">
                    {entry.type === "focus" ? (
                      <Brain className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    ) : (
                      <Coffee className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    )}
                    <div>
                      <p className="text-xs font-medium">
                        {MODE_CONFIG[entry.type].label}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {entry.duration}m · {fmtTime(entry.completedAt)}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full ${MODE_CONFIG[entry.type].badge}`}
                  >
                    {entry.type === "focus" ? "focus" : "break"}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
