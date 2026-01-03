import { Routes, Route } from "react-router-dom";
import { Layout } from "./layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Divisions from "./pages/Divisions";
import Programs from "./pages/Programs";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Organization from "./pages/Organization";
import NotFound from "./pages/NotFound";

// Admin imports
import Login from "./pages/admin/Login";
import AdminLayout from "./layout/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManagePrograms from "./pages/admin/ManagePrograms";
import ManagePosts from "./pages/admin/ManagePosts";
import ManageDivisions from "./pages/admin/ManageDivisions";
import ManageGallery from "./pages/admin/ManageGallery";
import ManageEvents from "./pages/admin/ManageEvents";
import ManageHeroSlides from "./pages/admin/ManageHeroSlides";
import ManageOrganization from "./pages/admin/ManageOrganization";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tentang" element={<About />} />
        <Route path="divisi" element={<Divisions />} />
        <Route path="program" element={<Programs />} />
        <Route path="publikasi" element={<News />} />
        <Route path="publikasi/:slug" element={<NewsDetail />} />
        <Route path="galeri" element={<Gallery />} />
        <Route path="struktur" element={<Organization />} />
        <Route path="kontak" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Admin Login (public) */}
      <Route path="/admin/login" element={<Login />} />

      {/* Admin Protected Routes */}
      <Route path="/admin" element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="programs" element={<ManagePrograms />} />
          <Route path="posts" element={<ManagePosts />} />
          <Route path="divisions" element={<ManageDivisions />} />
          <Route path="gallery" element={<ManageGallery />} />
          <Route path="events" element={<ManageEvents />} />
          <Route path="hero-slides" element={<ManageHeroSlides />} />
          <Route path="organization" element={<ManageOrganization />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
