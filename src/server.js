require("dotenv").config();
const app = require("./app");
const dotenv = require("dotenv");
const connect = require("./Config/db");
const port = process.env.PORT || 5000;

// connect db
app.listen(port, async () => {
  await connect();
  console.log(`Server is Listening on port ${port}`);
});
