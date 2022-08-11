module.exports = data => {
    try {
      return { status: "success", data: data };
    } catch (error) {
      return { status: "error", errorCode: 400, data: error };
    }
  };