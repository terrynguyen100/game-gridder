import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider(props) {
  const [auth, setAuth] = useState(false);
  const [userId, setUserId] = useState(null);
  const [avatarURL, setAvatarURL] = useState(null);

  const login = (userId) => {
    setUserId(userId);
    setAuth(true);
  }

  const logout = () => {
    setUserId(null);
    setAuth(false);
  }

  const value = { auth, userId, avatarURL, setAvatarURL, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
};