import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_user')({
  beforeLoad: async ctx => {
    const session = ctx.context.session;

    if (!session.isAuthenticated) {
      const callback = ctx.location.href;
      throw redirect({
        to: `/auth/login`,
        search: {
          callback: callback,
        },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
