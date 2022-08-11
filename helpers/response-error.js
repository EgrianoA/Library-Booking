module.exports = (code, message) => {
  try {
    const error = "error";
    switch (code) {
      case 400:
        return {
          status: error,
          statusCode: 400,
          errorCode: code,
          message: message
        };
      case 101:
        return {
          status: error,
          statusCode: 400,
          errorCode: code,
          message: "Invalid url parameter"
        };
      case 102:
        return {
          status: error,
          statusCode: 400,
          errorCode: code,
          message: "Maximum docs per page is 50"
        };
      case 103:
        return {
          status: error,
          statusCode: 400,
          errorCode: code,
          message: "Image is invalid or upload failed"
        };
      case 104:
        return {
          status: error,
          statusCode: 400,
          errorCode: code,
          message: "Parameter required"
        };
      case 105:
        return {
          status: error,
          statusCode: 400,
          errorCode: code,
          message: "Only ext jpg or jpeg or png is allowed"
        };
      case 106:
        return {
          status: error,
          statusCode: 400,
          errorCode: code,
          message: "Invalid parameter"
        };
      case 107:
        return {
          status: error,
          statusCode: 400,
          errorCode: code,
          message: "Data not found"
        };
      case 201:
        return {
          status: error,
          statusCode: 400,
          errorCode: code,
          message: "User not found, please register"
        };
      case 202:
        return {
          status: error,
          statusCode: 400,
          errorCode: code,
          message: "Authorization token must be provided"
        };
      case 203:
        return {
          status: error,
          statusCode: 400,
          errorCode: code,
          message: "Authorization token is invalid"
        };
      case 1001:
        return {
          status: error,
          statusCode: 400,
          errorCode: code,
          message: "Sesi telah berakhir, silahkan login kembali."
        };
      case 401:
        return {
          status: error,
          statusCode: 400,
          errorCode: code,
          message: "Authorization failed"
        };
      case 403:
        return {
          status: error,
          statusCode: 400,
          errorCode: code,
          message: "Forbidden"
        };
      case 404:
        return {
          status: error,
          statusCode: 400,
          errorCode: code,
          message: "Not found"
        };

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
    }
  } catch (error) {
    console.log(error);
  }
};
