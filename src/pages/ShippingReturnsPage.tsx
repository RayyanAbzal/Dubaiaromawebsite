export function ShippingReturnsPage() {
  return (
    <div className="bg-[var(--color-sand-50)] min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-center mb-8">Shipping & Returns</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          {/* Shipping Section */}
          <section>
            <h2 className="mb-4">Shipping Information</h2>
            
            <h3 className="mb-3">Shipping Locations</h3>
            <p className="text-[var(--color-sand-900)]">
              We currently ship to addresses within New Zealand. International shipping options may be available 
              for select products - please contact us for more information.
            </p>

            <h3 className="mt-6 mb-3">Shipping Costs</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse mt-3">
                <thead>
                  <tr className="bg-[var(--color-sand-100)]">
                    <th className="border border-[var(--color-sand-300)] p-3 text-left">Order Value</th>
                    <th className="border border-[var(--color-sand-300)] p-3 text-left">Shipping Cost</th>
                    <th className="border border-[var(--color-sand-300)] p-3 text-left">Delivery Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-[var(--color-sand-300)] p-3">Under $100</td>
                    <td className="border border-[var(--color-sand-300)] p-3">$8.00</td>
                    <td className="border border-[var(--color-sand-300)] p-3">3-5 business days</td>
                  </tr>
                  <tr className="bg-[var(--color-sand-50)]">
                    <td className="border border-[var(--color-sand-300)] p-3">$100 - $199.99</td>
                    <td className="border border-[var(--color-sand-300)] p-3">$5.00</td>
                    <td className="border border-[var(--color-sand-300)] p-3">3-5 business days</td>
                  </tr>
                  <tr>
                    <td className="border border-[var(--color-sand-300)] p-3">$200 and above</td>
                    <td className="border border-[var(--color-sand-300)] p-3"><span className="text-green-600">FREE</span></td>
                    <td className="border border-[var(--color-sand-300)] p-3">3-5 business days</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="mt-6 mb-3">Express Shipping</h3>
            <p className="text-[var(--color-sand-900)]">
              Express shipping is available for $15.00 with delivery within 1-2 business days to most major cities.
            </p>

            <h3 className="mt-6 mb-3">Processing Time</h3>
            <p className="text-[var(--color-sand-900)]">
              Orders are typically processed within 1-2 business days. You will receive a confirmation email with 
              tracking information once your order has been dispatched.
            </p>

            <h3 className="mt-6 mb-3">Click & Collect</h3>
            <p className="text-[var(--color-sand-900)]">
              Free Click & Collect is available at our retail locations. Select this option at checkout and you'll 
              receive an email notification when your order is ready for pickup (usually within 24 hours).
            </p>
          </section>

          <div className="border-t border-[var(--color-sand-200)]"></div>

          {/* Returns Section */}
          <section>
            <h2 className="mb-4">Returns & Refunds Policy</h2>
            
            <h3 className="mb-3">Our Guarantee</h3>
            <p className="text-[var(--color-sand-900)]">
              We want you to be completely satisfied with your purchase. If you're not happy with your order, 
              we're here to help.
            </p>

            <h3 className="mt-6 mb-3">Return Period</h3>
            <p className="text-[var(--color-sand-900)]">
              You have <strong>30 days</strong> from the date of delivery to return an item for a refund or exchange.
            </p>

            <h3 className="mt-6 mb-3">Return Conditions</h3>
            <p className="text-[var(--color-sand-900)] mb-3">
              To be eligible for a return, items must meet the following conditions:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2 text-[var(--color-sand-900)]">
              <li>Item must be unused and in the same condition that you received it</li>
              <li>Must be in the original packaging with all seals intact</li>
              <li>Fragrance bottles must not be opened or used</li>
              <li>Must include receipt or proof of purchase</li>
              <li>Items on sale or clearance may not be eligible for return</li>
            </ul>

            <h3 className="mt-6 mb-3">Non-Returnable Items</h3>
            <p className="text-[var(--color-sand-900)] mb-3">
              The following items cannot be returned:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2 text-[var(--color-sand-900)]">
              <li>Opened or used fragrance products (for hygiene reasons)</li>
              <li>Gift cards</li>
              <li>Personalized or custom-made items</li>
              <li>Sale items marked as "Final Sale"</li>
            </ul>

            <h3 className="mt-6 mb-3">How to Return</h3>
            <div className="bg-[var(--color-sand-50)] p-4 rounded-lg mt-3">
              <ol className="list-decimal list-inside space-y-3 text-[var(--color-sand-900)]">
                <li>Contact our customer service team at returns@dubaiaroma.nz with your order number</li>
                <li>We'll provide you with a return authorization number and instructions</li>
                <li>Pack the item securely in its original packaging</li>
                <li>Include your order number and reason for return</li>
                <li>Send the package to the address provided</li>
              </ol>
            </div>

            <h3 className="mt-6 mb-3">Return Shipping Costs</h3>
            <p className="text-[var(--color-sand-900)]">
              Return shipping costs are the responsibility of the customer unless the item is faulty or we made 
              an error. We recommend using a trackable shipping service.
            </p>

            <h3 className="mt-6 mb-3">Refund Processing</h3>
            <p className="text-[var(--color-sand-900)]">
              Once we receive your return, we will inspect the item and process your refund within 5-7 business 
              days. Refunds will be issued to the original payment method. Please allow additional time for your 
              bank to process the refund.
            </p>

            <h3 className="mt-6 mb-3">Exchanges</h3>
            <p className="text-[var(--color-sand-900)]">
              If you need to exchange an item for a different size or scent, please contact us to arrange an 
              exchange. We'll process exchanges as quickly as possible.
            </p>

            <h3 className="mt-6 mb-3">Damaged or Defective Items</h3>
            <p className="text-[var(--color-sand-900)]">
              If you receive a damaged or defective item, please contact us immediately with photos of the damage. 
              We'll arrange for a replacement or full refund at no cost to you, including return shipping.
            </p>
          </section>

          <section className="pt-6 border-t border-[var(--color-sand-200)]">
            <h3 className="mb-3">Questions?</h3>
            <p className="text-[var(--color-sand-900)]">
              If you have any questions about shipping or returns, please don't hesitate to contact our customer 
              service team. We're here to help!
            </p>
            <div className="mt-4 text-[var(--color-sand-900)]">
              <p>Email: support@dubaiaroma.nz</p>
              <p>Phone: 0800 AROMA NZ</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
