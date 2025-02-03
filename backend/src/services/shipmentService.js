import prisma from '../config/db.js';

class ShipmentService{
  async getAllShipments () {
    return await prisma.orderShipment.findMany({
      include: {
        order: {
          select: {
            order_number: true,
            user: {
              select: {
                name: true,
                email: true
              }
            },
            shipping_address: true
          }
        }
      }
    });
  };
  
  async updateShipmentStatus (id, status) {
    const updateData = {
      status,
      // Add timestamps based on status
      ...(status === 'SHIPPED' && { shipped_at: new Date() }),
      ...(status === 'DELIVERED' && { 
        estimated_delivery: new Date() // Update estimated delivery to actual delivery time
      })
    };
  
    const updatedShipment = await prisma.orderShipment.update({
      where: { id },
      data: updateData,
      include: {
        order: {
          select: {
            order_number: true,
            user: {
              select: {
                name: true,
                email: true
              }
            },
            shipping_address: true
          }
        }
      }
    });
  
    // Also update the order status to match the shipment status
    await prisma.order.update({
      where: { id: updatedShipment.order_id },
      data: { status }
    });
  
    return updatedShipment;
  };
}

export default new ShipmentService();
