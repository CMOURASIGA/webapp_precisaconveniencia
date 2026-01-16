
import React from 'react';
import { Card, Button, Badge } from '../components/UI';
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
  MapPin,
  Star,
  ShoppingBag,
  Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const HISTORY_MOCK = [
  { id: 'h1', type: 'Check-in', value: '+20 pts', date: 'Hoje, 18:45', location: 'HUB Office', icon: <MapPin size={14} /> },
  { id: 'h2', type: 'Compra', value: '+45 pts', date: 'Ontem, 08:30', location: 'HUB Office', icon: <ShoppingBag size={14} /> },
  { id: 'h3', type: 'Check-in', value: '+20 pts', date: '22 Abr', location: 'Condomínio Alpha', icon: <MapPin size={14} /> },
];

export const ProfileView: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Header de Identidade - Totalmente diferente da Home */}
      <section className="relative pt-6 pb-2">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="h-28 w-28 rounded-[2.5rem] bg-gradient-to-br from-[#F2B705] to-[#FFD700] flex items-center justify-center font-black text-5xl border-[6px] border-white shadow-2xl rotate-3">
              <span className="-rotate-3 text-black">{user?.name.charAt(0)}</span>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-black text-[#F2B705] p-2.5 rounded-2xl border-4 border-white shadow-xl">
              <Zap size={18} fill="currentColor" />
            </div>
          </div>
          
          <div className="text-center mt-6">
            <h2 className="font-black text-2xl font-brand italic uppercase tracking-tighter text-black">
              {user?.name}
            </h2>
            <div className="flex items-center justify-center gap-2 mt-1">
              <Badge variant="black">Nível Prata</Badge>
              <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Desde Abr 2024</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar - Horizontal e Limpa */}
      <div className="bg-gray-50 rounded-[2rem] p-6 flex justify-around items-center border border-gray-100 shadow-inner">
        <div className="text-center">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Saldo</p>
          <p className="text-xl font-black text-black">{user?.points} <span className="text-[10px] opacity-40">PTS</span></p>
        </div>
        <div className="h-8 w-[1px] bg-gray-200"></div>
        <div className="text-center">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Check-ins</p>
          <p className="text-xl font-black text-black">{user?.checkInCount}</p>
        </div>
        <div className="h-8 w-[1px] bg-gray-200"></div>
        <div className="text-center">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Resgates</p>
          <p className="text-xl font-black text-black">02</p>
        </div>
      </div>

      {/* Menus Agrupados - Estilo Configurações */}
      <div className="space-y-8 px-1">
        
        {/* Grupo 1: Minha Conta */}
        <section className="space-y-3">
          <h3 className="text-[10px] font-black uppercase text-gray-300 tracking-[0.25em] ml-2">Minha Conta</h3>
          <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
            <ProfileMenuItem 
              icon={<UserIcon size={18} />} 
              label="Dados Pessoais" 
              color="bg-blue-50 text-blue-500" 
            />
            <ProfileMenuItem 
              icon={<CreditCard size={18} />} 
              label="Métodos de Pagamento" 
              color="bg-purple-50 text-purple-500" 
            />
            <ProfileMenuItem 
              icon={<MapPin size={18} />} 
              label="Minhas Unidades" 
              color="bg-orange-50 text-orange-500" 
              border={false}
            />
          </div>
        </section>

        {/* Grupo 2: Preferências */}
        <section className="space-y-3">
          <h3 className="text-[10px] font-black uppercase text-gray-300 tracking-[0.25em] ml-2">Preferências</h3>
          <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
            <ProfileMenuItem 
              icon={<Bell size={18} />} 
              label="Notificações" 
              color="bg-yellow-50 text-yellow-600" 
            />
            <ProfileMenuItem 
              icon={<ShieldCheck size={18} />} 
              label="Privacidade" 
              color="bg-green-50 text-green-500" 
              border={false}
            />
          </div>
        </section>

        {/* Histórico Simplificado em Timeline */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[10px] font-black uppercase text-gray-300 tracking-[0.25em]">Atividade Recente</h3>
            <button className="text-[10px] font-black text-[#F2B705] uppercase">Ver Tudo</button>
          </div>
          
          <div className="relative ml-4 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
            {HISTORY_MOCK.map((item) => (
              <div key={item.id} className="relative pl-10">
                <div className="absolute left-0 top-1 h-6 w-6 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center text-gray-400 z-10 shadow-sm">
                  {item.icon}
                </div>
                <div className="flex flex-col">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-black text-gray-800 tracking-tight">{item.type}</span>
                    <span className="text-xs font-black text-green-500">{item.value}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">{item.date} • {item.location}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ações de Saída */}
        <section className="pt-4 space-y-3">
          <button className="w-full flex items-center justify-center gap-3 p-5 bg-gray-50 text-gray-500 font-black text-xs uppercase tracking-widest rounded-2xl border border-gray-100 hover:bg-white transition-all">
            <HelpCircle size={18} />
            Central de Ajuda
          </button>
          
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center gap-3 p-5 text-red-500 font-black text-xs uppercase tracking-widest hover:bg-red-50 rounded-2xl transition-all border-2 border-transparent active:scale-[0.98]"
          >
            <LogOut size={18} />
            Sair da Conta
          </button>
        </section>
      </div>

      <div className="text-center pb-12">
        <p className="text-[9px] text-gray-300 font-black uppercase tracking-[0.4em]">Precisa Conveniência v1.0.8</p>
      </div>
    </div>
  );
};

interface ProfileMenuItemProps {
  icon: React.ReactNode;
  label: string;
  color: string;
  border?: boolean;
}

const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({ icon, label, color, border = true }) => (
  <button className={`w-full flex items-center justify-between p-5 group active:bg-gray-50 transition-all ${border ? 'border-b border-gray-50' : ''}`}>
    <div className="flex items-center gap-4">
      <div className={`p-2.5 rounded-xl ${color} shadow-sm transition-transform group-hover:scale-110`}>
        {icon}
      </div>
      <span className="text-sm font-bold text-gray-700 group-hover:text-black transition-colors">{label}</span>
    </div>
    <ChevronRight size={16} className="text-gray-300 group-hover:translate-x-1 transition-transform" />
  </button>
);
