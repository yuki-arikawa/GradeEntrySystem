type InputFieldProps = {
  type: string;
  placeholder: string;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
};

export default function InputField({
  type,
  placeholder,
  onChange,
  min,
  max,
}: InputFieldProps) {
  return(
    <div className="mb-4">
      <input
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="input input-bordered w-full"
        min={min}
        max={max}
      />
    </div>
  );
}