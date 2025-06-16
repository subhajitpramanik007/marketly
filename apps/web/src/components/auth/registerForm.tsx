"use client";

import {
  TConsumerRegistration,
  TVendorRegistration,
  consumerRegistrationSchema,
  vendorRegistrationSchema,
} from "@marketly/lib/schemas/auth";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TUserType } from "@/types/user.type";
import { PasswordInput } from "./passwordInput";

export function RegisterForm({ userType }: { userType: TUserType }) {
  const form = useForm<TConsumerRegistration | TVendorRegistration>({
    resolver: zodResolver(
      userType === "Consumer"
        ? consumerRegistrationSchema
        : vendorRegistrationSchema,
    ),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      storeName: "",
      phoneNumber: "",
    },
  });

  function onSubmit(data: TConsumerRegistration | TVendorRegistration) {
    if (userType === "Consumer") {
      console.log(data);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder={`${userType} first name`}
                    {...field}
                    autoFocus
                    autoComplete="name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder={`${userType} last name`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={`${userType} email`}
                  autoComplete="email"
                  type="email"
                  className="lowercase"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {userType === "Vendor" && (
          <React.Fragment>
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={`${userType} phone number`}
                      autoComplete="tel"
                      type="tel"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="storeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={`${userType} store name`}
                      autoComplete="store-name"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </React.Fragment>
        )}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder={`${userType} password`}
                  field={field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {userType === "Consumer" ? "Register" : "Create Store"}
        </Button>
      </form>
    </Form>
  );
}
