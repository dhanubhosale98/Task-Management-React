import User from "../models/user.model.js";
import teamRepository from "../repositories/team.repository.js";

class TeamsService {
  createTeam = async (data) => {
    let team = await teamRepository.createTeam(data);

    let result = await User.updateMany(
      { _id: { $in: [data.manager, data.teamLead] } },
      { $set: { team: team._id } },
    );

    console.log(result, "......result");
    return team;
  };

  getAllTeams = async () => {
  let teams = await teamRepository.getAllTeams();

  teams = await Promise.all(
    teams.map(async (team) => {
      const employees = await teamRepository.getEmpByTeam(team._id);

      team.member = employees.length;

      return team;
    }),
  );

  return teams;
};

  getEmployeeDrp = async () => {
    return await teamRepository.getEmployeeDrp();
  };

  getManagerDrp = async () => {
    return await teamRepository.getManagerDrp();
  };

  getTeamLeadDrp = async () => {
    return await teamRepository.getTeamLeadDrp();
  };
}

export default new TeamsService();
