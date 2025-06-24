import { Skeleton } from '../ui/skeleton';
import { OnboardingHeader } from './OnboardingHeader';

export function OnboardingSkeleton() {
  return (
    <div className="flex w-full max-w-7xl h-full">
      <div className="flex w-full h-full flex-col p-3 rounded-md justify-start items-start">
        <OnboardingHeader />

        <div className="flex w-full h-full gap-6 py-4">
          {/* Sidebar */}
          <div className="flex flex-col h-full">
            {[1, 2, 3, 4, 5, 6].map(item => (
              <Skeleton key={item} className="w-sm h-24 mb-2" />
            ))}
          </div>

          {/* Content */}
          <div className="w-full h-full">
            <Skeleton className="w-full h-[calc(100vh-10rem)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
