const express = require("express");
const {generateNewShortURL} = require('../controllers/urlController');
const router = express.Router();


router.post('/',generateNewShortURL);
module.exports = router;