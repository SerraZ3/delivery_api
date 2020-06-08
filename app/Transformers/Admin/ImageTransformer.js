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
  transform(model) {
    if (model.length > 0) {
      let date = [];
      model.map((val, idx) => {
        model[idx] = val.toJSON();
        date.push({
          id: model[idx].id,
          url: model[idx].url,
          size: model[idx].size,
          original_name: model[idx].original_name,
          extension: model[idx].extension
        });
      });
      return date;
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
  }
}

module.exports = ImageTransformer;