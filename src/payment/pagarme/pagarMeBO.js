const logger = require('../config/logger');

class PagarMeBO {
  constructor(dependencies) {
    this.requestHelper = dependencies.requestHelper;
    this.settings = dependencies.settings;
  }

  async sendOrder(order) {
    try {
      const url = this.settings.pagarme.ordersUrl;
      const token = this.settings.pagarme.token;

      const response = await this.requestHelper.post(
        url,
        order,
        { headers: {
          Authorization: token,
        }},
      );

      return response;
    } catch (error) {
      logger.error('An error occurred: %o', error);
      throw error;
    }
  }
}

module.exports = PagarMeBO;