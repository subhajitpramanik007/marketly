'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { CreateStaffForm } from './CreateStaffForm';

export const NewStaffAddCard: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Card>
          <CardContent className="flex flex-col gap-4 items-center justify-center h-full">
            <Plus className="size-12" />
            Add New Staff
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add New Staff</SheetTitle>
          <SheetDescription>Enter Staff Details</SheetDescription>
        </SheetHeader>

        <div className="px-4">
          <CreateStaffForm onClose={() => setOpen(false)} />
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
