var mongoose = require('mongoose');

var WalletSchema = new mongoose.Schema(
    {
        money: {type: Number,required: true},
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }
);




module.exports = mongoose.model('Wallet', WalletSchema, 'wallets');