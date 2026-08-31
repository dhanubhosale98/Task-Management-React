import taskService from "../services/task.service.js";
import { asyncHandler } from "../utils/index.js";
import { ApiResponse } from "../utils/index.js";
import httpStatus from "http-status";

class TaskController {
  createTask = asyncHandler(async (req, res) => {
    let task = await taskService.createTask(req.body);
    return ApiResponse.success(
      res,
      httpStatus.CREATED,
      "task created successfully.",
      task,
    );
  });

  getAllTask = asyncHandler(async (req, res) => {
    // console.log(req.query, "....params");
    const { searchText, status, priority, limit, page, assignee } = req.query;
    let filter = {};
    if (status) filter.status = status;
    if (priority) {
      filter.priority = { $in: [priority] };
    }
    if (searchText) {
      filter.$or = [
        { title: { $regex: searchText, $options: "i" } },
        { description: { $regex: searchText, $options: "i" } },
      ];
    }

    if (assignee) {
      filter.assign_to = assignee;
    }

    // console.log(filter, "...filter");

    let [task, total] = await taskService.getAllTask(filter, limit, page);
    return ApiResponse.success(res, httpStatus.OK, "", task, total);
  });

  UpdateTask = asyncHandler(async (req, res) => {
    let task = await taskService.UpdateTask(req.params.id, req.body);
    return ApiResponse.success(
      res,
      httpStatus.OK,
      "Task Updated Successfully",
      task,
    );
  });

  deleteTask = asyncHandler(async (req, res) => {
    let task = await taskService.deleteTask(req.params.id);
    return ApiResponse.success(
      res,
      httpStatus.OK,
      "Task Deleted Successfully",
      task,
    );
  });

  changeStatus=asyncHandler(async(req,res)=>{
    let task = await taskService.changeStatus(req.params.id,req.body);
    return ApiResponse.success(
      res,
      httpStatus.OK,
      "Status Updated Successfully",
      task,
    );
  })
}

export default new TaskController();
