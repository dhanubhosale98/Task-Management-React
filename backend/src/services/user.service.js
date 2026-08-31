import httpStatus from "http-status";
import userRepository from "../repositories/user.repository.js";
import {
  ApiError,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/index.js";
import jwt from "jsonwebtoken";
import config from "../config/env.js";
// import { use } from "react";

class UserService {
  async login(data) {
    const { email, password } = data;
    const user = await userRepository.findByEmail(email);
    if (user) {
      const result = await user.comparePassword(password);
      if (result) {
        const token = await generateAccessToken({ id: user._id });
        const refreshToken = await generateRefreshToken({ id: user._id });
        console.log(refreshToken, "....refreshToken");

        return [user, token, refreshToken];
      } else {
        throw new ApiError(
          httpStatus.CONFLICT,
          "Please provide valide Email Or Password.",
        );
      }
    } else
      throw new ApiError(
        httpStatus.CONFLICT,
        "User not found with given credentials",
      );
  }

  async getAccessToken(token) {
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Refresh token is required.");
    }

    const refresh = await verifyRefreshToken(token);

    if (!refresh?.id) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid refresh token.");
    }

    const accessToken = generateAccessToken({
      id: refresh.id,
    });

    return accessToken;
  }

  async createUser(userData) {
    const existingUser = await userRepository.findByEmail(userData.email);

    if (existingUser) {
      throw new ApiError(
        httpStatus.CONFLICT,
        "User with this email already exists.",
      );
    }

    const lastEmployee = await userRepository.findLastEmployee();

    let employeeId = "EMP0001";

    if (lastEmployee?.employeeId) {
      const lastNumber = Number(lastEmployee.employeeId.replace("EMP", ""));

      employeeId = `EMP${String(lastNumber + 1).padStart(4, "0")}`;
    }

    const newUser = {
      ...userData,
      employeeId,
    };

    const createdUser = await userRepository.create(newUser);

    return createdUser;
  }

  async getAllUser() {
    return userRepository.findAllUser();
  }

  async getUser(id) {
    let data = await userRepository.findById(id);
    return data;
  }

  async updateUser(id, data) {
    let user = await userRepository.findById(id);
    console.log("user..........", user);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found.");
    }

    if (user.status == "DEACTIVE") {
      throw new ApiError(httpStatus.NOT_FOUND, "First Activate user then try.");
    }
    return await userRepository.updateUser(id, data);
  }

  async deactivateUser(id) {
    let user = await userRepository.findById(id);

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found.");
    }

    if (user.status == "DEACTIVE") {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "User is already deactivated.",
      );
    }
    return await userRepository.updateUser(id, { status: "DEACTIVE" });
  }

  async activateUser(id) {
    let user = await userRepository.findById(id);

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found.");
    }

    if (user.status == "ACTIVE") {
      throw new ApiError(httpStatus.BAD_REQUEST, "User is already activated.");
    }
    return await userRepository.updateUser(id, { status: "ACTIVE" });
  }
}

export default new UserService();
