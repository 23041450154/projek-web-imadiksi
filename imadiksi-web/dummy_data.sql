-- Dummy Data for IMADIKSI Website
-- Run this in Supabase SQL Editor

-- =============================================
-- 1. PROGRAMS (Program Kerja)
-- =============================================
INSERT INTO programs (title, summary, status, date, tags) VALUES
('Pelatihan Kepemimpinan', 'Program pelatihan kepemimpinan untuk mahasiswa KIP-Kuliah yang bertujuan mengembangkan soft skills dan kemampuan manajerial.', 'completed', '2025-09-15', ARRAY['Kepemimpinan', 'Soft Skills']),
('Bimbingan Akademik', 'Bimbingan belajar untuk mata kuliah sulit seperti Kalkulus, Statistika, dan Bahasa Inggris.', 'ongoing', '2026-01-10', ARRAY['Akademik', 'Bimbingan Belajar']),
('Seminar Kewirausahaan', 'Seminar dengan pembicara sukses dari kalangan alumni penerima beasiswa yang kini menjadi entrepreneur.', 'upcoming', '2026-02-20', ARRAY['Kewirausahaan', 'Seminar']),
('Bakti Sosial', 'Kegiatan bakti sosial ke panti asuhan dan desa binaan sebagai wujud kepedulian sosial.', 'completed', '2025-12-01', ARRAY['Sosial', 'Pengabdian']),
('Workshop Penulisan Ilmiah', 'Pelatihan penulisan karya ilmiah, jurnal, dan proposal penelitian untuk mahasiswa.', 'ongoing', '2026-01-15', ARRAY['Akademik', 'Penelitian']),
('Kompetisi Internal', 'Lomba debat, essay, dan karya tulis ilmiah antar anggota IMADIKSI.', 'upcoming', '2026-03-05', ARRAY['Kompetisi', 'Akademik']);

-- =============================================
-- 2. POSTS (Berita)
-- =============================================
INSERT INTO posts (title, slug, excerpt, content, category, image_url, date) VALUES
('IMADIKSI Gelar Pelatihan Kepemimpinan 2025', 'imadiksi-gelar-pelatihan-kepemimpinan-2025', 
 'Sebanyak 150 mahasiswa KIP-Kuliah mengikuti pelatihan kepemimpinan yang diselenggarakan IMADIKSI UIN Raden Fatah.', 
 'Palembang - Ikatan Mahasiswa Bidikmisi KIP-Kuliah (IMADIKSI) UIN Raden Fatah Palembang sukses menggelar Pelatihan Kepemimpinan pada Sabtu (15/9/2025). Acara yang diikuti oleh 150 peserta ini bertujuan untuk mengembangkan kemampuan kepemimpinan dan soft skills mahasiswa penerima beasiswa KIP-Kuliah.

Ketua IMADIKSI, Ahmad Fauzi, mengatakan bahwa pelatihan ini merupakan salah satu program unggulan organisasi. "Kami ingin mahasiswa KIP-Kuliah tidak hanya berprestasi secara akademik, tetapi juga memiliki jiwa kepemimpinan yang kuat," ujarnya.

Pelatihan ini menghadirkan pembicara dari berbagai latar belakang, termasuk alumni sukses dan praktisi HR dari perusahaan ternama.', 
 'Kegiatan', NULL, '2025-09-16'),

('Pendaftaran Anggota Baru IMADIKSI 2026 Dibuka', 'pendaftaran-anggota-baru-imadiksi-2026', 
 'IMADIKSI membuka pendaftaran anggota baru untuk mahasiswa penerima KIP-Kuliah angkatan 2025.', 
 'Palembang - Ikatan Mahasiswa Bidikmisi KIP-Kuliah (IMADIKSI) UIN Raden Fatah Palembang resmi membuka pendaftaran anggota baru untuk periode 2026. Pendaftaran terbuka bagi seluruh mahasiswa penerima beasiswa KIP-Kuliah angkatan 2025.

Pendaftaran dapat dilakukan secara online melalui website resmi IMADIKSI atau langsung ke sekretariat organisasi. Calon anggota akan mengikuti serangkaian tahapan seleksi termasuk wawancara dan ospek anggota baru.

Divisi Kaderisasi IMADIKSI, Siti Nurhaliza, mengajak mahasiswa baru untuk bergabung. "Di IMADIKSI kalian akan mendapat banyak pengalaman berharga, jaringan pertemanan yang luas, dan kesempatan untuk berkembang," jelasnya.', 
 'Pengumuman', NULL, '2026-01-02'),

('Alumni IMADIKSI Raih Beasiswa S2 Luar Negeri', 'alumni-imadiksi-raih-beasiswa-s2-luar-negeri', 
 'Dua alumni IMADIKSI berhasil meraih beasiswa S2 ke universitas ternama di Jepang dan Australia.', 
 'Palembang - Kabar membanggakan datang dari alumni Ikatan Mahasiswa Bidikmisi KIP-Kuliah (IMADIKSI) UIN Raden Fatah Palembang. Dua alumni organisasi ini berhasil meraih beasiswa magister ke luar negeri.

Muhammad Rizki berhasil mendapat beasiswa MEXT untuk melanjutkan studi S2 di Kyoto University, Jepang. Sementara Dewi Safitri meraih beasiswa Australia Awards untuk studi di University of Melbourne.

Keduanya merupakan anggota aktif IMADIKSI selama masa kuliah dan pernah menjabat sebagai pengurus inti organisasi.', 
 'Prestasi', NULL, '2025-12-20'),

