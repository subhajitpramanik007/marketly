import { ShoppingCart, Store } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { LandingSection } from "./LandingSection";

export const HeroSection = () => {
  return (
    <LandingSection className="relative flex flex-col items-center bg-amber-100">
      <div className="from-primary/5 via-background to-secondary/5 absolute inset-0 bg-gradient-to-br" />
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="outline" className="mb-4 bg-white">
            🚀 Trusted by 10,000+ businesses worldwide
          </Badge>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            The Complete
            {/* gradient text */}
            <span className="bg-gradient-to-br from-orange-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
              {" "}
              Multi-Tenant
            </span>
            <br />
            E-commerce Platform
          </h1>
          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl">
            Empowering consumers to shop seamlessly, vendors to grow their
            business, and administrators to manage everything effortlessly.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
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

      <div className="container relative mx-auto px-4 py-32 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          <div>
            <div className="text-primary mb-2 text-3xl font-bold">1M+</div>
            <div className="text-muted-foreground text-sm">Happy Customers</div>
          </div>
          <div>
            <div className="text-primary mb-2 text-3xl font-bold">50K+</div>
            <div className="text-muted-foreground text-sm">Active Vendors</div>
          </div>
          <div>
            <div className="text-primary mb-2 text-3xl font-bold">$2B+</div>
            <div className="text-muted-foreground text-sm">Total Sales</div>
          </div>
          <div>
            <div className="text-primary mb-2 text-3xl font-bold">99.9%</div>
            <div className="text-muted-foreground text-sm">Uptime</div>
          </div>
        </div>
      </div>
    </LandingSection>
  );
};
