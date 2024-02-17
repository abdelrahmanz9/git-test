import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http:HttpClient) { }

  createAndStorePosts(postData:Post){
    return this.http.post<{name:string}>(`https://ng-angular-test-4d5aa-default-rtdb.firebaseio.com/post.json` , postData)
  }

  getPosts(){
    return this.http.get<{[key:string]:Post}>(`https://ng-angular-test-4d5aa-default-rtdb.firebaseio.com/post.json`)
    .pipe(map(res=>{
      const postArray = []
      for(const key in res){
        postArray.push({...res[key] , id:key})
      }
      return postArray
    }))
  }

  deleteBosts(){
    return this.http.delete(`https://ng-angular-test-4d5aa-default-rtdb.firebaseio.com/post.json`)
  }


}
