import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slideImages = [
  "/hero-bg.jpg",
  "/hero-bg2.jpg",
  "/hero-bg3.jpg"
];

export default function HeroSection() {
  const swiperRef = useRef(null);

  return (
    <section id="beranda" className="relative h-[70vh] flex items-center justify-center bg-[#152a4e] text-white overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <Swiper
          ref={swiperRef}
          modules={[Autoplay, EffectFade, Navigation, Pagination]}
          effect="fade"
          loop={true}
          speed={1000}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: '.swiper-pagination',
            renderBullet: (index, className) => {
              return `<span class="${className} bg-white w-3 h-3 mx-1 rounded-full inline-block"></span>`;
            },
          }}
          className="w-full h-full"
        >
          {slideImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
        
        {/* Navigation Buttons */}
        <button 
          onClick={() => swiperRef.current.swiper.slidePrev()}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Previous slide"
        >
          <FaChevronLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={() => swiperRef.current.swiper.slideNext()}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Next slide"
        >
          <FaChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Konten teks yang tetap */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl md:text-4xl font-bold mb-4 hero-title-shadow leading-tight"
          >
            Selamat Datang di DISPORA Semarang
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
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
      </div>

      {/* Custom pagination */}
      <div className="absolute bottom-8 left-0 right-0 z-10">
        <div className="swiper-pagination"></div>
      </div>
    </section>
  );
}
