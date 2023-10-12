import { SelectButton } from 'primereact/selectbutton';
import { Dropdown } from 'primereact/dropdown';

const template = (option: Record<string, string>) => {
  return <i className={option['icon']}></i>;
};

interface ThemeToggleProps {
  onChange: (value: string) => void;
  value: Record<string, string>;
  options: Array<Record<string, string>>;
}

const valueTemplate = (value: Record<string, string>) => {
  return (
    <div className="flex align-items-center">
      <span className={value ? value['icon'] : ''}></span>
      {/* <div>{option.value}</div> */}
    </div>
  );
};

const optionTemplate = (value: Record<string, string>) => {
  return (
    <div className="flex align-items-center">
      <span className={value ? value['icon'] : ''}></span>
      {/* <div>{option.value}</div> */}
    </div>
  );
};

export const ThemeToggle = ({ onChange, options, value }: ThemeToggleProps) => {
  return (
    <div>
      <Dropdown
        value={value['value']}
        valueTemplate={(o) => valueTemplate(o)}
        onChange={(e) => onChange(e.value)}
        options={options}
        itemTemplate={optionTemplate}
        optionLabel="icon"
        placeholder="Select theme"
      />
    </div>
  );
};
