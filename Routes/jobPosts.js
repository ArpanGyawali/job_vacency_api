const router = require('express').Router()

router.get('/', (req,res) => res.send("Post route"))

module.exports = router