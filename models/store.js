const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storeSchema = new Schema({
    name: {
        type: String,
        required: [true, "Store name is required"], //Validation required
        minlength: [3, "Store name must be at least 3 characters long"]
    },
    location: {
        type: String,
        required: [true, "Location is required"]
    },
    establishedDate: {
        type: Date, 
        default: Date.now //Sets a default value if not provided
    }, 
    isOpen: {
        type: Boolean,
        default: true
    }
}, { timestamps: true});

module.exports = mongoose.model("Store", storeSchema);