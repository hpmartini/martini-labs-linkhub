
import React, { useEffect, useState, useRef } from 'react';
import { BlogPost } from '../types';
import { fetchLatestBlogPosts } from '../services/rss';
import { useTheme } from '../themes/ThemeContext';
import { ArrowRight } from 'lucide-react';

export const BlogFeed: React.FC = () => {
  const theme = useTheme();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const mountedRef = useRef(true);

  const loadPosts = async () => {
    setIsLoading(true);
    setError(false);
    try {
      const data = await fetchLatestBlogPosts();
      if (mountedRef.current) {
        setPosts(data);
      }
    } catch (e) {
      if (mountedRef.current) {
        setError(true);
      }
    } finally {
      if (mountedRef.current) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    mountedRef.current = true;
    loadPosts();
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const cardBg = theme.isDark ? 'bg-zinc-900/40' : 'bg-white/80';
  const borderBase = theme.isDark ? 'border-zinc-800' : 'border-gray-200';
  const loadingBg = theme.isDark ? 'bg-black/20' : 'bg-white/60';
  const errorBg = theme.isDark ? 'bg-black/70' : 'bg-white/90';

  return (
    <div className="w-full mt-12 animate-fade-in">
      <div className="flex items-center justify-center gap-4 mb-6">
        <div
          className="h-[1px] w-12"
          style={{ background: `linear-gradient(to right, transparent, ${theme.colors.textMuted})` }}
        />
        <h2
          className="text-[10px] tracking-[0.4em] uppercase"
          style={{ fontFamily: theme.fonts.heading, color: theme.colors.textSecondary }}
        >
          {theme.isDark ? 'Incoming Transmissions' : 'Aktuelle Blog-Artikel'}
        </h2>
        <div
          className="h-[1px] w-12"
          style={{ background: `linear-gradient(to left, transparent, ${theme.colors.textMuted})` }}
        />
      </div>

      {isLoading ? (
        <div className={`w-full p-8 border ${borderBase} rounded-2xl ${loadingBg} backdrop-blur-sm flex flex-col items-center justify-center gap-3`}>
           <div className="flex gap-1">
              <span className="w-1 h-8 animate-[pulse_1s_ease-in-out_infinite]" style={{ backgroundColor: `rgba(${theme.colors.primaryRgb}, 0.5)` }}></span>
              <span className="w-1 h-6 animate-[pulse_1.2s_ease-in-out_infinite]" style={{ backgroundColor: `rgba(${theme.colors.primaryRgb}, 0.5)` }}></span>
              <span className="w-1 h-10 animate-[pulse_0.8s_ease-in-out_infinite]" style={{ backgroundColor: `rgba(${theme.colors.primaryRgb}, 0.5)` }}></span>
              <span className="w-1 h-5 animate-[pulse_1.5s_ease-in-out_infinite]" style={{ backgroundColor: `rgba(${theme.colors.primaryRgb}, 0.5)` }}></span>
           </div>
           <span
             className="text-xs animate-pulse tracking-widest"
             style={{ fontFamily: theme.fonts.heading, color: `rgba(${theme.colors.primaryRgb}, 0.8)` }}
           >
             {theme.isDark ? 'SCANNING FREQUENCIES...' : 'Loading...'}
           </span>
        </div>
      ) : error || posts.length === 0 ? (
        <div className={`w-full p-6 text-center border ${borderBase} rounded-xl ${errorBg} flex flex-col items-center gap-2 backdrop-blur-md`}>
           <p style={{ color: theme.colors.textMuted }} className="text-xs font-mono">
             {theme.isDark ? 'SIGNAL INTERFERENCE DETECTED.' : 'No articles found.'}
           </p>
           <button
             onClick={loadPosts}
             className="mt-2 text-[10px] px-3 py-1 rounded transition-colors"
             style={{
               fontFamily: theme.fonts.heading,
               color: theme.colors.primary,
               border: `1px solid rgba(${theme.colors.primaryRgb}, 0.3)`
             }}
           >
             {theme.isDark ? 'RETRY CONNECTION' : 'Retry'}
           </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map((post) => {
            const isMartini = post.source.toLowerCase().includes('martini');
            const accentColor = isMartini ? theme.colors.primary : theme.colors.secondary;
            const accentRgb = isMartini ? theme.colors.primaryRgb : theme.colors.secondaryRgb;

            return (
              <a
                key={post.url}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex flex-col justify-between p-5 ${cardBg} backdrop-blur-xl hover:-translate-y-1 overflow-hidden`}
                style={{
                  borderRadius: theme.borderRadius.lg,
                  border: `1px solid rgba(${accentRgb}, 0.2)`,
                  boxShadow: theme.shadows.card,
                  transition: theme.transitions.slow,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `rgba(${accentRgb}, 0.5)`;
                  e.currentTarget.style.boxShadow = theme.shadows.cardHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `rgba(${accentRgb}, 0.2)`;
                  e.currentTarget.style.boxShadow = theme.shadows.card;
                }}
              >
                {/* Decoration Lines */}
                <div className="absolute top-0 right-0 p-2 opacity-50 transition-opacity group-hover:opacity-100" style={{ color: accentColor }}>
                  <svg width="10" height="10" viewBox="0 0 10 10">
                    <path d="M0 0 L10 0 L10 10" fill="none" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5"
                      style={{
                        borderRadius: theme.borderRadius.sm,
                        backgroundColor: `rgba(${accentRgb}, ${theme.isDark ? 0.2 : 0.1})`,
                        color: accentColor
                      }}
                    >
                      {post.source}
                    </span>
                    {post.date && post.date !== 'Recent' && (
                       <span className="text-[9px] font-mono" style={{ color: theme.colors.textMuted }}>{post.date}</span>
                    )}
                  </div>
                  <h3
                    className="text-sm font-semibold leading-snug transition-colors line-clamp-2"
                    style={{ color: theme.colors.text }}
                  >
                    {post.title}
                  </h3>
                </div>

                <div
                  className="mt-4 flex items-center gap-2 text-[10px] transition-colors"
                  style={{ color: theme.colors.textMuted, fontFamily: theme.fonts.heading }}
                >
                  <span className="tracking-wider">{theme.isDark ? 'READ LOG' : 'Read more'}</span>
                  <ArrowRight className="w-3 h-3 transform transition-transform group-hover:translate-x-1" strokeWidth={2} />
                </div>

                {/* Hover Glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none"
                  style={{ backgroundColor: accentColor, transition: theme.transitions.slow }}
                ></div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};
