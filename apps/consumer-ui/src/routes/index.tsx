import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetch('http://localhost:8080/api/products').then(res => res.json()),
    retry: false,
    staleTime: Infinity,
  });

  return (
    <div className="p-2">
      <h1>Home</h1>

      <pre>{JSON.stringify(data?.data.products, null, 2)}</pre>
    </div>
  );
}
