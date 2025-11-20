import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  notes: string[];
}

interface SearchBarProps {
  onClose?: () => void;
}

const allProducts: Product[] = [
  {
    id: 1,
    name: 'Oud Royale',
    category: "Men's Fragrances",
    price: 185,
    image: 'https://images.unsplash.com/photo-1737424065216-bc51dd626175?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdWQlMjBmcmFncmFuY2UlMjBib3R0bGV8ZW58MXx8fHwxNzYxNzAwMDE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    notes: ['Oud', 'Amber', 'Sandalwood']
  },
  {
    id: 2,
    name: 'Rose de Damascus',
    category: "Women's Fragrances",
    price: 165,
    image: 'https://images.unsplash.com/photo-1759793499819-bf60128a54b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZnJhZ3JhbmNlJTIwZGlzcGxheXxlbnwxfHx8fDE3NjE2OTk2NDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    notes: ['Rose', 'Jasmine', 'Musk']
  },
  {
    id: 3,
    name: 'Saffron Noir',
    category: 'Unisex',
    price: 145,
    image: 'https://images.unsplash.com/photo-1641926364601-2165cf2304cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXNjdWxpbmUlMjBjb2xvZ25lfGVufDF8fHx8MTc2MTY5OTY0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    notes: ['Saffron', 'Patchouli', 'Vanilla']
  },
  {
    id: 4,
    name: 'Amber Essence',
    category: 'Attar Oils',
    price: 95,
    image: 'https://images.unsplash.com/photo-1604899083099-75cacc0902dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwcGVyZnVtZXxlbnwxfHx8fDE3NjE2OTk2NDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    notes: ['Amber', 'Sandalwood', 'Musk']
  },
  {
    id: 5,
    name: 'Musk Al Tahara',
    category: 'Unisex',
    price: 75,
    image: 'https://images.unsplash.com/photo-1752214939559-ab5e7c86cd85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9yYWwlMjBmcmFncmFuY2V8ZW58MXx8fHwxNjE2NTc3Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    notes: ['Musk', 'Rose']
  },
  {
    id: 6,
    name: 'Bergamot Breeze',
    category: "Women's Fragrances",
    price: 125,
    image: 'https://images.unsplash.com/photo-1659450013573-b2d6b39f916a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwYm90dGxlcyUyMGNvbGxlY3Rpb258ZW58MXx8fHwxNzYxNjM1NTA3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    notes: ['Bergamot', 'Jasmine', 'Vanilla']
  },
  {
    id: 7,
    name: 'Sandalwood Premium',
    category: "Men's Fragrances",
    price: 155,
    image: 'https://images.unsplash.com/photo-1650686036849-ff87bcaa2e9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcmFiaWMlMjBwZXJmdW1lfGVufDF8fHx8MTc2MTU3NTgwMHww&ixlib=rb-4.1.0&q=80&w=1080',
    notes: ['Sandalwood', 'Oud', 'Amber']
  },
  {
    id: 8,
    name: 'Jasmine Nights',
    category: "Women's Fragrances",
    price: 135,
    image: 'https://images.unsplash.com/photo-1734647543247-5ee8bf6f2f3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwc3RvcmUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjE2NTc3Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    notes: ['Jasmine', 'Rose', 'Patchouli']
  }
];

const categories = [
  "Women's Fragrances",
  "Men's Fragrances",
  "Unisex",
  "Attar Oils",
  "Gift Sets"
];

const popularNotes = ['Oud', 'Rose', 'Sandalwood', 'Amber', 'Jasmine', 'Musk', 'Vanilla', 'Bergamot'];

export function SearchBar({ onClose }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = 
      searchQuery.length === 0 ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.notes.some(note => note.toLowerCase().includes(searchQuery.toLowerCase())) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }).slice(0, 6);

  const filteredNotes = popularNotes.filter(note =>
    note.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
    setShowResults(false);
    setSearchQuery('');
    onClose?.();
  };

  const handleCategoryClick = (category: string) => {
    const categoryPath = category.toLowerCase().replace(/'/g, '').replace(/ /g, '-');
    navigate(`/${categoryPath}`);
    setShowResults(false);
    setSearchQuery('');
    onClose?.();
  };

  const handleNoteSearch = (note: string) => {
    setSearchQuery(note);
    setShowResults(true);
  };

  const handleViewAllResults = () => {
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    setShowResults(false);
    onClose?.();
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search fragrances, notes, or brands..."
          className="pl-10 pr-10 bg-input-background"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => setShowResults(true)}
          autoFocus
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border rounded-lg shadow-lg max-h-[500px] overflow-y-auto z-50">
          {/* Category Filters */}
          <div className="p-4 border-b bg-muted/30">
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Categories</p>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedCategory === null ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(null)}
              >
                All
              </Badge>
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Popular Notes */}
          {searchQuery.length > 0 && filteredNotes.length > 0 && (
            <div className="p-4 border-b">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Search by Note</p>
              <div className="flex flex-wrap gap-2">
                {filteredNotes.map((note) => (
                  <Badge
                    key={note}
                    variant="secondary"
                    className="cursor-pointer hover:bg-secondary/80"
                    onClick={() => handleNoteSearch(note)}
                  >
                    {note}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Products */}
          <div className="p-2">
            {filteredProducts.length > 0 ? (
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wide text-muted-foreground px-2 py-2">Products</p>
                {filteredProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-muted transition-colors text-left"
                  >
                    <div className="w-12 h-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </div>
                    <p className="text-sm">${product.price}</p>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 px-4">
                <p className="text-muted-foreground mb-4">No products found</p>
                <p className="text-sm text-muted-foreground">Try browsing our categories:</p>
                <div className="flex flex-wrap gap-2 mt-3 justify-center">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant="outline"
                      className="cursor-pointer hover:bg-secondary hover:text-secondary-foreground"
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* View All Results */}
          {filteredProducts.length > 0 && (
            <div className="p-4 border-t">
              <button
                onClick={handleViewAllResults}
                className="w-full text-sm text-muted-foreground hover:text-foreground"
              >
                View all results
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}