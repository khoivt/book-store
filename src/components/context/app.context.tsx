import { fetchAccountAPI } from "@/services/api";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import HashLoader from "react-spinners/HashLoader";

interface IAppContext {
  isAuthenticated: boolean;
  user: IUser | null;
  isAppLoading: boolean;
  setIsAuthenticated: (v: boolean) => void;
  setUser: (v: IUser | null) => void;
  setIsAppLoading: (v: boolean) => void;
}

const CurrentAppContext = createContext<IAppContext | null>(null);

type TProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: TProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [isAppLoading, setIsAppLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAccount = async () => {
      const res = await fetchAccountAPI();
      if (res.data) {
        setUser(res.data.user);
        setIsAuthenticated(true);
      }
      setIsAppLoading(false);
    };

    fetchAccount();
  }, []);

  return (
    <>
      {isAppLoading ? (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <HashLoader size={30} color="#36d6b4" />
        </div>
      ) : (
        <CurrentAppContext.Provider
          value={{
            isAuthenticated,
            user,
            isAppLoading,
            setIsAuthenticated,
            setUser,
            setIsAppLoading,
          }}
        >
          {children}
        </CurrentAppContext.Provider>
      )}
    </>
  );
};

export const useCurrentApp = () => {
  const currentAppContext = useContext(CurrentAppContext);

  if (!currentAppContext) {
    throw new Error(
      "useCurrentApp has to be used within <CurrentAppContext.Provider>"
    );
  }

  return currentAppContext;
};
