"use strict";

const ProductCategory = use("App/Models/ProductCategory");
const Product = use("App/Models/Product");
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
  /**
   * Show a list of all productCategories.
   * GET productCategories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Transform} ctx.transform
   */
  async categoryListBest({ request, response, pagination, transform }) {
    const { name, findByCategory } = request.all();

    const query = ProductCategory.query();

    if (name) {
      // LIKE  = Case sitive
      // ILIKE = Not Case sitive
      query.where("name", "ILIKE", `%${name}%`);
      query.orWhere("description", "ILIKE", `%${name}%`);
    }

    // Busca os 10 produtos mais vendidos
    // SELECT top.product_id, top.total, products.name, products.price
    // FROM (SELECT order_products.product_id AS product_id, sum(quantity) AS total
    // FROM order_products
    // GROUP BY order_products.product_id
    // ORDER BY total desc) top
    // JOIN (SELECT distinct * FROM products) products ON products.id = top.product_id
    // ORDER BY total desc

    let queryProducts =
      "SELECT top.product_id, top.total, products.name, products.price " +
      "FROM (SELECT order_products.product_id AS product_id, sum(quantity) AS total " +
      "FROM order_products " +
      "GROUP BY order_products.product_id " +
      "ORDER BY total desc) top " +
      "JOIN (SELECT distinct * FROM products) products ON products.id = top.product_id " +
      "ORDER BY total desc " +
      "LIMIT 10 ";
    const productBetterSeller = await Database.raw(queryProducts);
    // Busca pelos produtos mais vendidos por catégoria
    let queryCategory =
      "SELECT top.product_id, top.total, product_category_id, product_categories.name " +
      "FROM (SELECT order_products.product_id AS product_id, sum(quantity) AS total " +
      "FROM order_products " +
      "GROUP BY order_products.product_id " +
      "ORDER BY total desc) top " +
      "JOIN (SELECT distinct * FROM product_product_categories) category ON category.product_id = top.product_id " +
      "JOIN product_categories ON category.product_category_id = product_categories.id " +
      "WHERE product_categories.name ILIKE ? " +
      "ORDER BY product_categories.name, total desc, product_category_id ";

    const betterSellerByCategory = await Database.raw(queryCategory, [
      `%${findByCategory}%`
    ]);

    let bestProducts = await transform.collection(
      productBetterSeller,
      async (model) => {
        let product = await Product.find(model.product_id);
        let images = (await product.images().fetch()).toJSON();
        return {
          id: model.product_id,
          total: model.total,
          name: model.name,
          price: model.price,
          images: images
        };
      }
    );
    const betterSellerProduct = {
      data: { products: bestProducts }
    };
    let productCategories = await query.paginate(
      pagination.page,
      pagination.limit
    );
    productCategories = await transform
      .include("products")
      .paginate(productCategories, Transform);

    return response.send({
      betterSellerCategory: betterSellerByCategory.rows,
      betterSellerProduct,
      productCategories
    });
  }
}

module.exports = ProductController;
