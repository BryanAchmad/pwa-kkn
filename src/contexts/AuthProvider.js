import React, { createContext, useEffect, useState } from 'react';
import { login } from 'src/api/auth';
// import axios from 'src/api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const user = await login();
      setAuth(true);
      setUser(user.data);
    } catch (e) {
      setAuth(false);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
