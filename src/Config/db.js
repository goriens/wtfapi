const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect(process.env.DB_URL).then((data) => {
    console.log(`Mongo connected with server:${data.connection.host}`);
  });
};
module.exports = connect;
