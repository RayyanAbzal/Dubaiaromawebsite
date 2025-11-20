import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '../components/ProductCard';
import { CategoryCard } from '../components/CategoryCard';
import { Hero } from '../components/Hero';
import { Newsletter } from '../components/Newsletter';
import { RecentlyViewed } from '../components/RecentlyViewed';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Filter, X, Gift } from 'lucide-react';
import { FilterSidebar } from '../components/FilterSidebar';
import { useProducts } from '../contexts/ProductsContext';
import { Link } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../components/ui/sheet';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  notes?: string[];
  inStock?: boolean;
  isPopular?: boolean;
  popularity?: number;
}

export function HomePage() {
  const { products: allProducts } = useProducts();

  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories = [
    {
      title: 'Women\'s Fragrances',
      image: 'https://images.unsplash.com/photo-1752214939559-ab5e7c86cd85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9yYWwlMjBmcmFncmFuY2V8ZW58MXx8fHwxNzYxNjU3NzI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      productCount: 45,
      href: '/women'
    },
    {
      title: 'Men\'s Fragrances',
      image: 'https://images.unsplash.com/photo-1641926364601-2165cf2304cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXNjdWxpbmUlMjBjb2xvZ25lfGVufDF8fHx8MTc2MTY5OTY0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      productCount: 38,
      href: '/men'
    },
    {
      title: 'Attar Oils',
      image: 'https://images.unsplash.com/photo-1650686036849-ff87bcaa2e9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcmFiaWMlMjBwZXJmdW1lfGVufDF8fHx8MTc2MTU3NTgwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      productCount: 28,
      href: '/attar-oils'
    },
    {
      title: 'Unisex',
      image: 'https://images.unsplash.com/photo-1659450013573-b2d6b39f916a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwYm90dGxlcyUyMGNvbGxlY3Rpb258ZW58MXx8fHwxNzYxNjM1NTA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      productCount: 22,
      href: '/unisex'
    }
  ];

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...allProducts];

    if (selectedNotes.length > 0) {
      filtered = filtered.filter(product =>
        product.notes && product.notes.some(note => selectedNotes.includes(note))
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedCategories.includes(product.category)
      );
    }

    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return filtered;
  }, [selectedNotes, selectedCategories, sortBy]);

  const handleClearFilters = () => {
    setSelectedNotes([]);
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSortBy('featured');
  };

  return (
    <>
      <Hero />

      {/* Categories Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-2">
            <p className="text-sm uppercase tracking-widest text-muted-foreground">Explore</p>
            <h2>Shop by Category</h2>
            <p className="text-muted-foreground">Discover our curated collections</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <CategoryCard key={index} {...category} />
            ))}
          </div>
        </div>
      </section>

      {/* Products Section with Filters */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Filters */}
            <aside className="hidden lg:block flex-shrink-0">
              <div className="sticky top-20">
                <FilterSidebar
                  selectedNotes={selectedNotes}
                  selectedCategories={selectedCategories}
                  selectedBrands={selectedBrands}
                  sortBy={sortBy}
                  onNotesChange={setSelectedNotes}
                  onCategoriesChange={setSelectedCategories}
                  onBrandsChange={setSelectedBrands}
                  onSortChange={setSortBy}
                  onClearFilters={handleClearFilters}
                />
              </div>
            </aside>

            {/* Products */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="mb-1">All Fragrances</h2>
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredAndSortedProducts.length} of {allProducts.length} products
                  </p>
                </div>

                {/* Mobile Filter Button */}
                <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                      {(selectedNotes.length > 0 || selectedCategories.length > 0) && (
                        <Badge variant="secondary" className="ml-2">
                          {selectedNotes.length + selectedCategories.length}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                      <SheetDescription>Find your perfect fragrance</SheetDescription>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterSidebar
                        selectedNotes={selectedNotes}
                        selectedCategories={selectedCategories}
                        selectedBrands={selectedBrands}
                        sortBy={sortBy}
                        onNotesChange={setSelectedNotes}
                        onCategoriesChange={setSelectedCategories}
                        onBrandsChange={setSelectedBrands}
                        onSortChange={setSortBy}
                        onClearFilters={handleClearFilters}
                      />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Active Filters Pills */}
              {(selectedNotes.length > 0 || selectedCategories.length > 0) && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedNotes.map(note => (
                    <Badge key={note} variant="secondary" className="gap-1">
                      {note}
                      <button
                        onClick={() => setSelectedNotes(selectedNotes.filter(n => n !== note))}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  {selectedCategories.map(category => (
                    <Badge key={category} variant="secondary" className="gap-1">
                      {category}
                      <button
                        onClick={() => setSelectedCategories(selectedCategories.filter(c => c !== category))}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>

              {/* No Results */}
              {filteredAndSortedProducts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground mb-4">No products found matching your filters</p>
                  <Button variant="outline" onClick={handleClearFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Gift Card Banner */}
      <section className="py-16 bg-gradient-to-br from-[var(--color-sand-50)] to-[var(--color-sand-100)] border-y">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Content */}
              <div className="space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                  <Gift className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-3">
                  <h2>Give the Gift of Luxury</h2>
                  <p className="text-muted-foreground text-lg">
                    Can't decide on the perfect scent? Let them choose with a Dubai Aroma gift card. 
                    Available in any amount from $10 to $1000.
                  </p>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Instant email delivery directly to recipient</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>No expiry date - use anytime</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Redeemable online and at all store locations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Add a personalized message for that special touch</span>
                  </li>
                </ul>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Button size="lg" asChild>
                    <Link to="/gift-card">
                      <Gift className="h-5 w-5 mr-2" />
                      Purchase Gift Card
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/gift-card">
                      Learn More
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right - Visual */}
              <div className="relative">
                <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
                  <div className="w-full h-full bg-gradient-to-br from-amber-600 to-yellow-700 p-8 flex flex-col justify-between text-white relative overflow-hidden">
                    {/* Background Pattern */}
                    <div 
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&h=500&fit=crop)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-8">
                        <Gift className="h-6 w-6" />
                        <span className="text-lg tracking-[0.3em] uppercase">Dubai Aroma</span>
                      </div>
                      
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
                        <p className="text-sm italic">"For someone special who deserves the finest fragrances"</p>
                      </div>
                    </div>
                    
                    <div className="relative z-10 flex justify-between items-end">
                      <div>
                        <p className="text-sm opacity-90 mb-1">Gift Card Value</p>
                        <p className="text-4xl font-light">Any Amount</p>
                      </div>
                      <div className="text-right text-xs opacity-75">
                        <p>Redeemable anywhere</p>
                        <p>Never expires</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
      <RecentlyViewed />
    </>
  );
}