'use client'

import { ENDPOINTS } from "@/utils/endpoints";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

type RequireAuthProps = {
  children: ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(ENDPOINTS.CHECK, {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
          credentials: 'include',
        });

        if(!response.ok){
          router.push('/login');
        }
      }catch(error){
        console.error('Failed to check authorization:', error);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  return (
    <>{children}</>
  )
}
