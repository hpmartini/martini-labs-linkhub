
import React from 'react';
import { LinkItem } from '../types';

interface SocialIconsProps {
  links: LinkItem[];
}

export const SocialIcons: React.FC<SocialIconsProps> = ({ links }) => {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {links.map((link) => {
        const isCyan = link.color === 'cyan';
        return (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            title={link.label}
            className={`
              group relative p-4 rounded-full glass border transition-all duration-300 transform hover:-translate-y-1 hover:scale-110
              ${isCyan ? 'border-cyan-500/20 hover:border-cyan-400 hover:neon-border-cyan' : 'border-pink-500/20 hover:border-pink-400 hover:neon-border-pink'}
            `}
          >
            <div className={`relative z-10 transition-colors duration-300 ${isCyan ? 'text-cyan-600 group-hover:text-cyan-400' : 'text-pink-600 group-hover:text-pink-400'}`}>
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
            
            {/* Background Glow */}
            <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-md ${isCyan ? 'bg-cyan-400' : 'bg-pink-400'}`}></div>
          </a>
        );
      })}
    </div>
  );
};
