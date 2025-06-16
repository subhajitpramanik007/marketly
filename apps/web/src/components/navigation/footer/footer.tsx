import { Mail, MapPin, Phone, Store } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center space-x-2">
              <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
                <Store className="text-primary-foreground h-5 w-5" />
              </div>
              <span className="text-xl font-bold">Marketly</span>
            </div>
            <p className="text-muted-foreground mb-4">
              The complete multi-tenant e-commerce platform for modern
              businesses.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4" />
                <span>+91 123 456 7890</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4" />
                <span>support@marketly.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span>123 Main Street, Kolkata, India</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">For Consumers</h3>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>
                <Link href="#browse-products" className="hover:text-foreground">
                  Browse Products
                </Link>
              </li>
              <li>
                <Link href="#track-orders" className="hover:text-foreground">
                  Track Orders
                </Link>
              </li>
              <li>
                <Link
                  href="#customer-support"
                  className="hover:text-foreground"
                >
                  Customer Support
                </Link>
              </li>
              <li>
                <Link href="#returns-refunds" className="hover:text-foreground">
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">For Vendors</h3>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>
                <Link
                  href="#seller-dashboard"
                  className="hover:text-foreground"
                >
                  Seller Dashboard
                </Link>
              </li>
              <li>
                <Link href="#seller-pricing" className="hover:text-foreground">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link
                  href="#seller-resources"
                  className="hover:text-foreground"
                >
                  Seller Resources
                </Link>
              </li>
              <li>
                <Link
                  href="#api-documentation"
                  className="hover:text-foreground"
                >
                  API Documentation
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">Company</h3>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>
                <Link href="#about" className="hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#privacy" className="hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#terms-of-service"
                  className="hover:text-foreground"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-foreground">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-muted-foreground mt-12 border-t pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Marketly. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
