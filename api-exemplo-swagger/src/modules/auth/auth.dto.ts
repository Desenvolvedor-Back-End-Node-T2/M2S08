// DTOs (Data Transfer Objects) do módulo de autenticação.
//
// ------------------------------------------------------------------
// TODO (aluno): documentar cada um destes DTOs usando anotações
// "at-swagger" / JSDoc, para que eles apareçam em "components.schemas"
// na documentação gerada pelo swagger-jsdoc.
//
// Sugestão de schemas a criar:
//   - RegisterDTO
//   - LoginDTO
//   - AuthResponseDTO
//   - UserResponseDTO
//   - ErrorResponseDTO
//
// Veja src/config/swagger.ts para entender de onde o swagger-jsdoc lê
// essas anotações.
// ------------------------------------------------------------------

// Dados esperados para cadastro de um novo usuário.
export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

// Dados esperados para autenticação (login) de um usuário existente.
export interface LoginDTO {
  email: string;
  password: string;
}

// Representação pública de um usuário (nunca inclui a senha/hash).
export interface UserResponseDTO {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

// Resposta retornada pelas rotas de cadastro e login.
export interface AuthResponseDTO {
  user: UserResponseDTO;
  token: string;
}
