"use client";

import { useState } from "react";

export function usePassword() {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return { showPassword, toggleShowPassword };
}
