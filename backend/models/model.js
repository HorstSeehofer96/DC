const mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator');
const MYSchema = new mongoose.Schema({

    pirateName: {
        type: String,
        required: [true, "name is required"],
        minlength: [3, "min length 3"],
        unique: [true, "name must be unique"],
    },

    imgUrl: {
        type: String,
        required: [true, " is required"],
    },
    catchPhrase: {
        type: String,
        required: [true, " is required"],
    },

    counterValue: {
        type: Number
    },

    rank: {
        type: String,
        required: [true, " is required"],
        enum: ['Captain', 'First Mate','Quarter Master','Boatsswain','Powder Monkey'],  
    },

    pegLeg: {
        type: Boolean,
        required: [true, " is required"],
    },

    eyePatch: {
        type: Boolean,
        required: [true, " is required"],
    },

    hookHand: {
        type: Boolean,
        required: [true, " is required"],
    },


}, { timestamps: true });


MYSchema.plugin(uniqueValidator);
module.exports.MY = mongoose.model('MY', MYSchema);