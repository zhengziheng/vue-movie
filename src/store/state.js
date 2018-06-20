import {loadWantedMovie,loadWatchedMovie,loadComment,loadCelebrity} from 'common/js/cache.js'
const state = {
  movie:{},
  watchedMovies: loadWatchedMovie(), // 看过的电影
  wantedMovies: loadWantedMovie(), // 想看的电影
  favoriteComments: loadComment(), // 点赞的评论
  currentCelebrityId: 0,
  currentReviewId: 0,
  currentDiscussionType: '',
  collectedCelebrities: loadCelebrity(),
}


export default state