const express = require('express');
const catchMiddleware = require('../middlewares/catchAsyncErrors');
const authControllers = require('../controllers/authControllers');
const isAuthenticated = require('../middlewares/auth');


const router = express.Router();

router.get('/', (req, res) => {
    res.send('respond with a resource');
});
router.post('/register', catchMiddleware(authControllers.register));
router.post('/login', catchMiddleware(authControllers.login));
router.post('/logout', isAuthenticated, catchMiddleware(authControllers.logout));



module.exports = router;
