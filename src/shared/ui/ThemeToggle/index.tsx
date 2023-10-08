import { SelectButton } from 'primereact/selectbutton';
import { Dropdown } from 'primereact/dropdown';

const template = (option: Record<string, string>) => {
  return <i className={option['icon']}></i>;
};

interface ThemeToggleProps {
  onChange: (value: string) => void;
  value: string;
  options: Array<Record<string, string>>;
}

export const ThemeToggle = ({ onChange, options, value }: ThemeToggleProps) => {
  console.log('value', value);
  return (
    <div>
      {/* <SelectButton
        value={value}
        onChange={(e) => {
          onChange(e.value);
        }}
        itemTemplate={template}
        optionLabel="value"
        options={options}
      /> */}
      <Dropdown
        value={value}
        onChange={(e) => onChange(e.value)}
        options={options}
        optionLabel="value"
        placeholder="Select a City"
      />
    </div>
  );
};
