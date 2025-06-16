import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { LandingSection } from "./LandingSection";
import { Star } from "lucide-react";
import { Button } from "../ui/button";

const ProductImages = [
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
];

export const ProductSection = () => (
  <LandingSection className="via-background bg-gradient-to-br from-amber-200 to-amber-100">
    <div className="container mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold">Featured Products</h2>
        <p className="text-muted-foreground text-lg">
          Discover trending products from our top-rated vendors
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card
            key={i}
            className="group cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-lg"
          >
            <CardContent className="p-4">
              <Image
                src={ProductImages[i - 1]}
                alt={`Product ${i}`}
                width={200}
                height={200}
                className="mb-4 h-48 w-full rounded-md object-cover"
              />
              <h3 className="mb-2 font-semibold">Premium Product {i}</h3>
              <div className="mb-2 flex items-center">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="text-muted-foreground ml-2 text-sm">
                  (4.9)
                </span>
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
