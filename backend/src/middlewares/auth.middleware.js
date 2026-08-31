import ApiResponse from "../utils/ApiResponse.js";
import { verifyAccessToken } from "../utils/jwt.js";
import httpStatus from "http-status";

const AuthMiddleware = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    // Authorization header missing
    if (!authorization) {
      return ApiResponse.error(
        res,
        httpStatus.UNAUTHORIZED,
        "Please provide access token"
      );
    }

    // Check Bearer format
    const [type, token] = authorization.split(" ");

    if (type !== "Bearer" || !token) {
      return ApiResponse.error(
        res,
        httpStatus.UNAUTHORIZED,
        "Invalid authorization header"
      );
    }

    // Verify access token
    const user = await verifyAccessToken(token);

    // Store authenticated user for controllers
    req.user = user;

    next();

  } catch (error) {
    return ApiResponse.error(
      res,
      httpStatus.UNAUTHORIZED,
      "Invalid or expired access token"
    );
  }
};

export default AuthMiddleware;