const { Post }=require('../models/post');
const express=require('express');
const router=express.Router();

router.get('/',async (req,res)=>{
    const posts=await Post.find();
    //console.log(posts);
    res.status(200).send({
        message:'Posts fetched successfully',
        posts:posts
    });
    
});

router.post('/', async (req,res)=>{

    const post= new Post( {
        title:req.body.title,
        content:req.body.content
    })
    const result=await post.save();
    res.status(201).send({
        message:'Post added successfully',
        postId:result._id
    });
});

router.delete('/:id',async (req,res)=>{

    const post=await Post.findByIdAndDelete(req.params.id);
    if(!post) return res.status(404).send('customer with the given id is not found');  
    //console.log(post);
    res.status(200).send({message:"Post Deleted"});
})
module.exports=router;