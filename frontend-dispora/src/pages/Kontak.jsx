import React, { useEffect } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Kontak = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Buat Event Kepemudaan? Hubungi kami
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Untuk menyelenggarakan acara, diperlukan persetujuan dari pihak berwenang. 
            Oleh karena itu, syarat-syarat dan ketentuan dapat dikonsultasikan dengan kami 
            agar acara tersebut berlangsung dengan semangat, aman, nyaman, dan tentunya sehat.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-xl shadow-md p-8 grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div className="space-y-6" variants={container}>
            <motion.div className="flex items-start" variants={item}>
              <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <FaEnvelope className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Email</h3>
                <a 
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=disporakotasemarang@gmail.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:underline"
                >
                  disporakotasemarang@gmail.com
                </a>
              </div>
            </motion.div>

            <motion.div className="flex items-start" variants={item}>
              <div className="bg-green-100 p-3 rounded-full text-green-600">
                <FaPhone className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Telepon</h3>
                <p className="text-gray-600">(024) 7606679</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div className="space-y-6" variants={container}>
            <motion.div className="flex items-start" variants={item}>
              <div className="bg-purple-100 p-3 rounded-full text-purple-600">
                <FaMapMarkerAlt className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Alamat</h3>
                <p className="text-gray-600">
                  Jl. Pamularsih Raya No.20, Bongsari,<br />
                  Kec. Semarang Barat, Kota Semarang,<br />
                  Jawa Tengah
                </p>
              </div>
            </motion.div>

            <motion.div className="flex items-start" variants={item}>
              <div className="bg-pink-100 p-3 rounded-full text-pink-600">
                <FaInstagram className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Instagram</h3>
                <a 
                  href="https://www.instagram.com/disporakotasemarang" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  @disporakotasemarang
                </a>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Kontak;
