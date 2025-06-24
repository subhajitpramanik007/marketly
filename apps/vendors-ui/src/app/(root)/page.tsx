'use client';

import { useSession } from '@/hooks/useSession';

export default function Home() {
  const session = useSession();

  return (
    <>
      <h1 className="text-2xl font-bold"> Vendors ui</h1>

      <pre>{JSON.stringify(session, null, 2)}</pre>
    </>
  );
}
