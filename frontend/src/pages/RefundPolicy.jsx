import React from 'react';
import Footer from '../components/layouts/components/Footer';

function AboutUs() {
return (
    <>
        <main className="flex-grow px-4 py-12 bg-white">
            <div className="container mx-auto max-w-4xl">
                <h1 className="text-2xl font-bold mb-6">Cancellation & Refund Policy</h1>
                <p className="text-sm text-gray-600 mb-4">Last updated on 27-04-2025 17:04:04</p>
                <p className="mb-4">
                    CRESTHAVEN VENTURES LLP believes in helping its customers as far as possible and has
                    therefore adopted a liberal cancellation policy. Under this policy:
                </p>
                <ul className="list-disc list-inside mb-4">
                    <li>
                        Cancellations will be considered only if the request is made immediately after placing the
                        order. However, the cancellation request may not be entertained if the orders have been
                        communicated to the vendors/merchants and they have initiated the process of shipping them.
                    </li>
                    <li>
                        CRESTHAVEN VENTURES LLP does not accept cancellation requests for perishable items
                        like flowers, eatables, etc. However, refund/replacement can be made if the customer
                        establishes that the quality of the product delivered is not good.
                    </li>
                    <li>
                        In case of receipt of damaged or defective items, please report the same to our Customer
                        Service team. The request will be entertained once the merchant has checked and determined
                        the same at their end. This should be reported within 15 days of receipt of the products.
                    </li>
                    <li>
                        If you feel that the product received is not as shown on the site or as per your expectations,
                        you must bring it to the notice of our customer service within 15 days of receiving the
                        product. The Customer Service Team, after reviewing your complaint, will take an appropriate
                        decision.
                    </li>
                    <li>
                        For complaints regarding products that come with a warranty from manufacturers, please
                        refer the issue to them. In case of any refunds approved by CRESTHAVEN VENTURES LLP,
                        it will take 9-15 days for the refund to be processed to the end customer.
                    </li>
                </ul>
            </div>
        </main>
    </>
);
}

export default AboutUs;
