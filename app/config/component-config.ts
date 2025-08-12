import {
  DiagnosisAppType,
  KeranjangType,
  PesananAktifType,
  RiwayatType,
} from '../types/components';
import { LayananAppType } from '../types/components';
import PesananAktif from '../components/pesanan-aktif';

export const DiagnosisAppData: DiagnosisAppType[] = [
  {
    _id: '1',
    nama: 'Kucing',
    aktivitas: 'Rendah',
    berat: '2',
    kesehatan: 'Baik',
    ras: 'Persia',
    subtitle: 'Dipilih',
    tanggal: '10010',
  },
  {
    _id: '2',
    nama: 'Kucing',
    aktivitas: 'Sedang',
    berat: '2',
    kesehatan: 'Baik',
    ras: 'Persia',
    subtitle: 'Dipilih',
    tanggal: '10010',
  },
];

export const LayananAppData: LayananAppType[] = [
  {
    _id: '1',
    kategori: 'Kesehatan',
    rekomendasi: 'Sangat Direkomendasikan',
    judul: 'Terapi Fisik Senior',
    deskripsi:
      'Terapi fisik dan pijat khusus untuk kucing senior dengan masalah sendi dan mobilitas.',
    durasi: '1 jam 15 menit',
    harga: 'Rp 350.000',
    alasan: [
      'Sesuai untuk kucing senior',
      'Mengatasi masalah: Arthritis',
      'Sesuai untuk kucing dengan aktivitas rendah',
    ],
  },
  {
    _id: '2',
    kategori: 'Grooming',
    rekomendasi: 'Rekomendasi',
    popular: 'Popular',
    judul: 'Terapi Fisik Senior',
    deskripsi:
      'Terapi fisik dan pijat khusus untuk kucing senior dengan masalah sendi dan mobilitas.',
    durasi: '1 jam 15 menit',
    harga: 'Rp 350.000',
    alasan: [
      'Sesuai untuk kucing senior',
      'Mengatasi masalah: Arthritis',
      'Sesuai untuk kucing dengan aktivitas rendah',
    ],
  },
  {
    _id: '3',
    kategori: 'Penitipan',
    rekomendasi: 'Sangat Direkomendasikan',
    judul: 'Terapi Fisik Senior',
    deskripsi:
      'Terapi fisik dan pijat khusus untuk kucing senior dengan masalah sendi dan mobilitas.',
    durasi: '1 jam 15 menit',
    harga: 'Rp 350.000',
    alasan: [
      'Sesuai untuk kucing senior',
      'Mengatasi masalah: Arthritis',
      'Sesuai untuk kucing dengan aktivitas rendah',
    ],
  },
  {
    _id: '4',
    kategori: 'Nutrisi',
    rekomendasi: 'Sangat Direkomendasikan',
    judul: 'Terapi Fisik Senior',
    deskripsi:
      'Terapi fisik dan pijat khusus untuk kucing senior dengan masalah sendi dan mobilitas.',
    durasi: '1 jam 15 menit',
    harga: 'Rp 350.000',
    alasan: [
      'Sesuai untuk kucing senior',
      'Mengatasi masalah: Arthritis',
      'Sesuai untuk kucing dengan aktivitas rendah',
    ],
  },
  {
    _id: '5',
    kategori: 'Pelatihan',
    rekomendasi: 'Sangat Direkomendasikan',
    judul: 'Terapi Fisik Senior',
    deskripsi:
      'Terapi fisik dan pijat khusus untuk kucing senior dengan masalah sendi dan mobilitas.',
    durasi: '1 jam 15 menit',
    harga: 'Rp 350.000',
    alasan: [
      'Sesuai untuk kucing senior',
      'Mengatasi masalah: Arthritis',
      'Sesuai untuk kucing dengan aktivitas rendah',
    ],
  },
];

export const PesananAktifData: PesananAktifType[] = [
  {
    _id: '1',
    nama: 'Luna',
    idPesanan: '1754974544306uofr8df83',
    dipesan: 'Selasa, 12 Agustus 2025 pukul 11.55',
    status: 'Lunas',
    estimasiWaktu: 'Minggu, 24 Agustus 2025 pukul 11.30',
    harga: '150.000',
    jadwal: 'Min, 24 Agu 2025 - 11:00',
    metodePembayaran: 'Dana',
  },
];

export const RiwayatData: RiwayatType[] = [
  {
    _id: '1',
    nama: 'Luna',
    idPesanan: '1754974544306uofr8df83',
    dipesan: 'Selasa, 12 Agustus 2025 pukul 11.55',
    status: 'Lunas',
    estimasiWaktu: 'Minggu, 24 Agustus 2025 pukul 11.30',
    harga: '150.000',
    jadwal: 'Min, 24 Agu 2025 - 11:00',
    metodePembayaran: 'Dana',
    catatan: 'wkwkwk',
    selesai: 'Senin, 11 Agustus 2025 pukul 19.37',
  },
];

export const KeranjangData: KeranjangType[] = [
  {
    title: 'Perawatan Gigi & Mulut',
    nama: 'Luna',
    tanggal: 'Jum, 22 Agu',
    jam: '13:00',
    duration: '1 jam',
    harga: '300.000',
  },
  {
    title: 'Perawatan Gigi & Mulut',
    nama: 'Luna',
    tanggal: 'Jum, 22 Agu',
    jam: '13:00',
    duration: '1 jam',
    harga: '300.000',
  },
  {
    title: 'Perawatan Gigi & Mulut',
    nama: 'Luna',
    tanggal: 'Jum, 22 Agu',
    jam: '13:00',
    duration: '1 jam',
    harga: '300.000',
  },
  {
    title: 'Perawatan Gigi & Mulut',
    nama: 'Luna',
    tanggal: 'Jum, 22 Agu',
    jam: '13:00',
    duration: '1 jam',
    harga: '300.000',
  },
  {
    title: 'Perawatan Gigi & Mulut',
    nama: 'Luna',
    tanggal: 'Jum, 22 Agu',
    jam: '13:00',
    duration: '1 jam',
    harga: '300.000',
  },
  {
    title: 'Perawatan Gigi & Mulut',
    nama: 'Luna',
    tanggal: 'Jum, 22 Agu',
    jam: '13:00',
    duration: '1 jam',
    harga: '300.000',
  },
  {
    title: 'Perawatan Gigi & Mulut',
    nama: 'Luna',
    tanggal: 'Jum, 22 Agu',
    jam: '13:00',
    duration: '1 jam',
    harga: '300.000',
  },
  {
    title: 'Perawatan Gigi & Mulut',
    nama: 'Luna',
    tanggal: 'Jum, 22 Agu',
    jam: '13:00',
    duration: '1 jam',
    harga: '300.000',
  },
];
