const mongoose = require("mongoose");
const db = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`moongdb connects to :${conn.connection.host}`);
  } catch (error) {
    console.log(`${error.message}`);
    process.exit(1);
  }
};
module.exports = db;