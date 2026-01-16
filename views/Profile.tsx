
import React, { useState } from 'react';
import { Card, Button, Badge, Modal } from '../components/UI';
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
  Zap,
  ArrowUpRight,
  ArrowDownLeft,
  Filter
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const HISTORY_MOCK = [
  { id: 'h1', type: 'Check-in', value: 20, date: 'Hoje, 18:45', location: 'HUB Office', category: 'ganho' },
  { id: 'h2', type: 'Compra de Café', value: 45, date: 'Ontem, 08:30', location: 'HUB Office', category: 'ganho' },
  { id: 'h3', type: 'Check-in', value: 20, date: '22 Abr, 19:10', location: 'Condomínio Alpha', category: 'ganho' },
  { id: 'h4', type: 'Resgate de Cupom', value: -100, date: '20 Abr, 12:00', location: 'App Precisa', category: 'resgate' },
  { id: 'h5', type: 'Bônus Cadastro', value: 50, date: '15 Abr, 10:00', location: 'Sistema', category: 'ganho' },
];

export const ProfileView: React.FC = () => {
  const { user, logout } = useAuth();
  const [isExtratoOpen, setIsExtratoOpen] = useState(false);
  const [filter, setFilter] = useState<'todos' | 'ganho' | 'resgate'>('todos');

  const filteredHistory = HISTORY_MOCK.filter(item => 
    filter === 'todos' || item.category === filter
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Header de Identidade */}
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
              <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Membro desde 2024</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
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
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ranking</p>
          <p className="text-xl font-black text-black">#12</p>
        </div>
      </div>

      {/* Extrato de Pontos Simplificado */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-[10px] font-black uppercase text-gray-300 tracking-[0.25em]">Extrato de Pontos</h3>
          <button 
            onClick={() => setIsExtratoOpen(true)}
            className="text-[10px] font-black text-[#F2B705] uppercase bg-[#F2B705]/10 px-3 py-1.5 rounded-full hover:bg-[#F2B705]/20 transition-colors"
          >
            Ver Extrato Completo
          </button>
        </div>
        
        <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm divide-y divide-gray-50">
          {HISTORY_MOCK.slice(0, 3).map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className={`p-2.5 rounded-xl ${item.category === 'ganho' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                  {item.category === 'ganho' ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-800">{item.type}</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">{item.date}</span>
                </div>
              </div>
              <span className={`text-sm font-black ${item.category === 'ganho' ? 'text-green-500' : 'text-red-500'}`}>
                {item.value > 0 ? `+${item.value}` : item.value} pts
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Menus de Configuração */}
      <div className="space-y-6 px-1">
        <section className="space-y-3">
          <h3 className="text-[10px] font-black uppercase text-gray-300 tracking-[0.25em] ml-2">Preferências</h3>
          <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
            <ProfileMenuItem 
              icon={<UserIcon size={18} />} 
              label="Dados Pessoais" 
              color="bg-blue-50 text-blue-500" 
            />
            <ProfileMenuItem 
              icon={<Bell size={18} />} 
              label="Notificações" 
              color="bg-yellow-50 text-yellow-600" 
            />
            <ProfileMenuItem 
              icon={<ShieldCheck size={18} />} 
              label="Segurança" 
              color="bg-green-50 text-green-500" 
              border={false}
            />
          </div>
        </section>

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

      {/* Modal de Extrato Completo */}
      <Modal 
        isOpen={isExtratoOpen} 
        onClose={() => setIsExtratoOpen(null)} 
        title="Meu Extrato de Pontos"
      >
        <div className="space-y-6">
          {/* Filtros */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {(['todos', 'ganho', 'resgate'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider transition-all border ${
                  filter === f 
                    ? 'bg-black text-white border-black shadow-md' 
                    : 'bg-white text-gray-400 border-gray-100'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Lista de Transações Detalhada */}
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1 scrollbar-hide">
            {filteredHistory.length > 0 ? (
              filteredHistory.map((item) => (
                <div key={item.id} className="bg-gray-50/50 p-4 rounded-2xl flex items-center justify-between border border-gray-100/50">
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-xl ${item.category === 'ganho' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {item.category === 'ganho' ? <ArrowUpRight size={18} strokeWidth={3} /> : <ArrowDownLeft size={18} strokeWidth={3} />}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-gray-800 tracking-tight">{item.type}</span>
                      <div className="flex flex-col text-[10px] text-gray-400 font-bold uppercase mt-0.5">
                        <span>{item.date}</span>
                        <span className="flex items-center gap-1"><MapPin size={8} /> {item.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-base font-black block leading-none ${item.category === 'ganho' ? 'text-green-500' : 'text-red-500'}`}>
                      {item.value > 0 ? `+${item.value}` : item.value}
                    </span>
                    <span className="text-[9px] font-black text-gray-300 uppercase">Pontos</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center">
                <p className="text-gray-400 text-sm font-medium">Nenhuma transação encontrada.</p>
              </div>
            )}
          </div>

          <div className="bg-black text-white p-5 rounded-3xl flex items-center justify-between shadow-xl shadow-black/10">
            <div>
              <p className="text-[10px] font-black uppercase opacity-60 tracking-widest">Saldo Total</p>
              <p className="text-2xl font-black text-[#F2B705] mt-1">{user?.points} <span className="text-xs text-white opacity-40 uppercase">PTS</span></p>
            </div>
            <Zap className="text-[#F2B705] opacity-20" size={40} />
          </div>

          <Button fullWidth onClick={() => setIsExtratoOpen(false)} className="py-4">
            Voltar ao Perfil
          </Button>
        </div>
      </Modal>

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
