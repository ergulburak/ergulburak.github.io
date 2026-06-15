"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { PostMeta } from '@/lib/posts';
import { useLang } from './LangProvider';

export function BlogClient({ posts }: { posts: PostMeta[] }) {
  const { t, lang } = useLang();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = Array.from(new Set(posts.flatMap(p => p.tags))).sort();

  const filteredPosts = activeTag 
    ? posts.filter(p => p.tags.includes(activeTag))
    : posts;

  // Pagination could be added here if needed, but for now we list all filtered
  return (
    <div className="w-full max-w-[860px] flex flex-col gap-[26px] py-[30px] sm:py-[48px] px-4 sm:px-[36px] pb-[60px]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-baseline gap-2 sm:gap-0">
        <h1 className="font-sans text-[32px] sm:text-[38px] font-bold m-0 leading-none">
          blog<span className="text-[var(--color-accent)]">/</span>
        </h1>
        <div className="font-mono text-[12px] text-[var(--color-text-faint)]">
          {posts.length} {t.posts} · <a href="/rss.xml" className="hover:text-[var(--color-text-primary)]">RSS</a>
        </div>
      </div>

      {/* Tags */}
      <div className="flex gap-[8px] flex-wrap">
        <button
          onClick={() => setActiveTag(null)}
          className={`font-mono text-[11px] rounded-[99px] px-[14px] py-[5px] transition-colors border ${
            activeTag === null 
              ? 'bg-[var(--color-accent)] text-[#0B0F0D] border-[var(--color-accent)]' 
              : 'border-[var(--color-border-subtle)] text-[var(--color-text-dim)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]'
          }`}
        >
          {t.allTag}
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`font-mono text-[11px] rounded-[99px] px-[14px] py-[5px] transition-colors border ${
              activeTag === tag
                ? 'bg-[var(--color-accent)] text-[#0B0F0D] border-[var(--color-accent)]' 
                : 'border-[var(--color-border-subtle)] text-[var(--color-text-dim)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]'
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>

      {/* Posts List */}
      <div className="flex flex-col gap-4 sm:gap-0">
        {filteredPosts.map(post => (
          <Link 
            key={post.slug} 
            href={`/blog/${post.slug}`}
            className="group flex flex-col sm:grid sm:grid-cols-[120px_1fr_auto] gap-2 sm:gap-[20px] sm:items-baseline p-[16px] sm:p-[20px_18px] border sm:border-b border-[var(--color-border-hairline)] sm:border-t-0 sm:border-x-0 sm:last:border-b-0 rounded-[10px] bg-[#0E1311] sm:bg-transparent hover:bg-[#111614] active:bg-[#111614] hover:border-[rgba(52,211,153,0.3)] active:border-[rgba(52,211,153,0.3)] transition-colors"
          >
            <div className="font-mono text-[12px] text-[var(--color-text-faint)] group-hover:text-[var(--color-accent)] group-active:text-[var(--color-accent)] transition-colors flex justify-between sm:block">
              <span>{post.date}</span>
              <span className="sm:hidden font-mono text-[11px] text-[var(--color-text-faint)] group-hover:text-[var(--color-accent)] group-active:text-[var(--color-accent)] transition-colors">
                {post.readTime}
              </span>
            </div>
            <div className="flex flex-col gap-[5px]">
              <div className="font-sans text-[17px] sm:text-[19px] font-semibold text-[var(--color-syntax-plain)] group-hover:text-[var(--color-text-primary)] group-active:text-[var(--color-text-primary)] transition-colors leading-snug">
                {post.title[lang] || post.title.tr}
              </div>
              <div className="font-mono text-[11px] text-[var(--color-text-ghost)]">
                {post.tags.map(t => `#${t}`).join(' ')}
              </div>
            </div>
            <div className="hidden sm:block font-mono text-[11px] text-[var(--color-text-faint)] group-hover:text-[var(--color-accent)] group-active:text-[var(--color-accent)] transition-colors">
              {post.readTime} <span className="opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity">→</span>
            </div>
          </Link>
        ))}
        {filteredPosts.length === 0 && (
          <div className="p-[20px] text-center font-mono text-[12px] text-[var(--color-text-faint)]">
            No posts found.
          </div>
        )}
      </div>
    </div>
  );
}
