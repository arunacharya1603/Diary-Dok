const express = require('express');
const app = express();
require('dotenv').config();
require("./conn/conn");
const cors = require('cors');

const UserAPI = require('./routes/user');
const DairyAPI = require('./routes/dairy');

app.use(cors({
 origin: 'https://66a9dc3e8ec79c70e690fa07--celebrated-druid-0af2c9.netlify.app', // Replace with your frontend URL
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization,id'
}));

app.use(express.json());

app.use("/api/v1", UserAPI);
app.use("/api/v2", DairyAPI);

app.use("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 1000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
