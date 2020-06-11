"use strict";

class AdminUserUpdate {
  get rules() {
    return {
      // validation rules
      email: "email|unique:users,email|string",
      "person.name": "string",
      "person.cpf": "string",
      "person.date_birth": "string",
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
      "email.email": "O e-mail inválido",
      "email.unique": "O e-mail já está cadastrado"
    };
  }
}

module.exports = AdminUserUpdate;
