
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Lock, ShieldCheck, Fingerprint, Smartphone, AlertTriangle, Key } from 'lucide-react';
import { Button, Toast, Card } from '../components/UI';

export const SecurityView: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowToast(true);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/perfil')}
          className="p-2 bg-gray-50 rounded-xl text-gray-400 active:scale-90 transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <div>
          <h1 className="text-xl font-black text-black tracking-tight">Segurança</h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Proteja sua conta Precisa</p>
        </div>
      </div>

      <section className="space-y-4">
        <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Alterar Senha</h3>
        <Card className="border-none shadow-sm bg-white rounded-[2rem] p-6">
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Senha Atual</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input 
                  required
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-[#F2B705] outline-none transition-all"
                />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Nova Senha</label>
              <div className="relative">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input 
                  required
                  type="password" 
                  placeholder="Nova senha"
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-[#F2B705] outline-none transition-all"
                />
              </div>
            </div>

            <Button fullWidth type="submit" disabled={loading} className="py-4 rounded-xl">
              {loading ? 'Processando...' : 'Atualizar Senha'}
            </Button>
          </form>
        </Card>
      </section>

      <section className="space-y-4">
        <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Autenticação</h3>
        <div className="space-y-3">
          <SecurityToggle 
            icon={<Smartphone className="text-blue-500" />} 
            label="Autenticação em duas etapas" 
            active={twoFactor}
            onToggle={() => setTwoFactor(!twoFactor)}
          />
          <SecurityToggle 
            icon={<Fingerprint className="text-green-500" />} 
            label="Acesso por Biometria" 
            active={true}
            onToggle={() => {}}
          />
        </div>
      </section>

      <section className="pt-4">
        <button className="w-full p-5 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all">
          <AlertTriangle size={18} />
          Excluir minha conta
        </button>
        <p className="text-[9px] text-gray-300 text-center mt-3 uppercase font-bold px-8">
          A exclusão é permanente e você perderá todos os seus pontos acumulados.
        </p>
      </section>

      <Toast 
        message="Senha atualizada com sucesso!" 
        visible={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </div>
  );
};

const SecurityToggle: React.FC<{ icon: React.ReactNode; label: string; active: boolean; onToggle: () => void }> = ({ icon, label, active, onToggle }) => (
  <div className="bg-white border border-gray-100 p-5 rounded-[1.5rem] flex items-center justify-between shadow-sm">
    <div className="flex items-center gap-4">
      <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
      <span className="text-sm font-bold text-gray-700">{label}</span>
    </div>
    <button 
      onClick={onToggle}
      className={`w-12 h-6 rounded-full relative transition-colors ${active ? 'bg-[#F2B705]' : 'bg-gray-200'}`}
    >
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${active ? 'left-7 shadow-md shadow-black/10' : 'left-1'}`}></div>
    </button>
  </div>
);
