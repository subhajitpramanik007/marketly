'use client';

import Image from 'next/image';
import * as React from 'react';

interface ImageWithFallbackProps extends React.ComponentProps<typeof Image> {
  fallback: React.ReactNode;
  src: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ fallback, ...props }) => {
  if (!props.src) {
    return <>{fallback}</>;
  }

  return <Image {...props} />;
};
