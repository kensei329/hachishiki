import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export const AdminAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // 認証状態をチェック
  useEffect(() => {
    const checkAuthStatus = () => {
      // localStorage（ログインしたままにする）とsessionStorage（ブラウザセッション）の両方をチェック
      const localLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
      const sessionLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
      const localEmail = localStorage.getItem('adminEmail');
      const sessionEmail = sessionStorage.getItem('adminEmail');

      if (localLoggedIn || sessionLoggedIn) {
        setIsAuthenticated(true);
        setAdminEmail(localEmail || sessionEmail);
      } else {
        setIsAuthenticated(false);
        setAdminEmail('');
      }
      setIsLoading(false);
    };

    checkAuthStatus();

    // ストレージの変更を監視（複数タブでの同期）
    const handleStorageChange = (e) => {
      if (e.key === 'adminLoggedIn' || e.key === 'adminEmail') {
        checkAuthStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // ログイン処理
  const login = (email, rememberMe = false) => {
    if (rememberMe) {
      localStorage.setItem('adminLoggedIn', 'true');
      localStorage.setItem('adminEmail', email);
    } else {
      sessionStorage.setItem('adminLoggedIn', 'true');
      sessionStorage.setItem('adminEmail', email);
    }
    
    setIsAuthenticated(true);
    setAdminEmail(email);
    
    // 他のタブに通知
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'adminLoggedIn',
      newValue: 'true'
    }));
  };

  // ログアウト処理
  const logout = () => {
    // 両方のストレージから削除
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminEmail');
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('adminEmail');
    
    setIsAuthenticated(false);
    setAdminEmail('');
    
    // 他のタブに通知
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'adminLoggedIn',
      newValue: null
    }));
    
    // ログインページにリダイレクト
    navigate('/admin/login');
  };

  // 認証が必要なページの保護
  const requireAuth = (callback) => {
    if (!isLoading && !isAuthenticated) {
      navigate('/admin/login');
      return false;
    }
    return true;
  };

  const value = {
    isAuthenticated,
    adminEmail,
    isLoading,
    login,
    logout,
    requireAuth
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
