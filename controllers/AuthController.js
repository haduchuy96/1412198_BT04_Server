var User = require('../models/User');
var Wallet = require('../models/Wallet');
var Translation = require('../models/Translation');

exports.Login = function (req, res, next) {

    var username = req.body.username;
    var password = req.body.password;

    User.GetByUsername(username, function (err, user) {
        if (err || !user){
            res.json({
                asb: 1,
                status: 0,
                message: "User not found"
            });
            return;
        }

        User.ComparePassword(password, user.password, function(err, isMatch){
            if (err) {
                res.json({
                    status: 0,
                    message: "Can not compare password"
                });
                return;
            }

            if(isMatch){
                res.json({
                    status: 1,
                    message: "Logged in successfully",
                    data: {
                        user_id: user.id,
                        user_name: user.username,
                    }
                });
                return;
            } else {
                res.json({
                    status: 0,
                    message: "Password was not match"
                });
                return;
            }
        });
    });
};

exports.Register = function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    console.log(username);
    var newUser = new User({
        username: username,
        password: password
    });

    User.CreateUser(newUser, function (err, user) {
        if (err){
            res.json({
                status: 0,
                message: "Error"
            });
            return;
        }
        var newWallet = new Wallet({
            "user": user.id,
            "money":1000
        });
        console.log(newWallet);
        newWallet.save(function (error, wallet) {
            res.json({
                status: 1,
                message: "Created user successfully",
                data: {
                    user_id: user.id,
                    user_name: user.username,
                    wallet: wallet
                }
            });
        });
    });
};


