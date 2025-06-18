import React from "react";
import { motion } from "framer-motion";

// Import images from assets/galery
import gallery1 from "../assets/galery/1735507912.jpg";
import gallery2 from "../assets/galery/1735508673.jpg";
import gallery3 from "../assets/galery/1735508863.jpg";
import gallery4 from "../assets/galery/2929533240.jpg";
import gallery5 from "../assets/galery/829044393.jpg";
import gallery6 from "../assets/galery/turnamen-futsal1.jpg";

const images = [
  { src: gallery1, alt: "Kegiatan 1" },
  { src: gallery2, alt: "Kegiatan 2" },
  { src: gallery3, alt: "Kegiatan 3" },
  { src: gallery4, alt: "Kegiatan 4" },
  { src: gallery5, alt: "Kegiatan 5" },
  { src: gallery6, alt: "Turnamen Futsal" },
];

export default function GallerySection() {
  return (
    <section id="galeri" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-navy text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          Galeri Kegiatan
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((src, idx) => (
            <motion.div
              key={src}
              className="overflow-hidden rounded-lg shadow-md"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <img 
                src={src.src} 
                alt={src.alt} 
                className="w-full h-48 md:h-56 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer" 
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
