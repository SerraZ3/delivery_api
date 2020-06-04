"use strict";

class AuthLogin {
  get rules() {
    return {
      // validation rules
      email: "required|email|unique:users|string",
      password: "required|confirmed|string",
      password_confirmation: "required|string",
      "person.name": "requiredIf:person|string",
      "person.cpf": "requiredIf:person|string",
      "person.date_birth": "requiredIf:person|string"
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
      "email.unique": "O e-mail já está cadastrado",
      confirmed: "As senhas não coincidem",
      "password.required": "A senha é obrigatório",
      "password_confirmation.required": "A confirmação da senha é obrigatório",
      "person.name.requiredIf": "O nome da pessoa é obrigatório",
      "person.cpf.requiredIf": "O CPF da pessoa é obrigatório",
      "person.date_birth.requiredIf":
        "A data de nascimento da pessoa é obrigatório"
    };
  }
}

module.exports = AuthLogin;
