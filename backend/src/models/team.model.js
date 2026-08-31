import mongoose from "mongoose";
import { ref } from "node:process";

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    teamLead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      transform(doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
  },
);

const teamsModel = mongoose.model("Team", teamSchema);

export default teamsModel;
