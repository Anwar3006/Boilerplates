"use client";
import StoreProvider from "@/state/redux";
import React from "react";

// for any global providers you want to use in your app
// e.g. Redux, React Query, Toaster, etc.

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <StoreProvider>{children}</StoreProvider>;
};

export default Providers;
