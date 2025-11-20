import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { allProducts as initialProducts } from '../utils/mockData';

export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  description?: string;
  notes?: string[];
  size?: string;
  inStock?: boolean;
  rating?: number;
  reviewCount?: number;
  featured?: boolean;
}

interface ProductsContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  getProductById: (id: number) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    const stored = localStorage.getItem('dubaiaroma_products');
    return stored ? JSON.parse(stored) : initialProducts;
  });

  useEffect(() => {
    localStorage.setItem('dubaiaroma_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newId = Math.max(...products.map(p => p.id), 0) + 1;
    setProducts([...products, { ...product, id: newId }]);
  };

  const updateProduct = (id: number, updatedProduct: Partial<Product>) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, ...updatedProduct } : p
    ));
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const getProductById = (id: number) => {
    return products.find(p => p.id === id);
  };

  const getProductsByCategory = (category: string) => {
    return products.filter(p => p.category === category);
  };

  return (
    <ProductsContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      getProductById,
      getProductsByCategory,
    }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}