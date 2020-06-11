"use strict";

const BumblebeeTransformer = use("Bumblebee/Transformer");

/**
 * PersonTransformer class
 *
 * @class PersonTransformer
 * @constructor
 */
class PersonTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform(model) {
    let date_birth = new Date(model.date_birth);
    let day = date_birth.getDate();
    let month = date_birth.getMonth() + 1;
    let year = date_birth.getFullYear();
    day = day < 10 ? `0${day}` : day;
    month = month < 10 ? `0${month}` : month;
    date_birth = `${day}/${month}/${year}`;

    return {
      // add your transformation object here
      name: model.name,
      cpf: model.cpf,
      date_birth: date_birth
    };
  }
}

module.exports = PersonTransformer;
