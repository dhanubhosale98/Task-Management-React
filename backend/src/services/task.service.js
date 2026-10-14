import taskRepository from "../repositories/task.repository.js";
import { ApiError } from "../utils/index.js";
import httpStatus from "http-status";
import fs from "fs/promises";
import path from "path";

class TaskService {
  createTask = async (data) => {
    let task = await taskRepository.getCountOFAllRecords();
    let ticketNo = `T${task.length + 1}`;
    data.ticketNo = ticketNo;

    return await taskRepository.createTask(data);
  };

  getAllTask = async (filter, limit, page) => {
    const [task, total] = await Promise.all([
      taskRepository.getAllTask(filter, limit, page),
      taskRepository.returnCountOfDoc(filter),
    ]);

    return [task, total.length];
  };

  UpdateTask = async (id, data, attachments) => {
    let { deletedAttachments, ...taskData } = data;
    deletedAttachments = JSON.parse(deletedAttachments);

    let task = await taskRepository.findTaskById(id);
    if (!task) {
      console.log("inside task");
      throw new ApiError(httpStatus.NOT_FOUND, "Task Not found");
    }
    Object.assign(task, taskData);
    if (deletedAttachments.length > 0) {
      let filesToDelete = task.attachments.filter((x) => {
        if (deletedAttachments.includes(x._id.toString())) {
          return x;
        }
      });

      // Delete physical files
      for (const attachment of filesToDelete) {
        const filePath = path.resolve(attachment.filePath);
        console.log(filePath, "...file path");
        try {
          await fs.unlink(filePath);
          console.log("file deleted successfully");
        } catch (error) {
          // File doesn't exist
          if (error.code !== "ENOENT") {
            throw error;
          }
        }
      }

      task.attachments = task.attachments.filter((x) => {
        console.log(typeof x._id.toString(), "........element type");
        console.log(typeof deletedAttachments[0], ".....delete type");
        if (!deletedAttachments.includes(x._id.toString())) {
          return x;
        }
      });
    }
    if (attachments.length > 0) {
      task.attachments.push(...attachments);
    }

    console.log(task, "...final task");
    let task1 = await task.save();
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

  changeStatus = async (id, status) => {
    let result = await taskRepository.changeStatus(id, status);
    return result;
  };
}

export default new TaskService();