export enum SuccessStatusCode {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
}

export enum ErrorStatusCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum AppErrorMessage {
  INVALID_REQUEST = 'Invalid request',
  RESOURCE_NOT_FOUND = 'Resource not found',
  INTERNAL_SERVER_ERROR = 'Internal server error',
  NOT_AUTHENTICATED = 'Not authenticated',
  FORBIDDEN_RESOURCE = 'Forbidden resource',
}
