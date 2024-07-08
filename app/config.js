exports.getConfig = async () => {
  const port = 5000;
  const mongoose = require("mongoose");

  const mongoConnect = await mongoose.connect("mongodb://127.0.0.1:27017/", {
    useNewUrlParser: true,
    dbName: "procurement",
  });
  const config = {
    port,
    mongoConnect,
  };
  return config;
};
