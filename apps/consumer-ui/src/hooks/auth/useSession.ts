import { SessionContext } from '@/providers/SessionProvider';
import React from 'react';

export const useSession = () => {
  const context = React.useContext(SessionContext);

  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }

  return context;
};
