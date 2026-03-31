"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const MAINTENANCE_KEY = "gadgets_maintenance";

export function MaintenanceGate({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Admins are always allowed through
        if (pathname.startsWith("/admin") || pathname === "/maintenance") return;

        const isMaintenanceOn = localStorage.getItem(MAINTENANCE_KEY) === "true";
        if (isMaintenanceOn) {
            router.replace("/maintenance");
        }
    }, [pathname, router]);

    return <>{children}</>;
}
