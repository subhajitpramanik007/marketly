'use client';

import React from 'react';

export const GradientLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="via-background container mx-auto flex min-h-screen w-full flex-col justify-center bg-gradient-to-bl from-amber-50 to-amber-100">
      <div className="flex flex-1 justify-center">{children}</div>
    </div>
  );
};
