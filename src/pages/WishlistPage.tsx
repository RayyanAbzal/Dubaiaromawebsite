import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { Heart, ShoppingCart, X } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { toast } from 'sonner';

export function WishlistPage() {
  const navigate = useNavigate();
  const { items: wishlistItems, removeItem } = useWishlist();
  const { addItem: addToCart } = useCart();

  const handleRemove = (id: number, name: string) => {
    removeItem(id);
    toast.success(`${name} removed from wishlist`);
  };

  const handleAddToCart = (item: typeof wishlistItems[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image
    });
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="h-8 w-8 text-secondary" />
            <h1>My Wishlist</h1>
          </div>
          <p className="text-muted-foreground">
            {wishlistItems.length === 0 
              ? 'Your wishlist is empty' 
              : `${wishlistItems.length} item${wishlistItems.length !== 1 ? 's' : ''} saved`}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {wishlistItems.length > 0 ? (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((item) => (
                <Card 
                  key={item.id}
                  className="group relative overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <button
                    onClick={() => handleRemove(item.id, item.name)}
                    className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground"
                    aria-label="Remove from wishlist"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  <div 
                    className="cursor-pointer"
                    onClick={() => navigate(`/product/${item.id}`)}
                  >
                    <div className="aspect-[3/4] overflow-hidden bg-muted">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  <CardContent className="p-4 space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                        {item.category}
                      </p>
                      <h3 className="text-sm mb-2 line-clamp-2">{item.name}</h3>
                      <p className="text-lg">${item.price}</p>
                      {!item.inStock && (
                        <Badge variant="destructive" className="text-xs mt-2">
                          Out of Stock
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Button 
                        size="sm" 
                        className="w-full"
                        disabled={!item.inStock}
                        onClick={() => handleAddToCart(item)}
                      >
                        <ShoppingCart className="h-3 w-3 mr-2" />
                        Add to Cart
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="w-full"
                        onClick={() => navigate(`/product/${item.id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Summary Card */}
            <Card className="mt-8 max-w-md mx-auto">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted-foreground">Total Items</span>
                  <span className="text-lg">{wishlistItems.length}</span>
                </div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-muted-foreground">Total Value</span>
                  <span className="text-xl">
                    ${wishlistItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                  </span>
                </div>
                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={() => {
                    wishlistItems.forEach(item => {
                      if (item.inStock) {
                        handleAddToCart(item);
                      }
                    });
                    toast.success('All available items added to cart!');
                  }}
                  disabled={wishlistItems.every(item => !item.inStock)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add All to Cart
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center py-16">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <Heart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="mb-3">Your Wishlist is Empty</h2>
            <p className="text-muted-foreground mb-8">
              Save your favorite fragrances to your wishlist and never lose track of them.
            </p>
            <div className="space-y-3">
              <Button size="lg" className="w-full" onClick={() => navigate('/')}>
                Explore Fragrances
              </Button>
              <Button size="lg" variant="outline" className="w-full" onClick={() => navigate('/women')}>
                Shop Women's Collection
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Benefits Section */}
      {wishlistItems.length > 0 && (
        <div className="bg-background border-t py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h4 className="mb-2">Save Your Favorites</h4>
                <p className="text-sm text-muted-foreground">
                  Keep track of fragrances you love
                </p>
              </div>
              <div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <ShoppingCart className="h-6 w-6 text-primary" />
                </div>
                <h4 className="mb-2">Quick Shopping</h4>
                <p className="text-sm text-muted-foreground">
                  Add items to cart with one click
                </p>
              </div>
              <div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Badge className="h-6 w-6 flex items-center justify-center">
                    <span className="text-xs">%</span>
                  </Badge>
                </div>
                <h4 className="mb-2">Price Alerts</h4>
                <p className="text-sm text-muted-foreground">
                  Get notified when items go on sale
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
