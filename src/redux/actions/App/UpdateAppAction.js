import useJwt from '@src/auth/jwt/useJwt'
import {
  FETCH_APP_FAILED,
  FETCH_APP_INITIATED,
  FETCH_APP_SUCCESS,
  RESET_APP_STATES,
  UPDATE_APP_FAILED,
  UPDATE_APP_INITIATED,
  UPDATE_APP_SUCCESS
} from '../ActionTypes/App'

export const resetUpdateStates = () => ({ type: RESET_APP_STATES })
export const fetchAppInitiated = () => ({ type: FETCH_APP_INITIATED })
export const fetchAppSucceeded = data => ({ type: FETCH_APP_SUCCESS, payload: data })
export const fetchAppFailed = error => ({ type: FETCH_APP_FAILED, payload: error })
export const updateAppInitiated = () => ({ type: UPDATE_APP_INITIATED })
export const updateAppSucceeded = data => ({ type: UPDATE_APP_SUCCESS, payload: data })
export const updateAppFailed = error => ({ type: UPDATE_APP_FAILED, payload: error })

export const handleFetchApp = appId => {
  return async dispatch => {
    try {
      dispatch(fetchAppInitiated())
      const response = await useJwt.getApp(appId)
      if (response) {
        dispatch(fetchAppSucceeded(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch(fetchAppFailed(err.response.data.message))
      }
    }
  }
}

export const handleUpdateApp = (_id, data) => {
  return async dispatch => {
    try {
      dispatch(updateAppInitiated())
      const response = await useJwt.updateApp(_id, data)
      if (response) {
        dispatch(updateAppSucceeded(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch(updateAppFailed(err.response.data.message))
      }
    }
  }
}
