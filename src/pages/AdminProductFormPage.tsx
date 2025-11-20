import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '../contexts/ProductsContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Switch } from '../components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from 'sonner';

export function AdminProductFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { products, addProduct, updateProduct, getProductById } = useProducts();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: "Women's Fragrances",
    price: '',
    image: '',
    description: '',
    notes: '',
    size: '50ml',
    inStock: true,
    featured: false,
  });

  useEffect(() => {
    if (isEditing && id) {
      const product = getProductById(parseInt(id));
      if (product) {
        setFormData({
          name: product.name,
          brand: product.brand,
          category: product.category,
          price: product.price.toString(),
          image: product.image,
          description: product.description || '',
          notes: product.notes?.join(', ') || '',
          size: product.size || '50ml',
          inStock: product.inStock !== false,
          featured: product.featured || false,
        });
      }
    }
  }, [id, isEditing, getProductById]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.brand || !formData.price) {
      toast.error('Please fill in all required fields');
      return;
    }

    const productData = {
      name: formData.name,
      brand: formData.brand,
      category: formData.category,
      price: parseFloat(formData.price),
      image: formData.image,
      description: formData.description,
      notes: formData.notes ? formData.notes.split(',').map(n => n.trim()) : [],
      size: formData.size,
      inStock: formData.inStock,
      featured: formData.featured,
      rating: 4.5,
      reviewCount: 0,
    };

    if (isEditing && id) {
      updateProduct(parseInt(id), productData);
      toast.success('Product updated successfully!');
    } else {
      addProduct(productData);
      toast.success('Product added successfully!');
    }

    navigate('/admin/dashboard');
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/admin/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1>{isEditing ? 'Edit Product' : 'Add New Product'}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Product Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="e.g., Arabian Nights Eau de Parfum"
                    required
                  />
                </div>

                {/* Brand */}
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand *</Label>
                  <Input
                    id="brand"
                    value={formData.brand}
                    onChange={(e) => handleChange('brand', e.target.value)}
                    placeholder="e.g., Dubai Aroma"
                    required
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => handleChange('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Women's Fragrances">Women's Fragrances</SelectItem>
                      <SelectItem value="Men's Fragrances">Men's Fragrances</SelectItem>
                      <SelectItem value="Unisex">Unisex</SelectItem>
                      <SelectItem value="Attar Oils">Attar Oils</SelectItem>
                      <SelectItem value="Gift Sets">Gift Sets</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price & Size */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => handleChange('price', e.target.value)}
                      placeholder="89.99"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="size">Size</Label>
                    <Select 
                      value={formData.size} 
                      onValueChange={(value) => handleChange('size', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30ml">30ml</SelectItem>
                        <SelectItem value="50ml">50ml</SelectItem>
                        <SelectItem value="100ml">100ml</SelectItem>
                        <SelectItem value="12ml">12ml (Attar)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Image URL */}
                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => handleChange('image', e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                  />
                  <p className="text-xs text-muted-foreground">
                    Leave empty to use a placeholder image
                  </p>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="Describe the fragrance, its character, and unique qualities..."
                    rows={4}
                  />
                </div>

                {/* Fragrance Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes">Fragrance Notes</Label>
                  <Input
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    placeholder="Oud, Rose, Sandalwood, Musk (comma separated)"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter notes separated by commas
                  </p>
                </div>

                {/* Toggles */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <Label htmlFor="inStock" className="cursor-pointer">In Stock</Label>
                      <p className="text-sm text-muted-foreground">
                        Product is available for purchase
                      </p>
                    </div>
                    <Switch
                      id="inStock"
                      checked={formData.inStock}
                      onCheckedChange={(checked) => handleChange('inStock', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <Label htmlFor="featured" className="cursor-pointer">Featured Product</Label>
                      <p className="text-sm text-muted-foreground">
                        Display on homepage and promotional areas
                      </p>
                    </div>
                    <Switch
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => handleChange('featured', checked)}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    {isEditing ? 'Update Product' : 'Add Product'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate('/admin/dashboard')}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
}
