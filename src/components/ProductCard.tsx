import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Heart, Store, Package } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

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
  const [deliveryMethod, setDeliveryMethod] = useState('delivery');
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
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{category}</p>
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
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full"
                disabled={!inStock}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowStoreDialog(true);
                  setDeliveryMethod('collect');
                }}
              >
                <Package className="h-4 w-4 mr-2" />
                Click & Collect
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Store Availability Dialog */}
      <Dialog open={showStoreDialog} onOpenChange={setShowStoreDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{name}</DialogTitle>
            <DialogDescription>Check availability and delivery options</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Store Availability */}
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <div className="flex items-start gap-3">
                <Store className="h-5 w-5 text-secondary mt-0.5" />
                <div>
                  <h4 className="mb-1">Auckland Store</h4>
                  <p className="text-sm text-muted-foreground">123 Queen Street, Auckland CBD</p>
                  <p className="text-sm mt-2">
                    {inStock ? (
                      <span className="text-green-600">✓ In Stock - Available Now</span>
                    ) : (
                      <span className="text-destructive">Out of Stock</span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Delivery Method */}
            {inStock && (
              <div className="space-y-3">
                <h4 className="text-sm">Choose your option:</h4>
                <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
                  <div className="flex items-start space-x-3 border rounded-lg p-3">
                    <RadioGroupItem value="delivery" id="delivery" className="mt-1" />
                    <Label htmlFor="delivery" className="cursor-pointer flex-1">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Package className="h-4 w-4" />
                          <span>Home Delivery</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Delivery in 2-3 business days
                        </p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3 border rounded-lg p-3">
                    <RadioGroupItem value="collect" id="collect" className="mt-1" />
                    <Label htmlFor="collect" className="cursor-pointer flex-1">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Store className="h-4 w-4" />
                          <span>Click & Collect</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Ready for pickup in 2 hours
                        </p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            <Button className="w-full" disabled={!inStock}>
              {deliveryMethod === 'collect' ? 'Reserve for Pickup' : 'Add to Cart'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}