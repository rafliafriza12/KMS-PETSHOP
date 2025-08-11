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
