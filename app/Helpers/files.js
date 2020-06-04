const Helpers = use("Helpers");
const { str_random } = use("App/Helpers/strings");
/**
 * Move um unico arquivo para o caminho especificado, se nenhum for especificado entao o public/uploads será utilizado
 *
 * @param {FileJar} file arquvio a ser gerenciado
 * @param {string} path caminho onde o arquvio deve ser movido
 * @return {Object<fileJar>}
 */
const manage_single_upload = async (file, path = null) => {
  path = path ? path : Helpers.publicPath("uploads");

  // Gera nome aleatorio
  const random_name = await str_random(30);
  let filename = `${new Date().getTime()}-${random_name}.${file.subtype}`;

  // Renomeia o arquivo e move ele para o path
  await file.move(path, { name: filename });

  return file;
};

/***
 * Move um mulitplos arquivo para o caminho especificado, se nenhum for especificado entao o public/uploads será utilizado
 * @param {FileJar} fileJar arquvio a ser gerenciado
 * @param {string} path caminho onde o arquvio deve ser movido
 */
const manage_multiple_upload = async (file, path = null) => {
  path = path ? path : Helpers.publicPath("uploads");

  let successes = [],
    errors = [];

  await Promise.all(
    file.files.map(async (file) => {
      let random_name = await str_random(30);
      let filename = `${new Date().getTime()}-${random_name}.${file.subtype}`;

      // Renomeia o arquivo e move ele para o path
      await file.move(path, { name: filename });

      if (file.moved()) {
        successes.push(file);
      } else {
        errors.push(file);
      }
    })
  );

  return { successes, errors };
};

module.exports = {
  manage_single_upload,
  manage_multiple_upload
};
