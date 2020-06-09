"use strict";
const { rule } = use("Validator");

class AdminOrderStatusStore {
  get rules() {
    return {
      // validation rules
      name: "required|string",
      slug: "required|string",
      color: "required|string"
    };
  }
  // Mostra todos os erros ao inves de apenas um
  get validateAll() {
    return true;
  }
  // Personaliza a mensagem de validação
  get messages() {
    return {
      array: "O campo '{{field}}' deve ser um array",
      string: "O campo '{{field}}' deve ser uma string",
      required: "O campo '{{field}}' é obrigatório"
    };
  }
}

module.exports = AdminOrderStatusStore;
