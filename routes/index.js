const express = require('express');

const router = express.Router();

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const jobRoutes = require('./jobRoutes');




router.get('/', (req, res) => {
  res.json({ 'welcome to job portal api': true });
});


router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/job', jobRoutes);


module.exports = router;
