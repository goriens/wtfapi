const mongoose = require("mongoose");

const connect = () => {
  return mongoose
    .connect(
      "mongodb+srv://admin:8pmEpKioxDrb4xe1@cluster0.isyhv4z.mongodb.net/wtf?retryWrites=true&w=majority"
    )
    .then((data) => {
      console.log(`Mongo connected with server:${data.connection.host}`);
    });
};
module.exports = connect;
