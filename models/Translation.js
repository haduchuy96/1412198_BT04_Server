var mongoose = require('mongoose');
var TranslationSchema = new mongoose.Schema(
    {
        source_user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        source_wallet: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Wallet'
        },
        dest_user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        dest_wallet: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Wallet'
        },

        amount: {type: Number, required: true},

        created_at: {type: String}

    }
);


module.exports = mongoose.model('Translation', TranslationSchema, 'translation');