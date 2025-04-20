const statusCodes = {
  NOT_FOUND: 404,
  NOT_AUTHORIZED: 401,
  FORBIDDEN: 403,
  INTERNAL_ERROR: 500,
  BAD_REQUEST: 400,
};

export class HttpError extends Error {
  public status: keyof typeof statusCodes;
  public code: number;
  constructor({
    message,
    status,
  }: {
    status: keyof typeof statusCodes;
    message: string;
  }) {
    super(message);
    this.status = status;
    this.code = statusCodes[status];
  }
}
