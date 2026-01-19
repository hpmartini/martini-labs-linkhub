import React, { useState, useEffect } from "react";
import { ThemeProvider, useTheme } from "./themes/ThemeContext";
import { SynthwaveBackground } from "./components/SynthwaveBackground";
import { SchwälmerBackground } from "./components/SchwälmerBackground";
import { Profile } from "./components/Profile";
import { LinkCard } from "./components/LinkCard";
import { SocialIcons } from "./components/SocialIcons";
import { AIChat } from "./components/AIChat";
import { BlogFeed } from "./components/BlogFeed";
import { SocialFeed } from "./components/SocialFeed";
import { ContactForm } from "./components/ContactForm";
import { PRIMARY_LINKS, SOCIAL_LINKS } from "./constants";
import { Mail } from "lucide-react";

const AppContent: React.FC = () => {
  const [showChat, setShowChat] = useState(false);
  const theme = useTheme();

  // Track QR code scans from /hi route
  useEffect(() => {
    if (window.location.pathname === '/hi') {
      // Fire and forget - don't await, don't block rendering
      fetch('/api/qr-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          screen: `${window.screen.width}x${window.screen.height}`,
          language: navigator.language,
          referrer: document.referrer,
          site: window.location.hostname,
        }),
      }).catch(() => {}); // Silently ignore errors

      // Clean URL to root without page reload
      window.history.replaceState({}, '', '/');
    }
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  // Dynamic styles based on theme
  const primaryButtonClass = theme.isDark
    ? "bg-black/70 text-cyan-400 border-cyan-500/50 hover:border-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.1)] hover:shadow-[0_0_25px_rgba(0,255,255,0.3)]"
    : "text-white transition-all";

  const primaryButtonStyle = theme.isDark
    ? {}
    : {
        backgroundColor: theme.colors.primary,
        boxShadow: theme.shadows.button,
        // Lift effect handled by CSS or generic class, but we can inline for specific color control if needed
      };

  const secondaryButtonClass = theme.isDark
    ? "bg-black/70 text-pink-400 border-pink-500/50 hover:border-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.1)] hover:shadow-[0_0_25px_rgba(236,72,153,0.3)]"
    : "bg-white hover:bg-slate-50 border-2 transition-all";

  const secondaryButtonStyle = theme.isDark
    ? {}
    : {
        color: theme.colors.textSecondary,
        borderColor: theme.colors.border,
      };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start py-12 px-4 overflow-hidden">
      {theme.isDark ? <SynthwaveBackground /> : <SchwälmerBackground />}

      <div className="relative z-10 w-full max-w-xl flex flex-col items-center gap-8">
        <Profile
          name="Hans-Peter Martini"
          title1="Softwareentwickler/"
          title2="Geschäftsführer von"
          company="Martini Labs GmbH"
          brand="Schwälmer Softwarehaus"
        />

        {/* Social Links - Just Icons */}
        <div className="w-full">
          <h2
            className="text-center uppercase mb-6"
            style={{
              fontFamily: theme.fonts.heading,
              color: theme.isDark
                ? theme.colors.textSecondary
                : theme.colors.primary,
              fontSize: theme.isDark ? "10px" : "12px",
              letterSpacing: theme.isDark ? "0.4em" : "0.1em",
              fontWeight: theme.isDark ? "normal" : "600",
            }}
          >
            Connect
          </h2>
          <SocialIcons links={SOCIAL_LINKS} />
        </div>

        {/* Primary Website Links - Prominent Cards */}
        <div className="w-full space-y-6">
          <h2
            className="text-center uppercase"
            style={{
              fontFamily: theme.fonts.heading,
              color: theme.isDark
                ? theme.colors.textSecondary
                : theme.colors.primary,
              fontSize: theme.isDark ? "10px" : "12px",
              letterSpacing: theme.isDark ? "0.4em" : "0.1em",
              fontWeight: theme.isDark ? "normal" : "600",
            }}
          >
            Core Ventures
          </h2>
          <div className="space-y-4">
            {PRIMARY_LINKS.map((link) => {
              // Override icon for Schwälmer Softwarehaus in dark mode
              const iconToUse =
                theme.isDark && link.label.includes("Schwälmer")
                  ? "images/schwalm_software_logo_alternate.png"
                  : link.icon;

              const linkWithThemeIcon = { ...link, icon: iconToUse };

              return (
                <LinkCard
                  key={link.url}
                  link={linkWithThemeIcon}
                  isProminent={true}
                />
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 w-full justify-center mt-4">
          <button
            onClick={() => setShowChat(!showChat)}
            className={`flex-1 group relative px-6 py-4 rounded-xl transition-all duration-300 ${primaryButtonClass}`}
            style={
              theme.isDark
                ? {
                    fontFamily: theme.fonts.heading,
                    color: theme.colors.primary,
                    borderColor: theme.colors.primary,
                  }
                : primaryButtonStyle
            }
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{
                  backgroundColor: theme.isDark
                    ? theme.colors.primary
                    : "white",
                }}
              />
              {showChat ? "Close Terminal" : "AI Assistant"}
            </span>
          </button>

          <button
            onClick={scrollToContact}
            className={`flex-1 group relative px-6 py-4 rounded-xl transition-all duration-300 ${secondaryButtonClass}`}
            style={
              theme.isDark
                ? {
                    fontFamily: theme.fonts.heading,
                    color: theme.colors.secondary,
                    borderColor: theme.colors.secondary,
                  }
                : secondaryButtonStyle
            }
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" strokeWidth={2} />
              Kontakt
            </span>
          </button>
        </div>

        {showChat && <AIChat />}

        {/* Dynamic Blog Feed */}
        <BlogFeed />

        {/* Dynamic Social Feed (LinkedIn/X) */}
        <SocialFeed />

        {/* Contact Form */}
        <ContactForm />

        <footer
          className="mt-12 text-[10px] font-light tracking-[0.3em] uppercase"
          style={{ color: theme.colors.textMuted }}
        >
          &copy; {new Date().getFullYear()} Martini Labs GmbH
        </footer>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
