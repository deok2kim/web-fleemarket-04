import { ReactElement } from 'react';

interface Props {
  children: ReactElement;
  value: string;
  name: string;
  defaultChecked: boolean;
  disabled: boolean;
}

export default function Radio({ children, value, name, defaultChecked, disabled }: Props) {
  return (
    <label>
      <input type="radio" value={value} name={name} defaultChecked={defaultChecked} disabled={disabled} />
      {children}
    </label>
  );
}
