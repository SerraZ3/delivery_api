"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Pagination {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle(ctx, next) {
    // call next to advance the request

    if (ctx.request.method() === "GET") {
      const page = parseInt(ctx.request.input("page"));
      const limit = parseInt(ctx.request.input("limit"));

      if (page === 0) page = 1;
      if (limit === 0) limit = 25;
      ctx.pagination = { page, limit };

      const perpage = parseInt(ctx.request.input("perpage"));
      if (perpage) {
        if (perpage === 0) perpage = 10;
        ctx.pagination.limit = perpage;
      }
    }
    await next();
  }
}

module.exports = Pagination;
