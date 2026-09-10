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
import Refresh from "../models/refreshToken.model.js";
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
        await Refresh.create({ userId: user._id, token: refreshToken });
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
    // 1. Refresh token must exist
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Refresh token is required.");
    }

    // 2. Verify JWT
    const refresh = await verifyRefreshToken(token);

    if (!refresh?.id) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid refresh token.");
    }

    // 3. Atomically consume the refresh token
    const refreshRecord = await Refresh.findOneAndUpdate(
      {
        token: token,
        isUsed: false,
      },
      {
        $set: {
          isUsed: true,
        },
      },
      {
        new: true,
      },
    );

    // 4. Token doesn't exist OR was already used
    if (!refreshRecord) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Invalid or already used refresh token.",
      );
    }

    // 5. Generate new refresh token
    const newRefreshToken = await generateRefreshToken({
      id: refresh.id,
    });

    // 6. Store new refresh token
    await Refresh.create({
      userId: refresh.id,
      token: newRefreshToken,
      isUsed: false,
    });

    // 7. Generate new access token
    const accessToken = generateAccessToken({
      id: refresh.id,
    });

    // 8. Return both
    return [accessToken, newRefreshToken];
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
