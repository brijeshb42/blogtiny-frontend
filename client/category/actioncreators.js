import * as A from './actiontypes';
import Fetch from 'network';

export const fetchingStarted = () => ({
  type: A.FETCHING
});

export const fetched = (result) => ({
  type: A.FETCHED,
  result,
});

export const fetchError = () => ({
  type: A.FETCH_ERROR,
});

export const savingStarted = () => ({
  type: A.SAVING,
});

export const saved = (result) => ({
  type: A.SAVED,
  result,
});

export const saveError = (result) => ({
  type: A.SAVE_ERROR,
  result,
});


export const startFetch = () => {
  return (dispatch, getState) => {
    const items = getState();
    if (items.fetching === true) {
      return;
    }
    dispatch(fetchingStarted());
    Fetch.get('/categories/', {}, (data) => {
      dispatch(fetched(data.result));
    }, (err) => {
      console.log(err);
    });
  };
};

export const startSave = (title) => {
  return (dispatch, getState) => {
    if (title.length < 1) {
      dispatch(saveError({
        title: "Please provide a name."
      }));
      return;
    }
    const { saving } = getState();
    if (saving) {
      return;
    }
    dispatch(savingStarted());
    Fetch.post('/categories/', {data: { title }}, (data) => {
      dispatch(saved(data.result));
    }, err => {
      console.log(err)
      dispatch(saveError(err.data.result || {title: "Some unknown error."}));
    });
  };
}

