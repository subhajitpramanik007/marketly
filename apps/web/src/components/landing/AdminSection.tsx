import { LandingSection } from './LandingSection';
import { ArrowRight, BarChart3, Settings, Shield, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import Image from 'next/image';

const AdminCardData = [
  {
    icon: <Users className="size-6 mr-2 text-purple-500" />,
    title: 'User Management',
    description: 'Comprehensive user and vendor management with role-based access control',
  },
  {
    icon: <BarChart3 className="size-6 mr-2 text-purple-500" />,
    title: 'Analytics Dashboard',
    description: 'Real-time platform analytics and performance monitoring',
  },
  {
    icon: <Shield className="size-6 mr-2 text-purple-500" />,
    title: 'Security and Compliance',
    description: 'Advanced security features and compliance management',
  },
  {
    icon: <Settings className="size-6 mr-2 text-purple-500" />,
    title: 'Platform Settings',
    description: 'Flexible configuration options for all platform features',
  },
];

export const AdminSection = () => (
  <div className="h-auto pt-16 pb-32 bg-gradient-to-bl from-amber-300 via-background to-amber-100">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-7xl">
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
            {AdminCardData.map((card, i) => (
              <Card key={i}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    {card.icon}
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{card.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
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
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80"
            alt="Admin dashboard"
            width={600}
            height={500}
            className="rounded-lg shadow-2xl w-full aspect-square object-cover"
          />
        </div>
      </div>
    </div>
  </div>
);
