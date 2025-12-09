const { isValidEmail, isNotEmpty, isInRange } = require('./validators');

describe('Validators', () => {
  describe('isValidEmail', () => {
    test('should validate correct email', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
    });

    test('should reject email without @', () => {
      expect(isValidEmail('testexample.com')).toBe(false);
    });

    test('should reject email without domain', () => {
      expect(isValidEmail('test@')).toBe(false);
    });

    test('should reject email with spaces', () => {
      expect(isValidEmail('test @example.com')).toBe(false);
    });

    test('should accept email with subdomain', () => {
      expect(isValidEmail('test@mail.example.com')).toBe(true);
    });
  });

  describe('isNotEmpty', () => {
    test('should return true for non-empty string', () => {
      expect(isNotEmpty('hello')).toBe(true);
    });

    test('should return false for empty string', () => {
      expect(isNotEmpty('')).toBe(false);
    });

    test('should return false for whitespace only', () => {
      expect(isNotEmpty('   ')).toBe(false);
    });

    test('should return false for null', () => {
      expect(isNotEmpty(null)).toBe(false);
    });

    test('should return false for undefined', () => {
      expect(isNotEmpty(undefined)).toBe(false);
    });
  });

  describe('isInRange', () => {
    test('should return true when number is in range', () => {
      expect(isInRange(5, 1, 10)).toBe(true);
    });

    test('should return true when number equals min', () => {
      expect(isInRange(1, 1, 10)).toBe(true);
    });

    test('should return true when number equals max', () => {
      expect(isInRange(10, 1, 10)).toBe(true);
    });

    test('should return false when number is below min', () => {
      expect(isInRange(0, 1, 10)).toBe(false);
    });

    test('should return false when number is above max', () => {
      expect(isInRange(11, 1, 10)).toBe(false);
    });

    test('should work with negative numbers', () => {
      expect(isInRange(-5, -10, 0)).toBe(true);
    });
  });
});
