'use client';

import { IVendorStaff } from '@/types';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { MoreHorizontalIcon, User2Icon } from 'lucide-react';

import { ImageWithFallback } from '@/components/ImageWithFallback';
import Link from 'next/link';
import { useStaffPermissionChange } from '@/hooks/staffs/useStaffPermissionChange';
import { HasPermission } from '../HasPermission';
import { DisplayThis } from '../DisplayThis';
import { useSession } from '@/hooks/useSession';
import { StaffRole } from './StaffRole';
import React from 'react';
import { StaffDeleteConfirmDialog } from './StaffDeleteConfirmDialog';

export const StaffCard: React.FC<{ staff: IVendorStaff }> = ({ staff }) => {
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const { mutate: changePermission } = useStaffPermissionChange(staff.id);

  return (
    <Card className="relative group">
      <StaffCardActions
        staff={staff}
        onDelete={() => setOpenDeleteDialog(true)}
        onChangePermission={changePermission}
      />
      <CardHeader className="flex flex-col items-center gap-4">
        <ImageWithFallback
          fallback={<User2Icon className="size-24 rounded-full bg-muted ring-1 ring-muted" />}
          src={staff.avatar?.url || ''}
          width={200}
          height={200}
          alt={staff.firstName}
          className="w-24  h-24  rounded-full object-cover"
        />
        <StaffRole role={staff.role} />
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

      <StaffDeleteConfirmDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        staff={staff}
        onCancel={() => setOpenDeleteDialog(false)}
      />
    </Card>
  );
};

function StaffCardActions({
  staff,
  onDelete,
  onChangePermission,
}: {
  staff: IVendorStaff;
  onDelete: () => void;
  onChangePermission: (role: 'manager' | 'staff') => void;
}) {
  const { user } = useSession();

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

        <HasPermission permission="add_avatar">
          <DropdownMenuSeparator />
          {/* Add staff avatar */}
          <DropdownMenuItem>
            <Link href={`/staffs?staffId=${staff.id}&add-avatar=true`} className="w-full">
              <span>{staff.avatar ? 'Change Avatar' : 'Add Avatar'}</span>
            </Link>
          </DropdownMenuItem>
        </HasPermission>

        {/* Only owner and manager can edit staff */}
        <HasPermission permission="manage_staff" targetRole={staff.role}>
          <DropdownMenuItem className="w-full">
            <Link href={`/staffs?staffId=${staff.id}&edit=true`}>Edit Staff</Link>
          </DropdownMenuItem>
        </HasPermission>
        {/* TODO: add change password */}

        <HasPermission permission="manage_staff" targetRole={staff.role}>
          <DropdownMenuItem>
            <Link href={`/staffs?staffId=${staff.id}&change-password=true`}>Change Password</Link>
          </DropdownMenuItem>
        </HasPermission>

        {/* Only owner can change role */}
        <DisplayThis when={user?.id !== staff.id}>
          <HasPermission permission="manage_roles">
            <DropdownMenuItem asChild>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Assign as</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuCheckboxItem
                    checked={staff.role === 'manager'}
                    onClick={() => onChangePermission('manager')}
                  >
                    Manager
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={staff.role === 'staff'}
                    onClick={() => onChangePermission('staff')}
                  >
                    Staff
                  </DropdownMenuCheckboxItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuItem>
          </HasPermission>
        </DisplayThis>

        {/* Only owner can delete */}
        <HasPermission permission="delete_staff" targetRole={staff.role}>
          <DisplayThis when={user?.id !== staff.id}>
            <DropdownMenuItem variant="destructive" onClick={onDelete}>
              Delete Staff
            </DropdownMenuItem>
          </DisplayThis>
        </HasPermission>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
