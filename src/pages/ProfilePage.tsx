import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Separator } from '../components/ui/separator';
import { useAuth } from '../contexts/AuthContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner@2.0.3';
import { User, MapPin, Package, Heart, LogOut, Mail, Phone, ShoppingCart, X } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Badge } from '../components/ui/badge';

export function ProfilePage() {
  const { user, isAuthenticated, signOut, updateProfile } = useAuth();
  const { items: wishlistItems, removeItem: removeFromWishlist } = useWishlist();
  const { addItem: addToCart } = useCart();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    postcode: user?.address?.postcode || '',
    country: user?.address?.country || 'New Zealand',
  });

  if (!isAuthenticated) {
    navigate('/signin');
    return null;
  }

  const handleSave = () => {
    updateProfile({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: {
        street: formData.street,
        city: formData.city,
        postcode: formData.postcode,
        country: formData.country,
      },
    });
    setIsEditing(false);
    toast.success('Profile updated', {
      description: 'Your profile has been updated successfully.',
    });
  };

  const handleSignOut = () => {
    signOut();
    toast.success('Signed out', {
      description: 'You have been signed out successfully.',
    });
    navigate('/');
  };

  // Mock order history
  const orders = [
    {
      id: '1001',
      date: '2024-11-15',
      total: 350,
      status: 'Delivered',
      items: 2,
    },
    {
      id: '1002',
      date: '2024-10-28',
      total: 185,
      status: 'Delivered',
      items: 1,
    },
  ];

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="mb-2">My Account</h1>
            <p className="text-muted-foreground">
              Manage your profile, orders, and preferences
            </p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Personal Information
                      </CardTitle>
                      <CardDescription>
                        Update your personal details and contact information
                      </CardDescription>
                    </div>
                    {!isEditing ? (
                      <Button variant="outline" onClick={() => setIsEditing(true)}>
                        Edit
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleSave}>Save</Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({ ...formData, firstName: e.target.value })
                        }
                        disabled={!isEditing}
                        className="bg-input-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        disabled={!isEditing}
                        className="bg-input-background"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        disabled={!isEditing}
                        className="pl-10 bg-input-background"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        disabled={!isEditing}
                        className="pl-10 bg-input-background"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Shipping Address
                  </CardTitle>
                  <CardDescription>
                    Your default shipping address
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="street">Street Address</Label>
                    <Input
                      id="street"
                      value={formData.street}
                      onChange={(e) =>
                        setFormData({ ...formData, street: e.target.value })
                      }
                      disabled={!isEditing}
                      className="bg-input-background"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        disabled={!isEditing}
                        className="bg-input-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postcode">Postcode</Label>
                      <Input
                        id="postcode"
                        value={formData.postcode}
                        onChange={(e) =>
                          setFormData({ ...formData, postcode: e.target.value })
                        }
                        disabled={!isEditing}
                        className="bg-input-background"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) =>
                        setFormData({ ...formData, country: e.target.value })
                      }
                      disabled={!isEditing}
                      className="bg-input-background"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full md:w-auto"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Order History
                  </CardTitle>
                  <CardDescription>
                    View your past orders and track current shipments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="space-y-1 mb-4 sm:mb-0">
                          <p className="font-medium">Order #{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.date).toLocaleDateString('en-NZ', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                          <p className="text-sm">{order.items} item(s)</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-medium">${order.total.toFixed(2)}</p>
                            <p className="text-sm text-muted-foreground">{order.status}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Wishlist Tab */}
            <TabsContent value="wishlist" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    My Wishlist
                    <Badge variant="secondary">{wishlistItems.length}</Badge>
                  </CardTitle>
                  <CardDescription>
                    Your saved fragrances and gift sets
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {wishlistItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {wishlistItems.map((item) => (
                        <div
                          key={item.id}
                          className="group relative border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                        >
                          <button
                            onClick={() => {
                              removeFromWishlist(item.id);
                              toast.success('Removed from wishlist');
                            }}
                            className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground"
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <div 
                            className="cursor-pointer"
                            onClick={() => navigate(`/product/${item.id}`)}
                          >
                            <ImageWithFallback
                              src={item.image}
                              alt={item.name}
                              className="w-full h-48 object-cover"
                            />
                          </div>
                          <div className="p-4 space-y-3">
                            <div>
                              <h3 className="text-sm mb-1">{item.name}</h3>
                              <p className="text-xs text-muted-foreground mb-1">{item.category}</p>
                              <p>${item.price}</p>
                              {!item.inStock && (
                                <Badge variant="destructive" className="text-xs mt-1">Out of Stock</Badge>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                className="flex-1"
                                disabled={!item.inStock}
                                onClick={() => {
                                  addToCart({
                                    id: item.id,
                                    name: item.name,
                                    price: item.price,
                                    image: item.image
                                  });
                                  toast.success('Added to cart!');
                                }}
                              >
                                <ShoppingCart className="h-3 w-3 mr-1" />
                                Add to Cart
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => navigate(`/product/${item.id}`)}
                              >
                                View
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="mb-2">Your wishlist is empty</h3>
                      <p className="text-muted-foreground mb-6">
                        Save your favorite fragrances to buy them later
                      </p>
                      <Button onClick={() => navigate('/')}>
                        Browse Products
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}