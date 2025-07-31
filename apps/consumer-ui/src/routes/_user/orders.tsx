import { useOrders } from '@/hooks/orders';
import { OrdersPage } from '@/pages/Orders';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_user/orders')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading, isError, error, refetch } = useOrders();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div>
        <h1>Error</h1>
        <div>{error?.message}</div>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <h1>No orders found</h1>
      </div>
    );
  }

  const { meta } = data;

  return (
    <div className="p-4">
      <OrdersPage meta={meta} />
    </div>
  );
}
