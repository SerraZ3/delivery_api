"use strict";

class AdminUserStore {
  get rules() {
    return {
      // validation rules
      email: "required|email|unique:users,email|string",
      "person.name": "requiredIf:person|string",
      "person.cpf": "requiredIf:person|string",
      "person.date_birth": "requiredIf:person|string",
      roles_id: "array",
      permissions_id: "array"
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
      string: "O campo '{{field}}' deve ser uma string",
      "email.required": "O e-mail é obrigatório",
      "email.email": "O e-mail inválido",
      "email.unique": "O e-mail já está cadastrado",
      "person.name.requiredIf": "O nome da pessoa é obrigatório",
      "person.cpf.requiredIf": "O CPF da pessoa é obrigatório",
      "person.date_birth.requiredIf":
        "A data de nascimento da pessoa é obrigatório"
    };
  }
}

module.exports = AdminUserStore;
