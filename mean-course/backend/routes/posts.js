const { Post }=require('../models/post');
const express=require('express');
const router=express.Router();

const multer=require('multer');

const MIME_TYPE_MAP={
    'image/png':'png',
    'image/jpeg':'jpg',
    'image/jpg':'jpg'
}
const storage=multer.diskStorage({
    destination: (req,file,callback)=>{
        const isValid=MIME_TYPE_MAP[file.mimetype];
        let error=new Error("Invalid MIME Type");
        if(isValid){
            error=null;
        }
        callback(error,"backend/images");
    },
    filename: (req,file,callback)=>{
        const name=file.originalname.toLowerCase().split(' ').join('-');
        const ext=MIME_TYPE_MAP[file.mimetype];
        callback(null,name + '-'+Date.now()+'.'+ext);
    }
})

router.get('/',(req,res)=>{
    const pageSize=+req.query.pagesize;
    const currentPage=+req.query.page;
    const postQuery=Post.find();
    let fetchedPosts;
    if(pageSize&&currentPage){
       postQuery
        .skip(pageSize * (currentPage-1))
        .limit(pageSize);
    }
    postQuery
    .then(posts=>{
        fetchedPosts=posts;
        return Post.count();
    })
    .then(count=>{
        res.status(200).send({
            message:'Posts fetched successfully',
            posts:fetchedPosts,
            maxPosts:count
        });
        
    })


});

router.get('/:id',async (req,res)=>{
    const post=await Post.findById(req.params.id);
    if(!post) return res.status(404).send('post with the given id is not found');
    res.status(200).send(post);
});

router.post('',multer({storage:storage}).single("image"), async (req,res)=>{
    const url=req.protocol + '://' +req.get('host');
    const post= new Post( {
        title:req.body.title,
        content:req.body.content,
        imagePath:url+"/images/"+req.file.filename
    })
    const result=await post.save();
    res.status(201).send({
        message:'Post added successfully',
        post:{
            id:result._id,
            title:result.title,
            content:result.content,
            imagePath:result.imagePath
        }
    });
});

router.delete('/:id',async (req,res)=>{

    const post=await Post.findByIdAndDelete(req.params.id);
    if(!post) return res.status(404).send('post with the given id is not found');  
    //console.log(post);
    res.status(200).send({message:"Post Deleted"});
})

router.put("/:id",async(req,res)=>{
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename
    }
    const post = new Post({
      _id:req.params.id,
      title: req.body.title,
      content: req.body.content,
      imagePath: imagePath
    });
    console.log(post.title)
    console.log(post);
    const result=await Post.findByIdAndUpdate(req.params.id,post,{new:true});
    console.log(result);
    if(!result) return res.status(404).send('post with the given id is not found');
    res.status(200).send(
        {
            message:"Post Updated",
            post:{
                id:result._id,
                title:result.title,
                content:result.content,
                imagePath:result.imagePath
            }
        });

});

module.exports=router;