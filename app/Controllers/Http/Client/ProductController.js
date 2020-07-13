"use strict";

const ProductCategory = use("App/Models/ProductCategory");
const Establishment = use("App/Models/Establishment");
const Transform = use("App/Transformers/Admin/ProductCategoryTransformer");
const Database = use("Database");

class ProductController {
  /**
   * Show a list of all productCategories.
   * GET productCategories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Transform} ctx.transform
   */
  async categoryList({ request, response, pagination, transform }) {
    const name = request.input("name");

    const query = ProductCategory.query();

    if (name) {
      // LIKE  = Case sitive
      // ILIKE = Not Case sitive
      query.where("name", "ILIKE", `%${name}%`);
      query.orWhere("description", "ILIKE", `%${name}%`);
    }

    let productCategories = await query.paginate(
      pagination.page,
      pagination.limit
    );
    productCategories = await transform
      .include("products")
      .paginate(productCategories, Transform);

    return response.send(productCategories);
  }
  /**
   * Show a list of all productCategories in establishment.
   * GET productCategories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Transform} ctx.transform
   */
  async listByEstablishment({
    params: { id },
    request,
    response,
    pagination,
    transform
  }) {
    try {
      await Establishment.findOrFail(id);

      const name = request.input("name");

      const query = ProductCategory.query();

      if (name) {
        // LIKE  = Case sitive
        // ILIKE = Not Case sitive
        query.where("name", "ILIKE", `%${name}%`);
        query.where("establishment_id", id);
      } else {
        query.where("establishment_id", id);
      }

      let productCategories = await query.paginate(
        pagination.page,
        pagination.limit
      );
      productCategories = await transform
        .include("products")
        .paginate(productCategories, Transform);

      return response.send(productCategories);
    } catch (error) {
      return response
        .status(400)
        .send({ message: "Establishment not found", error: error.name });
    }
  }
}

module.exports = ProductController;
