'use client';

import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function Header() {
  return (
    <header className="h-[3.5rem] py-2 pl-1 pr-3 flex border-b shadow-sm items-center">
      <SidebarTrigger className="size-8" />

      {/* <Button className="ml-auto">Logout</Button> */}
    </header>
  );
}
