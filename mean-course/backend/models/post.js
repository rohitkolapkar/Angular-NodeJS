const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
});

const Post=mongoose.model('post',postSchema);

exports.Post=Post;