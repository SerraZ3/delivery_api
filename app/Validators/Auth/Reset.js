"use strict";

class AuthReset {
  get rules() {
    return {
      // validation rules
      password: "required|confirmed|string",
      password_confirmation: "required|string",
      user_id: "required|integer",
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
      confirmed: "As senhas não coincidem",
      "password.required": "A senha é obrigatório",
      "password_confirmation.required": "A confirmação da senha é obrigatório",
      "user_id.integer": "O ID do usuário deve ser um inteiro",
      "user_id.required": "O ID do usuário é obrigatório",
      "token.required": "O token é obrigatório"
    };
  }
}

module.exports = AuthReset;
