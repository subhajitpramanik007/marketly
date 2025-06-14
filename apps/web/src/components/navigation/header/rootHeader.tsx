'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Store } from 'lucide-react';
import { HeaderLayout } from './headerLayout';
import { setUserType as setUserTypeCookie } from '@/actions/setUserType.action';
import { useRouter } from 'next/navigation';

export const RootHeader = () => {
  const router = useRouter();

  async function setUserType(userType: 'consumer' | 'sellers' | 'admin') {
    const result = await setUserTypeCookie(userType);

    localStorage.setItem('useAs', userType);

    if (result) {
      if (userType === 'consumer') {
        router.push('/auth/login');
      }
    }
  }

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
          <div
            className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
            onClick={() => setUserType('sellers')}
          >
            For Vendors
          </div>
          <div
            className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
            onClick={() => setUserType('admin')}
          >
            For Admins
          </div>
          <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => setUserType('consumer')}>
            Sign In
          </Button>
          <Button onClick={() => {}}>Get Started</Button>
        </div>
      </div>
    </HeaderLayout>
  );
};
