"use client";

import { RootHeader } from "@/components/navigation/header";
import {
  AdminSection,
  ConsumerSection,
  HeroSection,
  ProductSection,
  VendorSection,
  VendorTestimonialsSection,
} from "@/components/landing";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full">
      {/* Header */}
      <RootHeader />

      <HeroSection key="hero-section" />

      <ConsumerSection key="consumer-section" />

      <ProductSection key="product-section" />

      <VendorSection key="vendor-section" />

      <VendorTestimonialsSection key="vendor-testimonials-section" />

      <AdminSection key="admin-section" />
    </div>
  );
}
