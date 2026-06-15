"use client";

import React from 'react';
import { useLang } from '@/components/LangProvider';
import { Timeline } from '@/components/Timeline';
import { StackGrid } from '@/components/StackGrid';

export default function ResumePage() {
  const { t } = useLang();

  return (
    <div className="w-full max-w-[860px] flex flex-col gap-[24px] sm:gap-[36px] py-[30px] sm:py-[52px] px-4 sm:px-[36px] pb-[64px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-[24px] sm:gap-[20px] mb-2 sm:mb-0">
        <div className="flex flex-col gap-[8px]">
          <h1 className="font-sans text-[34px] sm:text-[38px] font-bold m-0 leading-none tracking-tight">
            Burak Ergül
          </h1>
          <div className="font-mono text-[13px] sm:text-[14px] text-[var(--color-accent)] font-medium">
            {t.role}
          </div>
          <div className="flex flex-col sm:flex-row gap-[6px] sm:gap-3 font-mono text-[11.5px] text-[var(--color-text-faint)] mt-1">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[var(--color-attention)]"></span> ANKARA, TR</span>
            <span className="hidden sm:inline">·</span>
            <a href="mailto:ergulburak@proton.me" className="hover:text-[var(--color-text-primary)] transition-colors">ergulburak@proton.me</a>
            <span className="hidden sm:inline">·</span>
            <a href="https://github.com/ergulburak" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-text-primary)] transition-colors">github.com/ergulburak</a>
          </div>
        </div>
        <a
          href="https://github.com/ergulburak"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto text-center font-mono text-[13px] font-bold text-[#0B0F0D] bg-[var(--color-attention)] rounded-[8px] px-[24px] py-[14px] sm:py-[11px] shadow-[0_0_24px_rgba(251,191,36,0.25)] hover:bg-[#fcd34d] hover:shadow-[0_0_32px_rgba(251,191,36,0.4)] transition-all cursor-pointer"
        >
          ↗ {t.downloadCv}
        </a>
      </div>

      <Timeline />
      
      <StackGrid />
    </div>
  );
}
