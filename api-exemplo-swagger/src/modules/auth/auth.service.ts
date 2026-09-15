import bcrypt from "bcrypt";
import { randomUUID } from "crypto";

import { AppError } from "../../utils/AppError";
import { signToken } from "../../utils/jwt";
import { AuthResponseDTO, LoginDTO, RegisterDTO } from "./auth.dto";
import { User, UserRepository } from "./user.model";

const SALT_ROUNDS = 10;

function toUserResponse(user: User) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}

export const AuthService = {
  async register(data: RegisterDTO): Promise<AuthResponseDTO> {
    const { name, email, password } = data;

    if (!name || !email || !password) {
      throw new AppError("name, email e password são obrigatórios.", 400);
    }

    if (password.length < 6) {
      throw new AppError("A senha deve ter no mínimo 6 caracteres.", 400);
    }

    const existingUser = UserRepository.findByEmail(email);
    if (existingUser) {
      throw new AppError("Já existe um usuário cadastrado com este e-mail.", 409);
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const user: User = {
      id: randomUUID(),
      name,
      email,
      passwordHash,
      createdAt: new Date(),
    };

    UserRepository.create(user);

    const token = signToken({ sub: user.id, email: user.email });

    return {
      user: toUserResponse(user),
      token,
    };
  },

  async login(data: LoginDTO): Promise<AuthResponseDTO> {
    const { email, password } = data;

    if (!email || !password) {
      throw new AppError("email e password são obrigatórios.", 400);
    }

    const user = UserRepository.findByEmail(email);
    if (!user) {
      throw new AppError("E-mail ou senha inválidos.", 401);
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatches) {
      throw new AppError("E-mail ou senha inválidos.", 401);
    }

    const token = signToken({ sub: user.id, email: user.email });

    return {
      user: toUserResponse(user),
      token,
    };
  },
};
