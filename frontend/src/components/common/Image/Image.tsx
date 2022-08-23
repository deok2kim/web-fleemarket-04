import styled, { css } from 'styled-components';

import * as images from 'src/components/common/Image/imagePath';
import { TStyledTheme } from 'src/styles/theme';

export type TImageToken = keyof typeof images;
interface Props {
  name?: TImageToken;
  src?: string;
  width?: number;
  height?: number;
  box?: TImageBox;
  borderRadius?: number;
  alt?: string;
  onClick?: () => void;
}

type TImageBox = 'sm' | 'md' | 'lg' | 'gradient';

const boxSize: Record<TImageBox, Record<string, string>> = {
  sm: {
    width: '40px',
    height: '40px',
  },
  md: {
    width: '76px',
    height: '76px',
  },
  lg: {
    width: '106px',
    height: '106px',
  },
  gradient: {
    width: '100%',
    height: '100%',
  },
};

const boxBorderRadius: Record<TImageBox, number> = {
  sm: 6,
  md: 8,
  lg: 10,
  gradient: 0,
};

const setImageBox = (box: TImageBox, theme: TStyledTheme) => {
  const size = boxSize[box];
  if (box === 'gradient') {
    const background =
      'linear-gradient(180deg, rgba(0, 0, 0, 0.24) 0%, rgba(0, 0, 0, 0) 16.52%, rgba(0, 0, 0, 0) 87.36%, rgba(0, 0, 0, 0.24) 100%);';
    return css`
      ${size};
      background: ${background};
    `;
  }

  const border = `1px solid ${theme.color.grey300}`;
  return css`
    ${size};
    border: ${border};
  `;
};

function Image({ name, src, width, height, box, borderRadius, alt, onClick }: Props) {
  const imgSrc = name ? images[name] : src;

  const _width = box ? boxSize[box].width : width;
  const _height = box ? boxSize[box].height : height;
  const _borderRadius = box ? boxBorderRadius[box] : borderRadius;

  return (
    <Wrapper onClick={onClick} width={width} height={height} borderRadius={_borderRadius} box={box}>
      <ImageComponent src={imgSrc ?? ''} width={_width} height={_height} borderRadius={_borderRadius} alt={alt ?? ''} />
    </Wrapper>
  );
}

export default Image;

const Wrapper = styled.div<Pick<Props, 'width' | 'height' | 'borderRadius' | 'box'>>`
  width: ${({ width }) => width && `${width}px`};
  height: ${({ height }) => height && `${height}px`};
  border-radius: ${({ borderRadius }) => borderRadius && `${borderRadius}px`};
  ${({ theme, box }) => box && setImageBox(box, theme)};
`;

const ImageComponent = styled.img<Pick<Props, 'borderRadius'>>`
  border-radius: ${({ borderRadius }) => `${borderRadius}px`};
`;
