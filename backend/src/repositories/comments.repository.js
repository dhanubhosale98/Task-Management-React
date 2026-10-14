import CommentsModel from "../models/comments.model.js";

class CommentsRepo {
  createComment = async (comment) => {
    // return await CommentsModel.create(comment).populate("createdBy","_id firstName lastName");
    const newComment = await CommentsModel.create(comment);

    await newComment.populate("createdBy", "_id firstName lastName");

    return newComment;
  };

  getAllComments = async (taskId) => {
    let result = await CommentsModel.find({
      taskId: taskId,
      deleted: false,
    }).populate("createdBy", "_id firstName lastName");
    console.log(result, "....comments");
    return result;
  };

  deleteComments = async (commentId) => {
    await CommentsModel.findByIdAndUpdate(
      { _id: commentId },
      { deleted: true },
      { new: true },
    );
  };

  findById = async (commentId) => {
    return await CommentsModel.findById(commentId);
  };

  editComment = async (commentId, data) => {
 return await CommentsModel.findByIdAndUpdate(
      { _id: commentId },
      { text: data },
      { new: true },
    );
  };
}

export default new CommentsRepo();
