# 2026-RoomBooking-Frontend

## Description

Repositori ini merupakan komponen **Frontend** dari sistem manajemen peminjaman ruangan. Aplikasi ini dibangun sebagai _Single Page Application_ (SPA) menggunakan **React** dan **TypeScript** untuk memberikan antarmuka yang responsif dan interaktif bagi pengguna dalam mengelola reservasi ruangan.

## Features

- **Room Dashboard**: Antarmuka untuk manajemen data ruangan dengan fitur pencarian dan paginasi.

- **Booking Creation**: Form reservasi ruangan yang terintegrasi dengan data ruangan real-time.

- **Booking Status Management**: Halaman untuk memantau dan memperbarui status peminjaman (Approve/Reject).

- **Activity Logs & History**: Pelacakan riwayat perubahan status peminjaman (_Audit Trail_) dengan konversi zona waktu WIB (Asia/Jakarta) .

- **Responsive UI**: Menggunakan Flowbite-React untuk memastikan tampilan optimal di berbagai perangkat.

## Tech Stack

- **Framework**: React 18+.
- **Language**: TypeScript.
- **Styling**: Tailwind CSS & Flowbite-React.
- **Routing**: React Router.
- **API Client**: Axios.

## Installation

1. Pastikan Anda telah menginstal **Node.js** (versi 18 ke atas).
2. Clone repositori ini:

```bash
git clone https://github.com/Rasyiid-er/2026-Pra_PBL-frontend.git

```

3. Masuk ke direktori proyek:

```bash
cd 2026-Pra_PBL-frontend

```

4. Instal dependensi:

```bash
npm install

```

5. Jalankan aplikasi di mode pengembangan:

```bash
npm run dev

```

## Environment Variables

Buat file `.env` di root folder berdasarkan contoh berikut (jangan meng-commit file `.env` asli):

- `VITE_API_BASE_URL`: URL dasar API Backend ASP.NET Anda (misal: `http://localhost:5000/api`).

## Workflow & Git Standards

- **Branching Strategy**: Pengembangan fitur dilakukan di branch `feature/*` lalu di-merge ke `develop` sebelum ke `main` .

- **Conventional Commit**: Pesan commit mengikuti format standar industri (contoh: `feat(booking-ui): implement history table`) .

- **Semantic Versioning**: Penomoran rilis menggunakan format `v1.0.0`.

## License

Distributed under the **MIT License**.
