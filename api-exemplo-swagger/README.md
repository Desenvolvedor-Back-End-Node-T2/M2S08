# API de Exemplo — Prática de Documentação com Swagger

API de exemplo em **Node.js + TypeScript + Express**, criada para o curso de
desenvolvimento backend. O objetivo deste projeto **não é aprender a construir
a API** (ela já vem pronta e funcionando), e sim **praticar a documentação de
rotas e DTOs usando Swagger/OpenAPI**.

> ⚠️ **Importante:** esta API não contém nenhuma documentação Swagger. Toda a
> infraestrutura (Swagger UI, swagger-jsdoc, rota `/api-docs`) já está
> configurada e funcionando — falta só vocês escreverem os comentários de
> documentação. Os pontos exatos onde vocês devem atuar estão marcados com
> `TODO (aluno)` no código.

---

## Stack utilizada

| Tecnologia | Versão |
|---|---|
| Node.js | 18+ (recomendado 20 ou 22) |
| TypeScript | ^6.0.3 |
| Express | ^5.2.1 |
| swagger-jsdoc | ^6.3.0 |
| swagger-ui-express | ^5.0.1 |
| jsonwebtoken | ^9.0.3 |
| bcrypt | ^6.0.0 |

---

## Como rodar o projeto

```bash
# 1. Instalar as dependências
npm install

# 2. Criar o arquivo de variáveis de ambiente
cp .env.example .env

# 3. Rodar em modo desenvolvimento (com reload automático)
npm run dev
```

O servidor sobe em `http://localhost:3000`.

- **Swagger UI:** http://localhost:3000/api-docs
- **JSON da especificação OpenAPI:** http://localhost:3000/api-docs.json
- **Health check:** http://localhost:3000/health

Outros scripts disponíveis:

```bash
npm run build       # compila o TypeScript para dist/
npm start           # roda a versão compilada (rodar "npm run build" antes)
npm run type-check  # só verifica os tipos, sem gerar arquivos
```

---

## Estrutura do projeto

```
src/
├── server.ts                     # ponto de entrada (sobe o servidor HTTP)
├── app.ts                        # monta o Express, o Swagger UI e as rotas
├── config/
│   └── swagger.ts                # configuração base do swagger-jsdoc
├── modules/
│   └── auth/
│       ├── auth.routes.ts        # rotas: POST /register e POST /login
│       ├── auth.controller.ts    # recebe req/res e chama o service
│       ├── auth.service.ts       # regras de negócio (hash de senha, JWT)
│       ├── auth.dto.ts           # DTOs (formatos de entrada/saída)
│       └── user.model.ts         # entidade User + "banco" em memória
├── middlewares/
│   └── errorHandler.ts           # tratamento centralizado de erros
└── utils/
    ├── jwt.ts                    # geração/verificação de token JWT
    └── AppError.ts                # classe de erro customizada
```

> Os dados dos usuários ficam **em memória** (um array dentro de
> `user.model.ts`). Isso significa que, ao reiniciar o servidor, todos os
> cadastros são perdidos — é proposital, para manter o foco no exercício de
> documentação.

---

## Endpoints disponíveis

### `POST /api/auth/register`
Cadastra um novo usuário.

**Body (JSON):**
```json
{
  "name": "Maria Silva",
  "email": "maria@email.com",
  "password": "123456"
}
```

**Respostas possíveis:**
- `201` — usuário criado, retorna `{ user, token }`
- `400` — dados obrigatórios faltando ou senha muito curta
- `409` — já existe um usuário com esse e-mail

### `POST /api/auth/login`
Autentica um usuário existente.

**Body (JSON):**
```json
{
  "email": "maria@email.com",
  "password": "123456"
}
```

**Respostas possíveis:**
- `200` — login efetuado, retorna `{ user, token }`
- `400` — dados obrigatórios faltando
- `401` — e-mail ou senha inválidos

---

## O que vocês precisam fazer (exercício)

O objetivo é deixar a documentação Swagger completa e coerente com o
comportamento real da API. Sigam os `TODO (aluno)` espalhados pelo código,
principalmente em:

- `src/modules/auth/auth.routes.ts`
- `src/modules/auth/auth.dto.ts`
- `src/config/swagger.ts`

### Checklist sugerido

1. **Documentar os DTOs como schemas** (`components.schemas`), a partir de
   `auth.dto.ts`:
   - `RegisterDTO`
   - `LoginDTO`
   - `UserResponseDTO`
   - `AuthResponseDTO`
   - Um schema de erro (ex: `ErrorResponseDTO`, com a propriedade `message`)

2. **Documentar a rota `POST /auth/register`** em `auth.routes.ts`:
   - `summary`, `description` e `tags: [Auth]`
   - `requestBody` referenciando o schema `RegisterDTO`
   - Respostas `201`, `400` e `409`, referenciando os schemas corretos

3. **Documentar a rota `POST /auth/login`** em `auth.routes.ts`:
   - Mesma estrutura da rota acima
   - Respostas `200`, `400` e `401`

4. **(Opcional / desafio)** Criar um `securityScheme` do tipo `bearerAuth`
   (JWT) em `components.securitySchemes`, já que as respostas de
   cadastro/login retornam um token. Isso é útil caso vocês criem, como
   exercício extra, uma rota protegida (ex: `GET /auth/me`) que exija o
   token no header `Authorization: Bearer <token>`.

### Como escrever a anotação

O `swagger-jsdoc` lê blocos de comentário `/** ... */` que contenham a tag
"at-swagger" seguida de um bloco YAML no padrão OpenAPI 3.0, escritos **logo
acima** do trecho de código a que se referem (uma rota ou uma `interface`).
Consultem a documentação oficial do `swagger-jsdoc` e a especificação do
OpenAPI 3.0 para ver a sintaxe exata.

> ⚠️ Atenção: enquanto estiverem escrevendo os comentários, evitem deixar
> blocos `/** */` de texto livre (sem seguir a sintaxe YAML esperada) nos
> arquivos apontados por `apis` em `src/config/swagger.ts` — o
> `swagger-jsdoc` tenta interpretar **todo** bloco `/** */` desses arquivos
> como parte da documentação, e um comentário mal formatado quebra a geração
> da especificação. Usem `//` para anotações que não sejam documentação
> Swagger de verdade.

### Como validar o próprio trabalho

- Depois de cada alteração, acessem `http://localhost:3000/api-docs` e
  confiram se a rota/schema aparece corretamente e sem erros no terminal
  onde o `npm run dev` está rodando.
- Testem os exemplos de request diretamente pela interface do Swagger UI
  (botão "Try it out").
- Validem também o JSON puro em `http://localhost:3000/api-docs.json`.

Bom trabalho! 🚀
