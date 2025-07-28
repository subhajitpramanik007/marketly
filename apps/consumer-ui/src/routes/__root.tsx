import { createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import TanStackQueryLayout from '../integrations/tanstack-query/layout.tsx';

import type { QueryClient } from '@tanstack/react-query';
import RootLayout from '@/components/layout/RootLayout.tsx';
import type { SessionContextType } from '@/providers/SessionProvider.tsx';

interface MyRouterContext {
  queryClient: QueryClient;
  session: SessionContextType;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
});

function Root() {
  return (
    <>
      <RootLayout />
      <TanStackRouterDevtools />

      <TanStackQueryLayout />
    </>
  );
}
