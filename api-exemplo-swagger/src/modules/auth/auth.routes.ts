import { Router } from "express";

import { AuthController } from "./auth.controller";

export const authRouter = Router();

// ------------------------------------------------------------------
// TODO (aluno): documentar esta rota com um bloco de comentário JSDoc
// no formato aceito pelo swagger-jsdoc (anotação "at-swagger"), logo
// acima da definição da rota abaixo.
//
// Itens que a documentação dessa rota deve conter:
//   - summary / description
//   - tag (ex: "Auth")
//   - requestBody referenciando o schema RegisterDTO
//   - respostas 201 (sucesso, referenciando AuthResponseDTO),
//     400 (dados inválidos) e 409 (e-mail já cadastrado)
//
// Consulte a documentação do swagger-jsdoc para ver o formato exato
// do bloco de comentário (YAML dentro do JSDoc).
// ------------------------------------------------------------------
authRouter.post("/register", AuthController.register);

// TODO (aluno): documentar esta rota (POST /auth/login) seguindo o mesmo
// padrão da rota de registro acima. Respostas esperadas: 200 (sucesso),
// 400 (dados inválidos) e 401 (credenciais inválidas).
authRouter.post("/login", AuthController.login);
