
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Badge, Modal } from '../components/UI';
import { 
  LogOut, 
  ChevronRight, 
  User as UserIcon, 
  Bell, 
  ShieldCheck, 
  HelpCircle,
  MapPin,
  Zap,
  ArrowUpRight,
  ArrowDownLeft,
  CircleUserRound,
  History,
  Barcode
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
  const navigate = useNavigate();
  const [isExtratoOpen, setIsExtratoOpen] = useState(false);
  const [filter, setFilter] = useState<'todos' | 'ganho' | 'resgate'>('todos');

  const filteredHistory = HISTORY_MOCK.filter(item => 
    filter === 'todos' || item.category === filter
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Hero Section do Perfil */}
      <section className="flex flex-col items-center pt-8 pb-4">
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full bg-gray-50 flex items-center justify-center border-2 border-gray-100 shadow-inner overflow-hidden">
            <CircleUserRound size={80} className="text-gray-200" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-[#F2B705] p-2 rounded-full border-4 border-white shadow-lg">
            <Zap size={16} fill="black" />
          </div>
        </div>
        <h2 className="text-xl font-black text-black tracking-tight">{user?.name}</h2>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">{user?.email}</p>
        
        <div className="mt-4 flex gap-2">
          <Badge variant="black">Nível Silver</Badge>
          <Badge variant="yellow">Membro Elite</Badge>
        </div>
      </section>

      {/* Cartão de Fidelidade */}
      <section className="px-1">
        <div className="bg-gradient-to-br from-[#F2B705] to-[#fcc21b] rounded-[2rem] p-6 shadow-2xl shadow-[#F2B705]/20 relative overflow-hidden h-44 flex flex-col justify-between group">
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <p className="text-[10px] font-black uppercase text-black/40 tracking-widest">Cartão Fidelidade</p>
              <h3 className="text-2xl font-black text-black mt-1">Precisa <span className="opacity-40 italic">One</span></h3>
            </div>
            <Zap className="text-black/20 group-hover:scale-125 transition-transform duration-500" size={32} />
          </div>
          
          <div className="relative z-10 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-black uppercase text-black/40 tracking-widest">Saldo disponível</p>
              <p className="text-3xl font-black text-black leading-none mt-1">{user?.points} <span className="text-sm">pts</span></p>
            </div>
            <Barcode size={40} className="text-black/60" />
          </div>

          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-black/5 rounded-full blur-2xl"></div>
        </div>
      </section>

      {/* Seção de Extrato */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <History size={18} className="text-gray-400" />
            <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Últimas Movimentações</h3>
          </div>
          <button 
            onClick={() => setIsExtratoOpen(true)}
            className="text-[10px] font-black text-[#F2B705] hover:underline uppercase tracking-tighter"
          >
            Ver Extrato
          </button>
        </div>
        
        <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm">
          {HISTORY_MOCK.slice(0, 3).map((item) => (
            <div key={item.id} className="flex items-center justify-between p-5 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`p-2.5 rounded-xl ${item.category === 'ganho' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                  {item.category === 'ganho' ? <ArrowUpRight size={18} strokeWidth={3} /> : <ArrowDownLeft size={18} strokeWidth={3} />}
                </div>
                <div>
                  <p className="text-sm font-black text-gray-800 tracking-tight leading-none">{item.type}</p>
                  <p className="text-[9px] text-gray-400 font-bold uppercase mt-1">{item.date} • {item.location}</p>
                </div>
              </div>
              <p className={`text-sm font-black ${item.category === 'ganho' ? 'text-green-500' : 'text-red-500'}`}>
                {item.value > 0 ? `+${item.value}` : item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Gerenciamento */}
      <section className="space-y-4">
        <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] px-2">Gerenciamento</h3>
        <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm">
          <ProfileListItem 
            icon={<UserIcon size={18} />} 
            label="Dados Pessoais" 
            color="bg-blue-50 text-blue-500" 
            onClick={() => navigate('/perfil/dados')}
          />
          <ProfileListItem 
            icon={<Bell size={18} />} 
            label="Notificações" 
            color="bg-yellow-50 text-yellow-600" 
            onClick={() => navigate('/perfil/notificacoes')}
          />
          <ProfileListItem 
            icon={<ShieldCheck size={18} />} 
            label="Segurança" 
            color="bg-green-50 text-green-500" 
            border={false}
            onClick={() => navigate('/perfil/seguranca')}
          />
        </div>
      </section>

      {/* Ações Inferiores */}
      <section className="pb-8 space-y-3">
        <button className="w-full flex items-center justify-center gap-2 p-4 text-gray-400 font-black text-xs uppercase tracking-widest hover:bg-gray-50 rounded-2xl transition-all">
          <HelpCircle size={18} />
          Precisa de Ajuda?
        </button>
        
        <button 
          onClick={logout}
          className="w-full bg-red-50 text-red-500 p-5 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 active:scale-95 transition-all"
        >
          <LogOut size={18} />
          Sair da Conta
        </button>
      </section>

      {/* Modal de Extrato Completo */}
      <Modal 
        isOpen={isExtratoOpen} 
        onClose={() => setIsExtratoOpen(false)} 
        title="Histórico Completo"
      >
        <div className="space-y-6">
          <div className="flex gap-2 pb-2 overflow-x-auto scrollbar-hide">
            {(['todos', 'ganho', 'resgate'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${
                  filter === f 
                    ? 'bg-black text-white border-black' 
                    : 'bg-gray-50 text-gray-400 border-gray-100'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
            {filteredHistory.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-gray-100/50">
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-xl ${item.category === 'ganho' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {item.category === 'ganho' ? <ArrowUpRight size={16} strokeWidth={3} /> : <ArrowDownLeft size={16} strokeWidth={3} />}
                  </div>
                  <div>
                    <p className="text-sm font-black text-gray-800">{item.type}</p>
                    <p className="text-[9px] text-gray-400 font-bold uppercase">{item.date} • {item.location}</p>
                  </div>
                </div>
                <p className={`font-black ${item.category === 'ganho' ? 'text-green-500' : 'text-red-500'}`}>
                  {item.value > 0 ? `+${item.value}` : item.value}
                </p>
              </div>
            ))}
          </div>

          <Button fullWidth onClick={() => setIsExtratoOpen(false)}>Fechar Extrato</Button>
        </div>
      </Modal>
    </div>
  );
};

const ProfileListItem: React.FC<{ icon: React.ReactNode; label: string; color: string; border?: boolean; onClick: () => void }> = ({ icon, label, color, border = true, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between p-5 active:bg-gray-50 transition-all ${border ? 'border-b border-gray-50' : ''}`}
  >
    <div className="flex items-center gap-4">
      <div className={`p-2.5 rounded-xl ${color} shadow-sm`}>
        {icon}
      </div>
      <span className="text-sm font-bold text-gray-700">{label}</span>
    </div>
    <ChevronRight size={16} className="text-gray-300" />
  </button>
);
