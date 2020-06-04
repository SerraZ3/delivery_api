"use strict";

class AuthLogin {
  get rules() {
    return {
      // validation rules
      email: "required|email|string",
      password: "required|string"
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
      "email.email": "O e-mail inválido",
      "password.required": "A senha é obrigatório"
    };
  }
}

module.exports = AuthLogin;
