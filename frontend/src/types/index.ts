export interface i_Action {
  type: string;
  payload?: { err: Error | string | null };
}

export interface i_FetchState {
  isLoading: boolean;
  err: Error | string | null;
}

export interface i_Object<T> {
  [key: string]: T;
}
