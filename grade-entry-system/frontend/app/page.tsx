import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const runtime = 'edge';

export default async function Home() {
  // クッキーからトークン取得
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if(token){
    redirect('/dashboard');
  }else{
    redirect('/login');
  }

  return null;
}
