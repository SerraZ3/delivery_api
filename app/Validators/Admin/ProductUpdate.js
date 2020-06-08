"use strict";

class AdminProductUpdate {
  get rules() {
    return {
      // validation rules
      name: "string",
      description: "string",
      price: "number",
      image_id: "array",
      product_category_id: "array"
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
      number: "O campo '{{field}}' deve ser um numero",
      string: "O campo '{{field}}' deve ser uma string",
      required: "O campo '{{field}}' é obrigatório"
    };
  }
}

module.exports = AdminProductUpdate;
