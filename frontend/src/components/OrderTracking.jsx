import { Check, Package, Truck } from "lucide-react"

function OrderTracking({ orderId, status, trackingId, items, shippingAddress }) {
  const steps = [
    {
      title: "Order Processed",
      icon: Check,
      completed: ["processing", "shipped", "delivered"].includes(status),
    },
    {
      title: "Order Shipped",
      icon: Truck,
      completed: ["shipped", "delivered"].includes(status),
      trackingId,
    },
    {
      title: "Delivered",
      icon: Package,
      completed: ["delivered"].includes(status),
    },
  ]

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Order Status</h2>
        <p className="text-gray-600">Order #{orderId}</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <div className="relative space-y-4">
            {steps.map((step, index) => (
              <div key={step.title} className="flex items-center gap-4">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                    step.completed ? "border-green-500 bg-green-500 text-white" : "border-gray-300"
                  }`}
                >
                  <step.icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{step.title}</p>
                  {step.trackingId && <p className="text-sm text-gray-600">Tracking ID: {step.trackingId}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="mb-2 font-semibold">Order Details</h3>
            <div className="space-y-2">
              {items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span>Rs.{item.price * item.quantity}</span>
                </div>
              ))}
              <div className="flex justify-between border-t pt-2 font-semibold">
                <span>Total</span>
                <span>Rs.{total}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">Shipping Address</h3>
            <div className="text-sm text-gray-600">
              <p>{shippingAddress.street}</p>
              <p>
                {shippingAddress.city}, {shippingAddress.state} {shippingAddress.pincode}
              </p>
              <p>Contact: {shippingAddress.contact}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderTracking

