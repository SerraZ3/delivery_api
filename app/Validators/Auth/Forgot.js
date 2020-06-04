"use strict";

class AuthForgot {
  get rules() {
    return {
      // validation rules
      email: "required|email|string"
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
      "email.required": "O e-mail é obrigatório",
      "email.email": "O e-mail inválido"
    };
  }
}

module.exports = AuthForgot;
