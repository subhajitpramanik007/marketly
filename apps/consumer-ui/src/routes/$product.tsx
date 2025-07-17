import { SingleProductPage } from '@/pages/SingleProduct';
import { createFileRoute, useParams } from '@tanstack/react-router';

export const Route = createFileRoute('/$product')({
  component: RouteComponent,
});

function RouteComponent() {
  const { product: slug } = useParams({ from: '/$product' });

  return (
    <div className="p-4 w-full max-w-[84rem] mx-auto">
      <SingleProductPage slug={slug} />
    </div>
  );
}
