import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";
import { AuthService } from "../../Services/AuthServices/AuthServices";

interface AuthState {
  token: string;
  _id: number;
  userName: string;
  email: string;
  addressLine1: string;
  phoneNumbber: string;
  city: string;
  country: string;
  answer: string;
  Organization: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<
  [AuthState, React.Dispatch<React.SetStateAction<AuthState>>] | undefined
>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({
    token: "",
    _id: 0,
    userName: "",
    email: "",
    addressLine1: "",
    phoneNumbber: "",
    city: "",
    country: "",
    answer: "",
    Organization: "",
  });

  useEffect(() => {
    const token = AuthService.getToken();
    if (token) {
      const decoded = jwtDecode<AuthState>(token);
      setAuth({
        token,
        _id: decoded._id,
        userName: decoded.userName,
        email: decoded.email,
        addressLine1: decoded.addressLine1,
        phoneNumbber: decoded.phoneNumbber,
        city: decoded.city,
        country: decoded.country,
        answer: decoded.answer,
        Organization: decoded.Organization,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
const useAuth = (): [
  AuthState,
  React.Dispatch<React.SetStateAction<AuthState>>
] => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { useAuth, AuthProvider };
