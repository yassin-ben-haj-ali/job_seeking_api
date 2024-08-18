const express = require('express');
const catchMiddleware = require('../middlewares/catchAsyncErrors');
const userControllers = require('../controllers/userControllers');
const {isAuthenticated} = require('../middlewares/auth');


const router = express.Router();

router.get('/', (req, res) => {
    res.send('respond with a resource');
});
router.get('/me',isAuthenticated ,catchMiddleware(userControllers.getUser));
router.put('/',isAuthenticated,catchMiddleware(userControllers.updateProfile));
router.put('/password',isAuthenticated,catchMiddleware(userControllers.updatePassword));





module.exports = router;
