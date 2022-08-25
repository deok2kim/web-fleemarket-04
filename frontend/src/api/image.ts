import axios from 'axios';

/**
 * 이미지 업로드 API
 * @description 이미지를 업로드합니다.
 **/
export const uploadImage = async (images: File[]) => {
  const formData = new FormData();

  images.forEach((image) => {
    formData.append('images', image);
  });

  const { data } = await axios.post(`images/upload`, formData);
  return data.data.urls;
};
