/**
 * Soma dois números
 * @param {number} a - Primeiro número
 * @param {number} b - Segundo número
 * @returns {number} A soma de a e b
 */
function sum(a, b) {
  return a + b;
}

/**
 * Subtrai dois números
 * @param {number} a - Primeiro número
 * @param {number} b - Segundo número
 * @returns {number} A subtração de a e b
 */
function subtract(a, b) {
  return a - b;
}

/**
 * Multiplica dois números
 * @param {number} a - Primeiro número
 * @param {number} b - Segundo número
 * @returns {number} A multiplicação de a e b
 */
function multiply(a, b) {
  return a * b;
}

/**
 * Divide dois números
 * @param {number} a - Numerador
 * @param {number} b - Denominador
 * @returns {number} A divisão de a por b
 * @throws {Error} Se b for zero
 */
function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
}

module.exports = {
  sum,
  subtract,
  multiply,
  divide
};
