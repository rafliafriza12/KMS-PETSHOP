export interface NavbarAppType {
  title: string;
  href: string;
  icon?: any;
}

export interface DiagnosisAppType {
  _id: string;
  nama: string;
  ras: string;
  tanggal: string;
  aktivitas: string;
  berat: string;
  subtitle: string;
  kesehatan: string;
}

export interface LayananAppType {
  _id: string;
  kategori: string;
  popular?: string;
  rekomendasi?: string;
  judul: string;
  deskripsi: string;
  durasi: string;
  harga: string;
  alasan: string[];
}

export interface PesananAktifType {
  _id: string;
  nama: string;
  idPesanan: string;
  jadwal: string;
  harga: string;
  metodePembayaran: string;
  status: string;
  estimasiWaktu: string;
  dipesan: string;
}

export interface RiwayatType {
  _id: string;
  nama: string;
  idPesanan: string;
  jadwal: string;
  harga: string;
  metodePembayaran: string;
  status: string;
  estimasiWaktu: string;
  dipesan: string;
  catatan: string;
  selesai: string;
}

export interface KeranjangType {
  title: string;
  nama: string;
  tanggal: string;
  jam: string;
  duration: string;
  harga: string;
}
