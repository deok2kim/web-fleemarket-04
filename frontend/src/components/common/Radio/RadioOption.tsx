import { InputHTMLAttributes, ReactElement } from 'react';
import styled from 'styled-components';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {}

export default function RadioOption({ name, value, children, ...rest }: Props) {
  return (
    <label>
      <RadioInput type="radio" name={name} value={value} {...rest} />
      {children}
    </label>
  );
}

const RadioInput = styled.input`
  position: absolute;
  padding: 0;
  margin: -1px;
  width: 1px;
  height: 1px;
  border: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  -webkit-appearance: none;
`;
