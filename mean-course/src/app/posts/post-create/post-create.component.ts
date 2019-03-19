import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredTitle='';
  enteredContent='';
  @Output() postCreated = new EventEmitter<Post>();

  constructor() { }
  //One way binding
  // onAddPost(postInput: HTMLTextAreaElement){
  //   this.newPost=postInput.value;
  // }

  //Two way Binding
  // onAddPost(){
  //   const post: Post ={
  //     title: this.enteredTitle, 
  //     content:this.enteredContent 
  //   };
  //   this.postCreated.emit(post);
  // }

  onAddPost(form:NgForm){
    if(form.invalid){
      return;
    }
    const post: Post ={
      title: form.value.title,
      content:form.value.content
    };
    this.postCreated.emit(post);
  }


  ngOnInit() {
  }

}
