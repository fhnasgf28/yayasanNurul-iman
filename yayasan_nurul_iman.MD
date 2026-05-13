# 🏛️ Prompt: Website Yayasan Modern dengan Next.js + TypeScript (CMS-like)

---

## 🎯 Konteks Proyek

Buatkan saya sebuah **website yayasan modern** menggunakan **Next.js 15 (App Router)** dan **TypeScript**, dilengkapi fitur **CMS sederhana** yang memungkinkan admin menambahkan, mengedit, dan menghapus konten secara langsung dari dashboard. Website ini harus terasa profesional, modern, dan mudah digunakan.

---

## 🗂️ Struktur Proyek

```
/
├── app/
│   ├── (public)/               # Halaman publik (website utama)
│   │   ├── layout.tsx
│   │   ├── page.tsx            # Homepage
│   │   ├── about/page.tsx      # Tentang Kami
│   │   ├── programs/
│   │   │   ├── page.tsx        # Daftar Program
│   │   │   └── [slug]/page.tsx # Detail Program
│   │   ├── news/
│   │   │   ├── page.tsx        # Daftar Berita
│   │   │   └── [slug]/page.tsx # Detail Berita
│   │   ├── gallery/page.tsx    # Galeri
│   │   └── contact/page.tsx    # Kontak
│   │
│   ├── (admin)/                # Dashboard Admin / CMS
│   │   ├── layout.tsx
│   │   ├── login/page.tsx      # Halaman Login Admin
│   │   └── dashboard/
│   │       ├── page.tsx        # Dashboard Overview
│   │       ├── programs/
│   │       │   ├── page.tsx    # Kelola Program
│   │       │   ├── create/page.tsx
│   │       │   └── [id]/edit/page.tsx
│   │       ├── news/
│   │       │   ├── page.tsx    # Kelola Berita
│   │       │   ├── create/page.tsx
│   │       │   └── [id]/edit/page.tsx
│   │       ├── gallery/page.tsx
│   │       └── settings/page.tsx
│   │
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       ├── programs/route.ts
│       ├── programs/[id]/route.ts
│       ├── news/route.ts
│       ├── news/[id]/route.ts
│       ├── gallery/route.ts
│       └── upload/route.ts
│
├── components/
│   ├── public/                 # Komponen halaman publik
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── ProgramCard.tsx
│   │   ├── NewsCard.tsx
│   │   ├── GalleryGrid.tsx
│   │   ├── DonationBanner.tsx
│   │   └── ContactForm.tsx
│   │
│   └── admin/                  # Komponen dashboard admin
│       ├── Sidebar.tsx
│       ├── Header.tsx
│       ├── RichTextEditor.tsx
│       ├── ImageUploader.tsx
│       ├── DataTable.tsx
│       └── StatsCard.tsx
│
├── lib/
│   ├── db.ts                   # Koneksi database (Prisma)
│   ├── auth.ts                 # Konfigurasi NextAuth
│   └── utils.ts
│
├── prisma/
│   └── schema.prisma
│
├── types/
│   └── index.ts                # TypeScript types & interfaces
│
└── public/
    └── uploads/                # Storage file upload lokal
```

---

## 🎨 Desain & Tema Visual

### Arahan Estetika
- **Tone**: Modern & terpercaya — clean, profesional, humanis
- **Warna Utama**: Deep navy `#0F2C5A` + aksen emas `#D4A843` + putih hangat `#FAFAF8`
- **Tipografi**:
  - Heading: `Playfair Display` (elegant, berwibawa)
  - Body: `DM Sans` (modern, mudah dibaca)
- **Elemen Visual**:
  - Subtle grain texture di hero section
  - Smooth scroll animations (Framer Motion)
  - Card dengan shadow halus dan hover effect
  - Gradient mesh di background tertentu
  - Ikon dari `Lucide React`

### Prinsip Layout
- Gunakan asimetri yang terencana, bukan layout kotak-kotak biasa
- Hero section: full-viewport dengan overlay teks yang dramatis
- Negative space yang generous agar konten bernafas
- Sticky navbar dengan blur backdrop

---

## 🌐 Halaman Publik — Spesifikasi Konten

### 1. Homepage (`/`)
- **Hero Section**: Gambar/video background, tagline yayasan, CTA button "Donasi Sekarang" & "Pelajari Program Kami"
- **Section Tentang Singkat**: Visi misi dalam 2-3 kalimat + statistik dampak (jumlah penerima manfaat, program aktif, tahun berdiri)
- **Section Program Unggulan**: Grid 3 kolom, tampilkan 3 program terbaru dari database
- **Section Berita Terbaru**: Layout editorial, tampilkan 3 berita terbaru
- **Section Donasi/CTA**: Banner full-width dengan tombol donasi
- **Section Mitra/Partner**: Logo slider mitra yayasan

