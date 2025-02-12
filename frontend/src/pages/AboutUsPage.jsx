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

    {/* Content Sections */}
    <div className="space-y-8 md:space-y-12">
      {/* Heritage Section */}
      <div className="text-center md:text-left">
        <h2 className="text-3xl mb-4 font-semibold">Our Heritage of Excellence</h2>
        <p className="text-gray-700 text-lg font-medium leading-relaxed">
          At Evella, we believe that every piece of jewelry tells a unique story. Founded with a passion for craftsmanship and an eye for timeless design, we have established ourselves as a premier destination for fine jewelry that celebrates life's most precious moments. Our commitment to excellence is reflected in every piece we create, from stunning rings and necklaces to elegant bracelets and earrings, offering a wide range of collections for women, men, and children.
        </p>
      </div>

      {/* Personalization Section */}
      <div className="text-center md:text-left">
        <h2 className="text-3xl mb-4 font-semibold">Your Vision, Our Expertise</h2>
        <p className="text-gray-700 text-lg font-medium leading-relaxed">
          Understanding that jewelry is deeply personal, we take pride in offering personalized custom designs that bring your unique vision to life. Our master craftsmen work closely with clients to create bespoke pieces that reflect individual stories and styles. Whether you're looking for classic designs or contemporary statements, our diverse collection ensures that every client finds their perfect piece.
        </p>
      </div>
    </div>
  </div>
</main>
</>

  );
}

export default AboutUs;