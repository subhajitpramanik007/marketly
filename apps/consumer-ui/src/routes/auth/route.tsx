import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full min-h-[calc(100vh-64px)] flex items-center justify-center">
      <Outlet />
    </div>
  );
}
