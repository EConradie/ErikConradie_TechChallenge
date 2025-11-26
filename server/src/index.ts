import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import AppDataSource from "./dataSource";
import userRoutes from "./routes/userRoutes";
import todoRoutes from "./routes/todoRoutes";
import { setupSwagger } from "./utils/swagger";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/todos", todoRoutes);

setupSwagger(app);

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");

    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error(err));
