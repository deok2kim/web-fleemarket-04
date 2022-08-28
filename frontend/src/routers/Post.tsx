import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Categories from 'src/components/Category/Categories';
import Header from 'src/components/common/Header/Header';
import Icon from 'src/components/common/Icon/Icon';
import ImageUpload from 'src/components/Post/ImageUpload';
import { ROUTE } from 'src/constants/route';
import { HOUR_SECOND } from 'src/constants/time';
import { useToast } from 'src/contexts/ToastContext';
import withAuth from 'src/hocs/withAuth';
import { useAddProductMutation, useProductDetail, useUpdateProductMutation } from 'src/queries/product';
import { deleteComma, setComma, setOnlyNumber } from 'src/utils/formatPrice';
import styled from 'styled-components';

interface IFormData {
  title: string;
  category: number;
  price: string;
  content: string;
  urls: string[];
}

const MAX_PRICE = 10 ** 8;

function Post() {
  const productId = useParams<{ id: string }>().id as string;
  const { data: productDetail, isLoading: productDetailLoading } = useProductDetail(+productId, {
    enabled: !!productId,
    staleTime: HOUR_SECOND,
  });
  const addProductMutation = useAddProductMutation();
  const updateProductMutation = useUpdateProductMutation();
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState<IFormData>({
    title: '',
    category: 0,
    price: '',
    content: '',
    urls: [],
  });
  const isInputPrice = !!formData.price;
  const isSubmittable = !!formData.title && !!formData.category && !!formData.content && !!formData.urls.length;
  const isEditMode = !!productId;

  const onClickBack = () => {
    navigate(-1);
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: titleValue } = e.target;

    setFormData((prev) => ({
      ...prev,
      title: titleValue,
    }));
  };

  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: priceValue } = e.target;

    if (+deleteComma(priceValue) > MAX_PRICE) return;

    setFormData((prev) => ({
      ...prev,
      price: setComma(setOnlyNumber(priceValue)),
    }));
  };

  const onChangeCategory = (categoryId: number) => {
    setFormData((prev) => ({
      ...prev,
      category: categoryId,
    }));
  };

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value: contentValue } = e.target;

    setFormData((prev) => ({
      ...prev,
      content: contentValue,
    }));
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

  const saveProduct = () => {
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
          navigate(`${ROUTE.PRODUCTS}/${productId}`, {
            replace: true,
          });
          toast.success('상품이 등록되었습니다. 😄');
        },
      },
    );
  };

  const updateProduct = () => {
    if (!productId) return;

    const { title, urls, price, category, content } = formData;

    updateProductMutation.mutate(
      {
        productId: +productId,
        title,
        content,
        price: +price,
        images: urls,
        categoryId: category,
      },
      {
        onSuccess: () => {
          navigate(`/products/${productId}`);
          toast.success('상품이 수정되었습니다. 😄');
        },
      },
    );
  };

  const onSubmitPost = () => {
    if (!isSubmittable) return;

    if (isEditMode) {
      updateProduct();
      return;
    }

    saveProduct();
  };

  const setDefaultDataInEditMode = () => {
    const title = productDetail?.data.product.title || '';
    const price = productDetail?.data.product.price?.toString() || '';
    const content = productDetail?.data.product.content || '';
    const category = productDetail?.data.product.categoryId || 0;
    const imageUrls = productDetail?.data.product.images.map((image) => image.url) || [];

    setFormData({
      title,
      price,
      content,
      category,
      urls: imageUrls,
    });
  };

  useEffect(() => {
    if (productDetailLoading) return;
    setDefaultDataInEditMode();
  }, [productDetailLoading]);

  if (productDetailLoading) return null;

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
        <Input type="text" placeholder="글 제목" value={formData.title} onChange={onChangeTitle} />
        <CategoryWrapper>
          <p>(필수) 카테고리를 선택해주세요</p>
          <Categories selectedCategory={formData.category} onChangeCategory={onChangeCategory} isPost={true} />
        </CategoryWrapper>
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
  min-height: 300px;
  height: 100%;
  border: none;
  resize: none;

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
