const mongoose = require("mongoose");

// for test the db
// DB_CONNECTION="mongodb+srv://anjanislive:ArR9Fe4hBZt1RRkM@nodejs.rpurxiz.mongodb.net/test"

const connectDB = async () => {
  await mongoose.connect(process.env.DB_CONNECTION);
};

module.exports = connectDB;
