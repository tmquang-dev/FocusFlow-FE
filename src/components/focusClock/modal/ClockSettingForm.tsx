import { useState, type SyntheticEvent } from "react";
import Button from "@/components/common/Button";
import TimeSelectOption, { type TimeOption } from "./TimeSelectOption";

const FOCUS_OPTIONS: TimeOption[] = [
  { id: "focus-25", label: "25:00", value: 1500 },
  { id: "focus-40", label: "40:00", value: 2400 },
  { id: "focus-50", label: "50:00", value: 3000 },
];

const BREAK_OPTIONS: TimeOption[] = [
  { id: "break-05", label: "05:00", value: 300 },
  { id: "break-10", label: "10:00", value: 600 },
  { id: "break-15", label: "15:00", value: 900 },
];

export interface ClockSettingFormProps {
  onClose?: () => void;
  onSave?: (settings: { focusTime: number; breakTime: number }) => void;
}

export function ClockSettingForm({ onClose, onSave }: ClockSettingFormProps) {
  const [focusValue, setFocusValue] = useState<string>("1500");
  const [customFocus, setCustomFocus] = useState<string>("");

  const [breakValue, setBreakValue] = useState<string>("300");
  const [customBreak, setCustomBreak] = useState<string>("");

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const finalFocus =
      focusValue === "custom"
        ? Math.max(1, Number(customFocus) || 25) * 60
        : Number(focusValue);
    const finalBreak =
      breakValue === "custom"
        ? Math.max(1, Number(customBreak) || 5) * 60
        : Number(breakValue);

    onSave?.({ focusTime: finalFocus, breakTime: finalBreak });
    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
      {/* ===== FOCUS TIME SECTION ===== */}
      <TimeSelectOption
        label="Focus time:"
        name="focusTime"
        options={FOCUS_OPTIONS}
        selectedValue={focusValue}
        onValueChange={setFocusValue}
        customValue={customFocus}
        onCustomValueChange={setCustomFocus}
        maxCustomMinutes={180}
      />

      {/* ===== BREAK TIME SECTION ===== */}
      <TimeSelectOption
        label="Break time:"
        name="breakTime"
        options={BREAK_OPTIONS}
        selectedValue={breakValue}
        onValueChange={setBreakValue}
        customValue={customBreak}
        onCustomValueChange={setCustomBreak}
        maxCustomMinutes={60}
      />

      {/* ===== ACTION BUTTONS ===== */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-border mt-2">
        <Button
          type="button"
          variant="outlined"
          onClick={onClose}
          className="flex-1 py-2.25 text-text-main"
        >
          Cancel
        </Button>
        <Button type="submit" variant="primary" className="flex-1 py-2.25">
          Save
        </Button>
      </div>
    </form>
  );
}

export default ClockSettingForm;
