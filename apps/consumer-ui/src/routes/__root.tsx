import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import Header from '../components/Header';

import { motion } from 'motion/react';
import { Toaster } from 'react-hot-toast';

import TanStackQueryLayout from '../integrations/tanstack-query/layout.tsx';

import type { QueryClient } from '@tanstack/react-query';

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Header />
      <Toaster />

      <motion.div layout transition={{ duration: 0.3 }}>
        <Outlet />
      </motion.div>
      <TanStackRouterDevtools />

      <TanStackQueryLayout />
    </>
  ),
});
