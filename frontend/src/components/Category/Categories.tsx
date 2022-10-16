import React, { useState } from 'react';
import { useCategoriesQuery } from 'src/queries/category';
import styled from 'styled-components';
import Radio from '../common/Radio/Radio';
import RadioOption from '../common/Radio/RadioOption';
import Category from './Category';

interface Props {
  selectedCategory: number;
  onChangeCategory: (categoryId: number) => void;
  isPost?: boolean;
}

function Categories({ isPost, selectedCategory, onChangeCategory }: Props) {
  const { data: categoryList } = useCategoriesQuery();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  if (!categoryList) return null;

  return (
    <Container>
      <Radio onChange={(e) => handleChange(e)}>
        {categoryList.data.categories.map((category) => (
          <RadioOption key={category.id} name="category" value={category.id}>
            <Category category={category} selectedCategory={selectedCategory} onChangeCategory={onChangeCategory} />
          </RadioOption>
        ))}
      </Radio>
    </Container>
  );
}

export default Categories;

const Container = styled.div`
  padding: 8px;
  height: 50px;
  background-color: ${({ theme }) => theme.color.white};
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
