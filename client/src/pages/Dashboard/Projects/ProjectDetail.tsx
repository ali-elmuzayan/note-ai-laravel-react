import { useState } from "react";
import { useParams, Link } from "react-router";
import {
  ArrowLeft,
  Plus,
  X,
  Trash2,
  Pencil,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  Loader2,
  Circle,
  FolderKanban,
} from "lucide-react";
import GlassCard from "@/components/common/GlassCard";
import { Button } from "@/components/ui/button";
import { demoProjects } from "@/data/demoProjects";
import { demoTasks } from "@/data/demoTasks";
import { formatDate } from "@/lib/helper";
import type { Task, TaskPriority, TaskStatus, ProjectStatus } from "@/types";

// ─── constants ──────────────────────────────────────────────────────────────

const STATUS_ORDER: TaskStatus[] = ["todo", "in-progress", "done"];

const COLUMNS: {
  status: TaskStatus;
  label: string;
  headerCls: string;
  dotCls: string;
}[] = [
  {
    status: "todo",
    label: "To Do",
    headerCls: "bg-secondary/60 text-foreground",
    dotCls: "bg-muted-foreground",
  },
  {
    status: "in-progress",
    label: "In Progress",
    headerCls: "bg-blue-500/10 text-blue-600",
    dotCls: "bg-blue-500",
  },
  {
    status: "done",
    label: "Done",
    headerCls: "bg-emerald-500/10 text-emerald-600",
    dotCls: "bg-emerald-500",
  },
];

const PRIORITY_CONFIG: Record<TaskPriority, { badge: string; border: string }> =
  {
    high: {
      badge: "bg-red-500/10 text-red-600 border-red-500/20",
      border: "border-l-red-500",
    },
    medium: {
      badge: "bg-amber-500/10 text-amber-600 border-amber-500/20",
      border: "border-l-amber-500",
    },
    low: {
      badge: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
      border: "border-l-emerald-500",
    },
  };

const PROJECT_STATUS_CONFIG: Record<
  ProjectStatus,
  { label: string; badge: string }
