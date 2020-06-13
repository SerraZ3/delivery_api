"use strict";

class AdminCouponUpdate {
  get rules() {
    return {
      code: "string",
      discount_application: "string",
      type: "string|in:percent,cash",
      value: "number",
      quantity: "integer",
      recursive: "boolean",
      active: "boolean",
      apply_total_order: "boolean",
      product_categories: "array",
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
      string: "O campo '{{field}}' deve ser uma string",
      number: "O campo '{{field}}' deve ser um float",
      integer: "O campo '{{field}}' deve ser um inteiro",
      boolean: "O campo '{{field}}' deve ser um boleano",
      array: "O campo '{{field}}' deve ser um array",
      in: "O campo '{{field}}' aceita apenas {{ argument }}",
      required: "O campo '{{field}}' é obrigatório"
    };
  }
}

module.exports = AdminCouponUpdate;
