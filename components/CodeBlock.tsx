"use client";

import React, { useState } from 'react';
import { useLang } from './LangProvider';

export function CodeBlock({ children, className }: { children: string; className?: string }) {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Extract filename if provided in className (e.g. language-csharp:ObstacleSpawner.cs)
  let language = '';
  let filename = '';
  if (className) {
    const match = className.match(/language-(\w+)(?::(.+))?/);
    if (match) {
      language = match[1];
      if (match[2]) filename = match[2];
    }
  }

  // Generate simple syntax highlighting for C# as specified in the palette
  // This is a naive syntax highlighter just to match the visual spec for the prototype.
  const highlightCode = (code: string) => {
    const lines = code.split('\n');
    if (lines[lines.length - 1] === '') lines.pop(); // Remove trailing empty line from codeblocks

    return lines.map((line, i) => {
      // Very naive regex highlighting. In a real project, use prismjs or shiki.
      // keyword, string, function, type, number, comment
      let highlighted = line
        .replace(/(\/\/.+)/g, '<span class="text-[var(--color-syntax-comment)]">$1</span>')
        .replace(/(["'].*?["'])/g, '<span class="text-[var(--color-syntax-string)]">$1</span>')
        .replace(/\b(public|private|protected|internal|static|async|await|var|class|struct|interface|enum|return|if|else|for|foreach|while|switch|case|break|continue|new|null|true|false)\b/g, '<span class="text-[var(--color-syntax-keyword)]">$1</span>')
        .replace(/\b([A-Z][a-zA-Z0-9_]*)(?=\s*<|\s*\()/g, '<span class="text-[var(--color-syntax-function)]">$1</span>')
        .replace(/\b([A-Z][a-zA-Z0-9_]*)\b/g, '<span class="text-[var(--color-syntax-type)]">$1</span>')
        .replace(/\b(\d+)\b/g, '<span class="text-[var(--color-syntax-number)]">$1</span>');

      return (
        <div key={i} className="min-h-[1.9em] whitespace-pre">
          <span dangerouslySetInnerHTML={{ __html: highlighted }} />
        </div>
      );
    });
  };

  return (
    <div className="rounded-[12px] border border-[var(--color-border-hairline)] overflow-hidden bg-[#0E1311] my-[24px]">
      <div className="flex justify-between items-center px-[16px] py-[10px] bg-[#111614] border-b border-[var(--color-border-hairline)]">
        <div className="font-mono text-[11px] text-[var(--color-text-dim)]">
          {filename || language || 'code'}
        </div>
        <button 
          onClick={handleCopy}
          className="flex items-center gap-[6px] font-mono text-[10px] text-[var(--color-text-faint)] border border-[var(--color-border-subtle)] rounded-[6px] px-[10px] py-[4px] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
        >
          {copied ? 'COPIED ✓' : `⧉ ${t.copyCode}`}
        </button>
      </div>
      <div className="grid grid-cols-[44px_1fr] font-mono text-[13.5px] leading-[1.9] py-[16px]">
        <div className="text-right pr-[16px] text-[var(--color-text-ghost)] border-r border-[var(--color-bg-raised)] select-none">
          {children.split('\n').map((_, i, arr) => (i === arr.length - 1 && arr[i] === '' ? null : <div key={i}>{i + 1}</div>))}
        </div>
        <div className="pl-[18px] text-[var(--color-syntax-plain)] overflow-x-auto min-w-0 pb-[8px]">
          {highlightCode(children)}
        </div>
      </div>
    </div>
  );
}
