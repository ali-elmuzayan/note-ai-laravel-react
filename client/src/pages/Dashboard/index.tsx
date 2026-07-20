import { Link } from "react-router";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  FolderKanban,
  Plus,
  StickyNote,
  Timer,
  TrendingUp,
} from "lucide-react";
import GlassCard from "@/components/common/GlassCard";
import { Button } from "@/components/ui/button";
import { demoNotes } from "@/data/demoNotes";
import { demoTasks } from "@/data/demoTasks";
import { demoProjects } from "@/data/demoProjects";
import { demoPomodoro } from "@/data/demoPomodoro";
import { formatDate, greeting } from "@/lib/helper";
import StatCard from "@/components/common/StatCard";
import TaskRow from "@/components/common/TaskRow";
const userName = "Ali";


const Dashboard = () => {


  const openTasks = demoTasks.filter((t) => t.status !== "done");
  const completedTasks = demoTasks.filter((t) => t.status === "done");
  const activeProjects = demoProjects.filter((p) => p.status === "active");
  const recentNotes = [...demoNotes]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )
    .slice(0, 4);
  const upcomingTasks = [...openTasks]
    .sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto py-6 sm:py-8 space-y-6">
      {/* Greeting */}
      <div className="flex-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            {greeting()}, {userName} 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Here's a quick overview of your workspace.
          </p>
        </div>
        <Button size="sm" className="md:h-9 md:px-3 md:text-sm md:gap-1.5">
          <Plus />
          <span>Quick add</span>
        </Button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          to="/notes"
          icon={StickyNote}
          label="Notes"
          value={demoNotes.length}
          hint="Across all tags"
          iconClass="bg-violet-500/15 text-violet-600"
        />
        <StatCard
          to="/tasks"
          icon={CheckCircle2}
          label="Open tasks"
          value={openTasks.length}
          hint={`${completedTasks.length} completed`}
          iconClass="bg-blue-500/15 text-blue-600"
        />
        <StatCard
          to="/projects"
          icon={FolderKanban}
          label="Active projects"
          value={activeProjects.length}
          hint={`${demoProjects.length} total`}
          iconClass="bg-emerald-500/15 text-emerald-600"
        />
        <StatCard
          to="/pomodoro"
          icon={Timer}
          label="Focus today"
          value={`${demoPomodoro.todayMinutes}m`}
          hint={`${demoPomodoro.todaySessions} sessions`}
          iconClass="bg-amber-500/15 text-amber-600"
        />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Upcoming tasks */}
        <GlassCard className="p-5 lg:col-span-2">
          <div className="flex-between mb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <h2 className="font-semibold">Upcoming tasks</h2>
            </div>
            <Link
              to="/tasks"
              className="text-xs text-muted-foreground hover:text-foreground no-underline flex items-center gap-1"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {upcomingTasks.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4">
              You're all caught up. 🎉
            </p>
          ) : (
            <div className="flex flex-col">
              {upcomingTasks.map((task) => (
                <TaskRow key={task.id} task={task} />
              ))}
            </div>
          )}
        </GlassCard>

        {/* Pomodoro widget */}
        <GlassCard className="p-5 flex flex-col gap-4">
          <div className="flex-between">
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4 text-amber-600" />
              <h2 className="font-semibold">Focus timer</h2>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20">
              streak {demoPomodoro.currentStreakDays}d
            </span>
          </div>
          <div className="flex flex-col items-center justify-center py-3">
            <div className="w-28 h-28 rounded-full border-4 border-amber-500/30 flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl font-semibold tabular-nums">25:00</p>
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  ready
                </p>
              </div>
            </div>
          </div>
          <Button asChild size="sm" className="md:h-9 md:text-sm">
            <Link to="/pomodoro">Start session</Link>
          </Button>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="rounded-lg bg-secondary/60 py-2">
              <p className="text-sm font-semibold">
                {demoPomodoro.todaySessions}
              </p>
              <p className="text-[11px] text-muted-foreground">today</p>
            </div>
            <div className="rounded-lg bg-secondary/60 py-2">
              <p className="text-sm font-semibold">
                {demoPomodoro.weekSessions}
              </p>
              <p className="text-[11px] text-muted-foreground">this week</p>
            </div>
          </div>
        </GlassCard>

        {/* Active projects */}
        <GlassCard className="p-5 lg:col-span-2">
          <div className="flex-between mb-3">
            <div className="flex items-center gap-2">
              <FolderKanban className="w-4 h-4 text-emerald-600" />
              <h2 className="font-semibold">Active projects</h2>
            </div>
            <Link
              to="/projects"
              className="text-xs text-muted-foreground hover:text-foreground no-underline flex items-center gap-1"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {activeProjects.map((p) => (
              <div
                key={p.id}
                className="rounded-xl border border-border/60 p-3 hover:bg-secondary/40 transition-colors"
              >
                <div className="flex-between mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`w-2.5 h-2.5 rounded-full shrink-0 ${p.color}`}
                    />
                    <p className="font-medium text-sm truncate">{p.name}</p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {p.membersCount} members
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1 mb-2">
                  {p.description}
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div
                      className={`h-full ${p.color}`}
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-muted-foreground tabular-nums w-9 text-right">
                    {p.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Recent notes */}
        <GlassCard className="p-5">
          <div className="flex-between mb-3">
            <div className="flex items-center gap-2">
              <StickyNote className="w-4 h-4 text-violet-600" />
              <h2 className="font-semibold">Recent notes</h2>
            </div>
            <Link
              to="/notes"
              className="text-xs text-muted-foreground hover:text-foreground no-underline flex items-center gap-1"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="flex flex-col">
            {recentNotes.map((n) => (
              <Link
                key={n.id}
                to="/notes"
                className="py-2.5 border-b border-border/60 last:border-0 no-underline block group"
              >
                <p className="text-sm font-medium truncate group-hover:text-foreground">
                  {n.title}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                  <Clock className="w-3 h-3" />
                  {formatDate(n.updatedAt)}
                </div>
              </Link>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Productivity footer */}
      <GlassCard className="p-5 flex items-center gap-3">
        <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/15 text-blue-600">
          <TrendingUp className="w-5 h-5" />
        </span>
        <div className="flex-1">
          <p className="text-sm font-medium">
            You've completed {completedTasks.length} tasks recently — keep it
            up!
          </p>
          <p className="text-xs text-muted-foreground">
            {demoPomodoro.weekSessions} focus sessions this week ·{" "}
            {demoPomodoro.currentStreakDays}-day streak
          </p>
        </div>
      </GlassCard>
    </div>
  );
};

export default Dashboard;
