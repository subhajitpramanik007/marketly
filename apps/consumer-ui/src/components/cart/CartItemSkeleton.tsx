import { Card, CardContent } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export function CartItemsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <CartItemSkeleton key={index} />
      ))}
    </div>
  );
}

export function CartItemSkeleton() {
  return (
    <Card className="w-full max-w-4xl">
      <CardContent className="flex gap-4">
        <Skeleton className="size-4 rotate-none" />
        <Skeleton className="w-[10rem] rounded-md aspect-square" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-12" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="w-12 h-6" />
        </div>
      </CardContent>
    </Card>
  );
}
