import express from "express";
// Logging
import morgan from "morgan";

import routes from "./routes/index.js";

const app = express();

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
// encode post body and available on req.body
app.use(express.urlencoded({ extended: true }));

// Routers
app.use(routes);

// Trigger a error for testing
app.get("/error", function (req, res) {
  throw new Error("oops I made a mistake");
});

// Error handler middleware
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(err.message);
});

// 404 catch
app.use(function (req, res) {
  res.status(404).send("not found");
});

app.listen(3000, function () {
  console.log("app is listening on port 3000");
});
