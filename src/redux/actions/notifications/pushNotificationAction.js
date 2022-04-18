import useJwt from '@src/auth/jwt/useJwt'
import {
  RESEND_NOTIFICATION_FAILURE,
  RESEND_NOTIFICATION_INITIATED,
  RESEND_NOTIFICATION_SUCCESS,
  REST_PUSH_NOTIFICATION_STATE,
  SEND_PUSH_NOTIFICATION_FAILURE,
  SEND_PUSH_NOTIFICATION_INITIATED,
  SEND_PUSH_NOTIFICATION_SUCCESS
} from '../ActionTypes/notifications'

export const resetPushNotification = () => ({ type: REST_PUSH_NOTIFICATION_STATE })
export const sendPushNotificationInitiated = () => ({ type: SEND_PUSH_NOTIFICATION_INITIATED })
export const sendPushNotificationSuccess = data => ({ type: SEND_PUSH_NOTIFICATION_SUCCESS, payload: data })
export const sendPushNotificationFailure = error => ({ type: SEND_PUSH_NOTIFICATION_FAILURE, payload: error })
export const resendPushNotificationInitiated = () => ({ type: RESEND_NOTIFICATION_INITIATED })
export const resendPushNotificationSuccess = data => ({ type: RESEND_NOTIFICATION_SUCCESS, payload: data })
export const resendPushNotificationFailure = error => ({ type: RESEND_NOTIFICATION_FAILURE, payload: error })

export const handleSendPushNotification = (id, data) => {
  return async dispatch => {
    try {
      dispatch(sendPushNotificationInitiated())
      const response = await useJwt.sendPushNotification(id, data)
      if (response.data) {
        dispatch(sendPushNotificationSuccess(response.data))
      }
    } catch (err) {
      if (err?.response?.data) {
        dispatch(sendPushNotificationFailure(err?.response?.data))
      }
    }
  }
}

export const handleResendPushNotification = id => {
  return async dispatch => {
    try {
      dispatch(resendPushNotificationInitiated())
      const response = await useJwt.resendPushNotification(id)
      if (response.data) {
        dispatch(resendPushNotificationSuccess(response.data))
      }
    } catch (err) {
      if (err?.response?.data) {
        dispatch(resendPushNotificationFailure(err?.response?.data))
      }
    }
  }
}
