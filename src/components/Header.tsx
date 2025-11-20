import { ShoppingCart, Search, Menu, User, X, MapPin, Heart, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useWishlist } from '../contexts/WishlistContext';
import logo from 'figma:asset/1a25be5b0000f72d7e6946a94dc24f6ab7b3130a.png';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from './ui/sheet';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu';

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { items: wishlistItems } = useWishlist();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Top Bar - Black Friday Promotion */}
      <div className="bg-black text-white py-2 text-center text-sm">
        <div className="container mx-auto px-4">
          <p className="flex items-center justify-center gap-2 flex-wrap">
            <span className="font-semibold">🎉 Black Friday Sale</span>
            <span className="hidden sm:inline">•</span>
            <span>20–29 Nov</span>
            <span className="hidden sm:inline">•</span>
            <span className="font-semibold">15% OFF</span>
            <span className="hidden sm:inline">•</span>
            <span>Use Code: <span className="bg-white text-black px-2 py-0.5 rounded font-mono">BLK29</span></span>
          </p>
        </div>
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
                    to="/gift-card" 
                    className="py-2 hover:text-secondary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Gift Cards
                  </Link>
                  
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">About</p>
                    <div className="flex flex-col gap-3 ml-2">
                      <Link 
                        to="/about" 
                        className="py-2 text-sm hover:text-secondary transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        About Us
                      </Link>
                      <Link 
                        to="/stores" 
                        className="py-2 text-sm hover:text-secondary transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Our Stores
                      </Link>
                      <Link 
                        to="/contact" 
                        className="py-2 text-sm hover:text-secondary transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Contact Us
                      </Link>
                      <Link 
                        to="/shipping-returns" 
                        className="py-2 text-sm hover:text-secondary transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Shipping & Returns
                      </Link>
                      <Link 
                        to="/privacy" 
                        className="py-2 text-sm hover:text-secondary transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Privacy Policy
                      </Link>
                      <Link 
                        to="/terms" 
                        className="py-2 text-sm hover:text-secondary transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Terms & Conditions
                      </Link>
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Dubai Aroma" className="h-16 w-16 hover:opacity-80 transition-opacity" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex gap-6 absolute left-1/2 transform -translate-x-1/2 items-center">
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
              <Link 
                to="/gift-card" 
                className={`text-sm transition-colors ${isActive('/gift-card') ? 'text-secondary' : 'hover:text-secondary'}`}
              >
                Gift Cards
              </Link>
              
              {/* About Dropdown */}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-sm h-auto py-0 px-0 hover:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent hover:text-secondary transition-colors duration-200">
                      About
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] gap-0.5 p-2">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              to="/about"
                              className="block select-none rounded-md px-3 py-2 leading-none no-underline outline-none transition-all duration-200 hover:bg-[var(--color-sand-100)] focus:bg-[var(--color-sand-100)]"
                            >
                              <div className="text-sm">About Us</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              to="/stores"
                              className="block select-none rounded-md px-3 py-2 leading-none no-underline outline-none transition-all duration-200 hover:bg-[var(--color-sand-100)] focus:bg-[var(--color-sand-100)]"
                            >
                              <div className="text-sm">Our Stores</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              to="/contact"
                              className="block select-none rounded-md px-3 py-2 leading-none no-underline outline-none transition-all duration-200 hover:bg-[var(--color-sand-100)] focus:bg-[var(--color-sand-100)]"
                            >
                              <div className="text-sm">Contact Us</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li className="border-t border-[var(--color-sand-200)] my-1"></li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              to="/shipping-returns"
                              className="block select-none rounded-md px-3 py-2 leading-none no-underline outline-none transition-all duration-200 hover:bg-[var(--color-sand-100)] focus:bg-[var(--color-sand-100)]"
                            >
                              <div className="text-sm">Shipping & Returns</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              to="/privacy"
                              className="block select-none rounded-md px-3 py-2 leading-none no-underline outline-none transition-all duration-200 hover:bg-[var(--color-sand-100)] focus:bg-[var(--color-sand-100)]"
                            >
                              <div className="text-sm">Privacy Policy</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              to="/terms"
                              className="block select-none rounded-md px-3 py-2 leading-none no-underline outline-none transition-all duration-200 hover:bg-[var(--color-sand-100)] focus:bg-[var(--color-sand-100)]"
                            >
                              <div className="text-sm">Terms & Conditions</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
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
              {/* Admin Link - only show for admin users */}
              {isAuthenticated && user?.email === 'admin@dubaiaroma.com' && (
                <Link to="/admin/dashboard">
                  <Button variant="ghost" size="icon" title="Admin Dashboard">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}