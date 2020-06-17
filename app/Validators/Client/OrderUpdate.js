"use strict";

class ClientOrderUpdate {
  get rules() {
    return {
      // validation rules
      address_id: "integer",
      delivery_type_id: "integer",
      coupons: "array",
      loyalty_card_id: "integer",
      type_payment: "string",
      amount_will_paid: "number",
      products: "array"
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
      string: "O campo '{{field}}' deve ser uma string"
    };
  }
}

module.exports = ClientOrderUpdate;
