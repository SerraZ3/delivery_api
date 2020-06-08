"use strict";

class AdminImageUpdate {
  get rules() {
    return {
      original_name: "required|string"
    };
  }
  // Mostra todos os erros ao inves de apenas um
  get validateAll() {
    return true;
  }
  // Personaliza a mensagem de validação
  get messages() {
    return {
      required: "O campo '{{field}}' é obrigatório",
      string: "O campo '{{field}}' deve ser uma string"
    };
  }
}

module.exports = AdminImageUpdate;
