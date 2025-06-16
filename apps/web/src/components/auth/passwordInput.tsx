"use client";

import { Input } from "@/components/ui/input";
import { usePassword } from "@/hooks/usePassword";
import { Eye, EyeClosed } from "lucide-react";
import { ControllerRenderProps } from "react-hook-form";

export const PasswordInput = ({
  field,
  placeholder,
}: {
  field: ControllerRenderProps<any>;
  placeholder?: string;
}) => {
  const { showPassword, toggleShowPassword } = usePassword();

  return (
    <div className="relative">
      <Input
        placeholder={placeholder || "Enter your password"}
        {...field}
        type={showPassword ? "text" : "password"}
      />
      <button
        type="button"
        className="text-muted-foreground absolute right-2 top-1/2 -translate-y-1/2 transform cursor-pointer transition duration-200 ease-in-out"
        onClick={toggleShowPassword}
      >
        {showPassword ? (
          <Eye className="size-4" />
        ) : (
          <EyeClosed className="size-4" />
        )}
      </button>
    </div>
  );
};
