import prisma from "../config/db.js";

class AddressService {
  
  async getAllAddresses(userId, userRole) {
    if(userRole == "ADMIN"){
      return prisma.address.findMany();
    }
    return prisma.address.findMany({
      where: { user_id: userId },
      orderBy: { is_primary: "desc" },
    });
  }

  async getAddressById(id) {
    return prisma.address.findUnique({ where: { id } });
  }

  async createAddress(data) {
    if (data.is_primary) {
      await prisma.address.updateMany({
        where: { user_id: data.user_id },
        data: { is_primary: false },
      });
    }
    return prisma.address.create({ data });
  }

  async updateAddress(id, data) {
    if (data.is_primary) {
      await prisma.address.updateMany({
        where: { user_id: data.user_id },
        data: { is_primary: false },
      });
    }
    return prisma.address.update({ where: { id }, data });
  }

  async deleteAddress(id) {
    return prisma.address.delete({ where: { id } });
  }
}

export default new AddressService();