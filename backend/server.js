const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errors");

const userRouter = require("./routes/user");
const eventRouter = require("./routes/event");
const expenseRouter = require("./routes/expense");
const menuRouter = require("./routes/menu");
const itemRouter = require("./routes/item");
const menuItemRouter = require("./routes/menu_item");

require("dotenv").config();
connectDB();

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(require("morgan")("dev"));
}

app.use("/api/users", userRouter);
app.use("/api/events", eventRouter);
app.use("/api/expenses", expenseRouter);
app.use("/api/menus", menuRouter);
app.use("/api/items", itemRouter);
app.use("/api/menu_items", menuItemRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "frontend", "build", "index.html")
    );
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`.yellow.bold));
