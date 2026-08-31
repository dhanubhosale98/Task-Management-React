import Teams from "../models/team.model.js";
import User from "../models/user.model.js";

class TeamRepository {
  createTeam = async (data) => {
    return await Teams.create(data);
  };

  getEmployeeDrp = async () => {
    return await User.find({ team: null, status: "ACTIVE", role: "EMPLOYEE" });
  };

  getManagerDrp = async () => {
    return await User.find({ team: null, status: "ACTIVE", role: "MANAGER" });
  };

  getTeamLeadDrp = async () => {
    return await User.find({ team: null, status: "ACTIVE", role: "TEAM_LEAD" });
  };

  getAllTeams = async () => {
    return await Teams.find({})
      .populate("manager", "_id firstName lastName")
      .populate("teamLead", "_id firstName lastName");
  };


  getEmpByTeam=async(teamId)=>{
  return  await User.find({team:teamId})
  }
}

export default new TeamRepository();
