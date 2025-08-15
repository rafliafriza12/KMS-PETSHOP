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

export interface LayanananByRekomendasiType {
  knowledge_id: string;
  layanan: LayananAppType;
  score: number;
}

export interface PesananAktifType {
  _id: string;
  items: [
    {
      _id: string;
      estimasiWaktu: number;
      harga: number;
      jadwal: string;
      kucingId: string | KucingType;
      layananId: string | LayananAppType;
      pesananId?: any;
      statusPembayaran: string;
      statusPesanan: string;
      createdAt: string;
      updatedAt: string;
    }
  ];
  metodePembayaran: string;
  statusPembayaran: string;
  totalHarga: number;
  totalItems: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
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

export interface KucingType {
  _id: string;
  berat: number;
  kondisiKesehatan: string[];
  namaKucing: string;
  ras: string;
  tingkatAktivitas: string;
  umur: number;
}

export interface KeranjangType {
  _id: string;
  jadwal: string;
  keranjangId: string;
  kucingId: string;
  layanan: LayananAppType;
  totalHarga: number;
}
