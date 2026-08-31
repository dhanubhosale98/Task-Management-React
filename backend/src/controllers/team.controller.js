import teamService from "../services/team.service.js";
import { asyncHandler } from "../utils/index.js";
import { ApiResponse } from "../utils/index.js";
import httpStatus from "http-status";

class TeamController {
  createTeam = asyncHandler(async (req, res) => {
    let team = await teamService.createTeam(req.body);
    return ApiResponse.success(
      res,
      httpStatus.CREATED,
      "Team created successfully.",
      team,
    );
  });

  getEmployeeDrp = asyncHandler(async (req, res) => {
    let emp = await teamService.getEmployeeDrp();
    return ApiResponse.success(res, httpStatus.OK, "", emp);
  });

  getManagerDrp = asyncHandler(async (req, res) => {
    let emp = await teamService.getManagerDrp();
    return ApiResponse.success(res, httpStatus.OK, "", emp);
  });

  getTeamLeadDrp = asyncHandler(async (req, res) => {
    let emp = await teamService.getTeamLeadDrp();
    return ApiResponse.success(res, httpStatus.OK, "", emp);
  });

  getAllTeams = asyncHandler(async (req, res) => {
    let teams = await teamService.getAllTeams();
    return ApiResponse.success(res, httpStatus.OK, "", teams);
  });
}

export default new TeamController();
