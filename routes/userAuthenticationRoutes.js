const express = require('express');
const router = express.Router();
const {createNewUser,loginUser} = require('../controllers/userController');

router.post('/',createNewUser);
router.post('/login',loginUser);



module.exports = router;