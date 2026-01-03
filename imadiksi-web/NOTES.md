# Catatan Implementasi & Integrasi API

## Struktur Data
Semua data mock tersimpan di folder `src/data/` dalam format JSON static. Tipe data didefinisikan di `src/types/index.ts`.

## Cara Mengganti Mock ke API
Untuk mengganti data mock dengan API backend (misal REST API atau GraphQL), ikuti langkah berikut:

### 1. Buat Service/Fetcher
Disarankan membuat folder `src/services/` atau menggunakan library fetching seperti `tanstack-query` (react-query).

Contoh fetcher sederhana (`src/lib/api.ts`):
```typescript
export async function getPrograms() {
  const res = await fetch('https://api.imadiksi.org/programs');
  if (!res.ok) throw new Error('Failed to fetch programs');
  return res.json();
}
```

### 2. Update Komponen Halaman
Ubah komponen yang mengimport JSON langsung (misal `src/pages/Programs.tsx`).

**Versi Mock (Sekarang):**
```typescript
import programsData from "../data/programs.json";

export default function Programs() {
  const [filter, setFilter] = useState("All");
  // ... logic filter di frontend
}
```

**Versi API:**
```typescript
import { useEffect, useState } from "react";
import { Program } from "../types";

export default function Programs() {
  const [data, setData] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/programs')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSkeleton />;
  // ... render
}
```

## Setup Three.js
Hero section ada di `src/three/HeroScene.tsx`.
- Visual: Menggunakan `Sparkles` dan wireframe `Icosahedron` sebagai representasi jaringan.
- Jika ingin mengganti model 3D (misal Globe), ganti komponen `NetworkShape` dengan model `.gltf` menggunakan `useGLTF` dari `@react-three/drei`.

## Fallback
Jika WebGL tidak tersedia, gradient background di `Home.tsx` akan tetap terlihat memastikan konten tetap terbaca.
