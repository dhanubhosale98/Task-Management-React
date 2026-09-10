import mongoose from "mongoose";

const refreshTokenSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  token:{
    type:String,
    require:true
  },
  isUsed:{
    type:Boolean,
    require:true,
    default:false
  }
});

const refreshModel=mongoose.model("RefreshToken",refreshTokenSchema);
export default refreshModel;