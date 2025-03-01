import express from 'express';

const router = express.Router();

//endpoints
router.get('/', (req,res) => {
    res.render("index", {

    });
});

//endpoints
router.get('/productDetail', (req,res) => {
    res.render("productDetail", {

    });
});


  

export default router;