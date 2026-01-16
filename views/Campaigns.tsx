
import React, { useState } from 'react';
import { Card, Badge, Button, Modal } from '../components/UI';
import { MOCK_CAMPAIGNS } from '../constants';
import { Gift, Clock, Star, MapPin, CheckCircle2 } from 'lucide-react';
import { Campaign } from '../types';

export const CampaignsView: React.FC = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  const getIcon = (type: string, size = 20) => {
    switch (type) {
      case 'extra': return <Star size={size} />;
      case 'product': return <Gift size={size} />;
      default: return <Gift size={size} />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <section>
        <h1 className="text-2xl font-bold font-brand tracking-tight">Oportunidades 🎁</h1>
        <p className="text-gray-500 text-sm">Toque em uma oferta para saber mais.</p>
      </section>

      <div className="space-y-4">
        {MOCK_CAMPAIGNS.map(campaign => (
          <Card 
            key={campaign.id} 
            onClick={() => campaign.active && setSelectedCampaign(campaign as Campaign)}
            className={`relative overflow-hidden group border-2 border-transparent hover:border-[#F2B705] ${!campaign.active ? 'opacity-50 grayscale cursor-not-allowed' : 'active:scale-[0.98]'}`}
          >
            <div className="flex gap-4">
              <div className={`p-3 rounded-xl h-fit transition-transform group-hover:scale-110 ${campaign.type === 'extra' ? 'bg-[#F2B705] text-black' : 'bg-black text-white'}`}>
                {getIcon(campaign.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-base leading-tight">{campaign.title}</h3>
                  {campaign.active ? <Badge variant="black">Ativa</Badge> : <Badge variant="yellow">Em breve</Badge>}
                </div>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{campaign.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[10px] font-black uppercase text-gray-400 tracking-tighter">
                    <Clock size={12} />
                    Válido até 30/04
                  </div>
                  <span className="text-sm font-black text-[#F2B705]">+{campaign.rewardPoints} PTS</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal de Detalhes da Campanha */}
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
              <h3 className="text-xl font-bold leading-tight">{selectedCampaign.title}</h3>
              <p className="text-sm text-gray-600 px-4">{selectedCampaign.description}</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 space-y-4">
              <h4 className="text-xs font-black uppercase text-gray-400 tracking-widest">O que você ganha</h4>
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-lg border border-gray-100">
                  <Star className="text-[#F2B705]" size={24} />
                </div>
                <div>
                  <p className="text-lg font-black">{selectedCampaign.rewardPoints} Pontos</p>
                  <p className="text-[10px] text-gray-400">Pontuação creditada na hora após validação.</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase text-gray-400 tracking-widest">Como participar</h4>
              <ul className="space-y-3">
                <StepItem icon={<MapPin size={16}/>} text="Vá até a unidade Precisa do seu condomínio." />
                <StepItem icon={<CheckCircle2 size={16}/>} text="Faça check-in pelo app ao chegar no local." />
                <StepItem icon={<Gift size={16}/>} text="Garanta seus pontos e aproveite as ofertas!" />
              </ul>
            </div>

            <Button fullWidth onClick={() => setSelectedCampaign(null)}>
              Entendido, vamos lá!
            </Button>
          </div>
        )}
      </Modal>

      <section className="pt-6">
        <Card className="bg-gray-50 border-dashed border-2 border-gray-200 flex flex-col items-center py-8 text-center">
          <p className="text-sm font-bold text-gray-400 italic">"Comprar aqui vale mais."</p>
        </Card>
      </section>
    </div>
  );
};

const StepItem: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <li className="flex items-start gap-3 text-sm text-gray-700">
    <div className="mt-0.5 text-[#F2B705]">{icon}</div>
    <span className="flex-1 font-medium">{text}</span>
  </li>
);
