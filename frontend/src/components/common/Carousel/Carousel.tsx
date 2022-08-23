import Slider from 'react-slick';
import styled from 'styled-components';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image, { TImageToken } from '../Image/Image';
import { PropsWithChildren } from 'react';

function Carousel({ children }: PropsWithChildren) {
  const settings = {
    dots: true,
  };
  return (
    <Container>
      <Slider {...settings}>{children}</Slider>
    </Container>
  );
}

interface ImageItemProps {
  src?: string;
  name?: TImageToken;
}

Carousel.ImageItem = function ImageItem({ src, name }: ImageItemProps) {
  return (
    <ImageWrapper>
      <Image src={src} name={name} box="gradient" />
    </ImageWrapper>
  );
};

export default Carousel;

const Container = styled.div`
  .slick-slide {
    margin: auto;
  }

  .slick-dots {
    bottom: 16px;

    li {
      button:before {
        content: '';
        width: 8px;
        height: 8px;
        border: 1px solid ${({ theme }) => theme.color.white};
        border-radius: 50%;
        opacity: 1;
      }

      &.slick-active {
        button:before {
          content: '';
          background-color: ${({ theme }) => theme.color.white};
        }
      }
    }
  }
`;

const ImageWrapper = styled.div`
  height: 320px;

  img {
    width: 100%;
    margin: auto;
    object-fit: contain;
  }
`;
