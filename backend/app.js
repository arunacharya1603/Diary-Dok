const express = require('express');
const app = express();
require('dotenv').config();
require("./conn/conn");
const cors = require('cors');

const UserAPI = require('./routes/user');
const DairyAPI = require('./routes/dairy');

const allowedOrigins = ['https://diary-dok.vercel.app', 'http://localhost:3000'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization,id'
}));

app.use(express.json());

app.use("/api/v1", UserAPI);
app.use("/api/v2", DairyAPI);

app.use("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
