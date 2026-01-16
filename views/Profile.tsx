
import React from 'react';
import { Card, Button } from '../components/UI';
import { 
  Settings, 
  LogOut, 
  ChevronRight, 
  History, 
  User as UserIcon, 
  Bell, 
  ShieldCheck, 
  HelpCircle,
  CreditCard,
  Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const HISTORY_MOCK = [
  { id: 'h1', type: 'Check-in', value: '+20 pts', date: 'Hoje, 18:45', location: 'HUB Office' },
  { id: 'h2', type: 'Compra', value: '+45 pts', date: 'Ontem, 08:30', location: 'HUB Office' },
  { id: 'h3', type: 'Check-in', value: '+20 pts', date: '22 Abr, 19:15', location: 'Condomínio Alpha' },
  { id: 'h4', type: 'Resgate', value: '-100 pts', date: '20 Abr, 12:00', location: 'Loja Online' },
];

export const ProfileView: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Header com Avatar */}
      <section className="flex flex-col items-center pt-4">
        <div className="relative">
          <div className="h-24 w-24 rounded-3xl bg-[#F2B705] flex items-center justify-center font-black text-4xl border-4 border-black shadow-xl rotate-3">
            <span className="-rotate-3">{user?.name.charAt(0)}</span>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-black text-[#F2B705] p-2 rounded-xl border-2 border-white shadow-lg">
            <Settings size={16} />
          </div>
        </div>
        <div className="text-center mt-6">
          <h2 className="font-black text-2xl font-brand italic uppercase tracking-tighter">{user?.name}</h2>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">{user?.email}</p>
        </div>
      </section>

      {/* Resumo de Fidelidade (Menor que na Home) */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex flex-col items-center">
          <Award className="text-[#F2B705] mb-2" size={20} />
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Saldo de Pontos</span>
          <p className="text-2xl font-black mt-1 text-black">{user?.points}</p>
        </div>
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex flex-col items-center">
          <History className="text-gray-400 mb-2" size={20} />
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Visitas Totais</span>
          <p className="text-2xl font-black mt-1 text-black">{user?.checkInCount}</p>
        </div>
      </div>

      {/* Menu de Opções de Conta */}
      <section className="space-y-3">
        <h3 className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-[0.2em]">Configurações da Conta</h3>
        <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
          <ProfileMenuItem icon={<UserIcon size={18} />} label="Dados Pessoais" />
          <ProfileMenuItem icon={<CreditCard size={18} />} label="Métodos de Pagamento" />
          <ProfileMenuItem icon={<Bell size={18} />} label="Notificações" />
          <ProfileMenuItem icon={<ShieldCheck size={18} />} label="Privacidade e Segurança" border={false} />
        </div>
      </section>

      {/* Histórico de Atividades */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Atividade Recente</h3>
          <button className="text-[10px] font-black text-[#F2B705] uppercase tracking-tighter underline">Ver Tudo</button>
        </div>
        
        <div className="space-y-3">
          {HISTORY_MOCK.map((item) => (
            <div key={item.id} className="bg-gray-50/50 p-4 rounded-2xl flex items-center justify-between border border-gray-100/50">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-xl ${item.value.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                  {item.type === 'Check-in' ? <MapPin size={16} /> : item.type === 'Compra' ? <CreditCard size={16} /> : <Award size={16} />}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black uppercase tracking-tight">{item.type}</span>
                  <span className="text-[10px] text-gray-400 font-bold">{item.date} • {item.location}</span>
                </div>
              </div>
              <span className={`text-sm font-black ${item.value.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Suporte e Sair */}
      <section className="space-y-3 pt-4">
        <button className="w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl group active:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <HelpCircle size={20} className="text-gray-400" />
            <span className="text-sm font-bold">Precisa de Ajuda?</span>
          </div>
          <ChevronRight size={16} className="text-gray-300 group-hover:translate-x-1 transition-transform" />
        </button>

        <button 
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 p-5 text-red-500 font-black text-xs uppercase tracking-widest hover:bg-red-50 rounded-2xl transition-all border-2 border-transparent hover:border-red-100"
        >
          <LogOut size={18} />
          Encerrar Sessão
        </button>
      </section>

      <div className="text-center pb-8">
        <p className="text-[9px] text-gray-300 font-black uppercase tracking-[0.3em]">Versão 1.0.4 • Precisa Tech</p>
      </div>
    </div>
  );
};

const ProfileMenuItem: React.FC<{ icon: React.ReactNode; label: string; border?: boolean }> = ({ icon, label, border = true }) => (
  <button className={`w-full flex items-center justify-between p-5 group active:bg-gray-50 transition-colors ${border ? 'border-b border-gray-50' : ''}`}>
    <div className="flex items-center gap-4">
      <div className="text-gray-400 group-hover:text-black transition-colors">{icon}</div>
      <span className="text-sm font-bold text-gray-700">{label}</span>
    </div>
    <ChevronRight size={16} className="text-gray-300 group-hover:translate-x-1 transition-transform" />
  </button>
);

const MapPin: React.FC<{ size?: number; className?: string }> = ({ size = 18, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
