import mongoose  from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },

    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    deleted:{
        type:Boolean,
        default:false
    }
  },
  {
    timestamps: true,
  }
);

const CommentsModel=new mongoose.model("comments",commentSchema);
export default CommentsModel;