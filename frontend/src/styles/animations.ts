import { keyframes } from 'styled-components';

export const animations = {
  fadeIn: keyframes`
  from {
    opacity:0;
  }
  to {
    opacity:1;
  }
`,
  fadeOut: keyframes`
  from {
    opacity:1;
  }
  to {
    opacity:0;
  }
`,
  slideInFromRightToLeft: keyframes`
  from {
    transform: translateX(100%);
  } to {
    transform: translateX(0);
  }
`,
};
