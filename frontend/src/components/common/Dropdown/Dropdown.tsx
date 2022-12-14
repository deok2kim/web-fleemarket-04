import React, { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

const DropdownContext = createContext({
  open: false,
  toggle: () => {},
});

export function Dropdown({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as HTMLElement)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [dropdownRef]);

  return (
    <>
      <DropdownContext.Provider value={{ open, toggle }}>
        <DropdownContainer ref={dropdownRef}>{children}</DropdownContainer>
      </DropdownContext.Provider>
    </>
  );
}

function Toggle({ children }: PropsWithChildren) {
  const { toggle } = useContext(DropdownContext);

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    toggle();
  };

  return <div onClick={onClick}>{children}</div>;
}

type TPosition = 'left' | 'right' | 'center';

interface ListProps {
  position: TPosition;
  top?: number;
}

function List({ position, top, children }: PropsWithChildren<ListProps>) {
  const { open } = useContext(DropdownContext);

  if (!open) {
    return null;
  }

  return (
    <ListContainer position={position} top={top}>
      {children}
    </ListContainer>
  );
}

interface ItemProps {
  onClick?: () => void;
}

function Item({ onClick, children }: PropsWithChildren<ItemProps>) {
  const { toggle } = useContext(DropdownContext);

  const onClickItem = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    if (onClick) onClick();
    toggle();
  };
  return <LiWrapper onClick={onClickItem}>{children}</LiWrapper>;
}

const POSITION_DIRECTION = {
  left: css`
    left: 0;
  `,
  center: css`
    left: 50%;
    transform: translateX(-50%);
  `,
  right: css`
    right: 0;
  `,
};

const setPosition = (position: TPosition) => {
  return POSITION_DIRECTION[position];
};

Dropdown.Toggle = Toggle;
Dropdown.List = List;
Dropdown.Item = Item;

export default Dropdown;

const DropdownContainer = styled.div`
  position: relative;
  width: fit-content;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  z-index: 1;

  &:hover {
    cursor: pointer;
  }
`;

const ListContainer = styled.ul<{ position: TPosition; top?: number }>`
  width: 165px;

  box-shadow: 0px 0px 4px rgba(204, 204, 204, 0.5), 0px 2px 4px rgba(0, 0, 0, 0.25);
  position: absolute;
  top: ${({ top }) => `${top}px` ?? '48px'};

  ${({ position }) => setPosition(position)};

  overflow: hidden;

  display: flex;
  flex-direction: column;
  gap: 1px;

  background-color: ${({ theme }) => theme.color.grey300};
  backdrop-filter: blur(4px);
  border-radius: 10px;
`;

const LiWrapper = styled.li`
  ${({ theme }) => theme.fonts.linkSmall};
  padding: 16px;
  width: 100%;
  height: 48px;

  background-color: ${({ theme }) => theme.color.white};

  &:hover {
    background-color: ${({ theme }) => theme.color.offWhite};
  }
`;
