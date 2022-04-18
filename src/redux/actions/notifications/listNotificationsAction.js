import useJwt from '@src/auth/jwt/useJwt'
import {
  DELETE_PUSH_NOTIFICATION_FAILURE,
  DELETE_PUSH_NOTIFICATION_INITIATED,
  DELETE_PUSH_NOTIFICATION_SUCCESS,
  LIST_NOTIFICATIONS_FAILURE,
  LIST_NOTIFICATIONS_INITIATED,
  LIST_NOTIFICATIONS_SUCCESS,
  PAGE_CHANGE,
  REST_LIST_NOTIFICATIONS_STATE,
  SELECT_CHANGE
} from '../ActionTypes/notifications'

export const pageChange = data => ({ type: PAGE_CHANGE, payload: data })
export const selectChange = data => ({ type: SELECT_CHANGE, payload: data })

export const resetNotificationsList = () => ({ type: REST_LIST_NOTIFICATIONS_STATE })
export const listNotificationInitiated = () => ({ type: LIST_NOTIFICATIONS_INITIATED })
export const listNotificationSuccess = data => ({ type: LIST_NOTIFICATIONS_SUCCESS, payload: data })
export const listNotificationFailure = error => ({ type: LIST_NOTIFICATIONS_FAILURE, payload: error })

export const deleteNotificationInitiated = () => ({ type: DELETE_PUSH_NOTIFICATION_INITIATED })
export const deleteNotificationSuccess = data => ({ type: DELETE_PUSH_NOTIFICATION_SUCCESS, payload: data })
export const deleteNotificationFailure = error => ({ type: DELETE_PUSH_NOTIFICATION_FAILURE, payload: error })

export const handleDeleteNotification = id => {
  return async dispatch => {
    try {
      dispatch(deleteNotificationInitiated())
      const response = await useJwt.deletePushNotification(id)
      if (response) {
        dispatch(deleteNotificationSuccess(response.data))
      }
    } catch (err) {
      if (err?.response?.data) {
        dispatch(deleteNotificationFailure(err?.response?.data))
      }
    }
  }
}

export const handleNotificationsList = (page, limit, appId, searchKeyword) => {
  return async dispatch => {
    try {
      dispatch(listNotificationInitiated())
      const response = await useJwt.listNotifications(page, limit, appId, searchKeyword)
      if (response.data) {
        dispatch(listNotificationSuccess(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch(listNotificationFailure(err.response.data))
      }
    }
  }
}

export const handlePageChangeNotifications = (page, limit, appId, searchKeyword) => {
  return async dispatch => {
    const newPage = page.selected + 1
    dispatch(pageChange(newPage))
    dispatch(handleNotificationsList(newPage, limit, appId, searchKeyword))
  }
}

export const handleSelectChangeNotifications = (newLimit, oldLimit, appId, label, adFormat, searchKeyword) => {
  return async dispatch => {
    if (newLimit !== oldLimit) {
      dispatch(selectChange(newLimit))
      dispatch(pageChange(1))
      dispatch(handleNotificationsList(1, newLimit, appId, adFormat, label, searchKeyword))
    }
  }
}
