import React from 'react';
import Footer from '../components/layouts/components/Footer';

function AboutUs() {
return (
    <>
        <main className="flex-grow px-4 py-12 bg-gray-50">
            <h1 className="text-2xl font-bold mb-6">Return & Refund Policy</h1>
            <p className="mb-4">Effective Date: <strong>1st of May, 2025</strong></p>
            <p className="mb-6">
                Welcome to Evella – your trusted destination for elegant sterling silver jewellery. We are
                committed to ensuring you are delighted with your purchase. Please read our return and refund
                policy carefully before making a purchase.
            </p>
            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">1. Returns Eligibility</h2>
                <ul className="list-disc pl-6">
                    <li>Return request is made within 7 days of delivery.</li>
                    <li>Product must be unused, undamaged, and in its original packaging with all tags, certificates, and invoices and must come with an unboxing video.</li>
                    <li>Product is not customised, engraved, or made-to-order.</li>
                    <li>Product was not purchased during a clearance sale or flash offer, unless defective or damaged. (unboxing video must be submitted)</li>
                </ul>
            </section>
            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">2. Non-Returnable Items</h2>
                <ul className="list-disc pl-6">
                    <li>Customised or personalised jewellery</li>
                    <li>Items purchased on sale or special offers</li>
                    <li>Gift cards and vouchers</li>
                </ul>
            </section>
            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">3. How to Initiate a Return</h2>
                <p className="mb-2">To initiate a return, follow these steps:</p>
                <ul className="list-decimal pl-6">
                    <li>Email us at <a href="mailto:bizz@shopevella.com" className="text-blue-500">bizz@shopevella.com</a> within 7 days of receiving your order.</li>
                    <li>Include your Order Number, Reason for Return, and Clear Photos of the item and an unboxing video.</li>
                    <li>Once approved, we will schedule a reverse pickup or guide you to ship it to our return address.</li>
                </ul>
                <p className="mt-2">All returns are subject to quality checks once received.</p>
            </section>
            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">4. Refund Policy</h2>
                <p className="mb-2">If your return is approved:</p>
                <ul className="list-disc pl-6">
                    <li>Refunds are processed within 5–7 business days after we receive and inspect the product.</li>
                    <li>Refunds will be credited to your original payment method.</li>
                    <li>Shipping charges are non-refundable, unless the product is defective or incorrect.</li>
                </ul>
            </section>
            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">5. Damaged or Defective Items</h2>
                <ul className="list-disc pl-6">
                    <li>Contact us immediately at <a href="mailto:bizz@shopevella.com" className="text-blue-500">bizz@shopevella.com</a> with photos and an unboxing video.</li>
                    <li>You may opt for a full refund or a free replacement, as per your preference.</li>
                </ul>
            </section>
            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">6. Exchanges</h2>
                <p>We do not offer direct product exchanges. Please return the product (if eligible) and place a new order.</p>
            </section>
            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">7. Order Cancellations</h2>
                <p>
                    Orders can be cancelled within 6 hours of placement or before dispatch (whichever is earlier).
                    To cancel, contact us at <a href="mailto:bizz@shopevella.com" className="text-blue-500">bizz@shopevella.com</a> or WhatsApp us at <a href="tel:+919124230952" className="text-blue-500">+91-9124230952</a> / <a href="tel:+919867705056" className="text-blue-500">9867705056</a>.
                </p>
            </section>
            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">8. Contact Us</h2>
                <p className="mb-2">For any queries, please reach out:</p>
                <ul className="list-disc pl-6">
                    <li>Email: <a href="mailto:bizz@shopevella.com" className="text-blue-500">bizz@shopevella.com</a></li>
                    <li>WhatsApp / Phone: <a href="tel:+919124230952" className="text-blue-500">+91-9124230952</a> / <a href="tel:+919867705056" className="text-blue-500">9867705056</a></li>
                    <li>Address: CrestHaven Ventures, PO. Januganj, Golaichawk, Ganeswarpur, Dist-Balasore, Odisha- 757019</li>
                </ul>
            </section>
        </main>
    </>
);
}

export default AboutUs;
