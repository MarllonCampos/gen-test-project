# Teste Técnico - GEN

[x] Validadores nas rotas
[x] Teste unitário
[x] Documentação
[x] Dockerização
[?] Alguma metodologia para definição e organização do seu código??

**Descrição do Projeto**

Este é o backend para um teste técnico entregue pela empresa GEN, uma aplicação que gerencia categorias, produtos e mostra previsões de parcelamentos.

## Testar Projeto
 **Recomendo utilizar o docker-compose**
 Execute o comando:
 ```bash
    docker-compose up 
 ```
Um container contendo uma imagem do servidor e uma imagem do postgres devera ser lançada 

## **Instruções de Início Rápido**

**Clonando o Repositório**
  ```bash
    git clone https://github.com/MarllonCampos/gen-test-project.git
    cd gen-test-project
  ```
**Instalando dependências**
```bash
  npm install
```
**Configurando o banco de dados**
    - Configure as informações do banco de dados no arquivo .env
```bash
  PORT=3000
  POSTGRES_USER=postgres
  POSTGRES_PASSWORD=docker
  POSTGRES_NAME=gen
  POSTGRES_PORT=5432
  POSTGRES_HOST=localhost
  DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_NAME}
```
**Caso seja a primeira vez que o projeto estará rodando é necessário rodar o comando**
```
 npm run prisma:deploy
```

Para que o banco de dados crie as devidas tabelas

**Executando o Servidor Localmente para Desenvolvimento**
```
  npm run dev
```
  O servidor estará rodando em http://localhost:3000 por padrão
  
**Documentação da API**
  - Acesse a documentação da API em http://localhost:3000/api-docs.

## Requisitos do Sistema
  - Node.js (Versão Mínima: v18.16.0)
  - Postgres, necessário estar rodando

## O repositório contem também um pequeno DUMP do meu banco de dados utilizado para testes, se necessário poderá ser usado também para seus testes.
