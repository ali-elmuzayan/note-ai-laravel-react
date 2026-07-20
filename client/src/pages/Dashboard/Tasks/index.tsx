import { useState, useMemo } from "react";
import {
  Plus,
  X,
  Pencil,
  Trash2,
  CheckCircle2,
  Loader2,
  Circle,
  Clock,
  FolderOpen,
} from "lucide-react";
import GlassCard from "@/components/common/GlassCard";
import { Button } from "@/components/ui/button";

// ─── local types (isolated module) ───────────────────────────────────────────

type TaskStatus = "todo" | "in-progress" | "done";
type TaskPriority = "low" | "medium" | "high";

type Group = {
  id: string;
  name: string;
  emoji: string;
};

type Task = {
  id: string;
  groupId: string;
  title: string;
  description?: string;
  startTime?: string;
  endTime?: string;
  status: TaskStatus;
  priority: TaskPriority;
};

// ─── demo data ────────────────────────────────────────────────────────────────

const DEMO_GROUPS: Group[] = [
  { id: "g1", name: "Today", emoji: "📅" },
  { id: "g2", name: "Tomorrow", emoji: "🗓️" },
  { id: "g3", name: "Home", emoji: "🏠" },
  { id: "g4", name: "Shopping", emoji: "🛒" },
];

const DEMO_TASKS: Task[] = [
  // Today
  {
    id: "st1",
    groupId: "g1",
    title: "Morning standup",
    startTime: "09:00",
    endTime: "09:30",
    status: "done",
    priority: "high",
  },
  {
    id: "st2",
    groupId: "g1",
    title: "Review pull requests",
    startTime: "10:00",
    endTime: "11:30",
    status: "in-progress",
    priority: "high",
  },
  {
    id: "st3",
    groupId: "g1",
    title: "Lunch break",
    startTime: "12:30",
    endTime: "13:30",
    status: "todo",
    priority: "low",
  },
  {
    id: "st4",
    groupId: "g1",
    title: "Write project report",
    startTime: "14:00",
    endTime: "16:00",
    status: "todo",
    priority: "medium",
    description: "Q2 status update",
  },
  {
    id: "st5",
    groupId: "g1",
    title: "Send weekly update email",
    startTime: "16:30",
    status: "todo",
    priority: "medium",
  },
  {
    id: "st6",
    groupId: "g1",
    title: "Read tech articles",
    status: "todo",
    priority: "low",
  },
  // Tomorrow
  {
    id: "st7",
    groupId: "g2",
    title: "Gym session",
    startTime: "07:00",
    endTime: "08:00",
    status: "todo",
    priority: "medium",
  },
  {
    id: "st8",
    groupId: "g2",
    title: "Doctor appointment",
    startTime: "10:00",
    endTime: "11:00",
    status: "todo",
    priority: "high",
  },
  {
    id: "st9",
    groupId: "g2",
    title: "Team retrospective",
    startTime: "14:00",
    endTime: "15:00",
    status: "todo",
    priority: "high",
  },
  // Home
  {
    id: "st10",
    groupId: "g3",
    title: "Fix kitchen sink",
    status: "todo",
    priority: "high",
  },
  {
    id: "st11",
    groupId: "g3",
    title: "Vacuum living room",
    status: "todo",
    priority: "low",
  },
  {
    id: "st12",
    groupId: "g3",
    title: "Pay electricity bill",
    status: "in-progress",
    priority: "medium",
  },
  // Shopping
  {
    id: "st13",
    groupId: "g4",
    title: "Milk & eggs",
    status: "todo",
    priority: "medium",
  },
  {
    id: "st14",
    groupId: "g4",
    title: "New running shoes",
    status: "todo",
    priority: "low",
  },
  {
    id: "st15",
    groupId: "g4",
    title: "Birthday gift for dad",
    status: "todo",
    priority: "high",
  },
];

// ─── constants ────────────────────────────────────────────────────────────────

const STATUS_CYCLE: TaskStatus[] = ["todo", "in-progress", "done"];

const PRIORITY_CFG: Record<
  TaskPriority,
  { badge: string; border: string; label: string }
> = {
  high: {
    badge: "bg-red-500/10 text-red-600 border-red-500/20",
    border: "border-l-red-500",
    label: "High",
  },
  medium: {
    badge: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    border: "border-l-amber-500",
    label: "Medium",
  },
  low: {
    badge: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    border: "border-l-emerald-500",
    label: "Low",
  },
};

const INPUT_CLS =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30";

