
import React, { useState } from 'react';
import { SynthwaveBackground } from './components/SynthwaveBackground';
import { Profile } from './components/Profile';
import { LinkCard } from './components/LinkCard';
import { SocialIcons } from './components/SocialIcons';
import { AIChat } from './components/AIChat';
import { BlogFeed } from './components/BlogFeed';
import { SocialFeed } from './components/SocialFeed';
import { ContactForm } from './components/ContactForm';
import { PRIMARY_LINKS, SOCIAL_LINKS } from './constants';

const App: React.FC = () => {
  const [showChat, setShowChat] = useState(false);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start py-12 px-4 overflow-hidden">
      <SynthwaveBackground />
      
      <div className="relative z-10 w-full max-w-xl flex flex-col items-center gap-8">
        <Profile 
          name="Hans-Peter Martini"
          title="Geschäftsführer"
          company="Martini Labs GmbH"
          brand="Schwälmer Softwarehaus"
        />

        {/* Primary Website Links - Prominent Cards */}
        <div className="w-full space-y-6">
          <h2 className="text-center text-[10px] font-orbitron tracking-[0.4em] text-zinc-300 uppercase">Core Ventures</h2>
          <div className="space-y-4">
            {PRIMARY_LINKS.map((link) => (
              <LinkCard key={link.url} link={link} isProminent={true} />
            ))}
          </div>
        </div>

        {/* Social Links - Just Icons */}
        <div className="w-full">
           <h2 className="text-center text-[10px] font-orbitron tracking-[0.4em] text-zinc300 uppercase mb-6">Connect</h2>
           <SocialIcons links={SOCIAL_LINKS} />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 w-full justify-center mt-4">
          <button 
            onClick={() => setShowChat(!showChat)}
            className="flex-1 group relative px-6 py-4 bg-black/40 rounded-xl font-orbitron text-cyan-400 border border-cyan-500/50 hover:border-cyan-400 transition-all duration-300 shadow-[0_0_15px_rgba(0,255,255,0.1)] hover:shadow-[0_0_25px_rgba(0,255,255,0.3)]"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              {showChat ? 'Close Terminal' : 'AI Assistant'}
            </span>
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 bg-cyan-400 blur-lg transition-opacity duration-300"></div>
          </button>

          <button 
            onClick={scrollToContact}
            className="flex-1 group relative px-6 py-4 bg-black/40 rounded-xl font-orbitron text-pink-400 border border-pink-500/50 hover:border-pink-400 transition-all duration-300 shadow-[0_0_15px_rgba(236,72,153,0.1)] hover:shadow-[0_0_25px_rgba(236,72,153,0.3)]"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
               </svg>
              Contact Me
            </span>
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 bg-pink-400 blur-lg transition-opacity duration-300"></div>
          </button>
        </div>

        {showChat && <AIChat />}
        
        {/* Dynamic Blog Feed using Gemini Grounding */}
        <BlogFeed />
        
        {/* Dynamic Social Feed (LinkedIn/X) */}
        <SocialFeed />

        {/* Contact Form */}
        <ContactForm />

        <footer className="mt-12 text-zinc-500 text-[10px] font-light tracking-[0.3em] uppercase">
          &copy; {new Date().getFullYear()} Martini Labs GmbH
        </footer>
      </div>
    </div>
  );
};

export default App;
