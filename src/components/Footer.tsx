import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from 'figma:asset/1a25be5b0000f72d7e6946a94dc24f6ab7b3130a.png';

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-serif tracking-wide">Dubai Aroma</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your destination for authentic Arabian and designer fragrances in New Zealand.
            </p>
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
              <li><Link to="/gift-card" className="text-muted-foreground hover:text-foreground transition-colors">Gift Cards</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="mb-4 uppercase text-sm tracking-wide">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping-returns" className="text-muted-foreground hover:text-foreground transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/stores" className="text-muted-foreground hover:text-foreground transition-colors">Store Locator</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Track Order</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 uppercase text-sm tracking-wide">Visit Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Westfield Manukau<br />1 Leyton Way, Auckland 2104</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:02041792292" className="hover:text-foreground transition-colors">
                  02041792292
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:dubai.aromanz@gmail.com" className="hover:text-foreground transition-colors">
                  dubai.aromanz@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; 2025 Dubai Aroma. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm">
              <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms & Conditions
              </Link>
              <Link to="/shipping-returns" className="text-muted-foreground hover:text-foreground transition-colors">
                Shipping & Returns
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}