import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';
import { Bell } from 'lucide-react';

interface NotifyMeDialogProps {
  productName: string;
  productId: number;
}

export function NotifyMeDialog({ productName, productId }: NotifyMeDialogProps) {
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In production, this would send to your backend
    // For now, we'll just store in localStorage
    const notifications = JSON.parse(localStorage.getItem('dubaiaroma_stock_notifications') || '[]');
    notifications.push({
      productId,
      productName,
      email,
      requestedAt: new Date().toISOString()
    });
    localStorage.setItem('dubaiaroma_stock_notifications', JSON.stringify(notifications));
    
    toast.success(`We'll notify you at ${email} when ${productName} is back in stock!`);
    setEmail('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full" size="lg">
          <Bell className="w-4 h-4 mr-2" />
          Notify Me When Available
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Get Stock Notification</DialogTitle>
          <DialogDescription>
            Enter your email address and we'll notify you as soon as <strong>{productName}</strong> is back in stock.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="notify-email">Email Address</Label>
            <Input
              id="notify-email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-3">
            <Button type="submit" className="flex-1">
              Notify Me
            </Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
          <p className="text-xs text-[var(--color-sand-600)]">
            We'll only use your email to notify you about this product's availability. 
            You can unsubscribe at any time.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
