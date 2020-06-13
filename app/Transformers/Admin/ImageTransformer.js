"use strict";

const BumblebeeTransformer = use("Bumblebee/Transformer");

/**
 * ImageTransformer class
 *
 * @class ImageTransformer
 * @constructor
 */
class ImageTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform = (model) => {
    if (model.length > 0) {
      return model.map((image) => {
        image = image.toJSON();
        return {
          id: image.id,
          url: image.url,
          size: image.size,
          original_name: image.original_name,
          extension: image.extension
        };
      });
    } else {
      model = model.toJSON();
      return {
        // add your transformation object here
        id: model.id,
        url: model.url,
        size: model.size,
        original_name: model.original_name,
        extension: model.extension
      };
    }
  };
  transformWithTimestamp = (model) => {
    if (model.length > 0) {
      return model.map((image) => {
        image = image.toJSON();
        return {
          id: image.id,
          url: image.url,
          size: image.size,
          original_name: image.original_name,
          extension: image.extension,
          created_at: model.created_at,
          updated_at: model.updated_at
        };
      });
    } else {
      model = model.toJSON();
      return {
        // add your transformation object here
        id: model.id,
        url: model.url,
        size: model.size,
        original_name: model.original_name,
        extension: model.extension,
        created_at: model.created_at,
        updated_at: model.updated_at
      };
    }
  };
}

module.exports = ImageTransformer;
