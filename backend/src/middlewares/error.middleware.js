import httpStatus from "http-status";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import {
  ApiError,
  ApiResponse,
  // logger
} from "../utils/index.js";

const errorHandler = (err, req, res, next) => {
//   logger.error(err);

  let statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  let message = err.message || "Internal Server Error";
  let errors = err.errors || [];

  /**
   * Custom API Error
   */
  if (err instanceof ApiError) {
    return ApiResponse.error(res, statusCode, message, errors);
  }

  /**
   * Mongoose Validation Error
   */
  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = httpStatus.BAD_REQUEST;

    errors = Object.values(err.errors).map((item) => ({
      field: item.path,
      message: item.message,
    }));

    return ApiResponse.error(res, statusCode, "Validation Error getting", errors);
  }

  /**
   * Invalid Mongo ObjectId
   */
  if (err instanceof mongoose.Error.CastError) {
    return ApiResponse.error(
      res,
      httpStatus.BAD_REQUEST,
      `Invaliddddddd ${err.path}`,
    );
  }

  /**
   * Duplicate Key Error
   */
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];

    return ApiResponse.error(
      res,
      httpStatus.CONFLICT,
      `${field} already exists`,
    );
  }

  /**
   * JWT Expired
   */
  if (err instanceof jwt.TokenExpiredError) {
    return ApiResponse.error(res, httpStatus.UNAUTHORIZED, "Token expired");
  }

  /**
   * Invalid JWT
   */
  if (err instanceof jwt.JsonWebTokenError) {
    return ApiResponse.error(res, httpStatus.UNAUTHORIZED, "Invalid token");
  }

  /**
   * Default
   */
  return ApiResponse.error(
    res,
    statusCode,
    message,
    process.env.NODE_ENV === "development" ? [{ stack: err.stack }] : [],
  );
};

export default errorHandler;
