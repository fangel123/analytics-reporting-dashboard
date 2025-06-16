# Full-Stack Analytics & Reporting Dashboard

## 🚀 Live Application Demo

**Click the link below to see the interactive dashboard in action:**

### [https://analytics-reporting-dashboard.vercel.app/](https://analytics-reporting-dashboard.vercel.app/)

![Dashboard Screenshot Dark Mode](./dashboard-screenshot1.png)
![Dashboard Screenshot Light Mode](./dashboard-screenshot2.png)

<br>

This README is available in two languages. Please expand your preferred section below.

---

<br>

<details>
<summary>🇬🇧 **English Documentation**</summary>

## Project Summary

This project is a full-stack analytics dashboard built from the ground up. The application performs an ETL (Extract, Transform, Load) process on raw sales data, loads it into a PostgreSQL database, and serves it via a robust backend API to a modern, responsive, and interactive frontend interface.

This project demonstrates end-to-end capabilities in architecting systems, managing data, building APIs, and creating informative data visualizations.

## ✨ Key Features

-   **Interactive Data Visualizations:** Three primary charts (Pie, Scatter, Heatmap) using **Plotly.js** to display sales data from various perspectives.
-   **Decoupled Full-Stack Architecture:** A Node.js backend running on Railway serves data to a React frontend deployed on Vercel, following CI/CD best practices.
-   **ETL Pipeline:** An efficient Node.js script to parse an Excel file, clean, transform, and load over 9,000 rows of data into a normalized PostgreSQL database.
-   **Light & Dark Mode:** A user-friendly interface supporting both light and dark themes, with user preferences persisted in `localStorage` using **Zustand**.
-   **Responsive Design:** A fully responsive layout built with Tailwind CSS, ensuring an optimal user experience on both desktop and mobile devices.

## 🛠️ Tech Stack

| Category      | Technology                                                              |
| :------------ | :--------------------------------------------------------------------- |
| **Frontend**  | `React (Vite)`, `Tailwind CSS`, `Tanstack Query`, `Zustand`, `Plotly.js`, `Axios` |
| **Backend**   | `Node.js`, `Express.js`                                                |
| **Database**  | `PostgreSQL`                                                           |
| **Deployment**| `Vercel` (Frontend), `Railway.app` (Backend & Database)                  |
| **DevOps**    | `Git`, `GitHub`, `CI/CD`                                               |

## 🏗️ Application Architecture

The application utilizes a modern, decoupled architecture, deployed on different platforms for optimization.

```
+-------------+      +------------------+      +-------------------+
| User        |----->| Vercel           |----->|  Railway (Backend)|
| (Browser)   |      | (React Frontend) |      | (Node.js/Express) |
+-------------+      +------------------+      +---------+---------+
                                                             |
                                                             | (Internal Network)
                                                             v
                                                     +-------+-------+
                                                     | Railway (DB)  |
                                                     | (PostgreSQL)  |
                                                     +---------------+
```

The ETL process to populate the database is performed as a one-time task from a local environment connected to the cloud database on Railway.

## 💡 Technical Highlights & Challenges Overcome

-   **Database Schema Design:** Engineered a normalized schema from a large, flat data file to improve query efficiency and data integrity.
-   **Deployment Problem-Solving:** Successfully navigated and resolved real-world deployment challenges, including managing Environment Variables (`DATABASE_URL`, `VITE_API_URL`) across platforms, handling `CORS` and `500 Internal Server Errors`, and configuring a Node.js server to listen on a dynamic port.
-   **Global State Management:** Leveraged Zustand for lightweight and efficient theme state management, complete with local storage persistence.
-   **Responsive Data Visualization:** Implemented a custom `useWindowSize` hook to dynamically alter Plotly chart layouts, such as hiding legends on mobile devices for a better user experience.

## ⚙️ How to Run This Project Locally

Ensure you have Node.js and PostgreSQL installed on your machine.

### 1. Backend & Data Setup

```bash
# Clone the repository
git clone https://github.com/fangel123/analytics-reporting-dashboard.git
cd analytics-reporting-dashboard
cd backend

# Install dependencies
npm install

# Create a .env file and fill it with your LOCAL PostgreSQL connection string
# Example: DATABASE_URL=postgres://user:password@localhost:5432/analytics_db

# Run migration and ETL scripts
npm run migrate up
node etl-script.js

# Start the backend server (runs on http://localhost:3001)
npm start
```

### 2. Frontend

```bash
# Open a new terminal and navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server (open http://localhost:5173 in your browser)
npm run dev
```

</details>

<br>

<details>
<summary>🇮🇩 **Dokumentasi Bahasa Indonesia**</summary>

## Ringkasan Proyek

