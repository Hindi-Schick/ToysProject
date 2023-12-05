const mongoose = require("mongoose");

const toySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    img_url: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: true,
    },
    date_created: {
        type: Date,
        default: Date.now,
    },
   user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    },
});

const Toy = mongoose.model("Toy", toySchema);

module.exports.Toy = Toy;
