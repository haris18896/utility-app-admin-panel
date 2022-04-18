import useJwt from '@src/auth/jwt/useJwt'
import { DELETE_APP_FAILED, DELETE_APP_INITIATED, DELETE_APP_SUCCESS } from '../ActionTypes/App'

export const deleteAppInitiated = () => ({ type: DELETE_APP_INITIATED })
export const deleteAppSuccess = data => ({ type: DELETE_APP_SUCCESS, payload: data })
export const deleteAppFailed = error => ({ type: DELETE_APP_FAILED, payload: error })

export const handleDeleteApp = appId => {
  return async dispatch => {
    try {
      dispatch(deleteAppInitiated())
      const response = await useJwt.deleteApp(appId)
      if (response) {
        dispatch(deleteAppSuccess(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch(deleteAppFailed(err.response.data.message))
      }
    }
  }
}
