"use strict";

class ClientOrderStore {
  get rules() {
    return {
      // validation rules
      address_id: "required|integer",
      delivery_type_id: "required|integer",
      type_payment: "required|string",
      amount_will_paid: "required|number",
      products: "required|array",
      coupons: "array",
      loyalty_card_id: "integer"
    };
  }
  // Mostra todos os erros ao inves de apenas um
  get validateAll() {
    return true;
  }
  // Personaliza a mensagem de validação
  get messages() {
    return {
      number: "O campo '{{field}}' deve ser um float",
      integer: "O campo '{{field}}' deve ser um integer",
      array: "O campo '{{field}}' deve ser um array",
      string: "O campo '{{field}}' deve ser uma string",
      required: "O campo '{{field}}' é obrigatório"
    };
  }
}

module.exports = ClientOrderStore;
