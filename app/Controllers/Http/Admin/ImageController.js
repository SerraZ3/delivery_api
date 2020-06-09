"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Image = use("App/Models/Image");
const Transformer = use("App/Transformers/Admin/ImageTransformer");
const { manage_single_upload, manage_multiple_upload } = use(
  "App/Helpers/files"
);
const Helpers = use("Helpers");
const fs = use("fs");
/**
 * Resourceful controller for interacting with images
 */
class ImageController {
  /**
   * Show a list of all images.
   * GET images
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ response, transform, pagination }) {
    let images = await Image.query()
      .orderBy("id", "DESC")
      .paginate(pagination.page, pagination.limit);
    images = await transform.paginate(images, Transformer);
    return response.send(images);
  }

  /**
   * Create/save a new image.
   * POST images
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, transform }) {
    try {
      // Captura uma image ou mais do request
      const fileJar = request.file("images", {
        types: ["image"],
        size: "2mb"
      });
      //Retorno do usuário
      let images = [];
      //Caso seja um unico arquivo - manage_single_upload
      //Caso seja multiplos arquivo - manage_multiple_upload
      if (!fileJar.files) {
        const file = await manage_single_upload(fileJar);

        if (file.moved()) {
          let image = await Image.create({
            path: file.fileName,
            size: file.size,
            original_name: file.clientName,
            extension: file.subtype
          });
          image = await transform.item(image, Transformer);
          images.push(image);
          return response.status(201).send({ successes: images, errors: {} });
        }
        return response.status(400).send({
          message: "Não foi possivel acessar esta imagem no momento!"
        });
      }
      let files = await manage_multiple_upload(fileJar);
      await Promise.all(
        files.successes.map(async (file) => {
          let image = await Image.create({
            path: file.fileName,
            size: file.size,
            original_name: file.clientName,
            extension: file.subtype
          });
          image = await transform.item(image, Transformer);

          images.push(image);
        })
      );
      return response
        .status(201)
        .send({ successes: images, errors: files.errors });
    } catch (error) {
      console.log(error);

      return response
        .status(400)
        .send({ message: "Não foi possivel processar sua operação" });
    }
  }

  /**
   * Display a single image.
   * GET images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params: { id }, response, transform }) {
    let image = await Image.findOrFail(id);
    image = await transform.item(image, "Admin/ImageTransformer.withTimestamp");

    response.send(image);
  }

  /**
   * Update image details.
   * PUT or PATCH images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response, transform }) {
    let image = await Image.findOrFail(id);
    try {
      image.merge({ original_name: request.input("original_name") });
      image.save();

      image = await transform.item(image, Transformer);
      console.log(image);
      return response.status(200).send(image);
    } catch (error) {
      return response
        .status(400)
        .send({ message: "Não foi possivel atualizar essa imagem no momento" });
    }
  }

  /**
   * Delete a image with id.
   * DELETE images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, request, response }) {
    var image = await Image.findOrFail(id);
    try {
      let filepath = Helpers.publicPath(`uploads/${image.path}`);

      fs.unlinkSync(filepath);
      await image.delete();

      return response.status(204).send();
    } catch (error) {
      response
        .status(400)
        .send({ message: "Nâo foi possivel deletar a imagem no momento" });
    }
  }
}

module.exports = ImageController;
