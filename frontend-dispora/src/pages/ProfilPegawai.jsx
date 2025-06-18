import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserTie } from "react-icons/fa";

// Import semua gambar yang diperlukan
import kepalaDinasImg from "../assets/pegawai/kepala-dinas.jpg";
import sekretarisImg from "../assets/pegawai/sekretaris-dinas.jpg";
import kasub1Img from "../assets/pegawai/kepala-subbagian1.jpg";
import kasub2Img from "../assets/pegawai/kepala-subbagian2.jpg";
import perencanaImg from "../assets/pegawai/perencana-muda.jpg";

// Data untuk setiap struktur
const strukturData = {
  kesekretariatan: {
    name: "Drs. FIRWARTA SADIMAN",
    title: "Kepala Dinas Kepemudaan dan Olahraga",
    photo: kepalaDinasImg,
    children: [
      {
        name: "SUTARNO, SH., M.A.P",
        title: "Sekretaris Dinas Kepemudaan dan Olahraga",
        photo: sekretarisImg,
        children: [
          {
            name: "NAMA KEPALA SUBBAG 1",
            title: "Kepala Sub Bagian Umum & Kepegawaian",
            photo: kasub1Img,
          },
          {
            name: "NAMA KEPALA SUBBAG 2",
            title: "Kepala Subbag Keuangan & BMD",
            photo: kasub2Img,
          },
          {
            name: "NAMA PERENCANA MUDA",
            title: "Koordinator Perencanaan dan Evaluasi",
            photo: perencanaImg,
          },
        ],
      },
    ],
  },
  olahraga: {
    name: "NAMA KEPALA BIDANG",
    title: "Kepala Bidang Pemberdayaan Olahraga",
    photo: kasub1Img,
    children: [
      {
        name: "NAMA KEPALA BIDANG",
        title: "Kepala Bidang Pemberdayaan Olahraga",
        photo: kasub1Img
      }
    ]
  },
  pemuda: {
    name: "NAMA KEPALA BIDANG",
    title: "Kepala Bidang Pemberdayaan Pemuda",
    photo: kasub1Img,
    children: [

          {
            name: "NAMA ANALIS KEBIJAKAN 1",
            title: "Analis Kebijakan 1",
            photo: kasub2Img,
          },
          {
            name: "NAMA ANALIS KEBIJAKAN 2",
            title: "Analis Kebijakan 2",
            photo: kasub2Img,
          }
    ]
  },
  pengembanganPemuda: {
    name: "NAMA KEPALA BIDANG",
    title: "Kepala Bidang Pengembangan Pemuda",
    photo: kasub1Img,
    children: [
          {
            name: "NAMA ANALIS KEBIJAKAN",
            title: "Analis Kebijakan",
            photo: kasub2Img,
          }
    ]
  },
  prestasi: {
    name: "NAMA KEPALA BIDANG",
    title: "Kepala Bidang Pembinaan dan Prestasi Olahraga",
    photo: kasub1Img,
    children: [
          {
            name: "NAMA ANALIS KEBIJAKAN 1",
            title: "Analis Kebijakan 1",
            photo: kasub2Img,
          },
          {
            name: "NAMA ANALIS KEBIJAKAN 2",
            title: "Analis Kebijakan 2",
            photo: kasub2Img,
          }
    ]
  },
  uptd: {
    name: "NAMA KEPALA UPTD",
    title: "Kepala UPTD Gelanggang Olahraga",
    photo: kasub1Img,
    children: [
          // Kepala Subbag
          {
            name: "NAMA KEPALA SUBBAG",
            title: "Kepala Subbag UPTD",
            photo: kasub2Img,
            children: Array.from({ length: 13 }, (_, i) => ({
              name: `NAMA STAF ${i + 1}`,
              title: `Staf UPTD ${i + 1}`,
              photo: kasub2Img,
            }))
          }
    ]
  },
};

const UPTDStafPagination = ({ staffs }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4; // Jumlah staf per halaman
  const totalPages = Math.ceil(staffs.length / itemsPerPage);

  const currentStaffs = staffs.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-wrap justify-center gap-4 mb-4 w-full">
        {currentStaffs.map((staff, idx) => (
          <div key={idx} className="flex-shrink-0">
            <OrgNode {...staff} isGroup={false} />
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="px-3 py-1 bg-gray-100 rounded-md disabled:opacity-50"
          >
            &larr; Sebelumnya
          </button>
          <span className="px-3 py-1">
            Halaman {currentPage + 1} dari {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage === totalPages - 1}
            className="px-3 py-1 bg-gray-100 rounded-md disabled:opacity-50"
          >
            Selanjutnya &rarr;
          </button>
        </div>
      )}
    </div>
  );
};

