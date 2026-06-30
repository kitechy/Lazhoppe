const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Atlas Connected");
    } catch (e) {
        console.error("Database Connection Error: ", e.message);
        process.exit(1);
    }
};

module.exports = connectDB;