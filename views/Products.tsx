
import React, { useState, useMemo } from 'react';
import { Search, Coffee, Pizza, Wine, Sparkles, AlertCircle, ShoppingBag, MessageSquare, Info } from 'lucide-react';
import { Card, Badge, Modal, Button, Toast } from '../components/UI';
import { MOCK_PRODUCTS } from '../constants';

const CATEGORIES = [
  { id: 'all', label: 'Tudo', icon: <Sparkles size={16} /> },
  { id: 'bebidas', label: 'Bebidas', icon: <Wine size={16} /> },
  { id: 'snacks', label: 'Snacks', icon: <Pizza size={16} /> },
  { id: 'essenciais', label: 'Essenciais', icon: <Coffee size={16} /> },
];

const SUGGESTION_REASONS = [
  "Uso diariamente e faz falta",
  "Difícil de encontrar na região",
  "Seria ótimo para momentos de lazer",
  "Sugestão de marca melhor",
  "Outro motivo"
];

export const ProductsView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSuggestModalOpen, setIsSuggestModalOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  
  const [suggestName, setSuggestName] = useState('');
  const [suggestReason, setSuggestReason] = useState('');
  const [suggestDetails, setSuggestDetails] = useState('');

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(p => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const handleSendSuggestion = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuggestModalOpen(false);
    setShowSuccessToast(true);
    setSuggestName('');
    setSuggestReason('');
    setSuggestDetails('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <section>
        <h1 className="text-2xl font-bold font-brand tracking-tight">O que tem hoje? 🍎</h1>
        <p className="text-gray-500 text-sm">Confira as prateleiras da sua unidade.</p>
      </section>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="O que você está procurando?"
          className="w-full bg-gray-50 border-none rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#F2B705] transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
              activeCategory === cat.id 
                ? 'bg-[#F2B705] border-[#F2B705] text-black shadow-md shadow-[#F2B705]/20' 
                : 'bg-white border-gray-100 text-gray-400'
            }`}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <Card key={product.id} className="p-0 overflow-hidden flex flex-col group border border-gray-100 hover:border-[#F2B705]/30 transition-all shadow-sm">
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  loading="lazy"
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${!product.inStock ? 'opacity-40 grayscale' : ''}`}
                />
                {!product.inStock && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-[1px]">
                    <span className="bg-black text-white text-[9px] font-black uppercase px-2 py-1 rounded tracking-tighter shadow-xl">Esgotado</span>
                  </div>
                )}
                {product.inStock && product.price > 15 && (
                  <div className="absolute top-2 left-2">
                    <Badge variant="yellow">Destaque</Badge>
                  </div>
                )}
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-[11px] font-bold leading-tight text-gray-800 line-clamp-2 h-8">{product.name}</h3>
                  <p className="text-[9px] text-gray-400 uppercase mt-1 tracking-wider font-bold">{product.category}</p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-black text-black">R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  <button className="bg-gray-50 p-1.5 rounded-lg text-gray-400 hover:text-black hover:bg-[#F2B705] transition-all active:scale-90">
                    <Sparkles size={14} />
                  </button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-2 py-12 text-center space-y-3">
            <div className="bg-gray-50 inline-block p-4 rounded-full text-gray-300">
              <AlertCircle size={32} />
            </div>
            <p className="text-gray-400 text-sm font-medium">Nenhum produto encontrado...</p>
          </div>
        )}
      </div>

      <section className="bg-black rounded-2xl p-6 text-white overflow-hidden relative shadow-2xl">
        <div className="relative z-10">
          <h3 className="font-bold text-lg leading-tight font-brand">Viu algo que não tem?</h3>
          <p className="text-xs text-gray-400 mt-2">Sugira novos produtos para sua unidade e ganhe 10 pontos!</p>
          <button 
            onClick={() => setIsSuggestModalOpen(true)}
            className="mt-5 text-[10px] font-black uppercase bg-[#F2B705] text-black px-6 py-3 rounded-full active:scale-95 transition-transform shadow-lg shadow-[#F2B705]/20"
          >
            Sugerir agora
          </button>
        </div>
        <div className="absolute -right-4 -bottom-4 opacity-10">
          <ShoppingBag size={120} />
        </div>
      </section>

      <Modal 
        isOpen={isSuggestModalOpen} 
        onClose={() => setIsSuggestModalOpen(false)} 
        title="O que falta na sua rotina?"
      >
        <form onSubmit={handleSendSuggestion} className="space-y-5">
          <div className="bg-[#F2B705]/10 p-4 rounded-xl flex items-start gap-3 border border-[#F2B705]/20">
            <Info className="text-[#F2B705] shrink-0" size={18} />
            <p className="text-[11px] text-gray-700 leading-normal">
              Suas sugestões ajudam a <strong>Precisa</strong> a ser cada vez mais parte do seu dia. O gestor da sua unidade analisará seu pedido!
            </p>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400">Qual produto você sentiu falta?</label>
            <input 
              required
              type="text" 
              placeholder="Ex: Leite sem lactose, Energético sem açúcar..."
              className="w-full bg-gray-50 border border-gray-100 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#F2B705] outline-none transition-all"
              value={suggestName}
              onChange={(e) => setSuggestName(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400">Por que é importante para você?</label>
            <select 
              required
              className="w-full bg-gray-50 border border-gray-100 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#F2B705] outline-none transition-all appearance-none"
              value={suggestReason}
              onChange={(e) => setSuggestReason(e.target.value)}
            >
              <option value="">Selecione um motivo...</option>
              {SUGGESTION_REASONS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400">Explique um pouco mais (Opcional)</label>
            <textarea 
              rows={3}
              placeholder="Ex: Gostaria de ter essa opção pois consumo todo dia no café da manhã..."
              className="w-full bg-gray-50 border border-gray-100 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#F2B705] outline-none transition-all resize-none"
              value={suggestDetails}
              onChange={(e) => setSuggestDetails(e.target.value)}
            />
          </div>

          <div className="pt-2">
            <Button fullWidth type="submit">
              <MessageSquare size={18} />
              Enviar Sugestão (+10 PTS)
            </Button>
            <p className="text-[9px] text-center text-gray-400 mt-3 uppercase font-bold tracking-widest">Obrigado por ajudar a Precisa!</p>
          </div>
        </form>
      </Modal>

      <Toast 
        message="Sugestão enviada com sucesso! +10 pontos." 
        visible={showSuccessToast} 
        onClose={() => setShowSuccessToast(false)} 
      />
    </div>
  );
};
