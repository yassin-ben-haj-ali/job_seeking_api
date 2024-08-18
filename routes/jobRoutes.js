const express = require('express');
const catchMiddleware = require('../middlewares/catchAsyncErrors');
const jobControllers = require('../controllers/jobControllers');
const isAuthenticated = require('../middlewares/auth');


const router = express.Router();

router.get('/', (req, res) => {
    res.send('respond with a resource');
});
router.post('/',isAuthenticated ,catchMiddleware(jobControllers.createJob));





module.exports = router;
