"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLang } from '@/components/LangProvider';
import { useEffect } from 'react';

export function Navbar() {
  const pathname = usePathname();
  const { lang, setLang, t } = useLang();

  // Create path crumb array
  const segments = pathname.split('/').filter(Boolean);
  
  // Open command palette when cmd+k or ctrl+k is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('toggle-command-palette'));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <nav className="flex flex-col sm:flex-row justify-between items-center py-4 sm:py-[18px] px-4 sm:px-9 border-b border-[var(--color-border-hairline)] w-full max-w-[1380px] mx-auto gap-4 sm:gap-0">
      {/* Path Crumb */}
      <div className="font-mono text-[13px] text-[var(--color-accent)] flex items-center w-full sm:w-auto justify-center sm:justify-start">
        <span>~/burak</span>
        {segments.map((segment, idx) => {
          const isSlug = segments[0] === 'blog' && idx === 1;
          return (
            <span key={idx} className="flex items-center">
              <span>/</span>
              <span className={isSlug ? "text-[var(--color-text-dim)]" : ""}>{segment}</span>
            </span>
          );
        })}
      </div>

      {/* Nav Links */}
      <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-[26px] font-mono text-[12px]">
        <Link 
          href="/" 
          className={pathname === '/' ? "text-[var(--color-text-primary)] border-b border-[var(--color-accent)] pb-[2px]" : "text-[var(--color-text-faint)] hover:text-[var(--color-text-primary)] transition-colors"}
        >
          {t.navHome}
        </Link>
        <Link 
          href="/blog" 
          className={pathname.startsWith('/blog') ? "text-[var(--color-text-primary)] border-b border-[var(--color-accent)] pb-[2px]" : "text-[var(--color-text-faint)] hover:text-[var(--color-text-primary)] transition-colors"}
        >
          {t.navBlog}
        </Link>
        <Link 
          href="/resume" 
          className={pathname.startsWith('/resume') ? "text-[var(--color-text-primary)] border-b border-[var(--color-accent)] pb-[2px]" : "text-[var(--color-text-faint)] hover:text-[var(--color-text-primary)] transition-colors"}
        >
          {t.navResume}
        </Link>

        {/* Cmd+K Chip */}
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent('toggle-command-palette'))}
          className="text-[var(--color-text-faint)] border border-[var(--color-border-subtle)] rounded-[6px] py-[3px] px-[9px] hover:text-[var(--color-text-primary)] hover:border-[var(--color-accent)] transition-colors"
        >
          ⌘K
        </button>

        {/* Lang Toggle */}
        <div className="text-[var(--color-text-faint)] cursor-pointer flex font-mono select-none">
          <span 
            onClick={() => setLang('en')}
            className={lang === 'en' ? 'text-[var(--color-text-primary)]' : 'hover:text-[var(--color-text-primary)] transition-colors'}
          >
            EN
          </span>
          <span className="text-[var(--color-accent)]">/</span>
          <span 
            onClick={() => setLang('tr')}
            className={lang === 'tr' ? 'text-[var(--color-text-primary)]' : 'hover:text-[var(--color-text-primary)] transition-colors'}
          >
            TR
          </span>
        </div>
      </div>
    </nav>
  );
}
