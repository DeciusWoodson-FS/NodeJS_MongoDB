const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Product name is required"]
    }, 
    price: {
        type: Number, 
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"]
    },
    category: {
        type: String,
        enum: {
            values: ["Electronics", "Apparel", "Grocery", "Other"],
            message: "{VALUE} is not a supported category"
        },
        default: "Other"
    },
    storeId: {
        type: Schema.Types.ObjectId, 
        ref: "Store",
        required: [true, "Product must belong to a store"]
    }
}, {timestamps: true});

module.exports = mongoose.model("Product", productSchema);