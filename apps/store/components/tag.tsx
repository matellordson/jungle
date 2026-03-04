"use client";
import { useState } from "react";
import CreatableSelect from "react-select/creatable";
import {
  StylesConfig,
  MultiValue,
  components,
  MultiValueRemoveProps,
  ClearIndicatorProps,
} from "react-select";
import { X } from "lucide-react";

type Option = { value: string; label: string };

const selectStyles: StylesConfig<Option, true> = {
  control: (base, state) => ({
    ...base,
    border: "var(--border)",
    backgroundColor:
      state.menuIsOpen || state.isFocused
        ? "var(--highlight)"
        : "var(--foreground)",
    fontFamily: "inherit",
    fontSize: "15px",
    color: "inherit",
    borderRadius: "5px",
    boxShadow: "none",
    minHeight: "42px",
    "&:hover": {
      border: "var(--border)",
    },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "var(--foreground)",
    border: "var(--border)",
    borderRadius: "5px",
    boxShadow: "var(--shadow)",
  }),
  menuList: (base) => ({
    ...base,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "var(--highlight)" : "var(--highlight)",
    color: "inherit",
    borderRadius: "3px",
    fontSize: "15px",
    padding: "6px 10px",
    cursor: "pointer",
    "&:active": {
      backgroundColor: "var(--highlight)",
    },
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "var(--highlight)",
    padding: "3px",
    textTransform: "capitalize",
    border: "var(--border)",
    borderRadius: "4px",
    margin: "2px",
    color: "var(--text-light)",
    font: "inherit",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "inherit",
    fontSize: "13px",
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "var(--mute-text)",
    borderRadius: "0 4px 4px 0",
    paddingRight: "6px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "transparent",
      color: "inherit",
    },
  }),
  placeholder: (base) => ({
    ...base,
    color: "var(--mute-text)",
    fontSize: "15px",
  }),
  input: (base) => ({
    ...base,
    color: "inherit",
    font: "inherit",
    fontSize: "15px",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: () => ({ display: "none" }),
  clearIndicator: (base) => ({
    ...base,
    color: "var(--mute-text)",
    padding: "0 6px",
    cursor: "pointer",
    "&:hover": { color: "inherit" },
  }),
  noOptionsMessage: (base) => ({
    ...base,
    color: "var(--mute-text)",
    fontSize: "14px",
  }),
};

function MultiValueRemove(props: MultiValueRemoveProps<Option>) {
  return (
    <components.MultiValueRemove {...props}>
      <X size={12} strokeWidth={2.5} />
    </components.MultiValueRemove>
  );
}

function ClearIndicator(props: ClearIndicatorProps<Option, true>) {
  return (
    <components.ClearIndicator {...props}>
      <X size={14} strokeWidth={2.5} />
    </components.ClearIndicator>
  );
}

function toOption(raw: string): Option {
  const v = raw.trim().toLowerCase();
  return { value: v, label: v };
}

export function Tags({
  placeholder = "Tags",
  width,
  initialTags = [],
  onChange,
}: {
  placeholder?: string;
  width?: string;
  initialTags?: string[];
  onChange?: (tags: string[]) => void;
}) {
  const [value, setValue] = useState<MultiValue<Option>>(
    initialTags.map(toOption),
  );
  const [inputValue, setInputValue] = useState("");

  const commit = (raw: string) => {
    const trimmed = raw.trim().toLowerCase();
    if (!trimmed || value.some((o) => o.value === trimmed)) return;
    const next = [...value, toOption(trimmed)];
    setValue(next);
    onChange?.(next.map((o) => o.value));
    setInputValue("");
  };

  return (
    <div style={{ width }}>
      <CreatableSelect<Option, true>
        isMulti
        isClearable
        menuIsOpen={false}
        value={value}
        inputValue={inputValue}
        onChange={(next) => {
          setValue(next);
          onChange?.(next.map((o) => o.value));
        }}
        onInputChange={(val, { action }) => {
          if (action === "input-change") setInputValue(val);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === "," || e.key === " ") {
            e.preventDefault();
            commit(inputValue);
          }
        }}
        onBlur={() => commit(inputValue)}
        options={[]}
        placeholder={placeholder}
        styles={selectStyles}
        components={{
          DropdownIndicator: null,
          MultiValueRemove,
          ClearIndicator,
        }}
      />
    </div>
  );
}
