import addressService from "../services/addressService.js";

class AddressController {

  async getAllAddresses(req, res, next) {
    try {
      const addresses = await addressService.getAllAddresses(req.user.id, req.user.role);
      res.json(addresses);
    } catch (error) {
      next(error);
    }
  }

  async getAddressById(req, res, next) {
    try {
      const address = await addressService.getAddressById(req.params.id);
      if (!address) {
        return res.status(404).json({ message: "Address not found" });
      }
      res.json(address);
    } catch (error) {
      next(error);
    }
  }

  async createAddress(req, res, next) {
    try {
      const address = await addressService.createAddress({
        ...req.body,
        user_id: req.user.id,
      });
      res.status(201).json(address);
    } catch (error) {
      next(error);
    }
  }

  async updateAddress(req, res, next) {
    try {
      const address = await addressService.updateAddress(req.params.id, req.body);
      res.json(address);
    } catch (error) {
      next(error);
    }
  }

  async deleteAddress(req, res, next) {
    try {
      await addressService.deleteAddress(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new AddressController();
