# Guia Completo do Jest

## Índice
1. [Introdução](#introdução)
2. [Instalação](#instalação)
3. [Configuração Básica](#configuração-básica)
4. [Principais Funcionalidades](#principais-funcionalidades)
5. [Matchers (Asserções)](#matchers-asserções)
6. [Testando Código Assíncrono](#testando-código-assíncrono)
7. [Mocks e Spies](#mocks-e-spies)
8. [Cobertura de Código](#cobertura-de-código)
9. [Boas Práticas](#boas-práticas)
10. [Integração com CI/CD](#integração-com-cicd)

---

## Introdução

Jest é um framework de testes JavaScript mantido pelo Facebook, projetado para funcionar com projetos usando Babel, TypeScript, Node.js, React, Angular, Vue.js e muito mais.

### Por que usar Jest?

- ✅ **Zero configuração**: Funciona out-of-the-box para a maioria dos projetos
- ✅ **Rápido e seguro**: Testes paralelizados em processos isolados
- ✅ **Cobertura de código integrada**: Sem necessidade de ferramentas adicionais
- ✅ **Mocks poderosos**: Sistema completo de mocking
- ✅ **Snapshot testing**: Ideal para testes de componentes UI

---

## Instalação

### NPM
```bash
npm install --save-dev jest
```

### Yarn
```bash
yarn add --dev jest
```

### Adicionar script no package.json
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

---

## Configuração Básica

### jest.config.js (opcional)

```javascript
module.exports = {
  // Diretório raiz dos testes
  testEnvironment: 'node',
  
  // Padrão de arquivos de teste
  testMatch: [
    '**/__tests__/**/*.js',
    '**/?(*.)+(spec|test).js'
  ],
  
  // Arquivos a ignorar
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/'
  ],
  
  // Cobertura de código
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js'
  ],
  
  // Limite de cobertura
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

---

## Principais Funcionalidades

### 1. Estrutura Básica de um Teste

```javascript
// sum.js
function sum(a, b) {
  return a + b;
}
module.exports = sum;

// sum.test.js
const sum = require('./sum');

describe('Função sum', () => {
  test('soma 1 + 2 igual a 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

  test('soma -1 + 1 igual a 0', () => {
    expect(sum(-1, 1)).toBe(0);
  });
});
```

### 2. Hooks de Ciclo de Vida

```javascript
describe('Hooks do Jest', () => {
  // Executado antes de TODOS os testes
  beforeAll(() => {
    console.log('Antes de todos os testes');
  });

  // Executado antes de CADA teste
  beforeEach(() => {
    console.log('Antes de cada teste');
  });

  // Executado depois de CADA teste
  afterEach(() => {
    console.log('Depois de cada teste');
  });

  // Executado depois de TODOS os testes
  afterAll(() => {
    console.log('Depois de todos os testes');
  });

  test('teste 1', () => {
    expect(true).toBe(true);
  });

  test('teste 2', () => {
    expect(false).toBe(false);
  });
});
```

### 3. Testes Parametrizados

```javascript
describe.each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
])('sum(%i, %i)', (a, b, expected) => {
  test(`retorna ${expected}`, () => {
    expect(sum(a, b)).toBe(expected);
  });
});
```

---

## Matchers (Asserções)

### Igualdade

```javascript
test('igualdade exata', () => {
  expect(2 + 2).toBe(4);
});

test('igualdade de objetos', () => {
  const data = { name: 'John' };
  expect(data).toEqual({ name: 'John' });
});

test('não igual', () => {
  expect(2 + 2).not.toBe(5);
});
```

### Truthiness

```javascript
test('valores truthy e falsy', () => {
  expect(null).toBeNull();
  expect(undefined).toBeUndefined();
  expect(true).toBeTruthy();
  expect(false).toBeFalsy();
  expect(0).toBeDefined();
});
```

### Números

```javascript
test('comparações numéricas', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(4);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4);
  expect(value).toBe(4);
  expect(value).toEqual(4);
});

test('números decimais', () => {
  const value = 0.1 + 0.2;
  expect(value).toBeCloseTo(0.3); // Evita problemas de precisão
});
```

### Strings

```javascript
test('strings e regex', () => {
  expect('Christoph').toMatch(/stop/);
  expect('team').not.toMatch(/I/);
  expect('JavaScript').toContain('Script');
});
```

### Arrays e Iterables

```javascript
test('arrays e iterables', () => {
  const shoppingList = ['milk', 'bread', 'eggs'];
  
  expect(shoppingList).toContain('milk');
  expect(shoppingList).toHaveLength(3);
  expect(new Set(shoppingList)).toContain('bread');
});
```

### Objetos

```javascript
test('objetos', () => {
  const user = {
    name: 'John',
    age: 30,
    address: {
      city: 'New York'
    }
  };

  expect(user).toHaveProperty('name');
  expect(user).toHaveProperty('name', 'John');
  expect(user).toHaveProperty('address.city');
  expect(user).toMatchObject({
    name: 'John',
    age: 30
  });
});
```

### Exceções

```javascript
function throwError() {
  throw new Error('Algo deu errado');
}

test('lançamento de erro', () => {
  expect(() => throwError()).toThrow();
  expect(() => throwError()).toThrow('Algo deu errado');
  expect(() => throwError()).toThrow(Error);
});
```

---

## Testando Código Assíncrono

### 1. Callbacks

```javascript
function fetchData(callback) {
  setTimeout(() => {
    callback('peanut butter');
  }, 1000);
}

test('callback assíncrono', (done) => {
  function callback(data) {
    expect(data).toBe('peanut butter');
    done();
  }
  fetchData(callback);
});
```

### 2. Promises

```javascript
function fetchDataPromise() {
  return Promise.resolve('peanut butter');
}

test('promise - retornando a promise', () => {
  return fetchDataPromise().then(data => {
    expect(data).toBe('peanut butter');
  });
});

test('promise - usando resolves', () => {
  return expect(fetchDataPromise()).resolves.toBe('peanut butter');
});

test('promise - usando rejects', () => {
  return expect(fetchDataPromise()).rejects.toThrow();
});
```

### 3. Async/Await

```javascript
test('async/await', async () => {
  const data = await fetchDataPromise();
  expect(data).toBe('peanut butter');
});

test('async/await - com resolves', async () => {
  await expect(fetchDataPromise()).resolves.toBe('peanut butter');
});

test('async/await - com rejects', async () => {
  await expect(fetchErrorPromise()).rejects.toThrow();
});
```

---

## Mocks e Spies

### 1. Mock Functions

```javascript
// Mock simples
test('mock function', () => {
  const mockFn = jest.fn();
  mockFn('hello');
  
  expect(mockFn).toHaveBeenCalled();
  expect(mockFn).toHaveBeenCalledWith('hello');
  expect(mockFn).toHaveBeenCalledTimes(1);
});

// Mock com valor de retorno
test('mock return value', () => {
  const mockFn = jest.fn().mockReturnValue(42);
  expect(mockFn()).toBe(42);
});

// Mock com implementação
test('mock implementation', () => {
  const mockFn = jest.fn((x) => x * 2);
  expect(mockFn(2)).toBe(4);
});
```

### 2. Mock de Módulos

```javascript
// users.js
const axios = require('axios');

async function getUsers() {
  const response = await axios.get('/users');
  return response.data;
}

module.exports = getUsers;

// users.test.js
jest.mock('axios');
const axios = require('axios');
const getUsers = require('./users');

test('should fetch users', async () => {
  const users = [{ name: 'John' }];
  axios.get.mockResolvedValue({ data: users });

  const result = await getUsers();
  
  expect(result).toEqual(users);
  expect(axios.get).toHaveBeenCalledWith('/users');
});
```

### 3. Spies

```javascript
test('spy on method', () => {
  const video = {
    play() {
      return true;
    }
  };

  const spy = jest.spyOn(video, 'play');
  video.play();

  expect(spy).toHaveBeenCalled();
  spy.mockRestore();
});
```

### 4. Mock Timers

```javascript
jest.useFakeTimers();

function delayedCall(callback) {
  setTimeout(() => {
    callback('done');
  }, 1000);
}

test('fast-forward time', () => {
  const callback = jest.fn();
  delayedCall(callback);
  
  jest.advanceTimersByTime(1000);
  
  expect(callback).toHaveBeenCalledWith('done');
});

afterAll(() => {
  jest.useRealTimers();
});
```

---

## Cobertura de Código

### Executar com cobertura

```bash
npm test -- --coverage
```

### Relatório de cobertura

Jest gera automaticamente:
- Relatório em HTML em `coverage/lcov-report/index.html`
- Resumo no terminal

### Métricas de cobertura

- **Statements**: Porcentagem de declarações executadas
- **Branches**: Porcentagem de ramificações (if/else) testadas
- **Functions**: Porcentagem de funções chamadas
- **Lines**: Porcentagem de linhas executadas

### Exemplo de saída

```
----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |   85.71 |      100 |      75 |   83.33 |
 sum.js   |     100 |      100 |     100 |     100 |
 mult.js  |      60 |      100 |      50 |      50 | 5,6
----------|---------|----------|---------|---------|-------------------
```

---

## Boas Práticas

### 1. Organização de Testes

```
src/
├── components/
│   ├── Button.js
│   └── Button.test.js
├── utils/
│   ├── math.js
│   └── math.test.js
└── __tests__/
    └── integration/
        └── api.test.js
```

### 2. Nomenclatura Clara

```javascript
// ❌ Ruim
test('test1', () => { ... });

// ✅ Bom
test('should return sum of two positive numbers', () => { ... });
```

### 3. Princípio AAA (Arrange, Act, Assert)

```javascript
test('should add item to cart', () => {
  // Arrange - Preparar
  const cart = new ShoppingCart();
  const item = { id: 1, name: 'Book' };

  // Act - Agir
  cart.addItem(item);

  // Assert - Verificar
  expect(cart.items).toContain(item);
  expect(cart.items).toHaveLength(1);
});
```

### 4. Um Conceito por Teste

```javascript
// ❌ Ruim - testa múltiplas coisas
test('shopping cart operations', () => {
  const cart = new ShoppingCart();
  cart.addItem(item1);
  expect(cart.items).toHaveLength(1);
  cart.removeItem(item1);
  expect(cart.items).toHaveLength(0);
  cart.clear();
  expect(cart.total).toBe(0);
});

// ✅ Bom - testes separados
test('should add item to cart', () => { ... });
test('should remove item from cart', () => { ... });
test('should clear cart', () => { ... });
```

### 5. Evitar Lógica nos Testes

```javascript
// ❌ Ruim
test('calculates discount', () => {
  const prices = [10, 20, 30];
  let total = 0;
  for (let price of prices) {
    total += price;
  }
  expect(calculateDiscount(total)).toBe(6);
});

// ✅ Bom
test('calculates 10% discount on $60', () => {
  expect(calculateDiscount(60)).toBe(6);
});
```

### 6. Isolamento de Testes

```javascript
// ❌ Ruim - estado compartilhado
let user;

beforeAll(() => {
  user = { name: 'John' };
});

test('test 1', () => {
  user.age = 30; // Modifica estado compartilhado
});

test('test 2', () => {
  expect(user.age).toBeUndefined(); // Pode falhar
});

// ✅ Bom - cada teste é independente
beforeEach(() => {
  user = { name: 'John' };
});
```

### 7. Teste Edge Cases

```javascript
describe('divide function', () => {
  test('divides two positive numbers', () => {
    expect(divide(10, 2)).toBe(5);
  });

  test('divides by 1 returns same number', () => {
    expect(divide(10, 1)).toBe(10);
  });

  test('throws error when dividing by zero', () => {
    expect(() => divide(10, 0)).toThrow('Division by zero');
  });

  test('handles negative numbers', () => {
    expect(divide(-10, 2)).toBe(-5);
  });
});
```

---

## Integração com CI/CD

### GitHub Actions

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Run tests with coverage
        run: npm test -- --coverage
        
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
```

### GitLab CI

```yaml
test:
  stage: test
  image: node:18
  script:
    - npm ci
    - npm test -- --coverage
  coverage: '/All files[^|]*\|[^|]*\s+([\d\.]+)/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml
```

### Scripts NPM Úteis para CI

```json
{
  "scripts": {
    "test": "jest",
    "test:ci": "jest --ci --coverage --maxWorkers=2",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:verbose": "jest --verbose"
  }
}
```

### Flags Importantes para CI

- `--ci`: Otimiza Jest para ambientes de CI
- `--coverage`: Gera relatório de cobertura
- `--maxWorkers=2`: Limita workers para ambientes com recursos limitados
- `--bail`: Para após o primeiro teste falhar
- `--silent`: Suprime mensagens de console.log
- `--json`: Saída em formato JSON

---

## Comandos Úteis

```bash
# Executar todos os testes
npm test

# Executar em modo watch
npm test -- --watch

# Executar apenas testes modificados
npm test -- --onlyChanged

# Executar testes específicos
npm test -- sum.test.js

# Executar com cobertura
npm test -- --coverage

# Executar em modo verbose
npm test -- --verbose

# Atualizar snapshots
npm test -- --updateSnapshot

# Executar testes em paralelo
npm test -- --maxWorkers=4

# Debug com Node.js
node --inspect-brk node_modules/.bin/jest --runInBand
```

---

## Recursos Adicionais

- [Documentação Oficial do Jest](https://jestjs.io/)
- [Jest Cheat Sheet](https://github.com/sapegin/jest-cheat-sheet)
- [Testing JavaScript com Kent C. Dodds](https://testingjavascript.com/)
- [Jest Community](https://github.com/jest-community)

---

## Conclusão

Jest é uma ferramenta poderosa e completa para testes em JavaScript. Com sua configuração simples e recursos avançados como mocking, cobertura de código e snapshot testing, ele se tornou o framework de teste mais popular no ecossistema JavaScript.

**Principais Pontos:**
- ✅ Comece simples e adicione complexidade conforme necessário
- ✅ Mantenha testes legíveis e independentes
- ✅ Use mocks para isolar comportamentos
- ✅ Monitore a cobertura de código
- ✅ Integre com CI/CD para execução automática

**Lembre-se**: Bons testes são investimento, não custo!
