'use client';

import * as React from 'react';

export const DisplayThis: React.FC<{
  when: boolean;
  children: React.ReactNode;
}> = ({ when, children }) => {
  return when ? <>{children}</> : null;
};
