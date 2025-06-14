import Image from 'next/image';
import { LandingSection } from './LandingSection';
import { Button } from '../ui/button';
import { ArrowRight, CheckCircle, Heart, Shield, ShoppingCart, Zap } from 'lucide-react';
import { Badge } from '../ui/badge';

export const ConsumerSection = () => (
  <LandingSection className='bg-gradient-to-bl from-amber-100 via-background to-amber-200'>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-7xl">
      <div className="flex flex-col lg:flex-row gap-12 items-center w-full">
        <div className="w-full lg:w-1/2">
          <Badge variant="secondary" className="mb-4">
            <ShoppingCart className="w-4 h-4 mr-2" />
            For Consumers
          </Badge>
          <h2 className="text-3xl font-bold mb-6">
            Discover Amazing Products from Trusted Vendors
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Shop from thousands of verified vendors offering millions of products. Enjoy secure
            checkout, fast delivery, and exceptional customer service.
          </p>
          <div className="space-y-4 mb-8">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Vast product selection from verified vendors</span>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-green-500" />
              <span>Secure payment processing and data protection</span>
            </div>
            <div className="flex items-center space-x-3">
              <Zap className="h-5 w-5 text-green-500" />
              <span>Lightning-fast checkout and delivery</span>
            </div>
            <div className="flex items-center space-x-3">
              <Heart className="h-5 w-5 text-green-500" />
              <span>24/7 customer support and easy returns</span>
            </div>
          </div>
          <Button size="lg" className="mr-4" onClick={() => {}}>
            Start Shopping Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline">
            Browse Categories
          </Button>
        </div>
        <div className="w-full lg:w-1/2">
          <Image
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Consumer shopping experience"
            width={600}
            height={500}
            className="rounded-lg shadow-2xl object-cover w-full aspect-square"
          />
        </div>
      </div>
    </div>
  </LandingSection>
);
