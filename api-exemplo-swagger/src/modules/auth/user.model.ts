/**
 * Entidade User.
 *
 * TODO (aluno): esta interface é um ótimo candidato para virar um "schema"
 * no Swagger (components.schemas.User), já que ela representa o formato
 * de dado retornado por algumas rotas (por exemplo, no futuro, um endpoint
 * de perfil).
 */
export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
}

/**
 * Simulação de um banco de dados usando um array em memória.
 *
 * Atenção: os dados são perdidos toda vez que o servidor é reiniciado.
 * Isso é proposital, para manter o foco do exercício na documentação da API
 * e não na configuração de um banco de dados real.
 */
const users: User[] = [];

export const UserRepository = {
  findByEmail(email: string): User | undefined {
    return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
  },

  findById(id: string): User | undefined {
    return users.find((user) => user.id === id);
  },

  create(user: User): User {
    users.push(user);
    return user;
  },

  list(): User[] {
    return users;
  },
};
