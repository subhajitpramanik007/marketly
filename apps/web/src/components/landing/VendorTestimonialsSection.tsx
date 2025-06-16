import { LandingSection } from "./LandingSection";
import Image from "next/image";
import { Star } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";

const TestimonialsUsers = [
  {
    name: "Sarah Johnson",
    business: "Artisan Crafts Co.",
    quote:
      "MarketHub helped me reach customers I never could have found on my own. Sales increased by 300% in just 6 months!",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Mike Chen",
    business: "Tech Gadgets Plus",
    quote:
      "The analytics tools are incredible. I can track everything and make data-driven decisions to grow my business.",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Emily Rodriguez",
    business: "Fashion Forward",
    quote:
      "Customer support is amazing, and the platform is so easy to use. I wish I had found MarketHub sooner!",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
];

export const VendorTestimonialsSection = () => (
  <LandingSection className="via-background bg-gradient-to-br from-amber-200 to-amber-300">
    <div className="container mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold">What Our Vendors Say</h2>
        <p className="text-muted-foreground text-lg">
          Success stories from our thriving vendor community
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {TestimonialsUsers.map((testimonial, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="mb-4 flex items-center">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={60}
                  height={60}
                  className="mr-4 h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-muted-foreground text-sm">
                    {testimonial.business}
                  </div>
                </div>
              </div>
              <div className="mb-4 flex text-yellow-400">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className={cn(
                      "h-4 w-4 fill-none",
                      j < testimonial.rating && "fill-current",
                    )}
                  />
                ))}
              </div>
              <p className="text-muted-foreground">"{testimonial.quote}"</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </LandingSection>
);
