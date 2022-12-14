import styled, { css } from 'styled-components';

import * as icons from 'src/components/common/Icon/iconPath';
import { TColorToken } from 'src/styles/theme';
import React from 'react';

export interface Props {
  name: keyof typeof icons;

  rotate?: 0 | 90 | 180 | 270;
  size?: number;
  fillColor?: TColorToken;
  strokeColor?: TColorToken;
  opacity?: string;
  className?: string;

  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

function Icon({ name, size, rotate, fillColor, strokeColor, opacity, className, onClick }: Props) {
  const SVGIcon = icons[name];

  return (
    <SVGWrap
      onClick={onClick}
      size={size}
      fillColor={fillColor}
      strokeColor={strokeColor}
      opacity={opacity}
      className={className}
      rotate={rotate}
    >
      <SVGIcon />
    </SVGWrap>
  );
}
export default Icon;

const SVGWrap = styled.div<Pick<Props, 'size' | 'fillColor' | 'strokeColor' | 'opacity' | 'rotate'>>`
  width: ${({ size }) => `${size ? size : 'auto'}px`};
  height: ${({ size }) => `${size ? size : 'auto'}px`};
  display: inline-block;
  opacity: ${({ opacity }) => opacity || '1'};
  ${({ rotate }) =>
    rotate &&
    css`
      transform: rotate(${rotate}deg);
    `};
  & svg {
    width: auto;
    height: 100%;
    display: block;
  }
  & path,
  & circle,
  & g {
    fill: ${({ fillColor, theme }) => fillColor && `${theme.color[fillColor]}`};
    stroke: ${({ strokeColor, theme }) => strokeColor && `${theme.color[strokeColor]}`};
  }
`;
