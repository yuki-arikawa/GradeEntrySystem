'use client'
import ChangePasswordForm from "./ChangePasswordForm"

type SettingModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SettingModal({isOpen, onClose}: SettingModalProps) {
  if(!isOpen) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <h2 className="text-2xl mb-4">設定</h2>
        <ChangePasswordForm onClose={onClose} />
        <button onClick={onClose} className="mt-4 w-full btn btn-secondary">
          閉じる
        </button>
      </div>
    </div>
  )
}
