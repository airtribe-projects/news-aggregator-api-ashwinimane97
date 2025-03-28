const express = require('express');
const router = express.Router();
const newsController = require('../controller/newsController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get("/", authenticateToken, newsController.getNews);


module.exports = router;
