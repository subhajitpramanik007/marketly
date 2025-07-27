import { Link } from '@tanstack/react-router';
import { IsLoggedIn, IsLogout } from '@/components/auth';
import { Button } from '@/components/ui/button';
import { UserButton } from './UserButton';
import { Cart } from './Cart';

export function Header() {
  return (
    <header className="py-2 bg-primary/10 border-b flex items-center justify-between px-4">
      <Link to="/">
        <h1 className="text-2xl font-bold">Marketly</h1>
      </Link>

      <nav className="flex flex-row"></nav>

      <div>
        <IsLogout>
          <Button>Login</Button>
        </IsLogout>

        <IsLoggedIn>
          <div className="flex items-center gap-6">
            <Cart />
            <UserButton />
          </div>
        </IsLoggedIn>
      </div>
    </header>
  );
}
