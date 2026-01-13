
import React from 'react';
import { LinkItem } from '../types';

interface LinkCardProps {
  link: LinkItem;
  isProminent?: boolean;
}

export const LinkCard: React.FC<LinkCardProps> = ({ link, isProminent }) => {
  const isCyan = link.color === 'cyan';
  
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        group relative block w-full transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02]
        ${isProminent ? 'p-6 md:p-8' : 'p-5'}
        rounded-2xl glass
        ${isCyan ? 'hover:neon-border-cyan border-cyan-500/10' : 'hover:neon-border-pink border-pink-500/10'}
        hover:z-50
      `}
    >
      {/* --- POP-UP PREVIEW (Prominent Only) --- */}
      {isProminent && (
        <div className="hidden md:block absolute bottom-[120%] left-1/2 -translate-x-1/2 w-72 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 z-50">
           {/* Monitor Frame */}
           <div className={`
             relative p-1 rounded-lg bg-[#050505] border
             ${isCyan ? 'border-cyan-500 shadow-[0_0_20px_rgba(0,255,255,0.3)]' : 'border-pink-500 shadow-[0_0_20px_rgba(255,0,255,0.3)]'}
           `}>
              {/* Screen Content */}
              <div className="relative rounded overflow-hidden aspect-video bg-zinc-900 border border-white/10">
                 {/* Loading/Static Placeholder underneath */}
                 <div className="absolute inset-0 flex items-center justify-center text-xs text-zinc-600 font-orbitron">INITIALIZING...</div>
                 
                 {/* Live Preview */}
                 <img 
                   src={`https://image.thum.io/get/width/600/crop/800/noanimate/${link.url}`} 
                   alt="Site Preview" 
                   className="relative z-10 w-full h-full object-cover opacity-90"
                 />

                 {/* Scanlines Overlay */}
                 <div className="absolute inset-0 z-20 bg-[linear-gradient(rgba(18,16,20,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] opacity-40 pointer-events-none"></div>
                 
                 {/* Screen Glare */}
                 <div className="absolute inset-0 z-30 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>
              </div>
              
              {/* Monitor Status Bar */}
              <div className="flex justify-between items-center mt-1.5 px-1">
                 <span className={`text-[9px] font-orbitron tracking-widest ${isCyan ? 'text-cyan-400' : 'text-pink-400'}`}>
                    LIVE FEED :: 128kbps
                 </span>
                 <div className="flex gap-1">
                    <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isCyan ? 'bg-cyan-500' : 'bg-pink-500'}`}></div>
                    <div className={`w-1.5 h-1.5 rounded-full bg-zinc-800`}></div>
                 </div>
              </div>

              {/* Connecting Line/Triangle */}
              <div className={`
                absolute left-1/2 -translate-x-1/2 -bottom-2.5 
                w-0 h-0 
                border-l-[10px] border-l-transparent 
                border-r-[10px] border-r-transparent 
                border-t-[10px] 
                ${isCyan ? 'border-t-cyan-500' : 'border-t-pink-500'}
                filter drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]
              `}></div>
           </div>
        </div>
      )}

      <div className="relative z-30 flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-6">
          {link.icon && (
            <div className={`
              p-3 rounded-lg bg-zinc-900/80 border transition-all duration-300 backdrop-blur-lg
              ${isCyan ? 'border-cyan-500/20 text-cyan-400 group-hover:shadow-[0_0_10px_rgba(0,255,255,0.3)]' : 'border-pink-500/20 text-pink-400 group-hover:shadow-[0_0_10px_rgba(255,0,255,0.3)]'}
            `}>
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={link.icon} />
              </svg>
            </div>
          )}
          <div className="flex flex-col">
            <span className={`
              ${isProminent ? 'text-xl md:text-2xl font-black drop-shadow-lg' : 'text-lg font-semibold'} 
              font-orbitron tracking-tight transition-colors duration-300 
              ${isCyan ? 'text-zinc-100 group-hover:text-cyan-400' : 'text-zinc-100 group-hover:text-pink-400'}
            `}>
              {link.label}
            </span>
            <span className="text-[10px] text-zinc-400 tracking-[0.2em] uppercase mt-1 group-hover:text-zinc-200 transition-colors font-medium shadow-black drop-shadow-md">
              Official Website
            </span>
          </div>
        </div>
        
        <div className={`p-2 rounded-full border border-white/10 bg-black/20 backdrop-blur-xl transition-all duration-300 ${isCyan ? 'group-hover:bg-cyan-500/20 group-hover:text-cyan-400' : 'group-hover:bg-pink-500/20 group-hover:text-pink-400'}`}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
      
      {/* Dynamic Glow Layer (Border/Hover effect) */}
      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none z-20 ${isCyan ? 'bg-cyan-400' : 'bg-pink-400'}`}></div>
      {isProminent && (
        <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-[80%] h-[1px] opacity-0 group-hover:opacity-100 transition-all duration-700 blur-[2px] z-20 ${isCyan ? 'bg-cyan-400 shadow-[0_0_10px_#0ff]' : 'bg-pink-400 shadow-[0_0_10px_#f0f]'}`}></div>
      )}
    </a>
  );
};
