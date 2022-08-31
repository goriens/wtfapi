require("dotenv").config();
const app = require("./app");
const dotenv = require("dotenv");
const connect = require("./Config/db");
const port = process.env.PORT || 5000;

//handle error
// process.on("uncaughtException", (err) => {
//   console.log(`Error: ${err.message}`);
//   console.log("shutting down server uncaught error");
//   process.exit(1);
// });
// dotenv.config({ path: "backend/src/Config/config.env" });

// connect db
const server = app.listen(port, async () => {
  await connect();
  console.log(`Server is Listening on port ${port}`);
});

// //unhandled error
// process.on("unhandledRejections", (err) => {
//   console.log(`Error: ${err.message}`);
//   console.log("Shutting down the server because of unhandled error");
//   server.close(() => {
//     process.exit(1);
//   });
// });
