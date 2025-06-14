import { ShoppingCart, Store } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { LandingSection } from './LandingSection';

export const HeroSection = () => {
  return (
    <LandingSection className="relative flex flex-col items-center bg-amber-100">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-4 bg-white">
            🚀 Trusted by 10,000+ businesses worldwide
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            The Complete
            {/* gradient text */}
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-orange-500 via-red-500 to-yellow-500">
              {' '}
              Multi-Tenant
            </span>
            <br />
            E-commerce Platform
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Empowering consumers to shop seamlessly, vendors to grow their business, and
            administrators to manage everything effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="2xl" onClick={() => {}}>
              Start Shopping
              <ShoppingCart className="ml-2 h-5 w-5" />
            </Button>
            <Button size="2xl" variant="outline" onClick={() => {}}>
              Become a Vendor
              <Store className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative py-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">1M+</div>
            <div className="text-sm text-muted-foreground">Happy Customers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">50K+</div>
            <div className="text-sm text-muted-foreground">Active Vendors</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">$2B+</div>
            <div className="text-sm text-muted-foreground">Total Sales</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
            <div className="text-sm text-muted-foreground">Uptime</div>
          </div>
        </div>
      </div>
    </LandingSection>
  );
};
