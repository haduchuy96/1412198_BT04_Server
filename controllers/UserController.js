var Wallet           = require('../models/Wallet');
var User             = require('../models/User');
var Translation = require('../models/Translation');

exports.GetWallet = function (req, res, next) {
    var user_id = req.params.id;
    User.findOne({_id: user_id}).exec()
        .then(function (user_result) {
            if (!user_result) {
                res.json({
                    status: 0,
                    message: "User not found",
                });
                return null;
            }

            user = user_result;
            return Wallet.find().where({user: user_id}).exec();
        })
        .then(function (wallet_result) {
            wallet = wallet_result;
            res.json({
                status: 1,
                message: "Get wallet successfully",
                data: wallet
            });
        });
};


exports.GetAllUser = function (req, res, next) {
    User.find({}, function (err, users_result) {
        if(err) {/*error!!!*/}
        res.json({
            status: 1,
            message: "Get all user successfully",
            data: users_result
        });

    });
};



exports.GetAllTranslation = function (req, res, next) {
    Translation.find({}).sort([['created_at', -1]]).exec( function (err, Translations_result) {
        if(err) {/*error!!!*/}
        res.json({
            status: 1,
            message: "Get all translations successfully",
            data: Translations_result
        });

    });
};

exports.GetAllTranslationUser = function (req, res, next) {
    var user_id = req.params.id;
    Translation.find().where({$or: [{source_user: user_id}, {dest_user: user_id}]}).sort([['created_at', -1]]).exec( function (err, Translations_result) {
        if(err) {/*error!!!*/}
        res.json({
            status: 1,
            message: "Get all translations successfully",
            data: Translations_result
        });

    });
};


exports.CreateTranslation = function (req, res, next) {

        var sourceWalletId = req.body.source_wallet;
        var destWalletId   = req.body.dest_wallet;
        var amount         = req.body.amount;

        console.log(sourceWalletId);
        console.log(destWalletId);
        console.log(amount);


        Wallet.findOne().where({user:sourceWalletId}).exec()
            .then(function (srcWallet) {
                if (!srcWallet) {

                    res.json({
                        status: 0,
                        message: "Wallet does not existr",
                    });
                    return;
                }
                sourceWallet = srcWallet;

                if (( sourceWallet.money - amount) < 0) {
                    res.json({
                        status: 0,
                        message: "Not enough money",
                    });
                    return;
                }

                Wallet.findOne().where({user:destWalletId}).exec()
                    .then(function (desWallet) {
                        if (!desWallet) {
                            res.json({
                                status: 0,
                                message: "Wallet does not existr",
                            });
                            return;
                        }


                        destWallet = desWallet;

                        var newTranslation = new Translation({
                            "source_user": sourceWallet.user,
                            "source_wallet": sourceWallet.id,
                            "dest_user": destWallet.user,
                            "dest_wallet": destWallet.id,
                            "amount": amount,
                            "created_at": new Date().toISOString()
                        });


                        newTranslation.save(function (error, translation) {
                           if(!translation){
                               res.json({
                                   status: 0,
                                   message: "Error create translation",
                               })
                               return;
                           }
                            var amount_source =  parseFloat(sourceWallet.money)- parseFloat(amount);
                            var amount_dest =  parseFloat(destWallet.money) + parseFloat(amount);

                            sourceWallet.update({money: amount_source}).exec();
                            destWallet.update({money: amount_dest}).exec();
                            res.json({
                                status: 1,
                                message: "Create translation successfully",
                                data: translation

                            })
                            return;

                        });

                    });
            });


};



