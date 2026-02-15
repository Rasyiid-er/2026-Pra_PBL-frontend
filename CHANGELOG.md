# Changelog

Semua perubahan penting pada repositori Frontend ini akan didokumentasikan dalam file ini.
Proyek ini mematuhi standar [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-02-15

### Added
- **Core Navigation**: Implementasi sistem routing menggunakan `react-router` dan navigasi global melalui komponen `Navbar`.
- **Room Management UI**:
    - Fitur penambahan ruangan baru dengan validasi input secara real-time.
    - Dashboard daftar ruangan yang mendukung pencarian (*client-side filtering*) dan paginasi.
- **Booking Workflow**:
    - Form pembuatan peminjaman (`CreateBooking.tsx`) dengan integrasi dinamis data ruangan dari API.
    - Halaman manajemen status peminjaman untuk admin melakukan tindakan *Approve* atau *Reject*.
- **Audit & History**:
    - Halaman `Booking History` untuk melacak detail perubahan status peminjaman per ID.
    - Komponen `Booking Log` yang menampilkan seluruh riwayat transaksi secara terpusat.
- **Styling & UI**: Implementasi desain responsif menggunakan `flowbite-react` dan `Tailwind CSS`.

### Changed
- **API Integration**: Standardisasi layanan komunikasi data menggunakan `axios` melalui `roomServices.ts` dan `bookingServices.ts`.
- **State Management**: Penggunaan `CustomEvent` ("roomAdded") untuk sinkronisasi otomatis antar komponen tanpa perlu reload halaman.

### Fixed
- **Time Formatting**: Normalisasi tampilan waktu pada tabel log dan histori agar sesuai dengan format standar lokal `id-ID`.
- **Route Handling**: Perbaikan rute pada `App.tsx` untuk memastikan halaman utama (`/`) mengarah langsung ke daftar ruangan agar aplikasi tidak terlihat kosong saat diakses.
