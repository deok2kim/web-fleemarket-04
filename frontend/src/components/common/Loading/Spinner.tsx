import React from 'react';
import styled from 'styled-components';

function Spinner() {
  return (
    <Wrapper>
      <Loader />
    </Wrapper>
  );
}

export default Spinner;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Loader = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgb(26 108 97 / 56%);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }

  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;
