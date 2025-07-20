import * as React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Link } from '@tanstack/react-router';

interface AuthCardWrapperProps {
  headerText: string;
  footerText: string;
  footerLink: {
    href: string;
    text: string;
  };
  children: React.ReactNode;
}

export const AuthCardWrapper: React.FC<AuthCardWrapperProps> = ({
  headerText,
  footerText,
  footerLink,
  children,
}) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">Marketly</CardTitle>
        <CardDescription className="text-center text-md">{headerText}</CardDescription>
      </CardHeader>

      <CardContent>{children}</CardContent>

      <CardFooter className="flex items-center justify-center">
        <CardDescription className="text-center">
          {footerText}{' '}
          <Link to={footerLink.href}>
            <span className="text-primary hover:underline">{footerLink.text}</span>
          </Link>
        </CardDescription>
      </CardFooter>
    </Card>
  );
};
