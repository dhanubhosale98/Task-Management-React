import User from "../models/user.model.js";

class UserRepository {
  async create(userData) {
    return await User.create(userData);
  }

  async findByEmail(email) {
    return await User.findOne({ email });
  }

  async findByEmployeeId(employeeId) {
    return await User.findOne({ employeeId });
  }

  async findById(Id) {
    return await User.findOne({ _id:Id }).populate({
        path: "team",
        populate: [
            {
                path: "manager",
                select: "firstName lastName employeeId email"
            },
            {
                path: "teamLead",
                select: "firstName lastName employeeId"
            }
        ]
    });
  }

  async findLastEmployee() {
    return await User.findOne().sort({ employeeId: -1 });
  }

  async findAllUser(){
    return await User.find({}).populate("team","_id name");
  }

  async updateUser(id,data){
    return await User.findByIdAndUpdate (id,data,{ new: true, runValidators: true })
  }
 
  

}

export default new UserRepository();
// signal variable to store the state when updated automatically update the ui
//computed if we want to calculate the value based on other signal cart total quantity signal computed effec side effect save get consle log effect 

// module fedaration microfrontend architecure.