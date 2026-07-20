import { formatDate } from "@/lib/helper";
import type { Task } from "@/types";
import { CheckCircle2, Loader2, Circle } from "lucide-react";

const priorityStyles: Record<Task["priority"], string> = {
    high: "bg-red-500/10 text-red-600 border-red-500/20",
    medium: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    low: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  };
  
  
  
  const TaskRow = ({ task }: { task: Task }) => {
    const Icon =
      task.status === "done"
        ? CheckCircle2
        : task.status === "in-progress"
          ? Loader2
          : Circle;
    return (
      <div className="flex items-center gap-3 py-2.5 border-b border-border/60 last:border-0">
        <Icon
          className={`w-4 h-4 shrink-0 ${
            task.status === "done"
              ? "text-emerald-600"
              : task.status === "in-progress"
                ? "text-blue-600"
                : "text-muted-foreground"
          }`}
        />
        <p
          className={`flex-1 text-sm truncate ${
            task.status === "done" ? "line-through text-muted-foreground" : ""
          }`}
        >
          {task.title}
        </p>
        <span
          className={`text-[11px] px-2 py-0.5 rounded-full border ${
            priorityStyles[task.priority]
          }`}
        >
          {task.priority}
        </span>
        <span className="hidden sm:inline text-xs text-muted-foreground shrink-0">
          {formatDate(task.dueDate)}
        </span>
      </div>
    );
  };
export default TaskRow;  