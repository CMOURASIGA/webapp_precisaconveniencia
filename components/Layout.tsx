
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Gift, User, BarChart3, ShoppingBag, Bell } from 'lucide-react';
import { LOGO_URL } from '../constants';
import { useAuth } from '../context/AuthContext';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();
  const isDashboard = location.pathname === '/dashboard';
  const isAuth = location.pathname === '/auth';
  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col max-w-md mx-auto relative border-x border-gray-50 shadow-xl">
      {/* Header */}
      {!isAuth && (
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-2">
            <img src={LOGO_URL} alt="Precisa" className="h-8 object-contain" />
            <span className="font-brand font-bold text-sm tracking-tight leading-none text-black">
              Precisa <br />
              <span className="text-[10px] uppercase opacity-60 font-black">Conveniência</span>
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Somente exibe link de Gestão se for ADMIN e não estiver no dashboard */}
            {isAdmin && !isDashboard && (
              <Link 
                to="/dashboard" 
                className="text-[10px] font-bold uppercase tracking-wider bg-black text-white px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md shadow-black/10"
              >
                <BarChart3 size={12} />
                Gestão
              </Link>
            )}

            {/* Ícone de Notificação com Alerta Visual */}
            {user && (
              <Link to="/perfil/notificacoes" className="relative p-2 text-gray-400 hover:text-black transition-colors active:scale-90">
                <Bell size={22} />
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-[#F2B705] border-2 border-white rounded-full"></span>
              </Link>
            )}
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className={`flex-1 ${isAuth ? 'p-6 flex flex-col' : 'pb-24 p-6'}`}>
        {children}
      </main>

      {/* Bottom Nav */}
      {!isAuth && user && !isAdmin && (
        <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 px-6 py-3 flex justify-around items-center shadow-[0_-4px_10px_rgba(0,0,0,0.03)] z-40">
          <NavItem to="/" active={location.pathname === '/'} icon={<Home size={22} />} label="Início" />
          <NavItem to="/produtos" active={location.pathname === '/produtos'} icon={<ShoppingBag size={22} />} label="Produtos" />
          <NavItem to="/campanhas" active={location.pathname === '/campanhas'} icon={<Gift size={22} />} label="Campanhas" />
          <NavItem to="/perfil" active={location.pathname.startsWith('/perfil')} icon={<User size={22} />} label="Perfil" />
        </nav>
      )}

      {/* Navegação Simplificada para Admin */}
      {!isAuth && isAdmin && location.pathname.startsWith('/perfil') && (
        <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 px-6 py-3 flex justify-around items-center z-40">
          <NavItem to="/dashboard" active={false} icon={<BarChart3 size={22} />} label="Dashboard" />
          <NavItem to="/perfil" active={true} icon={<User size={22} />} label="Perfil" />
        </nav>
      )}
    </div>
  );
};

const NavItem: React.FC<{ to: string; active: boolean; icon: React.ReactNode; label: string }> = ({ to, active, icon, label }) => (
  <Link to={to} className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-[#F2B705]' : 'text-gray-400'}`}>
    {icon}
    <span className="text-[10px] font-bold uppercase">{label}</span>
  </Link>
);
