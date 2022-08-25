import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Categories from 'src/components/Category/Categories';
import Header from 'src/components/common/Header/Header';
import Icon from 'src/components/common/Icon/Icon';
import ImageUpload from 'src/components/Post/ImageUpload';
import { HOUR_SECOND } from 'src/constants/time';
import withAuth from 'src/hocs/withAuth';
import { useAddProductMutation, useProductDetail } from 'src/queries/product';
import styled, { css } from 'styled-components';

interface IFormData {
  title: string;
  category: number;
  price: string;
  content: string;
  urls: string[];
}

function Post() {
  const productId = useParams<{ id: string }>().id as string;
  const { data: productDetail } = useProductDetail(+productId, {
    enabled: !!productId,
    staleTime: HOUR_SECOND,
  });
  const addProductMutation = useAddProductMutation();
  const navigate = useNavigate();
  const [isVisibleCategory, setIsVisibleCategory] = useState(false);
  const [formData, setFormData] = useState<IFormData>({
    title: '',
    category: 0,
    price: '',
    content: '',
    urls: [],
  });
  const isInputPrice = !!formData.price;
  const isSubmittable = formData.title && formData.category && formData.content && formData.urls.length ? true : false;

  const onClickBack = () => {
    navigate(-1);
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setFormData((prev) => ({
      ...prev,
      title: value,
    }));
  };

  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (isNaN(+value)) return;

    setFormData((prev) => ({
      ...prev,
      price: value,
    }));
  };

  const onChangeCategory = (categoryId: number) => {
    setFormData((prev) => ({
      ...prev,
      category: categoryId,
    }));
  };

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    setFormData((prev) => ({
      ...prev,
      content: value,
    }));
  };

  const onFocusOutTitle = () => {
    if (formData.title) {
      setIsVisibleCategory(true);
      return;
    }

    setIsVisibleCategory(false);
  };

  const addUrls = (newUrls: string[]) => {
    setFormData((prev) => ({
      ...prev,
      urls: [...prev.urls, ...newUrls],
    }));
  };

  const removeUrl = (removeIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      urls: prev.urls.filter((_, index) => index !== removeIndex),
    }));
  };

  const onSubmitPost = () => {
    if (!isSubmittable) return;

    const { title, urls, price, category, content } = formData;
    addProductMutation.mutate(
      {
        title,
        content,
        price: +price,
        images: urls,
        categoryId: category,
      },
      {
        onSuccess: (addProductResponse) => {
          const productId = addProductResponse.data.id;
          navigate(`/products/${productId}`);
        },
      },
    );
  };

  return (
    <>
      <Header
        headerTheme="offWhite"
        left={<Icon name="iconChevronLeft" onClick={onClickBack} />}
        center={<p>글쓰기</p>}
        right={
          <SubmitText isSubmittable={isSubmittable} onClick={onSubmitPost}>
            완료
          </SubmitText>
        }
      />
      <Container>
        <ImageUpload urls={formData.urls} addUrls={addUrls} removeUrl={removeUrl} />
        <Input
          type="text"
          placeholder="글 제목"
          value={formData.title}
          onChange={onChangeTitle}
          onBlur={onFocusOutTitle}
        />
        {isVisibleCategory && (
          <CategoryWrapper>
            <p>(필수) 카테고리를 선택해주세요</p>
            <Categories selectedCategory={formData.category} onChangeCategory={onChangeCategory} isPost={true} />
          </CategoryWrapper>
        )}
        <PriceWrapper isInput={isInputPrice}>
          <Input
            isPrice={true}
            type="text"
            placeholder="가격 (선택사항)"
            value={formData.price}
            onChange={onChangePrice}
          />
          <p className="sign">₩</p>
        </PriceWrapper>
        <TextArea placeholder="게시글 내용을 작성해주세요" value={formData.content} onChange={onChangeContent} />
      </Container>
    </>
  );
}

export default withAuth(Post);

const Container = styled.div`
  padding: 0 16px;
`;

const SubmitText = styled.p<{ isSubmittable: boolean }>`
  color: ${({ theme, isSubmittable }) => (isSubmittable ? theme.color.primary200 : theme.color.grey300)};

  cursor: ${({ isSubmittable }) => (isSubmittable ? 'pointer' : 'default')};
`;

const Input = styled.input<{ isPrice?: boolean }>`
  width: 100%;
  padding: 24px 0;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.color.grey300};

  &::placeholder {
    color: ${({ theme }) => theme.color.grey100};
  }

  &:focus {
    outline: none;
  }

  position: relative;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 24px 0;
  border: none;

  &::placeholder {
    color: ${({ theme }) => theme.color.grey100};
  }

  &:focus {
    outline: none;
  }

  position: relative;
`;

const CategoryWrapper = styled.div`
  padding: 12px 0;

  display: flex;
  flex-direction: column;
  gap: 4px;

  p {
    color: ${({ theme }) => theme.color.grey100};
  }
`;

const PriceWrapper = styled.div<{ isInput: boolean }>`
  position: relative;

  input {
    padding-left: 12px;
  }

  p.sign {
    position: absolute;
    top: 27px;
    left: 0;
    color: ${({ theme, isInput }) => (isInput ? theme.color.black : theme.color.grey100)};
  }
`;