### 2. Tentang Kami (`/about`)
- Sejarah yayasan (timeline visual)
- Visi & Misi
- Struktur organisasi (foto + nama pengurus)
- Nilai-nilai yayasan

### 3. Program (`/programs`)
- Grid semua program dengan filter kategori
- Setiap program: thumbnail, judul, deskripsi singkat, status (Aktif/Selesai), badge kategori

### 4. Detail Program (`/programs/[slug]`)
- Gambar header besar
- Konten lengkap dari rich text editor
- Sidebar: status, periode, target penerima manfaat, tombol donasi

### 5. Berita (`/news`)
- Layout seperti blog/majalah
- Filter berdasarkan kategori dan tanggal
- Featured article di bagian atas

### 6. Detail Berita (`/news/[slug]`)
- Full artikel dengan rich text
- Related posts
- Share ke sosial media

### 7. Galeri (`/gallery`)
- Masonry grid foto
- Lightbox saat foto diklik
- Filter berdasarkan kategori/tahun

### 8. Kontak (`/contact`)
- Form kontak (nama, email, subjek, pesan) dengan validasi
- Alamat kantor, nomor telepon, email
- Embed Google Maps

---

## 🔐 Dashboard Admin (CMS) — Spesifikasi

### Autentikasi
- Login dengan email + password menggunakan **NextAuth.js**
- Role-based: `ADMIN` dan `EDITOR`
- Session dengan JWT, auto-redirect jika belum login
- Halaman login yang branded dan aman

### Dashboard Overview (`/dashboard`)
- Statistik: total program, total berita, total foto, pengunjung bulan ini
- Tabel aktivitas terbaru
- Quick action buttons

### Kelola Program (`/dashboard/programs`)
**List View:**
- DataTable dengan kolom: thumbnail, judul, kategori, status, tanggal dibuat, aksi
- Search bar, filter status, pagination
- Tombol "Tambah Program Baru"

**Form Tambah/Edit:**
- Input: Judul, Slug (auto-generate dari judul), Kategori
- Rich Text Editor (gunakan **Tiptap** atau **React Quill**) untuk deskripsi lengkap
- Upload thumbnail (drag & drop)
- Field: Status (Aktif/Selesai/Draft), Periode Program, Target Penerima
- Preview sebelum publish

### Kelola Berita (`/dashboard/news`)
- Sama seperti kelola program
- Tambahan field: Penulis, Tag, Featured Image, Meta Description (untuk SEO)

### Kelola Galeri (`/dashboard/gallery`)
- Multi-upload foto sekaligus
- Grid foto yang bisa di-reorder (drag & drop)
- Edit caption dan kategori setiap foto
- Hapus foto

### Pengaturan (`/dashboard/settings`)
- Edit informasi yayasan (nama, tagline, deskripsi, logo)
- Edit kontak (alamat, telepon, email, sosmed)
- Edit konten homepage (hero text, statistik angka)
- Manajemen pengguna admin

---

## 🗃️ Database Schema (Prisma + PostgreSQL)

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String
  role      Role     @default(EDITOR)
  createdAt DateTime @default(now())
  news      News[]
}

enum Role {
  ADMIN
  EDITOR
}

model Program {
  id          String        @id @default(cuid())
  title       String
  slug        String        @unique
  description String        @db.Text
  content     String        @db.Text
  thumbnail   String?
  category    String
  status      ProgramStatus @default(DRAFT)
  startDate   DateTime?
  endDate     DateTime?
  beneficiary Int?
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
}

enum ProgramStatus {
  ACTIVE
  COMPLETED
  DRAFT
}

