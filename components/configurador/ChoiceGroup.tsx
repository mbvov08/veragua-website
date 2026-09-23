type Option<T extends string> = { value: T; label: string };

type ChoiceGroupProps<T extends string> = {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
};

export function ChoiceGroup<T extends string>({
  options,
  value,
  onChange,
  className = "",
}: ChoiceGroupProps<T>) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`rounded-full border px-5 py-2.5 text-sm font-medium transition ${
              selected
                ? "border-verde-950 bg-verde-950 text-beige-100"
                : "border-beige-400 bg-beige-100 text-verde-800 hover:border-verde-950"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
