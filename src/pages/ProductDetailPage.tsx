import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
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
  Share2
} from 'lucide-react';
import { ProductCard } from '../components/ProductCard';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  notes: string[];
  inStock: boolean;
  isPopular: boolean;
  popularity: number;
  description: string;
  size: string;
  concentration: string;
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
  images: string[];
}

const allProducts: Product[] = [
  {
    id: 1,
    name: 'Oud Royale',
    category: "Men's Fragrances",
    price: 185,
    image: 'https://images.unsplash.com/photo-1737424065216-bc51dd626175?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdWQlMjBmcmFncmFuY2UlMjBib3R0bGV8ZW58MXx8fHwxNzYxNzAwMDE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    notes: ['Oud', 'Amber', 'Sandalwood'],
    inStock: true,
    isPopular: true,
    popularity: 95,
    description: 'A majestic blend of rare oud wood and warm amber, Oud Royale embodies luxury and sophistication. This rich, complex fragrance opens with spicy notes before revealing a heart of pure oud and amber, settling into a warm base of sandalwood and vanilla.',
    size: '100ml',
    concentration: 'Eau de Parfum',
    topNotes: ['Saffron', 'Cardamom'],
    middleNotes: ['Oud', 'Amber', 'Rose'],
    baseNotes: ['Sandalwood', 'Vanilla', 'Musk'],
    images: [
      'https://images.unsplash.com/photo-1737424065216-bc51dd626175?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdWQlMjBmcmFncmFuY2UlMjBib3R0bGV8ZW58MXx8fHwxNzYxNzAwMDE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1650686036849-ff87bcaa2e9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcmFiaWMlMjBwZXJmdW1lfGVufDF8fHx8MTc2MTU3NTgwMHww&ixlib=rb-4.1.0&q=80&w=1080'
    ]
  },
  {
    id: 2,
    name: 'Rose de Damascus',
    category: "Women's Fragrances",
    price: 165,
    image: 'https://images.unsplash.com/photo-1759793499819-bf60128a54b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZnJhZ3JhbmNlJTIwZGlzcGxheXxlbnwxfHx8fDE3NjE2OTk2NDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    notes: ['Rose', 'Jasmine', 'Musk'],
    inStock: true,
    isPopular: true,
    popularity: 88,
    description: 'An exquisite tribute to the legendary Damascene rose. This elegant fragrance captures the essence of fresh rose petals with hints of jasmine and a soft musky base.',
    size: '100ml',
    concentration: 'Eau de Parfum',
    topNotes: ['Bergamot', 'Pink Pepper'],
    middleNotes: ['Damascus Rose', 'Jasmine', 'Peony'],
    baseNotes: ['Musk', 'Amber', 'Cedarwood'],
    images: [
      'https://images.unsplash.com/photo-1759793499819-bf60128a54b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZnJhZ3JhbmNlJTIwZGlzcGxheXxlbnwxfHx8fDE3NjE2OTk2NDV8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ]
  },
  {
    id: 3,
    name: 'Saffron Noir',
    category: 'Unisex',
    price: 145,
    image: 'https://images.unsplash.com/photo-1641926364601-2165cf2304cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXNjdWxpbmUlMjBjb2xvZ25lfGVufDF8fHx8MTc2MTY5OTY0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    notes: ['Saffron', 'Patchouli', 'Vanilla'],
    inStock: true,
    isPopular: false,
    popularity: 72,
    description: 'A mysterious and alluring unisex fragrance featuring precious saffron and earthy patchouli, balanced with creamy vanilla.',
    size: '100ml',
    concentration: 'Eau de Parfum',
    topNotes: ['Saffron', 'Nutmeg'],
    middleNotes: ['Patchouli', 'Leather'],
    baseNotes: ['Vanilla', 'Amber', 'Tonka Bean'],
    images: [
      'https://images.unsplash.com/photo-1641926364601-2165cf2304cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXNjdWxpbmUlMjBjb2xvZ25lfGVufDF8fHx8MTc2MTY5OTY0Nnww&ixlib=rb-4.1.0&q=80&w=1080'
    ]
  },
  {
    id: 4,
    name: 'Amber Essence',
    category: 'Attar Oils',
    price: 95,
    image: 'https://images.unsplash.com/photo-1604899083099-75cacc0902dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwcGVyZnVtZXxlbnwxfHx8fDE3NjE2OTk2NDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    notes: ['Amber', 'Sandalwood', 'Musk'],
    inStock: true,
    isPopular: true,
    popularity: 90,
    description: 'A pure attar oil featuring rich amber and sandalwood. Long-lasting and alcohol-free in the traditional Middle Eastern style.',
    size: '12ml',
    concentration: 'Pure Attar Oil',
    topNotes: ['Bergamot'],
    middleNotes: ['Amber', 'Sandalwood'],
    baseNotes: ['Musk', 'Vanilla'],
    images: [
      'https://images.unsplash.com/photo-1604899083099-75cacc0902dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwcGVyZnVtZXxlbnwxfHx8fDE3NjE2OTk2NDV8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ]
  }
];

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showStoreDialog, setShowStoreDialog] = useState(false);
  const [showClickCollect, setShowClickCollect] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const product = allProducts.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="mb-4">Product Not Found</h2>
        <Button onClick={() => navigate('/')}>Return to Home</Button>
      </div>
    );
  }

  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

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
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">(24 reviews)</span>
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
                  <Button size="lg" className="w-full" disabled={!product.inStock}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button size="lg" variant="outline" className="w-full">
                    <Heart className="h-4 w-4 mr-2" />
                    Wishlist
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

          {/* Fragrance Notes Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="notes" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                <TabsTrigger value="notes" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                  Fragrance Notes
                </TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                  Reviews (24)
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
                <div className="text-center py-12 text-muted-foreground">
                  Reviews coming soon
                </div>
              </TabsContent>

              <TabsContent value="details" className="mt-8">
                <div className="space-y-4 max-w-2xl">
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-muted-foreground">Brand</span>
                    <span>Dubai Aroma</span>
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
                <Badge variant="secondary">In Stock - 5 available</Badge>
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
            <Button onClick={() => setShowClickCollect(false)}>Confirm Pickup</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
