import {saveToLocal,LoadFromLocal, loadFromLocal} from './store'
import { userInfo } from 'os';

const USER_ID = 'buptsky'
const WATCHED_KEY = '__watched__' // 已经看过的电影
const WANTED_KEY = '__wanted__' // 想看的电影
const COMMENT_KEY = '__comment__'
const CELEBRITY_KEY = '__celebrity__'
const WATCHED_MAX_LENGTH = 300
const WANTED_MAX_LENGTH = 300
const COMMENT_MAX_LENGTH = 300
const CELEBRITY_MAX_LENGTH = 300





//看过的电影

export function saveWatchedMovie(movie){
  const maxLen = WATCHED_MAX_LENGTH
  let movies = loadFromLocal(USER_ID,WATCHED_KEY,[])
  const index = movies.findIndex(item=>{
    return item.id===movie.id
  })
  if(index===-1){
    movies.push(movie)
    if(maxLen && movies.length>maxLen){
      movies.shift()
    }
  }else{
    movies.splice(index,1)
  }
  saveToLocal(USER_ID.WANTED_KEY,movies)
  return movies
}
export function loadWatchedMovie() {
  return loadFromLocal(USER_ID, WATCHED_KEY, [])
}

//想看的电影

export function saveWantedMovie(movie){
  const maxLen = WANTED_MAX_LENGTH
  let movies = loadFromLocal(USER_ID,WANTED_KEY,[])
  const index = movies.findIndex(item=>{
    return item.id===movie.id
  })
  if(index===-1){
    movies.push(movie)   
    if(maxLen &&movies.length>maxLen){
      movies.shift()
    }
  }else{
    movie.splice(index,1)
    
  }
  saveToLocal(USER_ID,WANTED_KEY,movies)
  return movies
}

export function loadWantedMovie(){
  return loadFromLocal(USER_ID,WANTED_KEY,[])
}

//点赞评论
export function saveComment(id){
  const maxLen =COMMENT_MAX_LENGTH
  let comments = loadFromLocal(USER_ID,COMMENT_KEY,[])
  const index = comments.findIndex(item=>{
    return item===id
  })
  if(index===-1){
    comments.push(id)
    if(maxLen &&comments.length>maxLen){
      comments.shift()
    }
  }else{
    comments.splice(index,1)
  }
  saveToLocal(USER_ID,COMMENT_KEY,comments)
  return comments
}

export function loadComment(){
  return loadFromLocal(USER_ID,COMMENT_KEY,[])
}



//收藏的影人

export function saveCelebrity(celebrity){
  const maxLen = CELEBRITY_MAX_LENGTH

  let celebrities = loadFromLocal(USER_ID,CELEBRITY_KEY,[])
  const index = celebrities.findIndex((item)=>{
    return item.id===celebrity.id
  })
  if(index===-1){
    celebrities.push(celebrity)
    if(maxLen&&celebrities.length>maxLen){
      celebrities.shift()
    }
  }else{
    celebrities.splice(index,1)
  }
  saveToLocal(USER_ID,CELEBRITY_KEY,celebrities)
  return celebrities

}

export function loadCelebrity(){
  return loadFromLocal(USER_ID,CELEBRITY_KEY,[])
}