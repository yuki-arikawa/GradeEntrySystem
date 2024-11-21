import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/auth";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if(token){
      router.push('/dashboard');
    }else{
      router.push('/login');
    }
  }, [router]);

  return null;
}
