import cors from "cors";
import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import { swaggerSpec } from "./config/swagger";
import { errorHandler } from "./middlewares/errorHandler";
import { authRouter } from "./modules/auth/auth.routes";

export function createApp(): Application {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(morgan("dev"));

  // Documentação Swagger UI.
  // Enquanto os alunos não documentarem as rotas/DTOs, a página vai
  // carregar normalmente, porém sem endpoints listados.
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Endpoint que expõe o JSON puro da especificação OpenAPI (útil para
  // importar em ferramentas como Postman/Insomnia).
  app.get("/api-docs.json", (_req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  app.get("/health", (_req: Request, res: Response) => {
    res.status(200).json({ status: "ok" });
  });

  app.use("/api/auth", authRouter);

  // Middleware de tratamento de erros deve ser o último a ser registrado.
  app.use(errorHandler);

  return app;
}
