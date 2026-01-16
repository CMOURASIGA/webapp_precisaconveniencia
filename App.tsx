
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomeView } from './views/Home';
import { CampaignsView } from './views/Campaigns';
import { ProductsView } from './views/Products';
import { ProfileView } from './views/Profile';
import { DashboardView } from './views/Dashboard';
import { AuthView } from './views/Auth';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoadingSpinner } from './components/UI';

const ProtectedRoute: React.FC<{ children: React.ReactNode; allowAdmin?: boolean }> = ({ children, allowAdmin = false }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="h-screen flex items-center justify-center"><LoadingSpinner /></div>;
  if (!user) return <Navigate to="/auth" />;

  // Se a rota for exclusiva de admin e o usuário não for admin
  if (allowAdmin && user.role !== 'admin') return <Navigate to="/" />;
  
  // Se o usuário for admin e tentar acessar a home de usuário, redireciona para dashboard
  if (!allowAdmin && user.role === 'admin' && window.location.hash === '#/') return <Navigate to="/dashboard" />;

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/auth" element={<AuthView />} />
            
            <Route path="/" element={
              <ProtectedRoute><HomeView /></ProtectedRoute>
            } />
            <Route path="/produtos" element={
              <ProtectedRoute><ProductsView /></ProtectedRoute>
            } />
            <Route path="/campanhas" element={
              <ProtectedRoute><CampaignsView /></ProtectedRoute>
            } />
            <Route path="/perfil" element={
              <ProtectedRoute allowAdmin={true}><ProfileView /></ProtectedRoute>
            } />
            
            {/* Rota Exclusiva de Gestão */}
            <Route path="/dashboard" element={
              <ProtectedRoute allowAdmin={true}><DashboardView /></ProtectedRoute>
            } />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