('Workshop Penulisan Proposal Penelitian', 'workshop-penulisan-proposal-penelitian', 
 'IMADIKSI mengadakan workshop penulisan proposal penelitian untuk mempersiapkan mahasiswa mengikuti hibah penelitian.', 
 'Palembang - Divisi Akademik IMADIKSI UIN Raden Fatah Palembang menggelar Workshop Penulisan Proposal Penelitian pada Kamis (5/12/2025). Workshop ini diikuti oleh 80 mahasiswa dari berbagai fakultas.

Kegiatan ini menghadirkan dosen pembimbing yang berpengalaman dalam membimbing penelitian mahasiswa. Peserta dibekali dengan teknik penulisan proposal yang baik, cara mencari referensi ilmiah, dan tips mengikuti hibah penelitian.

"Workshop ini sangat membantu kami memahami struktur proposal yang benar," ujar salah satu peserta, Rini Wulandari.', 
 'Kegiatan', NULL, '2025-12-06');

-- =============================================
-- 3. DIVISIONS (Divisi)
-- =============================================
INSERT INTO divisions (name, slug, description, work_programs, members) VALUES
('Divisi Kaderisasi', 'kaderisasi', 
 'Divisi yang bertanggung jawab dalam pembinaan dan pengembangan anggota IMADIKSI serta rekrutmen anggota baru.',
 ARRAY['Orientasi Anggota Baru', 'Pelatihan Kepemimpinan', 'Mentoring Program', 'Evaluasi Kinerja Anggota'],
 '[{"name": "Ahmad Fadli", "role": "Koordinator"}, {"name": "Siti Aisyah", "role": "Sekretaris"}, {"name": "Budi Santoso", "role": "Anggota"}]'::jsonb),

('Divisi Akademik', 'akademik', 
 'Divisi yang fokus pada pengembangan kemampuan akademik dan intelektual anggota IMADIKSI.',
 ARRAY['Bimbingan Belajar', 'Workshop Penulisan Ilmiah', 'Diskusi Akademik', 'Pendampingan Lomba Karya Tulis'],
 '[{"name": "Nur Hidayat", "role": "Koordinator"}, {"name": "Dewi Lestari", "role": "Sekretaris"}, {"name": "Riko Pratama", "role": "Anggota"}]'::jsonb),

('Divisi Humas & Komunikasi', 'humas', 
 'Divisi yang mengelola hubungan eksternal dan internal serta dokumentasi kegiatan organisasi.',
 ARRAY['Pengelolaan Media Sosial', 'Dokumentasi Kegiatan', 'Kerjasama Eksternal', 'Publikasi Berita'],
 '[{"name": "Rina Safitri", "role": "Koordinator"}, {"name": "Andi Putra", "role": "Fotografer"}, {"name": "Mega Wati", "role": "Content Creator"}]'::jsonb),

('Divisi Sosial & Pengabdian', 'sosial', 
 'Divisi yang mengkoordinasikan kegiatan sosial dan pengabdian kepada masyarakat.',
 ARRAY['Bakti Sosial', 'Desa Binaan', 'Penggalangan Dana', 'Kampanye Sosial'],
 '[{"name": "Fajar Ramadhan", "role": "Koordinator"}, {"name": "Sri Wahyuni", "role": "Sekretaris"}, {"name": "Doni Saputra", "role": "Anggota"}]'::jsonb),

('Divisi Kewirausahaan', 'kewirausahaan', 
 'Divisi yang mengembangkan jiwa entrepreneurship dan kemandirian finansial anggota.',
 ARRAY['Seminar Kewirausahaan', 'Bazaar UMKM', 'Pelatihan Bisnis Online', 'Inkubator Bisnis Mahasiswa'],
 '[{"name": "Hendra Wijaya", "role": "Koordinator"}, {"name": "Fitri Handayani", "role": "Anggota"}, {"name": "Yoga Pratama", "role": "Anggota"}]'::jsonb);

-- =============================================
-- 4. GALLERY (Galeri)
-- =============================================
INSERT INTO gallery (title, category, image_url) VALUES
('Pelatihan Kepemimpinan 2025', 'Kegiatan', 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800'),
('Seminar Kewirausahaan', 'Kegiatan', 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800'),
('Bakti Sosial Desember 2025', 'Sosial', 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800'),
('Silaturahmi Anggota', 'Kegiatan', 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800'),
('Workshop Penulisan Ilmiah', 'Akademik', 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800'),
('Wisuda Alumni IMADIKSI', 'Prestasi', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800'),
('Rapat Kerja Tahunan', 'Organisasi', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800'),
('Kompetisi Debat Internal', 'Akademik', 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800');

-- =============================================
-- 5. EVENTS (Agenda)
-- =============================================
INSERT INTO events (title, date, location) VALUES
('Rapat Rutin Bulanan', '2026-01-10', 'Ruang Rapat Lt. 2 Gedung Rektorat'),
('Workshop Penulisan Proposal', '2026-01-15', 'Aula Fakultas Tarbiyah'),
('Bimbingan Belajar Statistika', '2026-01-18', 'Ruang Kelas 301'),
('Seminar Kewirausahaan Digital', '2026-02-20', 'Auditorium Utama UIN RF'),
('Bakti Sosial ke Panti Asuhan', '2026-02-28', 'Panti Asuhan Al-Falah'),
('Lomba Essay Nasional (Persiapan)', '2026-03-01', 'Sekretariat IMADIKSI'),
('Kompetisi Internal IMADIKSI', '2026-03-05', 'Gedung Serbaguna'),
('Pelatihan Public Speaking', '2026-03-15', 'Ruang Seminar Fakultas Ushuluddin');

-- Selesai! Data dummy berhasil ditambahkan.
