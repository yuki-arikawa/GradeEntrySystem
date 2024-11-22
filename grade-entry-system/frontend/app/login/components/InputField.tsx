type InputFieldProps = {
  type: string;
  placeholder: string;
  onChange: (value: string) => void;
};

export default function InputField({ type, placeholder, onChange}: InputFieldProps) {
  return(
    <div className="mb-4">
      <input
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="input input-bordered w-full"
      />
    </div>
  );
}