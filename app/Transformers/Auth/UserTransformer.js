"use strict";

const BumblebeeTransformer = use("Bumblebee/Transformer");
const PersonTransformer = use("App/Transformers/Auth/PersonTransformer");
/**
 * UserTransformer class
 *
 * @class UserTransformer
 * @constructor
 */
class UserTransformer extends BumblebeeTransformer {
  static get defaultInclude() {
    return ["person"];
  }
  /**
   * This method is used to transform the data.
   */
  transform(model) {
    return {
      // add your transformation object here
      id: model.id,
      email: model.email
    };
  }
  includePerson(model) {
    // Pega o relacionamento da categoria com a imagem
    return this.item(model.getRelated("person"), PersonTransformer);
  }
}

module.exports = UserTransformer;
