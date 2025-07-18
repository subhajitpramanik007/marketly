import CategoryPage from '@/pages/Category';
import { createFileRoute, useParams } from '@tanstack/react-router';

export const Route = createFileRoute('/category/$category')({
  component: RouteComponent,
});

function RouteComponent() {
  const { category } = useParams({ from: '/category/$category' });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">
        Category: <span className="font-semibold">{category}</span>
      </h2>

      <div className="container mx-auto w-full mt-4">
        <CategoryPage category={category} />
      </div>
    </div>
  );
}
