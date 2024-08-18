const express = require('express');

const router = express.Router();

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');




router.get('/', (req, res) => {
  res.json({ 'welcome to job portal api': true });
});


router.use('/auth', authRoutes);
router.use('/user', userRoutes);


module.exports = router;
