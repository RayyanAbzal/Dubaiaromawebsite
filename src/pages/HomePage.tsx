import { useState, useMemo } from 'react';
import { ProductCard } from '../components/ProductCard';
import { CategoryCard } from '../components/CategoryCard';
import { Hero } from '../components/Hero';
import { Newsletter } from '../components/Newsletter';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Filter, X } from 'lucide-react';
import { FilterSidebar } from '../components/FilterSidebar';
import { useProducts } from '../contexts/ProductsContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
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

      {/* Store Info */}
      <section className="py-16 bg-card border-y">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-widest text-muted-foreground">Our Promise</p>
              <h2>Experience Authentic Luxury</h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              At Dubai Aroma, we bring you the finest selection of authentic Arabian and international 
              fragrances. Every bottle is carefully sourced to ensure quality and authenticity. 
              Visit our Auckland store or order online with convenient Click & Collect service.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="space-y-2">
                <div className="text-3xl">✓</div>
                <h4>Authentic Products</h4>
                <p className="text-sm text-muted-foreground">100% genuine fragrances</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl">✓</div>
                <h4>Click & Collect</h4>
                <p className="text-sm text-muted-foreground">Ready in 2 hours</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl">✓</div>
                <h4>Expert Advice</h4>
                <p className="text-sm text-muted-foreground">Personalized recommendations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}