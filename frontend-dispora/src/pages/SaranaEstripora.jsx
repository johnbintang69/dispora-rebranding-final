import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaSearch, FaDumbbell, FaMapMarkerAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Fix for default marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Sample images for sports facilities
const sampleImages = [
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
];

const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * sampleImages.length);
  return sampleImages[randomIndex];
};

const saranaOlahragaData = [
  {
    id: 3,
    name: "Manunggal Jati",
    lat: -7.012407294716581,
    lng: 110.48296183967364,
    sarana: "Lapangan Bola, Lapangan Bulu Tangkis, Ruang Istirahat",
    status: "Umum",
    jenjang: "Outdoor",
    alamat: "Jl. Manunggal Jati, Semarang",
    telepon: "(024) 1234567",
    email: "manunggaljati@semarangkota.go.id",
    gambar: getRandomImage(),
    fasilitas: ["Lapangan Bola", "Lapangan Bulu Tangkis", "Ruang Istirahat", "Parkir Luas"],
    prestasi: ["Venue Kejuaraan Bola Tingkat Kota 2023", "Sarana Olahraga Terbaik 2022"],
    cabangOlahraga: ["Bola", "Bulu Tangkis", "Volley"]
  },
  {
    id: 4,
    name: "Lapangan Sidodadi",
    lat: -6.990034883026128,
    lng: 110.43760089739997,
    sarana: "Lapangan Bola, Lapangan Bola Voli, Ruang Istirahat",
    status: "Umum",
    jenjang: "Outdoor",
    alamat: "Jl. Sidodadi, Semarang",
    telepon: "(024) 1234568",
    email: "sidodadi@semarangkota.go.id",
    gambar: getRandomImage(),
    fasilitas: ["Lapangan Bola", "Lapangan Bola Voli", "Ruang Istirahat", "Parkir Luas"],
    prestasi: ["Venue Kejuaraan Bola Voli Tingkat Kota 2023", "Sarana Olahraga Terbaik 2022"],
    cabangOlahraga: ["Bola", "Bola Voli", "Volley"]
  },
  {
    id: 5,
    name: "Tri Lomba Juang",
    lat: -6.990045551899261,
    lng: 110.41882343058414,
    sarana: "Lapangan Basket, Lapangan Bulu Tangkis, Tribun, AC",
    status: "Umum",
    jenjang: "Indoor",
    alamat: "Jl. Menteri Supeno No. 2, Semarang",
    telepon: "(024) 1234569",
    email: "trilombajuang@semarangkota.go.id",
    gambar: getRandomImage(),
    fasilitas: ["Lapangan Basket", "Lapangan Bulu Tangkis", "Tribun", "AC"],
    prestasi: ["Venue Kejuaraan Basket Tingkat Kota 2023", "Sarana Olahraga Terbaik 2022"],
    cabangOlahraga: ["Basket", "Bulu Tangkis", "Volley"]
  },
  {
    id: 6,
    name: "Gelanggang Pemuda Manunggal",
    lat: -7.013261477099197,
    lng: 110.48215139370126,
    sarana: "Lapangan Bola, Lapangan Bola Voli, Ruang Istirahat",
    status: "Umum",
    jenjang: "Outdoor",
    alamat: "Jl. Manunggal, Semarang",
    telepon: "(024) 1234570",
    email: "manunggal@semarangkota.go.id",
    gambar: getRandomImage(),
    fasilitas: ["Lapangan Bola", "Lapangan Bola Voli", "Ruang Istirahat", "Parkir Luas"],
    prestasi: ["Venue Kejuaraan Bola Voli Tingkat Kota 2023", "Sarana Olahraga Terbaik 2022"],
    cabangOlahraga: ["Bola", "Bola Voli", "Volley"]
  },
  {
    id: 7,
    name: "Lapangan Tambora",
    lat: -7.003052887912822,
    lng: 110.41930016431881,
    sarana: "Lapangan Bola, Lapangan Bola Voli, Ruang Istirahat",
    status: "Umum",
    jenjang: "Outdoor",
    alamat: "Jl. Tambora, Semarang",
    telepon: "(024) 1234571",
    email: "tambora@semarangkota.go.id",
    gambar: getRandomImage(),
    fasilitas: ["Lapangan Bola", "Lapangan Bola Voli", "Ruang Istirahat", "Parkir Luas"],
    prestasi: ["Venue Kejuaraan Bola Voli Tingkat Kota 2023", "Sarana Olahraga Terbaik 2022"],
    cabangOlahraga: ["Bola", "Bola Voli", "Volley"]
  },
  {
    id: 8,
    name: "Sirkuit Mijen",
    lat: -7.075775445239123,
    lng: 110.30646532014117,
    sarana: "Sirkuit Motor, Lapangan Bola, Ruang Istirahat",
    status: "Umum",
    jenjang: "Outdoor",
    alamat: "Jl. Mijen, Semarang",
    telepon: "(024) 1234572",
    email: "sirkuitmijen@semarangkota.go.id",
    gambar: getRandomImage(),
    fasilitas: ["Sirkuit Motor", "Lapangan Bola", "Ruang Istirahat", "Parkir Luas"],
    prestasi: ["Venue Kejuaraan Motor Tingkat Kota 2023", "Sarana Olahraga Terbaik 2022"],
    cabangOlahraga: ["Motocross", "Bola", "Volley"]
  },
  {
    id: 9,
    name: "Gedung Serba Guna",
    lat: -7.020726229929796,
    lng: 110.39837691780022,
    sarana: "Lapangan Basket, Lapangan Bulu Tangkis, Ruang Istirahat",
    status: "Umum",
    jenjang: "Indoor",
    alamat: "Jl. Serba Guna, Semarang",
    telepon: "(024) 1234573",
    email: "serbaguna@semarangkota.go.id",
    gambar: getRandomImage(),
    fasilitas: ["Lapangan Basket", "Lapangan Bulu Tangkis", "Ruang Istirahat", "AC"],
    prestasi: ["Venue Kejuaraan Basket Tingkat Kota 2023", "Sarana Olahraga Terbaik 2022"],
    cabangOlahraga: ["Basket", "Bulu Tangkis", "Volley"]
  },
  {
    id: 10,
    name: "Lapangan Citarum",
    lat: -6.971088374969078,
    lng: 110.43944287226306,
    sarana: "Lapangan Bola, Lapangan Bola Voli, Ruang Istirahat",
    status: "Umum",
    jenjang: "Outdoor",
    alamat: "Jl. Citarum, Semarang",
    telepon: "(024) 1234574",
    email: "citarum@semarangkota.go.id",
    gambar: getRandomImage(),
    fasilitas: ["Lapangan Bola", "Lapangan Bola Voli", "Ruang Istirahat", "Parkir Luas"],
    prestasi: ["Venue Kejuaraan Bola Voli Tingkat Kota 2023", "Sarana Olahraga Terbaik 2022"],
    cabangOlahraga: ["Bola", "Bola Voli", "Volley"]
  }
];

