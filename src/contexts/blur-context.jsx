import { createContext, useState } from 'react';

export const BlurContext = createContext(null);
const BlurContextProvider = ({ children }) => {
  const [isBlur, setIsBlur] = useState(false);
  return (
    <BlurContext.Provider
      value={{
        isBlur,
        setIsBlur,
      }}
    >
      {children}
    </BlurContext.Provider>
  );
};

export default BlurContextProvider;
