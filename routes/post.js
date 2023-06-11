const router=require('express').Router()
const verify=require('../verifyToken')

//to make this route private we add verify


router.get('/', verify ,(req, res)=>{
    res.json({posts :{title: 'my first post'}})
})


module.exports=router;