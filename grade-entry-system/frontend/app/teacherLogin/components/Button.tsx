"use client";

type ButtonProps = {
  label: string;
  onClick: () => void;
}

export default function Button ({ label, onClick }: ButtonProps) {
  return(
    <button
      type="button"
      onClick={onClick}
      className="btn btn-primary w-full"
    >
      {label}
    </button>
  );
}