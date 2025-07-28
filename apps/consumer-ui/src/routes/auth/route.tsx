import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/auth')({
  beforeLoad(ctx) {
    if (ctx.context.session.isAuthenticated) {
      const search = ctx.location.search as {
        callback: string;
      };
      const callback = search?.callback || '/';
      throw redirect({
        to: `${callback}`,
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full min-h-[calc(100vh-64px)] flex items-center justify-center">
      <Outlet />
    </div>
  );
}
