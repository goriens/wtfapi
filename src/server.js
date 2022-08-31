const app = require("./app");
const connect = require("./Config/db");
const port = process.env.PORT || 5000;

// connect db
app.listen(port, async () => {
  try {
    await connect();
    console.log(`Server is Listening on port ${port}`);
  } catch (e) {
    console.log(e);
  }
});
