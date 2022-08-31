const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect("mongodb://127.0.0.1:27017/wtf").then((data) => {
    console.log(`Mongo connected with server:${data.connection.host}`);
  });
};
module.exports = connect;
