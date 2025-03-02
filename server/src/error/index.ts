const errorStatus = {
  NOT_AUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
  BAD_REQUEST: 400,
};

export type ErrorStatus = keyof typeof errorStatus;
class HttpError extends Error {
  public statusMessage;
  public status: number;
  constructor({
    statusMessage,
    message,
  }: {
    statusMessage: ErrorStatus;
    message: string;
  }) {
    super(message);
    this.statusMessage = statusMessage;
    this.message = message;
    this.status = errorStatus[statusMessage];
  }
}
export default HttpError;
