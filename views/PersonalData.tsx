
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Save, User as UserIcon, Mail, Phone, Calendar, CheckCircle2 } from 'lucide-react';
import { Button, Toast } from '../components/UI';
import { useAuth } from '../context/AuthContext';

export const PersonalDataView: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '(11) 98765-4321',
    birthDate: '1990-01-01'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simula salvamento
    setTimeout(() => {
      setLoading(false);
      setShowToast(true);
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      {/* Header com botão voltar */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/perfil')}
          className="p-2 bg-gray-50 rounded-xl text-gray-400 active:scale-90 transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <div>
          <h1 className="text-xl font-black text-black tracking-tight">Dados Pessoais</h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Mantenha seu cadastro atualizado</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 pt-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Nome Completo</label>
          <div className="relative">
            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
            <input 
              type="text" 
              className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-[#F2B705] outline-none shadow-sm transition-all"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">E-mail</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
            <input 
              type="email" 
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-sm text-gray-500 cursor-not-allowed outline-none"
              value={formData.email}
              readOnly
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Celular</label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
            <input 
              type="tel" 
              className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-[#F2B705] outline-none shadow-sm transition-all"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Data de Nascimento</label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
            <input 
              type="date" 
              className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-[#F2B705] outline-none shadow-sm transition-all"
              value={formData.birthDate}
              onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
            />
          </div>
        </div>

        <div className="pt-6">
          <Button fullWidth type="submit" disabled={loading} className="py-5 rounded-2xl shadow-xl shadow-[#F2B705]/10">
            {loading ? (
              <div className="h-5 w-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
            ) : (
              <>
                <Save size={18} />
                Salvar Alterações
              </>
            )}
          </Button>
        </div>
      </form>

      <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 text-center">
        <p className="text-xs text-gray-400 font-medium leading-relaxed">
          Seus dados são utilizados exclusivamente para identificação na Precisa e melhoria da sua experiência.
        </p>
      </div>

      <Toast 
        message="Dados salvos com sucesso!" 
        visible={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </div>
  );
};
