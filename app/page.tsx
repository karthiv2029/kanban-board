"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/common/Loader";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { isAuthenticated, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;
    router.replace(isAuthenticated ? "/dashboard" : "/login");
  }, [isLoaded, isAuthenticated, router]);

  return <Loader fullScreen label="Loading" />;
}
