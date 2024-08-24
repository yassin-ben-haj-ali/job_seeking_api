const express = require('express');

const router = express.Router();

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const jobRoutes = require('./jobRoutes');
const applicationRoutes=require('./applicationRoutes');




router.get('/', (req, res) => {
  res.json({ 'welcome to job portal api': true });
});


router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/job', jobRoutes);
router.use('/application', applicationRoutes);



module.exports = router;
