import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { X } from 'lucide-react';

interface FilterSidebarProps {
  selectedNotes: string[];
  selectedCategories: string[];
  selectedBrands: string[];
  sortBy: string;
  onNotesChange: (notes: string[]) => void;
  onCategoriesChange: (categories: string[]) => void;
  onBrandsChange: (brands: string[]) => void;
  onSortChange: (sort: string) => void;
  onClearFilters: () => void;
}

export function FilterSidebar({
  selectedNotes = [],
  selectedCategories = [],
  selectedBrands = [],
  sortBy = 'featured',
  onNotesChange,
  onCategoriesChange,
  onBrandsChange,
  onSortChange,
  onClearFilters
}: FilterSidebarProps) {
  const notes = [
    'Oud', 'Rose', 'Sandalwood', 'Amber', 'Musk',
    'Jasmine', 'Vanilla', 'Bergamot', 'Patchouli', 'Saffron'
  ];

  const categories = [
    'Men\'s Fragrances',
    'Women\'s Fragrances',
    'Unisex',
    'Attar Oils',
    'Gift Sets'
  ];

  const brands = [
    'Dubai Aroma Signature',
    'Arabian Nights',
    'Luxury Essence',
    'Oriental Collection',
    'Desert Rose',
    'Royal Oud'
  ];

  const handleNoteToggle = (note: string) => {
    if (selectedNotes.includes(note)) {
      onNotesChange(selectedNotes.filter(n => n !== note));
    } else {
      onNotesChange([...selectedNotes, note]);
    }
  };

  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoriesChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoriesChange([...selectedCategories, category]);
    }
  };

  const handleBrandToggle = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      onBrandsChange(selectedBrands.filter(b => b !== brand));
    } else {
      onBrandsChange([...selectedBrands, brand]);
    }
  };

  const hasActiveFilters = selectedNotes.length > 0 || selectedCategories.length > 0 || selectedBrands.length > 0 || sortBy !== 'featured';

  return (
    <div className="w-full lg:w-64 space-y-6">
      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Active Filters</span>
          <button
            onClick={onClearFilters}
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            <X className="h-3 w-3" />
            Clear All
          </button>
        </div>
      )}

      {/* Sort By */}
      <div className="space-y-3">
        <h3 className="text-sm uppercase tracking-wide">Sort By</h3>
        <RadioGroup value={sortBy} onValueChange={onSortChange}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="featured" id="featured" />
            <Label htmlFor="featured" className="cursor-pointer">Featured</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="popular" id="popular" />
            <Label htmlFor="popular" className="cursor-pointer flex items-center gap-2">
              Most Popular
              <Badge variant="secondary" className="text-xs">New</Badge>
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="price-low" id="price-low" />
            <Label htmlFor="price-low" className="cursor-pointer">Price: Low to High</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="price-high" id="price-high" />
            <Label htmlFor="price-high" className="cursor-pointer">Price: High to Low</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="newest" id="newest" />
            <Label htmlFor="newest" className="cursor-pointer">Newest Arrivals</Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      {/* Categories */}
      <div className="space-y-3">
        <h3 className="text-sm uppercase tracking-wide">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryToggle(category)}
              />
              <Label
                htmlFor={`category-${category}`}
                className="cursor-pointer"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Brands */}
      <div className="space-y-3">
        <h3 className="text-sm uppercase tracking-wide">Brands</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => handleBrandToggle(brand)}
              />
              <Label
                htmlFor={`brand-${brand}`}
                className="cursor-pointer"
              >
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Fragrance Notes */}
      <div className="space-y-3">
        <h3 className="text-sm uppercase tracking-wide">Fragrance Notes</h3>
        <div className="space-y-2">
          {notes.map((note) => (
            <div key={note} className="flex items-center space-x-2">
              <Checkbox
                id={`note-${note}`}
                checked={selectedNotes.includes(note)}
                onCheckedChange={() => handleNoteToggle(note)}
              />
              <Label
                htmlFor={`note-${note}`}
                className="cursor-pointer"
              >
                {note}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}