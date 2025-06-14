import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Store } from 'lucide-react';
import { HeaderLayout } from './headerLayout';

export const RootHeader = () => {
  return (
    <HeaderLayout>
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Store className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Marketly</span>
          </div>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="#consumers"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            For Consumers
          </Link>
          <Link
            href="#vendors"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            For Vendors
          </Link>
          <Link
            href="#administrators"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            For Admins
          </Link>
          <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => {}}>
            Sign In
          </Button>
          <Button size="sm" onClick={() => {}}>
            Get Started
          </Button>
        </div>
      </div>
    </HeaderLayout>
  );
};
