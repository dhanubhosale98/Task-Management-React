import httpStatus from "http-status";

import userService from "../services/user.service.js";
import { ApiResponse, asyncHandler } from "../utils/index.js";

class UserController {
  login = asyncHandler(async (req, res) => {
    const [user, token, refreshToken] = await userService.login(req.body);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      // path: "/",
    });
    return ApiResponse.success(res, httpStatus.OK, "", user, null, token);
  });

  getAccessToken = asyncHandler(async (req, res) => {
    const refreshTokenFrmCookie = req.cookies?.refreshToken;
    const [accessToken, refreshToken] =
      await userService.getAccessToken(refreshTokenFrmCookie);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return ApiResponse.success(
      res,
      httpStatus.OK,
      "Access token generated successfully.",
      { accessToken },
    );
  });

  createUser = asyncHandler(async (req, res) => {
    const user = await userService.createUser(req.body);

    return ApiResponse.success(
      res,
      httpStatus.CREATED,
      "User created successfully.",
      user,
    );
  });

  getAllUser = asyncHandler(async (req, res) => {
    let users = await userService.getAllUser();
    return ApiResponse.success(res, httpStatus.OK, "Success", users);
  });

  getUserById = asyncHandler(async (req, res) => {
    console.log(req.params);
    let user = await userService.getUser(req.params.id);
    return ApiResponse.success(res, httpStatus.OK, "Success", user);
    // return user
  });

  updateUser = asyncHandler(async (req, res) => {
    console.log(req.body);
    console.log("controller called");
    let user = await userService.updateUser(req.params.id, req.body);
    return ApiResponse.success(res, httpStatus.OK, "Success", user);
  });

  deactivateUser = asyncHandler(async (req, res) => {
    let user = await userService.deactivateUser(req.params.id);
    return ApiResponse.success(
      res,
      httpStatus.OK,
      "User deactivated successfully",
      user,
    );
  });

  activateUser = asyncHandler(async (req, res) => {
    let user = await userService.activateUser(req.params.id);
    return ApiResponse.success(
      res,
      httpStatus.OK,
      "User activated successfully",
      user,
    );
  });
}

export default new UserController();
