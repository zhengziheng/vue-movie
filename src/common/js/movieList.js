
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
  return ret
}

function filterDirector(directors){
  return directors.length? directors[0].name :''
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

//获取电影上映的待定事件

function findShowTime(pubdates,key){
  //获取待定的月份或者年份
  let month=''
  let year = ''
  pubdates.forEach(item => {
    let index = item.indexOf(key)
    if(index >-1){
      if(!item.split('-')[1]){//不存在月份信息
        year = item.split('-')[0].substr(0,4)
      }else{
        month = (item.split('-')[1].substr(0,2))
        if(month.substr(0,1)==='0'){
          //月份去0
          month = month.substr(1,1)
        }
      }
    }
    
  });
  if(!month){
    return `${year}年待定`
  }
  return `${month}月待定`
}

// 判断是否需要显示年份 上映年份大于本年

function needYear(date){
  return parseInt(new Date(date).getFullYear())>parseInt(new Date().getFullYear())
}

// 格式化日期

function normalizeDate(date){
  const week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  let currentWeek = week[new Date(date).getDay()] //获取星期
  let time = `${date.split('-')[1]}月${date.split('-')[2]}日`
  if(time.substr(0,1)==='0'){
    time = time.substr(1,1)
  }
  let ret = time+' '+currentWeek
  if(needYear(date)){
    return `${date.split('-')[0]}年${ret}`
  }
  return ret 
}