const express = require('express');
const catchMiddleware = require('../middlewares/catchAsyncErrors');
const jobControllers = require('../controllers/jobControllers');
const { isAuthenticated, isAuthorized } = require('../middlewares/auth');


const router = express.Router();

router.get('/', (req, res) => {
    res.send('respond with a resource');
});
router.post('/', isAuthenticated, isAuthorized("Employer"), catchMiddleware(jobControllers.createJob));
router.get('/all', catchMiddleware(jobControllers.getAllJobs));






module.exports = router;
