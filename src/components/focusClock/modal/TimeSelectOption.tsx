import OptionPill from "@/components/common/OptionPill";

export interface TimeOption {
  id: string;
  label: string;
  value: number;
}

export interface TimeSelectOptionProps {
  label: string;
  name: string;
  options: TimeOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  customValue: string;
  onCustomValueChange: (customVal: string) => void;
  maxCustomMinutes?: number;
}

export function TimeSelectOption({
  label,
  name,
  options,
  selectedValue,
  onValueChange,
  customValue,
  onCustomValueChange,
  maxCustomMinutes = 180,
}: TimeSelectOptionProps) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium text-text-main">{label}</label>
      <div className="flex flex-wrap items-center gap-2">
        {options.map((opt) => (
          <OptionPill
            key={opt.id}
            id={opt.id}
            name={name}
            value={String(opt.value)}
            label={opt.label}
            isChecked={selectedValue === String(opt.value)}
            onChange={onValueChange}
          />
        ))}

        {/* Option Custom */}
        <OptionPill
          id={`${name}-custom`}
          name={name}
          value="custom"
          label="custom..."
          isChecked={selectedValue === "custom"}
          onChange={onValueChange}
          isCustom
          customValue={customValue}
          onCustomChange={onCustomValueChange}
          maxCustomMinutes={maxCustomMinutes}
        />
      </div>
    </div>
  );
}

export default TimeSelectOption;
