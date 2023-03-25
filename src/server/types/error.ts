import { StatusCodes } from "http-status-codes";

export abstract class HTTPError extends Error {
  readonly name: string;
  readonly statusCode: number;

  protected constructor(message: string, name: string, statusCode: number) {
    super(message);

    this.name = name;
    this.statusCode = statusCode;
  }
}

export class HTTPNotFoundError extends HTTPError {
  constructor(message: string) {
    super(message, "HTTPNotFoundError", StatusCodes.NOT_FOUND);
  }
}
