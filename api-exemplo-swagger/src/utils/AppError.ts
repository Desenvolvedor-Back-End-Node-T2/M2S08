/**
 * Erro customizado da aplicação.
 *
 * Usar essa classe (em vez de lançar strings ou Error genérico) permite que o
 * middleware de tratamento de erros (src/middlewares/errorHandler.ts) saiba
 * qual status HTTP retornar para o cliente.
 */
export class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}
