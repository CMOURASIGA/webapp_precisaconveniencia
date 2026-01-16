
import React, { useState } from 'react';
import { QrCode, ArrowRight, Zap, TrendingUp } from 'lucide-react';
import { Button, Card, Badge, Toast } from '../components/UI';
import { MOCK_USER, MOCK_CAMPAIGNS } from '../constants';

export const HomeView: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [checkingIn, setCheckingIn] = useState(false);
  const [points, setPoints] = useState(MOCK_USER.points);

  const handleCheckIn = () => {
    setCheckingIn(true);
    // Simulate API call
    setTimeout(() => {
      setCheckingIn(false);
      setPoints(prev => prev + 20);
      setShowToast(true);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Welcome Header */}
      <section>
        <h1 className="text-2xl font-bold font-brand tracking-tight">
          Olá, {MOCK_USER.name}! 👋
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Passou na Precisa hoje? Ganhe pontos agora.
        </p>
      </section>

      {/* Points Summary Card */}
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

      {/* Main Action */}
      <section className="space-y-3">
        {/* Fix: removed unsupported 'size' prop */}
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

      {/* Active Campaign Peek */}
      <section className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg font-brand">Em destaque</h2>
          <Badge>Novo</Badge>
        </div>
        
        {MOCK_CAMPAIGNS.filter(c => c.active).slice(0, 1).map(campaign => (
          <Card key={campaign.id} className="border-l-4 border-l-[#F2B705] hover:bg-gray-50 transition-colors cursor-pointer group">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-base leading-tight">{campaign.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{campaign.description}</p>
              </div>
              <div className="bg-[#F2B705] rounded-full p-2 text-black group-hover:scale-110 transition-transform">
                <ArrowRight size={16} />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1">
              <span className="text-[10px] font-black text-[#F2B705] bg-black px-2 py-0.5 rounded">
                +{campaign.rewardPoints} PONTOS
              </span>
            </div>
          </Card>
        ))}
      </section>

      <Toast 
        message="Check-in realizado! +20 pontos na conta." 
        visible={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </div>
  );
};