model News {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  excerpt     String
  content     String   @db.Text
  thumbnail   String?
  category    String
  tags        String[]
  published   Boolean  @default(false)
  authorId    String
  author      User     @relation(fields: [authorId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Gallery {
  id        String   @id @default(cuid())
  imageUrl  String
  caption   String?
  category  String?
  order     Int      @default(0)
  createdAt DateTime @default(now())
}

model SiteSettings {
  id          String @id @default(cuid())
  key         String @unique
  value       String @db.Text
  description String?
}
```

---

## ⚙️ Tech Stack

| Kebutuhan | Teknologi |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL via Prisma ORM |
| Auth | NextAuth.js v5 |
| Rich Text | Tiptap Editor |
| File Upload | Uploadthing / Local storage |
| Animasi | Framer Motion |
| Icons | Lucide React |
| Form & Validasi | React Hook Form + Zod |
| State Management | Zustand (admin) / Server Components (publik) |
| Image Optimization | Next.js Image component |
| Deployment | Vercel |

---

## 📦 Dependencies Utama

```bash
# Install semua dependencies
npm install \
  @prisma/client prisma \
  next-auth @auth/prisma-adapter \
  @tiptap/react @tiptap/starter-kit @tiptap/extension-image \
  react-hook-form @hookform/resolvers zod \
  framer-motion \
  lucide-react \
  zustand \
  uploadthing @uploadthing/next \
  clsx tailwind-merge \
  date-fns \
  slugify
```

---

## 🔧 Environment Variables

```env
# .env.local
DATABASE_URL="postgresql://user:password@localhost:5432/yayasan_db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Upload (pilih salah satu)
UPLOADTHING_SECRET="sk_live_..."
UPLOADTHING_APP_ID="your-app-id"

# Optional
NEXT_PUBLIC_SITE_NAME="Nama Yayasan Anda"
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"
```

---

## 🚀 Langkah Pengembangan (Urutan)

### Fase 1 — Setup & Foundation
1. `npx create-next-app@latest yayasan-web --typescript --tailwind --app`
2. Setup Prisma + koneksi PostgreSQL
3. Setup NextAuth.js dengan Prisma Adapter
4. Buat layout utama publik (Navbar + Footer)
5. Buat layout admin (Sidebar + Header)

### Fase 2 — Halaman Publik
6. Homepage dengan semua sections
7. Halaman About, Programs, News, Gallery, Contact
8. Hubungkan dengan data dari database (Server Components)
9. Implementasi animasi Framer Motion

### Fase 3 — Dashboard CMS
10. Halaman login admin
11. Dashboard overview dengan statistik
12. CRUD Program (list, create, edit, delete)
13. CRUD Berita dengan rich text editor
14. Upload & kelola galeri
15. Halaman settings

### Fase 4 — Polish & Deployment
16. SEO meta tags + Open Graph
17. Loading states & error handling
18. Responsif mobile
19. Optimasi performa (lazy loading, caching)
20. Deploy ke Vercel

---

## 🎨 Komponen UI Khusus yang Harus Dibuat

### Public Components
```tsx
// Hero.tsx — Animasi teks masuk dengan Framer Motion
// ProgramCard.tsx — Hover lift effect + gradient overlay
// NewsCard.tsx — Layout editorial, date badge
// GalleryGrid.tsx — Masonry layout + lightbox
// DonationBanner.tsx — Animated CTA section
// StatCounter.tsx — Animated number counter saat scroll
```

### Admin Components
```tsx
// RichTextEditor.tsx — Tiptap dengan toolbar lengkap
// ImageUploader.tsx — Drag & drop dengan preview
// DataTable.tsx — Sortable, searchable, paginated table
// ConfirmDialog.tsx — Modal konfirmasi hapus
// SlugInput.tsx — Auto-generate slug dari judul
// StatusBadge.tsx — Color-coded status badge
```

---

## 📱 Responsif Breakpoints

- `sm`: 640px — Mobile landscape
- `md`: 768px — Tablet
- `lg`: 1024px — Desktop
- `xl`: 1280px — Wide desktop

Prioritas mobile-first. Navbar berubah jadi hamburger menu di mobile. Dashboard admin menggunakan collapsible sidebar.

---

## ✅ Checklist Fitur

### Website Publik
- [ ] Homepage dengan semua sections
- [ ] Halaman About dengan timeline
- [ ] Halaman Program (list + detail)
- [ ] Halaman Berita (list + detail)
- [ ] Galeri dengan lightbox
- [ ] Form kontak fungsional
- [ ] Navbar sticky + mobile responsive
- [ ] Footer lengkap
- [ ] SEO meta tags
- [ ] Loading animations

### Dashboard CMS
- [ ] Autentikasi login/logout
- [ ] Dashboard overview stats
- [ ] CRUD Program
- [ ] CRUD Berita dengan rich text
- [ ] Upload & kelola galeri
- [ ] Pengaturan situs
- [ ] Manajemen user admin
- [ ] Protected routes

---

## 💡 Catatan Penting untuk AI

1. **Gunakan App Router** (bukan Pages Router) — manfaatkan Server Components semaksimal mungkin untuk performa
2. **TypeScript strict** — semua props dan return types harus terdefinisi dengan jelas
3. **Error Handling** — setiap API route harus punya proper error handling dan loading states
4. **Keamanan** — validasi input di server-side, sanitasi konten rich text, proteksi route admin
5. **Accessibility** — gunakan semantic HTML, aria-labels, keyboard navigation
6. **Desain konsisten** — gunakan design tokens (CSS variables) untuk warna dan spacing
7. **Kode bersih** — pisahkan business logic dari UI, gunakan custom hooks
8. **Optimasi gambar** — selalu gunakan `next/image` dengan width dan height yang tepat

---

*Prompt ini dirancang untuk menghasilkan website yayasan yang production-ready dengan pengalaman CMS yang intuitif bagi admin non-teknis.*