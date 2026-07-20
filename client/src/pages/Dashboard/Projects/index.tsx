import { useState } from "react";
import { Link } from "react-router";
import {
  FolderKanban,
  Plus,
  Search,
  X,
  Pencil,
  Trash2,
  Users,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Circle,
  Loader2,
} from "lucide-react";
import GlassCard from "@/components/common/GlassCard";
import { Button } from "@/components/ui/button";
import { demoProjects } from "@/data/demoProjects";
import { demoTasks } from "@/data/demoTasks";
import type { Project, ProjectStatus, Task, TaskStatus } from "@/types";

type FilterStatus = "all" | ProjectStatus;
type FormData = Omit<Project, "id">;

const STATUS_CONFIG: Record<ProjectStatus, { label: string; badge: string }> = {
  active: {
    label: "Active",
    badge: "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
  },
  "on-hold": {
    label: "On Hold",
    badge: "bg-amber-500/10 text-amber-600 border border-amber-500/20",
  },
  completed: {
    label: "Completed",
    badge: "bg-blue-500/10 text-blue-600 border border-blue-500/20",
  },
};

const COLOR_OPTIONS = [
  "bg-blue-500",
  "bg-violet-500",
  "bg-amber-500",
  "bg-emerald-500",
  "bg-red-500",
  "bg-pink-500",
  "bg-cyan-500",
  "bg-orange-500",
];

const FILTER_TABS: { value: FilterStatus; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "on-hold", label: "On Hold" },
  { value: "completed", label: "Completed" },
];

const PRIORITY_BADGE: Record<Task["priority"], string> = {
  high: "bg-red-500/10 text-red-600 border-red-500/20",
  medium: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  low: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
};

const BLANK_FORM: FormData = {
  name: "",
  description: "",
  status: "active",
  progress: 0,
  membersCount: 1,
  color: "bg-blue-500",
};

const INPUT_CLS =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30";

const StatusIcon = ({ status }: { status: TaskStatus }) => {
  if (status === "done")
    return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />;
  if (status === "in-progress")
    return <Loader2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />;
  return <Circle className="w-3.5 h-3.5 text-muted-foreground shrink-0" />;
};

type CardProps = {
  project: Project;
  tasks: Task[];
  expanded: boolean;
  onExpand: () => void;
  onEdit: () => void;
  onDelete: () => void;
  deleteConfirming: boolean;
  onDeleteConfirm: () => void;
  onDeleteCancel: () => void;
  onToggleTask: (id: string) => void;
};

