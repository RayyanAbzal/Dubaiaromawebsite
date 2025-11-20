import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { AboutPage } from './pages/AboutPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { ProfilePage } from './pages/ProfilePage';
import { CartPage } from './pages/CartPage';
import { Toaster } from './components/ui/sonner';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route 
                  path="/women" 
                  element={
                    <CategoryPage 
                      category="Women's Fragrances"
                      title="Women's Fragrances"
                      description="Discover our exquisite collection of feminine fragrances, from delicate florals to bold orientals. Each perfume tells a unique story of elegance and sophistication."
                    />
                  } 
                />
                <Route 
                  path="/men" 
                  element={
                    <CategoryPage 
                      category="Men's Fragrances"
                      title="Men's Fragrances"
                      description="Explore our premium selection of men's colognes and perfumes. From fresh and sporty to deep and woody, find your signature scent."
                    />
                  } 
                />
                <Route 
                  path="/unisex" 
                  element={
                    <CategoryPage 
                      category="Unisex"
                      title="Unisex Fragrances"
                      description="Experience the versatility of our unisex collection. These captivating scents transcend traditional boundaries, perfect for anyone who appreciates quality."
                    />
                  } 
                />
                <Route 
                  path="/attar-oils" 
                  element={
                    <CategoryPage 
                      category="Attar Oils"
                      title="Attar Oils"
                      description="Discover the ancient art of attar perfumery. Our authentic oil-based fragrances offer long-lasting, alcohol-free scents in the traditional Middle Eastern style."
                    />
                  } 
                />
                <Route 
                  path="/gift-sets" 
                  element={
                    <CategoryPage 
                      category="Gift Sets"
                      title="Gift Sets"
                      description="Find the perfect gift with our curated fragrance sets. Beautifully packaged collections ideal for any special occasion."
                    />
                  } 
                />
                <Route path="/about" element={<AboutPage />} />
                {/* Catch-all route - redirect to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
            <Toaster />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}