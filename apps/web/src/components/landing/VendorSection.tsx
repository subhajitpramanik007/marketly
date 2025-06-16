import {
  ArrowRight,
  BarChart3,
  Globe,
  Settings,
  StoreIcon,
  TrendingUp,
} from "lucide-react";
import { LandingSection } from "./LandingSection";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export const VendorSection = () => (
  <LandingSection className="via-background bg-gradient-to-bl from-amber-100 to-amber-200 py-32">
    <div className="container mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="relative order-2 lg:order-1">
          <Image
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
            alt="Vendor dashboard"
            width={600}
            height={500}
            className="rounded-lg shadow-2xl"
          />
        </div>
        <div className="order-1 lg:order-2">
          <Badge variant="secondary" className="mb-4">
            <StoreIcon className="mr-2 h-4 w-4" />
            For Vendors
          </Badge>
          <h2 className="mb-6 text-3xl font-bold">
            Grow Your Business with Powerful Tools
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Join thousands of successful vendors using our platform to reach new
            customers, manage inventory, and track sales with advanced
            analytics.
          </p>
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-3">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              <span>Advanced sales analytics and reporting</span>
            </div>
            <div className="flex items-center space-x-3">
              <Globe className="h-5 w-5 text-blue-500" />
              <span>Reach millions of potential customers</span>
            </div>
            <div className="flex items-center space-x-3">
              <Settings className="h-5 w-5 text-blue-500" />
              <span>Easy inventory and order management</span>
            </div>
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              <span>Marketing tools to boost your sales</span>
            </div>
          </div>
          <Button size="lg" className="mr-4" onClick={() => {}}>
            Start Selling Today
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline">
            View Pricing
          </Button>
        </div>
      </div>
    </div>
  </LandingSection>
);
