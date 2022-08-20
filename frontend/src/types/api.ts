export interface IServerResponse<T> {
  data: T;
  message: string;
}

export interface IServerError {
  message: string;
  code: number;
  timestamp: string;
}
