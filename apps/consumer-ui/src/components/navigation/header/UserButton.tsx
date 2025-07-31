import * as React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { User2Icon } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useLogout } from '@/hooks/auth';

export const UserButton: React.FC<{}> = ({}) => {
  const { logout } = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Avatar className="ring-1">
          <AvatarImage></AvatarImage>
          <AvatarFallback>
            <User2Icon className="size-5" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={8} alignOffset={8}>
        <DropdownMenuItem asChild>
          <Link to="/profile">Profile</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link to="/wishlists">My Wishlists</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/cart">My Cart</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/orders">My Orders</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
