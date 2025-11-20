import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { stores } from '../utils/mockData';
import { Button } from './ui/button';
import { Heart, Store } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from './ui/dialog';

interface ProductCardProps {
  id?: number;
  name: string;
  category: string;
  price: number;
  image: string;
  notes?: string[];
  inStock?: boolean;
  isPopular?: boolean;
  brand?: string;
  size?: string;
}

export function ProductCard({ 
  id,
  name, 
  category, 
  price, 
  image, 
  notes = [],
  inStock = true,
  isPopular = false,
  brand,
  size
}: ProductCardProps) {
  const [showStoreDialog, setShowStoreDialog] = useState(false);
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  const inWishlist = id ? isInWishlist(id) : false;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!id) return;
    
    addItem({
      id,
      name,
      price,
      image,
      size,
      brand
    });
    toast.success(`${name} added to cart!`);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!id) return;

    toggleItem({
      id,
      name,
      price,
      image,
      category,
      inStock
    });
    
    if (inWishlist) {
      toast.success('Removed from wishlist');
    } else {
      toast.success('Added to wishlist');
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Only navigate if clicking on the card itself, not on buttons
    if (
      e.target === e.currentTarget || 
      (e.target as HTMLElement).tagName === 'IMG' ||
      (e.target as HTMLElement).closest('.card-content')
    ) {
      if (id) {
        navigate(`/product/${id}`);
      }
    }
  };

  return (
    <>
      <Card 
        className="group overflow-hidden border shadow-sm hover:shadow-md transition-all cursor-pointer"
        onClick={handleCardClick}
      >
        <CardContent className="p-0">
          <div className="relative aspect-[3/4] overflow-hidden bg-muted">
            <ImageWithFallback
              src={image}
              alt={name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {isPopular && (
              <Badge className="absolute top-3 left-3 bg-secondary">
                Popular
              </Badge>
            )}
            {!inStock && (
              <Badge variant="destructive" className="absolute top-3 left-3">
                Out of Stock
              </Badge>
            )}
            <button 
              className={`absolute top-3 right-3 rounded-full bg-white p-2 shadow-md transition-all opacity-0 group-hover:opacity-100 ${
                inWishlist ? 'text-red-500' : 'hover:bg-secondary hover:text-white'
              }`}
              onClick={handleWishlistToggle}
            >
              <Heart className={`h-4 w-4 ${inWishlist ? 'fill-current' : ''}`} />
            </button>
          </div>
          <div className="p-4 space-y-3 card-content">
            <div>
              {brand && (
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{brand}</p>
              )}
              <h3 className="line-clamp-1">{name}</h3>
              {notes.length > 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  Notes: {notes.slice(0, 3).join(', ')}
                </p>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-lg">${price}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowStoreDialog(true);
                }}
                className="text-xs text-secondary hover:underline flex items-center gap-1"
              >
                <Store className="h-3 w-3" />
                Check Store
              </button>
            </div>

            <div className="space-y-2">
              <Button 
                size="sm" 
                className="w-full bg-primary hover:bg-primary/90"
                disabled={!inStock}
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Store Availability Dialog */}
      <Dialog open={showStoreDialog} onOpenChange={setShowStoreDialog}>
        <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-base">{name}</DialogTitle>
            <DialogDescription className="text-sm">Check store availability</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-2 py-3">
            {/* Store Availability */}
            {stores.map((store) => (
              <div key={store.id} className="bg-muted p-3 rounded-lg">
                <div className="flex items-start gap-2">
                  <Store className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="mb-1 text-sm">{store.name}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{store.address}, {store.city}</p>
                    <Badge variant="secondary" className="text-xs">
                      {inStock ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStoreDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}