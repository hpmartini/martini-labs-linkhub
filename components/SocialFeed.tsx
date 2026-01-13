
import React, { useEffect, useState } from 'react';
import { SocialPost } from '../types';
import { fetchLatestSocialPosts } from '../services/gemini';
import { SOCIAL_LINKS } from '../constants';

export const SocialFeed: React.FC = () => {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let mounted = true;
    const loadPosts = async () => {
      try {
        const data = await fetchLatestSocialPosts();
        if (mounted) {
          setPosts(data);
          setIsLoading(false);
        }
      } catch (e) {
        if (mounted) {
           setHasError(true);
           setIsLoading(false);
        }
      }
    };
    loadPosts();
    return () => { mounted = false; };
  }, []);

  const linkedInUrl = SOCIAL_LINKS.find(l => l.label === 'LinkedIn')?.url;
  const twitterUrl = SOCIAL_LINKS.find(l => l.label === 'Twitter')?.url;

  const FallbackView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {linkedInUrl && (
            <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="group relative flex items-center justify-between p-6 rounded-xl border border-cyan-500/30 bg-zinc-900/40 backdrop-blur-md hover:bg-cyan-900/10 transition-all duration-300">
                <div className="flex flex-col">
                    <span className="text-cyan-400 font-orbitron tracking-widest text-xs uppercase mb-1">Encrypted Link</span>
                    <span className="text-zinc-100 font-bold text-lg">Connect on LinkedIn</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-black transition-colors text-cyan-400">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </div>
                <div className="absolute inset-0 border border-cyan-500/0 group-hover:border-cyan-500/50 rounded-xl transition-all duration-500 shadow-[0_0_0_rgba(0,255,255,0)] group-hover:shadow-[0_0_20px_rgba(0,255,255,0.2)]"></div>
            </a>
        )}
        {twitterUrl && (
            <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="group relative flex items-center justify-between p-6 rounded-xl border border-pink-500/30 bg-zinc-900/40 backdrop-blur-md hover:bg-pink-900/10 transition-all duration-300">
                <div className="flex flex-col">
                    <span className="text-pink-400 font-orbitron tracking-widest text-xs uppercase mb-1">Encrypted Link</span>
                    <span className="text-zinc-100 font-bold text-lg">Follow on X</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center group-hover:bg-pink-500 group-hover:text-black transition-colors text-pink-400">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </div>
                <div className="absolute inset-0 border border-pink-500/0 group-hover:border-pink-500/50 rounded-xl transition-all duration-500 shadow-[0_0_0_rgba(255,0,255,0)] group-hover:shadow-[0_0_20px_rgba(255,0,255,0.2)]"></div>
            </a>
        )}
    </div>
  );

  return (
    <div className="w-full mt-12 animate-fade-in mb-12">
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-zinc-500"></div>
        <h2 className="text-[10px] font-orbitron tracking-[0.4em] text-zinc-300 uppercase">
          Social Uplink
        </h2>
        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-zinc-500"></div>
      </div>

      {isLoading ? (
        <div className="w-full p-8 border border-zinc-800 rounded-2xl bg-black/20 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
           <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500/50 animate-bounce"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500/50 animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500/50 animate-bounce [animation-delay:-0.3s]"></span>
           </div>
           <span className="text-xs font-orbitron text-pink-500/80 animate-pulse tracking-widest">ESTABLISHING CONNECTION...</span>
        </div>
      ) : (posts.length === 0 || hasError) ? (
        <div className="w-full flex flex-col items-center animate-fade-in">
           <div className="mb-4 text-xs text-zinc-500 font-mono text-center">
              <p>DIRECT FEED SIGNAL BLOCKED BY PROTOCOL.</p>
              <p>ESTABLISH MANUAL UPLINK BELOW.</p>
           </div>
           <FallbackView />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {posts.map((post, index) => {
            const isLinkedIn = post.source.toLowerCase().includes('linkedin');
            const borderColor = isLinkedIn ? 'border-cyan-500/20 hover:border-cyan-400/50' : 'border-pink-500/20 hover:border-pink-400/50';
            const badgeColor = isLinkedIn ? 'bg-cyan-900/30 text-cyan-300' : 'bg-pink-900/30 text-pink-300';
            const glowColor = isLinkedIn ? 'bg-cyan-500' : 'bg-pink-500';

            return (
              <a 
                key={index}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  group relative flex flex-col p-5 rounded-xl border bg-zinc-900/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 overflow-hidden
                  ${borderColor}
                `}
              >
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${badgeColor}`}>
                        {post.source}
                        </span>
                        <span className="text-[9px] text-zinc-500 font-mono">{post.date}</span>
                    </div>
                    
                    <div className={`opacity-50 group-hover:opacity-100 transition-opacity ${isLinkedIn ? 'text-cyan-400' : 'text-pink-400'}`}>
                        {isLinkedIn ? (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        ) : (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        )}
                    </div>
                </div>
                
                <p className="text-sm font-light text-zinc-300 leading-relaxed group-hover:text-white transition-colors">
                  "{post.content}"
                </p>

                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 pointer-events-none transition-opacity duration-500 ${glowColor}`}></div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};
