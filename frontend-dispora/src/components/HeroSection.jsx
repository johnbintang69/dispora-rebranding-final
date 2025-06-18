import React from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section id="beranda" className="relative h-[70vh] flex items-center justify-center bg-[#152a4e] text-white overflow-hidden">
      <img
        src="/hero-bg.jpg"
        alt="Background Hero DISPORA"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      {/* Overlay hitam transparan agar teks lebih kontras */}
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl md:text-4xl font-bold mb-4 hero-title-shadow leading-tight"
        >
          Selamat Datang di DISPORA Semarang
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-6 text-sm md:text-base leading-relaxed"
        >
          Selamat datang di portal resmi Dinas Kepemudaan dan Olahraga Kota Semarang. Temukan informasi terbaru seputar program dan kegiatan pemuda serta olahraga di Kota Semarang.
        </motion.p>
        <motion.a
          href="/berita"
          className="inline-block bg-gold text-navy font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-yellow-400 transition-colors duration-200"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Lihat Berita terbaru
        </motion.a>
      </div>
    </section>
  );
}
