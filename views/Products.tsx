
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

      {/* Banner de Sugestão - Movido para antes da pesquisa */}
      <section className="bg-black rounded-[2rem] p-7 text-white overflow-hidden relative shadow-xl">
        <div className="relative z-10">
          <h3 className="font-bold text-xl leading-tight font-brand pr-12">Viu algo que não tem?</h3>
          <p className="text-[13px] text-gray-400 mt-2 font-medium">Sugira novos produtos para sua unidade e ganhe 10 pontos!</p>
          <button 
            onClick={() => setIsSuggestModalOpen(true)}
            className="mt-6 text-[11px] font-black uppercase bg-[#F2B705] text-black px-8 py-3.5 rounded-full active:scale-95 transition-all shadow-lg shadow-[#F2B705]/10 hover:brightness-110 tracking-wider"
          >
            Sugerir agora
          </button>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 translate-x-4 translate-y-4">
          <ShoppingBag size={140} strokeWidth={1.5} />
        </div>
      </section>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="O que você está procurando?"
          className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-[#F2B705] outline-none transition-all placeholder:text-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
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

      <div className="grid grid-cols-2 gap-4 pb-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <Card key={product.id} className="p-0 overflow-hidden flex flex-col group border border-gray-100 hover:border-[#F2B705]/30 transition-all shadow-sm rounded-2xl">
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
              <div className="p-4 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <h3 className="text-[11px] font-bold leading-tight text-gray-800 line-clamp-2 h-8">{product.name}</h3>
                  <p className="text-[9px] text-gray-400 uppercase mt-1 tracking-wider font-bold">{product.category}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-black text-black">R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  <button className="bg-gray-50 p-2 rounded-xl text-gray-400 hover:text-black hover:bg-[#F2B705] transition-all active:scale-90 border border-gray-100">
                    <Sparkles size={14} />
                  </button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-2 py-16 text-center space-y-4">
            <div className="bg-gray-50 inline-block p-6 rounded-full text-gray-200">
              <AlertCircle size={40} />
            </div>
            <p className="text-gray-400 text-sm font-medium">Nenhum produto encontrado...</p>
          </div>
        )}
      </div>

      <Modal 
        isOpen={isSuggestModalOpen} 
        onClose={() => setIsSuggestModalOpen(false)} 
        title="O que falta na sua rotina?"
      >
        <form onSubmit={handleSendSuggestion} className="space-y-5">
          <div className="bg-[#F2B705]/10 p-5 rounded-2xl flex items-start gap-3 border border-[#F2B705]/20">
            <Info className="text-[#F2B705] shrink-0" size={20} />
            <p className="text-xs text-gray-700 leading-relaxed">
              Suas sugestões ajudam a <strong>Precisa</strong> a ser cada vez mais parte do seu dia. O gestor da sua unidade analisará seu pedido!
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Produto em falta</label>
            <input 
              required
              type="text" 
              placeholder="Ex: Leite sem lactose, Energético sem açúcar..."
              className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#F2B705] outline-none transition-all"
              value={suggestName}
              onChange={(e) => setSuggestName(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Motivo da sugestão</label>
            <div className="relative">
              <select 
                required
                className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#F2B705] outline-none transition-all appearance-none cursor-pointer"
                value={suggestReason}
                onChange={(e) => setSuggestReason(e.target.value)}
              >
                <option value="">Selecione um motivo...</option>
                {SUGGESTION_REASONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <AlertCircle size={14} />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Detalhes adicionais (Opcional)</label>
            <textarea 
              rows={3}
              placeholder="Ex: Gostaria de ter essa opção pois consumo todo dia..."
              className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#F2B705] outline-none transition-all resize-none"
              value={suggestDetails}
              onChange={(e) => setSuggestDetails(e.target.value)}
            />
          </div>

          <div className="pt-4">
            <Button fullWidth type="submit" className="py-4 rounded-xl">
              <MessageSquare size={18} />
              Enviar Sugestão (+10 PTS)
            </Button>
            <p className="text-[10px] text-center text-gray-400 mt-4 uppercase font-bold tracking-[0.2em]">Obrigado por ajudar a Precisa!</p>
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
