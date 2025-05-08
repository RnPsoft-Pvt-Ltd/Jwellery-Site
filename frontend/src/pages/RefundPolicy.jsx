import React from 'react';
import Footer from '../components/layouts/components/Footer';

function AboutUs() {
return (
    <>
        <main className="flex-grow px-4 py-12 bg-gray-50">
            <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-md">
                <h1 className="text-2xl font-bold mb-4">Return & Refund Policy</h1>
                <p className="text-sm text-gray-600 mb-6">Effective Date: 1st of May, 2025</p>
                <p className="mb-4">
                    Welcome to <strong>Evella™</strong> – your trusted destination for elegant sterling silver jewellery. We are committed to ensuring your complete satisfaction with your purchase. Please read our return and refund policy carefully before making a purchase.
                </p>
                <h2 className="text-lg font-semibold mb-2">1. Returns Eligibility</h2>
                <ul className="list-disc list-inside mb-4">
                    <li>Return request is made within 7 days of delivery of the order.</li>
                    <li>Product must be unused, undamaged, and in its original packaging with all tags, certificates, and invoices and must come with an unboxing video.</li>
                    <li>Product was not purchased during a clearance sale or flash offer, unless defective or damaged. (unboxing video must be submitted)</li>
                </ul>
                <h2 className="text-lg font-semibold mb-2">2. Non-Returnable Items</h2>
                <ul className="list-disc list-inside mb-4">
                    <li>Items purchased on sale or special offers, unless defective or damaged (unboxing video must be submitted).</li>
                    <li>Gift cards and vouchers.</li>
                </ul>
                <h2 className="text-lg font-semibold mb-2">3. How to Initiate a Return</h2>
                <p className="mb-4">
                    To initiate a return, follow these steps:
                </p>
                <ul className="list-decimal list-inside mb-4">
                    <li>Email us at <a href="mailto:bizz@shopevella.com" className="text-blue-500 underline">bizz@shopevella.com</a> within 7 days of receiving your order.</li>
                    <li>Include your Order Number, Reason for Return, and Clear Photos of the item and an unboxing video.</li>
                    <li>Once approved, we will schedule a reverse pickup or guide you to ship it to our return address.</li>
                </ul>
                <p className="italic text-sm mb-4">Note: All returns are subject to quality checks once received.</p>
                <h2 className="text-lg font-semibold mb-2">4. Refund Policy</h2>
                <ul className="list-disc list-inside mb-4">
                    <li>Refunds are processed within 5–7 business days after we receive and inspect the product.</li>
                    <li>Refunds will be credited to your original payment method.</li>
                    <li>Shipping charges are non-refundable, unless the product is defective or incorrect.</li>
                </ul>
                <h2 className="text-lg font-semibold mb-2">5. Damaged or Defective Items</h2>
                <ul className="list-disc list-inside mb-4">
                    <li>Contact us immediately at <a href="mailto:bizz@shopevella.com" className="text-blue-500 underline">bizz@shopevella.com</a> with photos and an unboxing video.</li>
                    <li>You may opt for a full refund or a free replacement, as per your preference.</li>
                </ul>
                <h2 className="text-lg font-semibold mb-2">6. Exchanges</h2>
                <p className="mb-4">
                    We do not offer direct product exchanges. Please return the product (if eligible) and place a new order.
                </p>
                <h2 className="text-lg font-semibold mb-2">7. Order Cancellations</h2>
                <p className="mb-4">
                    Orders can be cancelled within 6 hours of placement or before dispatch (whichever is earlier). To cancel, contact us at <a href="mailto:bizz@shopevella.com" className="text-blue-500 underline">bizz@shopevella.com</a> or WhatsApp us at <a href="tel:+919124230952" className="text-blue-500 underline">+91-9124230952</a> / <a href="tel:+919867705056" className="text-blue-500 underline">9867705056</a>.
                </p>
                <h2 className="text-lg font-semibold mb-2">8. Contact Us</h2>
                <p className="mb-4">
                    For any queries, please reach out:
                </p>
                <ul className="list-disc list-inside mb-4">
                    <li>Email: <a href="mailto:bizz@shopevella.com" className="text-blue-500 underline">bizz@shopevella.com</a></li>
                    <li>WhatsApp: <a href="tel:+919124230952" className="text-blue-500 underline">+91-9124230952</a> / <a href="tel:+919867705056" className="text-blue-500 underline">9867705056</a></li>
                    <li>Address: CrestHaven Ventures, PO. Januganj, Golaichawk, Ganeswarpur, Dist Balasore, Odisha- 757019</li>
                </ul>
                <p className="text-sm text-gray-600">
                    <strong>Evella™</strong> is a brand owned and operated by CrestHaven Ventures LLP.
                </p>
                </div>
        </main>
    </>
);
}

export default AboutUs;
