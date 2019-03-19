const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    const posts=[
        {
            id:'fadf12dfds',
            title:'First server-side post',
            content:'This is coming from server'
        },
        {
            id:'34gufgdsf34',
            title:'second server-side post',
            content:'This is coming from server'
        }
    ];
    res.status(200).json({
        message:'Posts fetched successfully',
        posts:posts
    });
    
});

module.exports=router;