export function handleResult(result, onSuccess, res) {
  if (result.isSuccess()) {
    return onSuccess(res, result.data);
  }

  const error = result.error;

  if (error.cause) {
    console.error("Error cause:", error.cause);
  }

  switch (error.code) {
    case "NOT_FOUND":
      return res.status(404).json({ message: error.message });
    case "VALIDATION_ERROR":
      return res.status(400).json({ message: error.message });
    case "INTERNAL_ERROR":
    default:
      return res.status(500).json({ message: "Internal Server Error" });
  }
}
