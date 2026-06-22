import React from "react";
import { ProjectItem } from "../types";
import { useTheme } from "../themes/ThemeContext";
import { ArrowUpRight, Github } from "lucide-react";

interface ProjectGridProps {
  projects: ProjectItem[];
  /** Number of columns on md+ screens. Defaults to 2. */
  columns?: 1 | 2;
  /** Accent: 'cyan' (primary) or 'pink' (secondary). Defaults to 'cyan'. */
  accent?: "cyan" | "pink";
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  columns = 2,
  accent = "cyan",
}) => {
  const theme = useTheme();
  const isPrimary = accent === "cyan";
  const accentColor = isPrimary ? theme.colors.primary : theme.colors.secondary;
  const accentRgb = isPrimary
    ? theme.colors.primaryRgb
    : theme.colors.secondaryRgb;

  const cardBg = theme.isDark ? "glass" : "bg-white";
  const gridCols = columns === 1 ? "sm:grid-cols-1" : "sm:grid-cols-2";

  return (
    <div className={`grid grid-cols-1 ${gridCols} gap-4`}>
      {projects.map((project) => (
        <a
          key={project.title}
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`group relative flex flex-col overflow-hidden transform hover:-translate-y-0.5 ${cardBg}`}
          style={{
            borderRadius: theme.borderRadius.lg,
            border: theme.isDark
              ? `1px solid rgba(${accentRgb}, 0.12)`
              : "none",
            boxShadow: theme.shadows.card,
            transition: theme.transitions.slow,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = theme.shadows.cardHover;
            if (theme.isDark) {
              e.currentTarget.style.borderColor = `rgba(${accentRgb}, 0.5)`;
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = theme.shadows.card;
            if (theme.isDark) {
              e.currentTarget.style.borderColor = `rgba(${accentRgb}, 0.12)`;
            }
          }}
        >
          {/* Thumbnail */}
          {project.image && (
            <div className="relative aspect-video overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                style={{ opacity: theme.isDark ? 0.85 : 1 }}
              />
              {/* Gradient fade into the card body */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: theme.isDark
                    ? "linear-gradient(to top, rgba(10,10,10,0.9), transparent 60%)"
                    : "linear-gradient(to top, rgba(255,255,255,0.15), transparent 70%)",
                }}
              />
              {/* Scanlines (dark only) */}
              {theme.isDark && (
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,20,0)_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] opacity-30 pointer-events-none" />
              )}
            </div>
          )}

          {/* Body */}
          <div className="flex flex-col flex-1 p-4">
            <div className="flex items-start justify-between gap-2">
              <h3
                className="text-base font-bold tracking-tight"
                style={{
                  fontFamily: theme.fonts.heading,
                  color: theme.colors.text,
                }}
              >
                {project.title}
              </h3>
              <div
                className="shrink-0 p-1.5 backdrop-blur-xl"
                style={{
                  borderRadius: theme.borderRadius.full,
                  backgroundColor: theme.isDark
                    ? "rgba(0,0,0,0.25)"
                    : "rgba(255,255,255,0.85)",
                  border: `1px solid rgba(${accentRgb}, 0.15)`,
                  color: theme.isDark ? accentColor : theme.colors.textMuted,
                  transition: theme.transitions.default,
                }}
              >
                {project.isRepo ? (
                  <Github className="h-4 w-4" strokeWidth={2} />
                ) : (
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                )}
              </div>
            </div>

            <p
              className="text-xs leading-relaxed mt-1.5 flex-1"
              style={{ color: theme.colors.textMuted }}
            >
              {project.description}
            </p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {project.techStack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-1.5 py-0.5 text-[10px] font-medium tracking-wide"
                  style={{
                    borderRadius: theme.borderRadius.sm,
                    backgroundColor: `rgba(${accentRgb}, ${
                      theme.isDark ? 0.1 : 0.08
                    })`,
                    color: theme.isDark ? accentColor : theme.colors.textSecondary,
                    border: `1px solid rgba(${accentRgb}, 0.2)`,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Footer badges */}
            {(project.wip || project.featured || project.isRepo) && (
              <div className="flex items-center gap-2 mt-3">
                {project.isRepo && (
                  <span
                    className="text-[9px] uppercase tracking-[0.2em] font-semibold"
                    style={{ color: theme.colors.textLight }}
                  >
                    Open Source
                  </span>
                )}
                {project.featured && !project.isRepo && (
                  <span
                    className="text-[9px] uppercase tracking-[0.2em] font-semibold"
                    style={{ color: accentColor }}
                  >
                    Featured
                  </span>
                )}
                {project.wip && (
                  <span
                    className="text-[9px] uppercase tracking-[0.2em] font-semibold"
                    style={{ color: theme.colors.textLight }}
                  >
                    In Arbeit
                  </span>
                )}
              </div>
            )}
          </div>
        </a>
      ))}
    </div>
  );
};
