import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from 'react';

const LoggedInContext = createContext<{ isLoggedIn: boolean; setIsLoggedIn: Dispatch<SetStateAction<boolean>> }>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

function LoggedInProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return <LoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>{children}</LoggedInContext.Provider>;
}

export default LoggedInProvider;

export const useLoggedIn = () => {
  const value = useContext(LoggedInContext);

  return value;
};
