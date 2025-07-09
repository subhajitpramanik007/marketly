'use client';

import { IVendorStaff } from '@/types';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { MoreHorizontalIcon, User2Icon } from 'lucide-react';

import { ImageWithFallback } from '@/components/ImageWithFallback';
import Link from 'next/link';
import { usePermission } from '@/hooks/usePermision';
import { DisplayThis } from '../DisplayThis';
import { useStaffPermissionChange } from '@/hooks/staffs/useStaffPermissionChange';

export const StaffCard: React.FC<{ staff: IVendorStaff }> = ({ staff }) => {
  return (
    <Card className="relative group">
      <StaffCardActions staff={staff} />
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

function StaffCardActions({ staff }: { staff: IVendorStaff }) {
  const { isOwner, isCanManage } = usePermission();

  const { mutate: changePermission } = useStaffPermissionChange(staff.id);

  return (
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
        {/* All can view staff */}
        <DropdownMenuItem>
          <Link href={`/staffs?staffId=${staff.id}`} className="w-full">
            <span>View Staff</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        {/* Add staff avatar */}
        <DropdownMenuItem>
          <Link href={`/staffs?staffId=${staff.id}&add-avatar=true`} className="w-full">
            <span>{staff.avatar ? 'Change Avatar' : 'Add Avatar'}</span>
          </Link>
        </DropdownMenuItem>

        {/* Only owner and manager can edit staff */}
        <DisplayThis when={isCanManage || (isOwner && staff.role !== 'owner')}>
          <DropdownMenuItem className="w-full">
            <Link href={`/staffs?staffId=${staff.id}&edit=true`}>Edit Staff</Link>
          </DropdownMenuItem>
          {/* TODO: add change password */}
          <DropdownMenuItem>
            <Link href={`/staffs?staffId=${staff.id}&change-password=true`}>Change Password</Link>
          </DropdownMenuItem>

          {/* Only owner can change role */}
          <DisplayThis when={isOwner && staff.role !== 'owner'}>
            <DropdownMenuItem asChild>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Assign as</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuCheckboxItem
                    checked={staff.role === 'owner'}
                    onClick={() => changePermission('owner')}
                  >
                    Partner
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={staff.role === 'manager'}
                    onClick={() => changePermission('manager')}
                  >
                    Manager
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={staff.role === 'staff'}
                    onClick={() => changePermission('staff')}
                  >
                    Staff
                  </DropdownMenuCheckboxItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuItem>
          </DisplayThis>
          <DisplayThis when={staff.role !== 'owner'}>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Delete Staff</DropdownMenuItem>
          </DisplayThis>
        </DisplayThis>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
