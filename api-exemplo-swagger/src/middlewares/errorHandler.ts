import { NextFunction, Request, Response } from "express";

import { AppError } from "../utils/AppError";

/**
 * Middleware de tratamento de erros.
 *
 * Deve ser o ÚLTIMO middleware registrado em app.ts (depois de todas as rotas),
 * pois o Express identifica middlewares de erro pela assinatura de 4 argumentos.
 */
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  console.error(err);
  res.status(500).json({ message: "Erro interno do servidor." });
}
