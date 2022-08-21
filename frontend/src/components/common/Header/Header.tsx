import { TColorToken } from 'src/styles/theme';
import styled, { css } from 'styled-components';
import Icon from '../Icon/Icon';

interface Props {
  headerTheme: THeaderTheme;
  className?: string;
}

interface IHeaderThemeColor {
  backgroundColor: TColorToken;
  color: TColorToken;
  opacity?: number;
}

type THeaderTheme = 'primary' | 'white' | 'transparent';

function Header({ headerTheme }: Props) {
  const testLocation = '역삼동';
  return (
    <Container headerTheme={headerTheme}>
      <Icon name="iconSearch" strokeColor="white" />
      <LocationWrapper>
        <Icon name="iconMapPin" strokeColor="white" />
        {testLocation}
      </LocationWrapper>
      <EndWrapper>공백</EndWrapper>
    </Container>
  );
}

export default Header;

const EndWrapper = styled.div`
  visibility: hidden;
`;

const LocationWrapper = styled.button`
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
  } else {
    return {
      backgroundColor: 'transparent',
      color: 'black',
      opacity: 0.5,
    };
  }
};

const Container = styled.div<Props>`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  ${({ theme }) => theme.fonts.linkSmall}
  ${(props) => {
    const { backgroundColor, color, opacity = 1 } = setHeaderThemeColor(props.headerTheme);
    return css`
      background-color: ${props.theme.color[backgroundColor]};
      color: ${props.theme.color[color]};
      opacity: ${opacity};
    `;
  }};
`;
