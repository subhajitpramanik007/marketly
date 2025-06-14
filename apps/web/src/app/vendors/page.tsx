import Link from 'next/link';

export default async function AdminPage({ params }: { params: Promise<{ admin: string }> }) {
  const { admin } = await params;
  return (
    <>
      <h1>Admin: {admin}</h1>
      <Link href="/">Home</Link>
    </>
  );
}
