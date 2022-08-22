import { TColorToken } from 'src/styles/theme';
import styled, { css } from 'styled-components';
import Icon from '../Icon/Icon';

interface Props {
  headerTheme: THeaderTheme;
  className?: string;
  left: React.ReactNode;
  center: React.ReactNode;
  right: React.ReactNode;
}

interface IHeaderThemeColor {
  backgroundColor: TColorToken;
  color: TColorToken;
  opacity?: number;
}

type THeaderTheme = 'primary' | 'white' | 'offWhite' | 'transparent';

function Header({ headerTheme, left, center, right }: Props) {
  return (
    <Container headerTheme={headerTheme}>
      <LeftWrapper>{left}</LeftWrapper>
      <CenterWrapper>{center}</CenterWrapper>
      <RightWrapper>{right}</RightWrapper>
    </Container>
  );
}

export default Header;

const LeftWrapper = styled.div``;

const RightWrapper = styled.div`
  visibility: hidden;
`;

const CenterWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  color: inherit;
`;

const setHeaderThemeColor = (headerTheme: THeaderTheme): IHeaderThemeColor => {
  if (headerTheme === 'primary') {
    return {
      backgroundColor: 'primary200',
      color: 'white',
    };
  } else if (headerTheme === 'white') {
    return {
      backgroundColor: 'white',
      color: 'black',
    };
  } else if (headerTheme === 'offWhite') {
    return {
      backgroundColor: 'offWhite',
      color: 'black',
    };
  } else {
    return {
      backgroundColor: 'transparent',
      color: 'black',
      opacity: 0.5,
    };
  }
};

const Container = styled.div<Pick<Props, 'headerTheme'>>`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  ${({ theme }) => theme.fonts.linkSmall}
  ${({ theme, headerTheme }) => {
    const { backgroundColor, color, opacity = 1 } = setHeaderThemeColor(headerTheme);
    return css`
      background-color: ${theme.color[backgroundColor]};
      color: ${theme.color[color]};
      opacity: ${opacity};
    `;
  }};
`;
