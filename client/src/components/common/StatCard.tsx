import { Link } from "react-router";
import { GlassCard } from "./GlassCard";
import { ArrowRight } from "lucide-react";

const StatCard = ({
    icon: Icon,
    label,
    value,
    hint,
    to,
    iconClass,
  }: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string | number;
    hint?: string;
    to: string;
    iconClass: string;
  }) => (
    <Link to={to} className="no-underline group">
      <GlassCard className="p-5 h-full flex flex-col gap-3 transition-all group-hover:shadow-2xl group-hover:-translate-y-0.5">
        <div className="flex-between">
          <span
            className={`flex items-center justify-center w-10 h-10 rounded-xl ${iconClass}`}
          >
            <Icon className="w-5 h-5" />
          </span>
          <ArrowRight className="w-4 h-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
        </div>
        <div>
          <p className="text-2xl font-semibold tracking-tight">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </GlassCard>
    </Link>
  );

  export default StatCard; 