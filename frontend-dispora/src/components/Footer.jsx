import React from "react";

import { FaInstagram, FaFacebookF, FaYoutube } from 'react-icons/fa';
import { SiX } from 'react-icons/si';

const socialLinks = [
  { icon: <FaInstagram />, href: "https://www.instagram.com/disporakotasemarang/" },
  { icon: <FaYoutube />, href: "https://www.youtube.com/@disporakotasemarang8427" },
  { icon: <FaFacebookF />, href: "https://www.facebook.com/dispora.kotasemarang.9" },
  { icon: <SiX />, href: "https://x.com/disporasemarang" },
];

export default function Footer() {
  return (
    <footer className="bg-[#152a4e] text-white py-8" id="kontak">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <h4 className="font-bold text-lg mb-1">DISPORA Kota Semarang</h4>
          <p className="text-sm">Jl. Pamularsih Raya No.20, Bongsari, Kec. Semarang Barat, Kota Semarang, Jawa Tengah</p>
          <p className="text-sm">Telp: (024) 7606679 | Email: <a href="https://mail.google.com/mail/?view=cm&fs=1&to=disporakotasemarang@gmail.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-400">disporakotasemarang@gmail.com</a></p>
        </div>
        <div className="flex gap-4 mt-2 md:mt-0">
          {socialLinks.map((item, idx) => (
            <a key={idx} href={item.href} target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-400 text-2xl transition-colors duration-200">
              {item.icon}
            </a>
          ))}
        </div>
      </div>
      <div className="text-center mt-4 text-xs text-gray-200">&copy; {new Date().getFullYear()} DISPORA Kota Semarang. All rights reserved.</div>
    </footer>
  );
}
