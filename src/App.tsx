import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import Testimonials from './components/Testimonials';
import InstagramFeed from './components/InstagramFeed';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import ProductPage from './pages/ProductPage';
import BundlesPage from './pages/BundlesPage';
import CheckoutPage from './pages/CheckoutPage';
import CollectionsPage from './pages/CollectionsPage';
import NewPage from './pages/NewPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import CareersPage from './pages/CareersPage';
import PressPage from './pages/PressPage';
import SupportPage from './pages/SupportPage';
import LegalPage from './pages/LegalPage';
import { CartProvider } from './context/CartContext';
import AdminPage from './pages/AdminPage';
import BackToTop from './components/BackToTop';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <CartProvider>
          <div className="min-h-screen bg-black text-white">
          <Navbar />
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <FeaturedProducts />
                <Testimonials />
                <InstagramFeed />
                <Newsletter />
              </>
            } />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/bundles" element={<BundlesPage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/new" element={<NewPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/press" element={<PressPage />} />
            <Route path="/support/:section" element={<SupportPage />} />
            <Route path="/legal/:section" element={<LegalPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/admin/*" element={<AdminPage />} />
          </Routes>
          <Footer />
          <BackToTop />
        </div>
        </CartProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;
