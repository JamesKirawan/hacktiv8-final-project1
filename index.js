const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const userRoutes = require("./routes/user");
const reflectionRoutes = require("./routes/reflection");

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/reflections", reflectionRoutes);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
