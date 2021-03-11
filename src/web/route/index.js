const express = require('express');
const router = express.Router();



router.get('/users', require('./users/get'));
router.post('/users', require('./users/create'));
router.get('/users/:userId', require('./users/find-by-userId'));
router.put('/users/:userId', require('./users/update'));


router.get('/categories', require('./categories/get'));
router.get('/categories/search', require('./categories/search'));
router.post('/categories', require('./categories/create'));
router.get('/categories/:categoryId', require('./categories/find-by-categoryId'));
router.put('/categories/:categoryId', require('./categories/update.js'));


router.get('/experience', require('./experience/get'));
router.post('/experience', require('./experience/create'));
// router.get('/', (req, res) =>{
//    res.send("Home");
// })


module.exports = router;