Proyek ini adalah sebuah dashboard analitik full-stack yang dibangun dari awal hingga akhir. Aplikasi ini melakukan proses ETL (Extract, Transform, Load) pada data penjualan mentah, memuatnya ke dalam database PostgreSQL, dan menyajikannya melalui API backend yang kuat ke antarmuka frontend yang modern, responsif, dan interaktif.

Proyek ini mendemonstrasikan kemampuan end-to-end dalam merancang arsitektur, mengelola data, membangun API, dan menciptakan visualisasi data yang informatif.

## ✨ Fitur Utama

-   **Visualisasi Data Interaktif:** 3 chart utama (Pie, Scatter, Heatmap) menggunakan **Plotly.js**, menampilkan data penjualan dari berbagai sudut pandang.
-   **Arsitektur Full-Stack Terpisah:** Backend Node.js yang berjalan di Railway melayani data ke frontend React yang di-deploy di Vercel, mengikuti praktik terbaik CI/CD.
-   **Proses ETL:** Skrip Node.js yang efisien untuk mem-parsing file Excel, membersihkan, mentransformasi, dan memuat lebih dari 9.000 baris data ke database PostgreSQL yang dinormalisasi.
-   **Mode Terang & Gelap:** Antarmuka pengguna yang mendukung tema terang dan gelap, dengan pilihan tema yang disimpan di `localStorage` menggunakan **Zustand**.
-   **Desain Responsif:** Layout yang sepenuhnya responsif menggunakan Tailwind CSS, memastikan pengalaman pengguna yang optimal di perangkat desktop maupun mobile.

## 🛠️ Tumpukan Teknologi (Tech Stack)

| Kategori      | Teknologi                                                              |
| :------------ | :--------------------------------------------------------------------- |
| **Frontend**  | `React (Vite)`, `Tailwind CSS`, `Tanstack Query`, `Zustand`, `Plotly.js`, `Axios` |
| **Backend**   | `Node.js`, `Express.js`                                                |
| **Database**  | `PostgreSQL`                                                           |
| **Deployment**| `Vercel` (Frontend), `Railway.app` (Backend & Database)                  |
| **DevOps**    | `Git`, `GitHub`, `CI/CD`                                               |

## 🏗️ Arsitektur Aplikasi

Aplikasi ini menggunakan arsitektur modern yang memisahkan antara frontend dan backend, di-deploy pada platform yang berbeda untuk optimalisasi.

```
+----------------+      +------------------+      +-------------------+
|   Pengguna     |----->| Vercel           |----->|  Railway (Backend)|
| (Browser)      |      | (Frontend React) |      | (Node.js/Express) |
+----------------+      +------------------+      +---------+---------+
                                                              |
                                                              | (Koneksi Internal)
                                                              v
                                                      +-------+-------+
                                                      | Railway (DB)  |
                                                      | (PostgreSQL)  |
                                                      +---------------+
```

## 💡 Highlight Teknis & Tantangan

-   **Desain Skema Database:** Merancang skema yang dinormalisasi dari satu file data besar untuk meningkatkan efisiensi query dan integritas data.
-   **Problem Solving Deployment:** Berhasil mengatasi berbagai tantangan deployment dunia nyata, termasuk mengelola Environment Variables (`DATABASE_URL`, `VITE_API_URL`), menangani error `CORS` dan `500`, serta mengonfigurasi server untuk berjalan pada port dinamis.
-   **Manajemen State Global:** Menggunakan Zustand untuk manajemen state tema yang ringan dan efisien, lengkap dengan persistensi.
-   **Visualisasi Data Responsif:** Mengimplementasikan hook custom (`useWindowSize`) untuk mengubah layout chart Plotly secara dinamis, seperti menyembunyikan legenda di perangkat mobile untuk UX yang lebih baik.

## ⚙️ Cara Menjalankan Proyek Secara Lokal

Pastikan Anda sudah menginstal Node.js dan PostgreSQL di komputer Anda.

### 1. Backend & Persiapan Data

```bash
# Clone repository
git clone https://github.com/fangel123/analytics-reporting-dashboard.git
cd analytics-reporting-dashboard
cd backend

# Install dependensi
npm install

# Buat file .env dan isi dengan koneksi database PostgreSQL LOKAL Anda
# Contoh: DATABASE_URL=postgres://user:password@localhost:5432/analytics_db

# Jalankan migrasi dan ETL
npm run migrate up
node etl-script.js

# Jalankan server backend (http://localhost:3001)
npm start
```

### 2. Frontend

```bash
# Buka terminal baru dan masuk ke direktori frontend
cd frontend

# Install dependensi
npm install

# Jalankan server pengembangan (buka http://localhost:5173)
npm run dev```

</details>