const SaranaEstripora = () => {
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [filteredFacilities, setFilteredFacilities] = useState(saranaOlahragaData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    jenjang: 'all'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const facilitiesPerPage = 4;

  // Calculate pagination
  const indexOfLastFacility = currentPage * facilitiesPerPage;
  const indexOfFirstFacility = indexOfLastFacility - facilitiesPerPage;
  const currentFacilities = filteredFacilities.slice(indexOfFirstFacility, indexOfLastFacility);
  const totalPages = Math.ceil(filteredFacilities.length / facilitiesPerPage);

  // Filter facilities based on search term and filters
  useEffect(() => {
    let result = [...saranaOlahragaData];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(facility => 
        facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        facility.sarana.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply jenjang filter
    if (filters.jenjang !== 'all') {
      result = result.filter(facility => facility.jenjang === filters.jenjang);
    }
    
    setFilteredFacilities(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const getJenjangBadgeClass = (jenjang) => {
    return jenjang === 'Indoor' 
      ? 'bg-red-100 text-red-800' 
      : 'bg-blue-100 text-blue-800';
  };

  return (
    <motion.div className="container mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}>
      <h1 className="text-3xl font-bold text-center text-navy mb-8">
        <FaDumbbell className="inline-block mr-2" />
        Data Persebaran Sarana Estripora
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
            {filteredFacilities.map((facility) => {
              // Determine marker color based on facility type
              const markerColor = facility.jenjang === 'Indoor' ? 'red' : 'blue';
              const markerUrl = `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`;
              
              return (
                <Marker 
                  key={facility.id} 
                  position={[facility.lat, facility.lng]}
                  icon={L.icon({
                    iconUrl: markerUrl,
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                  })}
                >
                  <Popup>
                    <div className="font-semibold">{facility.name}</div>
                    <div className="text-sm">
                      <span className="font-medium">Sarana:</span> {facility.sarana}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Status:</span> {facility.status}
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
            <span className="text-sm">Indoor</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-sm">Outdoor</span>
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
                placeholder="Cari sarana olahraga..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipe</label>
              <select
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={filters.jenjang}
                onChange={(e) => handleFilterChange('jenjang', e.target.value)}
              >
                <option value="all">Semua Tipe</option>
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Facility List Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-navy">Daftar Fasilitas Olahraga</h2>
          <div className="text-sm text-gray-500">
            Menampilkan {filteredFacilities.length} fasilitas
          </div>
        </div>
        
        {/* Facility Detail Modal */}
        {showDetail && selectedFacility && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <img 
                  src={selectedFacility.gambar} 
                  alt={selectedFacility.name} 
                  className="w-full h-64 object-cover rounded-t-lg"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x400?text=Fasilitas+Olahraga';
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
                    <h2 className="text-2xl font-bold text-navy">{selectedFacility.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        selectedFacility.jenjang === 'Indoor' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {selectedFacility.jenjang}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{selectedFacility.alamat}</p>
                    <p className="text-sm text-gray-600">{selectedFacility.telepon}</p>
                    <p className="text-sm text-blue-600">{selectedFacility.email}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h3 className="text-lg font-semibold text-navy mb-3 pb-2 border-b">Fasilitas</h3>
                    <ul className="space-y-2">
                      {selectedFacility.fasilitas.map((item, index) => (
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
                      {selectedFacility.prestasi.map((item, index) => (
                        <li key={index} className="flex">
                          <span className="text-yellow-500 mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-navy mb-3 pb-2 border-b">Cabang Olahraga</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedFacility.cabangOlahraga.map((item, index) => (
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
        
        {/* Indoor and Outdoor Tabs */}
        <div className="flex mb-4 border-b">
          <button
            onClick={() => handleFilterChange('jenjang', 'Indoor')}
            className={`px-4 py-2 font-medium ${
              filters.jenjang === 'Indoor' 
                ? 'border-b-2 border-yellow-500 text-yellow-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Indoor ({filteredFacilities.filter(s => s.jenjang === 'Indoor').length})
          </button>
          <button
            onClick={() => handleFilterChange('jenjang', 'Outdoor')}
            className={`px-4 py-2 font-medium ${
              filters.jenjang === 'Outdoor' 
                ? 'border-b-2 border-yellow-500 text-yellow-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Outdoor ({filteredFacilities.filter(s => s.jenjang === 'Outdoor').length})
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
        
        {filteredFacilities.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg shadow">
            <FaMapMarkerAlt className="mx-auto text-4xl text-gray-400 mb-2" />
            <p className="text-gray-600">Tidak ada data fasilitas yang ditemukan</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {currentFacilities.map((facility) => (
                <div 
                  key={facility.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => {
                    setSelectedFacility(facility);
                    setShowDetail(true);
                  }}
                >
                  <div className="h-40 bg-gray-200 relative">
                    <img 
                      src={facility.gambar} 
                      alt={facility.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x200?text=Fasilitas+Olahraga';
                      }}
                    />
                    <div className="absolute bottom-2 left-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full text-white ${
                        facility.jenjang === 'Indoor' ? 'bg-red-500' : 'bg-blue-500'
                      }`}>
                        {facility.jenjang}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-navy mb-1 line-clamp-1">{facility.name}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {facility.sarana}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getJenjangBadgeClass(facility.jenjang)}`}>
                        {facility.jenjang}
                      </span>
                      <span className="text-xs text-gray-500">
                        {facility.alamat?.split(', ').pop() || 'Semarang'}
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

export default SaranaEstripora;
