import * as types from '../constants/ActionTypes';
import * as config from '../constants/config';

export const requestLocation = coords => ({
  type: types.REQUEST,
  coords,
});

export const receiveLocation = (coords, json) => {
  return {
  type: types.RECEIVE,
  location: json.data.location,
  regions: json.data.regions,
}}

export const error = e => ({
  type: types.ERROR,
  error: e,
  message: 'Oops something went wrong',
});

export const locate = coords => async (dispatch) => {
  const params = [
    `include${encodeURIComponent('[]')}=regions.listings`,
    `latlng=${encodeURIComponent(`${coords.latitude},${coords.longitude}`)}`,
  ];
  const url = `https://${config.API_HOST}/wm/v2/location?${params.join('&')}`;

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  };

  try {
    dispatch(requestLocation(coords));
    const response = await fetch(url, options);
    const data = await response.json();
    dispatch(receiveLocation(coords, data));
  } catch (e) {
    dispatch(error(e));
  }
};

export const receiveDetails = (wmid, json) => {
  return {
    type: types.DETAIL,
    detail: json.data.listing,
}}

export const getDetails = wmid => async (dispatch) => {
  const url = `https://${config.API_HOST}/wm/v2/listings/${wmid}`;

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    dispatch(receiveDetails(wmid, data));
  } catch (e) {
    dispatch(error(e));
  }
};
