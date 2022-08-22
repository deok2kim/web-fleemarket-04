import { IUser } from './user';

export interface IImage {
  id: number;
  url: string;
  productId: number;
}

export interface IProduct {
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
