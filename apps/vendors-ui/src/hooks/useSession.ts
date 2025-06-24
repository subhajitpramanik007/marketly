'use client';

import React from 'react';
import { SessionContext } from '@/providers/sessionProvider';

export const useSession = () => {
  const session = React.useContext(SessionContext);

  if (!session) {
    throw new Error('useSession must be used within a SessionProvider');
  }

  return session;
};
