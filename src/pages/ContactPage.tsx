import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { toast } from 'sonner@2.0.3';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In production, this would send to your backend/email service
    toast.success('Message sent successfully! We\'ll get back to you within 24 hours.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-[var(--color-sand-50)] min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="mb-4">Contact Us</h1>
          <p className="text-[var(--color-sand-700)] max-w-2xl mx-auto">
            Have a question or need assistance? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="mb-6">Get in Touch</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[var(--color-sand-100)] rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[var(--color-sand-900)]" />
                  </div>
                  <div>
                    <h3 className="mb-1">Visit Us</h3>
                    <p className="text-[var(--color-sand-700)]">
                      Queen Street, Auckland CBD<br />
                      Auckland, New Zealand
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[var(--color-sand-100)] rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[var(--color-sand-900)]" />
                  </div>
                  <div>
                    <h3 className="mb-1">Call or WhatsApp</h3>
                    <p className="text-[var(--color-sand-700)]">
                      02041792292
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[var(--color-sand-100)] rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[var(--color-sand-900)]" />
                  </div>
                  <div>
                    <h3 className="mb-1">Email Us</h3>
                    <p className="text-[var(--color-sand-700)]">
                      dubai.aromanz@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[var(--color-sand-100)] rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[var(--color-sand-900)]" />
                  </div>
                  <div>
                    <h3 className="mb-1">Business Hours</h3>
                    <p className="text-[var(--color-sand-700)]">
                      Mon - Wed: 9:00 AM - 6:00 PM<br />
                      Thu - Fri: 9:00 AM - 9:00 PM<br />
                      Sat: 9:00 AM - 6:00 PM<br />
                      Sun: 10:00 AM - 5:30 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="mb-3">FAQ</h3>
              <p className="text-[var(--color-sand-700)] mb-3">
                Check out our frequently asked questions for quick answers to common queries.
              </p>
              <Button variant="outline" className="w-full">
                View FAQs
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+64 21 123 4567"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Order inquiry"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                    rows={6}
                    required
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input 
                    type="checkbox" 
                    id="privacy" 
                    required 
                    className="mt-1"
                  />
                  <Label htmlFor="privacy" className="text-sm text-[var(--color-sand-700)]">
                    I agree to the processing of my personal data in accordance with the Privacy Policy
                  </Label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full md:w-auto px-8"
                  size="lg"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-4 h-96">
            <div className="w-full h-full bg-[var(--color-sand-100)] rounded flex items-center justify-center">
              <p className="text-[var(--color-sand-600)]">Map placeholder - Integrate with Google Maps API</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}