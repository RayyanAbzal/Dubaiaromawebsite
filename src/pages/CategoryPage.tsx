import { useState, useMemo } from 'react';
import { ProductCard } from '../components/ProductCard';
import { FilterSidebar } from '../components/FilterSidebar';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Filter, X } from 'lucide-react';
import { useProducts } from '../contexts/ProductsContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '../components/ui/sheet';

interface CategoryPageProps {
  category: string;
  title: string;
  description: string;
}

export function CategoryPage({ category, title, description }: CategoryPageProps) {
  const { products: allProducts } = useProducts();
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts.filter(product => product.category === category);

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