import { createContext, useState, useMemo, useContext, useEffect } from "react";
import connexion from "../services/connexion";
import { removeAuthCookie } from "../services/auth";

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [connected, setConnected] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const profileResponse = await connexion.get(`/auth/profile`);
        if (profileResponse.status === 200) {
          setProfile(profileResponse.data);
          setConnected(true);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getProfile();
  }, []);

  const logout = () => {
    removeAuthCookie();
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
