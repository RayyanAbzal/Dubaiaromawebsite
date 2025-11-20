import { Button } from './ui/button';
import { Input } from './ui/input';
import { Mail } from 'lucide-react';

export function Newsletter() {
  return (
    <section className="bg-secondary py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center text-white space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-2">
            <Mail className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-white">Stay Connected</h2>
            <p className="text-white/90">
              Subscribe for exclusive offers, new arrivals, and fragrance insights
            </p>
          </div>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Subscribe
            </Button>
          </form>
          <p className="text-xs text-white/70">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
