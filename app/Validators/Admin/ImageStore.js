"use strict";

class AdminImageIndex {
  get rules() {
    return {
      images:
        "required|file|file_ext:png,jpg,jpeg|file_size:2mb|file_types:image"
    };
  }
  // Mostra todos os erros ao inves de apenas um
  get validateAll() {
    return true;
  }
  // Personaliza a mensagem de validação
  get messages() {
    return {
      "images.required": "A imagem é obrigatória",
      "images.file": "A imagem deve ser um arquivo",
      "images.fileExt": "A imagem deve ter os seguintes formatos: {{argument}}",
      "images.fileSize": "A imagem deve ter no máximo:{{argument}}",
      "images.fileTypes": "A imagem deve ser do tipo {{argument}}"
    };
  }
}

module.exports = AdminImageIndex;
