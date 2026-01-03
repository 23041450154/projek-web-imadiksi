# IMADIKSI Project Procedure

Permintaan Anda untuk checklist procedure dengan command lengkap.

## 1. Project Initialization & Setup

### Windows PowerShell
```powershell
# 1. Buat folder project & masuk
New-Item -ItemType Directory -Force -Path "imadiksi-web"
Set-Location "imadiksi-web"

# 2. Initialize Vite (React + TypeScript)
npm create vite@latest . -- --template react-ts

# 3. Install dependencies utama & tambahan
npm install react-router-dom @types/three @react-three/fiber @react-three/drei tailwindcss postcss autoprefixer lucide-react framer-motion clsx tailwind-merge react-hook-form zod @hookform/resolvers

# 4. Init TailwindCSS
npx tailwindcss init -p
```

### Bash (Linux/Mac/Git Bash)
```bash
# 1. Buat folder project & masuk
mkdir -p imadiksi-web && cd imadiksi-web

# 2. Initialize Vite (React + TypeScript)
npm create vite@latest . -- --template react-ts

# 3. Install dependencies utama & tambahan
npm install react-router-dom @types/three @react-three/fiber @react-three/drei tailwindcss postcss autoprefixer lucide-react framer-motion clsx tailwind-merge react-hook-form zod @hookform/resolvers

# 4. Init TailwindCSS
npx tailwindcss init -p
```

---

## 2. Development & Lifecycle

### Jalankan Development Server
Membuka local server di http://localhost:5173 (default).
```powershell
npm run dev
```

### Build untuk Produksi
Melakukan compile TypeScript dan aset ke folder `dist/`.
```powershell
npm run build
```

### Preview Production Build
Mencoba hasil build secara lokal untuk memastikan semuanya berjalan lancar sebelum deploy.
```powershell
npm run preview
```

### Verifikasi Folder Dist
Cek apakah aset (index.html, js, css) sudah ter-generate dengan benar.

**Windows PowerShell**
```powershell
Get-ChildItem dist -Recurse
```

**Bash**
```bash
ls -R dist/
```
