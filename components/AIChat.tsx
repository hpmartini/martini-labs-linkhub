
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { getGeminiResponse } from '../services/gemini';
import { useTheme } from '../themes/ThemeContext';
import { WELCOME_MESSAGE } from '../constants';

// Simple markdown renderer for chat messages
const renderMarkdown = (text: string): React.ReactNode => {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];
  let listKey = 0;

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${listKey++}`} className="list-disc list-inside space-y-1 my-2">
          {currentList.map((item, i) => (
            <li key={i}>{formatInlineMarkdown(item)}</li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  const formatInlineMarkdown = (line: string): React.ReactNode => {
    // Handle bold and italic
    const parts: React.ReactNode[] = [];
    let remaining = line;
    let partKey = 0;

    while (remaining.length > 0) {
      // Bold: **text**
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
      // Italic: *text*
      const italicMatch = remaining.match(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/);

      if (boldMatch && (!italicMatch || boldMatch.index! <= italicMatch.index!)) {
        if (boldMatch.index! > 0) {
          parts.push(<span key={partKey++}>{remaining.slice(0, boldMatch.index)}</span>);
        }
        parts.push(<strong key={partKey++} className="font-semibold">{boldMatch[1]}</strong>);
        remaining = remaining.slice(boldMatch.index! + boldMatch[0].length);
      } else if (italicMatch) {
        if (italicMatch.index! > 0) {
          parts.push(<span key={partKey++}>{remaining.slice(0, italicMatch.index)}</span>);
        }
        parts.push(<em key={partKey++}>{italicMatch[1]}</em>);
        remaining = remaining.slice(italicMatch.index! + italicMatch[0].length);
      } else {
        parts.push(<span key={partKey++}>{remaining}</span>);
        break;
      }
    }

    return parts.length === 1 ? parts[0] : <>{parts}</>;
  };

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();

    // Bullet points (- or • or *)
    if (/^[-•*]\s+/.test(trimmedLine)) {
      currentList.push(trimmedLine.replace(/^[-•*]\s+/, ''));
      return;
    }

    // Flush any pending list
    flushList();

    // Empty line = paragraph break
    if (trimmedLine === '') {
      elements.push(<div key={`br-${index}`} className="h-2" />);
      return;
    }

    // Regular paragraph
    elements.push(
      <p key={`p-${index}`} className="leading-relaxed">
        {formatInlineMarkdown(trimmedLine)}
      </p>
    );
  });

  // Flush any remaining list
  flushList();

  return <div className="space-y-1">{elements}</div>;
};

export const AIChat: React.FC = () => {
  const theme = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: WELCOME_MESSAGE }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await getGeminiResponse([...messages, userMsg]);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  const cardBg = theme.isDark ? 'glass' : 'bg-white';

  return (
    <div className="w-full mt-4 animate-slide-up">
      <div
        className={`${cardBg} overflow-hidden`}
        style={{
          borderRadius: theme.borderRadius.xl,
          border: `1px solid rgba(${theme.colors.primaryRgb}, ${theme.isDark ? 0.3 : 0.2})`,
          boxShadow: theme.shadows.card,
        }}
      >
        <div
          className="p-3 flex items-center justify-between"
          style={{
            backgroundColor: `rgba(${theme.colors.primaryRgb}, ${theme.isDark ? 0.2 : 0.05})`,
            borderBottom: `1px solid rgba(${theme.colors.primaryRgb}, 0.2)`,
          }}
        >
          <span
            className="text-xs tracking-widest uppercase"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary }}
          >
            {theme.isDark ? 'Neural Interface Active' : 'Chat Assistant'}
          </span>
          {theme.isDark && (
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_5px_red]"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
          )}
        </div>

        <div
          ref={scrollRef}
          className="h-64 overflow-y-auto p-4 space-y-4"
          style={{ backgroundColor: theme.isDark ? 'transparent' : theme.colors.backgroundAlt }}
        >
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className="max-w-[85%] p-3 text-sm"
                style={{
                  borderRadius: theme.borderRadius.lg,
                  backgroundColor: msg.role === 'user'
                    ? `rgba(${theme.colors.primaryRgb}, ${theme.isDark ? 0.2 : 0.1})`
                    : theme.isDark ? 'rgba(39, 39, 42, 0.5)' : 'white',
                  color: msg.role === 'user'
                    ? theme.isDark ? '#f0fdfa' : theme.colors.text
                    : theme.isDark ? '#d4d4d8' : theme.colors.text,
                  border: `1px solid ${msg.role === 'user'
                    ? `rgba(${theme.colors.primaryRgb}, 0.3)`
                    : theme.isDark ? '#3f3f46' : theme.colors.border}`,
                }}
              >
                {msg.role === 'assistant' ? renderMarkdown(msg.content) : msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div
                className="p-3 flex gap-1 items-center"
                style={{
                  borderRadius: theme.borderRadius.lg,
                  backgroundColor: theme.isDark ? 'rgba(39, 39, 42, 0.5)' : 'white',
                  border: `1px solid ${theme.isDark ? '#3f3f46' : theme.colors.border}`,
                }}
              >
                <div className="w-1 h-1 rounded-full animate-bounce" style={{ backgroundColor: theme.colors.primary }}></div>
                <div className="w-1 h-1 rounded-full animate-bounce [animation-delay:-.3s]" style={{ backgroundColor: theme.colors.primary }}></div>
                <div className="w-1 h-1 rounded-full animate-bounce [animation-delay:-.5s]" style={{ backgroundColor: theme.colors.primary }}></div>
              </div>
            </div>
          )}
        </div>

        <div
          className="p-4 flex gap-2"
          style={{
            backgroundColor: theme.isDark ? 'rgba(0, 0, 0, 0.7)' : theme.colors.backgroundAlt,
            borderTop: `1px solid ${theme.isDark ? '#27272a' : theme.colors.border}`,
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 text-sm focus:outline-none"
            style={{
              borderRadius: theme.borderRadius.md,
              backgroundColor: theme.isDark ? '#18181b' : 'white',
              border: `1px solid ${theme.colors.borderInput}`,
              color: theme.colors.text,
              transition: theme.transitions.default,
            }}
            onFocus={(e) => e.target.style.borderColor = `rgba(${theme.colors.primaryRgb}, 0.5)`}
            onBlur={(e) => e.target.style.borderColor = theme.colors.borderInput}
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="p-2 disabled:opacity-50"
            style={{
              borderRadius: theme.borderRadius.md,
              backgroundColor: theme.colors.primary,
              color: 'white',
              boxShadow: theme.shadows.button,
              transition: theme.transitions.default,
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.colors.buttonPrimaryHover}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.colors.primary}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
      <p className="mt-2 text-[10px] text-center italic" style={{ color: theme.colors.textMuted }}>
        * Powered by Martini Labs AI (Gemini 3 Flash). Not all responses are generated by the physical Hans-Peter.
      </p>
    </div>
  );
};
