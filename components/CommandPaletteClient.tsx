"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { PostMeta } from '@/lib/posts';
import { useLang } from './LangProvider';

interface Props {
  posts: PostMeta[];
}

const STATIC_PAGES = [
  { path: '/', label: 'Home' },
  { path: '/blog', label: 'Blog' },
  { path: '/resume', label: 'Resume' },
];

export function CommandPaletteClient({ posts }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { t, lang } = useLang();

  useEffect(() => {
    const handleToggle = () => setIsOpen(prev => !prev);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('toggle-command-palette', handleToggle);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('toggle-command-palette', handleToggle);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSearch('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const query = search.toLowerCase();
  
  const filteredPosts = posts.filter(p => {
    const titleToMatch = p.title[lang] || p.title.tr;
    return titleToMatch.toLowerCase().includes(query) || 
           p.tags.some(tag => tag.toLowerCase().includes(query))
  });

  const filteredPages = STATIC_PAGES.filter(p => 
    p.path.toLowerCase().includes(query) || 
    p.label.toLowerCase().includes(query)
  );

  const totalResults = filteredPosts.length + filteredPages.length;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => (i + 1) % totalResults);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => (i - 1 + totalResults) % totalResults);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (totalResults === 0) return;
      if (selectedIndex < filteredPosts.length) {
        router.push(`/blog/${filteredPosts[selectedIndex].slug}`);
      } else {
        router.push(filteredPages[selectedIndex - filteredPosts.length].path);
      }
      setIsOpen(false);
    }
  };

  // Basic highlighter component
  const Highlight = ({ text }: { text: string }) => {
    if (!query) return <span>{text}</span>;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === query ? <span key={i} className="text-[var(--color-accent)]">{part}</span> : <span key={i}>{part}</span>
        )}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center pt-[20px] sm:pt-[70px] px-4 sm:px-0">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[rgba(2,4,5,0.55)] backdrop-blur-[3px]" 
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Palette */}
      <div className="relative w-full max-w-[580px] bg-[#0E1311] border border-[var(--color-border-subtle)] rounded-[14px] shadow-[0_40px_120px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[calc(100dvh-60px)] sm:max-h-[80vh]">
        
        {/* Input */}
        <div className="flex items-center gap-[12px] p-[16px_20px] border-b border-[var(--color-border-hairline)]">
          <span className="font-mono text-[15px] text-[var(--color-accent)]">&gt;</span>
          <div className="relative flex-1 flex items-center font-mono text-[14px] text-[var(--color-text-primary)]">
            <input 
              id="command-palette-search"
              name="command-palette-search"
              type="text"
              autoComplete="off"
              ref={inputRef}
              value={search}
              onChange={e => { setSearch(e.target.value); setSelectedIndex(0); }}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent outline-none caret-[var(--color-attention)]"
              autoFocus
              placeholder="Search..."
            />
          </div>
          <span className="hidden sm:inline-block font-mono text-[10px] text-[var(--color-text-faint)] border border-[var(--color-border-subtle)] rounded-[5px] px-[8px] py-[2px]">
            ESC
          </span>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-[10px_8px] flex flex-col gap-[2px]">
          {filteredPosts.length > 0 && (
            <>
              <div className="font-mono text-[9px] tracking-[2px] text-[var(--color-text-faint)] p-[8px_14px_4px]">
                {t.palettePosts}
              </div>
              {filteredPosts.map((post, i) => {
                const isSelected = selectedIndex === i;
                const displayTitle = post.title[lang] || post.title.tr;
                return (
                  <div 
                    key={post.slug}
                    onClick={() => { router.push(`/blog/${post.slug}`); setIsOpen(false); }}
                    className={`flex flex-col sm:flex-row sm:justify-between sm:items-center p-[11px_14px] rounded-[8px] cursor-pointer gap-1 sm:gap-0 ${
                      isSelected ? 'bg-[rgba(52,211,153,0.1)] border border-[rgba(52,211,153,0.3)]' : 'border border-transparent hover:bg-[#111614]'
                    }`}
                  >
                    <div className="flex items-start sm:items-center gap-[10px]">
                      <span className={`hidden sm:inline-block font-mono text-[11px] mt-1 sm:mt-0 ${isSelected ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-ghost)]'}`}>
                        ▸
                      </span>
                      <span className={`font-sans text-[14.5px] leading-snug ${isSelected ? 'font-semibold text-[var(--color-text-primary)]' : 'text-[var(--color-text-dim)]'}`}>
                        <Highlight text={displayTitle} />
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-[var(--color-text-ghost)] ml-0 sm:ml-2">
                      {post.date}
                    </span>
                  </div>
                );
              })}
            </>
          )}

          {filteredPages.length > 0 && (
            <>
              <div className="font-mono text-[9px] tracking-[2px] text-[var(--color-text-faint)] p-[10px_14px_4px]">
                {t.palettePages}
              </div>
              {filteredPages.map((page, i) => {
                const actualIndex = i + filteredPosts.length;
                const isSelected = selectedIndex === actualIndex;
                return (
                  <div 
                    key={page.path}
                    onClick={() => { router.push(page.path); setIsOpen(false); }}
                    className={`flex justify-between items-center p-[11px_14px] rounded-[8px] cursor-pointer ${
                      isSelected ? 'bg-[rgba(52,211,153,0.1)] border border-[rgba(52,211,153,0.3)]' : 'border border-transparent hover:bg-[#111614]'
                    }`}
                  >
                    <div className="flex items-center gap-[10px]">
                      <span className={`hidden sm:inline-block font-mono text-[11px] ${isSelected ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-ghost)]'}`}>
                        →
                      </span>
                      <span className="font-mono text-[13px] text-[var(--color-text-dim)]">
                        <Highlight text={page.path} />
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-[var(--color-text-ghost)]">
                      {t.paletteGo}
                    </span>
                  </div>
                );
              })}
            </>
          )}

          {totalResults === 0 && (
            <div className="p-[20px] text-center font-mono text-[12px] text-[var(--color-text-faint)]">
              No results found
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="hidden sm:flex gap-[18px] p-[12px_20px] border-t border-[var(--color-border-hairline)] bg-[#0B100D] font-mono text-[10px] text-[var(--color-text-faint)]">
          <span>↑↓ {t.paletteNav}</span>
          <span>↵ {t.paletteOpen}</span>
          <span>ESC {t.paletteClose}</span>
        </div>
      </div>
    </div>
  );
}
