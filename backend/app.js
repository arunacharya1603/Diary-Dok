const express = require('express');
const app = express();
require('dotenv').config();
require("./conn/conn");
const cors = require('cors');

const UserAPI = require('./routes/user');
const DairyAPI = require('./routes/dairy');

app.use(cors());
app.use(express.json());

app.use("/api/v1", UserAPI);
app.use("/api/v2", DairyAPI);

app.use("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 1000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} `);
});