const app = require("./app");
const connect = require("./Config/db");
const PORT = process.env.PORT || 5000;

// connect db
app.listen(PORT, async () => {
  try {
    await connect();
    console.log(`Server is Listening on port ${port}`);
  } catch (e) {
    console.log(e);
  }
});
