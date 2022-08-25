/* eslint-disable react/display-name */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from 'src/constants/route';
import { useLoggedIn } from 'src/contexts/LoggedInContext';

const withAuth = <P extends {}>(WrappedComponent: React.ComponentType<P>) => {
  const Component = (props: P) => {
    const { isLoggedIn } = useLoggedIn();
    const navigate = useNavigate();

    useEffect(() => {
      if (!isLoggedIn) {
        navigate(ROUTE.LOGIN, {
          replace: true,
        });
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Component;
};

export default withAuth;
