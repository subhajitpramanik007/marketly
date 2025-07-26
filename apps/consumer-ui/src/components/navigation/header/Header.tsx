import { Link } from '@tanstack/react-router';
import { IsLoggedIn, IsLogout } from '@/components/auth';
import { Button } from '@/components/ui/button';
import { UserButton } from './UserButton';

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
          <UserButton />
        </IsLoggedIn>
      </div>
    </header>
  );
}
