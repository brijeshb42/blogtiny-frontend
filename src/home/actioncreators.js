import * as A from './actiontypes';
import Fetch from 'network';

export const fetchingStarted = () => ({
  type: A.FETCHING
});

export const fetched = (result) => ({
  type: A.FETCHED,
  result
});

export const fetchError = () => ({
  type: A.FETCH_ERROR
});


export const startFetch = () => {
  return (dispatch, getState) => {
    const articles = getState();
    if (articles.fetching === true) {
      return;
    }
    dispatch(fetchingStarted());
    Fetch.get("/articles/", {}, (data) => {
      dispatch(fetched(data.result));
    }, (err) => {
      console.log(err);
    });
  };
};
