class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
  }
}

export default ErrorResponse;
