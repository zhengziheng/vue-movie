import { normalize } from "uri-js";

// 创建电影类

export default class Movie{
  constructor({id,title,director,casts,collectCount,rating,image, date, pubdates, subtype}){
    this.id = id
    this.title = title
    this.director = director
    this.casts = casts
    this.collectCount = collectCount || 0
    this.rating = rating
    this.image = image
    this.date = date || ''// 用于显示即将上映的电影是否待定
    this.pubdates = pubdates || '' // 用于电影详情的上映日期
    this.subtype = subtype || ' '
  }
}


export function createMovieList(movieList){
  let ret = []
  movieList.forEach((movie,index) => {
    ret.push(new Movie({
      id: movie.id,
      title: movie.title,
      director: filterDirector(movie.directors),
      casts: filterCasts(movie.casts),
      collectCount: movie.collect_count,
      rating: movie.rating.average,
      image: movie.images.large,
      date: filterDate(movie.mainland_pubdate, movie.pubdates), // 该条目只用于首页热映电影和即将上映电影
      pubdates: movie.pubdates
    }))
    
  })
  return ret
}

function filterCasts(casts){
  let ret=''
  casts.forEach((item,index)=>{
    if(index<casts.length-1){ //说明不止一个演员，拼接演员名字
      ret +=`${item.name}/`

    }else{
      ret +=item.name
    }
  })
}

function filterDirector(directors){
  return directors.length? directors[0] :''
}

function filterDate(date,pubdates){
  if(new Date().getTime() > new Date(date).getTime()){
    let reg =/^\d{4}[-]\d{2}[-]\d{2}/
    for (let i = 0; i < pubdates.length; i++) {
      if(pubdates[i].indexOf('中国大陆重映') !==-1 &&reg.test(pubdates[i])){
        return normalizeDate(pubdates[i].match(reg)[0])
      }
    }
    return findShowTime(pubdates,'中国大陆重映')
  }
  if(!date){
    return findShowTime(pubdates,'中国大陆')
  }
  return normalizeDate(date)

}