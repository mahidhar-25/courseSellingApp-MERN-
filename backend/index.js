const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const creatorRouter = require("./routes/creator");
const userRouter = require("./routes/user");
const cors = require("cors");

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use(cors());
app.use("/creator", creatorRouter);
app.use("/user", userRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
