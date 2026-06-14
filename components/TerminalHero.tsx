"use client";

import React, { useEffect, useState } from 'react';
import { useLang } from './LangProvider';

export function TerminalHero() {
  const { t } = useLang();
  
  const line1 = "whoami";
  const line2 = t.whoami1;
  const line3 = "cat expertise.txt";
  const line4 = `Unity · C# · ${t.whoami2}`;

  const [stage, setStage] = useState(0); 
  const [typed1, setTyped1] = useState('');
  const [typed3, setTyped3] = useState('');

  useEffect(() => {
    // Check reduced motion
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setTyped1(line1);
      setTyped3(line3);
      setStage(4);
      return;
    }

    let current1 = '';
    let current3 = '';
    let timeout: NodeJS.Timeout;

    const typeLine1 = () => {
      if (current1.length < line1.length) {
        current1 += line1[current1.length];
        setTyped1(current1);
        timeout = setTimeout(typeLine1, 45);
      } else {
        setStage(1);
        timeout = setTimeout(() => {
          setStage(2);
          typeLine3();
        }, 300);
      }
    };

    const typeLine3 = () => {
      if (current3.length < line3.length) {
        current3 += line3[current3.length];
        setTyped3(current3);
        timeout = setTimeout(typeLine3, 45);
      } else {
        setStage(3);
        timeout = setTimeout(() => {
          setStage(4);
        }, 300);
      }
    };

    // Start
    timeout = setTimeout(typeLine1, 400);

    return () => clearTimeout(timeout);
  }, [t.whoami1, t.whoami2]); // Re-run when lang changes? Or just instant since we already viewed it.
  
  // If we change lang after typing, just show instant
  useEffect(() => {
    if (stage === 4) {
      setTyped1(line1);
      setTyped3(line3);
    }
  }, [t, stage, line1, line3]);

  return (
    <div className="w-full max-w-[720px] rounded-[12px] border border-[var(--color-border)] bg-[#0E1311] shadow-[0_30px_80px_rgba(0,0,0,0.5)] overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center gap-[8px] p-[12px_16px] border-b border-[var(--color-border-hairline)] bg-[var(--color-bg-panel)]">
        <div className="w-[11px] h-[11px] rounded-full bg-[#2A332E]"></div>
        <div className="w-[11px] h-[11px] rounded-full bg-[#2A332E]"></div>
        <div className="w-[11px] h-[11px] rounded-full bg-[#2A332E]"></div>
        <div className="ml-[10px] font-mono text-[11px] text-[var(--color-text-faint)]">
          burak@portfolio — zsh
        </div>
      </div>

      {/* Body */}
      <div className="p-[26px_30px] font-mono text-[14.5px] leading-[2.1]">
        <div>
          <span className="text-[var(--color-accent)]">$ </span>
          <span className="text-[var(--color-text-primary)]">{typed1}</span>
          {stage === 0 && <span className="text-[var(--color-attention)] animate-blink">▊</span>}
        </div>
        
        {stage >= 1 && (
          <div className="text-[var(--color-text-body-dim)]">{line2}</div>
        )}
        
        {stage >= 2 && (
          <div>
            <span className="text-[var(--color-accent)]">$ </span>
            <span className="text-[var(--color-text-primary)]">{typed3}</span>
            {stage === 2 && <span className="text-[var(--color-attention)] animate-blink">▊</span>}
          </div>
        )}

        {stage >= 3 && (
          <div className="text-[var(--color-text-body-dim)]">{line4}</div>
        )}

        {stage >= 4 && (
          <div>
            <span className="text-[var(--color-accent)]">$ </span>
            <span className="text-[var(--color-attention)] animate-blink">▊</span>
          </div>
        )}
      </div>
    </div>
  );
}
