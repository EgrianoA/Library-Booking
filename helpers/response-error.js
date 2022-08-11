module.exports = (code, message) => {
    try {
      const error = "error";
      switch (code) {
        case 400:
          if (message === "ValidationError") {
            return {
              status: error,
              statusCode: 400,
              errorCode: 501,
              message: "Validation data type error"
            };
          }
          if (message === "MongooseError") {
            return {
              status: error,
              statusCode: 400,
              errorCode: 502,
              message: "Server error"
            };
          }
          if (message === "CastError") {
            return {
              status: error,
              statusCode: 400,
              errorCode: 503,
              message: "Validation data type not match"
            };
          }
          if (message === "DisconnectedError") {
            return {
              status: error,
              statusCode: 400,
              errorCode: 504,
              message: "Connection timeout"
            };
          }
          if (message === "DivergentArrayError") {
            return {
              status: error,
              statusCode: 400,
              errorCode: 505,
              message: "Save array error"
            };
          }
          if (message === "MissingSchemaError") {
            return {
              status: error,
              statusCode: 400,
              errorCode: 506,
              message: "Invalid parameter"
            };
          }
          if (message === "DocumentNotFoundError") {
            return {
              status: error,
              statusCode: 400,
              errorCode: 507,
              message: "Data not found"
            };
          }
          if (message === "ValidatorError") {
            return {
              status: error,
              statusCode: 400,
              errorCode: 508,
              message: "Validator error"
            };
          }
          if (message === "MissingSchemaError") {
            return {
              status: error,
              statusCode: 400,
              errorCode: 509,
              message: "Missing Schema error"
            };
          }
          if (message === "ObjectExpectedError") {
            return {
              status: error,
              statusCode: 400,
              errorCode: 510,
              message: "Object Expected error"
            };
          }
          if (message === "ObjectParameterError") {
            return {
              status: error,
              statusCode: 400,
              errorCode: 511,
              message: "Object Parameter error"
            };
          }
          if (message === "OverwriteModelError") {
            return {
              status: error,
              statusCode: 400,
              errorCode: 512,
              message: "Overwrite model error"
            };
          }
          if (message === "ParallelSaveError") {
            return {
              status: error,
              statusCode: 400,
              errorCode: 513,
              message: "Save data error"
            };
          }
          if (message === "StrictModeError") {
            return {
              status: error,
              statusCode: 400,
              errorCode: 514,
              message: "Strict mode error"
            };
          }
          if (message === "VersionError") {
            return {
              status: error,
              statusCode: 400,
              errorCode: 515,
              message: "Out of version error"
            };
          }
          return {
            status: error,
            statusCode: 400,
            errorCode: code,
            message: message
          };
          break;
        case 101:
          return {
            status: error,
            statusCode: 400,
            errorCode: code,
            message: "Invalid url parameter"
          };
          break;
        case 102:
          return {
            status: error,
            statusCode: 400,
            errorCode: code,
            message: "Maximum docs per page is 50"
          };
          break;
        case 103:
          return {
            status: error,
            statusCode: 400,
            errorCode: code,
            message: "Image is invalid or upload failed"
          };
          break;
        case 104:
          return {
            status: error,
            statusCode: 400,
            errorCode: code,
            message: "Parameter required"
          };
          break;
        case 105:
          return {
            status: error,
            statusCode: 400,
            errorCode: code,
            message: "Only ext jpg or jpeg or png is allowed"
          };
          break;
        case 106:
          return {
            status: error,
            statusCode: 400,
            errorCode: code,
            message: "Invalid parameter"
          };
          break;
        case 107:
          return {
            status: error,
            statusCode: 400,
            errorCode: code,
            message: "Data not found"
          };
          break;
        case 201:
          return {
            status: error,
            statusCode: 400,
            errorCode: code,
            message: "User not found, please register"
          };
          break;
        case 202:
          return {
            status: error,
            statusCode: 400,
            errorCode: code,
            message: "Authorization token must be provided"
          };
          break;
        case 203:
          return {
            status: error,
            statusCode: 400,
            errorCode: code,
            message: "Authorization token is invalid"
          };
          break;
        case 1001: 
        return {
          status: error,
          statusCode: 400,
          errorCode: code,
          message: "Sesi telah berakhir, silahkan login kembali."
        };
        break;
        case 401:
          return {
            status: error,
            statusCode: 400,
            errorCode: code,
            message: "Authorization failed"
          };
          break;
        case 403:
          return {
            status: error,
            statusCode: 400,
            errorCode: code,
            message: "Forbidden"
          };
          break;
        case 404:
          return {
            status: error,
            statusCode: 400,
            errorCode: code,
            message: "Not found"
          };
          break;
  
        case 500:
          console.log(message);
          if (process.env.SERVERLESS === "YES")
            return {
              status: error,
              statusCode: 500,
              errorCode: code,
              message: "Internal server error"
            };
          if (!process.env.SERVERLESS)
            return {
              status: error,
              statusCode: 500,
              errorCode: code,
              message: message
            };
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };
  