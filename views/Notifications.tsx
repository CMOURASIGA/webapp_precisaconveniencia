
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Bell, Gift, Star, MessageSquare, Clock, Trash2 } from 'lucide-react';

const NOTIFICATIONS_MOCK = [
  {
    id: 'n1',
    title: 'Check-in Realizado!',
    description: 'Você acaba de ganhar 20 pontos na unidade HUB Office. Passe sempre por aqui!',
    time: 'Há 5 min',
    type: 'points',
    unread: true
  },
  {
    id: 'n2',
    title: 'Nova Campanha Disponível 🎁',
    description: 'Café grátis hoje das 18h às 19h no Condomínio Alpha. Não perca!',
    time: 'Há 2 horas',
    type: 'campaign',
    unread: true
  },
  {
    id: 'n3',
    title: 'Sugestão Enviada!',
    description: 'Obrigado por sugerir "Energético Zero". O gestor da unidade já está analisando.',
    time: 'Ontem',
    type: 'feedback',
    unread: false
  },
  {
    id: 'n4',
    title: 'Sexta do Snack',
    description: 'Lembrete: Seus cupons de desconto para snacks expiram em 2 dias.',
    time: '2 dias atrás',
    type: 'campaign',
    unread: false
  }
];

export const NotificationsView: React.FC = () => {
  const navigate = useNavigate();

  const getIcon = (type: string) => {
    switch (type) {
      case 'points': return <Star className="text-yellow-600" size={18} />;
      case 'campaign': return <Gift className="text-purple-600" size={18} />;
      case 'feedback': return <MessageSquare className="text-blue-600" size={18} />;
      default: return <Bell className="text-gray-600" size={18} />;
    }
  };

  const getBg = (type: string) => {
    switch (type) {
      case 'points': return 'bg-yellow-50';
      case 'campaign': return 'bg-purple-50';
      case 'feedback': return 'bg-blue-50';
      default: return 'bg-gray-50';
    }
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 bg-gray-50 rounded-xl text-gray-400 active:scale-90 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl font-black text-black tracking-tight">Notificações</h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Acompanhe as novidades</p>
          </div>
        </div>
        <button className="p-2 text-gray-300 hover:text-red-400 transition-colors">
          <Trash2 size={18} />
        </button>
      </div>

      <div className="space-y-3">
        {NOTIFICATIONS_MOCK.map((item) => (
          <div 
            key={item.id} 
            className={`relative p-5 rounded-[2rem] border transition-all active:scale-[0.98] ${
              item.unread ? 'bg-white border-[#F2B705]/30 shadow-md shadow-[#F2B705]/5' : 'bg-gray-50/50 border-gray-100'
            }`}
          >
            {item.unread && (
              <span className="absolute top-5 right-5 w-2 h-2 bg-[#F2B705] rounded-full"></span>
            )}
            
            <div className="flex gap-4">
              <div className={`p-3 rounded-2xl shrink-0 h-fit ${getBg(item.type)}`}>
                {getIcon(item.type)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-start pr-4">
                  <h3 className={`text-sm font-black leading-tight ${item.unread ? 'text-black' : 'text-gray-600'}`}>
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed font-medium">
                  {item.description}
                </p>
                <div className="flex items-center gap-1.5 pt-2">
                  <Clock size={10} className="text-gray-300" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-300">
                    {item.time}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="py-10 text-center space-y-3">
        <div className="inline-block p-4 bg-gray-50 rounded-full text-gray-200">
          <Bell size={24} />
        </div>
        <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">Não há mais notificações</p>
      </div>
    </div>
  );
};
