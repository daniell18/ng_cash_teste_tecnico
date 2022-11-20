import express from "express";
import router from "./routes";
import swaggerUiExpress from "swagger-ui-express";

import swaggerDocument from "./swagger.json";
const app = express();

app.use(express.json());
app.use(router);
app.use(
  "/api-docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerDocument)
);

export default app;
