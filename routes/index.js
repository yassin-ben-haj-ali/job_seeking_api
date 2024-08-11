const express = require('express');

const router = express.Router();

const authRoutes = require('./authRoutes');



router.get('/', (req, res) => {
  res.json({ 'welcome to job portal api': true });
});


router.use('/auth', authRoutes);

module.exports = router;
