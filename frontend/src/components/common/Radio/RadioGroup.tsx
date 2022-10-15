import { ReactElement } from 'react';

interface Props {
  label?: string;
  children: ReactElement;
}

export default function RadioGroup({ label, children }: Props) {
  return (
    <fieldset>
      <legend>{label}</legend>
      {children}
    </fieldset>
  );
}
