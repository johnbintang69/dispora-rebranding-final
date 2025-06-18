import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaSearch, FaSchool, FaMapMarkerAlt } from 'react-icons/fa';

// Fix for default marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// School images from assets
const sampleImages = [
  '/src/assets/sdn-cangkiran-01.jpg',
  '/src/assets/sdn-cangkiran-02.jpg',
  '/src/assets/sdn-jatibarang-03.jpg',
  '/src/assets/sdn-karangmalang.jpg',
  '/src/assets/sdn-cangkiran-01.jpg' // Using the first image as fallback for the fifth school
];

const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * sampleImages.length);
  return sampleImages[randomIndex];
};

const schoolData = [
  {
    id: 1,
    name: "SDN Cangkiran 01",
    lat: -7.033221,
    lng: 110.288345,
    sarana: "Lapangan Bola Volley, Ruang Kelas, Perpustakaan",
    status: "Negeri",
    jenjang: "SD",
    alamat: "Jl. Cangkiran Raya No. 45, Semarang",
    telepon: "(024) 1234567",
    email: "sdncangkiran01@disdik.semarangkota.go.id",
    gambar: getRandomImage(),
    fasilitas: ["Lapangan Bola Volley", "Ruang Kelas Ber-AC", "Perpustakaan", "Lab Komputer"],
    prestasi: ["Juara 1 Lomba Pramuka Tingkat Kecamatan 2023", "Sekolah Adiwiyata Tingkat Kota 2022"],
    ekstrakurikuler: ["Pramuka", "Pencak Silat", "Seni Tari", "Drumband"]
  },
  {
    id: 2,
    name: "SDN Cangkiran 02",
    lat: -7.033800,
    lng: 110.287900,
    sarana: "Lapangan Atletik, Laboratorium IPA, Ruang Multimedia",
    status: "Swasta",
    jenjang: "SD",
    alamat: "Jl. Cangkiran Raya No. 78, Semarang",
    telepon: "(024) 1234568",
    email: "sdncangkiran02@disdik.semarangkota.go.id",
    gambar: getRandomImage(),
    fasilitas: ["Lapangan Atletik", "Laboratorium IPA", "Ruang Multimedia", "Mushola"],
    prestasi: ["Juara 2 OSN Matematika Tingkat Kota 2023", "Sekolah Ramah Anak 2022"],
    ekstrakurikuler: ["Futsal", "Basket", "Tari Tradisional", "Paskibra"]
  },
  {
    id: 3,
    name: "SDN Jatibarang 03",
    lat: -7.002900,
    lng: 110.323500,
    sarana: "Lapangan Basket, Ruang UKS, Ruang Komputer",
    status: "Negeri",
    jenjang: "SD",
    alamat: "Jl. Jatibarang Raya No. 15, Semarang",
    telepon: "(024) 1234569",
    email: "sdnjatibarang03@disdik.semarangkota.go.id",
    gambar: getRandomImage(),
    fasilitas: ["Lapangan Basket", "Ruang UKS", "Ruang Komputer", "Kantin Sehat"],
    prestasi: ["Juara 1 Lomba Cerdas Cermat Tingkat Kecamatan 2023"],
    ekstrakurikuler: ["Basket", "Pencak Silat", "Seni Lukis", "Bahasa Inggris"]
  },
  {
    id: 4,
    name: "SDN Karangmalang",
    lat: -7.036777,
    lng: 110.349220,
    sarana: "Lapangan Sepak Bola, Aula Serbaguna, Ruang Musik",
    status: "Negeri",
    jenjang: "SD",
    alamat: "Jl. Karangmalang Raya No. 22, Semarang",
    telepon: "(024) 1234570",
    email: "sdnkarangmalang@disdik.semarangkota.go.id",
    gambar: getRandomImage(),
    fasilitas: ["Lapangan Sepak Bola", "Aula Serbaguna", "Ruang Musik", "Taman Baca"],
    prestasi: ["Juara 1 Sepak Bola Tingkat Kota 2023", "Sekolah Adiwiyata 2022"],
    ekstrakurikuler: ["Sepak Bola", "Karate", "Angklung", "Tari Tradisional"]
  },
  {
    id: 5,
    name: "SDN Jatisri",
    lat: -7.025600,
    lng: 110.330400,
    sarana: "Lapangan Volley, Laboratorium Bahasa, Ruang Seni",
    status: "Swasta",
    jenjang: "SD",
    alamat: "Jl. Jatisari Raya No. 10, Semarang",
    telepon: "(024) 1234571",
    email: "sdnjatisri@disdik.semarangkota.go.id",
    gambar: getRandomImage(),
    fasilitas: ["Lapangan Volley", "Laboratorium Bahasa", "Ruang Seni", "Green House"],
    prestasi: ["Juara 1 Lomba Mewarnai Tingkat Kota 2023"],
    ekstrakurikuler: ["Volley", "Tari Modern", "Pecinta Alam", "Bulu Tangkis"]
  },
  {
    id: 6,
    name: "SMPN 1 Semarang",
    lat: -6.992500,
    lng: 110.417800,
    sarana: "Lapangan Basket, Laboratorium Komputer, Ruang Audio Visual",
    status: "Negeri",
    jenjang: "SMP",
    alamat: "Jl. Pemuda No. 149, Semarang",
    telepon: "(024) 1234572",
    email: "smpn1smg@disdik.semarangkota.go.id",
    gambar: getRandomImage(),
    fasilitas: ["Lapangan Basket", "Laboratorium Komputer", "Ruang Audio Visual", "Perpustakaan Digital"],
    prestasi: ["Sekolah Adiwiyata Nasional 2022", "Juara 1 OSN IPA Tingkat Provinsi 2023"],
    ekstrakurikuler: ["Basket", "Futsal", "Robotic", "Karya Ilmiah Remaja"]
  },
  {
    id: 7,
    name: "SMP Islam Semarang",
    lat: -6.998700,
    lng: 110.400300,
    sarana: "Lapangan Atletik, Masjid, Ruang Multimedia",
    status: "Swasta",
    jenjang: "SMP",
    alamat: "Jl. Pahlawan No. 25, Semarang",
    telepon: "(024) 1234573",
    email: "smpislam.smg@yahoo.com",
    gambar: getRandomImage(),
    fasilitas: ["Lapangan Atletik", "Masjid", "Ruang Multimedia", "Laboratorium IPA"],
    prestasi: ["Sekolah Islam Terbaik Tingkat Kota 2023", "Juara 1 MTQ Tingkat Kota 2023"],
    ekstrakurikuler: ["Tahfidz", "Marawis", "Kaligrafi", "Pramuka"]
  },
  {
    id: 8,
    name: "SMPN 2 Semarang",
    lat: -6.988900,
    lng: 110.410500,
    sarana: "Kolam Renang, Laboratorium Bahasa, Ruang Musik",
    status: "Negeri",
    jenjang: "SMP",
    alamat: "Jl. Gajah Mada No. 45, Semarang",
    telepon: "(024) 1234574",
    email: "smpn2smg@disdik.semarangkota.go.id",
    gambar: getRandomImage(),
    fasilitas: ["Kolam Renang", "Laboratorium Bahasa", "Ruang Musik", "Perpustakaan"],
    prestasi: ["Juara 1 Renang Tingkat Provinsi 2023", "Sekolah Adiwiyata 2022"],
    ekstrakurikuler: ["Renang", "Bulu Tangkis", "Band", "Bahasa Jepang"]
  },
  {
    id: 9,
    name: "SDIT Al-Azhar",
    lat: -7.012300,
    lng: 110.425600,
    sarana: "Lapangan Futsal, Laboratorium Komputer, Ruang Tahfidz",
    status: "Swasta",
    jenjang: "SD",
    alamat: "Jl. Sisingamangaraja No. 30, Semarang",
    telepon: "(024) 1234575",
    email: "sditalazhar.smg@gmail.com",
    gambar: getRandomImage(),
    fasilitas: ["Lapangan Futsal", "Laboratorium Komputer", "Ruang Tahfidz", "Perpustakaan Islami"],
    prestasi: ["Juara 1 Tahfidz Tingkat Kota 2023", "Sekolah Islami Terbaik 2022"],
    ekstrakurikuler: ["Tahfidz", "Marawis", "Futsal", "Kaligrafi"]
  },
  {
    id: 10,
    name: "SD Santa Maria",
    lat: -7.005600,
    lng: 110.412300,
    sarana: "Lapangan Basket, Laboratorium IPA, Ruang Seni",
    status: "Swasta",
    jenjang: "SD",
    alamat: "Jl. Pandanaran No. 23, Semarang",
    telepon: "(024) 1234576",
    email: "sdsantamaria.smg@yahoo.com",
    gambar: getRandomImage(),
    fasilitas: ["Lapangan Basket", "Laboratorium IPA", "Ruang Seni", "Kapel"],
    prestasi: ["Juara 1 Lomba Menggambar Tingkat Kota 2023"],
    ekstrakurikuler: ["Paduan Suara", "Tari", "Melukis", "Basket"]
  }
];

