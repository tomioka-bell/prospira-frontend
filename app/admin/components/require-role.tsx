"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useUser } from "../contexts/UserContext";
import { motion } from "framer-motion";

type RequireRoleProps = {
  children: React.ReactNode;
  allow: string[];
};

export function RequireRole({ children, allow }: RequireRoleProps) {
  const router = useRouter();
  const { user, loading, hasAnyRole } = useUser();

  useEffect(() => {
    if (!loading && user && !hasAnyRole(...allow)) {
      toast.error("คุณไม่มีสิทธิ์เข้าถึงหน้านี้");
    }
  }, [loading, user, allow, hasAnyRole]);

  useEffect(() => {
    if (!loading && (!user || !hasAnyRole(...allow))) {
      router.replace("/unauthorized");
    }
  }, [loading, user, allow, hasAnyRole, router]);

  if (loading)
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-teal-400 animate-pulse shadow-lg" />
          <span className="text-gray-500 text-sm font-medium tracking-wide">
            กําลังโหลด...
          </span>
        </motion.div>
      </div>
    );

  if (!user || !hasAnyRole(...allow)) {
    return null;
  }

  return <>{children}</>;
}
