import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/products/$product')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/products/$product"!</div>
}
