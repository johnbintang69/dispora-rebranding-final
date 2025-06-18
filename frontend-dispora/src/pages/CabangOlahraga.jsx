import React from 'react';
import { motion } from 'framer-motion';
import { FaVolleyballBall, FaFutbol, FaBasketballBall, FaTableTennis, FaSwimmer, FaRunning, FaUserNinja } from 'react-icons/fa';
import { GiBoxingGlove, GiArcheryTarget, GiWeightLiftingUp, GiSwordWound } from 'react-icons/gi';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const sportsData = [
  {
    id: 1,
    name: 'Sepak Bola',
    icon: <FaFutbol className="text-4xl text-green-600" />,
    description: 'Olahraga tim yang dimainkan antara dua tim yang masing-masing beranggotakan 11 orang pemain.',
    atlet: '12.500',
    klub: '320',
    prestasi: 'Juara 1 Piala Gubernur 2023',
  },
  {
    id: 2,
    name: 'Bola Voli',
    icon: <FaVolleyballBall className="text-4xl text-orange-500" />,
    description: 'Permainan olahraga yang dimainkan oleh dua grup berlawanan dengan memukul bola voli melewati net.',
    atlet: '8.750',
    klub: '210',
    prestasi: 'Juara 2 Kejurnas 2023',
  },
  {
    id: 3,
    name: 'Bola Basket',
    icon: <FaBasketballBall className="text-4xl text-orange-700" />,
    description: 'Olahraga bola berkelompok yang terdiri atas dua tim beranggotakan masing-masing lima orang.',
    atlet: '6.300',
    klub: '180',
    prestasi: 'Juara 3 IBL 2023',
  },
  {
    id: 4,
    name: 'Renang',
    icon: <FaSwimmer className="text-4xl text-blue-500" />,
    description: 'Olahraga yang melombakan kecepatan atlet renang dalam berenang.',
    atlet: '5.200',
    klub: '95',
    prestasi: '5 Emas PON 2022',
  },
  {
    id: 5,
    name: 'Atletik',
    icon: <FaRunning className="text-4xl text-gray-700" />,
    description: 'Cabang olahraga yang terdiri dari nomor lari, lempar, lompat, dan jalan.',
    atlet: '9.100',
    klub: '150',
    prestasi: '3 Emas Kejurnas 2023',
  },
  {
    id: 6,
    name: 'Taekwondo',
    icon: <FaUserNinja className="text-4xl text-gray-600" />,
    description: 'Seni bela diri asal Korea yang juga menjadi olahraga nasional Korea.',
    atlet: '3.800',
    klub: '120',
    prestasi: '2 Emas PON 2022',
  },
  {
    id: 7,
    name: 'Tinju',
    icon: <GiBoxingGlove className="text-4xl text-red-700" />,
    description: 'Olahraga dan seni bela diri yang menampilkan dua orang partisipan dengan berat yang serupa.',
    atlet: '2.900',
    klub: '85',
    prestasi: 'Juara 1 Kejurnas 2023',
  },
  {
    id: 8,
    name: 'Anggar',
    icon: <GiSwordWound className="text-4xl text-gray-500" />,
    description: 'Olahraga yang menggunakan senjata tajam seperti pedang, sabet, dan floret.',
    atlet: '1.500',
    klub: '60',
    prestasi: 'Perak SEA Games 2023',
  },
  {
    id: 9,
    name: 'Panahan',
    icon: <GiArcheryTarget className="text-4xl text-yellow-600" />,
    description: 'Olahraga yang menggunakan busur panah untuk menembakkan anak panah.',
    atlet: '2.100',
    klub: '75',
    prestasi: 'Perunggu Kejurnas 2023',
  },
  {
    id: 10,
    name: 'Angkat Besi',
    icon: <GiWeightLiftingUp className="text-4xl text-blue-700" />,
    description: 'Olahraga yang bertujuan mengangkat beban berat yang disebut dengan barbel.',
    atlet: '1.800',
    klub: '65',
    prestasi: 'Emas PON 2022',
  },
];

const CabangOlahraga = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        className="text-3xl font-bold text-center text-navy mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Daftar Cabang Olahraga di Kota Semarang
      </motion.h1>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {sportsData.map((sport) => (
          <motion.div 
            key={sport.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-navy">{sport.name}</h2>
                <div className="p-2 bg-gray-100 rounded-full">
                  {sport.icon}
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{sport.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <p className="font-medium">Jumlah Atlet</p>
                  <p className="text-blue-600 font-semibold">{sport.atlet}</p>
                </div>
                <div>
                  <p className="font-medium">Klub Terdaftar</p>
                  <p className="text-blue-600 font-semibold">{sport.klub}</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">Prestasi Terbaru</p>
                <p className="text-yellow-600 font-medium">{sport.prestasi}</p>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-3 text-right">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Lihat Detail →
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div 
        className="mt-8 bg-blue-50 rounded-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h2 className="text-xl font-bold text-navy mb-4">Tentang Cabang Olahraga</h2>
        <p className="text-gray-700 mb-4">
          Dinas Pemuda dan Olahraga Kota Semarang terus berkomitmen untuk mengembangkan berbagai cabang olahraga 
          di wilayahnya. Dengan dukungan fasilitas yang memadai dan pembinaan atlet yang berkelanjutan, 
          kami berupaya mencetak prestasi di berbagai ajang olahraga baik tingkat regional, nasional, 
          maupun internasional.
        </p>
        <p className="text-gray-700">
          Untuk informasi lebih lanjut mengenai program pembinaan atau pendaftaran klub olahraga, 
          silakan menghubungi Dinas Pemuda dan Olahraga Kota Semarang.
        </p>
      </motion.div>
    </div>
  );
};

export default CabangOlahraga;
