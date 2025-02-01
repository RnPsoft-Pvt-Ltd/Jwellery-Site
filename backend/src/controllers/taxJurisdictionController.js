import taxJurisdictionService from '../services/taxJurisdictionService.js';
import {errorHandler} from '../utils/errorHandler.js';
  
  class TaxJurisdictionController {
    async getTaxJurisdictions(req, res){
        try {
          const taxJurisdictions = await taxJurisdictionService.getAllTaxJurisdictions();
          res.json(taxJurisdictions);
        } catch (error) {
          errorHandler(error,req, res);
        }
      };
      
      async addTaxJurisdiction(req, res){
        try {
          const { country, state, city, base_tax_rate, additional_tax_rules } = req.body;
          
          const newTaxJurisdiction = await taxJurisdictionService.createTaxJurisdiction({
            country,
            state,
            city,
            base_tax_rate,
            additional_tax_rules
          });
          
          res.status(201).json(newTaxJurisdiction);
        } catch (error) {
          errorHandler(error,req, res);
        }
      };
  }

    export default new TaxJurisdictionController();
  