import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { PageEvent } from '@angular/material';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  
  constructor(public postsService:PostsService) {
   }

  posts: Post[] =[];
  isLoading=false;
  private postSub: Subscription;
  totalPosts=10;
  postsPerPage=1;
  currentPage=1;
  pageSizeOptions=[1,2,5,10];
  ngOnInit() {
    this.isLoading=true;
    this.postsService.getPosts(this.postsPerPage,1);
    this.postSub=this.postsService.getPostUpdateListener()
      .subscribe((postData:{posts:Post[],postCount:number})=>{
        this.isLoading=false;
        this.totalPosts=postData.postCount;
        this.posts=postData.posts;
      });
  }

  ngOnDestroy(){
    this.postSub.unsubscribe();
  }

  onDelete(postId:string){
    this.isLoading=true;
    this.postsService.deletePost(postId).subscribe(()=>{
      this.postsService.getPosts(this.postsPerPage,this.currentPage);
    });
  }

  onChangedPage(pageData:PageEvent){
    this.isLoading=true;
    this.currentPage=pageData.pageIndex+1;
    this.postsPerPage=pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage,this.currentPage);
  }
}
