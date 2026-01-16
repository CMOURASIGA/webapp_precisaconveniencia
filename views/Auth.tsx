
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button, Card } from '../components/UI';
import { LOGO_URL } from '../constants';
import { Mail, Lock, User as UserIcon, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AuthView: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { login, register, user: authUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
        // O useEffect abaixo cuidará do redirecionamento do login
      } else {
        await register(name, email, password);
        setIsSuccess(true);
        // Espera a animação de sucesso terminar antes de navegar
        await new Promise(r => setTimeout(r, 2000));
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Redireciona após login bem sucedido ou se já estiver autenticado
  React.useEffect(() => {
    if (authUser && !isSuccess) {
      if (authUser.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    }
  }, [authUser, navigate, isSuccess]);

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
        <div className="bg-[#F2B705] p-6 rounded-full text-black mb-8 shadow-2xl shadow-[#F2B705]/30">
          <CheckCircle2 size={56} strokeWidth={2.5} className="animate-bounce" />
        </div>
        <h2 className="text-3xl font-black font-brand italic uppercase tracking-tighter">Bem-vindo!</h2>
        <p className="text-gray-500 mt-3 text-lg">
          Sua conta foi criada e você ganhou <br/>
          <span className="text-black font-black">50 PONTOS</span> de bônus!
        </p>
        <div className="mt-10 h-1 w-24 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-[#F2B705] animate-progress-fast"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-10 animate-in fade-in duration-500">
      <div className="flex flex-col items-center mb-10">
        <img src={LOGO_URL} alt="Precisa Conveniência" className="h-16 mb-4 object-contain" />
        <h1 className="text-2xl font-black font-brand text-center uppercase tracking-tighter italic">
          {isLogin ? 'Bem-vindo!' : 'Crie sua conta'}
        </h1>
        <p className="text-gray-500 text-sm mt-2 text-center font-medium">
          {isLogin ? 'Acesse para acumular pontos e ofertas.' : 'Ganhe 50 pontos agora no cadastro!'}
        </p>
      </div>

      <Card className="border-none shadow-none p-0 bg-transparent">
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Nome Completo</label>
              <div className="relative group">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F2B705] transition-colors" size={18} />
                <input 
                  required
                  type="text" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-[#F2B705] focus:bg-white outline-none transition-all shadow-sm"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">E-mail de acesso</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F2B705] transition-colors" size={18} />
              <input 
                required
                type="email" 
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-[#F2B705] focus:bg-white outline-none transition-all shadow-sm"
                placeholder="exemplo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Senha secreta</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F2B705] transition-colors" size={18} />
              <input 
                required
                type="password" 
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-[#F2B705] focus:bg-white outline-none transition-all shadow-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 p-3 rounded-xl border border-red-100 animate-in shake-in duration-300">
              <p className="text-red-600 text-[11px] font-bold text-center leading-tight">{error}</p>
            </div>
          )}

          <Button fullWidth type="submit" disabled={loading} className="py-5 mt-6 rounded-2xl shadow-xl shadow-[#F2B705]/20">
            {loading ? (
              <div className="h-5 w-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
            ) : (
              <>
                <span className="uppercase tracking-widest font-black">{isLogin ? 'Entrar Agora' : 'Finalizar Cadastro'}</span>
                <ArrowRight size={18} />
              </>
            )}
          </Button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-sm text-gray-400 font-medium">
            {isLogin ? 'Ainda não tem conta?' : 'Já possui acesso?'}
            <button 
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="ml-2 font-black text-black underline underline-offset-4 decoration-[#F2B705] decoration-4 hover:text-[#F2B705] transition-colors uppercase text-xs tracking-tighter"
            >
              {isLogin ? 'Cadastre-se' : 'Fazer Login'}
            </button>
          </p>
        </div>
      </Card>
      
      <p className="mt-auto text-[9px] text-gray-300 text-center uppercase font-black tracking-[0.3em] pt-12">
        Precisa Conveniência • Tecnologia & Praticidade
      </p>
    </div>
  );
};
