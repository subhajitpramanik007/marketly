import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_user/checkout')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_user/checkout"!</div>;
}
