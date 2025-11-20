import { Newsletter } from '../components/Newsletter';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-muted py-16 border-b">
        <div className="container mx-auto px-4 text-center space-y-4">
          <h1>About Dubai Aroma</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your destination for authentic Arabian and designer fragrances in New Zealand
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-widest text-muted-foreground text-center">Our Story</p>
              <h2 className="text-center">Bringing Middle Eastern Luxury to New Zealand</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Dubai Aroma was founded with a passion for authentic Middle Eastern fragrances and a vision 
                to bring these luxurious scents to New Zealand. Our journey began with a simple belief: 
                that everyone deserves access to genuine, high-quality perfumes that tell a story.
              </p>
              <p>
                We specialize in authentic Arabian attars, ouds, and premium designer fragrances sourced 
                directly from renowned perfume houses in the Middle East and Europe. Each bottle in our 
                collection is carefully selected to ensure authenticity and exceptional quality.
              </p>
              <p>
                Located in the heart of Auckland, our store offers a unique fragrance experience where 
                you can explore, discover, and find your signature scent with guidance from our 
                knowledgeable staff.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-12">What We Stand For</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-2">
                  <span className="text-2xl">✓</span>
                </div>
                <h3>Authenticity</h3>
                <p className="text-sm text-muted-foreground">
                  Every product is 100% genuine, sourced directly from authorized distributors
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-2">
                  <span className="text-2xl">✓</span>
                </div>
                <h3>Quality</h3>
                <p className="text-sm text-muted-foreground">
                  We curate only the finest fragrances that meet our high standards
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-2">
                  <span className="text-2xl">✓</span>
                </div>
                <h3>Service</h3>
                <p className="text-sm text-muted-foreground">
                  Expert guidance and personalized recommendations for every customer
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 space-y-2">
              <p className="text-sm uppercase tracking-widest text-muted-foreground">Location</p>
              <h2>Visit Our Store</h2>
              <p className="text-muted-foreground">
                Experience our fragrances in person at our Auckland location
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="mb-1">Address</h4>
                    <p className="text-sm text-muted-foreground">
                      123 Queen Street<br />
                      Auckland CBD, 1010<br />
                      New Zealand
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="mb-1">Phone</h4>
                    <p className="text-sm text-muted-foreground">
                      <a href="tel:+6499999999" className="hover:text-foreground transition-colors">
                        +64 9 999 9999
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="mb-1">Email</h4>
                    <p className="text-sm text-muted-foreground">
                      <a href="mailto:info@dubaiaroma.nz" className="hover:text-foreground transition-colors">
                        info@dubaiaroma.nz
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="mb-1">Opening Hours</h4>
                    <p className="text-sm text-muted-foreground">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 5:00 PM<br />
                      Sunday: 11:00 AM - 4:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-muted rounded-lg h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">Map placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
