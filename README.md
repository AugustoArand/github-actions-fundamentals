# GitHub Actions Fundamentals

Este repositório demonstra o uso de GitHub Actions com integração de testes Jest.

## 🚀 Estrutura do Projeto

```
.
├── .github/
│   └── workflows/
│       └── hello.yml          # Pipeline CI/CD
├── src/
│   ├── calculator.js          # Funções matemáticas
│   ├── calculator.test.js     # Testes da calculadora
│   ├── validators.js          # Funções de validação
│   └── validators.test.js     # Testes dos validadores
├── jest.config.js             # Configuração do Jest
├── package.json               # Dependências e scripts
├── JEST_GUIDE.md             # Guia completo do Jest
└── README.md                  # Este arquivo
```

## 📦 Instalação

```bash
npm install
```

## 🧪 Executar Testes

```bash
# Executar todos os testes
npm test

# Executar em modo watch
npm run test:watch

# Executar com cobertura
npm run test:coverage

# Executar em modo CI
npm run test:ci
```

## 🔄 CI/CD Pipeline

O projeto possui um pipeline automatizado que:

1. ✅ Executa em push e pull requests na branch `main`
2. ✅ Instala as dependências
3. ✅ Roda todos os testes
4. ✅ Gera relatório de cobertura
5. ✅ Faz upload para Codecov (opcional)
6. ✅ Executa etapa de build após sucesso dos testes

## 📚 Documentação

Consulte o [Guia Completo do Jest](./JEST_GUIDE.md) para aprender:
- Instalação e configuração
- Principais funcionalidades
- Matchers e asserções
- Testes assíncronos
- Mocks e Spies
- Cobertura de código
- Boas práticas
- Integração com CI/CD

## 🛠️ Tecnologias

- **Node.js** - Runtime JavaScript
- **Jest** - Framework de testes
- **GitHub Actions** - CI/CD

## 📊 Cobertura de Código

Após executar `npm run test:coverage`, acesse o relatório HTML em:
```
coverage/lcov-report/index.html
```

## 🤝 Como Contribuir

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

Os testes serão executados automaticamente no PR!

## 📝 Licença

ISC
