"use strict";

const ProductCategory = use("App/Models/ProductCategory");
const Transform = use("App/Transformers/Admin/ProductCategoryTransformer");
const Database = use("Database");

/**
 * Resourceful controller for interacting with productcategories
 */
class ProductCategoryCategoryController {
  /**
   * Show a list of all productCategories.
   * GET productCategories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Transform} ctx.transform
   */
  async index({ request, response, pagination, transform }) {
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
    productCategories = await transform.paginate(productCategories, Transform);

    return response.send(productCategories);
  }
  /**
   * Display a single product.
   * GET product-categories/:id
   *
   * @param {object} ctx
   * @param {Transform} ctx.transform
   * @param {Response} ctx.response
   */
  async show({ params: { id }, transform, response }) {
    let product = await ProductCategory.findOrFail(id);

    product = await transform.item(
      product,
      "Admin/ProductCategoryTransformer.withTimestamp"
    );
    return response.send(product);
  }

  /**
   * Create/save a new product.
   * POST productCategories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Transform} ctx.transform
   */
  async store({ request, response, transform }) {
    const trx = await Database.beginTransaction();

    try {
      const { name, description, image_id, product_id } = request.all();
      let productCategories = await ProductCategory.create(
        {
          name,
          description
        },
        trx
      );

      if (image_id.length > 0) {
        await productCategories.images().attach(image_id, null, trx);
      }
      if (product_id.length > 0) {
        await productCategories.products().attach(product_id, null, trx);
      }
      await trx.commit();

      productCategories = await transform.item(productCategories, Transform);

      return response.status(201).send(productCategories);
    } catch (error) {
      await trx.rollback();

      response
        .status(400)
        .send({ message: "Não foi possivel criar o produto nesse momento!" });
    }
  }

  /**
   * Update product details.
   * PUT or PATCH product-categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response, transform }) {
    const trx = await Database.beginTransaction();
    let productCategories = await ProductCategory.findOrFail(id);
    try {
      const { name, description, image_id, product_id } = request.all();

      productCategories.merge({ name, description });
      await productCategories.save(trx);

      if (image_id.length > 0) {
        await productCategories.images().sync(image_id, null, trx);
      }
      if (product_id.length > 0) {
        await productCategories.products().sync(product_id, null, trx);
      }
      await trx.commit();

      productCategories = await transform.item(productCategories, Transform);

      return response.send(productCategories);
    } catch (error) {
      return response
        .status(400)
        .send({ message: "Não foi possivel atualizar esse produto!" });
    }
  }

  /**
   * Delete a product with id.
   * DELETE product-categories/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, response }) {
    const trx = await Database.beginTransaction();
    const productCategories = await ProductCategory.findOrFail(id);
    try {
      await productCategories.delete(trx);
      trx.commit();
      return response.status(204).send();
    } catch (error) {
      trx.rollback();
      return response
        .status(500)
        .send({ message: "Não foi possivel deletar esse produto" });
    }
  }
}

module.exports = ProductCategoryCategoryController;
