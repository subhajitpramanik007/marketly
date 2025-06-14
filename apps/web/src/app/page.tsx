'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ShoppingCart,
  Store,
  Settings,
  Users,
  TrendingUp,
  Shield,
  Star,
  CheckCircle,
  BarChart3,
  Globe,
  Zap,
  Heart,
  ArrowRight,
} from 'lucide-react';
import Image from 'next/image';
import { RootHeader } from '@/components/navigation/header';
import {
    AdminSection,
  ConsumerSection,
  HeroSection,
  ProductSection,
  VendorSection,
  VendorTestimonialsSection,
} from '@/components/landing';

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

      {/* Vendor Testimonials */}
      {/* <section className="py-16 bg-muted/30">
       
      </section> */}

      {/* For Administrators Section */}
      {/* <section id="administrators" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                <Settings className="w-4 h-4 mr-2" />
                For Administrators
              </Badge>
              <h2 className="text-3xl font-bold mb-6">Complete Platform Control & Management</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Powerful administrative tools to manage your multi-tenant platform, oversee vendor
                activities, and ensure optimal user experience across all touchpoints.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center">
                      <Users className="w-5 h-5 mr-2 text-purple-500" />
                      User Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Comprehensive user and vendor management with role-based access control
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2 text-purple-500" />
                      Analytics Dashboard
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Real-time platform analytics and performance monitoring
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-purple-500" />
                      Security Controls
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Advanced security features and compliance management
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center">
                      <Settings className="w-5 h-5 mr-2 text-purple-500" />
                      Platform Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Flexible configuration options for all platform features
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
              <Button size="lg" className="mr-4" onClick={() => {}}>
                Request Admin Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Contact Sales
              </Button>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Admin dashboard"
                width={600}
                height={500}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your E-commerce Experience?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of successful businesses already using MarketHub to grow their online
            presence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => {}}
            >
              Get Started Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {}}
            >
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section> */}

      {/* Footer */}

      {/* Auth Modals */}
      {/* <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} /> */}
      {/* <RegisterModal open={registerModalOpen} onOpenChange={setRegisterModalOpen} /> */}
    </div>
  );
}
