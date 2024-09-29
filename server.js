process.on("uncaughtException", (err) => {
  console.log("error", err);
});

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const dbConnection = require("./databases/dbConnection.js");

const app = express();
const port = 3000;

dotenv.config();


const { bootstrap } = require("./src/index.routes.js");
const { createOnlineOrder } = require("./src/modules/order/orderController.js");

dbConnection();

app.use(cors());
app.post('/webhooks', express.raw({ type: 'application/json' }), createOnlineOrder);
app.use(express.json());

app.get("/", (req, res, next) => {
  res.json({ msg: "hello world" });
});
bootstrap(app);




process.on("unhandledRejection", (err) => {
  console.log("error", err);
});
app.listen(process.env.PORT || port, () =>
  console.log(`Example app listening on port ${port}!`)
);
