import commentsRepository from "../repositories/comments.repository.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";

class CommentsService {
  createComment = async (comment) => {
    return await commentsRepository.createComment(comment);
  };

  getAllComments = async (taskId) => {
    return await commentsRepository.getAllComments(taskId);
  };
  
  deleteComments = async (commentId, user) => {
    let comment = await commentsRepository.findById(commentId);
    console.log(comment, "....commet");
    if (comment.createdBy != user.id) {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        "You don't permission to delete this comment.",
      );
    }
    return await commentsRepository.deleteComments(commentId);
  };

    editComment = async (commentId, user,data) => {
    let comment = await commentsRepository.findById(commentId);
    console.log(comment, "....commet");
    if (comment.createdBy != user.id) {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        "You don't permission to delete this comment.",
      );
    }
    return await commentsRepository.editComment(commentId,data);
  };

}

export default new CommentsService();
