const express = require('express');
const router = express.Router();



router.get('/users', require('./users/get'));
router.post('/users', require('./users/create'));
router.get('/users/:userId', require('./users/find-by-userId'));
router.put('/users/:userId', require('./users/update'));

router.get('/', (req, res) =>{
   res.send("Home");
})


module.exports = router;




