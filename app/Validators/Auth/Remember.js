"use strict";

class AuthRemember {
  get rules() {
    return {
      // validation rules
      token: "required|string"
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
      "token.required": "O token é obrigatório"
    };
  }
}

module.exports = AuthRemember;
