import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Post } from './post';
import { PostsService } from './posts.service';
HttpEventType
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts:Post[] ;
  isFetching:boolean = false
  constructor(private http: HttpClient , private _PostsService:PostsService) {}

  ngOnInit() {
    this.getPostedData()
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this._PostsService.createAndStorePosts(postData).subscribe((res)=>{
      console.log(res)
    })
  }

  onFetchPosts() {
    this.getPostedData()
  }

  onClearPosts() {
    this._PostsService.deleteBosts().subscribe((res)=>{
      this.loadedPosts = []
    })
  }

  private getPostedData(){
    this.isFetching = true
    this._PostsService.getPosts().subscribe((res)=>{
      this.loadedPosts = res
      this.isFetching = false
    })
   
  }
}
