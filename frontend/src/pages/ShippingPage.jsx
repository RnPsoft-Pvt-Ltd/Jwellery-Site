import React from 'react';
import Footer from '../components/layouts/components/Footer';

function TermsPage() {
    return (
        <>
            <main className="flex-grow px-6 py-12 bg-gray-50 text-gray-800">
            <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-md">

                <h1 className="text-2xl font-bold mb-6">Shipping Policy</h1>
                <p className="mb-4">Effective Date: <strong>1st of May, 2025</strong></p>
                <p className="mb-4">Website: <a href="https://www.shopevella.com" className="text-blue-600 underline">www.shopevella.com</a></p>
                <p className="mb-4">Brand Owner: <strong>CrestHaven Ventures LLP</strong></p>
                <p className="mb-6">Evella™ aims to deliver beautifully crafted sterling silver jewellery to your doorstep with care, speed, and transparency. Please review our shipping policy below:</p>
                
                <h2 className="text-xl font-semibold mb-4">1. Shipping Locations</h2>
                <ul className="list-disc list-inside mb-6">
                    <li>All serviceable pin codes within India</li>
                    <li>International shipping is unavailable currently.</li>
                </ul>

                <h2 className="text-xl font-semibold mb-4">2. Shipping Charges</h2>
                <ul className="list-disc list-inside mb-6">
                    <li>Standard Shipping (India): Free shipping for all prepaid orders above ₹4000.</li>
                    <li>Orders below ₹4000: A nominal shipping fee of ₹79 may apply.</li>
                    <li>Cash on Delivery (COD): COD is not available currently.</li>
                </ul>
                <p className="mb-6"><strong>Note:</strong> Shipping fees (if any) are non-refundable once the order is shipped.</p>

                <h2 className="text-xl font-semibold mb-4">3. Order Processing Time</h2>
                <ul className="list-disc list-inside mb-6">
                    <li>Orders are processed within 3-5 business days.</li>
                    <li>Custom or made-to-order pieces may take 5–7 business days. (Not available currently).</li>
                    <li>You will receive an order confirmation and tracking information via email or WhatsApp once the order is shipped.</li>
                </ul>

                <h2 className="text-xl font-semibold mb-4">4. Estimated Delivery Time</h2>
                <ul className="list-disc list-inside mb-6">
                    <li>Metro Cities: 5-7 business days</li>
                    <li>Non-Metro Locations: 10-15 business days</li>
                    <li>Remote/Interiors: 10-15 business days (if serviceable by our courier partners)</li>
                </ul>
                <p className="mb-6"><strong>Please note:</strong> Delivery timelines may vary due to logistics delays, public holidays, or natural disruptions.</p>

                <h2 className="text-xl font-semibold mb-4">5. Delivery Partners</h2>
                <p className="mb-6">We partner with leading logistics providers such as Shiprocket, Bluedart, Delhivery etc., to ensure timely and safe delivery.</p>

                <h2 className="text-xl font-semibold mb-4">6. Tracking Your Order</h2>
                <p className="mb-6">Once your order is shipped, you will receive a tracking link via email/WhatsApp. You can also track your order via your account at <a href="https://www.shopevella.com" className="text-blue-600 underline">www.shopevella.com</a>.</p>

                <h2 className="text-xl font-semibold mb-4">7. Delayed or Missed Deliveries</h2>
                <ul className="list-disc list-inside mb-6">
                    <li>Our courier partner will retry delivery up to 2–3 times.</li>
                    <li>If undelivered, the product will be returned to us.</li>
                    <li>We will reach out for address confirmation before re-shipping.</li>
                </ul>

                <h2 className="text-xl font-semibold mb-4">8. Packaging</h2>
                <p className="mb-6">All jewellery is securely packed in protective boxes or pouches to prevent damage in transit. We include certificates and invoices wherever applicable.</p>

                <h2 className="text-xl font-semibold mb-4">9. Force Majeure</h2>
                <p className="mb-6">Evella™ is not liable for delays caused by events beyond our control, such as natural calamities, transport strikes, lockdowns, or government restrictions.</p>

                <h2 className="text-xl font-semibold mb-4">10. Contact Us</h2>
                <p className="mb-4">For any questions or support related to shipping, contact:</p>
                <ul className="list-disc list-inside mb-6">
                    <li>Email: <a href="mailto:bizz@shopevella.com" className="text-blue-600 underline">bizz@shopevella.com</a></li>
                    <li>WhatsApp: +91-9124230952 / 9867705056</li>
                    <li>Registered Address: CrestHaven Ventures LLP, PO. Januganj, Golaichawk, Ganeswarpur, Dist-Balasore, Odisha- 757019</li>
                    <li>Working Hours: Monday to Saturday, 10 AM – 6 PM</li>
                </ul>
                <p className="mb-6">Evella™ is a brand owned and operated by CrestHaven Ventures LLP.</p>
                </div>
            </main>
        </>
    );
}

export default TermsPage;
