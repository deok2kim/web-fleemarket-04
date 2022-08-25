import { useState } from 'react';

export function useCategory() {
  const [category, setCategory] = useState(0);

  const onChangeCategory = (categoryId: number) => {
    setCategory(categoryId);
  };

  return { category, onChangeCategory };
}
