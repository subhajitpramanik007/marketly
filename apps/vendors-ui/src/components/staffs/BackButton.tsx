'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export const BackButtonInStaff: React.FC<{
  text?: string;
  link?: string;
  className?: string;
}> = ({ text, link, className }) => {
  const router = useRouter();

  return (
    <div className={cn('absolute left-4', className)}>
      <Button
        variant={'outline'}
        size={text ? 'sm' : 'icon'}
        onClick={() => (link ? router.push(link) : router.back())}
      >
        <ArrowLeft className="size-4" />
        {text && <span className="ml-2">{text}</span>}
      </Button>
    </div>
  );
};
