import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  title: string;
  image: string;
  productCount: number;
  href?: string;
}

export function CategoryCard({ title, image, productCount, href = '#' }: CategoryCardProps) {
  return (
    <Link to={href} className="group relative block overflow-hidden rounded-sm border bg-card hover:shadow-lg transition-all">
      <div className="aspect-[4/5] overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-2">
        <h3 className="text-white">{title}</h3>
        <div className="flex items-center justify-between">
          <p className="text-sm text-white/80">{productCount} Products</p>
          <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
