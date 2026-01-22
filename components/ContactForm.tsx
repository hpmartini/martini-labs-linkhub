import React, { useState } from "react";
import { useTheme } from "../themes/ThemeContext";
import { Check, ArrowRight } from "lucide-react";

export const ContactForm: React.FC = () => {
  const theme = useTheme();
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xykkrpgv", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  const cardBg = theme.isDark ? "bg-zinc-900/40" : "bg-white/80";
  const inputBg = theme.isDark ? "bg-black/70" : "bg-gray-50";
  const inputBorder = theme.isDark ? "border-zinc-800" : "border-gray-200";
  const inputText = theme.isDark ? "text-zinc-100" : "text-gray-900";
  const placeholderClass = theme.isDark
    ? "placeholder-zinc-700"
    : "placeholder-gray-400";

  return (
    <div
      id="contact"
      className="w-full mt-16 mb-8 animate-fade-in scroll-mt-24"
    >
      <div className="flex items-center justify-center gap-4 mb-8">
        <div
          className="h-[1px] w-12"
          style={{
            background: `linear-gradient(to right, transparent, ${theme.colors.secondary})`,
          }}
        />
        <h2
          className="text-[10px] tracking-[0.4em] uppercase"
          style={{
            fontFamily: theme.fonts.heading,
            color: theme.colors.textSecondary,
          }}
        >
          {theme.isDark ? "Transmission Uplink" : "Contact"}
        </h2>
        <div
          className="h-[1px] w-12"
          style={{
            background: `linear-gradient(to left, transparent, ${theme.colors.secondary})`,
          }}
        />
      </div>

      <div
        className={`relative p-6 md:p-8 ${cardBg} backdrop-blur-xl group`}
        style={{
          borderRadius: theme.borderRadius.xl,
          border: `1px solid rgba(${theme.colors.secondaryRgb}, 0.1)`,
          boxShadow: theme.shadows.card,
          transition: theme.transitions.slow,
        }}
      >
        {/* Decorative elements - only for dark/synthwave theme */}
        {theme.isDark && (
          <>
            <div
              className="absolute top-0 left-0 w-2 h-2 border-t border-l"
              style={{ borderColor: theme.colors.secondary }}
            ></div>
            <div
              className="absolute top-0 right-0 w-2 h-2 border-t border-r"
              style={{ borderColor: theme.colors.secondary }}
            ></div>
            <div
              className="absolute bottom-0 left-0 w-2 h-2 border-b border-l"
              style={{ borderColor: theme.colors.secondary }}
            ></div>
            <div
              className="absolute bottom-0 right-0 w-2 h-2 border-b border-r"
              style={{ borderColor: theme.colors.secondary }}
            ></div>
          </>
        )}

        {status === "success" ? (
          <div className="text-center py-12">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 animate-bounce"
              style={{
                backgroundColor: `rgba(${theme.colors.secondaryRgb}, 0.2)`,
                color: theme.colors.secondary,
              }}
            >
              <Check className="w-8 h-8" strokeWidth={2} />
            </div>
            <h3
              className="text-xl mb-2"
              style={{
                fontFamily: theme.fonts.heading,
                color: theme.colors.text,
              }}
            >
              {theme.isDark ? "Transmission Sent" : "Message Sent"}
            </h3>
            <p style={{ color: theme.colors.textMuted }} className="text-sm">
              {theme.isDark
                ? "We will establish contact shortly."
                : "We will get back to you soon."}
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-6 text-xs underline underline-offset-4"
              style={{ color: theme.colors.secondary }}
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-xs uppercase tracking-wider ml-1"
                  style={{
                    fontFamily: theme.fonts.heading,
                    color: `rgba(${theme.colors.secondaryRgb}, 0.8)`,
                  }}
                >
                  {theme.isDark ? "Identity" : "Name"}
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder="John Doe"
                  className={`w-full ${inputBg} px-4 py-3 ${inputText} ${placeholderClass} focus:outline-none`}
                  style={{
                    borderRadius: theme.borderRadius.md,
                    border: `1px solid ${theme.colors.borderInput}`,
                    transition: theme.transitions.default,
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = `rgba(${theme.colors.secondaryRgb}, 0.5)`)
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = theme.colors.borderInput)
                  }
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-xs uppercase tracking-wider ml-1"
                  style={{
                    fontFamily: theme.fonts.heading,
                    color: `rgba(${theme.colors.secondaryRgb}, 0.8)`,
                  }}
                >
                  {theme.isDark ? "Frequency (Email)" : "Email"}
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="john@example.com"
                  className={`w-full ${inputBg} px-4 py-3 ${inputText} ${placeholderClass} focus:outline-none`}
                  style={{
                    borderRadius: theme.borderRadius.md,
                    border: `1px solid ${theme.colors.borderInput}`,
                    transition: theme.transitions.default,
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = `rgba(${theme.colors.secondaryRgb}, 0.5)`)
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = theme.colors.borderInput)
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-xs uppercase tracking-wider ml-1"
                style={{
                  fontFamily: theme.fonts.heading,
                  color: `rgba(${theme.colors.secondaryRgb}, 0.8)`,
                }}
              >
                {theme.isDark ? "Data Packet" : "Message"}
              </label>
              <textarea
                name="message"
                id="message"
                required
                rows={4}
                placeholder="Enter your message here..."
                className={`w-full ${inputBg} px-4 py-3 ${inputText} ${placeholderClass} focus:outline-none resize-none`}
                style={{
                  borderRadius: theme.borderRadius.md,
                  border: `1px solid ${theme.colors.borderInput}`,
                  transition: theme.transitions.default,
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = `rgba(${theme.colors.secondaryRgb}, 0.5)`)
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = theme.colors.borderInput)
                }
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full group relative overflow-hidden px-8 py-4 text-center"
              style={{
                borderRadius: theme.borderRadius.lg,
                backgroundColor: theme.isDark
                  ? `rgba(${theme.colors.secondaryRgb}, 0.1)`
                  : theme.colors.secondary,
                border: theme.isDark
                  ? `1px solid rgba(${theme.colors.secondaryRgb}, 0.5)`
                  : "none",
                color: theme.isDark ? theme.colors.secondary : "#FFFFFF",
                transition: theme.transitions.default,
              }}
            >
              <span
                className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
                style={{ fontFamily: theme.fonts.heading }}
              >
                {status === "submitting"
                  ? theme.isDark
                    ? "Transmitting..."
                    : "Sending..."
                  : theme.isDark
                  ? "Initialize Upload"
                  : "Send Message"}
                {!status.includes("submitting") && (
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                )}
              </span>
              <div
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent to-transparent group-hover:animate-shimmer"
                style={{
                  background: `linear-gradient(to right, transparent, rgba(${theme.colors.secondaryRgb}, 0.1), transparent)`,
                }}
              ></div>
            </button>
            {status === "error" && (
              <p className="text-center text-red-400 text-xs mt-2">
                {theme.isDark
                  ? "Transmission Failed. Please check your config."
                  : "Failed to send. Please try again."}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
};
