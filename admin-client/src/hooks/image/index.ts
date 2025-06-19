import { useMutation } from '@tanstack/react-query';
import { uploadImage } from '@/api/image';

export function useUploadImageMutation() {
  return useMutation({
    mutationKey: ['uploadImage'],
    mutationFn: async (file: File) => {
      return await uploadImage(file);
    },
  });
}
