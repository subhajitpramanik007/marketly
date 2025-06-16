"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "next-view-transitions";

type AuthCardWrapperProps = {
  children: React.ReactNode;
  cardTitle: string;
} & (
  | {
      footerAs: "link";
      footerText: string;
      footerLink: {
        href: string;
        text: string;
      };
      cardFooter?: never;
    }
  | {
      footerAs: "component";
      cardFooter: React.ReactNode;
      footerText?: never;
      footerLink?: never;
    }
);

export const AuthCardWrapper = ({
  children,
  cardTitle,
  footerAs,
  footerText,
  footerLink,
  cardFooter,
}: AuthCardWrapperProps) => {
  return (
    <Card className="w-full max-w-md bg-transparent backdrop-blur-sm backdrop:bg-white">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          {cardTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="group flex justify-center">
        {footerAs === "link" && (
          <p className="text-muted-foreground text-center text-sm">
            {footerText}
            <Link
              className="text-primary group-hover:underline"
              href={footerLink?.href}
            >
              {footerLink?.text}
            </Link>
          </p>
        )}
        {footerAs === "component" && cardFooter}
      </CardFooter>
    </Card>
  );
};
