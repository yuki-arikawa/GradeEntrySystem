import { ENDPOINTS } from "@/utils/endpoints";
import { useState } from "react";
import InputField from "../InputField";

type ChangePasswordFormProps = {
  onClose: () => void;
}

export default function ChangePasswordForm({ onClose }: ChangePasswordFormProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // パスワードチェック
    if(newPassword !== confirmPassword) {
      setMessage('新しいパスワードが一致しません。');
      return;
    }

    try{
      const response = await fetch(`${ENDPOINTS.CHPASS}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem('token'),
        },
        body: JSON.stringify({currentPassword, newPassword}),
      });

      if(!response.ok){
        const errorData = await response.json();
        setMessage(errorData.error || 'パスワード変更に失敗しました');
        return;
      }

      setMessage('パスワードが正常に変更されました');
      alert('パスワードが更新されました');
      onClose();
    }catch(error){
      console.error(error);
      setMessage('エラー発生');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium">現在のパスワード</label>
        <InputField type="password" placeholder="現在のパスワード" onChange={setCurrentPassword} />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">新しいパスワード</label>
        <InputField type="password" placeholder="新しいパスワード" onChange={(setNewPassword)} />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">新しいパスワード（確認用）</label>
        <InputField type="password" placeholder="新しいパスワード（確認用）" onChange={setConfirmPassword} />
      </div>
      {message && <p className="text-red-500 mb-4">{message}</p>}
      <button type="submit" className="w-full btn btn-primary">更新</button>
    </form>
  )
}
