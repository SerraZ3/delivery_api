"use strict";

class AdminOrderUpdate {
  get rules() {
    return {
      // validation rules
      order_status_id: "integer",
      person_id: "integer"
    };
  }
  // Mostra todos os erros ao inves de apenas um
  get validateAll() {
    return true;
  }
  // Personaliza a mensagem de validação
  get messages() {
    return {
      integer: "O campo '{{field}}' deve ser um inteiro"
    };
  }
}

module.exports = AdminOrderUpdate;
