"use strict";

const BaseExceptionHandler = use("BaseExceptionHandler");
const Logger = use("Logger");
/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle(error, { request, response }) {
    if (error.name === "ValidationException") {
      response.status(error.status).send({
        error: error.messages
      });
      return;
    }
    if (error.name === "ForbiddenException") {
      response
        .status(error.status)
        .send("Você não tem permissão para acessar essa área");
      return;
    }
    response.status(error.status).send(error.message);
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report(error, { request }) {
    // console.log(request.all());
    console.log(error);
    // console.log(error.status);

    if (error.status >= 500) {
      Logger.error(error.message, {
        stack: error.stack,
        message: error.message,
        status: error.status,
        name: error.name
      });
    }
  }
}

module.exports = ExceptionHandler;
