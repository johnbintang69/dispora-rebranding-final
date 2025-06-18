import React from "react";
import { FaSitemap } from "react-icons/fa";
import { motion } from "framer-motion";
import strukturImg from '../assets/strukturorganisasi.jpg';

export default function StrukturOrganisasi() {
  return (
    <section className="min-h-[70vh] py-16 bg-white flex flex-col items-center justify-center">
      <motion.div 
        className="flex flex-col items-center mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FaSitemap className="text-gold text-5xl mb-2 drop-shadow" />
        <motion.h1 
          className="text-2xl md:text-3xl font-bold text-navy font-title text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Struktur Organisasi DISPORA Kota Semarang
        </motion.h1>
      </motion.div>
      <motion.div 
        className="w-full flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="w-full max-w-5xl">
          <motion.div
            className="w-full rounded-lg overflow-hidden"
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.img
              src={strukturImg}
              alt="Struktur Organisasi DISPORA Kota Semarang"
              className="w-full rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-gold/20"
              style={{ objectFit: 'contain' }}
              whileHover={{
                scale: 1.01,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                transition: { duration: 0.3 }
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
