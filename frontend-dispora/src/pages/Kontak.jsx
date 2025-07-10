import React, { useEffect, useState, Suspense } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Lazy load the Map component to avoid SSR issues
const Map = React.lazy(() => import('../components/Map'));

// Fallback component while the map is loading
const MapFallback = () => (
  <div className="h-80 w-full bg-gray-100 flex items-center justify-center rounded-lg">
    <p className="text-gray-500">Memuat peta...</p>
  </div>
);

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

// Office location data
const officeLocation = {
  lat: -6.9667,
  lng: 110.4167,
  name: "Kantor DISPORA Kota Semarang",
  address: "Jl. Pemuda No. 1, Sekayu, Kec. Semarang Tengah, Kota Semarang, Jawa Tengah 50132",
  phone: "(024) 1234567",
  email: "disporakotasemarang@gmail.com"
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
      <div className="max-w-6xl mx-auto">
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
            Kami siap membantu Anda untuk mengembangkan potensi pemuda melalui berbagai program dan kegiatan yang bermanfaat.
          </motion.p>
        </motion.div>
        
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Information */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="bg-white p-8 rounded-lg shadow-md"
          >
            <motion.h2 
              className="text-2xl font-bold text-navy mb-6"
              variants={item}
            >
              Informasi Kontak
            </motion.h2>
            
            <motion.div 
              className="space-y-6"
              variants={container}
            >
              <motion.div 
                className="flex items-start space-x-4"
                variants={item}
              >
                <div className="bg-blue-100 p-3 rounded-full">
                  <FaMapMarkerAlt className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Alamat</h3>
                  <p className="text-gray-600">{officeLocation.address}</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start space-x-4"
                variants={item}
              >
                <div className="bg-green-100 p-3 rounded-full">
                  <FaPhone className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Telepon</h3>
                  <p className="text-gray-600">{officeLocation.phone}</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start space-x-4"
                variants={item}
              >
                <div className="bg-yellow-100 p-3 rounded-full">
                  <FaEnvelope className="text-yellow-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Email</h3>
                  <a 
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${officeLocation.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {officeLocation.email}
                  </a>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start space-x-4"
                variants={item}
              >
                <div className="bg-purple-100 p-3 rounded-full">
                  <FaInstagram className="text-purple-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Media Sosial</h3>
                  <div className="flex space-x-4 mt-2">
                    <a 
                      href="https://www.instagram.com/disporakotasemarang/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      @disporakotasemarang
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Map Section */}
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-navy mb-6">Lokasi Kami</h2>
            <div className="h-80 w-full rounded-lg overflow-hidden">
              <Suspense fallback={<MapFallback />}>
                <Map 
                  center={[officeLocation.lat, officeLocation.lng]} 
                  zoom={15}
                  officeLocation={officeLocation}
                />
              </Suspense>
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center">
              Klik pada marker untuk melihat detail lokasi
            </p>
          </motion.div>
        </div>


      </div>
    </motion.div>
  );
};

export default Kontak;
