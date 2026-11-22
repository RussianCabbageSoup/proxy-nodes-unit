import "dotenv/config";
import express from "express";
import errorHandler from "./middleware/errorHandler.js";
import router from "./routes/router.js";
import notFound from "./middleware/notFound.js";

const app = express();

app.use(express.json());
app.use(router);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`proxy started on ${PORT}`));