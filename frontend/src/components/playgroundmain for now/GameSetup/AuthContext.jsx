
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext1 = createContext(undefined);

export function AuthProvider1({ colyseusSDK, children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    colyseusSDK.auth.onChange((authData) => {
      setUser(authData.token ? authData.user : null);
      setLoading(false);
    });
    if (!colyseusSDK.auth.token) {
      colyseusSDK.auth.signInAnonymously()
        .catch((err) => console.error("Auth Error:", err));
    }
  }, [colyseusSDK]);

  return (
    <AuthContext1.Provider value={{ user, loading }}>
      {children}
    </AuthContext1.Provider>
  );
}

export const useAuth1 = () => useContext(AuthContext1);