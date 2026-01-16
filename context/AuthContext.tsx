
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DB_KEY = 'precisa_db_users';
const SESSION_KEY = 'precisa_user_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedSession = localStorage.getItem(SESSION_KEY);
    if (savedSession) {
      try {
        setUser(JSON.parse(savedSession));
      } catch (e) {
        localStorage.removeItem(SESSION_KEY);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // CASO ESPECIAL: Senha de Admin para perfil de gestão
    // No MVP, usamos uma credencial fixa ou padrão
    if (email === 'admin@precisa.com' && password === 'admin123') {
      const adminUser: User = {
        id: 'admin_master',
        name: 'Gestor Precisa',
        email: 'admin@precisa.com',
        points: 0,
        checkInCount: 0,
        role: 'admin'
      };
      setUser(adminUser);
      localStorage.setItem(SESSION_KEY, JSON.stringify(adminUser));
      return;
    }

    // Busca no banco local para usuários comuns
    const usersRaw = localStorage.getItem(DB_KEY);
    const users = usersRaw ? JSON.parse(usersRaw) : [];
    
    const foundUser = users.find((u: any) => 
      u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    
    if (foundUser) {
      const { password: _, ...userData } = foundUser;
      // Add type assertion to ensure compatibility with User interface
      setUser(userData as User);
      localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
    } else {
      throw new Error('E-mail ou senha incorretos.');
    }
  };

  const register = async (name: string, email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const usersRaw = localStorage.getItem(DB_KEY);
    const users = usersRaw ? JSON.parse(usersRaw) : [];
    
    if (users.find((u: any) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('Este e-mail já está em uso.');
    }

    // Use 'as const' or explicit casting for 'role' to avoid it being inferred as 'string'
    const newUser = {
      id: `user_${Math.random().toString(36).substr(2, 9)}`,
      name,
      email: email.toLowerCase(),
      password,
      points: 50,
      checkInCount: 0,
      role: 'user' as const, // SEMPRE usuário comum no registro aberto
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem(DB_KEY, JSON.stringify(updatedUsers));
    
    // Fix: Destructure to remove password and createdAt to strictly match User interface
    const { password: _, createdAt: __, ...userData } = newUser;
    setUser(userData as User);
    localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};