export function notFoundHandler(_req, res) {
  res.status(404).json({ message: 'Route not found' });
}

export function errorHandler(error, _req, res, _next) {
  const isJsonParseError = error instanceof SyntaxError && error.status === 400 && 'body' in error;
  const statusCode = isJsonParseError ? 400 : error.statusCode || 500;
  const message = isJsonParseError ? 'Malformed JSON request body' : error.message || 'Internal server error';

  res.status(statusCode).json({
    message,
  });
}
