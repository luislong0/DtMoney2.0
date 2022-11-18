import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../lib/axios";
import { auth } from "../services/firebase";
import { TransactionsContext } from "./TransactionsContext";

interface userProps {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
}

interface AuthContextType {
  signIn: () => Promise<void>;
  user: userProps;
  hasLogged: boolean;
  googleToken: string;
  createOrSignIn: (token: any) => Promise<void>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const { fetchTransactions } = useContext(TransactionsContext);
  const [googleToken, setGoogleToken] = useState<string>("");
  const [googleUser, setGoogleUser] = useState<any>({} as any);
  const [hasLogged, setHasLogged] = useState(false);
  const [user, setUser] = useState<userProps>({} as userProps);

  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  provider.setCustomParameters({
    login_hint: "user@example.com",
  });

  async function signIn() {
    await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token: any = credential!.accessToken;
        const user = result.user;
        setGoogleToken(String(token));
        setGoogleToken(String(token));
        setGoogleUser({
          id: user.uid,
          name: user.displayName,
          email: user.email,
          avatarUrl: user.photoURL,
        });
        return token;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  async function createOrSignIn(token: any) {
    try {
      setHasLogged(false);
      const tokenResponse = await api.post("users", {
        access_token: token,
      });

      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${tokenResponse.data}`;

      const userInfoResponse = await api.get("/me");
      setUser(userInfoResponse.data);
      setHasLogged(true);
    } catch (err) {
      console.log(err);

      throw err;
    }
  }

  useEffect(() => {
    if (googleToken !== "" && user.photoUrl !== "") {
      createOrSignIn(googleToken);
    }
  }, [googleToken]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        user,
        hasLogged,
        googleToken,
        createOrSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
