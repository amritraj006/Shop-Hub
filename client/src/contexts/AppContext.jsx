
import { createContext, useContext, useState,  } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [openSearch, setOpenSearch] = useState(false);


  return (
    <AppContext.Provider
      value={{
      
        openSearch,
        setOpenSearch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);


