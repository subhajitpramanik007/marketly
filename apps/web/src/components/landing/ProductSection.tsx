import Image from 'next/image';
import { Card, CardContent } from '../ui/card';
import { LandingSection } from './LandingSection';
import { Star } from 'lucide-react';
import { Button } from '../ui/button';

const ProductImages = [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
]

export const ProductSection = () => (
  <LandingSection className='bg-gradient-to-br from-amber-200 via-background to-amber-100'>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-7xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
        <p className="text-lg text-muted-foreground">
          Discover trending products from our top-rated vendors
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
          <Card key={i} className="group hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer">
            <CardContent className="p-4">
              <Image
                src={ProductImages[i - 1]}
                alt={`Product ${i}`}
                width={200}
                height={200}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="font-semibold mb-2">Premium Product {i}</h3>
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground ml-2">(4.9)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">$99.99</span>
                <Button size="sm">Add to Cart</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </LandingSection>
);
