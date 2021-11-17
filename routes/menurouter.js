var router = require('express').Router();

router.get('/', (req, res)=>{
    res.render('home.html');
});
router.get('/mypage', (req, res)=>{
    res.render('mypage.html');
});
router.get('/viewed', (req, res)=>{
    res.render('viewed.html');
});
router.get('/cart', (req, res)=>{
    res.render('cart.html');
});
router.get('/track', (req, res)=>{
    res.render('track.html');
});
router.get('/cs', (req, res)=>{
    res.render('cs.html');
});
router.get('/category', (req, res)=>{
    res.render('category.html');
});
router.get('/join', (req, res)=>{
    res.render('join.html');
});

module.exports = router;