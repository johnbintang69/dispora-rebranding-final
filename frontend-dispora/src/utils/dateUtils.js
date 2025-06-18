/**
 * Format a date string to Indonesian locale
 * @param {string} dateString - The date string to format
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'Tanggal tidak tersedia';
  
  try {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      // Try to parse the date string if it's not in ISO format
      const parts = dateString.split(/[- :T]/);
      if (parts.length >= 3) {
        const newDate = new Date(parts[0], parts[1] - 1, parts[2].substr(0, 2));
        if (!isNaN(newDate.getTime())) {
          date = newDate;
        }
      }
    }
    
    if (isNaN(date.getTime())) {
      console.warn('Invalid date string:', dateString);
      return 'Tanggal tidak valid';
    }
    
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      timeZone: 'Asia/Jakarta'
    };
    
    return date.toLocaleDateString('id-ID', options);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Format tanggal tidak valid';
  }
};

/**
 * Get relative time from date (e.g., "2 hari yang lalu")
 * @param {string} dateString - The date string
 * @returns {string} Relative time string
 */
export const getRelativeTime = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    const intervals = {
      tahun: 31536000,
      bulan: 2592000,
      minggu: 604800,
      hari: 86400,
      jam: 3600,
      menit: 60,
      detik: 1
    };
    
    for (const [unit, seconds] of Object.entries(intervals)) {
      const interval = Math.floor(diffInSeconds / seconds);
      if (interval >= 1) {
        return `${interval} ${unit} yang lalu`;
      }
    }
    
    return 'Baru saja';
  } catch (error) {
    console.error('Error getting relative time:', error);
    return '';
  }
};
