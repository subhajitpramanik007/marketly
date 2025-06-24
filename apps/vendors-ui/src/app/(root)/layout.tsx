import { Header } from '@/components/navigation/header';
import { ASidebar } from '@/components/navigation/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function AppRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="w-full min-h-screen flex flex-col flex-1">
        <div className="flex-1 flex">
          <ASidebar />

          <div className="flex-1 min-h-full">
            <Header />
            <main className="px-4 py-2">{children}</main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
