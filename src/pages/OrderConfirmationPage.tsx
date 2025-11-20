import { useEffect } from 'react';
import { useLocation, useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { CheckCircle2, Package, Mail, MapPin, Truck } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function OrderConfirmationPage() {
  const { orderId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.orderData;

  useEffect(() => {
    // If no order data, redirect to home
    if (!orderData) {
      navigate('/');
    }
  }, [orderData, navigate]);

  if (!orderData) {
    return null;
  }

  const { items, total, deliveryMethod, shippingAddress, customerInfo } = orderData;

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h1 className="mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground">
              Thank you for your order. We've sent a confirmation email to <strong>{customerInfo.email}</strong>
            </p>
          </div>

          {/* Order Details Card */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                  <p className="text-xl">{orderId}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">Order Date</p>
                  <p>{new Date().toLocaleDateString('en-NZ', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</p>
                </div>
              </div>

              <Separator className="mb-6" />

              {/* Delivery Information */}
              <div className="mb-6">
                <h3 className="mb-4">Delivery Information</h3>
                <div className="bg-muted/50 p-4 rounded-lg">
                  {deliveryMethod === 'delivery' ? (
                    <div className="flex items-start gap-3">
                      <Truck className="h-5 w-5 text-secondary mt-0.5" />
                      <div>
                        <p className="mb-1">Home Delivery</p>
                        <p className="text-sm text-muted-foreground">
                          Estimated delivery: {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-NZ', { 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                        {shippingAddress && (
                          <p className="text-sm text-muted-foreground mt-2">
                            {shippingAddress.street}<br />
                            {shippingAddress.city}, {shippingAddress.postcode}<br />
                            {shippingAddress.country}
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3">
                      <Package className="h-5 w-5 text-secondary mt-0.5" />
                      <div>
                        <p className="mb-1">Click & Collect</p>
                        <p className="text-sm text-muted-foreground">
                          Ready for pickup: Today after 2:00 PM
                        </p>
                        <div className="mt-3 flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <p className="text-sm text-muted-foreground">
                            Auckland CBD Store<br />
                            123 Queen Street, Auckland 1010
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Separator className="mb-6" />

              {/* Order Items */}
              <div className="mb-6">
                <h3 className="mb-4">Order Items</h3>
                <div className="space-y-4">
                  {items.map((item: any) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="mb-1">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                        {item.size && (
                          <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p>${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="mb-6" />

              {/* Order Total */}
              <div className="space-y-2">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total</span>
                  <span className="text-xl">${total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="mb-4">What's Next?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-sm">
                    1
                  </div>
                  <div>
                    <p className="mb-1">Order Confirmation</p>
                    <p className="text-sm text-muted-foreground">
                      You'll receive an email confirmation at {customerInfo.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-sm">
                    2
                  </div>
                  <div>
                    <p className="mb-1">
                      {deliveryMethod === 'delivery' ? 'Shipping Updates' : 'Ready for Pickup'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {deliveryMethod === 'delivery' 
                        ? "We'll send you tracking information once your order ships"
                        : "We'll notify you when your order is ready for collection"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-sm">
                    3
                  </div>
                  <div>
                    <p className="mb-1">Enjoy Your Fragrance</p>
                    <p className="text-sm text-muted-foreground">
                      Experience luxury with your new perfume collection
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/profile">
                View Order History
              </Link>
            </Button>
            <Button size="lg" asChild>
              <Link to="/">
                Continue Shopping
              </Link>
            </Button>
          </div>

          {/* Support */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Need help with your order?
            </p>
            <Button variant="link" asChild>
              <a href="mailto:support@dubaiaroma.nz">
                <Mail className="h-4 w-4 mr-2" />
                Contact Support
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
