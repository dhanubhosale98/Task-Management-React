import mongoose from "mongoose";

let taskSchema = mongoose.Schema(
  {
    ticketNo: {
      type: String,
      required: true,
      unique: true,
    },

    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["TODO", "IN_PROGRESS", "COMPLETED"],
      default: "TODO",
    },
    assign_to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      // required: true,
    },
    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      default: "LOW",
    },

    hasSubTask: {
      type: Boolean,
      default: false,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    comments: {
      type: [String],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    attachments: [
      {
        originalName: {
          type: String,
          required: true,
        },

        fileName: {
          type: String,
          required: true,
        },

        filePath: {
          type: String,
          required: true,
        },

        mimeType: {
          type: String,
          required: true,
        },

        size: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

let taskModule = mongoose.model("Task", taskSchema);

export default taskModule;

// let task = {
//   id: "",
//   ticketNo: "", // TASK-101
//   title: "",
//   description: "",
//   status: "", // Todo, In Progress, Completed
//   assignee: "", // Overall owner (Manager/Team Lead)
//   priority: "", // Low, Medium, High
//   assets: [], // Files/Attachments
//   hasSubTask: false,

//   startDate: "",
//   dueDate: "",

//   createdBy: "",
//   createdAt: "",
//   updatedAt: "",

//   comments: [],
//   labels: [],
// };