const SaranaSekolah = () => {
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [filteredSchools, setFilteredSchools] = useState(schoolData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    jenjang: 'all',
    status: 'all'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const schoolsPerPage = 4;

  // Calculate pagination
  const indexOfLastSchool = currentPage * schoolsPerPage;
  const indexOfFirstSchool = indexOfLastSchool - schoolsPerPage;
  const currentSchools = filteredSchools.slice(indexOfFirstSchool, indexOfLastSchool);
  const totalPages = Math.ceil(filteredSchools.length / schoolsPerPage);

  // Filter schools based on search term and filters
  useEffect(() => {
    let result = [...schoolData];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(school => 
        school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.sarana.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (filters.status !== 'all') {
      result = result.filter(school => school.status === filters.status);
    }
    
    // Apply jenjang filter
    if (filters.jenjang !== 'all') {
      result = result.filter(school => school.jenjang === filters.jenjang);
    }
    
    setFilteredSchools(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const getStatusBadgeClass = (status) => {
    return status === 'Negeri' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-blue-100 text-blue-800';
  };

  const getJenjangBadgeClass = (jenjang) => {
    return jenjang === 'SD' 
      ? 'bg-yellow-100 text-yellow-800' 
      : 'bg-purple-100 text-purple-800';
  };

  return (
    <motion.div 
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-3xl font-bold text-center text-navy mb-8">
        <FaSchool className="inline-block mr-2" />
        Data Persebaran Sarana SD dan SMP di Kota Semarang
      </h1>
      
      {/* Map Section */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="h-96 w-full rounded-lg overflow-hidden">
          <MapContainer 
            center={[-7.0051, 110.4381]} 
            zoom={12} 
            style={{ height: '100%', width: '100%' }}
            className="z-0"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {filteredSchools.map((school) => {
              // Determine marker color based on school status
              const markerColor = school.status === 'Negeri' ? 'red' : 'blue';
              const markerUrl = `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`;
              
              return (
              <Marker 
                key={school.id} 
                position={[school.lat, school.lng]}
                icon={L.icon({
                  iconUrl: markerUrl,
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                })}
              >
              <Popup>
                <div className="font-semibold">{school.name}</div>
                <div className="text-sm">
                  <span className="font-medium">Sarana:</span> {school.sarana}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Status:</span> {school.status}
                </div>
              </Popup>
            </Marker>
              );
            })}
          </MapContainer>
        </div>
        
        {/* Map Legend */}
        <div className="mt-4 flex flex-wrap gap-4 justify-center">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
            <span className="text-sm">Sekolah Negeri</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-sm">Sekolah Swasta</span>
          </div>
        </div>
      </div>
      
      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="w-full md:w-1/3">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari sekolah atau sarana..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jenjang</label>
              <select
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={filters.jenjang}
                onChange={(e) => handleFilterChange('jenjang', e.target.value)}
              >
                <option value="all">Semua Jenjang</option>
                <option value="SD">SD</option>
                <option value="SMP">SMP</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="all">Semua Status</option>
                <option value="Negeri">Negeri</option>
                <option value="Swasta">Swasta</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* School List Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-navy">Daftar Sekolah</h2>
          <div className="text-sm text-gray-500">
            Menampilkan {filteredSchools.length} sekolah
          </div>
        </div>
        
        {/* School Detail Modal */}
        {showDetail && selectedSchool && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <img 
                  src={selectedSchool.gambar} 
                  alt={selectedSchool.name} 
                  className="w-full h-64 object-cover rounded-t-lg"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x400?text=Sekolah+Image';
                  }}
                />
                <button 
                  onClick={() => setShowDetail(false)}
                  className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-navy">{selectedSchool.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        selectedSchool.status === 'Negeri' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {selectedSchool.status}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        selectedSchool.jenjang === 'SD' ? 'bg-yellow-100 text-yellow-800' : 'bg-purple-100 text-purple-800'
                      }`}>
                        {selectedSchool.jenjang}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{selectedSchool.alamat}</p>
                    <p className="text-sm text-gray-600">{selectedSchool.telepon}</p>
                    <p className="text-sm text-blue-600">{selectedSchool.email}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h3 className="text-lg font-semibold text-navy mb-3 pb-2 border-b">Fasilitas Sekolah</h3>
                    <ul className="space-y-2">
                      {selectedSchool.fasilitas.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-navy mb-3 pb-2 border-b">Prestasi</h3>
                    <ul className="space-y-2">
                      {selectedSchool.prestasi.map((item, index) => (
                        <li key={index} className="flex">
                          <span className="text-yellow-500 mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-navy mb-3 pb-2 border-b">Ekstrakurikuler</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSchool.ekstrakurikuler.map((item, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button 
                    onClick={() => setShowDetail(false)}
                    className="px-4 py-2 bg-navy text-white rounded-lg hover:bg-navy/90 transition-colors"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* SD and SMP Tabs */}
        <div className="flex mb-4 border-b">
          <button
            onClick={() => handleFilterChange('jenjang', 'SD')}
            className={`px-4 py-2 font-medium ${
              filters.jenjang === 'SD' 
                ? 'border-b-2 border-yellow-500 text-yellow-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            SD ({filteredSchools.filter(s => s.jenjang === 'SD').length})
          </button>
          <button
            onClick={() => handleFilterChange('jenjang', 'SMP')}
            className={`px-4 py-2 font-medium ${
              filters.jenjang === 'SMP' 
                ? 'border-b-2 border-yellow-500 text-yellow-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            SMP ({filteredSchools.filter(s => s.jenjang === 'SMP').length})
          </button>
          {filters.jenjang !== 'all' && (
            <button
              onClick={() => handleFilterChange('jenjang', 'all')}
              className="ml-auto text-sm text-yellow-600 hover:underline"
            >
              Tampilkan Semua
            </button>
          )}
        </div>
        
        {filteredSchools.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg shadow">
            <FaMapMarkerAlt className="mx-auto text-4xl text-gray-400 mb-2" />
            <p className="text-gray-600">Tidak ada data sekolah yang ditemukan</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {currentSchools.map((school) => (
                <div 
                  key={school.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => {
                    setSelectedSchool(school);
                    setShowDetail(true);
                  }}
                >
                  <div className="h-40 bg-gray-200 relative">
                    <img 
                      src={school.gambar} 
                      alt={school.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x200?text=Sekolah+Image';
                      }}
                    />
                    <div className="absolute bottom-2 left-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full text-white ${
                        school.status === 'Negeri' ? 'bg-red-500' : 'bg-blue-500'
                      }`}>
                        {school.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-navy mb-1 line-clamp-1">{school.name}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {school.sarana}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getJenjangBadgeClass(school.jenjang)}`}>
                        {school.jenjang}
                      </span>
                      <span className="text-xs text-gray-500">
                        {school.alamat?.split(', ').pop() || 'Semarang'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6">
                <nav className="inline-flex rounded-md shadow">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <button
                      key={number}
                      onClick={() => setCurrentPage(number)}
                      className={`px-3 py-2 border-t border-b border-gray-300 text-sm font-medium ${
                        currentPage === number
                          ? 'bg-yellow-400 text-navy border-yellow-400'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {number}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default SaranaSekolah;
