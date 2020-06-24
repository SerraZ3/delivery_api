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
    return ["person", "establishments"];
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
  includeEstablishments(model) {
    // Pega o relacionamento da categoria com a imagem
    return this.item(model.getRelated("establishments"), (establishments) => {
      if (establishments.length > 0) {
        return establishments.map((establishment) => {
          return {
            id: establishment.id,
            name: establishment.name,
            description: establishment.description
          };
        });
      }
      if (establishments.length === 0) {
        return {};
      } else {
        // Se houver apenas um produto para retornar
        return {
          id: establishments.id,
          name: establishments.name,
          description: establishments.description
        };
      }
    });
  }
}

module.exports = UserTransformer;
