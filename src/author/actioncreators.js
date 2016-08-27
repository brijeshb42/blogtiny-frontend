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
  type: A.FETCH_ERROR,
});

export const saving = () => ({
  type: A.SAVING,
});

export const saved = (result) => ({
  type: A.SAVED,
  result,
});

export const updated = (result) => ({
  type: A.UPDATED,
  result,
});

export const updateError = (result) => ({
  type: A.UPDATE_ERROR,
  result,
});

export const saveError = (result) => ({
  type: A.SAVE_ERROR,
  result,
});

export const setCurrentAuthor = (index) => ({
  type: A.SET_CURRENT_AUTHOR,
  index,
});

export const reset = () => ({
  type: A.RESET,
});

export const resetForm = () => ({
  type: A.RESET_FORM,
});

export const changeKey = (key, value) => ({
  type: A.CHANGE_KEY,
  key,
  value,
});


export const startFetch = () => {
  return (dispatch, getState) => {
    const items = getState();
    if (items.fetching === true) {
      return;
    }
    dispatch(fetchingStarted());
    Fetch.get("/authors/", {}, (data) => {
      dispatch(fetched(data.result));
    }, (err) => {
      console.log(err);
    });
  };
};


export const createAuthor = () => {
  return (dispatch, getState) => {
    const { authors } = getState();
    if (authors.saving) {
      return;
    }
    const data = authors.currentAuthor;
    let url = '/authors/';
    let RequestMethod = Fetch.post;
    if (data.id > 0) {
      url += data.id;
      RequestMethod = Fetch.put;
    }
    dispatch(saving());
    RequestMethod.call(Fetch, url, { data: {
      name: data.name,
      email: data.email,
      slug: data.slug,
      public_email: data.public_email,
    }}, (resp) => {
      if (data.id > 0) {
        dispatch(updated(resp.result));
      } else {
        dispatch(saved(resp.result));        
      }
    }, (err) => {
      if (data.id > 0) {
        dispatch(updateError(err.data.result));
      } else {
        dispatch(saveError(err.data.result));
      }
    })
  };
};
