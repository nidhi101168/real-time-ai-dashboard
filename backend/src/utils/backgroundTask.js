const runInBackground = (fn) => {
  setImmediate(async () => {
    try {
      await fn();
    } catch (err) {
      console.error("Background task failed:", err.message);
    }
  });
};

module.exports = { runInBackground };
