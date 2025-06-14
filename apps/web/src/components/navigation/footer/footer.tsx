import { Mail, MapPin, Phone, Store } from 'lucide-react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-muted/30 py-8 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Store className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Marketly</span>
            </div>
            <p className="text-muted-foreground mb-4">
              The complete multi-tenant e-commerce platform for modern businesses.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4" />
                <span>+91 123 456 7890</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4" />
                <span>support@marketly.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="w-4 h-4" />
                <span>123 Main Street, Kolkata, India</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">For Consumers</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
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
                <Link href="#customer-support" className="hover:text-foreground">
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
            <h3 className="font-semibold mb-4">For Vendors</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#seller-dashboard" className="hover:text-foreground">
                  Seller Dashboard
                </Link>
              </li>
              <li>
                <Link href="#seller-pricing" className="hover:text-foreground">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="#seller-resources" className="hover:text-foreground">
                  Seller Resources
                </Link>
              </li>
              <li>
                <Link href="#api-documentation" className="hover:text-foreground">
                  API Documentation
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
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
                <Link href="#terms-of-service" className="hover:text-foreground">
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
        <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Marketly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
