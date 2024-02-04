export const ResponseTypeDefault: ResponseType<null> = {
  success: true,
  message: null,
  data: null,
};

export interface ResponseType<T> {
  success: boolean;
  message: string | null;
  data: T;
}
