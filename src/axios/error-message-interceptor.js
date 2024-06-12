// ----------------------------------------------------------------------

export const errorMessageInterceptor = async (error) => {
  const { response } = error;

  if (!response) {
    throw error;
  }

  if (response.data?.msg) {
    error.message = response.data.msg;
  }

  if (response.data?.errors) {
    const errors = Object.values(response.data.errors);
    const errorMessage = errors.find((error) => Boolean(error));

    if (errorMessage) {
      error.message = errorMessage;
    }
  }

  if (response.data?.error) {
    if (response.data.error.errors) {
      const errors = Object.values(response.data.error.errors);
      const errorsError = errors.find((error) => Boolean(error.message));

      if (errorsError) {
        error.message = errorsError.message;
      }
    } else if (response.data.error.message) {
      error.message = response.data.error.message;
    }
  }

  throw error;
};

// ----------------------------------------------------------------------

export const applyErrorMessageInterceptor = (axiosInstance) => {
  axiosInstance.interceptors.response.use(undefined, errorMessageInterceptor);

  return axiosInstance;
};
