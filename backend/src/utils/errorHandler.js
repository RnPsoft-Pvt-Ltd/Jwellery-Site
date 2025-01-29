// src/utils/errorHandler.js
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

const prismaErrorMessages = {
  P2002: "A unique constraint violation occurred.",
  P2014: "The change you are trying to make violates database constraints.",
  P2003: "Foreign key constraint failed on the field.",
  P2025: "Record not found.",
};

export const errorHandler = (error, req, res) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  // Handle Prisma-specific errors
  if (error.code?.startsWith("P")) {
    const prismaMessage =
      prismaErrorMessages[error.code] || "Database operation failed.";
    return res.status(400).json({
      status: "fail",
      message: prismaMessage,
      error: process.env.NODE_ENV === "development" ? error : undefined,
    });
  }

  // Handle validation errors
  if (error.name === "ValidationError") {
    return res.status(400).json({
      status: "fail",
      message: "Invalid input data",
      errors: error.errors,
    });
  }

  // Handle JWT errors
  if (error.name === "JsonWebTokenError") {
    return res.status(401).json({
      status: "fail",
      message: "Invalid token. Please log in again.",
    });
  }

  if (error.name === "TokenExpiredError") {
    return res.status(401).json({
      status: "fail",
      message: "Your token has expired. Please log in again.",
    });
  }

  // Development error response
  if (process.env.NODE_ENV === "development") {
    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
      stack: error.stack,
      error,
    });
  }

  // Production error response
  if (error.isOperational) {
    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  }

  // Unknown errors
  console.error("ERROR 💥:", error);
  return res.status(500).json({
    status: "error",
    message: "Something went wrong!",
  });
};

export const catchAsync = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) =>
      errorHandler(err, req, res)
    );
  };
};
