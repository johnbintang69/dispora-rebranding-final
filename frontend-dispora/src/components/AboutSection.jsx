import React from "react";
import { motion } from "framer-motion";
import { FaRegStar, FaCog } from "react-icons/fa";

const VISI = {
  icon: "/assets/vision.svg",
  title: "Visi",
  desc: "Terwujudnya Kota Semarang yang Semakin Hebat berlandaskan Pancasila dalam Bingkai NKRI Yang Ber-Bhineka Tunggal Ika."
};

const MISI = {
  icon: "/assets/mission.svg",
  title: "Misi",
  desc: [
    "Meningkatkan kualitas & kapasitas sumber daya manusia yang unggul dan produktif untuk mencapai kesejahteraan & keadilan sosial.",
    "Meningkatkan potensi ekonomi lokal yang berdaya saing dan stimulasi pembangunan industri, berlandaskan riset & inovasi berdasar prinsip demokrasi ekonomi Pancasila.",
    "Menjamin kemerdekaan masyarakat menjalankan ibadah, pemenuhan hak dasar & perlindungan kesejahteraan sosial serta hak asasi manusia bagi masyarakat secara berkeadilan.",
    "Mewujudkan infrastruktur berkualitas yang berwawasan lingkungan untuk mendukung kemajuan kota.",
    "Menjalankan reformasi birokrasi pemerintahan secara dinamis & menyusun produk hukum yang sesuai nilai-nilai Pancasila dalam kerangka Negara Kesatuan Republik Indonesia."
  ]
};

export default function AboutSection() {
  return (
    <section id="profil" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-navy text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          Visi & Misi DISPORA
        </motion.h2>
        <div className="flex flex-col gap-8 justify-center items-center">
          {/* VISI */}
          <motion.div
            className="bg-[#f9fafb] text-navy rounded-xl shadow-md p-8 flex flex-col items-center max-w-xl w-full border border-gray-100"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <FaRegStar className="text-gold text-5xl mb-3" />
            <h3 className="text-2xl font-bold mb-4 text-gold tracking-wide uppercase">{VISI.title}</h3>
            <p className="text-center text-base leading-relaxed text-gray-800">{VISI.desc}</p>
          </motion.div>
          {/* MISI */}
          <motion.div
            className="bg-[#fff7e6] text-navy rounded-xl shadow-md p-8 flex flex-col items-center max-w-xl w-full border border-yellow-100"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            viewport={{ once: true }}
          >
            <FaCog className="text-gold text-5xl mb-3" />
            <h3 className="text-2xl font-bold mb-4 text-gold tracking-wide uppercase">{MISI.title}</h3>
            <ul className="list-disc list-inside text-left text-base leading-relaxed text-gray-800 space-y-3 pl-2">
              {MISI.desc.map((misi, idx) => (
                <li key={idx}>{misi}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
