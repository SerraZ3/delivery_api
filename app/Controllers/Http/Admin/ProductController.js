"use strict";

const Product = use("App/Models/Product");
const Transform = use("App/Transformers/Admin/ProductTransformer");
const Database = use("Database");
/**
 * Resourceful controller for interacting with products
 */
class ProductController {
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Transform} ctx.transform
   */
  async index({ request, response, pagination, transform }) {
    const name = request.input("name");

    const query = Product.query();

    if (name) {
      // LIKE  = Case sitive
      // ILIKE = Not Case sitive
      query.where("name", "ILIKE", `%${name}%`);
    }

    let products = await query.paginate(pagination.page, pagination.limit);
    products = await transform.paginate(products, Transform);

    return response.send(products);
  }
  /**
   * Display a single product.
   * GET products/:id
   *
   * @param {object} ctx
   * @param {Transform} ctx.transform
   * @param {Response} ctx.response
   */
  async show({ params: { id }, transform, response }) {
    let product = await Product.findOrFail(id);

    product = await transform.item(product, Transform);
    return response.send(product);
  }

  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Transform} ctx.transform
   */
  async store({ request, response, transform }) {
    const trx = await Database.beginTransaction();

    try {
      const {
        name,
        description,
        price,
        image_id,
        product_category_id
      } = request.all();
      let product = await Product.create(
        {
          name,
          description,
          price
        },
        trx
      );

      if (image_id.length > 0) {
        await product.images().attach(image_id, null, trx);
      }
      if (product_category_id.length > 0) {
        await product
          .productCategories()
          .attach(product_category_id, null, trx);
      }
      await trx.commit();

      product = await transform.item(product, Transform);

      return response.status(201).send(product);
    } catch (error) {
      await trx.rollback();

      response
        .status(400)
        .send({ message: "Não foi possivel criar o produto nesse momento!" });
    }
  }

  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response, transform }) {
    const trx = await Database.beginTransaction();
    let product = await Product.findOrFail(id);
    try {
      const {
        name,
        description,
        price,
        image_id,
        product_category_id
      } = request.all();

      product.merge({ name, description, price });
      await product.save(trx);

      if (image_id.length > 0) {
        await product.images().sync(image_id, null, trx);
      }
      if (product_category_id.length > 0) {
        await product.productCategories().sync(product_category_id, null, trx);
      }
      await trx.commit();

      product = await transform.item(product, Transform);

      return response.send(product);
    } catch (error) {
      return response
        .status(400)
        .send({ message: "Não foi possivel atualizar esse produto!" });
    }
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, response }) {
    const trx = await Database.beginTransaction();
    const product = await Product.findOrFail(id);
    try {
      await product.delete(trx);
      trx.commit();
      return response.status(204).send();
    } catch (error) {
      trx.rolback();
      return response
        .status(500)
        .send({ message: "Não foi possivel deletar esse produto" });
    }
  }
}

module.exports = ProductController;
