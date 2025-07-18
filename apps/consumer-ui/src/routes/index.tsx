import HomePage from '@/pages/Home';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="container mx-auto p-4 w-full">
      <HomePage />
    </div>
  );
}
