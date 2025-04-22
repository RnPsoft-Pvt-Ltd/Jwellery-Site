import React from 'react';
import Footer from '../components/layouts/components/Footer';

function AboutUs() {
  return (
    <>
      <main className="flex-grow px-4 py-12 bg-white">
        <div className="container mx-auto max-w-4xl">
          {/* Page Title */}
          <h1 className="text-3xl md:text-4xl text-center mb-12 font-bold">
            About Us
          </h1>

          <div className="space-y-10 md:space-y-14 text-gray-700 text-lg font-medium leading-relaxed">
            {/* Intro Section */}
            <section>
              <p>
                Evella is a premier jewellery brand specializing in sterling silver and real pearl creations. Established with a vision to celebrate traditional craftsmanship while embracing modern aesthetics, we blend artistry and innovation to craft timeless jewellery pieces. Beyond jewellery, we are proud to support local artisans and engage in sustainable pearl culture, ensuring every piece tells a story of heritage, authenticity, and care.
              </p>
            </section>

            {/* Mission */}
            <section>
              <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
              <p>
                To provide customers with exquisite jewellery that combines the elegance of sterling silver with the timeless beauty of pearls. We are committed to delivering superior quality products and unmatched customer service, ensuring satisfaction and trust in every interaction.
              </p>
            </section>

            {/* Vision */}
            <section>
              <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
              <p>
                To be recognized as a leading name in the jewellery industry, known for promoting traditional craftsmanship, empowering local artisans, and contributing to sustainable pearl cultivation practices.
              </p>
            </section>

            {/* What Sets Us Apart */}
            <section>
              <h2 className="text-2xl font-semibold mb-2">What Sets Us Apart</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Authenticity and Quality:</strong> Our jewellery features genuine pearls and high-grade sterling silver, guaranteeing durability and elegance.</li>
                <li><strong>Artisan Empowerment:</strong> We employ skilled local craftsmen, preserving and promoting traditional artistry.</li>
                <li><strong>Sustainable Practices:</strong> Through pearl culture, we ensure eco-friendly practices that respect nature’s balance.</li>
                <li><strong>Customer-Centric Approach:</strong> Customer satisfaction is our driving force. We strive to provide seamless service, personalized experiences, and premium products.</li>
              </ul>
            </section>

            {/* Our Products */}
            <section>
              <h2 className="text-2xl font-semibold mb-2">Our Products</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Sterling Silver Jewellery:</strong> Earrings, necklaces, bracelets, and rings crafted with precision and style.</li>
                <li><strong>Pearl Creations:</strong> Unique designs featuring real pearls, blending classic and contemporary aesthetics.</li>
                <li><strong>Custom Jewellery:</strong> Tailored pieces designed to match our customers’ unique preferences.</li>
              </ul>
            </section>

            {/* Social Responsibility */}
            <section>
              <h2 className="text-2xl font-semibold mb-2">Social Responsibility</h2>
              <p>
                At Evella, we believe in giving back to the community. By collaborating with local artisans and supporting traditional craftsmanship, we aim to uplift livelihoods and sustain cultural heritage.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
              <p><strong>Address:</strong> CRESTHAVEN VENTURES LLP<br />
                C/O PRATAP SINGH, AT GANESWARPUR, PO JANUGANJ, INDUSTRIAL, Januganj, Remuna Police Station, Remuna,<br />
                Baleswar- 756019, Orissa, India
              </p>
              <p><strong>Phone:</strong> 9867705056</p>
              <p><strong>Email:</strong> evella.two@gmail.com</p>
              <p><strong>Website:</strong> shopevella.com</p>
            </section>

            {/* Closing Line */}
            <section className="text-center font-semibold text-xl mt-8">
              Let Evella be your go-to destination for elegant Jewellery that stands as a testament to tradition, quality, and unmatched beauty.
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

export default AboutUs;
