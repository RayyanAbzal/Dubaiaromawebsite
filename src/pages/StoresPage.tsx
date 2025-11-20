import { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { MapPin, Phone, Mail, Clock, Navigation, Search } from 'lucide-react';
import { stores } from '../utils/mockData';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function StoresPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStore, setSelectedStore] = useState(stores[0]);

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Hero Section */}
      <section className="bg-muted py-16 border-b">
        <div className="container mx-auto px-4 text-center space-y-4">
          <h1>Our Stores</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Visit us in person to experience our luxury fragrances. Our expert staff are ready to help you find your perfect scent.
          </p>
        </div>
      </section>

      {/* Store Locator */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Search */}
          <div className="max-w-xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by city or store name..."
                className="pl-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <p className="text-sm text-muted-foreground text-center mt-3">
              {filteredStores.length} store{filteredStores.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {/* Store Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredStores.map(store => (
              <Card key={store.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video overflow-hidden bg-muted">
                  <ImageWithFallback
                    src={store.image}
                    alt={store.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="mb-4">{store.name}</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3 text-sm">
                      <MapPin className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                      <div>
                        <p>{store.address}</p>
                        <p className="text-muted-foreground">{store.city}, {store.postcode}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="h-4 w-4 text-secondary flex-shrink-0" />
                      <a href={`tel:${store.phone}`} className="hover:underline">
                        {store.phone}
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="h-4 w-4 text-secondary flex-shrink-0" />
                      <a href={`mailto:${store.email}`} className="hover:underline">
                        {store.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => setSelectedStore(store)}
                    >
                      <Navigation className="h-3 w-3 mr-2" />
                      Get Directions
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        const element = document.getElementById('store-details');
                        element?.scrollIntoView({ behavior: 'smooth' });
                        setSelectedStore(store);
                      }}
                    >
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredStores.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No stores found matching your search</p>
              <Button variant="outline" onClick={() => setSearchQuery('')}>
                Clear Search
              </Button>
            </div>
          )}

          {/* Selected Store Details */}
          {selectedStore && (
            <div id="store-details" className="scroll-mt-20">
              <Card className="max-w-4xl mx-auto">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Store Info */}
                    <div>
                      <Badge className="mb-4">Featured Store</Badge>
                      <h2 className="mb-6">{selectedStore.name}</h2>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="h-5 w-5 text-secondary" />
                            <h4>Address</h4>
                          </div>
                          <p className="text-muted-foreground ml-7">
                            {selectedStore.address}<br />
                            {selectedStore.city}, {selectedStore.postcode}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Phone className="h-5 w-5 text-secondary" />
                            <h4>Phone</h4>
                          </div>
                          <a 
                            href={`tel:${selectedStore.phone}`} 
                            className="text-muted-foreground ml-7 hover:text-foreground hover:underline"
                          >
                            {selectedStore.phone}
                          </a>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Mail className="h-5 w-5 text-secondary" />
                            <h4>Email</h4>
                          </div>
                          <a 
                            href={`mailto:${selectedStore.email}`} 
                            className="text-muted-foreground ml-7 hover:text-foreground hover:underline"
                          >
                            {selectedStore.email}
                          </a>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Clock className="h-5 w-5 text-secondary" />
                            <h4>Opening Hours</h4>
                          </div>
                          <div className="ml-7 space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Monday - Friday</span>
                              <span>{selectedStore.hours.weekday}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Saturday</span>
                              <span>{selectedStore.hours.saturday}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Sunday</span>
                              <span>{selectedStore.hours.sunday}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 space-y-3">
                        <Button className="w-full" size="lg" asChild>
                          <a 
                            href={`https://www.google.com/maps/search/?api=1&query=${selectedStore.coordinates.lat},${selectedStore.coordinates.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Navigation className="h-4 w-4 mr-2" />
                            Get Directions
                          </a>
                        </Button>
                        <Button variant="outline" className="w-full" size="lg" asChild>
                          <a href={`tel:${selectedStore.phone}`}>
                            <Phone className="h-4 w-4 mr-2" />
                            Call Store
                          </a>
                        </Button>
                      </div>
                    </div>

                    {/* Right Column - Map Placeholder */}
                    <div className="bg-muted rounded-lg overflow-hidden">
                      <div className="aspect-square relative">
                        <ImageWithFallback
                          src={selectedStore.image}
                          alt={`${selectedStore.name} location`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <Button asChild>
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${selectedStore.coordinates.lat},${selectedStore.coordinates.lng}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <MapPin className="h-4 w-4 mr-2" />
                              View on Map
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Store Services */}
      <section className="py-16 bg-muted/30 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-12">In-Store Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Navigation className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="mb-2">Fragrance Consultation</h4>
                  <p className="text-sm text-muted-foreground">
                    Get personalized recommendations from our fragrance experts
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="mb-2">Click & Collect</h4>
                  <p className="text-sm text-muted-foreground">
                    Order online and pick up in-store within 2 hours
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="mb-2">Gift Wrapping</h4>
                  <p className="text-sm text-muted-foreground">
                    Complimentary luxury gift wrapping available
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
