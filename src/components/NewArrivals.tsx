import { ProductCard } from './ProductCard';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { useRef } from 'react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  notes: string[];
  inStock: boolean;
  isPopular: boolean;
}

const newArrivals: Product[] = [
  {
    id: 10,
    name: 'Velvet Oud',
    category: "Men's Fragrances",
    price: 195,
    image: 'https://images.unsplash.com/photo-1650686036849-ff87bcaa2e9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcmFiaWMlMjBwZXJmdW1lfGVufDF8fHx8MTc2MTU3NTgwMHww&ixlib=rb-4.1.0&q=80&w=1080',
    notes: ['Oud', 'Leather', 'Tobacco'],
    inStock: true,
    isPopular: true
  },
  {
    id: 11,
    name: 'White Musk',
    category: "Women's Fragrances",
    price: 115,
    image: 'https://images.unsplash.com/photo-1752214939559-ab5e7c86cd85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9yYWwlMjBmcmFncmFuY2V8ZW58MXx8fHwxNzYxNjU3NzI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    notes: ['White Musk', 'Cotton', 'Vanilla'],
    inStock: true,
    isPopular: false
  },
  {
    id: 12,
    name: 'Citrus Breeze',
    category: 'Unisex',
    price: 135,
    image: 'https://images.unsplash.com/photo-1659450013573-b2d6b39f916a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwYm90dGxlcyUyMGNvbGxlY3Rpb258ZW58MXx8fHwxNzYxNjM1NTA3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    notes: ['Lemon', 'Bergamot', 'Cedar'],
    inStock: true,
    isPopular: false
  },
  {
    id: 13,
    name: 'Mystic Amber',
    category: 'Attar Oils',
    price: 105,
    image: 'https://images.unsplash.com/photo-1604899083099-75cacc0902dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwcGVyZnVtZXxlbnwxfHx8fDE3NjE2OTk2NDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    notes: ['Amber', 'Myrrh', 'Frankincense'],
    inStock: true,
    isPopular: true
  },
  {
    id: 14,
    name: 'Noir de Noir',
    category: 'Unisex',
    price: 175,
    image: 'https://images.unsplash.com/photo-1641926364601-2165cf2304cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXNjdWxpbmUlMjBjb2xvZ25lfGVufDF8fHx8MTc2MTY5OTY0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    notes: ['Black Rose', 'Truffle', 'Patchouli'],
    inStock: true,
    isPopular: true
  },
  {
    id: 15,
    name: 'Jasmine Absolute',
    category: "Women's Fragrances",
    price: 145,
    image: 'https://images.unsplash.com/photo-1759793499819-bf60128a54b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZnJhZ3JhbmNlJTIwZGlzcGxheXxlbnwxfHx8fDE3NjE2OTk2NDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    notes: ['Jasmine', 'Tuberose', 'Ylang-Ylang'],
    inStock: true,
    isPopular: false
  }
];

export function NewArrivals() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollPosition = scrollContainerRef.current.scrollLeft + 
        (direction === 'left' ? -scrollAmount : scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-secondary" />
              <p className="text-sm uppercase tracking-widest text-muted-foreground">Just Arrived</p>
            </div>
            <h2>New Arrivals</h2>
            <p className="text-muted-foreground">Discover our latest collection of exquisite fragrances</p>
          </div>
          
          {/* Desktop scroll buttons */}
          <div className="hidden lg:flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Scrollable row */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {newArrivals.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-[280px] sm:w-[320px] snap-start">
                <ProductCard {...product} />
              </div>
            ))}
          </div>
          
          {/* Gradient fade on edges */}
          <div className="absolute top-0 left-0 bottom-4 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-4 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>

        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </section>
  );
}
