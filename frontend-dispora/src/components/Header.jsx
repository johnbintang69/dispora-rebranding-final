import React from "react";

const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Profil", dropdown: [
    { label: "Maklumat Pelayanan", href: "/maklumat" },
    { label: "Struktur Organisasi", href: "/struktur-organisasi" },
    { label: "Profil Pegawai", href: "/profil-pegawai" },
    { label: "Profil Komunitas", href: "/profil-komunitas" },
  ] },
  { label: "Layanan", dropdown: [
    { label: "Estripora", href: "https://estripora.semarangkota.go.id/" },
    { label: "Sarana Sekolah", href: "/sarana-sekolah" },
    { label: "Sarana Estripora", href: "/sarana-estripora" },
    { label: "Cabang Olahraga", href: "/cabang-olahraga" },
  ] },
  { label: "Berita", href: "/berita" },
  { label: "PPID", dropdown: [
    { label: "Dasar Hukum", href: "/dasar-hukum" },
    { label: "Informasi Publik Berkala", href: "/informasi-publik-berkala" },
    { label: "Informasi Publik Setiap Saat", href: "/informasi-publik-setiap-saat" },
    { label: "Informasi Publik Serta Merta", href: "/informasi-publik-serta-merta" },
    { label: "Informasi Publik Dikecualikan", href: "/informasi-publik-dikecualikan" },
  ] },

  { label: "Kontak", href: "/kontak" },
];

import logoDispora from '../assets/logo-dispora.png';
import { Link, useLocation } from 'react-router-dom';
import { useLoading } from '../context/LoadingContext';

export default function Header() {
  return (
    <header className="bg-[#152a4e] text-white shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center py-4 px-4 md:px-0">
        <Link to="/" className="flex items-center gap-2 group focus:outline-none" style={{ textDecoration: 'none' }}>
          <img src={logoDispora} alt="Logo DISPORA" className="h-10 w-10 object-contain drop-shadow-lg" />
          <span className="flex flex-col">
            <span className="font-bold text-lg tracking-wide leading-tight">DISPORA Kota Semarang</span>
            <span className="text-xs text-gray-200 group-hover:text-yellow-300 leading-none">Dinas Kepemudaan dan Olahraga</span>
          </span>
        </Link>
        <ul className="hidden md:flex gap-8 font-semibold">
          {navItems.map((item) => (
  <li key={item.label} className="relative group">
    {item.dropdown ? (
      <>
        <button
          className="hover:text-yellow-400 text-white transition-colors duration-200 focus:outline-none flex items-center gap-1"
        >
          {item.label}
          <svg className="w-3 h-3 ml-1 text-white group-hover:text-yellow-400 transition-colors duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className={`absolute top-full mt-2 w-52 bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-200 z-50 text-navy ${item.label === 'PPID' ? 'right-0' : 'left-0'}`}>
          {item.dropdown.map((sub, idx) => (
            <Link
              key={sub.label}
              to={sub.href}
              className="block px-4 py-2 bg-white font-semibold text-[#152a4e] hover:bg-yellow-100 hover:text-yellow-700 transition-colors duration-150 text-sm"
            >
              {sub.label}
            </Link>
          ))}
        </div>
      </>
    ) : item.label === "Beranda" ? (
      <Link to="/" className="hover:text-yellow-400 text-white transition-colors duration-200" onClick={() => {
        const { setLoading } = require('../context/LoadingContext');
        setLoading && setLoading(true);
      }}>{item.label}</Link>
    ) : item.label === "Berita" ? (
      <Link to="/berita" className="hover:text-yellow-400 text-white transition-colors duration-200" onClick={() => {
        const { setLoading } = require('../context/LoadingContext');
        setLoading && setLoading(true);
      }}>{item.label}</Link>
    ) : (
      <Link 
        to={item.href} 
        className="hover:text-yellow-400 text-white transition-colors duration-200"
        onClick={() => {
          const { setLoading } = require('../context/LoadingContext');
          setLoading && setLoading(true);
        }}
      >
        {item.label}
      </Link>
    )}
  </li>
))}
        </ul>
        {/* Mobile menu placeholder, can add hamburger menu if needed */}
      </nav>
    </header>
  );
}
