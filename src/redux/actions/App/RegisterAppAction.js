import useJwt from '@src/auth/jwt/useJwt'
import { REGISTER_APP_FAILED, REGISTER_APP_INITIATED, REGISTER_APP_SUCCESS, RESET_APP_STATES } from '../ActionTypes/App'

export const resetAppState = () => ({ type: RESET_APP_STATES })
export const registerAppInitiated = () => ({ type: REGISTER_APP_INITIATED })
export const registerAppSuccess = date => ({ type: REGISTER_APP_SUCCESS, payload: date })
export const registerAppFailed = data => ({ type: REGISTER_APP_FAILED, payload: data })

export const handleRegisterApp = data => {
  return async dispatch => {
    try {
      dispatch(registerAppInitiated())
      const response = await useJwt.registerApp(data)
      if (response.data) {
        dispatch(registerAppSuccess(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch(registerAppFailed(err.response.data))
      }
    }
  }
}
