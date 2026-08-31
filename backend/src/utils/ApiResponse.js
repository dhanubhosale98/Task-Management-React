class ApiResponse {
  constructor(
    statusCode,
    data = null,
    message = "Success",
    total = null,
    token = null,
  ) {
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    if (total) this.total = total;
    if (token) this.AccessToken = token;
  }

  static success(
    res,
    statusCode,
    message,
    data = null,
    total = null,
    token = null,
  ) {
    return res
      .status(statusCode)
      .json(new ApiResponse(statusCode, data, message, total,token));
  }

  static error(res, statusCode, message, errors = []) {
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      errors,
    });
  }
}

export default ApiResponse;
