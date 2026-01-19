
import React, { useEffect, useState } from 'react';
import { SocialPost } from '../types';
import { fetchLatestSocialPosts } from '../services/social';
import { SOCIAL_LINKS } from '../constants';
import { useTheme } from '../themes/ThemeContext';

export const SocialFeed: React.FC = () => {
  const theme = useTheme();
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

  const cardBg = theme.isDark ? 'bg-zinc-900/40' : 'bg-white/80';
  const loadingBg = theme.isDark ? 'bg-black/20' : 'bg-white/60';
  const borderBase = theme.isDark ? 'border-zinc-800' : 'border-gray-200';

  const FallbackView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {linkedInUrl && (
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex items-center justify-between p-6 ${cardBg} backdrop-blur-xl`}
              style={{
                borderRadius: theme.borderRadius.lg,
                border: `1px solid rgba(${theme.colors.primaryRgb}, 0.3)`,
                boxShadow: theme.shadows.card,
                transition: theme.transitions.slow,
              }}
            >
                <div className="flex flex-col">
                    <span
                      className="tracking-widest text-xs uppercase mb-1"
                      style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary }}
                    >
                      {theme.isDark ? 'Encrypted Link' : 'Social'}
                    </span>
                    <span className="font-bold text-lg" style={{ color: theme.colors.text }}>Connect on LinkedIn</span>
                </div>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor: `rgba(${theme.colors.primaryRgb}, 0.2)`,
                    color: theme.colors.primary
                  }}
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </div>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  style={{
                    borderRadius: theme.borderRadius.lg,
                    border: `1px solid rgba(${theme.colors.primaryRgb}, 0.5)`,
                    boxShadow: `0 0 20px rgba(${theme.colors.primaryRgb}, 0.2)`,
                    transition: theme.transitions.slow,
                  }}
                ></div>
            </a>
        )}
        {twitterUrl && (
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex items-center justify-between p-6 ${cardBg} backdrop-blur-xl`}
              style={{
                borderRadius: theme.borderRadius.lg,
                border: `1px solid rgba(${theme.colors.secondaryRgb}, 0.3)`,
                boxShadow: theme.shadows.card,
                transition: theme.transitions.slow,
              }}
            >
                <div className="flex flex-col">
                    <span
                      className="tracking-widest text-xs uppercase mb-1"
                      style={{ fontFamily: theme.fonts.heading, color: theme.colors.secondary }}
                    >
                      {theme.isDark ? 'Encrypted Link' : 'Social'}
                    </span>
                    <span className="font-bold text-lg" style={{ color: theme.colors.text }}>Follow on X</span>
                </div>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor: `rgba(${theme.colors.secondaryRgb}, 0.2)`,
                    color: theme.colors.secondary
                  }}
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </div>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  style={{
                    borderRadius: theme.borderRadius.lg,
                    border: `1px solid rgba(${theme.colors.secondaryRgb}, 0.5)`,
                    boxShadow: `0 0 20px rgba(${theme.colors.secondaryRgb}, 0.2)`,
                    transition: theme.transitions.slow,
                  }}
                ></div>
            </a>
        )}
    </div>
  );

  return (
    <div className="w-full mt-12 animate-fade-in mb-12">
      <div className="flex items-center justify-center gap-4 mb-6">
        <div
          className="h-[1px] w-12"
          style={{ background: `linear-gradient(to right, transparent, ${theme.colors.textMuted})` }}
        />
        <h2
          className="text-[10px] tracking-[0.4em] uppercase"
          style={{ fontFamily: theme.fonts.heading, color: theme.colors.textSecondaryf }}
        >
          {theme.isDark ? 'Social Uplink' : 'Social Media'}
        </h2>
        <div
          className="h-[1px] w-12"
          style={{ background: `linear-gradient(to left, transparent, ${theme.colors.textMuted})` }}
        />
      </div>

      {isLoading ? (
        <div className={`w-full p-8 border ${borderBase} rounded-2xl ${loadingBg} backdrop-blur-sm flex flex-col items-center justify-center gap-3`}>
           <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: `rgba(${theme.colors.secondaryRgb}, 0.5)` }}></span>
              <span className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:-0.15s]" style={{ backgroundColor: `rgba(${theme.colors.secondaryRgb}, 0.5)` }}></span>
              <span className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:-0.3s]" style={{ backgroundColor: `rgba(${theme.colors.secondaryRgb}, 0.5)` }}></span>
           </div>
           <span
             className="text-xs animate-pulse tracking-widest"
             style={{ fontFamily: theme.fonts.heading, color: `rgba(${theme.colors.secondaryRgb}, 0.8)` }}
           >
             {theme.isDark ? 'ESTABLISHING CONNECTION...' : 'Loading...'}
           </span>
        </div>
      ) : (posts.length === 0 || hasError) ? (
        <div className="w-full flex flex-col items-center animate-fade-in">
           <div className="mb-4 text-xs font-mono text-center" style={{ color: theme.colors.textSecondary }}>
              <p>{theme.isDark ? 'DIRECT FEED SIGNAL BLOCKED BY PROTOCOL.' : 'Follow me on social media:'}</p>
              {theme.isDark && <p>ESTABLISH MANUAL UPLINK BELOW.</p>}
           </div>
           <FallbackView />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {posts.map((post) => {
            const isLinkedIn = post.source.toLowerCase().includes('linkedin');
            const accentColor = isLinkedIn ? theme.colors.primary : theme.colors.secondary;
            const accentRgb = isLinkedIn ? theme.colors.primaryRgb : theme.colors.secondaryRgb;

            return (
              <a
                key={post.url}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex flex-col p-5 ${cardBg} backdrop-blur-xl hover:-translate-y-1 overflow-hidden`}
                style={{
                  borderRadius: theme.borderRadius.lg,
                  border: `1px solid rgba(${accentRgb}, 0.2)`,
                  boxShadow: theme.shadows.card,
                  transition: theme.transitions.slow,
                }}
              >
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
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
                        <span className="text-[9px] font-mono" style={{ color: theme.colors.textMuted }}>{post.date}</span>
                    </div>

                    <div className="opacity-50 group-hover:opacity-100 transition-opacity" style={{ color: accentColor }}>
                        {isLinkedIn ? (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        ) : (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        )}
                    </div>
                </div>

                <p
                  className="text-sm font-light leading-relaxed transition-colors"
                  style={{ color: theme.isDark ? '#d4d4d8' : theme.colors.text }}
                >
                  "{post.content}"
                </p>

                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-5 pointer-events-none"
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
