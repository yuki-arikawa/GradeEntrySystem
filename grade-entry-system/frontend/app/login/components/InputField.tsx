type InputFieldProps = {
  type: string;
  placeholder: string;
};

export default function InputField({ type, placeholder}: InputFieldProps) {
  return(
    <div className="mb-4">
      <input
        type={type}
        placeholder={placeholder}
        className="input input-bordered w-full"
      />
    </div>
  );
}