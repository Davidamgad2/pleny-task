import { NextFunction, Request, Response } from "express";

function errorMiddleware(
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const status = error.status || 500;
  const errors = error.errors || [];
  const message = error.message || "Something went wrong";
  response.status(status).send({
    errors,
    status,
    message,
  });
}

export default errorMiddleware;
