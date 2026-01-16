
import React, { useState } from 'react';
import { QrCode, ArrowRight, Zap, TrendingUp, Star, Gift, MapPin, CheckCircle2, Clock } from 'lucide-react';
import { Button, Card, Badge, Toast, Modal } from '../components/UI';
import { MOCK_CAMPAIGNS } from '../constants';
import { useAuth } from '../context/AuthContext';
import { Campaign } from '../types';

export const HomeView: React.FC = () => {
  const { user } = useAuth();
  const [showToast, setShowToast] = useState(false);
  const [checkingIn, setCheckingIn] = useState(false);
  const [points, setPoints] = useState(user?.points || 0);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  const handleCheckIn = () => {
    setCheckingIn(true);
    setTimeout(() => {
      setCheckingIn(false);
      setPoints(prev => prev + 20);
      setShowToast(true);
    }, 1500);
  };

  const getIcon = (type: string, size = 20) => {
    switch (type) {
      case 'extra': return <Star size={size} />;
      case 'product': return <Gift size={size} />;
      default: return <Gift size={size} />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <section>
        <h1 className="text-2xl font-bold font-brand tracking-tight">
          Olá, {user?.name.split(' ')[0]}! 👋
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Passou na Precisa hoje? Ganhe pontos agora.
        </p>
      </section>

      <Card className="bg-black text-white relative overflow-hidden">
        <div className="relative z-10">
          <span className="text-xs font-bold uppercase opacity-60 tracking-widest">Saldo Atual</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-4xl font-black font-brand text-[#F2B705]">{points}</span>
            <span className="text-sm font-bold opacity-80 uppercase">Pontos</span>
          </div>
          <div className="mt-4 flex gap-4">
            <div className="flex items-center gap-1">
              <Zap size={14} className="text-[#F2B705]" />
              <span className="text-[10px] font-bold text-gray-300">Nível Prata</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp size={14} className="text-[#F2B705]" />
              <span className="text-[10px] font-bold text-gray-300">Meta: 500 pts</span>
            </div>
          </div>
        </div>
        <div className="absolute -right-4 -bottom-4 opacity-10">
          <QrCode size={120} />
        </div>
      </Card>

      <section className="space-y-3">
        <Button 
          fullWidth 
          onClick={handleCheckIn}
          disabled={checkingIn}
        >
          {checkingIn ? (
            "Validando check-in..."
          ) : (
            <>
              <QrCode size={20} />
              Fazer Check-in Presencial
            </>
          )}
        </Button>
        <p className="text-[10px] text-center text-gray-400 font-medium uppercase tracking-tighter">
          * Escaneie o QR Code visível na unidade
        </p>
      </section>

      <section className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg font-brand uppercase tracking-tighter italic">Em destaque</h2>
          <Badge variant="yellow">NOVO</Badge>
        </div>
        
        {MOCK_CAMPAIGNS.filter(c => c.active).slice(0, 1).map(campaign => (
          <Card 
            key={campaign.id} 
            onClick={() => setSelectedCampaign(campaign as Campaign)}
            className="border-l-4 border-l-[#F2B705] hover:bg-gray-50 transition-all cursor-pointer group active:scale-[0.98]"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1 pr-4">
                <h3 className="font-bold text-base leading-tight font-brand">{campaign.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{campaign.description}</p>
              </div>
              <div className="bg-[#F2B705] rounded-full p-2.5 text-black group-hover:translate-x-1 transition-transform shadow-lg shadow-[#F2B705]/20">
                <ArrowRight size={18} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1">
              <span className="text-[10px] font-black text-[#F2B705] bg-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                +{campaign.rewardPoints} PONTOS
              </span>
            </div>
          </Card>
        ))}
      </section>

      {/* Modal de Detalhes da Campanha na Home */}
      <Modal 
        isOpen={!!selectedCampaign} 
        onClose={() => setSelectedCampaign(null)}
        title="Detalhes da Oferta"
      >
        {selectedCampaign && (
          <div className="space-y-6">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="p-5 rounded-2xl bg-[#F2B705] text-black shadow-lg shadow-[#F2B705]/20">
                {getIcon(selectedCampaign.type, 40)}
              </div>
              <h3 className="text-xl font-bold leading-tight font-brand italic uppercase tracking-tighter">
                {selectedCampaign.title}
              </h3>
              <p className="text-sm text-gray-600 px-4">{selectedCampaign.description}</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 space-y-4">
              <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">O que você ganha</h4>
              <div className="flex items-center gap-3">
                <div className="bg-white p-2.5 rounded-xl border border-gray-100 shadow-sm">
                  <Star className="text-[#F2B705]" size={24} />
                </div>
                <div>
                  <p className="text-lg font-black leading-none">{selectedCampaign.rewardPoints} Pontos</p>
                  <p className="text-[10px] text-gray-400 mt-1 font-bold uppercase tracking-tight">Pontuação creditada na hora!</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Como participar</h4>
              <ul className="space-y-4">
                <StepItem icon={<MapPin size={16}/>} text="Vá até a unidade Precisa do seu condomínio." />
                <StepItem icon={<CheckCircle2 size={16}/>} text="Faça check-in pelo app ao chegar no local." />
                <StepItem icon={<Gift size={16}/>} text="Garanta seus pontos e aproveite as ofertas!" />
              </ul>
            </div>

            <Button fullWidth onClick={() => setSelectedCampaign(null)} className="py-4 mt-2">
              Entendido, vamos lá!
            </Button>
          </div>
        )}
      </Modal>

      <Toast 
        message="Check-in realizado! +20 pontos na conta." 
        visible={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </div>
  );
};

const StepItem: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <li className="flex items-start gap-3 text-sm text-gray-700">
    <div className="mt-0.5 text-[#F2B705] bg-[#F2B705]/10 p-1 rounded-md">{icon}</div>
    <span className="flex-1 font-semibold leading-snug">{text}</span>
  </li>
);
