"use strict";

class AdminLoyaltycardStore {
  get rules() {
    return {
      code: "required|string",
      discount_application: "required|string",
      type: "required|string|in:percent,cash",
      value: "required|number",
      recursive: "required|boolean",
      active: "required|boolean",
      apply_total_order: "required|boolean",
      product_categories: "required|array",
      products: "required|array"
    };
  }
  // Mostra todos os erros ao inves de apenas um
  get validateAll() {
    return true;
  }
  // Personaliza a mensagem de validação
  get messages() {
    return {
      string: "O campo '{{field}}' deve ser uma string",
      number: "O campo '{{field}}' deve ser um float",
      boolean: "O campo '{{field}}' deve ser um boleano",
      array: "O campo '{{field}}' deve ser um array",
      in: "O campo '{{field}}' aceita apenas {{ argument }}",
      required: "O campo '{{field}}' é obrigatório"
    };
  }
}

module.exports = AdminLoyaltycardStore;
