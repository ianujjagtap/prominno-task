// wraps any async function with try-catch error handling
const tryCatch = (fn) => async (...args) => {
  try {
    return await fn(...args);
  } catch (error) {
    throw error;
  }
};

export default tryCatch;
