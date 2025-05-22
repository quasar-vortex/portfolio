import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
};
