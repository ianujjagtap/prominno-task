// wraps any async function with try-catch error handling
const catchAsync = (fn) => async (...args) => {
  try {
    return await fn(...args);
  } catch (error) {
    throw error;
  }
};

export default catchAsync;
