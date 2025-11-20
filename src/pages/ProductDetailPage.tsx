import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Textarea } from '../components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import {
  ChevronLeft,
  ShoppingCart,
  Heart,
  MapPin,
  Package,
  Shield,
  Truck,
  Star,
  Share2,
  ThumbsUp
} from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { mockReviews, Review } from '../utils/mockData';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useProducts } from '../contexts/ProductsContext';
import { toast } from 'sonner';

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products: allProducts } = useProducts();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showStoreDialog, setShowStoreDialog] = useState(false);
  const [showClickCollect, setShowClickCollect] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [helpfulReviews, setHelpfulReviews] = useState<Set<number>>(new Set());

  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  const product = allProducts.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="mb-4">Product Not Found</h2>
        <Button onClick={() => navigate('/')}>Return to Home</Button>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const productReviews = mockReviews.filter(r => r.productId === product.id);
  const averageRating = productReviews.length > 0
    ? productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length
    : 5;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.size,
      brand: product.brand,
      quantity
    });
    toast.success(`${quantity} x ${product.name} added to cart!`);
  };

  const handleWishlistToggle = () => {
    toggleItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      inStock: product.inStock
    });
    
    if (inWishlist) {
      toast.success('Removed from wishlist');
    } else {
      toast.success('Added to wishlist');
    }
  };

  const handleReviewSubmit = () => {
    toast.success('Thank you for your review!');
    setReviewText('');
    setReviewRating(5);
  };

  const handleHelpfulClick = (reviewId: number) => {
    setHelpfulReviews(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link to={`/${product.category.toLowerCase().replace(/'/g, '').replace(/ /g, '-')}`} className="hover:text-foreground transition-colors">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6 -ml-2"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden border bg-muted/30">
                <ImageWithFallback
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === idx ? 'border-primary' : 'border-transparent hover:border-border'
                      }`}
                    >
                      <ImageWithFallback
                        src={img}
                        alt={`${product.name} ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wide">{product.category}</p>
                <h1 className="mb-2">{product.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${
                          i < Math.round(averageRating) 
                            ? 'fill-primary text-primary' 
                            : 'text-muted-foreground'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">({productReviews.length} reviews)</span>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-3xl">${product.price}</p>
                  <Badge variant={product.inStock ? "secondary" : "destructive"}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                  {product.isPopular && <Badge>Popular</Badge>}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-3">Description</h3>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Size</p>
                  <p>{product.size}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Concentration</p>
                  <p>{product.concentration}</p>
                </div>
              </div>

              <Separator />

              {/* Quantity & Actions */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <p className="text-sm">Quantity</p>
                  <div className="flex items-center border rounded-md">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-muted transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 hover:bg-muted transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button size="lg" className="w-full" disabled={!product.inStock} onClick={handleAddToCart}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button size="lg" variant="outline" className="w-full" onClick={handleWishlistToggle}>
                    <Heart className={`h-4 w-4 mr-2 ${inWishlist ? 'fill-current text-red-500' : ''}`} />
                    {inWishlist ? 'In Wishlist' : 'Wishlist'}
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => setShowStoreDialog(true)}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Check in Store
                  </Button>
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => setShowClickCollect(true)}
                  >
                    <Package className="h-4 w-4 mr-2" />
                    Click & Collect
                  </Button>
                </div>

                <Button variant="ghost" className="w-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>

              <Separator />

              {/* Features */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="h-5 w-5 text-secondary" />
                  <span>100% Authentic Guaranteed</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Truck className="h-5 w-5 text-secondary" />
                  <span>Free Shipping on Orders Over $150</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Package className="h-5 w-5 text-secondary" />
                  <span>Ready for Click & Collect in 2 Hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fragrance Notes & Reviews Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="notes" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                <TabsTrigger value="notes" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                  Fragrance Notes
                </TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                  Reviews ({productReviews.length})
                </TabsTrigger>
                <TabsTrigger value="details" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                  Additional Details
                </TabsTrigger>
              </TabsList>

              <TabsContent value="notes" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-3">
                    <h4>Top Notes</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.topNotes.map(note => (
                        <Badge key={note} variant="secondary">{note}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4>Middle Notes</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.middleNotes.map(note => (
                        <Badge key={note} variant="secondary">{note}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4>Base Notes</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.baseNotes.map(note => (
                        <Badge key={note} variant="secondary">{note}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-8">
                <div className="space-y-8">
                  {/* Review Summary */}
                  <div className="bg-muted/30 p-6 rounded-lg">
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-4xl mb-2">{averageRating.toFixed(1)}</div>
                        <div className="flex items-center mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${
                                i < Math.round(averageRating) 
                                  ? 'fill-primary text-primary' 
                                  : 'text-muted-foreground'
                              }`} 
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">{productReviews.length} reviews</p>
                      </div>
                      <Separator orientation="vertical" className="h-20" />
                      <div className="flex-1">
                        {[5, 4, 3, 2, 1].map(rating => {
                          const count = productReviews.filter(r => r.rating === rating).length;
                          const percentage = productReviews.length > 0 ? (count / productReviews.length) * 100 : 0;
                          return (
                            <div key={rating} className="flex items-center gap-3 mb-2">
                              <span className="text-sm w-8">{rating} ★</span>
                              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-primary transition-all"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-sm text-muted-foreground w-8">{count}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Write a Review */}
                  <div className="border rounded-lg p-6">
                    <h3 className="mb-4">Write a Review</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm mb-2 block">Rating</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map(rating => (
                            <button
                              key={rating}
                              onClick={() => setReviewRating(rating)}
                              className="transition-colors"
                            >
                              <Star 
                                className={`h-6 w-6 ${
                                  rating <= reviewRating 
                                    ? 'fill-primary text-primary' 
                                    : 'text-muted-foreground'
                                }`} 
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm mb-2 block">Your Review</label>
                        <Textarea
                          placeholder="Share your experience with this fragrance..."
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          rows={4}
                        />
                      </div>
                      <Button onClick={handleReviewSubmit} disabled={!reviewText.trim()}>
                        Submit Review
                      </Button>
                    </div>
                  </div>

                  {/* Reviews List */}
                  <div className="space-y-6">
                    {productReviews.map(review => (
                      <div key={review.id} className="border-b pb-6 last:border-0">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span>{review.userName}</span>
                              {review.verified && (
                                <Badge variant="secondary" className="text-xs">Verified Purchase</Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`h-3 w-3 ${
                                      i < review.rating 
                                        ? 'fill-primary text-primary' 
                                        : 'text-muted-foreground'
                                    }`} 
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {new Date(review.date).toLocaleDateString('en-NZ', { 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-3">{review.comment}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleHelpfulClick(review.id)}
                          className={helpfulReviews.has(review.id) ? 'text-primary' : ''}
                        >
                          <ThumbsUp className={`h-3 w-3 mr-1 ${helpfulReviews.has(review.id) ? 'fill-current' : ''}`} />
                          Helpful ({review.helpful + (helpfulReviews.has(review.id) ? 1 : 0)})
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="details" className="mt-8">
                <div className="space-y-4 max-w-2xl">
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-muted-foreground">Brand</span>
                    <span>{product.brand}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-muted-foreground">Size</span>
                    <span>{product.size}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-muted-foreground">Concentration</span>
                    <span>{product.concentration}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-muted-foreground">Category</span>
                    <span>{product.category}</span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-muted/30 border-t">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Store Availability Dialog */}
      <Dialog open={showStoreDialog} onOpenChange={setShowStoreDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Check Store Availability</DialogTitle>
            <DialogDescription>
              {product.name} - {product.size}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="flex items-start gap-4 p-4 border rounded-lg">
              <MapPin className="h-5 w-5 text-secondary mt-1" />
              <div className="flex-1">
                <h4 className="mb-1">Auckland CBD Store</h4>
                <p className="text-sm text-muted-foreground mb-2">123 Queen Street, Auckland 1010</p>
                <Badge variant="secondary">{product.inStock ? 'In Stock - 5 available' : 'Out of Stock'}</Badge>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStoreDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Click & Collect Dialog */}
      <Dialog open={showClickCollect} onOpenChange={setShowClickCollect}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Click & Collect</DialogTitle>
            <DialogDescription>
              Ready for pickup in 2 hours at our Auckland store
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg space-y-2">
              <p className="text-sm">Pickup Location</p>
              <p>Auckland CBD Store</p>
              <p className="text-sm text-muted-foreground">123 Queen Street, Auckland 1010</p>
            </div>
            <div className="p-4 border rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Product</span>
                <span>{product.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Quantity</span>
                <span>{quantity}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span>Total</span>
                <span className="text-lg">${product.price * quantity}</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowClickCollect(false)}>Cancel</Button>
            <Button onClick={() => {
              handleAddToCart();
              setShowClickCollect(false);
            }}>Confirm Pickup</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}