const mongoose = require("mongoose");

async function connectDB() {
  try {
    const connect = mongoose.connect(process.env.DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`mongoDB connected`);
  } catch (error) {
    console.log(`Error:${error}`);
    process.exit(1);
  }
}

module.exports = connectDB;
