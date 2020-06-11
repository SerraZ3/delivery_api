"use strict";

class AdminDeliveryTypeUpdate {
  get rules() {
    return {
      // validation rules
      name: "string",
      price: "number"
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
      string: "O campo '{{field}}' deve ser uma string"
    };
  }
}

module.exports = AdminDeliveryTypeUpdate;
