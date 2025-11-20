import { useEffect, useState } from 'react';
import { ProductCard } from './ProductCard';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  notes?: string[];
  inStock?: boolean;
}

const RECENTLY_VIEWED_KEY = 'dubaiaroma_recently_viewed';
const MAX_RECENTLY_VIEWED = 8;

export function RecentlyViewed() {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadRecentlyViewed = () => {
      const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
      if (stored) {
        try {
          const products = JSON.parse(stored);
          setRecentProducts(products);
        } catch (error) {
          console.error('Error loading recently viewed:', error);
        }
      }
    };

    loadRecentlyViewed();

    // Listen for storage changes (when a product is viewed)
    const handleStorageChange = () => {
      loadRecentlyViewed();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('recentlyViewedUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('recentlyViewedUpdated', handleStorageChange);
    };
  }, []);

  if (recentProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-[var(--color-sand-50)]">
      <div className="container mx-auto px-4">
        <h2 className="mb-8">Recently Viewed</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {recentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Utility function to add a product to recently viewed
export function addToRecentlyViewed(product: Product) {
  try {
    const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
    let recentProducts: Product[] = stored ? JSON.parse(stored) : [];

    // Remove the product if it already exists
    recentProducts = recentProducts.filter(p => p.id !== product.id);

    // Add to the beginning
    recentProducts.unshift(product);

    // Keep only the most recent items
    if (recentProducts.length > MAX_RECENTLY_VIEWED) {
      recentProducts = recentProducts.slice(0, MAX_RECENTLY_VIEWED);
    }

    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(recentProducts));

    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('recentlyViewedUpdated'));
  } catch (error) {
    console.error('Error adding to recently viewed:', error);
  }
}
