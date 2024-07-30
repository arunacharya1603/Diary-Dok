const mongoose = require("mongoose");
require("dotenv").config();
const conn = async() => {
    try {
      const res = await mongoose.connect(`${process.env.MONGO_URI}`);
      if (res) {
        console.log("Connected to db");
      } 
    } catch (error) {
        console.log("Error in connection with db", error);
    }
};
conn();