const OrgNode = React.memo(({ name, title, photo, children, isGroup = false, isUPTD = false, isStaff = false }) => {
  return (
    <motion.div 
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className={`bg-white rounded-xl shadow-lg px-6 py-4 mb-2 border border-gray-100 flex flex-col items-center ${
          isGroup ? 'min-w-[180px] max-w-[180px]' : 'min-w-[220px] max-w-xs'
        }`}
        whileHover={{ 
          scale: isGroup ? 1 : 1.03, 
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' 
        }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {!isGroup && photo ? (
          <motion.img
            src={photo}
            alt={name}
            className="w-20 h-20 object-cover rounded-full border-4 border-gold shadow mb-2 bg-gray-100"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
          />
        ) : (
          <div className="w-20 h-20 flex items-center justify-center rounded-full border-4 border-gray-200 shadow mb-2 bg-gray-50">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        )}
        <motion.span 
          className={`font-bold text-navy font-body text-center leading-tight ${
            isGroup ? 'text-sm' : 'text-base mb-1'
          }`}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {name}
        </motion.span>
        {title && (
          <motion.span 
            className="text-xs text-gray-600 font-body text-center leading-tight"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {title}
          </motion.span>
        )}
      </motion.div>
      {children && children.length > 0 && (
        <motion.div 
          className="flex flex-col items-center w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="h-4 w-0.5 bg-gray-300" />
          {children[0]?.title?.includes('Staf UPTD') ? (
            <div className="w-full">
              <UPTDStafPagination staffs={children} />
            </div>
          ) : (
            <div className="flex flex-row flex-wrap justify-center items-start gap-4 mt-0 px-4 w-full">
              {children.map((child, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-0.5 bg-gray-300 mb-0" />
                    <OrgNode 
                      {...child} 
                      isGroup={!child.photo} 
                      isUPTD={isUPTD}
                      isStaff={child.title?.includes('Staf UPTD')}
                    />
                  </div>
                </React.Fragment>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
});

// Komponen Dropdown
function DropdownMenu({ activeTab, setActiveTab }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);

  // Daftar menu
  const menuItems = [
    { id: "kesekretariatan", label: "Kepala Dinas & Sekretariat" },
    { id: "olahraga", label: "Bidang Pemberdayaan Olahraga" },
    { id: "pemuda", label: "Bidang Pemberdayaan Pemuda" },
    { id: "pengembanganPemuda", label: "Bidang Pengembangan Pemuda" },
    { id: "prestasi", label: "Bidang Pembinaan dan Prestasi Olahraga" },
    { id: "uptd", label: "UPTD Gelanggang Olahraga" },
  ];

  // Dapatkan label menu yang aktif
  const activeLabel = menuItems.find(item => item.id === activeTab)?.label || "Pilih Struktur";

  // Handle click di luar dropdown
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <motion.div 
      className="relative mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <motion.div 
        className="relative w-full max-w-xs mx-auto mb-6" 
        ref={dropdownRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold transition-all duration-200"
        >
          <span className="truncate">{activeLabel}</span>
          <motion.svg 
            className="w-5 h-5 ml-2 -mr-1 text-gray-500" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </motion.svg>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="py-1" role="menu" aria-orientation="vertical">
                {menuItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-3 text-sm ${activeTab === item.id ? 'bg-yellow-50 text-gold' : 'text-gray-700 hover:bg-gray-50'} transition-colors duration-200`}
                    role="menuitem"
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default function ProfilPegawai() {
  const [activeTab, setActiveTab] = useState("kesekretariatan");
  const [isMounted, setIsMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleTabChange = (newTab) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setActiveTab(newTab);
      setTimeout(() => setIsAnimating(false), 100);
    }, 200);
  };

  return (
    <section className="py-8 px-4 md:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FaUserTie className="text-gold text-3xl md:text-4xl mb-1 drop-shadow" />
            <motion.h1 
              className="text-2xl md:text-4xl font-bold text-navy font-title text-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Profil Pegawai
            </motion.h1>
          </motion.div>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-gold to-yellow-300 mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.div> 
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <DropdownMenu activeTab={activeTab} setActiveTab={handleTabChange} />
        </motion.div>

        {/* Current Selection Indicator */}
        <motion.div 
          className="text-center mb-6"
          key={`indicator-${activeTab}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="inline-block px-3 py-1 text-sm font-medium text-gold bg-gold/10 rounded-full">
            {activeTab === 'kesekretariatan' && 'Kepala Dinas & Sekretariat'}
            {activeTab === 'olahraga' && 'Bidang Pemberdayaan Olahraga'}
            {activeTab === 'pemuda' && 'Bidang Pemberdayaan Pemuda'}
            {activeTab === 'pengembanganPemuda' && 'Bidang Pengembangan Pemuda'}
            {activeTab === 'prestasi' && 'Bidang Pembinaan dan Prestasi Olahraga'}
            {activeTab === 'uptd' && 'UPTD Gelanggang Olahraga'}
          </span>
        </motion.div>

        {/* Content */}
        <div className="relative pb-8 w-full min-h-[400px] bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center w-full"
              >
                <OrgNode 
                  {...strukturData[activeTab]} 
                  isUPTD={activeTab === 'uptd'} 
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
