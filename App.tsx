
import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './themes/ThemeContext';
import { SynthwaveBackground } from './components/SynthwaveBackground';
import { SchwälmerBackground } from './components/SchwälmerBackground';
import { Profile } from './components/Profile';
import { LinkCard } from './components/LinkCard';
import { SocialIcons } from './components/SocialIcons';
import { AIChat } from './components/AIChat';
import { BlogFeed } from './components/BlogFeed';
import { SocialFeed } from './components/SocialFeed';
import { ContactForm } from './components/ContactForm';
import { PRIMARY_LINKS, SOCIAL_LINKS } from './constants';

const AppContent: React.FC = () => {
  const [showChat, setShowChat] = useState(false);
  const theme = useTheme();

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Dynamic styles based on theme
  const primaryButtonClass = theme.isDark
    ? 'bg-black/70 text-cyan-400 border-cyan-500/50 hover:border-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.1)] hover:shadow-[0_0_25px_rgba(0,255,255,0.3)]'
    : 'bg-white/80 border-2 hover:bg-white shadow-lg hover:shadow-xl';

  const secondaryButtonClass = theme.isDark
    ? 'bg-black/70 text-pink-400 border-pink-500/50 hover:border-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.1)] hover:shadow-[0_0_25px_rgba(236,72,153,0.3)]'
    : 'bg-white/80 border-2 hover:bg-white shadow-lg hover:shadow-xl';

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

        {/* Primary Website Links - Prominent Cards */}
        <div className="w-full space-y-6">
          <h2
            className="text-center text-[10px] tracking-[0.4em] uppercase"
            style={{
              fontFamily: theme.fonts.heading,
              color: theme.colors.textMuted
            }}
          >
            Core Ventures
          </h2>
          <div className="space-y-4">
            {PRIMARY_LINKS.map((link) => (
              <LinkCard key={link.url} link={link} isProminent={true} />
            ))}
          </div>
        </div>

        {/* Social Links - Just Icons */}
        <div className="w-full">
          <h2
            className="text-center text-[10px] tracking-[0.4em] uppercase mb-6"
            style={{
              fontFamily: theme.fonts.heading,
              color: theme.colors.textMuted
            }}
          >
            Connect
          </h2>
          <SocialIcons links={SOCIAL_LINKS} />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 w-full justify-center mt-4">
          <button
            onClick={() => setShowChat(!showChat)}
            className={`flex-1 group relative px-6 py-4 rounded-xl transition-all duration-300 ${primaryButtonClass}`}
            style={{
              fontFamily: theme.fonts.heading,
              color: theme.colors.primary,
              borderColor: theme.colors.primary
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: theme.colors.primary }}
              />
              {showChat ? 'Close Terminal' : 'AI Assistant'}
            </span>
          </button>

          <button
            onClick={scrollToContact}
            className={`flex-1 group relative px-6 py-4 rounded-xl transition-all duration-300 ${secondaryButtonClass}`}
            style={{
              fontFamily: theme.fonts.heading,
              color: theme.colors.secondary,
              borderColor: theme.colors.secondary
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Me
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
