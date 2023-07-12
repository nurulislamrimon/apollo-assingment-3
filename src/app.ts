import express from "express";
import globalErrorHandler from "./middlewares/global_error_handlers";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(globalErrorHandler);

app.use((req, res, next) => {
  res.send({
    success: false,
    message: "Route Not Found!",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found!",
      },
    ],
  });
});

export default app;