const EMOJIS = [
  "📅",
  "🗓️",
  "🏠",
  "🛒",
  "💼",
  "🏋️",
  "📚",
  "🎯",
  "💡",
  "🚀",
  "✈️",
  "🎵",
  "🍔",
  "💊",
  "🧹",
  "🎮",
  "🌿",
  "🏖️",
  "🎨",
  "📝",
];

let _groupSeq = 10;
const nextGroupId = (): string => `g${++_groupSeq}`;

let _taskSeq = 100;
const nextTaskId = (): string => `st${++_taskSeq}`;

// ─── helpers ──────────────────────────────────────────────────────────────────

const formatTime = (start?: string, end?: string): string => {
  if (!start) return "Anytime";
  return end ? `${start} – ${end}` : start;
};

const sortByTime = (tasks: Task[]): Task[] => {
  const timed = tasks
    .filter((t) => t.startTime)
    .sort((a, b) => (a.startTime! > b.startTime! ? 1 : -1));
  const untimed = tasks.filter((t) => !t.startTime);
  return [...timed, ...untimed];
};

const nextStatus = (s: TaskStatus): TaskStatus =>
  STATUS_CYCLE[(STATUS_CYCLE.indexOf(s) + 1) % STATUS_CYCLE.length];

// ─── StatusIcon ───────────────────────────────────────────────────────────────

const StatusIcon = ({ status }: { status: TaskStatus }) => {
  if (status === "done")
    return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
  if (status === "in-progress")
    return <Loader2 className="w-5 h-5 text-blue-600" />;
  return <Circle className="w-5 h-5 text-muted-foreground" />;
};

// ─── TaskCard ─────────────────────────────────────────────────────────────────

type TaskCardProps = {
  task: Task;
  deleting: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDeleteRequest: () => void;
  onDeleteConfirm: () => void;
  onDeleteCancel: () => void;
};

