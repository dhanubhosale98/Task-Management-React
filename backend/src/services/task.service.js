import taskRepository from "../repositories/task.repository.js";
import { ApiError } from "../utils/index.js";
import httpStatus from "http-status";

class TaskService {
  createTask = async (data) => {
    let task = await taskRepository.getAllTask();
    let ticketNo = `t${task.length + 1}`;
    data.ticketNo = ticketNo;

    return await taskRepository.createTask(data);
  };

  getAllTask = async (filter, limit, page) => {
    const [task, total] =
      await Promise.all([
         taskRepository.getAllTask(filter, limit, page),
         taskRepository.returnCountOfDoc(filter)
      ]);

    return [task,total.length];
  };

  UpdateTask = async (id, data) => {
    let task = await taskRepository.findTaskById(id);
    console.log(task, ".......task");
    if (!task) {
      console.log("inside task");
      throw new ApiError(httpStatus.NOT_FOUND, "Task Not found");
    }
    let task1 = await taskRepository.UpdateTask(id, data);
    return task1;
  };

  deleteTask = async (id) => {
    let task = await taskRepository.findTaskById(id);
    console.log(task, ".......task");
    if (!task) {
      throw new ApiError(httpStatus.NOT_FOUND, "Task Not found");
    }
    let result = await taskRepository.deleteTask(id);
    return result;
  };

  changeStatus=async (id,status) => {
    let result = await taskRepository.changeStatus(id,status);
    return result;
  };
}

export default new TaskService();
