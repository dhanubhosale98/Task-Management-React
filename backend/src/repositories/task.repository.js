import Task from "../models/task.model.js";

class TaskRepository {
  createTask = async (data) => {
    return await Task.create(data);
  };

  getAllTask = async (filter, limit, page) => {
    return await Task.find({ isDeleted: false, ...filter })
      .populate("assign_to", "_id firstName")
      .skip(limit * (page-1))
      .limit(limit);
  };

  UpdateTask = async (id, data) => {
    return await Task.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  };

  findTaskById = async (id) => {
    return await Task.findById(id);
  };

  deleteTask = async (id) => {
    return await Task.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, runValidators: true },
    );
  };

  returnCountOfDoc=async(filter)=>{
    return await Task.find({isDeleted:false,...filter});
  }

  changeStatus=async(id,status)=>{
    console.log(status,"...status")
    return await Task.findByIdAndUpdate(id,status,{new:true,runValidators:true})
  }


  getCountOFAllRecords=async()=>{
   return await Task.find({});
  }
}

export default new TaskRepository();
