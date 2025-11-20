import { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { FilterSidebar } from '../components/FilterSidebar';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Filter, Search, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '../components/ui/sheet';
import { allProducts } from '../utils/mockData';

export function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const initialQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts.filter(product => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.notes.some(note => note.toLowerCase().includes(query)) ||
        product.description.toLowerCase().includes(query);

      const matchesNotes = 
        selectedNotes.length === 0 || 
        product.notes.some(note => selectedNotes.includes(note));

      const matchesCategories =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      const matchesBrands =
        selectedBrands.length === 0 ||
        selectedBrands.includes(product.brand);

      return matchesSearch && matchesNotes && matchesCategories && matchesBrands;
    });

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
  }, [searchQuery, selectedNotes, selectedCategories, selectedBrands, sortBy]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: searchQuery });
  };

  const handleClearFilters = () => {
    setSelectedNotes([]);
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSortBy('featured');
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchParams({});
  };

  const activeFiltersCount = selectedNotes.length + selectedCategories.length + selectedBrands.length;

  return (
    <>
      {/* Hero Section with Search */}
      <section className="bg-muted py-12 border-b">
        <div className="container mx-auto px-4">
          <h1 className="mb-6 text-center">Search Fragrances</h1>
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name, brand, notes, or description..."
                className="pl-12 pr-12 h-12 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </form>
          {initialQuery && (
            <p className="text-center text-muted-foreground mt-4">
              Showing results for "<strong>{initialQuery}</strong>"
            </p>
          )}
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
                  <h2 className="mb-1">Search Results</h2>
                  <p className="text-sm text-muted-foreground">
                    {filteredAndSortedProducts.length} product{filteredAndSortedProducts.length !== 1 ? 's' : ''} found
                  </p>
                </div>

                {/* Mobile Filter Button */}
                <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                      {activeFiltersCount > 0 && (
                        <Badge variant="secondary" className="ml-2">
                          {activeFiltersCount}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                      <SheetDescription>
                        Refine your search results
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
              {activeFiltersCount > 0 && (
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
                  {selectedBrands.map(brand => (
                    <Badge key={brand} variant="secondary" className="gap-1">
                      {brand}
                      <button
                        onClick={() => setSelectedBrands(selectedBrands.filter(b => b !== brand))}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              {/* Product Grid */}
              {filteredAndSortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAndSortedProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground mb-4">
                    No products found matching your search
                  </p>
                  <div className="space-x-3">
                    {(activeFiltersCount > 0 || searchQuery) && (
                      <>
                        {activeFiltersCount > 0 && (
                          <Button variant="outline" onClick={handleClearFilters}>
                            Clear Filters
                          </Button>
                        )}
                        {searchQuery && (
                          <Button variant="outline" onClick={handleClearSearch}>
                            Clear Search
                          </Button>
                        )}
                      </>
                    )}
                    <Button onClick={() => navigate('/')}>
                      Browse All Products
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
