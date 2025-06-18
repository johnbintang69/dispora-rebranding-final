import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import maklumatImg from '../assets/maklumat.jpg';

export default function Maklumat() {
  return (
    <section className="min-h-[70vh] py-8 md:py-12 bg-white flex flex-col items-center justify-center">
      <motion.div 
        className="flex flex-col items-center mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FaInfoCircle className="text-gold text-5xl mb-2 drop-shadow" />
        <motion.h1 
          className="text-2xl md:text-3xl font-bold text-navy font-title text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Maklumat DISPORA Kota Semarang
        </motion.h1>
      </motion.div>
      <motion.div 
        className="w-full flex justify-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="w-full max-w-4xl">
          <motion.div
            className="w-full max-w-3xl mx-auto rounded-lg overflow-hidden bg-white p-2 md:p-4 border border-gray-100"
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.3 }
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.img
              src={maklumatImg}
              alt="Maklumat DISPORA Kota Semarang"
              className="w-full h-auto max-h-[60vh] object-contain rounded shadow-sm"
              whileHover={{
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transition: { duration: 0.3 }
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
