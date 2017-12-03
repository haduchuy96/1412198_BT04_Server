var express               = require('express');
var cors = require('cors');
var AuthController        = require('../controllers/AuthController');
var UserController        = require('../controllers/UserController');
var router                = express.Router();

router.use(cors());

router.post('/register', AuthController.Register);
router.post('/login',AuthController.Login);

router.get('/wallet/:id/', UserController.GetWallet);
router.get('/alluser/', UserController.GetAllUser);


router.post('/translation', UserController.CreateTranslation);

router.get('/listtranslation', UserController.GetAllTranslation);
router.get('/listtranslation/:id', UserController.GetAllTranslationUser);

module.exports = router;