import { IImage } from 'src/types/product.type';
import { IUser } from 'src/types/user.type';
import styled from 'styled-components';
import Product from './Product';

interface IProduct {
  id: number;
  createdAt: string;
  title: string;
  price: number;
  images: IImage[];
  user: IUser;
  views: number;
  likes: number;
  chatRoom: number;
  isView: boolean;
  isLike: boolean;
}

function Products() {
  const data = {
    data: {
      products: [
        {
          id: 1,
          createdAt: '2022-08-19T05:48:57.830Z',
          title: '맥북 프로',
          price: 1200000,
          images: [
            {
              id: 1,
              url: 'https://image.zdnet.co.kr/2020/02/25/jh7253_p8NqEoxVA8c2Y.jpg',
              productId: 1,
            },
            {
              id: 2,
              url: 'https://vana.kr/wp/wp-content/uploads/2022/01/DSC07848.jpg',
              productId: 1,
            },
          ],
          user: {
            id: 1,
            userRegions: [
              {
                id: 3,
                region: {
                  name: '서울특별시 종로구 누하동',
                },
              },
              {
                id: 2,
                region: {
                  name: '서울특별시 종로구 청운동',
                },
              },
            ],
          },
          views: 2,
          likes: 1,
          chatRoom: 1,
          isView: true,
          isLike: true,
        },
        {
          id: 3,
          createdAt: '2022-08-19T05:48:57.830Z',
          title: '텀블러',
          price: 5000,
          images: [
            {
              id: 3,
              url: 'https://vana.kr/wp/wp-content/uploads/2022/01/DSC07848.jpg',
              productId: 3,
            },
          ],
          user: {
            id: 1,
            userRegions: [
              {
                id: 3,
                region: {
                  name: '서울특별시 종로구 누하동',
                },
              },
              {
                id: 2,
                region: {
                  name: '서울특별시 종로구 청운동',
                },
              },
            ],
          },
          views: 0,
          likes: 1,
          chatRoom: 0,
          isView: false,
          isLike: true,
        },
        {
          id: 36,
          createdAt: '2022-08-20T04:04:40.191Z',
          title: '텍스트가 아주 길 때 테스트를 해보겠습니다.',
          price: 1500000,
          images: [
            {
              id: 52,
              url: 'https://www.sony.co.kr/image/86ef18640c4199cc7ce7150a5143460a?fmt=png-alpha&wid=660&hei=660',
              productId: 36,
            },
            {
              id: 53,
              url: 'https://www.apple.com/v/airpods-max/e/images/overview/hero__gnfk5g59t0qe_xlarge.png',
              productId: 36,
            },
          ],
          user: {
            id: 3,
            userRegions: [],
          },
          views: 0,
          likes: 0,
          chatRoom: 0,
          isView: false,
          isLike: false,
        },
        {
          id: 38,
          createdAt: '2022-08-20T04:10:18.304Z',
          title: '상품 등록 테스트 title',
          price: 1500000,
          images: [
            {
              id: 54,
              url: 'https://www.sony.co.kr/image/86ef18640c4199cc7ce7150a5143460a?fmt=png-alpha&wid=660&hei=660',
              productId: 38,
            },
            {
              id: 55,
              url: 'https://www.apple.com/v/airpods-max/e/images/overview/hero__gnfk5g59t0qe_xlarge.png',
              productId: 38,
            },
          ],
          user: {
            id: 3,
            userRegions: [],
          },
          views: 0,
          likes: 0,
          chatRoom: 1,
          isView: false,
          isLike: false,
        },
        {
          id: 45,
          createdAt: '2022-08-21T03:30:38.571Z',
          title: '상품 등록 테스트 title123123',
          price: 1500000,
          images: [
            {
              id: 69,
              url: 'https://www.sony.co.kr/image/86ef18640c4199cc7ce7150a5143460a?fmt=png-alpha&wid=660&hei=660',
              productId: 45,
            },
            {
              id: 70,
              url: 'https://www.apple.com/v/airpods-max/e/images/overview/hero__gnfk5g59t0qe_xlarge.png',
              productId: 45,
            },
          ],
          user: {
            id: 3,
            userRegions: [],
          },
          views: 0,
          likes: 0,
          chatRoom: 0,
          isView: false,
          isLike: false,
        },
        {
          id: 46,
          createdAt: '2022-08-21T03:31:12.750Z',
          title: '상품 등록 테스트 title1231235555',
          price: 1500000,
          images: [
            {
              id: 71,
              url: 'https://www.apple.com/v/airpods-max/e/images/overview/hero__gnfk5g59t0qe_xlarge.png',
              productId: 46,
            },
            {
              id: 72,
              url: 'https://www.sony.co.kr/image/86ef18640c4199cc7ce7150a5143460a?fmt=png-alpha&wid=660&hei=660',
              productId: 46,
            },
          ],
          user: {
            id: 3,
            userRegions: [],
          },
          views: 0,
          likes: 0,
          chatRoom: 0,
          isView: false,
          isLike: false,
        },
      ],
    },
    message: 'ok',
  };

  return (
    <Container>
      {data.data.products.map((product: IProduct) => (
        <Product key={product.id} product={product} />
      ))}
    </Container>
  );
}

export default Products;

const Container = styled.ul`
  height: calc(100vh - 190px);
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
