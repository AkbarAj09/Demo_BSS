# Project BSS Parking

## Pendahuluan
Project ini merupakan sistem manajemen pengguna berbasis web yang dibangun menggunakan teknologi **Golang** untuk backend dan **Next.js** untuk frontend. Sistem ini menggunakan database PostgreSQL dengan nama `demo_bss` yang memiliki satu tabel utama bernama `pengguna`. Tabel tersebut terdiri dari tiga kolom:
- `id` (integer, primary key)
- `username` (string)
- `password` (string)

## Instalasi

### 1. Clone Repository
Clone repository dari GitHub menggunakan perintah berikut:
```bash
git clone https://github.com/AkbarAj09/Demo_BSS.git
```
### 2. Backend (Golang)
#### a. Pastikan Golang telah terinstal
- Unduh dan instal Golang dari [situs resmi Go](https://golang.org/dl/).
- Pastikan versi Go yang terinstal adalah versi terbaru dengan menjalankan perintah:
  ```bash
  go version
  ```

#### b. Instalasi library yang dibutuhkan
- Pastikan Anda berada di direktori `backend`, lalu jalankan perintah berikut untuk menginstal library yang dibutuhkan:
  ```bash
  go get github.com/gorilla/mux
  go get github.com/gorilla/handlers
  go get github.com/jinzhu/gorm
  go get github.com/lib/pq
  ```

#### c. Jalankan server backend
- Setelah library terinstal, jalankan perintah berikut:
  ```bash
  go run main.go
  ```
- Server akan berjalan di `http://localhost:8080`.

### 3. Frontend (Next.js)
#### a. Pastikan Node.js telah terinstal
- Unduh dan instal Node.js dari [situs resmi Node.js](https://nodejs.org/).
- Pastikan versi Node.js telah terinstal dengan menjalankan perintah:
  ```bash
  node -v
  npm -v
  ```

#### b. Instalasi library yang dibutuhkan
- Pastikan Anda berada di direktori `frontend`, lalu jalankan perintah berikut:
  ```bash
  npm install
  ```

#### c. Jalankan server frontend
- Setelah semua dependensi terinstal, jalankan perintah berikut:
  ```bash
  npm run dev
  ```
- Aplikasi akan berjalan di `http://localhost:3000`.

## Struktur Database
Nama Database: **demo_bss**

Tabel: **pengguna**
| Kolom     | Tipe Data | Keterangan      |
|-----------|-----------|-----------------|
| `id`      | Integer   | Primary key     |
| `username`| String    | Username unik   |
| `password`| String    | Kata sandi pengguna |

## Backend (Golang)
### Endpoint API
Backend memiliki dua endpoint utama:
1. **Register**
   - URL: `/register`
   - Method: `POST`
   - Deskripsi: Untuk mendaftarkan pengguna baru.

2. **Login**
   - URL: `/login`
   - Method: `POST`
   - Deskripsi: Untuk masuk ke sistem.

### Penjelasan Tentang CORS
CORS (Cross-Origin Resource Sharing) digunakan untuk mengizinkan permintaan dari domain atau origin yang berbeda. Dalam project ini, CORS diimplementasikan untuk memungkinkan frontend (yang berjalan di `http://localhost:3000`) berkomunikasi dengan backend (yang berjalan di `http://localhost:8080`).

Berikut adalah potongan kode untuk mengaktifkan CORS:
```go
cors := handlers.CORS(
    handlers.AllowedOrigins([]string{"http://localhost:3000"}),
    handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}),
    handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
)
log.Fatal(http.ListenAndServe(":8080", cors(r)))
```
Kode ini memastikan bahwa hanya permintaan dari origin `http://localhost:3000` yang diizinkan, dengan metode HTTP tertentu seperti `GET`, `POST`, `PUT`, dan `DELETE`.

## Frontend (Next.js)
### Struktur Halaman
1. **Halaman Utama**
   - File: `frontend/src/app/page.js`
   - Deskripsi: Halaman utama aplikasi.

2. **Folder `auth`**
   - Lokasi: `frontend/src/app/auth`
   - Folder ini berisi halaman login dan register:
     - `login/page.js`: Halaman login pengguna.
     - `register/page.js`: Halaman register pengguna.

## Catatan Tambahan
- Pastikan backend dan frontend berjalan secara bersamaan.
- Untuk mengubah konfigurasi database, edit file konfigurasi di `backend/config` sesuai kebutuhan.

## License
Copyright © 2025 Akbar Aj . All rights reserved.