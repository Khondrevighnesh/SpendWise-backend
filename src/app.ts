import express from "express";
import cors from "cors";
import routes from "./routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

// Middlewares
app.use(cors());

app.use(express.json());

// Routes
app.use("/api", routes);

// Health check
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// Error handler
app.use(errorHandler);

export default app;