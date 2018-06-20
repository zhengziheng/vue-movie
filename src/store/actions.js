import *as types from './mutation-types'
import {saveWantedMovie, saveWatchedMovie,saveComment,saveCelebrity } from '../common/js/cache';


export const markWantedMovie = function({commit},movie){
  commit(types.SET_WANTED_MOVIES,saveWantedMovie(movie))
}

export const markWatchedMovie = function({commit},movie){
  commit(types.SET_WATCHED_MOVIES,saveWatchedMovie(movie))
}

export const markComment = function({commit},id){
  commit(types.SET_FAVORITE_COMMENTS,saveComment(id))
}

export const markCelebrity = function({commit},celebrity){
  commit(types.SET_COLLECT_CELEBRITY,saveCelebrity(celebrity))
}