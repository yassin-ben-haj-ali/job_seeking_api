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
router.get('/myjobs', isAuthenticated, isAuthorized("Employer"), catchMiddleware(jobControllers.getMyJobs));
router.delete('/:id', isAuthenticated, isAuthorized("Employer"), catchMiddleware(jobControllers.deleteJob));
router.get("/:id",isAuthenticated,catchMiddleware(jobControllers.getSingleJob));







module.exports = router;
