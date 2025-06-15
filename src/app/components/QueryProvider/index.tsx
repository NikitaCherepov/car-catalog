"use client";
import { Toaster } from "sonner";
import { Suspense } from "react";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function QueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense>
        {children}
      </Suspense>
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}