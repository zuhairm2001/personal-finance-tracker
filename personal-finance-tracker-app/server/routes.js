const express = require('express');
const router =  express.router();

router.get('/health', (req, res) => {
    res.staus(200).json({status: 'OK'});
});

module.exports = router;