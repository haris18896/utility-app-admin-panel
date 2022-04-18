import {
  DELETE_PUSH_NOTIFICATION_FAILURE,
  DELETE_PUSH_NOTIFICATION_INITIATED,
  DELETE_PUSH_NOTIFICATION_SUCCESS,
  LIST_NOTIFICATIONS_FAILURE,
  LIST_NOTIFICATIONS_INITIATED,
  LIST_NOTIFICATIONS_SUCCESS,
  PAGE_CHANGE,
  RESEND_NOTIFICATION_FAILURE,
  RESEND_NOTIFICATION_INITIATED,
  RESEND_NOTIFICATION_SUCCESS,
  REST_LIST_NOTIFICATIONS_STATE,
  REST_PUSH_NOTIFICATION_STATE,
  SELECT_CHANGE,
  SEND_PUSH_NOTIFICATION_FAILURE,
  SEND_PUSH_NOTIFICATION_INITIATED,
  SEND_PUSH_NOTIFICATION_SUCCESS
} from '../../actions/ActionTypes/notifications'

const initialState = {
  page: 1,
  limit: 10,
  totalRecords: 0
}

export const sendPushNotificationReducer = (state = {}, action) => {
  switch (action.type) {
    case SEND_PUSH_NOTIFICATION_INITIATED:
      return { ...state, inProcess: true }
    case SEND_PUSH_NOTIFICATION_SUCCESS:
      return { ...state, inProcess: false, sent: action.payload, error: null }
    case SEND_PUSH_NOTIFICATION_FAILURE:
      return { ...state, inProcess: false, sent: false, error: action.payload }
    case REST_PUSH_NOTIFICATION_STATE:
      return {}
    default:
      return state
  }
}

export const resendNotificationReducer = (state = {}, action) => {
  switch (action.type) {
    case RESEND_NOTIFICATION_INITIATED:
      return { ...state, resendInProcess: true }
    case RESEND_NOTIFICATION_SUCCESS:
      return { ...state, resendInProcess: false, resend: action.payload.success, error: null }
    case RESEND_NOTIFICATION_FAILURE:
      return { ...state, resendInProcess: false, resend: false, error: action.payload }
    case REST_PUSH_NOTIFICATION_STATE:
      return {}
    default:
      return state
  }
}

export const listNotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_NOTIFICATIONS_INITIATED:
      return { ...state, inProcess: true }
    case LIST_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        inProcess: false,
        pushNotifications: action.payload.pushNotifications,
        success: action.payload.success,
        totalRecords: action.payload.pushNotificationsCount,
        totalPages: action.payload.totalPages,
        error: null
      }
    case LIST_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        inProcess: false,
        pushNotifications: false,
        totalRecords: false,
        totalPages: false,
        error: action.payload
      }

    case DELETE_PUSH_NOTIFICATION_INITIATED:
      return { ...state, deleteInProcess: true }
    case DELETE_PUSH_NOTIFICATION_SUCCESS:
      return { ...state, deleteInProcess: false, isDeleted: action.payload, error: null }
    case DELETE_PUSH_NOTIFICATION_FAILURE:
      return { ...state, deleteInProcess: false, isDeleted: false, error: action.payload }

    case PAGE_CHANGE:
      return { ...state, appListInProcess: true, page: action.payload }
    case SELECT_CHANGE: {
      return { ...state, limit: action.payload, page: 1 }
    }

    case REST_LIST_NOTIFICATIONS_STATE:
      return initialState
    default:
      return state
  }
}
