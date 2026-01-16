
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { TrendingUp, Users, MapPin, Target, Sparkles } from 'lucide-react';
import { Card } from '../components/UI';
import { COLORS } from '../constants';

const CHECKIN_DATA = [
  { name: 'Cond. Alpha', value: 145 },
  { name: 'Empresa Tech', value: 89 },
  { name: 'Resid. Sol', value: 212 },
  { name: 'HUB Office', value: 67 },
];

const HOURLY_DATA = [
  { hour: '08:00', count: 12 },
  { hour: '12:00', count: 45 },
  { hour: '17:00', count: 78 },
  { hour: '18:00', count: 120 },
  { hour: '20:00', count: 85 },
  { hour: '22:00', count: 32 },
];

const COLORS_SERIES = ['#F2B705', '#000000', '#9CA3AF', '#E5E7EB'];

export const DashboardView: React.FC = () => {
  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-700">
      <section>
        <h1 className="text-2xl font-bold font-brand tracking-tight">Inteligência de Dados</h1>
        <p className="text-gray-500 text-sm">Visão estratégica da Precisa Conveniência.</p>
      </section>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard 
          icon={<Users size={16} />} 
          label="Total Usuários" 
          value="1.2k" 
          trend="+12%" 
        />
        <StatCard 
          icon={<TrendingUp size={16} />} 
          label="Check-ins/Dia" 
          value="456" 
          trend="+5%" 
        />
      </div>

      {/* Main Charts */}
      <section className="space-y-4">
        <h2 className="font-bold text-base flex items-center gap-2">
          <MapPin size={18} className="text-[#F2B705]" />
          Engagement por Unidade
        </h2>
        <Card className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={CHECKIN_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip cursor={{fill: '#f9f9f9'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {CHECKIN_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS_SERIES[index % COLORS_SERIES.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="font-bold text-base flex items-center gap-2">
          <Target size={18} className="text-[#F2B705]" />
          Horários de Pico (Check-in)
        </h2>
        <Card className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={HOURLY_DATA} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" hide />
              <YAxis dataKey="hour" type="category" fontSize={10} axisLine={false} tickLine={false} width={45} />
              <Tooltip cursor={{fill: 'transparent'}} />
              <Bar dataKey="count" fill="#000000" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </section>

      {/* AI Insight Section */}
      <Card className="bg-[#F2B705]/10 border-[#F2B705] border">
        <div className="flex gap-3">
          <div className="bg-[#F2B705] p-2 rounded-lg h-fit text-black">
            <Sparkles size={18} />
          </div>
          <div>
            <h3 className="font-bold text-sm">Insight da Precisa IA</h3>
            <p className="text-xs text-gray-700 mt-1 leading-relaxed">
              O movimento no <strong>Condomínio Alpha</strong> cresce 35% entre 18h e 19h. 
              Sugerimos lançar uma campanha de "Snack Rápido" nesse horário para aumentar o ticket médio.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string; trend: string }> = ({ icon, label, value, trend }) => (
  <Card className="flex flex-col gap-1">
    <div className="flex items-center justify-between text-gray-400">
      {icon}
      <span className="text-[10px] font-bold text-green-500 bg-green-50 px-1.5 py-0.5 rounded">{trend}</span>
    </div>
    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">{label}</span>
    <span className="text-xl font-black">{value}</span>
  </Card>
);
