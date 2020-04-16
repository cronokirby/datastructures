interface InputProps {
  // An optional placeholder for this input
  placeholder?: string;
  // The current value for the input
  value: string;
  // Setting the new value for the input
  onChange(v: string): void;
}

export default function Input({ placeholder, value, onChange }: InputProps) {
  return (
    <input
      className="w-full rounded p-1 shadow-inner bg-gray-200"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    ></input>
  );
}
