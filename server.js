import "dotenv/config";
import express from "express";
import connectDB from "./config/database.js";
import csvFcn from "./csvFcn.js";
import * as requests from "./controllers/requests.js";
import basicAuth from "express-basic-auth";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 2500;
const USERNAME = "actblue";
const PASSWORD = "CHANGEME";

//connect DB
connectDB();
// .then(() => csvFcn())
// .catch(function (error) {
//   console.log(error);
// });

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (request, response) => {
  response.send("API RUNNING");
});

app.get("/api/donorInfo", requests.getInfo);

app.post(
  "/actblue_webhook",
  basicAuth({ users: { [USERNAME]: PASSWORD } }),
  requests.webhook
);

app.listen(PORT, () => {
  console.log(`connected to ${PORT}`);
});
