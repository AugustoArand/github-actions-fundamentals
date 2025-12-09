/**
 * Valida se uma string é um email válido
 * @param {string} email - Email para validar
 * @returns {boolean} True se for válido
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida se uma string não está vazia
 * @param {string} str - String para validar
 * @returns {boolean} True se não estiver vazia
 */
function isNotEmpty(str) {
  if (str === null || str === undefined) {
    return false;
  }
  return str.trim().length > 0;
}

/**
 * Valida se um número está dentro de um intervalo
 * @param {number} num - Número para validar
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @returns {boolean} True se estiver no intervalo
 */
function isInRange(num, min, max) {
  return num >= min && num <= max;
}

module.exports = {
  isValidEmail,
  isNotEmpty,
  isInRange
};
