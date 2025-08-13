export interface NavbarAppType {
  title: string;
  href: string;
  icon?: any;
}

export interface DiagnosisAppType {
  _id: string;
  berat: number;
  createdAt: string;
  kondisiKesehatan: string[];
  namaKucing: string;
  ras: string;
  tingkatAktivitas: string;
  umur: number;

  updatedAt?: string;
}

export interface LayananAppType {
  _id: string;
  benefit: string[];
  createdAt: string;
  deskripsi: string;
  diskon: number;
  durasiLayanan: number;
  harga: number;
  kategori: string;
  namaLayanan: string;
  status?: string;
  updatedAt: string;
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
