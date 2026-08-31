import httpStatus from "http-status";
import { ApiResponse } from "../utils/index.js";

const validate = (schema) => {
  return (req, res, next) => {
    let data = {};

    console.log(req.body,"....body");
    console.log(req.params,"....params")
    data={
      params:req.params,
      body:req.body,
      query:req.query
    }
    console.log(data,"....data")
    const { error, value } = schema.validate(data, {
      abortEarly: true,
      stripUnknown: true,
    });

    if (error) {
      return ApiResponse.error(
        res,
        httpStatus.BAD_REQUEST,
        "Validation Error",
        error.details.map((item) => ({
          field: item.path.join("."),
          message: item.message,
        })),
      );
    }

    req.body = value.body;

    next();
  };
};

export default validate;
