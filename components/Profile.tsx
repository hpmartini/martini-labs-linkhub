
import React from 'react';

interface ProfileProps {
  name: string;
  title: string;
  company: string;
  brand: string;
}

export const Profile: React.FC<ProfileProps> = ({ name, title, company, brand }) => {
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col items-center text-center animate-fade-in w-full">
      {/* Avatar with extra glow for separation */}
      <div className="relative group mb-8">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full blur-md opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative w-32 h-32 rounded-full border-2 border-white/30 overflow-hidden bg-black shadow-2xl">
          <img 
            src="https://picsum.photos/seed/hanspeter/400" 
            alt={name} 
            className="w-full h-full object-cover grayscale-[0.2] contrast-125"
          />
        </div>
        
        {/* Status Badge */}
        <div className="absolute -bottom-2 -right-2 bg-pink-600 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border border-white/20 shadow-[0_0_15px_rgba(219,39,119,0.5)] z-20">
          Online
        </div>

        {/* Message Badge / Contact Link */}
        <a 
          href="#contact"
          onClick={scrollToContact}
          className="absolute -top-1 -right-1 flex items-center justify-center w-8 h-8 bg-zinc-900 text-pink-400 rounded-full border border-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.6)] hover:bg-pink-600 hover:text-white transition-all duration-300 z-30 cursor-pointer transform hover:scale-110"
          title="Send Message"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </a>
      </div>
      
      {/* Text block with protective dark backing and blur */}
      <div className="relative py-2 px-8 rounded-3xl">
        {/* Protective Layer: Subtle radial gradient behind text to ensure legibility */}
        <div className="absolute inset-0 bg-black/60 blur-3xl rounded-full scale-150 pointer-events-none -z-10"></div>
        
        <div className="space-y-2 relative z-10">
          <h1 className="text-4xl md:text-5xl font-orbitron font-black uppercase tracking-tighter text-white neon-text-pink leading-none drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
            {name}
          </h1>
          
          <div className="flex flex-col items-center space-y-1">
            <span className="text-cyan-400 font-bold tracking-[0.3em] uppercase text-xs md:text-sm drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)] bg-black/40 px-4 py-0.5 rounded-full border border-cyan-500/10">
              {title}
            </span>
            <span className="text-zinc-200 font-semibold text-lg md:text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
              {company}
              <br />
              {brand}
            </span>
          </div>
        </div>
      </div>
      
      <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mt-6 rounded-full opacity-50"></div>
    </div>
  );
};
