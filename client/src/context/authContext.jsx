import { createContext, useState, useMemo, useContext } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [connected, setConnected] = useState(false);
  const [profile, setProfile] = useState(null);

  const logout = () => {
    setConnected(false);
  };

  const contextValue = useMemo(
    () => ({ connected, setConnected, profile, setProfile, logout }),
    [connected, setConnected, profile, setProfile]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
