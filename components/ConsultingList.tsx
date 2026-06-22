import React, { useState } from "react";
import { ConsultingItem } from "../types";
import { useTheme } from "../themes/ThemeContext";
import { ChevronDown, Clock } from "lucide-react";

interface ConsultingListProps {
  items: ConsultingItem[];
}

const ConsultingRow: React.FC<{ item: ConsultingItem }> = ({ item }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const accentColor = theme.colors.primary;
  const accentRgb = theme.colors.primaryRgb;
  const cardBg = theme.isDark ? "glass" : "bg-white";

  return (
    <div
      className={`overflow-hidden ${cardBg}`}
      style={{
        borderRadius: theme.borderRadius.md,
        border: theme.isDark
          ? `1px solid rgba(${accentRgb}, 0.12)`
          : `1px solid ${theme.colors.border}`,
        boxShadow: theme.isDark ? "none" : theme.shadows.card,
        transition: theme.transitions.default,
      }}
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full text-left p-4 flex items-center justify-between gap-3 group"
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-sm font-bold tracking-tight"
              style={{
                fontFamily: theme.fonts.heading,
                color: theme.colors.text,
              }}
            >
              {item.title}
            </span>
            <span
              className="px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider"
              style={{
                borderRadius: theme.borderRadius.sm,
                backgroundColor: `rgba(${accentRgb}, ${theme.isDark ? 0.1 : 0.08})`,
                color: theme.isDark ? accentColor : theme.colors.textSecondary,
                border: `1px solid rgba(${accentRgb}, 0.2)`,
              }}
            >
              {item.role}
            </span>
          </div>
          <div
            className="flex items-center gap-1.5 mt-1 text-[10px]"
            style={{ color: theme.colors.textLight }}
          >
            <Clock className="h-3 w-3" strokeWidth={1.5} />
            <span>{item.duration}</span>
          </div>
        </div>
        <ChevronDown
          className="h-4 w-4 shrink-0 transition-transform duration-300"
          strokeWidth={2}
          style={{
            color: accentColor,
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      <div
        className="transition-all duration-300 ease-in-out overflow-hidden"
        style={{
          maxHeight: expanded ? "320px" : "0px",
          opacity: expanded ? 1 : 0,
        }}
      >
        <div
          className="px-4 pb-4 pt-1"
          style={{
            borderTop: `1px solid rgba(${accentRgb}, 0.1)`,
          }}
        >
          <p
            className="text-xs leading-relaxed mb-3 mt-3"
            style={{ color: theme.colors.textMuted }}
          >
            {item.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {item.techStack.map((tech) => (
              <span
                key={tech}
                className="px-1.5 py-0.5 text-[10px] font-mono"
                style={{
                  borderRadius: theme.borderRadius.sm,
                  backgroundColor: `rgba(${accentRgb}, ${theme.isDark ? 0.08 : 0.06})`,
                  color: theme.isDark ? accentColor : theme.colors.textSecondary,
                  border: `1px solid rgba(${accentRgb}, 0.15)`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ConsultingList: React.FC<ConsultingListProps> = ({ items }) => {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <ConsultingRow key={item.title} item={item} />
      ))}
    </div>
  );
};
