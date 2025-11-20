import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden bg-muted">
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1650686036849-ff87bcaa2e9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcmFiaWMlMjBwZXJmdW1lfGVufDF8fHx8MTc2MTU3NTgwMHww&ixlib=rb-4.1.0&q=80&w=1080"
        alt="Luxury Arabic Perfume"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
      <div className="container relative mx-auto h-full px-4 flex items-center">
        <div className="max-w-2xl text-white space-y-6">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-accent">Discover Luxury</p>
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl">Authentic Arabian & Designer Fragrances</h1>
          </div>
          <p className="text-lg text-white/90 max-w-xl leading-relaxed">
            Experience the finest collection of oud, attar oils, and premium perfumes. 
            Now available with Click & Collect in Auckland.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link to="/women">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                Shop Collection
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 hover:text-white">
                Visit Store
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}