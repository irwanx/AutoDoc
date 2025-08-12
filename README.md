# AutoDoc - AI-Powered README Generator

![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/React-61dafb?style=for-the-badge&logo=react&logoColor=black) ![Vite](https://img.shields.io/badge/Vite-646cff?style=for-the-badge&logo=vite&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38b2ac?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 📖 Deskripsi

AutoDoc adalah aplikasi web modern yang menggunakan kekuatan AI untuk menghasilkan dokumentasi README.md yang profesional dan komprehensif untuk repositori GitHub Anda. Dengan antarmuka yang intuitif dan teknologi canggih, AutoDoc menganalisis struktur proyek Anda secara otomatis dan membuat dokumentasi yang benar-benar mewakili proyek Anda.

## ✨ Fitur Unggulan

- 🤖 **Analisis Otomatis** - Menganalisis struktur proyek secara otomatis dan mengidentifikasi teknologi yang digunakan
- ⚡ **Generasi Instan** - Menghasilkan README profesional dalam hitungan detik
- 🎨 **Badge Otomatis** - Membuat badge yang sesuai dengan teknologi dan status proyek Anda
- 🌍 **Multi Bahasa** - Mendukung bahasa Indonesia dan Inggris untuk dokumentasi yang lebih luas
- 🔒 **GitHub Integration** - Dukungan untuk repositori publik dan privat dengan token GitHub
- 📱 **Responsive Design** - Antarmuka yang responsif dan modern untuk semua perangkat
- 🎯 **AI-Powered Content** - Menggunakan AI untuk menghasilkan deskripsi dan dokumentasi yang profesional

## 🚀 Instalasi

### Prasyarat

- Node.js (versi 18 atau lebih baru)
- npm, yarn, atau pnpm

### Langkah Instalasi

```bash
# Clone repositori
git clone https://github.com/irwanx/AutoDoc.git

# Masuk ke direktori proyek
cd AutoDoc

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

## 💻 Penggunaan

### Development

```bash
# Menjalankan development server
npm run dev

# Build untuk production
npm run build

# Preview build production
npm run preview

# Linting kode
npm run lint
```

### Menggunakan Aplikasi

1. **Masukkan URL GitHub** - Masukkan URL repositori GitHub yang ingin Anda buatkan README-nya
2. **Token GitHub (Opsional)** - Untuk repositori privat, masukkan GitHub personal access token
3. **Generate README** - Klik tombol generate dan tunggu AI menganalisis proyek Anda
4. **Preview & Download** - Lihat hasil dalam mode preview atau markdown, lalu download file README.md

### Mendapatkan GitHub Token

1. Buka GitHub Settings → Developer settings
2. Pilih Personal access tokens → Tokens (classic)
3. Generate token baru dengan scope "repo"
4. Salin dan gunakan token tersebut di aplikasi

## 🏗️ Arsitektur Proyek

```
src/
├── components/          # Komponen React
│   ├── ui/             # Komponen UI dasar
│   ├── layouts/        # Layout komponen (Navbar, Footer)
│   ├── section/        # Komponen section halaman
│   └── elements/       # Komponen elemen khusus
├── hooks/              # Custom React hooks
├── services/           # Service layer (API calls)
├── utils/              # Utility functions
├── i18n/               # Internationalization
├── context/            # React contexts
├── provider/           # Context providers
└── types/              # TypeScript type definitions
```

## 🛠️ Teknologi yang Digunakan

- **Frontend Framework**: React 19 dengan TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Linting**: ESLint dengan TypeScript support

## 🌐 API Integration

Aplikasi ini mengintegrasikan dengan:

- **GitHub API** - Untuk mengambil informasi repositori
- **Luminai API** - Untuk AI-powered content generation

## 📱 Fitur Responsif

AutoDoc dirancang dengan pendekatan mobile-first dan mendukung:

- 📱 Mobile devices (320px+)
- 📟 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1280px+)

## 🎨 Kustomisasi

- **Multi-language** - Interface dalam Bahasa Indonesia dan Inggris
- **Custom Color System** - Sistem warna yang konsisten dengan CSS variables
- **Modern Design** - Desain modern dengan glassmorphism effects

## 🤝 Kontribusi

Kontribusi sangat kami harapkan! Berikut cara berkontribusi:

1. Fork repositori ini
2. Buat branch fitur baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan Anda (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

### Guidelines Kontribusi

- Pastikan kode mengikuti ESLint configuration
- Tulis commit message yang jelas dan deskriptif
- Tambahkan tests untuk fitur baru
- Update dokumentasi jika diperlukan

## 📄 Lisensi

Proyek ini dilisensikan under MIT License. Lihat file [LICENSE](LICENSE) untuk detail lebih lanjut.

## 🙏 Acknowledgments

- [GitHub API](https://docs.github.com/en/rest) untuk data repositori
- [Luminai](https://luminai.my.id) untuk AI content generation
- [Radix UI](https://www.radix-ui.com/) untuk komponen UI primitives
- [Tailwind CSS](https://tailwindcss.com/) untuk styling system
- [Lucide](https://lucide.dev/) untuk icon library

## 📞 Kontak & Support

- **Developer**: [irwanx](https://github.com/irwanx)
- **Issues**: [GitHub Issues](https://github.com/irwanx/AutoDoc/issues)
- **Discussions**: [GitHub Discussions](https://github.com/irwanx/AutoDoc/discussions)

---

<div align="center">

**Dibuat dengan ❤️**

[⭐ Star this repo](https://github.com/irwanx/AutoDoc) • [🐛 Report Bug](https://github.com/irwanx/AutoDoc/issues) • [💡 Request Feature](https://github.com/irwanx/AutoDoc/issues)

</div>
