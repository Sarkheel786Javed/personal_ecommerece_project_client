import React, {
    useState,
    useContext,
    createContext,
    ReactNode,
  } from "react";
  
  interface sidebarOpen {
    open: string;
  }
  
  interface AuthProviderProps {
    children: ReactNode;
  }
  

  const AuthSidebarContext = createContext<
    [sidebarOpen, React.Dispatch<React.SetStateAction<sidebarOpen>>] | undefined
  >(undefined);
  
  const AutsidebarhProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [sidebarOpen, setIsSidebaropen] = useState<sidebarOpen>({
      open:"250px"
    })

    return (
      <>
       <AuthSidebarContext.Provider value={[sidebarOpen, setIsSidebaropen]}>
        {children}
      </AuthSidebarContext.Provider>
      </>
     
    );
  };
 
  const sidebarAuth = (): [
    sidebarOpen,
    React.Dispatch<React.SetStateAction<sidebarOpen>>
  ] => {
    const context = useContext(AuthSidebarContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  };
  
  export { AutsidebarhProvider , sidebarAuth};
  