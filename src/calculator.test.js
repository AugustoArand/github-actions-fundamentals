const { sum, subtract, multiply, divide } = require('./calculator');

describe('Calculator Functions', () => {
  describe('sum', () => {
    test('should add two positive numbers', () => {
      expect(sum(1, 2)).toBe(3);
    });

    test('should add negative numbers', () => {
      expect(sum(-1, -1)).toBe(-2);
    });

    test('should add zero', () => {
      expect(sum(5, 0)).toBe(5);
    });
  });

  describe('subtract', () => {
    test('should subtract two positive numbers', () => {
      expect(subtract(5, 3)).toBe(2);
    });

    test('should subtract negative numbers', () => {
      expect(subtract(-5, -3)).toBe(-2);
    });

    test('should result in negative when subtracting larger from smaller', () => {
      expect(subtract(3, 5)).toBe(-2);
    });
  });

  describe('multiply', () => {
    test('should multiply two positive numbers', () => {
      expect(multiply(3, 4)).toBe(12);
    });

    test('should multiply by zero', () => {
      expect(multiply(5, 0)).toBe(0);
    });

    test('should multiply negative numbers', () => {
      expect(multiply(-2, -3)).toBe(6);
    });

    test('should multiply positive and negative', () => {
      expect(multiply(2, -3)).toBe(-6);
    });
  });

  describe('divide', () => {
    test('should divide two positive numbers', () => {
      expect(divide(10, 2)).toBe(5);
    });

    test('should divide by 1 returns same number', () => {
      expect(divide(10, 1)).toBe(10);
    });

    test('should throw error when dividing by zero', () => {
      expect(() => divide(10, 0)).toThrow('Division by zero');
    });

    test('should handle negative numbers', () => {
      expect(divide(-10, 2)).toBe(-5);
    });

    test('should handle decimal results', () => {
      expect(divide(5, 2)).toBe(2.5);
    });
  });
});
