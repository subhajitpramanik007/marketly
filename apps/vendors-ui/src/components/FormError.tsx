'use client';

import { cn } from '@/lib/utils';

export function FormError({ error, className }: { error: string | undefined; className?: string }) {
  if (!error) {
    return null;
  }

  return (
    <p
      className={cn(
        'text-destructive bg-destructive/30 text-sm w-full rounded-md px-3 py-1.5',
        className,
      )}
    >
      {error}
    </p>
  );
}
