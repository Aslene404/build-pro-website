var mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;

const devisSchema = new Schema({
    fullname: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    city: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true,
        required: true
    },
    opinion: {
        type: String,
        trim: true
    },
    entreprise: {
        type: String,
        trim: true
    },
    numRegistre: {
        type: String,
        trim: true
    },
    cat: {
        type: String,
        trim: true,
        required: true
    },
    subcat: {
        type: String,
        trim: true,
        required: true
    }

},{
    timestamps: true
});

module.exports = mongoose.model('Devis', devisSchema);