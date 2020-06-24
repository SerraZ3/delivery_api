"use strict";

class AuthRegisterEstablishment {
  get rules() {
    return {
      // validation rules
      email: "required|email|string",
      password: "string",
      phone: "string",
      password_confirmation: "string",
      "person.name": "requiredIf:person|string",
      "person.cpf": "requiredIf:person|string",
      "person.date_birth": "requiredIf:person|string",
      establishment: "required|object",
      "establishment.name": "requiredIf:establishment|string",
      "establishment.description": "requiredIf:establishment|string"
    };
  }
  // Mostra todos os erros ao inves de apenas um
  get validateAll() {
    return true;
  }
  // Personaliza a mensagem de validação
  get messages() {
    return {
      object: "O campo '{{field}}' deve ser um objeto",
      string: "O campo '{{field}}' deve ser uma string",
      "email.required": "O e-mail é obrigatório",
      "email.email": "O e-mail inválido",
      "email.unique": "O e-mail já está cadastrado",
      confirmed: "As senhas não coincidem",
      "password.required": "A senha é obrigatório",
      "password_confirmation.required": "A confirmação da senha é obrigatório",
      "establishment.name.requiredIf":
        "O nome do estabelecimento é obrigatório",
      "establishment.description.requiredIf":
        "Uma breve descrição do estabelecimento é obrigatório",
      "person.name.requiredIf": "O nome da pessoa é obrigatório",
      "person.cpf.requiredIf": "O CPF da pessoa é obrigatório",
      "person.date_birth.requiredIf":
        "A data de nascimento da pessoa é obrigatório"
    };
  }
}

module.exports = AuthRegisterEstablishment;
