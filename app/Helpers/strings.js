"use strict";

const crypto = use("crypto");

/**
 * Generate random string
 *
 * @param {int} length - 0 tamanho da string que voce quer gerar
 * @return {string} - uma string randomica do tamanho do length
 */
const str_random = async (length = 40) => {
  let string = "";
  let len = string.length;

  if (len < length) {
    let size = length - len;
    let bytes = await crypto.randomBytes(size);
    let buffer = Buffer.from(bytes);
    string += buffer
      .toString("base64")
      .replace(/[^a-zA-Z0-9]/g, "")
      .substr(0, size);
  }
  return string;
};

/**
 * Format string
 *
 * @param {string} string - String que será formatada
 * @param {object.uppercase} bool - String fique toda maiuscula
 * @param {object.spaces} bool - Remove os espaços entre as palavras
 * @param {object.specialChar} bool - Remover caracters especiais
 * @param {object.acceny} bool - Remove acentos
 * @param {object.all} bool - Remove espaços, caracters especiais e acentos
 * @return {string} - uma string randomica do tamanho do length
 */
const formatString = (
  string,
  {
    uppercase = false,
    spaces = false,
    specialChar = false,
    accent = false,
    numbers = false,
    all = false
  }
) => {
  // Put in lowerCase or uppercase
  string = uppercase
    ? string.trim().toUpperCase()
    : string.trim().toLowerCase();

  if (all)
    return string
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .replace(/\s+/g, "_")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  // Remove all special character
  if (specialChar) {
    numbers
      ? (string = string.replace(/[^a-zA-Z0-9 ]/g, ""))
      : (string = string.replace(/[^a-zA-Z ]/g, ""));
  }

  // Remove all space and put _
  if (spaces) string = string.replace(/\s+/g, "_");

  // Remove all accent
  if (accent) string = string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  return string;
};
module.exports = {
  str_random,
  formatString
};
