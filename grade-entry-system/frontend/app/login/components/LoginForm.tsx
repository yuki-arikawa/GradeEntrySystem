"use client";

import Button from "./Button";
import InputField from "./InputField";

export default function LoginForm(){
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-80">
      <form>
        <InputField type="text" placeholder="ID" />
        <InputField type="password" placeholder="Password" />
        <Button label="ログイン" onClick={() => console.log("click")}/>
      </form>
    </div>
  );
}