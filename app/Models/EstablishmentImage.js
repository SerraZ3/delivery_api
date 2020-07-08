"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class EstablishmentImage extends Model {
  image() {
    return this.belongsTo("App/Models/Image");
  }

  establishment() {
    return this.belongsTo("App/Models/Establishment");
  }

  /**
   * Override this method or it will try to return id on save.
   */
  // static get primaryKey() {
  //   return null;
  // }

  // static get incrementing() {
  //   return false;
  // }
}

module.exports = EstablishmentImage;
