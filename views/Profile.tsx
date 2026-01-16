
import React from 'react';
import { Card } from '../components/UI';
import { MOCK_USER } from '../constants';
import { Settings, LogOut, ChevronRight, History } from 'lucide-react';

const HISTORY_MOCK = [
  { id: 'h1', type: 'Check-in', value: '+20 pts', date: 'Hoje, 18:45', location: 'HUB Office' },
  { id: 'h2', type: 'Compra', value: '+45 pts', date: 'Ontem, 08:30', location: 'HUB Office' },
  { id: 'h3', type: 'Check-in', value: '+20 pts', date: '22 Abr, 19:15', location: 'Condomínio Alpha' },
  { id: 'h4', type: 'Resgate', value: '-100 pts', date: '20 Abr, 12:00', location: 'Loja Online' },
];

export const ProfileView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <section className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-brand">Sua Conta</h1>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings size={20} className="text-gray-400" />
          </button>
        </div>
      </section>

      {/* Profile Info */}
      <div className="flex items-center gap-4 py-2">
        <div className="h-16 w-16 rounded-full bg-[#F2B705] flex items-center justify-center font-black text-2xl border-4 border-black">
          {MOCK_USER.name.charAt(0)}
        </div>
        <div>
          <h2 className="font-bold text-lg">{MOCK_USER.name}</h2>
          <p className="text-xs text-gray-500">Membro desde Abril 2024</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="text-center">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Ganhos</span>
          <p className="text-xl font-black mt-1">1.250</p>
        </Card>
        <Card className="text-center">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Check-ins</span>
          <p className="text-xl font-black mt-1">{MOCK_USER.checkInCount}</p>
        </Card>
      </div>

      {/* Interaction History */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 font-bold text-base font-brand">
          <History size={18} />
          Histórico
        </div>
        
        <div className="space-y-px rounded-xl overflow-hidden border border-gray-100">
          {HISTORY_MOCK.map((item) => (
            <div key={item.id} className="bg-white p-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">
              <div className="flex flex-col">
                <span className="text-xs font-bold">{item.type}</span>
                <span className="text-[10px] text-gray-400">{item.date} • {item.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-black ${item.value.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {item.value}
                </span>
                <ChevronRight size={14} className="text-gray-300" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <button className="w-full flex items-center justify-center gap-2 p-4 text-red-500 font-bold text-sm hover:bg-red-50 rounded-xl transition-colors mt-8">
        <LogOut size={18} />
        Sair da Conta
      </button>
    </div>
  );
};
