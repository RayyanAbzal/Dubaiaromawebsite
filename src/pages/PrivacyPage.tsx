export function PrivacyPage() {
  return (
    <div className="bg-[var(--color-sand-50)] min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-center mb-8">Privacy Policy</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
          <section>
            <h2 className="mb-4">Your Privacy Matters</h2>
            <p className="text-[var(--color-sand-900)]">
              At Dubai Aroma, we are committed to protecting your privacy. This Privacy Policy explains how we 
              collect, use, disclose, and safeguard your information when you visit our website www.dubaiaroma.nz.
            </p>
            <p className="text-[var(--color-sand-900)] mt-4">
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, 
              please do not access the site.
            </p>
          </section>

          <section>
            <h3 className="mb-3">Information We Collect</h3>
            <p className="text-[var(--color-sand-900)] mb-3">
              We may collect information about you in a variety of ways. The information we may collect on the 
              Site includes:
            </p>
            
            <h4 className="mt-4 mb-2">Personal Data</h4>
            <p className="text-[var(--color-sand-900)]">
              Personally identifiable information, such as your name, shipping address, email address, and 
              telephone number, and demographic information, such as your age, gender, hometown, and interests, 
              that you voluntarily give to us when you register with the Site or when you choose to participate 
              in various activities related to the Site.
            </p>

            <h4 className="mt-4 mb-2">Derivative Data</h4>
            <p className="text-[var(--color-sand-900)]">
              Information our servers automatically collect when you access the Site, such as your IP address, 
              your browser type, your operating system, your access times, and the pages you have viewed directly 
              before and after accessing the Site.
            </p>

            <h4 className="mt-4 mb-2">Financial Data</h4>
            <p className="text-[var(--color-sand-900)]">
              Financial information, such as data related to your payment method (e.g., valid credit card number, 
              card brand, expiration date) that we may collect when you purchase, order, return, exchange, or 
              request information about our services from the Site. We store only very limited, if any, financial 
              information that we collect. All payment processing is handled by secure third-party payment processors.
            </p>
          </section>

          <section>
            <h3 className="mb-3">How We Use Your Information</h3>
            <p className="text-[var(--color-sand-900)] mb-3">
              Having accurate information about you permits us to provide you with a smooth, efficient, and 
              customized experience. Specifically, we may use information collected about you via the Site to:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2 text-[var(--color-sand-900)]">
              <li>Process your orders and deliver products and services</li>
              <li>Manage your account and provide customer service</li>
              <li>Send you marketing and promotional communications</li>
              <li>Respond to your inquiries and offer customer support</li>
              <li>Improve our website and product offerings</li>
              <li>Monitor and analyze usage and trends</li>
              <li>Prevent fraudulent transactions and protect against criminal activity</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h3 className="mb-3">Disclosure of Your Information</h3>
            <p className="text-[var(--color-sand-900)] mb-3">
              We may share information we have collected about you in certain situations. Your information may 
              be disclosed as follows:
            </p>
            
            <h4 className="mt-4 mb-2">By Law or to Protect Rights</h4>
            <p className="text-[var(--color-sand-900)]">
              If we believe the release of information about you is necessary to respond to legal process, to 
              investigate or remedy potential violations of our policies, or to protect the rights, property, 
              and safety of others.
            </p>

            <h4 className="mt-4 mb-2">Third-Party Service Providers</h4>
            <p className="text-[var(--color-sand-900)]">
              We may share your information with third parties that perform services for us or on our behalf, 
              including payment processing, data analysis, email delivery, hosting services, customer service, 
              and marketing assistance.
            </p>

            <h4 className="mt-4 mb-2">Marketing Communications</h4>
            <p className="text-[var(--color-sand-900)]">
              With your consent, we may share your information with third parties for marketing purposes, as 
              permitted by law.
            </p>
          </section>

          <section>
            <h3 className="mb-3">Cookies and Tracking Technologies</h3>
            <p className="text-[var(--color-sand-900)]">
              We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Site to 
              help customize the Site and improve your experience. When you access the Site, your personal 
              information is not collected through the use of tracking technology. Most browsers are set to 
              accept cookies by default. You can remove or reject cookies, but be aware that such action could 
              affect the availability and functionality of the Site.
            </p>
          </section>

          <section>
            <h3 className="mb-3">Security of Your Information</h3>
            <p className="text-[var(--color-sand-900)]">
              We use administrative, technical, and physical security measures to help protect your personal 
              information. While we have taken reasonable steps to secure the personal information you provide 
              to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, 
              and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>
          </section>

          <section>
            <h3 className="mb-3">Your Privacy Rights</h3>
            <p className="text-[var(--color-sand-900)] mb-3">
              You have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2 text-[var(--color-sand-900)]">
              <li>Access and receive a copy of your personal data</li>
              <li>Rectify any inaccurate personal data</li>
              <li>Request deletion of your personal data</li>
              <li>Object to or restrict processing of your personal data</li>
              <li>Withdraw consent at any time</li>
              <li>Lodge a complaint with a supervisory authority</li>
            </ul>
          </section>

          <section>
            <h3 className="mb-3">Contact Us</h3>
            <p className="text-[var(--color-sand-900)]">
              If you have questions or comments about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-3 text-[var(--color-sand-900)]">
              <p>Dubai Aroma</p>
              <p>Email: privacy@dubaiaroma.nz</p>
            </div>
          </section>

          <section className="pt-6 border-t border-[var(--color-sand-200)]">
            <p className="text-sm text-[var(--color-sand-600)]">
              Last Updated: November 2024
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
