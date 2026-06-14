"use client";

import Link from 'next/link';
import { useLang } from './LangProvider';

export function CtaRow() {
  const { t } = useLang();

  return (
    <div className="flex gap-[16px]">
      <Link 
        href="/blog"
        className="font-mono text-[14px] font-bold tracking-[1px] text-[#0B0F0D] bg-[var(--color-accent)] rounded-[8px] p-[14px_30px] shadow-[0_0_28px_rgba(52,211,153,0.3)] hover:bg-[#5EEAD4] transition-colors"
      >
        [ {t.readBlog} ]
      </Link>
      <Link 
        href="/resume"
        className="font-mono text-[14px] font-bold tracking-[1px] text-[var(--color-accent)] border border-[var(--color-accent)] rounded-[8px] p-[14px_30px] hover:bg-[rgba(52,211,153,0.1)] transition-colors"
      >
        [ {t.viewResume} ]
      </Link>
    </div>
  );
}
