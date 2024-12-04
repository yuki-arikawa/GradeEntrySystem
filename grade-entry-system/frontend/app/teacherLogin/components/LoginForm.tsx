"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";
import InputField from "../../components/InputField";
import { ENDPOINTS } from "@/utils/endpoints";
import { redirect } from "next/navigation";

export default function LoginForm(){
  const [id, setId] = useState(0);
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try{
      const response = await fetch(ENDPOINTS.LOGIN, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({id, password}),
        credentials: 'include',
      });

      if(response.ok) {
        console.log("Login successful");
        const data = await response.json();
        localStorage.setItem('token', data.token);
        if(data.role !== 'teacher'){
          redirect("/login");
        }
        redirect("/teacher");
      }else{
        console.log("Login failed");
      }
    }catch(error){
      console.error("Error during login:", error);
    }
  };

  const handleChangeId = (newId: string) => {
    setId(parseInt(newId, 10) || 0);
  }

  const handleChangePassword = (newPassword: string) => {
    setPassword(newPassword);
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-80">
      <form>
        <InputField type="text" placeholder="ID" onChange={handleChangeId}/>
        <InputField type="password" placeholder="Password" onChange={handleChangePassword} />
        <Button label="ログイン" onClick={handleLogin}/>
      </form>
    </div>
  );
}