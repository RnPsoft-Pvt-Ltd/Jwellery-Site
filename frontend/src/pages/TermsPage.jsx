import React from 'react';
import Footer from '../components/layouts/components/Footer';

function TermsPage() {
    return (
        <>
            <main className="flex-grow px-6 py-12 bg-gray-50 text-gray-800">
                <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
                    <h1 className="text-2xl font-bold mb-4 text-center">Terms of Use</h1>
                    <p className="text-sm text-gray-600 mb-6 text-center">Effective Date: 1st of May 2025</p>
                    <p className="text-sm text-gray-600 mb-6 text-center">Website: www.shopevella.com</p>
                    <p className="text-sm text-gray-600 mb-6 text-center">Brand Owner: CrestHaven Ventures LLP</p>
                    <div className="space-y-6">
                        <section>
                            <h2 className="text-lg font-semibold mb-2">1. General</h2>
                            <p className="text-sm">
                                This website is owned and operated by CrestHaven Ventures LLP, an Indian entity operating
                                under applicable laws of India. The term "you" refers to the user or viewer of this website, and
                                "we", "our", or "Evella" refers to the brand.
                            </p>
                        </section>
                        <section>
                            <h2 className="text-lg font-semibold mb-2">2. Use of Website</h2>
                            <ul className="list-disc list-inside text-sm space-y-1">
                                <li>Use the site for lawful purposes only.</li>
                                <li>Not engage in any activity that disrupts or interferes with the website’s functionality.</li>
                                <li>Not attempt to gain unauthorized access to any part of the website or its systems.</li>
                                <li>Provide accurate and current information during registration or purchase.</li>
                                <li>We reserve the right to terminate your access to the website if you violate any terms herein.</li>
                            </ul>
                        </section>
                        <section>
                            <h2 className="text-lg font-semibold mb-2">3. Products & Pricing</h2>
                            <p className="text-sm">
                                All products listed are subject to availability. We reserve the right to modify prices, product details, or discontinue items at any time without prior notice. While we strive for accuracy, typographical errors or inaccuracies in pricing or descriptions may occur. We reserve the right to correct such errors.
                            </p>
                        </section>
                        <section>
                            <h2 className="text-lg font-semibold mb-2">4. Intellectual Property</h2>
                            <p className="text-sm">
                                All content on this site — including text, images, product designs, logos, graphics, and layout — is the intellectual property of Evella or its content suppliers, and is protected under Indian copyright, trademark, and intellectual property laws.
                            </p>
                            <ul className="list-disc list-inside text-sm space-y-1">
                                <li>Reproduce, distribute, or use any content from the site without our written permission.</li>
                                <li>Use any logo, trademark, or proprietary information without express consent.</li>
                            </ul>
                        </section>
                        <section>
                            <h2 className="text-lg font-semibold mb-2">5. Account Responsibility</h2>
                            <ul className="list-disc list-inside text-sm space-y-1">
                                <li>You are responsible for maintaining confidentiality of your account details and restricting access to your device.</li>
                                <li>You agree to accept responsibility for all activities under your account.</li>
                            </ul>
                        </section>
                        <section>
                            <h2 className="text-lg font-semibold mb-2">6. User-Generated Content</h2>
                            <ul className="list-disc list-inside text-sm space-y-1">
                                <li>It must not be illegal, obscene, abusive, or infringe any third-party rights.</li>
                                <li>By submitting, you grant Evella the right to use, reproduce, and display such content across platforms.</li>
                                <li>We reserve the right to remove or modify any content at our sole discretion.</li>
                            </ul>
                        </section>
                        <section>
                            <h2 className="text-lg font-semibold mb-2">7. Payments</h2>
                            <p className="text-sm">
                                We use secure third-party payment gateways. By placing an order, you agree to the terms and conditions of the respective payment service providers. Evella is not liable for any payment failures or breaches at the payment gateway’s end.
                            </p>
                        </section>
                        <section>
                            <h2 className="text-lg font-semibold mb-2">8. Shipping & Returns</h2>
                            <p className="text-sm">
                                Please refer to our Shipping Policy and Return & Refund Policy available on the website for detailed terms regarding delivery, return, and cancellations.
                            </p>
                        </section>
                        <section>
                            <h2 className="text-lg font-semibold mb-2">9. Limitation of Liability</h2>
                            <ul className="list-disc list-inside text-sm space-y-1">
                                <li>Indirect, incidental, or consequential damages arising from the use of this website.</li>
                                <li>Loss or damage arising from reliance on product listings, delays in delivery, or technical disruptions.</li>
                                <li>Our liability shall be limited to the value of the goods purchased.</li>
                            </ul>
                        </section>
                        <section>
                            <h2 className="text-lg font-semibold mb-2">10. Privacy Policy</h2>
                            <p className="text-sm">
                                Your use of this website is also governed by our Privacy Policy, which outlines how we collect, use, and protect your personal data.
                            </p>
                        </section>
                        <section>
                            <h2 className="text-lg font-semibold mb-2">11. Governing Law & Jurisdiction</h2>
                            <p className="text-sm">
                                These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in [Odisha].
                            </p>
                        </section>
                        <section>
                            <h2 className="text-lg font-semibold mb-2">12. Changes to Terms</h2>
                            <p className="text-sm">
                                We reserve the right to update or modify these Terms at any time without prior notice. Continued use of the site after changes implies acceptance.
                            </p>
                        </section>
                        <section>
                            <h2 className="text-lg font-semibold mb-2">13. Contact Us</h2>
                            <p className="text-sm">
                                If you have any questions about these Terms, please contact:
                            </p>
                            <ul className="list-none text-sm space-y-1">
                                <li>Email: bizz@shopevella.com</li>
                                <li>Phone / WhatsApp: +91-9124230952 / 9867705056</li>
                                <li>Registered Address: CrestHaven Ventures LLP, PO. Januganj, Golaichawk, Ganeswarpur, Dist-Balasore, Odisha- 757019</li>
                            </ul>
                        </section>
                    </div>
                </div>
            </main>
        </>
    );
}

export default TermsPage;
