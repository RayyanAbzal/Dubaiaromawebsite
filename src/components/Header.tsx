import { ShoppingCart, Search, Menu, User, X, MapPin, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useWishlist } from '../contexts/WishlistContext';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from './ui/sheet';

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();
  const { isAuthenticated } = useAuth();
  const { items: wishlistItems } = useWishlist();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 text-center text-sm">
        <Link to="/stores" className="container mx-auto px-4 flex items-center justify-center gap-2 hover:underline">
          <MapPin className="h-4 w-4" />
          <span>Visit our Auckland store | Click & Collect Available</span>
        </Link>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <SheetHeader>
                  <SheetTitle>Navigation Menu</SheetTitle>
                  <SheetDescription>Browse our fragrance collections</SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-8">
                  <Link 
                    to="/women" 
                    className="py-2 hover:text-secondary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Women's Fragrances
                  </Link>
                  <Link 
                    to="/men" 
                    className="py-2 hover:text-secondary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Men's Fragrances
                  </Link>
                  <Link 
                    to="/unisex" 
                    className="py-2 hover:text-secondary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Unisex
                  </Link>
                  <Link 
                    to="/attar-oils" 
                    className="py-2 hover:text-secondary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Attar Oils
                  </Link>
                  <Link 
                    to="/gift-sets" 
                    className="py-2 hover:text-secondary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Gift Sets
                  </Link>
                  <Link 
                    to="/stores" 
                    className="py-2 hover:text-secondary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Our Stores
                  </Link>
                  <Link 
                    to="/about" 
                    className="py-2 hover:text-secondary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About Us
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-xl tracking-[0.3em] uppercase">Dubai Aroma</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex gap-8 absolute left-1/2 transform -translate-x-1/2">
              <Link 
                to="/women" 
                className={`text-sm transition-colors ${isActive('/women') ? 'text-secondary' : 'hover:text-secondary'}`}
              >
                Women
              </Link>
              <Link 
                to="/men" 
                className={`text-sm transition-colors ${isActive('/men') ? 'text-secondary' : 'hover:text-secondary'}`}
              >
                Men
              </Link>
              <Link 
                to="/unisex" 
                className={`text-sm transition-colors ${isActive('/unisex') ? 'text-secondary' : 'hover:text-secondary'}`}
              >
                Unisex
              </Link>
              <Link 
                to="/attar-oils" 
                className={`text-sm transition-colors ${isActive('/attar-oils') ? 'text-secondary' : 'hover:text-secondary'}`}
              >
                Attar Oils
              </Link>
              <Link 
                to="/gift-sets" 
                className={`text-sm transition-colors ${isActive('/gift-sets') ? 'text-secondary' : 'hover:text-secondary'}`}
              >
                Gift Sets
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Sheet open={searchOpen} onOpenChange={setSearchOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Search className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="top" className="h-auto">
                  <SheetHeader className="sr-only">
                    <SheetTitle>Search</SheetTitle>
                    <SheetDescription>Search for fragrances</SheetDescription>
                  </SheetHeader>
                  <div className="container mx-auto px-4 py-6">
                    <SearchBar onClose={() => setSearchOpen(false)} />
                  </div>
                </SheetContent>
              </Sheet>
              <Link to={isAuthenticated ? "/profile" : "/signin"}>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-secondary text-white text-xs flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>
              <Link to="/wishlist">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="h-5 w-5" />
                  {wishlistItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-secondary text-white text-xs flex items-center justify-center">
                      {wishlistItems.length}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}