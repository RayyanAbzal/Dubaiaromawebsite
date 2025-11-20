import { useState, useMemo } from 'react';
import { ProductCard } from '../components/ProductCard';
import { FilterSidebar } from '../components/FilterSidebar';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Filter, X } from 'lucide-react';
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
  brand: string;
  price: number;
  image: string;
  notes: string[];
  inStock: boolean;
  isPopular: boolean;
  popularity: number;
}

const allProducts: Product[] = [
  {
    id: 1,
    name: 'Oud Royale',
    category: "Men's Fragrances",
    brand: 'Royal Oud',
    price: 185,
    image: 'https://images.unsplash.com/photo-1737424065216-bc51dd626175?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdWQlMjBmcmFncmFuY2UlMjBib3R0bGV8ZW58MXx8fHwxNzYxNzAwMDE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    notes: ['Oud', 'Amber', 'Sandalwood'],
    inStock: true,
    isPopular: true,
    popularity: 95
  },
  {
    id: 2,
    name: 'Rose de Damascus',
    category: "Women's Fragrances",
    brand: 'Desert Rose',
    price: 165,
    image: 'https://images.unsplash.com/photo-1759793499819-bf60128a54b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZnJhZ3JhbmNlJTIwZGlzcGxheXxlbnwxfHx8fDE3NjE2OTk2NDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    notes: ['Rose', 'Jasmine', 'Musk'],
    inStock: true,
    isPopular: true,
    popularity: 88
  },
  {
    id: 3,
    name: 'Saffron Noir',
    category: 'Unisex',
    brand: 'Oriental Collection',
    price: 145,
    image: 'https://images.unsplash.com/photo-1641926364601-2165cf2304cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXNjdWxpbmUlMjBjb2xvZ25lfGVufDF8fHx8MTc2MTY5OTY0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    notes: ['Saffron', 'Patchouli', 'Vanilla'],
    inStock: true,
    isPopular: false,
    popularity: 72
  },
  {
    id: 4,
    name: 'Amber Essence',
    category: 'Attar Oils',
    brand: 'Arabian Nights',
    price: 95,
    image: 'https://images.unsplash.com/photo-1604899083099-75cacc0902dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwcGVyZnVtZXxlbnwxfHx8fDE3NjE2OTk2NDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    notes: ['Amber', 'Sandalwood', 'Musk'],
    inStock: true,
    isPopular: true,
    popularity: 90
  },
  {
    id: 5,
    name: 'Musk Al Tahara',
    category: 'Unisex',
    brand: 'Dubai Aroma Signature',
    price: 75,
    image: 'https://images.unsplash.com/photo-1752214939559-ab5e7c86cd85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9yYWwlMjBmcmFncmFuY2V8ZW58MXx8fHwxNzYxNjU3NzI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    notes: ['Musk', 'Rose'],
    inStock: false,
    isPopular: false,
    popularity: 65
  },
  {
    id: 6,
    name: 'Bergamot Breeze',
    category: "Women's Fragrances",
    brand: 'Luxury Essence',
    price: 125,
    image: 'https://images.unsplash.com/photo-1659450013573-b2d6b39f916a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwYm90dGxlcyUyMGNvbGxlY3Rpb258ZW58MXx8fHwxNzYxNjM1NTA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    notes: ['Bergamot', 'Jasmine', 'Vanilla'],
    inStock: true,
    isPopular: false,
    popularity: 78
  },
  {
    id: 7,
    name: 'Sandalwood Premium',
    category: "Men's Fragrances",
    brand: 'Royal Oud',
    price: 155,
    image: 'https://images.unsplash.com/photo-1650686036849-ff87bcaa2e9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcmFiaWMlMjBwZXJmdW1lfGVufDF8fHx8MTc2MTU3NTgwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    notes: ['Sandalwood', 'Oud', 'Amber'],
    inStock: true,
    isPopular: true,
    popularity: 85
  },
  {
    id: 8,
    name: 'Jasmine Nights',
    category: "Women's Fragrances",
    brand: 'Desert Rose',
    price: 135,
    image: 'https://images.unsplash.com/photo-1734647543247-5ee8bf6f2f3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwc3RvcmUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjE2NTc3Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    notes: ['Jasmine', 'Rose', 'Patchouli'],
    inStock: true,
    isPopular: false,
    popularity: 70
  },
  {
    id: 9,
    name: 'Luxury Gift Set',
    category: 'Gift Sets',
    brand: 'Dubai Aroma Signature',
    price: 299,
    image: 'https://images.unsplash.com/photo-1659450013573-b2d6b39f916a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwYm90dGxlcyUyMGNvbGxlY3Rpb258ZW58MXx8fHwxNzYxNjM1NTA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    notes: ['Oud', 'Rose', 'Amber'],
    inStock: true,
    isPopular: true,
    popularity: 92
  }
];

interface CategoryPageProps {
  category: string;
  title: string;
  description: string;
}

export function CategoryPage({ category, title, description }: CategoryPageProps) {
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts.filter(product => product.category === category);

    if (selectedNotes.length > 0) {
      filtered = filtered.filter(product =>
        product.notes.some(note => selectedNotes.includes(note))
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedCategories.includes(product.category)
      );
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product =>
        selectedBrands.includes(product.brand)
      );
    }

    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.popularity - a.popularity);
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
  }, [category, selectedNotes, selectedCategories, selectedBrands, sortBy]);

  const handleClearFilters = () => {
    setSelectedNotes([]);
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSortBy('featured');
  };

  const categoryProducts = allProducts.filter(p => p.category === category);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-muted py-16 border-b">
        <div className="container mx-auto px-4 text-center space-y-4">
          <h1>{title}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
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
                  <h2 className="mb-1">{title}</h2>
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredAndSortedProducts.length} of {categoryProducts.length} products
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
                      <SheetDescription>
                        Find your perfect scent
                      </SheetDescription>
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
                  {selectedCategories.map(cat => (
                    <Badge key={cat} variant="secondary" className="gap-1">
                      {cat}
                      <button
                        onClick={() => setSelectedCategories(selectedCategories.filter(c => c !== cat))}
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
    </>
  );
}