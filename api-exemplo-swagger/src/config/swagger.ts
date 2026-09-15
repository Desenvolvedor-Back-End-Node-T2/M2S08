import swaggerJSDoc from "swagger-jsdoc";

/**
 * Configuração base do swagger-jsdoc.
 *
 * Este arquivo só monta a "casca" da documentação (metadados gerais da API).
 * A documentação de cada rota e de cada schema/DTO deve ser escrita pelos
 * alunos usando comentários JSDoc com a anotação `@swagger`, diretamente
 * nos arquivos apontados pela propriedade `apis` abaixo.
 *
 * ------------------------------------------------------------------
 * TODO (aluno):
 *   1. Adicionar comentários @swagger nas rotas de
 *      src/modules/auth/auth.routes.ts (veja os comentários TODO lá).
 *   2. Documentar os DTOs de src/modules/auth/auth.dto.ts como schemas
 *      em `components.schemas` (pode ser feito via JSDoc nos próprios
 *      arquivos de rotas, ou em um arquivo separado de schemas).
 *   3. (Opcional) Definir um securityScheme do tipo "bearerAuth" (JWT)
 *      em `components.securitySchemes`, já que as respostas de
 *      login/registro retornam um token.
 * ------------------------------------------------------------------
 */
const swaggerDefinition: swaggerJSDoc.SwaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API de Exemplo - Curso Backend NodeJS",
    version: "1.0.0",
    description:
      "API de exemplo usada para praticar documentação de rotas e DTOs com Swagger/OpenAPI.",
  },
  servers: [
    {
      url: "/api",
      description: "Servidor local",
    },
  ],
  tags: [
    {
      name: "Auth",
      description: "Rotas de cadastro e autenticação de usuários",
    },
  ],
  components: {
    // TODO (aluno): schemas (DTOs) e securitySchemes entram aqui,
    // seja preenchendo este objeto diretamente, seja via anotações
    // @swagger nos arquivos listados em `apis` abaixo.
    schemas: {},
    securitySchemes: {},
  },
};

const swaggerOptions: swaggerJSDoc.Options = {
  swaggerDefinition,
  // Arquivos onde o swagger-jsdoc vai procurar comentários @swagger.
  apis: [
    "./src/modules/**/*.routes.ts",
    "./src/modules/**/*.dto.ts",
  ],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
