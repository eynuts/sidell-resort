import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthChange, signInWithGoogle, logOut } from './firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for manual user first
    const savedUser = localStorage.getItem('sidell_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setLoading(false);
    }

    const unsubscribe = onAuthChange((firebaseUser) => {
      // If there's no manual user, or the firebase user is coming from Google Login
      if (firebaseUser) {
        setUser(firebaseUser);
        localStorage.removeItem('sidell_user'); // Clear manual if firebase is active
      } else if (!localStorage.getItem('sidell_user')) {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const setManualUser = (user) => {
    if (user) {
        localStorage.setItem('sidell_user', JSON.stringify(user));
    } else {
        localStorage.removeItem('sidell_user');
    }
    setUser(user);
  };

  const logout = async () => {
    try {
      localStorage.removeItem('sidell_user');
      setUser(null);
      await logOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
    user,
    setManualUser,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
