import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Separator } from '../components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ChevronLeft, CreditCard, Truck, Package, MapPin } from 'lucide-react';
import { toast } from 'sonner';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'collect'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    postcode: user?.address?.postcode || '',
    country: user?.address?.country || 'New Zealand',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    cardName: ''
  });

  const shippingCost = deliveryMethod === 'delivery' ? (totalPrice >= 150 ? 0 : 10) : 0;
  const finalTotal = totalPrice + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.firstName || !formData.lastName) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (deliveryMethod === 'delivery' && (!formData.street || !formData.city || !formData.postcode)) {
      toast.error('Please fill in delivery address');
      return;
    }

    // Generate order ID
    const orderId = `ORD-${Date.now()}`;
    
    // Clear cart and navigate to confirmation
    clearCart();
    navigate(`/order-confirmation/${orderId}`, { 
      state: { 
        orderData: {
          orderId,
          items,
          total: finalTotal,
          deliveryMethod,
          shippingAddress: deliveryMethod === 'delivery' ? {
            street: formData.street,
            city: formData.city,
            postcode: formData.postcode,
            country: formData.country
          } : null,
          customerInfo: {
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone
          }
        }
      }
    });
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="mb-4">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Add some products to proceed to checkout</p>
        <Button onClick={() => navigate('/')}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/cart')}
            className="-ml-2"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Cart
          </Button>
          <h1 className="mt-4">Checkout</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup 
                    value={deliveryMethod} 
                    onValueChange={(value) => setDeliveryMethod(value as 'delivery' | 'collect')}
                  >
                    <div className="flex items-start space-x-3 border rounded-lg p-4 mb-3">
                      <RadioGroupItem value="delivery" id="delivery-method" className="mt-1" />
                      <Label htmlFor="delivery-method" className="cursor-pointer flex-1">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <Truck className="h-5 w-5 text-secondary mt-0.5" />
                            <div>
                              <div className="mb-1">Home Delivery</div>
                              <p className="text-sm text-muted-foreground">
                                2-3 business days • {totalPrice >= 150 ? 'FREE' : '$10'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-start space-x-3 border rounded-lg p-4">
                      <RadioGroupItem value="collect" id="collect-method" className="mt-1" />
                      <Label htmlFor="collect-method" className="cursor-pointer flex-1">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <Package className="h-5 w-5 text-secondary mt-0.5" />
                            <div>
                              <div className="mb-1">Click & Collect</div>
                              <p className="text-sm text-muted-foreground">
                                Ready in 2 hours • FREE
                              </p>
                            </div>
                          </div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              {deliveryMethod === 'delivery' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Address</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="street">Street Address *</Label>
                      <Input
                        id="street"
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="postcode">Postcode *</Label>
                        <Input
                          id="postcode"
                          name="postcode"
                          value={formData.postcode}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        disabled
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Pickup Location */}
              {deliveryMethod === 'collect' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Pickup Location</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                      <MapPin className="h-5 w-5 text-secondary mt-1" />
                      <div>
                        <h4 className="mb-1">Auckland CBD Store</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          123 Queen Street, Auckland 1010
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Mon-Fri: 9AM-6PM • Sat: 10AM-5PM • Sun: 11AM-4PM
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-3 border rounded-lg p-4">
                      <RadioGroupItem value="card" id="card-payment" />
                      <Label htmlFor="card-payment" className="cursor-pointer flex items-center gap-2 flex-1">
                        <CreditCard className="h-4 w-4" />
                        Credit / Debit Card
                      </Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === 'card' && (
                    <div className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                          <Label htmlFor="cardExpiry">Expiry Date</Label>
                          <Input
                            id="cardExpiry"
                            name="cardExpiry"
                            placeholder="MM/YY"
                            value={formData.cardExpiry}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardCVC">CVC</Label>
                          <Input
                            id="cardCVC"
                            name="cardCVC"
                            placeholder="123"
                            value={formData.cardCVC}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Products */}
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {items.map(item => (
                      <div key={item.id} className="flex gap-3">
                        <div className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm truncate">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                          <p className="text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Totals */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span>Total</span>
                      <span className="text-xl">${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Complete Order
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By completing your order, you agree to our Terms & Conditions
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
