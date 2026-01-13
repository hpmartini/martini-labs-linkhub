
import React, { useEffect, useState, useCallback } from 'react';
import { BlogPost } from '../types';
import { fetchLatestBlogPosts } from '../services/gemini';

export const BlogFeed: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadPosts = useCallback(async () => {
    setIsLoading(true);
    setError(false);
    try {
      const data = await fetchLatestBlogPosts();
      setPosts(data);
    } catch (e) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return (
    <div className="w-full mt-12 animate-fade-in">
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-zinc-500"></div>
        <h2 className="text-[10px] font-orbitron tracking-[0.4em] text-zinc-300 uppercase">
          Incoming Transmissions
        </h2>
        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-zinc-500"></div>
      </div>

      {isLoading ? (
        <div className="w-full p-8 border border-zinc-800 rounded-2xl bg-black/20 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
           <div className="flex gap-1">
              <span className="w-1 h-8 bg-cyan-500/50 animate-[pulse_1s_ease-in-out_infinite]"></span>
              <span className="w-1 h-6 bg-cyan-500/50 animate-[pulse_1.2s_ease-in-out_infinite]"></span>
              <span className="w-1 h-10 bg-cyan-500/50 animate-[pulse_0.8s_ease-in-out_infinite]"></span>
              <span className="w-1 h-5 bg-cyan-500/50 animate-[pulse_1.5s_ease-in-out_infinite]"></span>
           </div>
           <span className="text-xs font-orbitron text-cyan-500/80 animate-pulse tracking-widest">SCANNING FREQUENCIES...</span>
        </div>
      ) : error || posts.length === 0 ? (
        <div className="w-full p-6 text-center border border-zinc-800/50 rounded-xl bg-black/40 flex flex-col items-center gap-2">
           <p className="text-zinc-500 text-xs font-mono">SIGNAL INTERFERENCE DETECTED.</p>
           <button 
             onClick={loadPosts}
             className="mt-2 text-[10px] font-orbitron text-cyan-400 border border-cyan-500/30 px-3 py-1 rounded hover:bg-cyan-900/20 transition-colors"
           >
             RETRY CONNECTION
           </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map((post, index) => {
            const isMartini = post.source.toLowerCase().includes('martini');
            return (
              <a 
                key={index}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  group relative flex flex-col justify-between p-5 rounded-xl border bg-zinc-900/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 overflow-hidden
                  ${isMartini 
                    ? 'border-cyan-500/20 hover:border-cyan-400/50' 
                    : 'border-pink-500/20 hover:border-pink-400/50'}
                `}
              >
                {/* Decoration Lines */}
                <div className={`absolute top-0 right-0 p-2 opacity-50 transition-opacity group-hover:opacity-100 ${isMartini ? 'text-cyan-500' : 'text-pink-500'}`}>
                  <svg width="10" height="10" viewBox="0 0 10 10">
                    <path d="M0 0 L10 0 L10 10" fill="none" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${isMartini ? 'bg-cyan-900/30 text-cyan-300' : 'bg-pink-900/30 text-pink-300'}`}>
                      {post.source}
                    </span>
                    {post.date && post.date !== 'Recent' && (
                       <span className="text-[9px] text-zinc-500 font-mono">{post.date}</span>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold text-zinc-100 leading-snug group-hover:text-white transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </div>

                <div className="mt-4 flex items-center gap-2 text-[10px] text-zinc-400 group-hover:text-zinc-200 transition-colors">
                  <span className="font-orbitron tracking-wider">READ LOG</span>
                  <svg className="w-3 h-3 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                
                {/* Hover Glow */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-500 ${isMartini ? 'bg-cyan-500' : 'bg-pink-500'}`}></div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};
