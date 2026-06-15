"use client";

import React from 'react';
import { useLang } from './LangProvider';

export function StackGrid() {
  const { t } = useLang();

  return (
    <div className="flex flex-col gap-[16px]">
      <div className="font-mono text-[11px] tracking-[3px] text-[var(--color-text-faint)] uppercase">
        {t.stack}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr] gap-[12px]">
        {/* ENGINE */}
        <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border)] rounded-[10px] p-[16px_18px] flex flex-col gap-[8px]">
          <div className="font-mono text-[10px] tracking-[2px] text-[var(--color-accent)]">ENGINE</div>
          <div className="flex gap-[6px] flex-wrap">
            <span className="font-mono text-[11px] text-[var(--color-syntax-plain)] bg-[var(--color-bg-editor)] rounded-[6px] px-[10px] py-[4px]">Unity</span>
            <span className="font-mono text-[11px] text-[var(--color-syntax-plain)] bg-[var(--color-bg-editor)] rounded-[6px] px-[10px] py-[4px]">DOTS</span>
            <span className="font-mono text-[11px] text-[var(--color-syntax-plain)] bg-[var(--color-bg-editor)] rounded-[6px] px-[10px] py-[4px]">Netcode</span>
            <span className="font-mono text-[11px] text-[var(--color-syntax-plain)] bg-[var(--color-bg-editor)] rounded-[6px] px-[10px] py-[4px]">Burst</span>
          </div>
        </div>
        
        {/* LANGUAGE */}
        <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border)] rounded-[10px] p-[16px_18px] flex flex-col gap-[8px]">
          <div className="font-mono text-[10px] tracking-[2px] text-[var(--color-accent)]">LANGUAGE</div>
          <div className="flex gap-[6px] flex-wrap">
            <span className="font-mono text-[11px] text-[var(--color-syntax-plain)] bg-[var(--color-bg-editor)] rounded-[6px] px-[10px] py-[4px]">C#</span>
            <span className="font-mono text-[11px] text-[var(--color-syntax-plain)] bg-[var(--color-bg-editor)] rounded-[6px] px-[10px] py-[4px]">SOLID</span>
            <span className="font-mono text-[11px] text-[var(--color-syntax-plain)] bg-[var(--color-bg-editor)] rounded-[6px] px-[10px] py-[4px]">Flutter/Dart</span>
          </div>
        </div>

        {/* TOOLS */}
        <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border)] rounded-[10px] p-[16px_18px] flex flex-col gap-[8px]">
          <div className="font-mono text-[10px] tracking-[2px] text-[var(--color-accent)]">TOOLS</div>
          <div className="flex gap-[6px] flex-wrap">
            <span className="font-mono text-[11px] text-[var(--color-syntax-plain)] bg-[var(--color-bg-editor)] rounded-[6px] px-[10px] py-[4px]">Git</span>
            <span className="font-mono text-[11px] text-[var(--color-syntax-plain)] bg-[var(--color-bg-editor)] rounded-[6px] px-[10px] py-[4px]">Blender</span>
            <span className="font-mono text-[11px] text-[var(--color-syntax-plain)] bg-[var(--color-bg-editor)] rounded-[6px] px-[10px] py-[4px]">Photoshop + JSX</span>
          </div>
        </div>
      </div>
    </div>
  );
}
