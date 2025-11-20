import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="tracking-[0.3em] uppercase">Dubai Aroma</h3>
            <p className="text-sm text-muted-foreground">
              Your destination for authentic Arabian and designer fragrances in New Zealand.
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-muted-foreground hover:text-secondary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-secondary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-secondary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="mb-4 uppercase text-sm tracking-wide">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/women" className="text-muted-foreground hover:text-foreground transition-colors">Women's Fragrances</Link></li>
              <li><Link to="/men" className="text-muted-foreground hover:text-foreground transition-colors">Men's Fragrances</Link></li>
              <li><Link to="/unisex" className="text-muted-foreground hover:text-foreground transition-colors">Unisex</Link></li>
              <li><Link to="/attar-oils" className="text-muted-foreground hover:text-foreground transition-colors">Attar Oils</Link></li>
              <li><Link to="/gift-sets" className="text-muted-foreground hover:text-foreground transition-colors">Gift Sets</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="mb-4 uppercase text-sm tracking-wide">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Click & Collect</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Track Order</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 uppercase text-sm tracking-wide">Visit Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>123 Queen Street<br />Auckland CBD, 1010</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:+6499999999" className="hover:text-foreground transition-colors">
                  +64 9 999 9999
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:info@dubaiaroma.nz" className="hover:text-foreground transition-colors">
                  info@dubaiaroma.nz
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            &copy; 2025 Dubai Aroma. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