const TaskCard = ({
  task,
  deleting,
  onToggle,
  onEdit,
  onDeleteRequest,
  onDeleteConfirm,
  onDeleteCancel,
}: TaskCardProps) => {
  if (deleting) {
    return (
      <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/20">
        <p className="flex-1 text-sm text-destructive font-medium truncate">
          Delete &ldquo;{task.title}&rdquo;?
        </p>
        <Button size="sm" variant="destructive" onClick={onDeleteConfirm}>
          Delete
        </Button>
        <Button size="sm" variant="outline" onClick={onDeleteCancel}>
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <div
      className={`flex items-start gap-3 bg-white dark:bg-card rounded-xl border border-border/60 px-4 py-3 shadow-sm border-l-2 ${PRIORITY_CFG[task.priority].border} group`}
    >
      {/* Status toggle */}
      <button
        onClick={onToggle}
        className="mt-0.5 shrink-0 hover:scale-110 transition-transform"
        title="Click to cycle status"
      >
        <StatusIcon status={task.status} />
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium leading-snug ${task.status === "done" ? "line-through text-muted-foreground" : ""}`}
        >
          {task.title}
        </p>
        {task.description && (
          <p className="text-xs text-muted-foreground mt-0.5 truncate">
            {task.description}
          </p>
        )}
        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Clock className="w-3 h-3" />
            {formatTime(task.startTime, task.endTime)}
          </span>
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded-full border ${PRIORITY_CFG[task.priority].badge}`}
          >
            {PRIORITY_CFG[task.priority].label}
          </span>
          {task.status !== "todo" && (
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                task.status === "done"
                  ? "bg-emerald-500/10 text-emerald-600"
                  : "bg-blue-500/10 text-blue-600"
              }`}
            >
              {task.status === "done" ? "Done" : "In Progress"}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5">
        <Button variant="ghost" size="icon-xs" onClick={onEdit} title="Edit">
          <Pencil className="w-3.5 h-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={onDeleteRequest}
          title="Delete"
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
};

// ─── Tasks page ───────────────────────────────────────────────────────────────

type FormData = Omit<Task, "id" | "groupId">;

const BLANK_FORM: FormData = {
  title: "",
  description: "",
  startTime: "",
  endTime: "",
  status: "todo",
  priority: "medium",
};

const Tasks = () => {
  const [groups, setGroups] = useState<Group[]>(DEMO_GROUPS);
  const [tasks, setTasks] = useState<Task[]>(DEMO_TASKS);
  const [activeGroupId, setActiveGroupId] = useState(DEMO_GROUPS[0].id);

  const [formOpen, setFormOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [form, setForm] = useState<FormData>(BLANK_FORM);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [addingGroup, setAddingGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupEmoji, setNewGroupEmoji] = useState("📅");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const activeGroup = groups.find((g) => g.id === activeGroupId);

  const groupCounts = useMemo(
    () =>
      Object.fromEntries(
        groups.map((g) => [
          g.id,
          tasks.filter((t) => t.groupId === g.id).length,
        ]),
      ),
    [groups, tasks],
  );

  const activeTasks = useMemo(
    () => sortByTime(tasks.filter((t) => t.groupId === activeGroupId)),
    [tasks, activeGroupId],
  );

  const doneCount = activeTasks.filter((t) => t.status === "done").length;
  const progress =
    activeTasks.length > 0
      ? Math.round((doneCount / activeTasks.length) * 100)
      : 0;

  // ── group actions ──

  const addGroup = () => {
    if (!newGroupName.trim()) return;
    const g: Group = {
      id: nextGroupId(),
      name: newGroupName.trim(),
      emoji: newGroupEmoji,
    };
    setGroups((prev) => [...prev, g]);
    setActiveGroupId(g.id);
    setNewGroupName("");
    setNewGroupEmoji("📅");
    setAddingGroup(false);
    setShowEmojiPicker(false);
  };

  const deleteGroup = (groupId: string) => {
    const remaining = groups.filter((g) => g.id !== groupId);
    if (remaining.length === 0) return;
    setGroups(remaining);
    setTasks((prev) => prev.filter((t) => t.groupId !== groupId));
    if (activeGroupId === groupId) setActiveGroupId(remaining[0].id);
  };

  // ── task actions ──

  const toggleStatus = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status: nextStatus(t.status) } : t,
      ),
    );
  };

  const openCreate = () => {
    setEditTask(null);
    setForm(BLANK_FORM);
    setFormOpen(true);
  };

  const openEdit = (task: Task) => {
    setEditTask(task);
    setForm({
      title: task.title,
      description: task.description ?? "",
      startTime: task.startTime ?? "",
      endTime: task.endTime ?? "",
      status: task.status,
      priority: task.priority,
    });
    setFormOpen(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) return;
    const data: Omit<Task, "id" | "groupId"> = {
      title: form.title.trim(),
      description: form.description?.trim() || undefined,
      startTime: form.startTime || undefined,
      endTime: form.endTime || undefined,
      status: form.status,
      priority: form.priority,
    };
    if (editTask) {
      setTasks((prev) =>
        prev.map((t) => (t.id === editTask.id ? { ...t, ...data } : t)),
      );
    } else {
      const newTask: Task = {
        id: nextTaskId(),
        groupId: activeGroupId,
        ...data,
      };
      setTasks((prev) => [...prev, newTask]);
    }
    setFormOpen(false);
  };

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    setDeleteId(null);
  };

  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-8 space-y-6">
      {/* Header */}
      <div className="flex-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            My Tasks
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Organise your day into focused groups.
          </p>
        </div>
        <Button onClick={openCreate} className="gap-1.5">
          <Plus className="w-4 h-4" />
          Add Task
        </Button>
      </div>

      {/* Group tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {groups.map((g) => (
          <div key={g.id} className="relative group/tab">
            <button
              onClick={() => setActiveGroupId(g.id)}
              className={`flex items-center gap-1.5 pl-3 pr-7 py-2 rounded-xl text-sm font-medium transition-all ${
                activeGroupId === g.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <span>{g.emoji}</span>
              <span>{g.name}</span>
              {groupCounts[g.id] > 0 && (
                <span
                  className={`text-[10px] px-1 rounded-sm tabular-nums ${
                    activeGroupId === g.id ? "bg-white/20" : "bg-border"
                  }`}
                >
                  {groupCounts[g.id]}
                </span>
              )}
            </button>
            {groups.length > 1 && (
              <button
                onClick={() => deleteGroup(g.id)}
                title="Delete group"
                className={`absolute right-1.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full opacity-0 group-hover/tab:opacity-60 hover:opacity-100! transition-opacity ${
                  activeGroupId === g.id
                    ? "hover:bg-white/20"
                    : "hover:bg-black/10 dark:hover:bg-white/10"
                }`}
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}

        {/* Add group inline */}
        {addingGroup ? (
          <div className="flex items-center gap-2 bg-secondary/60 rounded-xl px-3 py-1.5 relative">
            <div className="relative">
              <button
                onClick={() => setShowEmojiPicker((p) => !p)}
                className="text-base leading-none hover:scale-110 transition-transform"
                title="Pick emoji"
              >
                {newGroupEmoji}
              </button>
              {showEmojiPicker && (
                <div className="absolute top-8 left-0 z-20 bg-white dark:bg-card border border-border rounded-xl p-2 shadow-lg grid grid-cols-5 gap-1 w-44">
                  {EMOJIS.map((e) => (
                    <button
                      key={e}
                      onClick={() => {
                        setNewGroupEmoji(e);
                        setShowEmojiPicker(false);
                      }}
                      className="text-base hover:bg-secondary rounded-md p-1 leading-none"
                    >
                      {e}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <input
              autoFocus
              type="text"
              placeholder="Group name…"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addGroup();
                if (e.key === "Escape") {
                  setAddingGroup(false);
                  setShowEmojiPicker(false);
                }
              }}
              className="bg-transparent text-sm w-28 focus:outline-none"
            />
            <Button
              size="xs"
              onClick={addGroup}
              disabled={!newGroupName.trim()}
            >
              Add
            </Button>
            <Button
              size="xs"
              variant="ghost"
              onClick={() => {
                setAddingGroup(false);
                setShowEmojiPicker(false);
              }}
            >
              <X className="w-3.5 h-3.5" />
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAddingGroup(true)}
            className="gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            New Group
          </Button>
        )}
      </div>

      {/* Active group header */}
      {activeGroup && (
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-2xl leading-none">{activeGroup.emoji}</span>
          <h2 className="font-semibold text-lg">{activeGroup.name}</h2>
          <span className="text-sm text-muted-foreground">
            {doneCount} / {activeTasks.length} done
          </span>
          {activeTasks.length > 0 && (
            <div className="ml-auto flex items-center gap-2">
              <div className="w-32 h-2 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs font-medium text-emerald-600 tabular-nums w-8">
                {progress}%
              </span>
            </div>
          )}
        </div>
      )}

      {/* Task list */}
      <div className="space-y-2">
        {activeTasks.length === 0 ? (
          <GlassCard className="py-16 flex flex-col items-center gap-3 text-muted-foreground">
            <FolderOpen className="w-10 h-10 opacity-30" />
            <p className="text-sm">No tasks here yet.</p>
            <Button
              variant="outline"
              size="sm"
              onClick={openCreate}
              className="gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              Add the first task
            </Button>
          </GlassCard>
        ) : (
          activeTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleting={deleteId === task.id}
              onToggle={() => toggleStatus(task.id)}
              onEdit={() => openEdit(task)}
              onDeleteRequest={() =>
                setDeleteId((prev) => (prev === task.id ? null : task.id))
              }
              onDeleteConfirm={() => handleDelete(task.id)}
              onDeleteCancel={() => setDeleteId(null)}
            />
          ))
        )}

        {/* Quick add row */}
        {activeTasks.length > 0 && (
          <button
            onClick={openCreate}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60 border border-dashed border-border/60 hover:border-border transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add task
          </button>
        )}
      </div>

      {/* Add / Edit modal */}
      {formOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={(e) => e.target === e.currentTarget && setFormOpen(false)}
        >
          <GlassCard className="w-full max-w-md p-6 space-y-4">
            <div className="flex-between">
              <h2 className="font-semibold text-lg">
                {editTask ? "Edit Task" : "New Task"}
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
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">
                  Title *
                </label>
                <input
                  autoFocus
                  type="text"
                  placeholder="What needs to be done?"
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSave();
                  }}
                  className={INPUT_CLS}
                />
              </div>

              <div>
                <label className="text-xs text-muted-foreground mb-1 block">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="Optional note…"
                  value={form.description ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  className={INPUT_CLS}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">
                    Start time
                  </label>
                  <input
                    type="time"
                    value={form.startTime ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, startTime: e.target.value }))
                    }
                    className={INPUT_CLS}
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">
                    End time
                  </label>
                  <input
                    type="time"
                    value={form.endTime ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, endTime: e.target.value }))
                    }
                    className={INPUT_CLS}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">
                    Priority
                  </label>
                  <select
                    value={form.priority}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        priority: e.target.value as TaskPriority,
                      }))
                    }
                    className={INPUT_CLS}
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        status: e.target.value as TaskStatus,
                      }))
                    }
                    className={INPUT_CLS}
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-1">
              <Button variant="outline" onClick={() => setFormOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={!form.title.trim()}>
                {editTask ? "Save changes" : "Create task"}
              </Button>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

export default Tasks;
