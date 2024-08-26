const express = require('express');
const catchMiddleware = require('../middlewares/catchAsyncErrors');
const applicationControllers = require('../controllers/applicationControllers');
const { isAuthenticated, isAuthorized } = require('../middlewares/auth');
const { singleUpload } = require('../middlewares/fileUpload');


const router = express.Router();

router.get('/', (req, res) => {
    res.send('respond with a resource');
});
router.post('/:id', isAuthenticated, isAuthorized("Job Seeker"), singleUpload('uploads/application', 'resume'), catchMiddleware(applicationControllers.postApplication));




module.exports = router;
