const mongoose = require('mongoose');

const Schema = mongoose.Schema

const craftSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: [
            'Embroidery',
            'Painting',
            'Pottery',
            'Crochet',
            'Jewellery',
            'Other'
        ],
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    notForSale: {
        type: Boolean
    },
    anonymous: {
        type: Boolean
    },
    materials: {
        type: String
    }
}, {timestamps: true});

module.exports = mongoose.model('Craft', craftSchema)