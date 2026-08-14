export interface OptionPillProps {
    id: string;
    name: string;
    value: string;
    label: string;
    isChecked: boolean;
    onChange: (value: string) => void;
    isCustom?: boolean;
    customValue?: string;
    onCustomChange?: (val: string) => void;
    maxCustomMinutes?: number;
}

export function OptionPill({
    id,
    name,
    value,
    label,
    isChecked,
    onChange,
    isCustom = false,
    customValue = "",
    onCustomChange,
    maxCustomMinutes = 180,
}: OptionPillProps) {
    if (isCustom && isChecked) {
        return (
            <div className="inline-flex items-center justify-center w-19 h-6 bg-gray-100 border border-primary-600 rounded-full px-1.5 focus-within:ring-2 focus-within:ring-primary-600/20 shrink-0">
                <input
                    type="number"
                    min="1"
                    max={maxCustomMinutes}
                    placeholder="custom"
                    value={customValue}
                    onChange={(e) => onCustomChange?.(e.target.value)}
                    className="w-full text-center text-xs text-text-main bg-transparent outline-none font-text-default hide-spinner"
                    autoFocus
                />
            </div>
        );
    }

    return (
        <label
            htmlFor={id}
            className={`cursor-pointer inline-flex items-center justify-center w-14.25 h-6 rounded-full text-xs font-text-default border transition-all duration-200 select-none shrink-0 ${isChecked
                ? "bg-primary-600 border-primary-600 text-white font-semibold shadow-sm"
                : "bg-gray-100 border-border text-text-main hover:bg-gray-200"
                }`}
        >
            <input
                type="radio"
                id={id}
                name={name}
                value={value}
                checked={isChecked}
                onChange={(e) => {
                    onChange(e.target.value);
                }}
                className="sr-only"
            />
            {label}
        </label>
    );
}

export default OptionPill;
