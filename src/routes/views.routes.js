import express from 'express';

const router = express.Router();

//endpoints
router.get('/', (req,res) => {
    res.render("index", {

    });
});

export default router;