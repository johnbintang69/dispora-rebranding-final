import React, { useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import NewsSection from './components/NewsSection';
import GallerySection from './components/GallerySection';
import ProgramSection from './components/ProgramSection';
import BackToTopButton from './components/BackToTopButton';
import Footer from './components/Footer';
import NewsList from './pages/NewsList';
import StrukturOrganisasi from './pages/StrukturOrganisasi';
import ProfilPegawai from './pages/ProfilPegawai';
import Maklumat from './pages/Maklumat';
import SaranaSekolah from './pages/SaranaSekolah';
import SaranaEstripora from './pages/SaranaEstripora';
import CabangOlahraga from './pages/CabangOlahraga';
import ProfilKomunitas from './pages/ProfilKomunitas';
import Kontak from './pages/Kontak';
import DasarHukum from './pages/DasarHukum';
import NewsDetail from './pages/NewsDetail';
import InformasiPublikBerkala from './pages/InformasiPublikBerkala';
import InformasiPublikSetiapSaat from './pages/InformasiPublikSetiapSaat';
import InformasiPublikSertaMerta from './pages/InformasiPublikSertaMerta';
import InformasiPublikDikecualikan from './pages/InformasiPublikDikecualikan';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AdminLayout from './components/admin/AdminLayout';
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import ArticleListPage from './pages/admin/ArticleListPage';
import ArticleFormPage from './pages/admin/ArticleFormPage';
import ProtectedRoute from './components/admin/ProtectedRoute';

import { LoadingProvider, useLoading } from './context/LoadingContext';

function GlobalLoadingSpinner() {
  const { loading } = useLoading();
  if (!loading) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 z-[9999]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-400"></div>
    </div>
  );
}

const AppContent = () => {
  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <main>
              <HeroSection />
              <AboutSection />
              <ProgramSection />
              <NewsSection />
              <GallerySection />
            </main>
            {/* Section Ikuti Kami */}
            <section className="container mx-auto px-4 py-10">
              <h2 className="text-2xl font-bold mb-2 text-center">Ikuti Kami</h2>
              <div className="h-1 w-32 bg-red-500 mb-6 mx-auto"></div>
              <div className="flex justify-center">
                <div className="w-full max-w-4xl">
                  <div className="elfsight-app-11002a80-c54c-4072-9b88-f654ed21427e" data-elfsight-app-lazy></div>
                </div>
              </div>
            </section>
          </>
        } />
        <Route path="/berita" element={<NewsList />} />
        <Route path="/berita/:id/:slug" element={<NewsDetail />} />
        <Route path="/struktur-organisasi" element={<StrukturOrganisasi />} />
        <Route path="/profil-pegawai" element={<ProfilPegawai />} />
        <Route path="/maklumat" element={<Maklumat />} />
        <Route path="/sarana-sekolah" element={<SaranaSekolah />} />
        <Route path="/sarana-estripora" element={<SaranaEstripora />} />
        <Route path="/cabang-olahraga" element={<CabangOlahraga />} />
        <Route path="/profil-komunitas" element={<ProfilKomunitas />} />
        <Route path="/kontak" element={<Kontak />} />
        <Route path="/dasar-hukum" element={<DasarHukum />} />
        <Route path="/informasi-publik-berkala" element={<InformasiPublikBerkala />} />
        <Route path="/informasi-publik-setiap-saat" element={<InformasiPublikSetiapSaat />} />
        <Route path="/informasi-publik-serta-merta" element={<InformasiPublikSertaMerta />} />
        <Route path="/informasi-publik-dikecualikan" element={<InformasiPublikDikecualikan />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/login" element={<LoginPage />} />
        
        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="articles" element={<ArticleListPage />} />
            <Route path="articles/new" element={<ArticleFormPage />} />
            <Route path="articles/:id/edit" element={<ArticleFormPage />} />
          </Route>
        </Route>
      </Routes>
      <BackToTopButton />
      <Footer />
    </div>
  );
};

function App() {
  useEffect(() => {
    if (!document.querySelector('script[src="https://static.elfsight.com/platform/platform.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://static.elfsight.com/platform/platform.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default function WrappedApp() {
  return (
    <LoadingProvider>
      <GlobalLoadingSpinner />
      <App />
    </LoadingProvider>
  );
}
