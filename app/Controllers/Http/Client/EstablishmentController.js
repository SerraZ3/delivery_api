"use strict";

const Establishment = use("App/Models/Establishment");
const Transform = use("App/Transformers/Admin/EstablishmentTransformer");
const Database = use("Database");

/**
 * Resourceful controller for interacting with establishments
 */
class EstablishmentController {
  /**
   * Show a list of all establishments.
   * GET establishments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Transform} ctx.transform
   */
  async index({ request, response, pagination, transform }) {
    const { name, way, order } = request.all();

    const query = Establishment.query();

    if (name) {
      // LIKE  = Case sitive
      // ILIKE = Not Case sitive
      query.where("name", "ILIKE", `%${name}%`);
      // query.orWhere("description", "ILIKE", `%${name}%`);
    }
    if (way == "asc") {
      switch (order) {
        case "name":
          query.orderBy("name");
          break;
        default:
          query.orderBy("id");
          break;
      }
    } else {
      switch (order) {
        case "name":
          query.orderBy("name", "desc");
          break;
        default:
          query.orderBy("id", "desc");
          break;
      }
    }

    let establishments = await query.paginate(
      pagination.page,
      pagination.limit
    );
    establishments = await transform.paginate(establishments, Transform);

    return response.send(establishments);
  }
  /**
   * Display a single establishments.
   * GET establishments/:id
   *
   * @param {object} ctx
   * @param {Transform} ctx.transform
   * @param {Response} ctx.response
   */
  async show({ params: { id }, response, transform }) {
    let establishment = await Establishment.findOrFail(id);

    establishment = await transform.item(
      establishment,
      "Admin/EstablishmentTransformer.withTimestamp"
    );

    return response.send(establishment);
  }
}

module.exports = EstablishmentController;
