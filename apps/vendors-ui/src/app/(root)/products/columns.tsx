'use client';

import { ColumnDef } from '@tanstack/react-table';

import { IProduct } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProduct } from '@/services/product.services';

export const columns: ColumnDef<IProduct>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const slug = row.original.slug;

      return (
        <Link href={`/products/details/${slug}`} className="capitalize hover:underline">
          {row.getValue('name')}
        </Link>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price'));
      const formattedPrice = price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'INR',
      });
      return <div>{formattedPrice}</div>;
    },
  },
  {
    accessorKey: 'discount',
    header: 'Discount',
    cell: ({ row }) => {
      const discount = parseFloat(row.getValue('discount'));
      const formattedDiscount = discount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'INR',
      });
      return <div>{formattedDiscount}</div>;
    },
  },
  {
    accessorKey: 'isAvailable',
    header: 'Availability',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({ row }) => {
      const createdAt = new Date(row.getValue('createdAt'));
      return <div>{createdAt.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated',
    cell: ({ row }) => {
      const updatedAt = new Date(row.getValue('updatedAt'));
      return <div>{updatedAt.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: 'addedBy.firstName',
    header: 'Added By',
  },
  {
    accessorKey: 'isDeleted',
    header: 'Deleted',
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const slug = row.original.slug;
      const productId = row.original.id;

      const queryClient = useQueryClient();

      const { mutate: deleteAProduct } = useMutation({
        mutationKey: ['products', 'delete'],
        mutationFn: deleteProduct,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['products'] });
        },
      });

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/products/details/${slug}`}>View Product</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => deleteAProduct(productId)}>
              Delete Product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
