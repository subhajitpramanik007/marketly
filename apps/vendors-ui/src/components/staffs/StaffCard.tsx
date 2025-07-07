'use client';

import { IVendorStaff } from '@/types';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { MoreHorizontalIcon, User2Icon } from 'lucide-react';

import { ImageWithFallback } from '@/components/ImageWithFallback';

export const StaffCard: React.FC<{ staff: IVendorStaff }> = ({ staff }) => {
  return (
    <Card className="relative group">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
          >
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>View Staff</DropdownMenuItem>
          <DropdownMenuItem>Edit Staff</DropdownMenuItem>
          <DropdownMenuItem>Delete Staff</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <CardHeader className="flex flex-col items-center gap-4">
        <ImageWithFallback
          fallback={<User2Icon className="size-24 rounded-full bg-muted ring-1 ring-muted" />}
          src={staff.avatar?.url || ''}
          width={200}
          height={200}
          alt={staff.firstName}
          className="w-24  h-24  rounded-full object-cover"
        />
        <Badge>{staff.role}</Badge>
      </CardHeader>
      <CardContent className="text-center">
        <h2 className="text-lg font-semibold">
          {staff.firstName} {staff.lastName}
        </h2>
        <p className="text-sm">{staff.email}</p>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground m-auto">
          Since {new Date(staff.createdAt!).toLocaleDateString()}
        </p>
      </CardFooter>
    </Card>
  );
};
