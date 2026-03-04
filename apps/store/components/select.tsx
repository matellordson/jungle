import Select, {
  StylesConfig,
  components,
  DropdownIndicatorProps,
} from "react-select";
import { ChevronDown } from "lucide-react";

const selectStyles: StylesConfig = {
  control: (base, state) => ({
    ...base,
    border: "var(--border)",
    backgroundColor:
      state.menuIsOpen || state.isFocused
        ? "var(--highlight)"
        : "var(--foreground)",
    padding: "2px 4px",
    fontFamily: "inherit",
    fontSize: "15px",
    color: "inherit",
    borderRadius: "5px",
    boxShadow: "none",
    "&:hover": {
      border: "var(--border)",
    },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "var(--foreground)",
    border: "var(--border)",
    borderRadius: "5px",
    padding: "5px",
    boxShadow: "var(--shadow)",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "var(--accent)" : "var(--foreground)",
    borderRadius: "5px",
    fontSize: "14px",
    color: state.isFocused ? "var(--accent-bg-text)" : "inherit",
    cursor: "pointer",
    "&:active": {
      backgroundColor: "var(--highlight)",
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: "inherit",
  }),
  placeholder: (base) => ({
    ...base,
    color: "var(--mute-text)",
  }),
  input: (base) => ({
    ...base,
    color: "inherit",
    font: "inherit",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "var(--mute-text)",
    padding: "0 6px",
    cursor: "pointer",
    "&:hover": { color: "inherit" },
  }),
};

function DropdownIndicator(props: DropdownIndicatorProps) {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDown size={16} strokeWidth={2} />
    </components.DropdownIndicator>
  );
}

interface optionsType {
  value: string;
  label: string;
}

export function SelectInput({ options }: { options: optionsType[] }) {
  return (
    <Select
      options={options}
      styles={selectStyles}
      components={{ DropdownIndicator }}
    />
  );
}
