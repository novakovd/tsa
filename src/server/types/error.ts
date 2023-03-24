import { StatusCodes } from "http-status-codes";

export abstract class HTTPError implements Error {
  readonly message: string;
  readonly name: string;
  readonly statusCode: number;

  protected constructor(message: string, name: string, statusCode: number) {
    this.message = message;
    this.name = name;
    this.statusCode = statusCode;
  }
}

export class HTTPNotFoundError extends HTTPError {
  constructor(message: string) {
    super(message, "HTTPNotFoundError", StatusCodes.NOT_FOUND);
  }
}
