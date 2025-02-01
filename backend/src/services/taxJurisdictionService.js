import prisma from '../config/db.js';

class TaxJurisdictionService{
    async getAllTaxJurisdictions(){
    return await prisma.taxJurisdiction.findMany();
  };
  
  async createTaxJurisdiction(data){
    return await prisma.taxJurisdiction.create({
      data: {
        country: data.country,
        state: data.state,
        city: data.city,
        base_tax_rate: data.base_tax_rate,
        additional_tax_rules: data.additional_tax_rules
      }
    });
  };
}

export default new TaxJurisdictionService();