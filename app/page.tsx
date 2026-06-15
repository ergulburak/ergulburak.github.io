import { TerminalHero } from '@/components/TerminalHero';
import { CtaRow } from '@/components/CtaRow';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-10 sm:py-[80px] px-4 sm:px-[36px] gap-[34px] w-full">
      <TerminalHero />
      <CtaRow />
      <div className="font-mono text-[11px] text-[var(--color-text-ghost)]">
        press ⌘K to search
      </div>
    </div>
  );
}
