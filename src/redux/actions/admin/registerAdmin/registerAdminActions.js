import useJwt from '@src/auth/jwt/useJwt'

import { INITIATE_REGISTRATION, REGISTRATION_SUCCESS, REGISTRATION_FAILED } from '../../ActionTypes/admin/index.js'

export const initiateRegistration = () => ({ type: INITIATE_REGISTRATION })

export const registrationSuccess = data => ({ type: REGISTRATION_SUCCESS, payload: data })

export const registrationFailed = data => ({ type: REGISTRATION_FAILED, payload: data })

export const handleRegisterAdmin = data => {
  return async dispatch => {
    try {
      dispatch(initiateRegistration())
      const response = await useJwt.registerAdmin(data)
      if (response.data) {
        dispatch(registrationSuccess(response.data))
      }
    } catch (err) {
      if (err.response?.data) {
        dispatch(registrationFailed(err.response.data))
      }
    }
  }
}
