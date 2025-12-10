//client component to provide auth context
'use client';
import { SessionProvider } from "next-auth/react";

export default function AuthProvider({
    children,
} : { children: React.ReactNode }) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
} 