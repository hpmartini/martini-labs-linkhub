
import React, { useState } from 'react';

export const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    try {
      // NOTE: Replace 'YOUR_FORMSPREE_ID' with your actual Formspree form ID (e.g., 'mrgwlekd')
      const response = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
        method: 'POST',
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div id="contact" className="w-full mt-16 mb-8 animate-fade-in scroll-mt-24">
       <div className="flex items-center justify-center gap-4 mb-8">
        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-pink-500"></div>
        <h2 className="text-[10px] font-orbitron tracking-[0.4em] text-zinc-300 uppercase">
          Transmission Uplink
        </h2>
        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-pink-500"></div>
      </div>

      <div className="relative p-6 md:p-8 rounded-2xl bg-zinc-900/40 backdrop-blur-xl border border-pink-500/10 hover:border-pink-500/30 transition-all duration-500 group">
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-pink-500"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-pink-500"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-pink-500"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-pink-500"></div>

        {status === 'success' ? (
           <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-500/20 text-pink-400 mb-4 animate-bounce">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-orbitron text-white mb-2">Transmission Sent</h3>
              <p className="text-zinc-400 text-sm">We will establish contact shortly.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-6 text-xs text-pink-400 hover:text-pink-300 underline underline-offset-4"
              >
                Send another message
              </button>
           </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-orbitron text-pink-400/80 uppercase tracking-wider ml-1">Identity</label>
                <input 
                  type="text" 
                  name="name" 
                  id="name"
                  required
                  placeholder="John Doe"
                  className="w-full bg-black/70 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-orbitron text-pink-400/80 uppercase tracking-wider ml-1">Frequency (Email)</label>
                <input 
                  type="email" 
                  name="email" 
                  id="email"
                  required
                  placeholder="john@example.com"
                  className="w-full bg-black/70 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-xs font-orbitron text-pink-400/80 uppercase tracking-wider ml-1">Data Packet</label>
              <textarea 
                name="message" 
                id="message"
                required
                rows={4}
                placeholder="Enter your message here..."
                className="w-full bg-black/70 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all resize-none"
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={status === 'submitting'}
              className="w-full group relative overflow-hidden rounded-lg bg-pink-600/10 border border-pink-500/50 px-8 py-4 text-center transition-all hover:bg-pink-600/20 hover:border-pink-400"
            >
               <span className="relative z-10 flex items-center justify-center gap-2 font-orbitron text-pink-400 group-hover:text-pink-300 uppercase tracking-widest text-sm">
                  {status === 'submitting' ? 'Transmitting...' : 'Initialize Upload'}
                  {!status.includes('submitting') && (
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  )}
               </span>
               <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-pink-500/10 to-transparent group-hover:animate-shimmer"></div>
            </button>
            {status === 'error' && (
              <p className="text-center text-red-400 text-xs mt-2">Transmission Failed. Please check your config.</p>
            )}
          </form>
        )}
      </div>
    </div>
  )
}
