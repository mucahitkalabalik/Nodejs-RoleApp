let instance = null;
let mongoose = require("mongoose");

class Database {
  constructor() {
    if (!instance) {
      this.mongoConnection = null;
      instance = this;
    }
    return instance;
  }

  async connect(options) {

    try {
      let db = await mongoose.connect(options.CONNECTION_STRING);
      this.mongoConnection = db.connection;
      console.log("MongoDB connected");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      process.exit(1);
    }
    
  
    
  }
}

module.exports = Database;
