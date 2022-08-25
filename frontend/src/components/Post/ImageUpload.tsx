import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { useToast } from 'src/contexts/ToastContext';
import { useImageUploadMutation } from 'src/queries/image';
import styled from 'styled-components';
import Icon from '../common/Icon/Icon';
import Image from '../common/Image/Image';

const MAX_IMAGE_COUNT = 10;

interface Props {
  urls: string[];
  addUrls: (newUrls: string[]) => void;
  removeUrl: (removeIndex: number) => void;
}

function ImageUpload({ urls, addUrls, removeUrl }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const uploadMutation = useImageUploadMutation();
  const toast = useToast();

  const fileCount = urls.length;

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    if (fileCount + files.length > MAX_IMAGE_COUNT) {
      toast.error('파일은 최대 10개까지 등록하실 수 있습니다.');
      return;
    }

    uploadMutation.mutate(files, {
      onSuccess: (urls) => {
        addUrls(urls);
      },
    });
  };

  const onClickPostButton = () => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  };

  const onClickRemoveImageIcon = (removeIndex: number) => {
    removeUrl(removeIndex);
  };

  return (
    <Container>
      <ImageList>
        <input ref={inputRef} id="input-image" multiple accept="image/*" type="file" onChange={onChangeFile} hidden />
        <NewPostButton onClick={onClickPostButton}>
          <Icon name="iconNewPost" />
          {fileCount} / 10
        </NewPostButton>
        {urls.map((url, index) => (
          <ImageWrapper key={url}>
            <Image box="md" src={url} />
            <RemoveImageIcon name="iconCircleClose" onClick={() => onClickRemoveImageIcon(index)} />
          </ImageWrapper>
        ))}
      </ImageList>
    </Container>
  );
}

export default ImageUpload;

const Container = styled.div`
  padding: 24px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.grey300};
  overflow-x: scroll;
  overflow-y: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ImageList = styled.div`
  display: flex;
  gap: 16px;
`;

const NewPostButton = styled.button`
  min-width: 76px;
  min-height: 76px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;

  border-radius: 8px;
  color: ${({ theme }) => theme.color.grey100};
  border: 1px solid ${({ theme }) => theme.color.grey300};
  background-color: ${({ theme }) => theme.color.offWhite};
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const RemoveImageIcon = styled(Icon)`
  position: absolute;
  top: -8px;
  right: -8px;
`;
