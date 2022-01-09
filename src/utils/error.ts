export const getError = (err: any) =>
  err.response && err.response.data && err.response.data.message
    ? err.response.data.message
    : err.message;

export const errObjToStr = (errors: any) => {
  return errors
    .map((error: any) => {
      return error.message;
    })
    .join("\r\n");
};