> = {
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

const INPUT_CLS =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30";

const makeDefaultDueDate = (): string =>
  new Date(Date.now() + 7 * 86_400_000).toISOString().split("T")[0];

let _taskSeq = 200;
const nextTaskId = (): string => `task-new-${++_taskSeq}`;

// ─── TaskCard ────────────────────────────────────────────────────────────────

type TaskCardProps = {
  task: Task;
  canMoveLeft: boolean;
  canMoveRight: boolean;
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onDelete: () => void;
  onEdit: () => void;
};

const TaskCard = ({
  task,
  canMoveLeft,
  canMoveRight,
  onMoveLeft,
  onMoveRight,
  onDelete,
  onEdit,
}: TaskCardProps) => (
  <div
    className={`bg-white dark:bg-card rounded-xl border border-border/60 p-3 shadow-sm flex flex-col gap-2 border-l-2 ${PRIORITY_CONFIG[task.priority].border}`}
  >
    <p
      className={`text-sm font-medium leading-snug ${task.status === "done" ? "line-through text-muted-foreground" : ""}`}
    >
      {task.title}
    </p>

    <div className="flex items-center gap-2">
      <span
        className={`text-[10px] px-1.5 py-0.5 rounded-full border ${PRIORITY_CONFIG[task.priority].badge}`}
      >
        {task.priority}
      </span>
      <span className="flex items-center gap-0.5 text-[11px] text-muted-foreground ml-auto">
        <Clock className="w-3 h-3" />
        {formatDate(task.dueDate)}
      </span>
    </div>

    <div className="flex items-center gap-1 pt-1 border-t border-border/40">
      <Button
        variant="ghost"
        size="icon-xs"
        onClick={onMoveLeft}
        disabled={!canMoveLeft}
        title="Move left"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
      </Button>
      <Button
        variant="ghost"
        size="icon-xs"
        onClick={onMoveRight}
        disabled={!canMoveRight}
        title="Move right"
      >
        <ChevronRight className="w-3.5 h-3.5" />
      </Button>
      <div className="ml-auto flex gap-1">
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={onEdit}
          title="Edit task"
        >
          <Pencil className="w-3.5 h-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={onDelete}
          title="Delete task"
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  </div>
);

// ─── AddTaskForm ─────────────────────────────────────────────────────────────

type AddTaskFormProps = {
  onAdd: (title: string, priority: TaskPriority, dueDate: string) => void;
  onCancel: () => void;
};

const AddTaskForm = ({ onAdd, onCancel }: AddTaskFormProps) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [dueDate, setDueDate] = useState(makeDefaultDueDate);

  return (
    <div className="bg-white dark:bg-card rounded-xl border border-border/60 p-3 shadow-sm space-y-2">
      <input
        autoFocus
        type="text"
        placeholder="Task title…"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onAdd(title, priority, dueDate);
          if (e.key === "Escape") onCancel();
        }}
        className="w-full text-sm bg-transparent border-b border-border/60 pb-1 focus:outline-none focus:border-primary"
      />

      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex gap-1">
          {(["low", "medium", "high"] as TaskPriority[]).map((p) => (
            <button
              key={p}
              onClick={() => setPriority(p)}
              className={`text-[10px] px-1.5 py-0.5 rounded-full border transition-all ${
                priority === p
                  ? PRIORITY_CONFIG[p].badge
                  : "text-muted-foreground border-border/60 hover:border-border"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="ml-auto text-[11px] text-muted-foreground bg-transparent focus:outline-none"
        />
      </div>

      <div className="flex gap-2">
        <Button
          size="xs"
          onClick={() => onAdd(title, priority, dueDate)}
          disabled={!title.trim()}
          className="flex-1"
        >
          Add task
        </Button>
        <Button size="xs" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

// ─── ProjectDetail ───────────────────────────────────────────────────────────

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = demoProjects.find((p) => p.id === id);

  const [tasks, setTasks] = useState<Task[]>(
    demoTasks.filter((t) => t.projectId === id),
  );
  const [addingCol, setAddingCol] = useState<TaskStatus | null>(null);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    priority: "medium" as TaskPriority,
    dueDate: "",
  });

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto py-20 flex flex-col items-center gap-4 text-muted-foreground">
        <FolderKanban className="w-12 h-12 opacity-30" />
        <p className="text-lg font-medium text-foreground">Project not found</p>
        <Link
          to="/dashboard/projects"
          className="text-sm hover:text-foreground no-underline flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" /> Back to projects
        </Link>
      </div>
    );
  }

  // Derived stats
  const total = tasks.length;
  const done = tasks.filter((t) => t.status === "done").length;
  const inProgress = tasks.filter((t) => t.status === "in-progress").length;
  const todo = tasks.filter((t) => t.status === "todo").length;
  const progress =
    total > 0 ? Math.round((done / total) * 100) : project.progress;

  // Handlers
  const moveTask = (taskId: string, dir: "left" | "right") => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const idx = STATUS_ORDER.indexOf(t.status);
        const next = STATUS_ORDER[dir === "right" ? idx + 1 : idx - 1];
        return next ? { ...t, status: next } : t;
      }),
    );
  };

  const addTask = (
    status: TaskStatus,
    title: string,
    priority: TaskPriority,
    dueDate: string,
  ) => {
    if (!title.trim()) return;
    const iso = dueDate
      ? new Date(dueDate).toISOString()
      : `${makeDefaultDueDate()}T00:00:00.000Z`;
    const newTask: Task = {
      id: nextTaskId(),
      title: title.trim(),
      status,
      priority,
      dueDate: iso,
      projectId: id,
    };
    setTasks((prev) => [...prev, newTask]);
    setAddingCol(null);
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const openEdit = (task: Task) => {
    setEditTask(task);
    setEditForm({
      title: task.title,
      priority: task.priority,
      dueDate: task.dueDate.split("T")[0],
    });
  };

  const saveEdit = () => {
    if (!editTask || !editForm.title.trim()) return;
    const iso = editForm.dueDate
      ? new Date(editForm.dueDate).toISOString()
      : editTask.dueDate;
    setTasks((prev) =>
      prev.map((t) =>
        t.id === editTask.id ? { ...t, ...editForm, dueDate: iso } : t,
      ),
    );
    setEditTask(null);
  };

  return (
    <div className="max-w-6xl mx-auto py-6 sm:py-8 space-y-6">
      {/* Back */}
      <Link
        to="/dashboard/projects"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground no-underline transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to projects
      </Link>

      {/* Project header */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className={`w-4 h-4 rounded-full shrink-0 ${project.color}`} />
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          {project.name}
        </h1>
        <span
          className={`text-[11px] px-2.5 py-0.5 rounded-full ${PROJECT_STATUS_CONFIG[project.status].badge}`}
        >
          {PROJECT_STATUS_CONFIG[project.status].label}
        </span>
      </div>

      {/* Info card */}
      <GlassCard className="p-5 space-y-5">
        <p className="text-sm text-muted-foreground">{project.description}</p>

        {/* Progress bar */}
        <div>
          <div className="flex-between text-sm mb-2">
            <span className="font-medium">Overall progress</span>
            <span className="font-semibold tabular-nums">{progress}%</span>
          </div>
          <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${project.color}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            {
              label: "Total tasks",
              value: total,
              Icon: FolderKanban,
              color: "text-foreground",
            },
            {
              label: "To do",
              value: todo,
              Icon: Circle,
              color: "text-muted-foreground",
            },
            {
              label: "In progress",
              value: inProgress,
              Icon: Loader2,
              color: "text-blue-600",
            },
            {
              label: "Done",
              value: done,
              Icon: CheckCircle2,
              color: "text-emerald-600",
            },
          ].map(({ label, value, Icon, color }) => (
            <div
              key={label}
              className="rounded-xl bg-secondary/40 px-4 py-3 flex items-center gap-3"
            >
              <Icon className={`w-5 h-5 shrink-0 ${color}`} />
              <div>
                <p className={`text-xl font-bold ${color}`}>{value}</p>
                <p className="text-[11px] text-muted-foreground">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Kanban board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        {COLUMNS.map((col, colIdx) => {
          const colTasks = tasks.filter((t) => t.status === col.status);
          return (
            <div key={col.status} className="flex flex-col gap-3">
              {/* Column header */}
              <div
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl ${col.headerCls}`}
              >
                <span className={`w-2 h-2 rounded-full ${col.dotCls}`} />
                <span className="text-sm font-semibold">{col.label}</span>
                <span className="ml-auto text-xs font-medium bg-white/50 dark:bg-black/20 px-1.5 py-0.5 rounded-md tabular-nums">
                  {colTasks.length}
                </span>
              </div>

              {/* Cards */}
              <div className="space-y-2">
                {colTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    canMoveLeft={colIdx > 0}
                    canMoveRight={colIdx < COLUMNS.length - 1}
                    onMoveLeft={() => moveTask(task.id, "left")}
                    onMoveRight={() => moveTask(task.id, "right")}
                    onDelete={() => deleteTask(task.id)}
                    onEdit={() => openEdit(task)}
                  />
                ))}

                {/* Add task */}
                {addingCol === col.status ? (
                  <AddTaskForm
                    onAdd={(title, priority, dueDate) =>
                      addTask(col.status, title, priority, dueDate)
                    }
                    onCancel={() => setAddingCol(null)}
                  />
                ) : (
                  <button
                    onClick={() => setAddingCol(col.status)}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add task
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit task modal */}
      {editTask && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={(e) => e.target === e.currentTarget && setEditTask(null)}
        >
          <GlassCard className="w-full max-w-sm p-6 space-y-4">
            <div className="flex-between">
              <h2 className="font-semibold text-lg">Edit Task</h2>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setEditTask(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">
                  Title *
                </label>
                <input
                  autoFocus
                  type="text"
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, title: e.target.value }))
                  }
                  className={INPUT_CLS}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">
                    Priority
                  </label>
                  <select
                    value={editForm.priority}
                    onChange={(e) =>
                      setEditForm((f) => ({
                        ...f,
                        priority: e.target.value as TaskPriority,
                      }))
                    }
                    className={INPUT_CLS}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">
                    Due date
                  </label>
                  <input
                    type="date"
                    value={editForm.dueDate}
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, dueDate: e.target.value }))
                    }
                    className={INPUT_CLS}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setEditTask(null)}>
                Cancel
              </Button>
              <Button onClick={saveEdit} disabled={!editForm.title.trim()}>
                Save changes
              </Button>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
