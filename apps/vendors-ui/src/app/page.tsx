'use client';

import { Button } from '@/components/ui/button';
import { useSession } from '@/hooks/useSession';

export default function Home() {
  const session = useSession();
  return (
    <div>
      <Button variant="secondary">Test</Button>

      <h1 className="text-2xl font-bold"> Vendors ui</h1>

      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
