import { Injectable } from '@nestjs/common';

import pagarme from 'pagarme';

@Injectable()
export class PagarmeRepository {
  private pagarmeApp: pagarme;
  private url: string;
  private token: string;

  constructor() {
    this.pagarmeApp = this.connect();
    this.url = this.getEnviroment('PAGARME_ORDERS_URL');
    this.token = `Basic ${Buffer.from(
      `${this.getEnviroment('PAGARME_TOKEN')}:`,
    ).toString('base64')}`;
  }

  connect = () => {
    return pagarme.client.connect({
      api_key: 'ak_test_y7jk294ynbzf93',
    });
  };

  getEnviroment(name) {
    try {
      const value = process.env[name];

      if (!value) {
        throw Error(`An enviroment variable ${name} not foud`);
      }

      return value;
    } catch (err) {
      return err;
    }
  }

  /*async sendOrder(order) {
    try {
      const response = await this.requestHelper.post(this.url, order, {
        headers: {
          Authorization: this.token,
        },
      });

      return response;
    } catch (error) {
      throw error;
    }
  }*/

  getAllTransactions = () => {
    return this.pagarmeApp.transactions.all();
  };

  encrypt = (card: {
    card_number: string;
    card_holder_name: string;
    card_expiration_date: string;
    card_cvv: string;
  }) => {
    return this.pagarmeApp.security.encrypt(card);
  };

  getPlans = () => {
    return this.pagarmeApp.plans.all();
  };

  createPlans = () => {
    return this.pagarmeApp.plans.create();
  };

  getPlanById = (id: string) => {
    return this.pagarmeApp.plans.find(id);
  };

  updatePlanById = (id: string) => {
    return this.pagarmeApp.plans.update(id);
  };

  getSubscriptions = () => {
    return this.pagarmeApp.subscriptions.all();
  };

  createSubscriptions = () => {
    return this.pagarmeApp.subscriptions.create();
  };

  createSubscriptionTransaction = (id: string) => {
    return this.pagarmeApp.subscriptions.transactions(id);
  };

  getSubscriptionTransactionById = (id: string) => {
    return this.pagarmeApp.subscriptions.find(id);
  };

  getSubscriptionTransactions = (id: string) => {
    return this.pagarmeApp.subscriptions.findTransactions(id);
  };

  updateSubscriptionById = (id: string) => {
    return this.pagarmeApp.subscriptions.update(id);
  };

  cancelSubscriptionById = (id: string) => {
    return this.pagarmeApp.subscriptions.cancel(id);
  };
}
