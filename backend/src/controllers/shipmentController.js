import { errorHandler } from '../utils/errorHandler.js';
import { validateShipmentStatus } from '../utils/validation.js';
import shipmentService from '../services/shipmentService.js';
  
  class ShipmentController{
    async getShipments (req, res) {
      try {
        const shipments = await shipmentService.getAllShipments();
        res.json(shipments);
      } catch (error) {
        errorHandler(error, req, res);
      }
    };
    
    async updateShipment (req, res){
      try {
        const { id } = req.params;
        const { status } = req.body;
    
        // Validate the status
        if (!validateShipmentStatus(status)) {
          return res.status(400).json({
            message: 'Invalid shipment status',
            validStatuses: ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED']
          });
        }
        
        const updatedShipment = await shipmentService.updateShipmentStatus(id, status);
        res.json(updatedShipment);
      } catch (error) {
        errorHandler(error, req, res);
      }
    };
  }

  export default new ShipmentController();
  