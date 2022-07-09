import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { customAuthProvider } from "../auth";

interface AuthContextType {
  user: any;
  signin: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<any>;
  signout: () => Promise<any>;
}

let AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<any>(() => {
    const userLocalStorage = window.localStorage.getItem("user");
    return userLocalStorage !== null ? JSON.parse(userLocalStorage) : null;
  });

  let signin = ({ email, password }: { email: string; password: string }) => {
    return new Promise<any>((resolve, reject) => {
      customAuthProvider
        .signin({ email, password })
        .then((result) => {
          setUser(result);
          resolve(result);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  };

  let signout = () => {
    return new Promise<any>((resolve, reject) => {
      customAuthProvider.signout().then(() => {
        setUser(null);
        resolve(null);
      }).catch(err => {
        reject(err);
      });
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return React.useContext(AuthContext);
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export { AuthProvider, RequireAuth, useAuth };
