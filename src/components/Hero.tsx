import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-accent">Discover Luxury</p>
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl">Authentic Arabian & Designer Fragrances</h1>
          </motion.div>
          <motion.p 
            className="text-lg text-white/90 max-w-xl leading-relaxed"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Experience the finest collection of oud, attar oils, and premium perfumes. 
            Now available in Auckland and Hamilton.
          </motion.p>
          <motion.div 
            className="flex flex-wrap gap-4 pt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <Link to="/women">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  Shop Collection
                </Button>
              </motion.div>
            </Link>
            <Link to="/stores">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" className="bg-white hover:bg-white/90 text-black border-2 border-white shadow-lg">
                  Visit Our Stores
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}