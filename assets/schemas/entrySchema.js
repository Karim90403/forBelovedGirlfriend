const mongoose = require("mongoose");

module.exports = mongoose.model(
    "entrySchema",
    mongoose.Schema(
        {
            myData: [String],
            herData: [String],
            countDays: Number
        },
        { timestamps: true }
    ),
    "app_entry"
);