const ProjectCard = ({
  project,
  tasks,
  expanded,
  onExpand,
  onEdit,
  onDelete,
  deleteConfirming,
  onDeleteConfirm,
  onDeleteCancel,
  onToggleTask,
}: CardProps) => {
  const done = tasks.filter((t) => t.status === "done").length;

  return (
    <GlassCard className="p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex-between">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`w-3 h-3 rounded-full shrink-0 ${project.color}`} />
          <Link
            to={`/dashboard/projects/${project.id}`}
            className="font-semibold text-sm truncate hover:underline"
          >
            {project.name}
          </Link>
        </div>
        <span
          className={`text-[11px] px-2 py-0.5 rounded-full shrink-0 ${STATUS_CONFIG[project.status].badge}`}
        >
          {STATUS_CONFIG[project.status].label}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground line-clamp-2 -mt-1">
        {project.description}
      </p>

      {/* Progress */}
      <div>
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium tabular-nums">{project.progress}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${project.color}`}
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Users className="w-3.5 h-3.5" />
          {project.membersCount} member{project.membersCount !== 1 ? "s" : ""}
        </span>
        {tasks.length > 0 && (
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {done}/{tasks.length} tasks done
          </span>
        )}
      </div>

      {/* Actions */}
      {deleteConfirming ? (
        <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-3 flex items-center gap-2">
          <p className="flex-1 text-sm text-destructive font-medium">
            Delete &ldquo;{project.name}&rdquo;?
          </p>
          <Button size="sm" variant="destructive" onClick={onDeleteConfirm}>
            Delete
          </Button>
          <Button size="sm" variant="outline" onClick={onDeleteCancel}>
            Cancel
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-1"
            onClick={onExpand}
          >
            {expanded ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
            Tasks{tasks.length > 0 ? ` (${tasks.length})` : ""}
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            onClick={onEdit}
            title="Edit project"
          >
            <Pencil className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="destructive"
            size="icon-sm"
            onClick={onDelete}
            title="Delete project"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      )}

      {/* Expanded tasks */}
      {expanded && (
        <div className="border-t border-border/60 pt-3">
          <p className="text-xs font-medium text-muted-foreground mb-2">
            Tasks
          </p>
          {tasks.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">
              No tasks linked to this project.
            </p>
          ) : (
            <div className="space-y-1">
              {tasks.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-secondary/40 transition-colors cursor-pointer"
                  onClick={() => onToggleTask(t.id)}
                >
                  <StatusIcon status={t.status} />
                  <span
                    className={`flex-1 text-xs truncate ${t.status === "done" ? "line-through text-muted-foreground" : ""}`}
                  >
                    {t.title}
                  </span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full border ${PRIORITY_BADGE[t.priority]}`}
                  >
                    {t.priority}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </GlassCard>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>(demoProjects);
  const [tasks, setTasks] = useState<Task[]>(demoTasks);
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(BLANK_FORM);

  const visible = projects.filter((p) => {
    const matchStatus = filter === "all" || p.status === filter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const counts = {
    active: projects.filter((p) => p.status === "active").length,
    "on-hold": projects.filter((p) => p.status === "on-hold").length,
    completed: projects.filter((p) => p.status === "completed").length,
  };

  const openCreate = () => {
    setEditProject(null);
    setForm(BLANK_FORM);
    setFormOpen(true);
  };

  const openEdit = (p: Project) => {
    setEditProject(p);
    setForm({
      name: p.name,
      description: p.description,
      status: p.status,
      progress: p.progress,
      membersCount: p.membersCount,
      color: p.color,
    });
    setFormOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editProject) {
      setProjects((prev) =>
        prev.map((p) => (p.id === editProject.id ? { ...p, ...form } : p)),
      );
    } else {
      setProjects((prev) => [...prev, { id: `p${Date.now()}`, ...form }]);
    }
    setFormOpen(false);
  };

  const handleDelete = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setDeleteId(null);
    if (expandedId === id) setExpandedId(null);
  };

  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: (t.status === "done" ? "todo" : "done") as TaskStatus,
            }
          : t,
      ),
    );
  };

  return (
    <div className="max-w-5xl mx-auto py-6 sm:py-8 space-y-6">
      {/* Header */}
      <div className="flex-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight flex items-center gap-2">
            <FolderKanban className="w-7 h-7 text-emerald-500" />
            Projects
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track your projects and their progress.
          </p>
        </div>
        <Button onClick={openCreate} className="gap-1.5">
          <Plus className="w-4 h-4" />
          New Project
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(
          [
            {
              label: "Total",
              value: projects.length,
              color: "text-foreground",
            },
            {
              label: "Active",
              value: counts.active,
              color: "text-emerald-600",
            },
            {
              label: "On Hold",
              value: counts["on-hold"],
              color: "text-amber-600",
            },
            {
              label: "Completed",
              value: counts.completed,
              color: "text-blue-600",
            },
          ] as { label: string; value: number; color: string }[]
        ).map((s) => (
          <GlassCard key={s.label} className="p-4">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </GlassCard>
        ))}
      </div>

      {/* Filters + Search */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-1 bg-secondary/60 rounded-xl p-1">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`py-1.5 px-3 rounded-lg text-sm font-medium transition-all ${
                filter === tab.value
                  ? "bg-white shadow-sm text-foreground dark:bg-card"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="relative ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search projects…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 rounded-xl border border-border bg-background pl-9 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 w-52"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {visible.map((p) => (
          <ProjectCard
            key={p.id}
            project={p}
            tasks={tasks.filter((t) => t.projectId === p.id)}
            expanded={expandedId === p.id}
            onExpand={() =>
              setExpandedId((prev) => (prev === p.id ? null : p.id))
            }
            onEdit={() => openEdit(p)}
            onDelete={() =>
              setDeleteId((prev) => (prev === p.id ? null : p.id))
            }
            deleteConfirming={deleteId === p.id}
            onDeleteConfirm={() => handleDelete(p.id)}
            onDeleteCancel={() => setDeleteId(null)}
            onToggleTask={handleToggleTask}
          />
        ))}

        {visible.length === 0 && (
          <div className="col-span-full flex flex-col items-center py-16 gap-3 text-muted-foreground">
            <FolderKanban className="w-10 h-10 opacity-30" />
            <p className="text-sm">
              {search
                ? `No projects matching "${search}"`
                : "No projects in this category."}
            </p>
            {!search && (
              <Button size="sm" variant="outline" onClick={openCreate}>
                <Plus className="w-3.5 h-3.5" /> Create one
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {formOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={(e) => e.target === e.currentTarget && setFormOpen(false)}
        >
          <GlassCard className="w-full max-w-md p-6 space-y-4">
            <div className="flex-between">
              <h2 className="font-semibold text-lg">
                {editProject ? "Edit Project" : "New Project"}
              </h2>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setFormOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-3">
              {/* Name */}
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">
                  Project name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. My Awesome Project"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className={INPUT_CLS}
                  autoFocus
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">
                  Description
                </label>
                <textarea
                  placeholder="Brief project description…"
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  className={`${INPUT_CLS} resize-none`}
                  rows={2}
                />
              </div>

              {/* Status + Members */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        status: e.target.value as ProjectStatus,
                      }))
                    }
                    className={INPUT_CLS}
                  >
                    <option value="active">Active</option>
                    <option value="on-hold">On Hold</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">
                    Members
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={99}
                    value={form.membersCount}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        membersCount: Math.max(1, Number(e.target.value)),
                      }))
                    }
                    className={INPUT_CLS}
                  />
                </div>
              </div>

              {/* Progress (edit only) */}
              {editProject && (
                <div>
                  <div className="flex-between mb-2">
                    <label className="text-xs text-muted-foreground">
                      Progress
                    </label>
                    <span className="text-xs font-semibold">
                      {form.progress}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={form.progress}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        progress: Number(e.target.value),
                      }))
                    }
                    className="w-full accent-emerald-500"
                  />
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden mt-2">
                    <div
                      className={`h-full rounded-full transition-all ${form.color}`}
                      style={{ width: `${form.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Color */}
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">
                  Color
                </label>
                <div className="flex gap-2 flex-wrap">
                  {COLOR_OPTIONS.map((c) => (
                    <button
                      key={c}
                      onClick={() => setForm((f) => ({ ...f, color: c }))}
                      className={`w-7 h-7 rounded-full transition-all ${c} ${
                        form.color === c
                          ? "ring-2 ring-offset-2 ring-foreground scale-110"
                          : "hover:scale-110 opacity-70 hover:opacity-100"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-1">
              <Button variant="outline" onClick={() => setFormOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={!form.name.trim()}>
                {editProject ? "Save changes" : "Create project"}
              </Button>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

export default Projects;
