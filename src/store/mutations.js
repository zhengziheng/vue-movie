import * as types from './mutation-types'

const mutations = {
  [types.SET_MOVIE](state,movie){
    state.movie = movie
  },
  [types.SET_WANTED_MOVIES](state,movies){
    state.wantedMovies = movies
  },
  [types.SET_WATCHED_MOVIES](state,movies){
    state.watchedMovies = movies
  },
  [types.SET_FAVORITE_COMMENTS](state,comments){
    state.favoriteComments = comments
  },
  [types.SET_DISCUSSION_TYPE](state,type){
    state.currentDiscussionType = type
  },
  [types.SET_REVIEW_ID](state,id){
    state.currentReviewId = id
  },
  [types.SET_CELEBRITY_ID](state, id) {
    state.currentCelebrityId = id;
  },
  [types.SET_COLLECT_CELEBRITY](state,celebrity){
    state.collectedCelebrities = celebrity
  }
}

export default mutations