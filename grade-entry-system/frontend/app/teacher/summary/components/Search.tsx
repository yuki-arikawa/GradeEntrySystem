import InputField from "@/app/components/InputField";

type SearchProps = {
  onDateChange: (value: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
}

export default function Search({ onDateChange, onSearchSubmit }: SearchProps) {

  return (
    <form onSubmit={onSearchSubmit} className="w-3/4 mx-auto my-2 flex justify-center gap-4">
      <InputField 
        type="date"
        placeholder="日付"
        onChange={(value) => onDateChange(value)}
      />
      <button type="submit" className="btn btn-primary w-auto">
        検索
      </button>
    </form>
  )
}
