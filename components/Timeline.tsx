"use client";

import React from 'react';
import { useLang } from './LangProvider';

export function Timeline() {
  const { t } = useLang();

  return (
    <div className="flex flex-col">
      <div className="font-mono text-[11px] tracking-[3px] text-[var(--color-text-faint)] pb-[18px] uppercase">
        {t.experience}
      </div>

      <div className="grid grid-cols-[170px_28px_1fr]">
        
        {/* Node 1: Marker Games */}
        <div className="font-mono text-[12px] text-[var(--color-attention)] text-right p-[2px_14px_36px_0]">
          2021 — {t.now}
        </div>
        <div className="relative">
          <div className="absolute left-1/2 top-[4px] -translate-x-1/2 w-[11px] h-[11px] rounded-full bg-[var(--color-attention)] shadow-[0_0_10px_rgba(251,191,36,0.7)]"></div>
          <div className="absolute left-1/2 top-[18px] bottom-0 -translate-x-1/2 w-[2px] bg-[var(--color-border)]"></div>
        </div>
        <div className="p-[0_0_36px_14px] flex flex-col gap-[8px]">
          <div className="flex items-baseline gap-[12px]">
            <div className="font-sans text-[20px] font-semibold text-[var(--color-text-primary)]">Marker Games</div>
            <div className="font-mono text-[11px] text-[var(--color-accent)]">{t.markerRole}</div>
          </div>
          <ul className="m-0 pl-[18px] list-disc text-[14.5px] text-[var(--color-text-body-dim)] leading-[1.75]">
            <li>{t.marker1}</li>
            <li>{t.marker2}</li>
            <li>{t.marker3}</li>
          </ul>
        </div>

        {/* Node 2: Patika.dev */}
        <div className="font-mono text-[12px] text-[var(--color-text-faint)] text-right p-[2px_14px_36px_0]">
          — · —
        </div>
        <div className="relative">
          <div className="absolute left-1/2 top-[4px] -translate-x-1/2 w-[9px] h-[9px] rounded-full bg-[var(--color-accent)]"></div>
          <div className="absolute left-1/2 top-[16px] bottom-0 -translate-x-1/2 w-[2px] bg-[var(--color-border)]"></div>
        </div>
        <div className="p-[0_0_36px_14px] flex flex-col gap-[6px]">
          <div className="flex items-baseline gap-[12px]">
            <div className="font-sans text-[20px] font-semibold text-[var(--color-text-primary)]">Patika.dev</div>
            <div className="font-mono text-[11px] text-[var(--color-accent)]">Rollic & oFON Hyper-Casual Bootcamp</div>
          </div>
          <div className="text-[14.5px] text-[var(--color-text-body-dim)] leading-[1.7]">
            {t.patikaDesc}
          </div>
        </div>

        {/* Node 3: Escreat Technology */}
        <div className="font-mono text-[12px] text-[var(--color-text-faint)] text-right p-[2px_14px_36px_0]">
          — · —
        </div>
        <div className="relative">
          <div className="absolute left-1/2 top-[4px] -translate-x-1/2 w-[9px] h-[9px] rounded-full bg-[var(--color-accent)]"></div>
          <div className="absolute left-1/2 top-[16px] bottom-0 -translate-x-1/2 w-[2px] bg-[var(--color-border)]"></div>
        </div>
        <div className="p-[0_0_36px_14px] flex flex-col gap-[6px]">
          <div className="flex items-baseline gap-[12px]">
            <div className="font-sans text-[20px] font-semibold text-[var(--color-text-primary)]">Escreat Technology</div>
            <div className="font-mono text-[11px] text-[var(--color-accent)]">{t.escreatRole}</div>
          </div>
          <div className="text-[14.5px] text-[var(--color-text-faint)] leading-[1.7]">
            —
          </div>
        </div>

        {/* Node 4: Umay Yazılım */}
        <div className="font-mono text-[12px] text-[var(--color-text-faint)] text-right p-[2px_14px_36px_0]">
          — · —
        </div>
        <div className="relative">
          <div className="absolute left-1/2 top-[4px] -translate-x-1/2 w-[9px] h-[9px] rounded-full bg-[var(--color-accent)]"></div>
          <div className="absolute left-1/2 top-[16px] bottom-0 -translate-x-1/2 w-[2px] bg-[var(--color-border)]"></div>
        </div>
        <div className="p-[0_0_36px_14px] flex flex-col gap-[6px]">
          <div className="flex items-baseline gap-[12px]">
            <div className="font-sans text-[20px] font-semibold text-[var(--color-text-primary)]">Umay Yazılım · Freelance</div>
            <div className="font-mono text-[11px] text-[var(--color-accent)]">{t.umayRole}</div>
          </div>
          <div className="text-[14.5px] text-[var(--color-text-body-dim)] leading-[1.7]">
            {t.umayDesc}
          </div>
        </div>

        {/* Node 5: İnönü Üniversitesi */}
        <div className="font-mono text-[12px] text-[var(--color-text-faint)] text-right p-[2px_14px_0_0]">
          2016 — 2021
        </div>
        <div className="relative">
          <div className="absolute left-1/2 top-[4px] -translate-x-1/2 w-[9px] h-[9px] rounded-full border-[2px] border-[var(--color-accent)] bg-[#0B0F0D]"></div>
          {/* No connector below */}
        </div>
        <div className="p-[0_0_0_14px] flex flex-col gap-[6px]">
          <div className="flex items-baseline gap-[12px]">
            <div className="font-sans text-[20px] font-semibold text-[var(--color-text-primary)]">İnönü Üniversitesi</div>
            <div className="font-mono text-[11px] text-[var(--color-accent)]">{t.eduRole}</div>
          </div>
          <div className="text-[14.5px] text-[var(--color-text-body-dim)] leading-[1.7]">
            {t.eduDesc}
          </div>
        </div>

      </div>
    </div>
  );
}
