import { useMutation } from 'react-query';
import { uploadImage } from 'src/api/image';

export const useImageUploadMutation = () => {
  return useMutation(uploadImage);
};
