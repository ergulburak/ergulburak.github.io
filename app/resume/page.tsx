"use client";

import React from 'react';
import { useLang } from '@/components/LangProvider';
import { Timeline } from '@/components/Timeline';
import { StackGrid } from '@/components/StackGrid';

export default function ResumePage() {
  const { t } = useLang();

  return (
    <div className="w-full max-w-[860px] flex flex-col gap-[36px] py-[52px] px-[36px] pb-[64px]">
      {/* Header */}
      <div className="flex justify-between items-end gap-[20px] flex-wrap">
        <div className="flex flex-col gap-[6px]">
          <h1 className="font-sans text-[38px] font-bold m-0 leading-none">
            Burak Ergül
          </h1>
          <div className="font-mono text-[13px] text-[var(--color-accent)]">
            {t.role}
          </div>
          <div className="font-mono text-[11px] text-[var(--color-text-faint)]">
            ANKARA, TR · ergulburak@proton.me · github.com/ergulburak
          </div>
        </div>
        <a
          href="https://github.com/ergulburak"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[12px] font-bold text-[#0B0F0D] bg-[var(--color-attention)] rounded-[8px] px-[22px] py-[11px] hover:bg-[#fcd34d] transition-colors cursor-pointer"
        >
          ↗ {t.downloadCv}
        </a>
      </div>

      <Timeline />
      
      <StackGrid />
    </div>
  );
}
