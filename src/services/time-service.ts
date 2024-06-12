// Fungsi untuk menghitung durasi sejak posting
const calculateDuration = (postDate: Date | string) => {
    // Pastikan postDate adalah objek Date
    const parsedPostDate = typeof postDate === 'string' ? new Date(postDate) : postDate;
    if (!(parsedPostDate instanceof Date && !isNaN(parsedPostDate.getTime()))) {
        throw new Error('postDate tidak valid');
    }

    // Dapatkan tanggal saat ini
    const currentDate = new Date();

    // Hitung selisih waktu dalam milidetik
    const timeDifference = currentDate.getTime() - parsedPostDate.getTime();
    // Konversi selisih waktu menjadi hari
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    // Konversi selisih waktu menjadi bulan
    const monthsDifference = Math.floor(daysDifference / 30);
    // Konversi selisih waktu menjadi tahun
    const yearsDifference = Math.floor(monthsDifference / 12);
  
    let timeDuration: string = ''; // Inisialisasi timeDuration dengan nilai default
  
    if (yearsDifference >= 1) {
      timeDuration = yearsDifference === 1 ? `${yearsDifference} tahun` : `${yearsDifference} tahun`;
    } else if (monthsDifference >= 1) {
      timeDuration = monthsDifference === 1 ? `${monthsDifference} bulan` : `${monthsDifference} bulan`;
    } else if (daysDifference >= 0) {
      timeDuration = daysDifference <= 1 ? `${daysDifference} hari` : `${daysDifference} hari`;
    }
  
    return timeDuration.toString() ; // Mengembalikan objek dengan properti timeDuration sebagai string
}

export default calculateDuration;
