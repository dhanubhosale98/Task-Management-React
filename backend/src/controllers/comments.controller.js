import commentsService from "../services/comments.service.js";
import { ApiResponse, asyncHandler } from "../utils/index.js";
import httpStatus from "http-status";

class CommentsController {
  createComment = asyncHandler(async (req, res) => {
    let comment = await commentsService.createComment(req.body);
    return ApiResponse.success(
      res,
      httpStatus.CREATED,
      "Comment added successfully.",
      comment,
    );
  });

  getAllComments = asyncHandler(async (req, res) => {
    console.log(req.params.id);
    let comment = await commentsService.getAllComments(req.params.id);
    return ApiResponse.success(res, httpStatus.OK, "", comment);
  });

  deleteComments = asyncHandler(async (req, res) => {
    console.log(req.user);
    console.log(req.params.id);
    let comment = await commentsService.deleteComments(req.params.id, req.user);
    return ApiResponse.success(
      res,
      httpStatus.OK,
      "Comment Deleted Successfully",
      comment,
    );
  });

  editComment = asyncHandler(async (req, res) => {
    console.log(req.user);
    console.log(req.params.id);
    let comment = await commentsService.editComment(
      req.params.id,
      req.user,
      req.body.text,
    );
    return ApiResponse.success(
      res,
      httpStatus.OK,
      "Comment Updated Successfully",
      comment,
    );
  });
}

export default new CommentsController();
