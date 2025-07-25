import { WishlistProducts } from '@/pages/WishlistProducts';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_user/wishlists')({
  component: RouteComponent,
});

function RouteComponent() {
  return <WishlistProducts />;
}
