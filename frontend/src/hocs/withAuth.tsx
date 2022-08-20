/* eslint-disable react/display-name */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from 'src/queries/user';

const withAuth = <P extends {}>(WrappedComponent: React.ComponentType<P>) => {
  const Component = (props: P) => {
    const { data: userInfo } = useUserInfo();
    const navigate = useNavigate();
    if (!userInfo) {
      navigate('/login', {
        replace: true,
      });
    }

    return <WrappedComponent {...props} />;
  };

  return Component;
};

export default withAuth;
