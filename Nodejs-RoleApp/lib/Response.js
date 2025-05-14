const Enum = require("../config/Enum");
const CustomError = require("./CustomError");
class Response {
  constructor() {}

  static successResponse(data, code = 200, message = "success") {
    return {
      statusCode:code,
      data,
      message,
    };
  }
  static errorResponse(error) {
    if (error instanceof CustomError) {
      return {
        code: error.code ,
        error: {
          message: error.message || "Internal Server Error",
          description: error.description || "Something went wrong",
        },
      };
    }
    return {
      code: Enum.HTTP_CODES.INTERNAL_SERVER_ERROR,
      error: {
        message: error.message || "Internal Server Error",
        description: error.message || "Something went wrong",
      },
    };
  }
}

module.exports = Response;