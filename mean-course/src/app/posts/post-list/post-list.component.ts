import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
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

  ngOnInit() {
    this.isLoading=true;
    this.postsService.getPosts();
    this.postSub=this.postsService.getPostUpdateListener()
      .subscribe((posts:Post[])=>{
        this.isLoading=false;
        this.posts=posts;
      });
  }

  ngOnDestroy(){
    this.postSub.unsubscribe();
  }

  onDelete(postId:string){
    this.postsService.deletePost(postId);
  }

}
