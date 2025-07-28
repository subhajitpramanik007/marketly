import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';

import * as TanStackQueryProvider from './integrations/tanstack-query/root-provider.tsx';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

import './styles.css';
import reportWebVitals from './reportWebVitals.ts';
import { SessionProvider } from './providers/SessionProvider.tsx';
import { useSession } from './hooks/auth/index.ts';
import { RootLoading } from './components/RootLoading.tsx';

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    session: undefined!,
    ...TanStackQueryProvider.getContext(),
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const session = useSession();

  if (session.status === 'Loading') {
    return <RootLoading />;
  }

  return <RouterProvider router={router} context={{ session }} />;
}

function App() {
  return (
    <TanStackQueryProvider.Provider>
      <SessionProvider>
        <InnerApp />
      </SessionProvider>
    </TanStackQueryProvider.Provider>
  );
}

// Render the app
const rootElement = document.getElementById('app');

if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(<App />);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
