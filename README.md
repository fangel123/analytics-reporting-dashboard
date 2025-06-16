# Analytics & Reporting Dashboard

## 🚀 Tautan Aplikasi Langsung (Live Demo)

## Tautan Langsung (Live Links)

- **Frontend / Dashboard Utama:** [https://analytics-reporting-dashboard-2tkwy44i0.vercel.app/](https://analytics-reporting-dashboard-2tkwy44i0.vercel.app/)
- **API Backend:** `https://analytics-reporting-dashboard-production.up.railway.app/api`

---

Proyek ini adalah sebuah dashboard analitik full-stack yang dibangun sebagai bagian dari tugas perekrutan. Aplikasi ini menampilkan data penjualan supermarket, melakukan proses ETL dari data mentah ke database PostgreSQL, dan menyajikannya melalui API backend ke antarmuka frontend yang interaktif.

## Fitur Utama

- **Visualisasi Data Interaktif:** 3 chart utama (Pie, Scatter, Heatmap) menggunakan Plotly.js.
- **Arsitektur Full-Stack:** Backend Node.js yang terpisah melayani data ke frontend React.
- **Dark/Light Mode:** Antarmuka yang mendukung tema terang dan gelap, dengan pilihan pengguna yang disimpan.
- **Desain Responsif:** Tampilan yang dioptimalkan untuk perangkat mobile dan desktop.

## Tumpukan Teknologi (Tech Stack)

- **Frontend:**
  - React (Vite)
  - Tailwind CSS
  - Tanstack Query (Data Fetching)
  - Zustand (State Management)
  - Plotly.js (Charting)
- **Backend:**
  - Node.js
  - Express.js
  - PostgreSQL (Database)
- **ETL:**
  - Node.js script dengan `xlsx` dan `pg`.

## Cara Menjalankan Proyek Secara Lokal

Pastikan Anda sudah menginstal Node.js dan PostgreSQL.

### 1. Backend Setup

```bash
# Masuk ke direktori backend
cd backend

# Install dependensi
npm install

# Buat file .env dan isi dengan koneksi database Anda
# Contoh: DATABASE_URL=postgres://user:password@localhost:5432/database_name
cp .env.example .env

# Jalankan migrasi untuk membuat tabel
npm run migrate up

# Jalankan skrip ETL untuk mengisi data
node etl-script.js

# Jalankan server backend (di http://localhost:3001)
npm start
```

### 2. Frontend Setup

```bash
# Buka terminal baru dan masuk ke direktori frontend
cd frontend

# Install dependensi
npm install

# Jalankan server pengembangan (buka http://localhost:5173 di browser)
npm run dev
```
