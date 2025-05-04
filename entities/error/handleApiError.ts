export function handleApiError(error: Error) {
  const json =
    error instanceof Error
      ? {
          message: error.message,
          name: error.name,
          //stack: process.env.NODE_ENV !== 'production' ? e.stack : undefined
        }
      : { message: 'Unknown error', name: 'unknown' };

  return json;
}
