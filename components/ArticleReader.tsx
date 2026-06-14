"use client";

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { PostMeta } from '@/lib/posts';
import { CodeBlock } from './CodeBlock';
import { useLang } from './LangProvider';

interface Props {
  post: PostMeta & { content: string };
  prevPost: PostMeta | null;
  nextPost: PostMeta | null;
}

export function ArticleReader({ post, prevPost, nextPost }: Props) {
  const { t, lang } = useLang();

  let processedContent = post.content;
  if (lang === 'en') {
    processedContent = processedContent.replace(/\[TR\][\s\S]*?\[\/TR\]\n?/g, '');
    processedContent = processedContent.replace(/\[EN\]\n?([\s\S]*?)\[\/EN\]\n?/g, '$1');
  } else {
    processedContent = processedContent.replace(/\[EN\][\s\S]*?\[\/EN\]\n?/g, '');
    processedContent = processedContent.replace(/\[TR\]\n?([\s\S]*?)\[\/TR\]\n?/g, '$1');
  }

  return (
    <div className="w-full max-w-[680px] flex flex-col gap-[22px] py-[56px] px-[36px] pb-[70px]">
      
      {/* Header */}
      <div className="flex gap-[8px] flex-wrap">
        {post.tags.map(tag => (
          <div key={tag} className="font-mono text-[10px] text-[var(--color-accent)] border border-[rgba(52,211,153,0.35)] rounded-[99px] px-[10px] py-[3px]">
            #{tag}
          </div>
        ))}
      </div>
      
      <h1 className="font-sans text-[40px] font-bold leading-[1.15] text-pretty m-0 text-[var(--color-text-primary)]">
        {post.title[lang] || post.title.tr}
      </h1>
      
      <div className="font-mono text-[12px] text-[var(--color-text-faint)] uppercase">
        {post.date} · BURAK ERGÜL · {post.readTime}
      </div>
      
      <div className="h-[1px] bg-[var(--color-border-hairline)] w-full"></div>

      {/* Markdown Body */}
      <div className="flex flex-col gap-[1.8em] font-sans text-[17px] text-[var(--color-text-body)] leading-[1.8] text-pretty">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ node, ...props }) => <p className="m-0" {...props} />,
            a: ({ node, ...props }) => <a className="text-[var(--color-accent)] hover:underline" {...props} />,
            h1: ({ node, ...props }) => <h1 className="font-bold text-[32px] text-[var(--color-text-primary)] mt-8 mb-4" {...props} />,
            h2: ({ node, ...props }) => <h2 className="font-bold text-[28px] text-[var(--color-text-primary)] mt-8 mb-4" {...props} />,
            h3: ({ node, ...props }) => <h3 className="font-bold text-[24px] text-[var(--color-text-primary)] mt-6 mb-3" {...props} />,
            ul: ({ node, ...props }) => <ul className="list-disc pl-6" {...props} />,
            ol: ({ node, ...props }) => <ol className="list-decimal pl-6" {...props} />,
            li: ({ node, ...props }) => <li className="mb-2" {...props} />,
            blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-[var(--color-border-subtle)] pl-4 italic text-[var(--color-text-dim)]" {...props} />,
            pre: ({ children }) => <>{children}</>,
            code({ node, inline, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || '');
              
              if (!inline && match) {
                return (
                  <CodeBlock className={className}>
                    {String(children).replace(/\n$/, '')}
                  </CodeBlock>
                );
              }
              
              return (
                <code 
                  className="font-mono text-[14px] text-[var(--color-syntax-type)] bg-[#111614] rounded-[4px] px-[6px] py-[2px]" 
                  {...props}
                >
                  {children}
                </code>
              );
            }
          }}
        >
          {processedContent}
        </ReactMarkdown>
      </div>

      <div className="h-[1px] bg-[var(--color-border-hairline)] w-full mt-[8px]"></div>

      {/* Footer Prev/Next */}
      <div className="flex justify-between font-mono text-[12px]">
        {prevPost ? (
          <Link href={`/blog/${prevPost.slug}`} className="text-[var(--color-text-faint)] hover:text-[var(--color-text-primary)] transition-colors">
            ← {t.prevPost}: {prevPost.title[lang] || prevPost.title.tr}
          </Link>
        ) : (
          <div></div>
        )}
        
        {nextPost ? (
          <Link href={`/blog/${nextPost.slug}`} className="text-[var(--color-accent)] hover:text-[var(--color-text-primary)] transition-colors">
            {t.nextPost}: {nextPost.title[lang] || nextPost.title.tr} →
          </Link>
        ) : (
          <div></div>
        )}
      </div>

    </div>
  );
}
