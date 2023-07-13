import cors from "cors";
import express, { urlencoded } from "express";
import globalErrorHandler from "./middlewares/global_error_handlers";
import router from "./all_routes/all_routes";

const app = express();

// middlewares
app.use(cors());

// parser
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send({
    success: true,
    message: "Welcome to Cow hat!",
  });
});

app.use(router);

// global error handler
app.use(globalErrorHandler);
// not found route handler
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
