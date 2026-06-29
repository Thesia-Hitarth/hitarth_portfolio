/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import React, { ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Info, AlertTriangle, Lightbulb, XCircle } from 'lucide-react';
import { CopyButton } from './CopyButton';
import { cn } from '@/lib/utils';

/**
 * components/mdx/MDXComponents.tsx
 */

interface CalloutProps {
  type?: 'info' | 'warning' | 'tip' | 'danger';
  children: React.ReactNode;
}

const CALLOUT_STYLES = {
  info: {
    bg: 'bg-blue-500/5 dark:bg-blue-500/10 border-blue-500/30 text-blue-800 dark:text-blue-300',
    icon: Info,
  },
  warning: {
    bg: 'bg-amber-500/5 dark:bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-300',
    icon: AlertTriangle,
  },
  tip: {
    bg: 'bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300',
    icon: Lightbulb,
  },
  danger: {
    bg: 'bg-red-500/5 dark:bg-red-500/10 border-red-500/30 text-red-800 dark:text-red-300',
    icon: XCircle,
  },
};

export function Callout({ type = 'info', children }: CalloutProps): ReactElement {
  const style = CALLOUT_STYLES[type] || CALLOUT_STYLES.info;
  const Icon = style.icon;

  return (
    <div className={cn('flex gap-3 items-start border-l-4 rounded-r-xl p-4 my-6 text-sm leading-relaxed', style.bg)}>
      <Icon size={18} className="shrink-0 mt-0.5" />
      <div>{children}</div>
    </div>
  );
}

export const MDXComponents = {
  h1: ({ className, ...props }: any) => (
    <h1
      className={cn(
        'text-3xl font-bold tracking-tight text-foreground mt-10 mb-4 sm:text-4xl first:mt-0',
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: any) => (
    <h2
      className={cn(
        'text-2xl font-semibold text-foreground tracking-tight border-b border-border pb-2 mt-10 mb-4 sm:text-3xl first:mt-0',
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: any) => (
    <h3
      className={cn(
        'text-xl font-semibold text-foreground tracking-tight mt-6 mb-3 first:mt-0',
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: any) => (
    <p
      className={cn(
        'text-muted-foreground leading-relaxed mb-4 text-base md:text-lg',
        className
      )}
      {...props}
    />
  ),
  a: ({ className, href = '', ...props }: any) => {
    const isInternal = href.startsWith('/') || href.startsWith('#');
    if (isInternal) {
      return (
        <Link
          href={href}
          className={cn('text-primary font-medium underline-offset-4 hover:underline transition-colors', className)}
          {...props}
        />
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn('text-primary font-medium underline-offset-4 hover:underline transition-colors', className)}
        {...props}
      />
    );
  },
  strong: ({ className, ...props }: any) => (
    <strong className={cn('text-foreground font-semibold', className)} {...props} />
  ),
  ul: ({ className, ...props }: any) => (
    <ul className={cn('list-disc list-outside ml-6 mb-4 space-y-2', className)} {...props} />
  ),
  ol: ({ className, ...props }: any) => (
    <ol className={cn('list-decimal list-outside ml-6 mb-4 space-y-2', className)} {...props} />
  ),
  li: ({ className, ...props }: any) => (
    <li className={cn('text-muted-foreground leading-relaxed', className)} {...props} />
  ),
  blockquote: ({ className, ...props }: any) => (
    <blockquote
      className={cn(
        'border-l-4 border-primary bg-primary/5 rounded-r-lg pl-6 pr-4 py-4 my-6 italic text-muted-foreground text-base leading-relaxed',
        className
      )}
      {...props}
    />
  ),
  code: ({ className, isBlock, ...props }: any) => {
    const isInline = !isBlock && (!className || !className.startsWith('language-'));
    return (
      <code
        className={cn(
          isInline
            ? 'bg-muted text-primary font-mono text-xs px-1.5 py-0.5 rounded border border-border'
            : 'bg-transparent text-current border-0 p-0 text-inherit font-mono',
          className
        )}
        {...props}
      />
    );
  },
  pre: ({ className, children, ...props }: any) => {
    // Extract raw text for CopyButton, handling children structures in markdown blocks
    const codeContent = children?.props?.children ?? '';
    const enhancedChildren = children && React.isValidElement(children)
      ? React.cloneElement(children as React.ReactElement<any>, { isBlock: true })
      : children;
    return (
      <div className="relative group my-6">
        <CopyButton text={codeContent} />
        <pre
          className={cn(
            'bg-zinc-950 dark:bg-zinc-900/60 rounded-xl p-5 overflow-x-auto border border-zinc-800 dark:border-zinc-800/40 text-sm font-mono text-zinc-100 select-text',
            className
          )}
          {...props}
        >
          {enhancedChildren}
        </pre>
      </div>
    );
  },
  hr: ({ className, ...props }: any) => (
    <hr className={cn('border-border my-8', className)} {...props} />
  ),
  table: ({ className, ...props }: any) => (
    <div className="my-6 w-full overflow-x-auto">
      <table className={cn('w-full border-collapse border-spacing-0', className)} {...props} />
    </div>
  ),
  thead: ({ className, ...props }: any) => (
    <thead className={cn('bg-muted', className)} {...props} />
  ),
  th: ({ className, ...props }: any) => (
    <th
      className={cn(
        'text-left font-semibold text-sm text-foreground px-4 py-3 border border-border',
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: any) => (
    <td
      className={cn(
        'px-4 py-3 text-sm text-muted-foreground border border-border',
        className
      )}
      {...props}
    />
  ),
  tr: ({ className, ...props }: any) => (
    <tr
      className={cn('even:bg-muted/30 border-b border-border last:border-0', className)}
      {...props}
    />
  ),
  img: ({ className, src, alt, ...props }: any) => (
    <figure className="my-6">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted">
        <Image
          src={src || ''}
          alt={alt || 'Illustration'}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </div>
      {alt && (
        <figcaption className="mt-2 text-center text-xs text-muted-foreground italic">
          {alt}
        </figcaption>
      )}
    </figure>
  ),
  Callout,
};
