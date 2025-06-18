import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaUsers, FaFutbol, FaLightbulb } from "react-icons/fa";

const programs = [
  {
    icon: <FaGraduationCap className="text-4xl text-gold mb-3" />,
    title: "Program Beasiswa",
    desc: "Dukungan pendidikan untuk pemuda berprestasi dan kurang mampu di Kota Semarang.",
  },
  {
    icon: <FaUsers className="text-4xl text-gold mb-3" />,
    title: "Pelatihan Kepemimpinan",
    desc: "Mengembangkan jiwa kepemimpinan dan soft skill generasi muda melalui pelatihan intensif.",
  },
  {
    icon: <FaFutbol className="text-4xl text-gold mb-3" />,
    title: "Event Olahraga",
    desc: "Beragam kompetisi dan event olahraga untuk mendorong gaya hidup sehat dan sportivitas.",
  },
  {
    icon: <FaLightbulb className="text-4xl text-gold mb-3" />,
    title: "Kreativitas Pemuda",
    desc: "Fasilitasi ruang dan dukungan bagi pemuda untuk berinovasi dan berkarya di berbagai bidang.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
  hover: {
    y: -5,
    transition: { duration: 0.2 }
  }
};

export default function ProgramSection() {
  return (
    <section id="program" className="py-20 bg-white text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-10"
      >
        <h2 className="text-2xl md:text-4xl font-bold text-navy mb-4 font-title">Program Unggulan</h2>
        <p className="max-w-2xl mx-auto text-gray-700 font-body">
          Berbagai program inovatif untuk mendukung pengembangan kepemudaan dan olahraga di kota.
        </p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {programs.map((item, idx) => (
          <motion.div 
            key={idx} 
            className="bg-[#f9fafb] rounded-xl shadow-md p-6 flex flex-col items-center border border-gray-100 hover:shadow-xl transition-all duration-300"
            variants={itemVariants}
            whileHover="hover"
          >
            <motion.div className="text-4xl text-gold mb-4">
              {item.icon}
            </motion.div>
            <h3 className="text-lg font-bold text-navy mb-3 font-title">{item.title}</h3>
            <p className="text-gray-700 font-body text-sm text-center leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
