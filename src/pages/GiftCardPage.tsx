import { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Gift, Mail, Printer, CreditCard, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner@2.0.3';

const PRESET_AMOUNTS = [50, 100, 150, 200, 300, 500];

const GIFT_CARD_DESIGNS = [
  {
    id: 'classic',
    name: 'Classic Gold',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&h=500&fit=crop',
    color: 'from-amber-600 to-yellow-700'
  },
  {
    id: 'elegant',
    name: 'Elegant Black',
    image: 'https://images.unsplash.com/photo-1585909695284-32d2985ac9c0?w=800&h=500&fit=crop',
    color: 'from-gray-800 to-black'
  },
  {
    id: 'floral',
    name: 'Rose Garden',
    image: 'https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?w=800&h=500&fit=crop',
    color: 'from-pink-500 to-rose-600'
  },
  {
    id: 'luxury',
    name: 'Luxury Sand',
    image: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=500&fit=crop',
    color: 'from-amber-100 to-stone-300'
  }
];

export function GiftCardPage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedDesign, setSelectedDesign] = useState(GIFT_CARD_DESIGNS[0]);
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const { addToCart } = useCart();

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const getAmount = () => {
    if (customAmount) {
      const parsed = parseFloat(customAmount);
      return isNaN(parsed) ? 0 : parsed;
    }
    return selectedAmount || 0;
  };

  const handleAddToCart = () => {
    const amount = getAmount();
    
    if (amount < 10) {
      toast.error('Minimum gift card amount is $10');
      return;
    }

    if (amount > 1000) {
      toast.error('Maximum gift card amount is $1000');
      return;
    }

    if (!recipientEmail) {
      toast.error('Please enter recipient email address');
      return;
    }

    // Create a gift card product
    const giftCardProduct = {
      id: Date.now(), // Temporary ID
      name: `Gift Card - ${selectedDesign.name}`,
      price: amount,
      image: selectedDesign.image,
      category: 'Gift Cards',
      brand: 'Dubai Aroma',
      description: `Digital Gift Card`,
      inStock: true,
      rating: 5,
      reviewCount: 0,
      sizes: [{ size: `$${amount}`, stock: 999 }],
      notes: {
        top: [],
        middle: [],
        base: []
      }
    };

    addToCart(giftCardProduct, `$${amount}`, 1);
    
    toast.success(`Gift card added to cart!`, {
      description: `$${amount} ${selectedDesign.name} gift card`
    });

    // Reset form
    setRecipientName('');
    setRecipientEmail('');
    setSenderName('');
    setMessage('');
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[var(--color-sand-50)] to-[var(--color-sand-100)] py-20 border-b">
        <div className="container mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Gift className="h-8 w-8 text-primary" />
          </div>
          <h1>Gift Cards</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Give the gift of luxury fragrance. Perfect for any occasion, our gift cards let your loved ones choose their favorite scent.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Badge variant="secondary" className="text-sm py-2 px-4">
              <Mail className="h-3 w-3 mr-2" />
              Instant Email Delivery
            </Badge>
            <Badge variant="secondary" className="text-sm py-2 px-4">
              <CreditCard className="h-3 w-3 mr-2" />
              No Expiry Date
            </Badge>
            <Badge variant="secondary" className="text-sm py-2 px-4">
              <Check className="h-3 w-3 mr-2" />
              Redeemable Online & In-Store
            </Badge>
          </div>
        </div>
      </section>

      {/* Gift Card Builder */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left - Preview */}
              <div className="space-y-6">
                <div>
                  <h2 className="mb-4">Gift Card Preview</h2>
                  <Card className="overflow-hidden shadow-xl">
                    <div className={`aspect-[16/10] bg-gradient-to-br ${selectedDesign.color} p-8 flex flex-col justify-between text-white relative overflow-hidden`}>
                      {/* Background Pattern */}
                      <div 
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage: `url(${selectedDesign.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      />
                      
                      {/* Content */}
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-8">
                          <Gift className="h-6 w-6" />
                          <span className="text-lg tracking-[0.3em] uppercase">Dubai Aroma</span>
                        </div>
                        
                        {recipientName && (
                          <div className="mb-4">
                            <p className="text-sm opacity-90">To: {recipientName}</p>
                          </div>
                        )}
                        
                        {message && (
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 mb-4">
                            <p className="text-sm italic">"{message}"</p>
                          </div>
                        )}
                        
                        {senderName && (
                          <p className="text-sm opacity-90">From: {senderName}</p>
                        )}
                      </div>
                      
                      <div className="relative z-10 flex justify-between items-end">
                        <div>
                          <p className="text-sm opacity-90 mb-1">Gift Card Value</p>
                          <p className="text-4xl font-light">${getAmount()}</p>
                        </div>
                        <div className="text-right text-xs opacity-75">
                          <p>Valid at all locations</p>
                          <p>No expiry date</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Design Selection */}
                <div>
                  <h3 className="mb-4">Choose Design</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {GIFT_CARD_DESIGNS.map((design) => (
                      <Card
                        key={design.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedDesign.id === design.id ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => setSelectedDesign(design)}
                      >
                        <div className={`aspect-[16/10] bg-gradient-to-br ${design.color} p-4 flex items-end relative overflow-hidden`}>
                          <div 
                            className="absolute inset-0 opacity-20"
                            style={{
                              backgroundImage: `url(${design.image})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center'
                            }}
                          />
                          <p className="text-white text-sm relative z-10">{design.name}</p>
                          {selectedDesign.id === design.id && (
                            <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
                              <Check className="h-3 w-3" />
                            </div>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right - Configuration */}
              <div className="space-y-8">
                {/* Amount Selection */}
                <div>
                  <h3 className="mb-4">Select Amount</h3>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {PRESET_AMOUNTS.map((amount) => (
                      <Button
                        key={amount}
                        variant={selectedAmount === amount ? 'default' : 'outline'}
                        className="h-16 text-lg"
                        onClick={() => handleAmountSelect(amount)}
                      >
                        ${amount}
                      </Button>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="custom-amount">Or Enter Custom Amount ($10 - $1000)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        id="custom-amount"
                        type="number"
                        min="10"
                        max="1000"
                        step="1"
                        placeholder="Enter amount"
                        className="pl-7"
                        value={customAmount}
                        onChange={(e) => handleCustomAmountChange(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Recipient Details */}
                <div>
                  <h3 className="mb-4">Recipient Details</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="recipient-name">Recipient Name (Optional)</Label>
                      <Input
                        id="recipient-name"
                        placeholder="John Doe"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="recipient-email">Recipient Email *</Label>
                      <Input
                        id="recipient-email"
                        type="email"
                        placeholder="recipient@example.com"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sender-name">Your Name (Optional)</Label>
                      <Input
                        id="sender-name"
                        placeholder="Jane Smith"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Personal Message (Optional)</Label>
                      <Textarea
                        id="message"
                        placeholder="Write a special message..."
                        rows={3}
                        maxLength={200}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground text-right">
                        {message.length}/200
                      </p>
                    </div>
                  </div>
                </div>

                {/* Add to Cart */}
                <Card className="bg-[var(--color-sand-50)]">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-muted-foreground">Total Amount:</span>
                      <span className="text-3xl">${getAmount()}</span>
                    </div>
                    <Button 
                      size="lg" 
                      className="w-full"
                      onClick={handleAddToCart}
                      disabled={getAmount() < 10}
                    >
                      <Gift className="h-5 w-5 mr-2" />
                      Add to Cart
                    </Button>
                    <p className="text-xs text-center text-muted-foreground mt-3">
                      Gift cards are non-refundable and have no expiry date
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/30 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-12">Why Choose Our Gift Cards</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="mb-2">Instant Delivery</h4>
                  <p className="text-sm text-muted-foreground">
                    Email gift cards are delivered instantly, perfect for last-minute gifts
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="mb-2">No Expiry Date</h4>
                  <p className="text-sm text-muted-foreground">
                    Our gift cards never expire, giving recipients time to choose the perfect scent
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="mb-2">Flexible Use</h4>
                  <p className="text-sm text-muted-foreground">
                    Redeemable both online and at any of our store locations
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h4 className="mb-2">How do I use my gift card?</h4>
                  <p className="text-sm text-muted-foreground">
                    Simply enter your gift card code at checkout when shopping online, or present it at any of our store locations. The balance will be applied to your purchase.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h4 className="mb-2">Can I use multiple gift cards on one order?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes, you can apply multiple gift cards to a single order. Simply enter each gift card code separately at checkout.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h4 className="mb-2">What if my purchase is less than the gift card value?</h4>
                  <p className="text-sm text-muted-foreground">
                    The remaining balance will be saved on your gift card for future purchases. You can check your balance anytime on our website.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h4 className="mb-2">Can gift cards be refunded or exchanged?</h4>
                  <p className="text-sm text-muted-foreground">
                    Gift cards are non-refundable and cannot be exchanged for cash. However, they never expire and can be used at any time.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}