
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomeView } from './views/Home';
import { CampaignsView } from './views/Campaigns';
import { ProductsView } from './views/Products';
import { ProfileView } from './views/Profile';
import { DashboardView } from './views/Dashboard';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/produtos" element={<ProductsView />} />
          <Route path="/campanhas" element={<CampaignsView />} />
          <Route path="/perfil" element={<ProfileView />} />
          <Route path="/dashboard" element={<DashboardView />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
