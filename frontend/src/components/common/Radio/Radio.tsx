import React, { Children, cloneElement, createContext, ReactElement } from 'react';

interface Props {
  children: ReactElement | ReactElement[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Radio({ children, onChange }: Props) {
  return (
    <>
      {Children.map(children, (child) => {
        return cloneElement(child, {
          name: child?.props.name,
          onChange: onChange,
        });
      })}
    </>
  );
}
