"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Providers({ children }) {
    const [qc] = useState(new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 5,
                refetchOnWindowFocus: false
            }
        }
    }))
    return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
}
