import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      // minlength: 6,
      // select: false,
    },

    role: {
      type: String,
      enum: ["ADMIN", "MANAGER", "TEAM_LEAD", "EMPLOYEE"],
      default: "EMPLOYEE",
    },

    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      default: null,
    },

    designation: {
      type: String,
      trim: true,
    },

    employeeId: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },

    phoneNumber: {
      type: String,
      trim: true,
    },

    profileImage: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      default: "ACTIVE",
      enum:["ACTIVE","DEACTIVE"]
    },

    lastLogin: {
      type: Date,
      default: null,
    },

    refreshToken: {
      type: String,
      default: null,
      select: false,
    },
  },
  {
    timestamps: true,
    //  toJSON: {
    //   transform(doc, ret) {
    //     delete ret.password;
    //     delete ret.__v;
    //     return ret;
    //   },
    // },
    // toObject: {
    //   transform(doc, ret) {
    //     delete ret.password;
    //     delete ret.__v;
    //     return ret;
    //   },
    // },
  }
);

//password hashing
userSchema.pre(["save"], async function () {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 10);
});

//compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//export model 
const User = mongoose.model("User", userSchema);

export default User;
